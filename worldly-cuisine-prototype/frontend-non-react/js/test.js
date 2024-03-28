let apiket =
  "pk.eyJ1IjoiZGVyZWtwaGFtIiwiYSI6ImNsc2lmaHE2cjI3cDgyam8wejNxNGVmd2YifQ.fFu-Q18bhgPLC1G_r58W_g";
let countryName = "Japan";

fetch(
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    countryName
  )}.json?access_token=pk.eyJ1IjoiZGVyZWtwaGFtIiwiYSI6ImNsc2lmaHE2cjI3cDgyam8wejNxNGVmd2YifQ.fFu-Q18bhgPLC1G_r58W_g`
)
  .then((response) => response.json())
  .then((data) => {
    const place = data.features[0];
    const coordinates = place.center; // [longitude, latitude]
    // You can then use these coordinates to set the map view or for other purposes
    map.flyTo({ center: coordinates });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
