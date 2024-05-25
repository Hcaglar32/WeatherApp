import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes`);
        setWeatherData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (location && location.length >= 3) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  return (
    <>
      <div className='app-container'>
        <h1 className='app-title'>Hava durumu uygulaması</h1>
        <div className='input-container'>
          <input type="text" className='location-input' placeholder='Şehir girin...' value={location} onChange={handleLocationChange} />
        </div>
      </div>

      {weatherData && (
        <div className='weather-container'>
          <h1>{location.value}</h1>
          {weatherData.forecast.forecastday.map((day) => (
            <div className='day-container' key={day.date}>
              <h2 className='date'>{day.date}</h2>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
              <p className='temp'>{day.day.avgtemp_c} C</p>
              <p className='temp'>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}

    </>
  )
}

export default App
