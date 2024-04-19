const fs = require('fs');
const path = require('path');

const getCountryGEOJSON = (req, res) => {
    const geojsonPath = path.join(__dirname, '..', 'models', 'countries.geojson');

    fs.readFile(geojsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the GeoJSON file:', err);
            res.status(500).send('Error reading the GeoJSON file.');
            return;
        }
        res.header('Content-Type', 'application/json');
        res.send(data);
    });
};

module.exports = {
    getCountryGEOJSON
};
