import { Component } from "react";
import WeatherForm from "./WeatherForm"
import { API_KEY } from "../../keys";
import WeatherInfo from "./WeatherInfo";

class WeatherWidget extends Component{

    getGeoLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              this.fetchWeatherByCoords(lat, lon);
            },
            (error) => {
              console.error("Error getting geolocation:", error);
            }
          );
        } else {
          alert("Geolocation is not supported by your browser");
        }
    };
    

    state= {
        temperature: '',
        condition:'',
        city:'',
        country:'',
        icon:'',
        wind_kph:'',
        humidity:'',
        last_updated:'',
        forecast: [],
        error: null
    }

    getWeather = async (e) => {
        const { lat } = e.target.elements;
        const latValue = lat.value;
        e.preventDefault();
    
        if (latValue) {
          const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latValue}&days=7&aqi=no&alerts=no`;
          const response = await fetch(API_URL);
          const data = await response.json();
      
          if (data.forecast && data.forecast.forecastday) {
            console.log("Forecast Data:", data.forecast.forecastday);
      
            this.setState({
              temperature: data.current.temp_c,
              condition: data.current.condition.text,
              city: data.location.name,
              country: data.location.country,
              icon: data.current.condition.icon,
              wind_kph: data.current.wind_kph,
              humidity: data.current.humidity,
              last_updated: data.current.last_updated,
              forecast: data.forecast.forecastday,
              error: null,
            }, () => console.log("State:", this.state));
          } else {
            this.setState({ error: "Invalid API response format" });
          }
        } else {
          this.setState({ error: "Fill the blanks" });
        }
      };
      

    render() {
        return <div>
            <WeatherForm getWeather={this.getWeather} 
            />
            <br></br>
            <WeatherInfo {...this.state} />
        </div>
    }
}

export default WeatherWidget;