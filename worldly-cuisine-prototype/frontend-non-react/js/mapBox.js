mapboxgl.accessToken =
  "pk.eyJ1IjoiZGVyZWtwaGFtIiwiYSI6ImNsc2NvMnZzdDByaW0ya3FsdmhqdWd6OXYifQ.jgsdXF43wVU1G9INNoZjIA";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/derekpham/clsift3s4006l01rb2jku7ypf", // style URL
  center: [133.7, -25.27], // starting position [lng, lat]
  zoom: 1, // starting zoom
  attributionControl: false
});

map.on("load", async () => {
  map.resize();

  map.addSource("countries", {
    type: "geojson",
    data: "http://localhost:5500/worldly-cuisine-prototype/frontend/js/countries.geojson",
    promoteId: "ISO_A2",
  });
  map.addLayer({
    id: "countriesLayer",
    type: "fill",
    source: "countries",
    paint: {
      "fill-color": "#888888",
      "fill-opacity": 0.5,
    },
  });
  setPaint("#FF2828");
});

async function obtainISOs() {
  const data = await fetch("http://localhost:5000/api/getFoodItems");
  let response = await data.json();
  response = new Set(response.map((item) => item.isoCode.toUpperCase()));
  return Array.from(response);
}

export async function setPaint(color) {
  let highlightCountries = await obtainISOs();
  map.setPaintProperty("countriesLayer", "fill-color", [
    "match",
    ["get", "ISO_A2"],
    highlightCountries,
    color,
    "#888888",
  ]);
}

export function relocateMap(lng, lat) {
  map.flyTo({
    center: [lng, lat],
    essential: true,
  });
}
