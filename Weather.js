import React, {useState } from 'react';
import './Weather.css';
import axios from 'axios';

import search_icon from '../photos/searchicon2.png';
import humidity from '../photos/weather.png';
import windspeed from '../photos/wind.png';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
   
   console.log("api key:", apiKey);

  const fetchWeatherData = async () => {
    if (!city) return;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className='Weather'>
      <div className='searchbar'>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleCityChange}
            id='city'
            value={city}
            type='text'
            placeholder='search'
          />
          <button type='submit'>
            <img src={search_icon} alt='search' />
          </button>
        </form>
      </div>

      {loading && <p>Loading weather data...</p>}
      {error && <p className="error">Error: {error}</p>}

      {weatherData && (
        <>
          <img
            className='photo'
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />

          <p className='thedegree'>{weatherData.main.temp}°C</p>
          <p className='thecity'>{weatherData.name}, {weatherData.sys.country}</p>

          <div className='therows'>
            <div className='thecolumn'>
              <img className='humidity' src={humidity} alt='Humidity' />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className='thecolumn'>
              <img className='wind' src={windspeed} alt='Wind Speed' />
              <div>
                <p>{weatherData.wind.speed} km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
