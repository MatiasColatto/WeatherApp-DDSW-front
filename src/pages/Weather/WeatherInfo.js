import React from "react";
import "./WeatherInfo.css";

const WeatherInfo = (props) => {
  return (
    <div className="weather-container">
      {props.error && (
        <div className="card error">
          <p>{props.error}</p>
        </div>
      )}
      {props.temperature ? (
        <React.Fragment>
          <div className="card">
            <img className="weather-icon" src={props.icon} alt="Weather icon" />
            <div>
              <p>
                Condition: {props.condition}
                <br />
                Place: {props.city} {props.country}
                <br />
                Temperature: {props.temperature}ºC
              </p>
            </div>
          </div>
          <div className="wide-card">
            <div>
              Humidity: {props.humidity}%
              <br />
              Wind: {props.wind_kph} kp/h
              <br />
              Updated at: {props.last_updated}
            </div>
          </div>
          <div className="forecastsome">
              <p> Forecast</p>
            {props.forecast ? (
                <div className="forecast-container forecast-row">
                {props.forecast.map((day, index) => (
                  <div key={index} className="forecast-item">
                    <p>{day.date}</p>
                    <img
                      className="forecast-icon"
                      src={day.day.condition.icon}
                      alt={`Forecast for ${day.date}`}
                    />
                    <p>{day.day.condition.text}</p>
                    <p>Max Temp: {day.day.maxtemp_c}ºC</p>
                    <p>Min Temp: {day.day.mintemp_c}ºC</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </React.Fragment>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WeatherInfo;
