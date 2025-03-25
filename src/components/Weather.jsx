import React, { useState } from "react";
import {API_KEY} from '../config';
import './weather.css';

const Weather = () => {
    const [city, setCity] = useState(""); //sets the city or state after fecthing
    const [weather, setWeather] = useState(null); //displays the weather details
    const [loadingState, setLoadingState] = useState("idle"); // idle, pending, fulfilled, rejected
    const [error, setError] = useState(null); // for error handling

    const fetchWeather = async () => {
        // if (!city) return;
        setLoadingState("pending");
        setError(null); //clear fetching errors
        // setWeather(null);

        try {
            const weatherAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`); //link

            const data = await weatherAPI.json();
            console.log("weather details", data);

            //error handling to account for complete fetching of data properties
            if (weatherAPI.ok) {
                setWeather(data);
                setLoadingState("fulfilled");
            } else {
                setError("No data was inputted. Input your city  ");
                setLoadingState("rejected");
            }


        } catch (error) {
            setError("Failed to fetch weather data");
            setLoadingState("rejected");
            console.log("Fecthing error", error);
        }


    }

  return (
    <div className="weather-container">
      <h1 className="title">Weather Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather} disabled={loadingState === "pending"}>
          Search
        </button>
      </div>
      {loadingState === "pending" && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      )}
      {loadingState === "rejected" && <p className="error">{error}</p>}
      {loadingState === "fulfilled" && weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h3>{weather.weather[0].description}</h3>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;


// import React, { useState } from "react";
// import { API_KEY } from "../config"; // ✅ Correct path
// import "./weather.css"; // Import custom styles

// const Weather = () => {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [loadingState, setLoadingState] = useState("idle"); // idle, pending, fulfilled, rejected
//   const [error, setError] = useState(null);

// //   const API_KEY = "YOUR_API_KEY";
// // const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


//   const fetchWeather = async () => {
//     if (!city) return;
//     setLoadingState("pending");
//     setError(null);
//     setWeather(null);
    
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setWeather(data);
//         setLoadingState("fulfilled");
//       } else {
//         setError(data.message);
//         setLoadingState("rejected");
//       }
//     } catch (err) {
//       setError("Failed to fetch weather data.");
//       setLoadingState("rejected");
//     }
//   };

//   return (
//     <div className="weather-container">
//       <h1 className="title">Weather Dashboard</h1>
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Enter city name"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <button onClick={fetchWeather} disabled={loadingState === "pending"}>
//           Search
//         </button>
//       </div>
//       {loadingState === "pending" && (
//         <div className="loading-spinner">
//           <div className="spinner"></div>
//           <p>Loading weather data...</p>
//         </div>
//       )}
//       {loadingState === "rejected" && <p className="error">{error}</p>}
//       {loadingState === "fulfilled" && weather && (
//         <div className="weather-card">
//           <h2>{weather.name}, {weather.sys.country}</h2>
//           <h3>{weather.weather[0].description}</h3>
//           <h1>{Math.round(weather.main.temp)}°C</h1>
//           <p>Humidity: {weather.main.humidity}%</p>
//           <p>Wind Speed: {weather.wind.speed} m/s</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;




// import React, { useState } from "react";
// import "./weather.css"; // Import custom styles
// import API_KEY from './config';


// const Weather = () => {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [loadingState, setLoadingState] = useState("idle"); // idle, pending, fulfilled, rejected
//   const [error, setError] = useState(null);

    // const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
//   const fetchWeather = async () => {
//     if (!city) return;
//     setLoadingState("pending");
//     setError(null);
//     setWeather(null);
    
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setWeather(data);
//         setLoadingState("fulfilled");
//         console.log("fetching weather for:", data);
//       } else {
//         setError(data.message);
//         setLoadingState("rejected");
//       }
//     } catch (err) {
//       setError("Failed to fetch weather data.");
//       setLoadingState("rejected");
//     }
//   };

//   return (
//     <div className="container text-center mt-5 weather-container">
//       <h1 className="mb-4">Weather Dashboard <i className="fas fa-cloud-sun"></i></h1>
//       <div className="input-group mb-3 search-bar">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Enter city name"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={fetchWeather} disabled={loadingState === "pending"}>
//           <i className="fas fa-search"></i> Search
//         </button>
//       </div>
//       {loadingState === "pending" && (
//         <div className="loading-spinner">
//           <i className="fas fa-spinner fa-spin"></i>
//           <p>Loading weather data...</p>
//         </div>
//       )}
//       {loadingState === "rejected" && <p className="alert alert-danger">{error}</p>}
//       {loadingState === "fulfilled" && weather && (
//         <div className="card weather-card p-3">
//           <h2>{weather.name}, {weather.sys.country}</h2>
//           <h3>{weather.weather[0].description}</h3>
//           <h1>{Math.round(weather.main.temp)}°C</h1>
//           <p>Humidity: {weather.main.humidity}%</p>
//           <p>Wind Speed: {weather.wind.speed} m/s</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;






// // import React, { useState } from "react";
// // import "./weather.css"; // Import custom styles
// // // import { FaSearch, FaCloudSun, FaSpinner } from "react-icons/fa";

// // const Weather = () => {
// //   const [city, setCity] = useState("");
// //   const [weather, setWeather] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const API_KEY = "cd4859589eea014019771614af39eee3";

// //   const fetchWeather = async () => {
// //     if (!city) return;
// //     setLoading(true);
// //     setError(null);
// //     setWeather(null);
    
// //     try {
// //       const response = await fetch(
// //         `b1b15e88fa797225412429c1c50c122a1">api.openweathermap.org/data/2.5/forecast?id&appid={API key}`
// //         );
// //       const data = await response.json();
// //       if (response.ok) {
// //         setWeather(data);
// //       } else {
// //         setError(data.message);
// //       }
// //     } catch (err) {
// //       setError("Failed to fetch weather data.");
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="container text-center mt-5 weather-container">
// //       <h1 className="mb-4"> <i className="fas fa-cloud-sun">Weather Dashboard</i></h1>
// //       <div className="input-group mb-3 search-bar">
// //         <input
// //           type="text"
// //           className="form-control"
// //           placeholder="Enter city name"
// //           value={city}
// //           onChange={(e) => setCity(e.target.value)}
// //         />
// //         <button className="btn btn-primary" onClick={fetchWeather}>
// //         <i className="fas fa-search">Search</i> 
// //         </button>
// //       </div>
// //       {loading && <i className="fas fa-spinner fa-spin"></i>}
// //       {error && <p className="alert alert-danger">{error}</p>}
// //       {weather && (
// //         <div className="card weather-card p-3">
// //           <h2>{weather.name}, {weather.sys.country}</h2>
// //           <h3>{weather.weather[0].description}</h3>
// //           <h1>{Math.round(weather.main.temp)}°C</h1>
// //           <p>Humidity: {weather.main.humidity}%</p>
// //           <p>Wind Speed: {weather.wind.speed} m/s</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Weather;
