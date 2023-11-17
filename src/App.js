import './App.css';
import { useEffect, useState } from 'react';
import Route from './context/Routing';
import Home from './pages/home';
import Register from './pages/register';
import WeatherWidget from './pages/Weather/WeatherWidget';

function App() {

  const [data, setData] = useState(null);

  async function fetchData() {
    const response = await fetch(process.env.REACT_APP_API_URL);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <div className='navbar'>Weather Widget App</div>
      <Route path="/">
      <Home/>
      </Route>
      <Route path="/register">
        <Register/>
        </Route>
        <Route path="/weather">
          <WeatherWidget/>
      </Route>
    </div>
  );
}

export default App;
