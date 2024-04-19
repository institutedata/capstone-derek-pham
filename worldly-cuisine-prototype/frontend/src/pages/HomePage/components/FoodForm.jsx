import React, { useState, useContext } from 'react';
import { FoodDataContext } from './FoodDataContext';


export default function FoodForm() {
  const { addFoodItem, setLng, setLat, lng, setRecenterTrigger } = useContext(FoodDataContext);
  const [displayLoading, setDisplayLoading] = useState(false)
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
    if (!foodId) {
      return null
    }
    try {
      setDisplayStatus('none')
      setDisplayLoading(true)
      const response = await fetch(`http://localhost:5000/api/getFoodOrigin/${encodeURIComponent(foodId)}`);
      const data = await response.json()
      setFoodDataObject(data)
      setDisplayLoading(false)
      setCountryResult(data['origin'])
      setFoodThumbnailURL(data['thumbnailURL'])
      setFoodDescription(data['foodDescription'])
      setArticleURL(data['articleURL'])
      setIsoCode(data['isoCode'])
      setDisplayStatus('block')
      if (lng === data.coords[0]) {
        setRecenterTrigger(prev => prev + 1);
      } else if (lng !== data.coords[0]) {
        setLng(data.coords[0])
        setLat(data.coords[1])
      }
      // console.log(currentFoodData)
      return data
    } catch (error) {
      setDisplayStatus('none')
      console.error(error)
    }
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
          <p className='loader' style={{ gridColumn: 'span 2', display: displayLoading ? 'block' : 'none', fontSize: '24px' }}></p>
          <p id="result" style={{ display: displayStatus }}><span id="flagIcon" className={`fi fi-${isoCode}`}></span>{countryResult}</p>
          <img id="foodThumbnail" src={foodThumbnailURL} style={{ display: displayStatus }} alt="Image" />
          <p id="foodDescription" style={{ display: displayStatus }}>{foodDescription}</p><a id="articleURL" href={articleURL} target="_blank" style={{ display: displayStatus }}>Read more</a>
        </div>
        <button id="addFoodButton" onClick={(e) => { addFoodItem(foodDataObject, e) }} style={{ display: displayStatus }}>Add to list</button>
      </div>
    </>
  )
}