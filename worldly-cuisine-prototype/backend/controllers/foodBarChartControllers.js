const foodListModel = require('../models/foodListModel');

const getNewData = async (req, res) => {
    let data = await foodListModel.getFoodItems()
    // console.log(data)
    const origins = data.map(item => item.origin);
    // console.log(foodListModel)
    const counts = origins.reduce((acc, origin) => {
        acc[origin] = (acc[origin] || 0) + 1;
        return acc;
    }, {});
    
    res.send(counts);
};

module.exports = {
    getNewData
};
  