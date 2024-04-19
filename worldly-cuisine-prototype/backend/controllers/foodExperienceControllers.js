const foodListModel = require('../models/foodListModel');
const countriesListData = require('../countriesList')
const countriesList = countriesListData.countriesList

const updateFoodExperience = async (req, res) => {
    let data = await foodListModel.getFoodItems()
    // console.log(data)

    let list = []

    for (let key in data) {
        let country = data[key]['origin']
        list.push(country)
    }

    let denominator = 195
    let numerator = 0
    let successfulMatches = []

    let uniqueFoodExperienceList = [...new Set(list)]
    for (let i=0; i < uniqueFoodExperienceList.length; i++) {
        let countryToMatch = uniqueFoodExperienceList[i]
        for (let x=0; x < countriesList.length; x++) {
            if (countryToMatch === countriesList[x]) {
                numerator ++
                successfulMatches.push(` ${countryToMatch}`)
                break
            }
        }
    }
    console.log('Successful matches:' + (successfulMatches.length > 0 ? successfulMatches:' No matches were made / list is empty'))
    // console.log(`numerator is ${numerator}`)
    let percentage = (numerator / denominator * 100).toFixed(2)
    res.json(
        {
            'numerator': numerator,
            'percentage': percentage
        }
    )
}

module.exports = {
    updateFoodExperience
};