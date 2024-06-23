import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../search.png'
import clear_icon from '../clear.png'
import cloud_icon from '../cloud.png'
import drizzle_icon from '../drizzle.png'
import humidity_icon from '../humidity.png'
import rain_icon from '../rain.png'
import snow_icon from '../snow.png'
import wind_icon from '../wind.png'


const Weather = () => {

   
    const [weatherData, setWeatherData] = useState(false);
    const inputRef = useRef();

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        
        try{
            const api_key=import.meta.env.VITE_APP_ID;
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        
        } catch (error){
            setWeatherData(false);
            console.error('Error fetching weather data:', error);

        }
    };

    useEffect(()=>{
        search("London");
    },[]);

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='city'></input>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
            </div>
            {weatherData?<>
                <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity}</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed}</p>
                    <span>Wind</span>
                </div>
            </div>
    </div>
            </>:<></>}

        
    </div>
  )
}

export default Weather
