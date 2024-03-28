const foodForm = document.getElementById('foodForm')
const result = document.getElementById('result')
const foodInput = document.getElementById('foodInput')
const addFoodButton = document.getElementById('addFoodButton')
const foodList = document.getElementById('foodList')
const foodExperienceStat = document.getElementById('foodExperienceStat')
const foodThumbnail = document.getElementById('foodThumbnail')
const resultContainer = document.getElementById('resultContainer')
const foodDescription = document.getElementById('foodDescription')
const articleURL = document.getElementById('articleURL')
const flagIcon = document.getElementById('flagIcon')
import { setPaint, relocateMap } from "./mapBox.js"

let myBarChart

document.addEventListener('DOMContentLoaded', function() {
    updateFoodList();
});  

function foodDataObject() {
    let currentFoodData = null;

    async function fetchFoodData(foodId) {
        const response = await fetch(`http://localhost:5000/api/getFoodOrigin/${encodeURIComponent(foodId)}`);
        const data = await response.json()
        currentFoodData = data
        // console.log(currentFoodData)
        return data
    };

    function returnCurrentFoodData() {
        if (currentFoodData) {
            return currentFoodData
        } else {
            console.error('There is no currentFoodData variable')
            return null
        }
    }

    return {
        fetchFoodData,
        returnCurrentFoodData
    };
}
const { fetchFoodData, returnCurrentFoodData } = foodDataObject();

function resetResultDisplay() {
    result.style.gridColumn = 'span 2'
    foodThumbnail.style.display = 'none'
    articleURL.style.display = 'none'    
    foodDescription.style.display = 'none'    
    addFoodButton.style.display = 'none'    
}

// SEARCH FOR FOOD ORIGIN
foodForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    result.innerHTML = "Getting Origin..."    
    resetResultDisplay() 
    if (!foodInput.value) {
        result.innerHTML = `Please enter a food name`
        resetResultDisplay()  
        console.error("Input field cannot be empty.")
    }

    const data = await fetchFoodData(foodInput.value)
    console.log(data)
    relocateMap(data.coords[0],data.coords[1])

    foodDescription.innerHTML = data.foodDescription
    foodDescription.style.display = 'block'
    foodThumbnail.src = data.thumbnailURL
    foodThumbnail.style.display = 'block'
    articleURL.href = data.articleURL
    articleURL.style.display = 'block'    
    addFoodButton.style.display = 'block'    
    if (data.origin) {
        result.innerHTML = `${data.origin} <span id="flagIcon" class="flag-icon flag-icon-${data.isoCode}"></span>`
        result.style.gridColumn = 'span 1'
    } else if (!data.origin) {
        result.innerHTML = `Error finding origin.`
        resetResultDisplay()  
        console.error("Data object doesn't contain origin property.")
    }
})

addFoodButton.addEventListener('click', async (event)=> {
    event.preventDefault()

    await fetch('http://localhost:5000/api/addFoodItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(returnCurrentFoodData())
    })
    setTimeout(updateFoodList, 100);
})

async function updateFoodList() {
    let foodListData = await fetch('http://localhost:5000/api/getFoodItems')
    const foodListDataResponse = await foodListData.json()
    // console.log(foodListDataResponse)
    foodList.innerHTML = '';
    
    for (let key in foodListDataResponse) {
        let country = foodListDataResponse[key]['origin']
        let food = foodListDataResponse[key]['name']
        let isoCode = foodListDataResponse[key]['isoCode']
        let li = document.createElement('li')
        let div = document.createElement('div')
        let span = document.createElement('span')
        let button = document.createElement('button')

        button.addEventListener('click', async function() {
            li.remove()
            await fetch(`http://localhost:5000/api/removeFoodItem/${food}`, {
                method: 'DELETE'
            })
            updateFoodExperience()   
        });
        
        span.innerHTML = `<span class="flag-icon flag-icon-${isoCode}"></span> &nbsp;${food}`
        button.textContent = 'Remove'
        div.appendChild(span)  
        div.appendChild(button)  
        li.appendChild(div)
        foodList.appendChild(li)
        li.setAttribute('countryData', country)
    }        
    updateFoodExperience() 
}

async function updateFoodExperience() {
    let foodListData = await fetch('http://localhost:5000/api/getFoodExperience')
    const foodListDataResponse = await foodListData.json()
    const numerator = foodListDataResponse.numerator
    const percentage = foodListDataResponse.percentage
    console.log(foodListDataResponse)

    if (numerator === 0) {
        foodExperienceStat.innerHTML = ''
    } else {
        foodExperienceStat.innerHTML = `You have ${numerator} different countr${numerator > 1 ? 'ies' : 'y'} which is ${percentage}% of the world`
    }
    updateChart(myBarChart);
    setPaint('#FF2828')
}

document.addEventListener('DOMContentLoaded', async (event) => {
    var ctx = document.getElementById('myBarChart').getContext('2d');
    myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue'],
            datasets: [{
                label: 'Most frequented countries',
                data: [12, 18, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    updateChart(myBarChart);
});

async function updateChart(myChart) {
    const response = await fetch('http://localhost:5000/api/newBarChartData')
    const data = await response.json()
    // console.log(data)

    const labels = Object.keys(data)   
    // console.log(labels)
    const count = Object.values(data)   
    // console.log(count)

    myChart.data.labels = labels
    myChart.data.datasets.forEach((dataset) => {
        dataset.data = count
    });

    myChart.update()
}