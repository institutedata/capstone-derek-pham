const express = require('express');
const cors = require('cors');
const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
const database = require('./services/database');
const foodRoutes = require('./routes/foodRoutes.js')
const foodListRoutes = require('./routes/foodListRoutes.js')
const foodExperienceRoutes = require('./routes/foodExperienceRoutes.js')
const foodBarChartRoutes = require('./routes/foodBarChartRoutes.js')
const mapBoxRoutes = require('./routes/mapBoxRoutes.js')

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => res.send('TEST SUCCESS'));
app.use('/api', foodRoutes)
app.use('/api', foodListRoutes)
app.use('/api', foodExperienceRoutes)
app.use('/api', foodBarChartRoutes)
app.use('/api', mapBoxRoutes)

async function startServer() {
  try {
    await database.connectToServer();
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();