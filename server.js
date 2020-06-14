const express = require('express');
const app = express();
const Wine = require('./models/Wine');
const path = require('path');

app.use(express.json({ extended: false }));

// Database Connection
const connectDB = require('./config/db');
connectDB();

const compareValues = require('./utils');

// Break Down by Year
app.get('/wine/:wine_id/year', async (req, res) => {
  let yearBreakdown = [];
  const breakDown = component => {
    const index = yearBreakdown.findIndex(
      ({ year }) => year === component.year
    );
    if (index === -1) {
      yearBreakdown.push({
        year: component.year,
        percentage: component.percentage
      });
    } else {
      yearBreakdown[index].percentage += component.percentage;
    }
  };

  try {
    const wine = await Wine.findById(req.params.wine_id);
    if (!wine || !wine.components) {
      return res.status(400).json({ message: 'Wine Components not found' });
    }
    wine.components.forEach(component => breakDown(component));
    res.send({
      breakDownType: 'year',
      breakdown: yearBreakdown.sort(compareValues('percentage', false))
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Break Down by Variety
app.get('/wine/:wine_id/variety', async (req, res) => {
  let varietyBreakdown = [];
  const breakDown = component => {
    const index = varietyBreakdown.findIndex(
      ({ variety }) => variety === component.variety
    );
    if (index === -1) {
      varietyBreakdown.push({
        variety: component.variety,
        percentage: component.percentage
      });
    } else {
      varietyBreakdown[index].percentage += component.percentage;
    }
  };

  try {
    const wine = await Wine.findById(req.params.wine_id);
    if (!wine || !wine.components) {
      return res.status(400).json({ message: 'Wine Components not found' });
    }
    wine.components.forEach(component => breakDown(component));
    res.send({
      breakDownType: 'variety',
      breakdown: varietyBreakdown.sort(compareValues('percentage', false))
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Break Down by Region
app.get('/wine/:wine_id/region', async (req, res) => {
  let regionBreakdown = [];
  const breakDown = component => {
    const index = regionBreakdown.findIndex(
      ({ region }) => region === component.region
    );
    if (index === -1) {
      regionBreakdown.push({
        region: component.region,
        percentage: component.percentage
      });
    } else {
      regionBreakdown[index].percentage += component.percentage;
    }
  };

  try {
    const wine = await Wine.findById(req.params.wine_id);
    if (!wine || !wine.components) {
      return res.status(400).json({ message: 'Wine Components not found' });
    }
    wine.components.forEach(component => breakDown(component));
    res.send({
      breakDownType: 'region',
      breakdown: regionBreakdown.sort(compareValues('percentage', false))
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Break Down by Year & Variety
app.get('/wine/:wine_id/yearvariety', async (req, res) => {
  let yearAndVarietyBreakdown = [];
  const breakDown = component => {
    const index = yearAndVarietyBreakdown.findIndex(({ year, variety }) => {
      return variety === component.variety && year === component.year;
    });
    if (index === -1) {
      yearAndVarietyBreakdown.push({
        year: component.year,
        variety: component.variety,
        percentage: component.percentage
      });
    } else {
      yearAndVarietyBreakdown[index].percentage += component.percentage;
    }
  };

  try {
    const wine = await Wine.findById(req.params.wine_id);
    if (!wine || !wine.components) {
      return res.status(400).json({ message: 'Wine Components not found' });
    }
    wine.components.forEach(component => breakDown(component));
    res.send({
      breakDownType: 'yearvariety',
      breakdown: yearAndVarietyBreakdown.sort(
        compareValues('percentage', false)
      )
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Wines
app.get('/wine', async (req, res) => {
  try {
    const wines = await Wine.find(null, '_id lotCode description');
    if (!wines) {
      return res.status(400).json({ message: 'Wines not found' });
    }
    res.send(wines);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

// Get Wine by Id
app.get('/wine/:wine_id', async (req, res) => {
  try {
    const wine = await Wine.findById(req.params.wine_id);
    if (!wine) {
      return res.status(400).json({ message: 'Wine not found' });
    }
    res.send(wine);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening on port 5000'));
