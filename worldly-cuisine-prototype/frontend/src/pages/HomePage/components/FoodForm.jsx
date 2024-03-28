import React, { useState, useContext } from 'react';
import { FoodDataContext } from './FoodDataContext';


export default function FoodForm() {
  const { addFoodItem, setLng, setLat } = useContext(FoodDataContext);
  const [inputValue, setInputValue] = useState('');
  const [foodDataObject, setFoodDataObject] = useState({});
  const [countryResult, setCountryResult] = useState('');
  const [foodThumbnailURL, setFoodThumbnailURL] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [articleURL, setArticleURL] = useState('#');
  const [displayStatus, setDisplayStatus] = useState('none');
  const [isoCode, setIsoCode] = useState('');

  async function fetchFoodData(foodId, event) {
    event.preventDefault();
    setDisplayStatus('none')
    const response = await fetch(`http://localhost:5000/api/getFoodOrigin/${encodeURIComponent(foodId)}`);
    const data = await response.json()
    setFoodDataObject(data)
    setCountryResult(data['origin'])
    setFoodThumbnailURL(data['thumbnailURL'])
    setFoodDescription(data['foodDescription'])
    setArticleURL(data['articleURL'])
    setIsoCode(data['isoCode'])
    setDisplayStatus('block')
    setLng(data.coords[0])
    setLat(data.coords[1])
    // console.log(currentFoodData)
    return data
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className="foodFormContainer">
        <form id="foodForm" onSubmit={(e) => { fetchFoodData(inputValue, e) }}>
          <input type="text" id="foodInput" value={inputValue}
            onChange={handleInputChange} />
          <button id="mainButton" type="submit">Find Origin</button>
          <button id="altButton" type="submit">🔍</button>
        </form>
        <div className="resultContainer" id="resultContainer">
          <p id="result" style={{ display: displayStatus }}><span id="flagIcon" className={`fi fi-${isoCode}`}></span>{countryResult}</p>
          <img id="foodThumbnail" src={foodThumbnailURL} style={{ display: displayStatus }} alt="Image" />
          <p id="foodDescription" style={{ display: displayStatus }}>{foodDescription}</p><a id="articleURL" href={articleURL} target="_blank">Read more</a>
        </div>
        <button id="addFoodButton" onClick={(e) => { addFoodItem(foodDataObject, e) }} style={{ display: displayStatus }}>Add to list</button>
      </div>
    </>
  )
}