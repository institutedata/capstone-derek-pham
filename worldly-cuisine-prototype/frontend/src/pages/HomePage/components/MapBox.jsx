import React, { useRef, useEffect, useContext, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the Mapbox GL JS stylesheet
import { FoodDataContext } from './FoodDataContext';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapBox = () => {
  const { lng, lat, foodItems, recenterTrigger } = useContext(FoodDataContext);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  async function obtainISOs() {
    const data = await fetch("http://localhost:5000/api/getFoodItems");
    let response = await data.json();
    response = new Set(response.map((item) => item.isoCode.toUpperCase()));
    return Array.from(response);
  }

  async function setPaint(map, fillColor, borderColor) {
    let highlightCountries = await obtainISOs();

    // Set fill color for highlighted countries
    map.setPaintProperty("countriesLayer", "fill-color", [
      "match",
      ["get", "ISO_A2"],
      highlightCountries,
      fillColor, // Use the fillColor parameter for highlighted countries
      "#888888"  // Default fill color for non-highlighted countries
    ]);

    // Check if the border layer exists, if not, create it
    if (!map.getLayer("countriesBorders")) {
      map.addLayer({
        id: "countriesBorders",
        type: "line",
        source: "countries",
        layout: {},
        paint: {
          "line-color": [
            "match",
            ["get", "ISO_A2"],
            highlightCountries,
            borderColor, // Use the borderColor parameter for highlighted countries
            "rgba(0, 0, 0, 0)" // Transparent for non-highlighted countries
          ],
          "line-width": 0.3,
        },
      });
    } else {
      // Update line color for existing border layer
      map.setPaintProperty("countriesBorders", "line-color", [
        "match",
        ["get", "ISO_A2"],
        highlightCountries,
        borderColor, // Use the borderColor parameter for highlighted countries
        "rgba(0, 0, 0, 0)" // Transparent for non-highlighted countries
      ]);
    }
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/derekpham/clsift3s4006l01rb2jku7ypf',
      center: [lng, lat],
      zoom: 1,
      attributionControl: false
    });

    map.on('load', async () => {
      mapRef.current = map;

      map.addSource("countries", {
        type: "geojson",
        data: "http://localhost:5000/api/getCountryGEOJSON",
        promoteId: "ISO_A2",
      });

      map.addLayer({
        id: "countriesLayer",
        type: "fill",
        source: "countries",
        paint: {
          "fill-color": "#888888",
          "fill-opacity": 0.7,
        },
      });

      setIsMapLoaded(true);
    });


    return () => map.remove();
  }, []);

  useEffect(() => {
    console.log('Map relocating to:', lng, lat);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
        essential: true,
      });
    }
  }, [lng, lat, recenterTrigger]);

  useEffect(() => {
    if (isMapLoaded && mapRef.current) {
      console.log('Map coloring in effect');
      setPaint(mapRef.current, "#ffdf00", '#708238');
    }
  }, [foodItems, isMapLoaded]);

  return (
    <div ref={mapContainerRef} className="map-container" />
  );
};

export default MapBox;
