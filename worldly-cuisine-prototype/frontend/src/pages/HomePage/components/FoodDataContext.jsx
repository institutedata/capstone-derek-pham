// DataContext.js
import React, { createContext, useState, useCallback, useEffect } from 'react';

export const FoodDataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [foodItems, setFoodItems] = useState([]);
    const [numerator, setNumerator] = useState(undefined)
    const [percentage, setPercentage] = useState(undefined)
    const [lng, setLng] = useState(133.7);
    const [lat, setLat] = useState(-29.27);
    const [recenterTrigger, setRecenterTrigger] = useState(0);


    useEffect(() => {
        const loadInitialData = async () => {
            await updateFoodItems();
        };
        loadInitialData();
    }, []);


    const updateFoodExperience = useCallback(async () => {
        let foodListData = await fetch('http://localhost:5000/api/getFoodExperience');
        const foodListDataResponse = await foodListData.json();

        setNumerator(foodListDataResponse.numerator)
        setPercentage(foodListDataResponse.percentage)
    }, []);

    const updateFoodItems = async () => {
        const response = await fetch('http://localhost:5000/api/getFoodItems');
        const data = await response.json();
        setFoodItems(data)
    }

    // Define a function that FoodForm can call to add an item without re-rendering itself
    const addFoodItem = useCallback(async (item, event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/api/addFoodItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        const result = await response.json()
        console.log(result)
        if (result.added) {
            await updateFoodItems(); // If the item was added, update the food items list
        } else {
            alert(result.message); // If not added (e.g., item already exists), show an alert with the message
        }
    }, []);

    const deleteFoodItem = async (foodName) => {
        try {
            await fetch(`http://localhost:5000/api/removeFoodItem/${foodName}`, { method: 'DELETE' });
            // Update the state to reflect the deletion in the UI
            setFoodItems(foodItems.filter(item => item['name'] !== foodName));
        } catch (error) {
            console.error('Error deleting food item:', error);
        }
    };

    const value = {
        lng,
        lat,
        setLng,
        setLat,
        recenterTrigger, 
        setRecenterTrigger,
        numerator,
        percentage,
        foodItems,
        setFoodItems,
        addFoodItem,
        deleteFoodItem,
        updateFoodExperience
    };

    return (
        <div className='data-provider'>
            <FoodDataContext.Provider value={value}>
                {children}
            </FoodDataContext.Provider>
        </div>
    )
};
