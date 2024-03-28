/* eslint-disable react/no-unknown-property */
import React, { useContext } from 'react';
import { FoodDataContext } from './FoodDataContext';

const FoodList = () => {
    const { foodItems, setFoodItems } = useContext(FoodDataContext);

    // Function to delete a food item
    const deleteFoodItem = async (foodName) => {
        try {
            await fetch(`http://localhost:5000/api/removeFoodItem/${foodName}`, { method: 'DELETE' });
            // Update the state to reflect the deletion in the UI
            setFoodItems(foodItems.filter(item => item['name'] !== foodName));
        } catch (error) {
            console.error('Error deleting food item:', error);
        }
    };

    return (
        <div className="FoodExperienceContainer">
            <h1>List</h1>
            <div id="foodListContainer">
                <ul id="foodList">
                    {foodItems.map(item => (
                        <li key={item._id} countrydata={item['origin']}>
                            <div>
                                <span className={`fi fi-${item.isoCode}`}></span>
                                <p>
                                    &nbsp;{item['name']}
                                </p>
                                <button onClick={() => deleteFoodItem(item['name'])}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FoodList;
