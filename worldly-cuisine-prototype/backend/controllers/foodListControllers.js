const foodListModel = require('../models/foodListModel');

const getFoodItems = async (req, res) => {
  const data = await foodListModel.getFoodItems()
  res.json(data);
};

const addFoodItem = async (req, res) => {
  const data = req.body;
  const result = await foodListModel.addFoodItem(data);
  res.json(result);
};

const removeFoodItem = (req, res) => {
  const { name } = req.params;
  foodListModel.removeFoodItem(name);  
  console.log(`Successfully removed ${name}`)
  res.send('Item removed');
};

module.exports = {
  getFoodItems,
  addFoodItem,
  removeFoodItem
};
