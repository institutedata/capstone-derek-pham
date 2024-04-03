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
        console.log(response)
        // POST request to backend...
        // Fetch updated list...
        if (response.ok) {
            await updateFoodItems()
        } else {
            console.log('ERRO')
            return null
        }
    }, []);

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
