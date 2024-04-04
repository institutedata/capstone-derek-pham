/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from 'react';
import { FoodDataContext } from './FoodDataContext';
import gridViewImg from '../../../assets/gridView.png';
import listViewImg from '../../../assets/listView.png';


const FoodList = () => {
    const { foodItems, deleteFoodItem } = useContext(FoodDataContext);
    const [gridView, setGridView] = useState(false)
    // Function to delete a food item


    return (
        <div className="FoodExperienceContainer">
            <h1>List</h1>
            <p>Count: {foodItems.length}</p>
            <button id='listViewButton' onClick={() => { setGridView(!gridView) }}><img src={gridView ? listViewImg : gridViewImg} alt="Grid View" style={{ width: "18px", filter: 'invert(100%)' }} /></button>
            <div id="foodListContainer">
                {gridView ?
                    <ul id="foodListGridView">
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
                    :
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
                }
            </div>
        </div>
    );
};

export default FoodList;
