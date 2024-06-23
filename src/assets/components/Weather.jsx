import React from 'react'
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
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type="text" placeholder='city'></input>
            <img src={search_icon} alt="" />
            </div>
        <img src={clear_icon} alt="" className='weather-icon'/>
        <p className='temperature'>16°c</p>
        <p className='location'>London</p>
    </div>
  )
}

export default Weather
