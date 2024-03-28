const getCountryCoords = async (country) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        country
    )}.json?access_token=pk.eyJ1IjoiZGVyZWtwaGFtIiwiYSI6ImNsc2lmaHE2cjI3cDgyam8wejNxNGVmd2YifQ.fFu-Q18bhgPLC1G_r58W_g`
  );
  const data = await response.json();
  const coordinates = data.features[0].center;
  return coordinates
};

module.exports = {
  getCountryCoords,
};
