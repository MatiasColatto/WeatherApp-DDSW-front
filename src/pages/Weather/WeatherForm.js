import React from 'react';
import './WeatherForm.css';

const WeatherForm = props => (
    <div>
        <form onSubmit={props.getWeather}>
            <div className='div'>
                <input type="text" step="any" name="lat" className='input' placeholder="Insert city,country etc." />
            <br></br>
            <button className='button'>
                Get Weather 
            </button>
            </div>
        </form>
    </div>
)

export default WeatherForm; 