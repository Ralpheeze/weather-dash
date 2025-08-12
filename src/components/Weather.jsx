import React, { useState } from "react";
import {API_KEY} from '../config';
import './weather.css';

// TO PUSH FOR THE FIRST TIME TO GITHUB
// 1. git add .
// 2. git commit -m "Your commit message"
// 3. git branch -M main
// 4. git remote add origin <your-repo-url>
// 5. git push -u origin main

//NOTE: You can always check the status of your git repository by 
// using the command "git status" in the terminal

//FROM THE SECOND TIME OF PUSHING TO GITHUB, YOU WILL DO THIS 
//1. git add .
// 2. git commit -m "Your commit message"
// 3. git push

//NOTE: You can always check the status of your git repository by 
// using the command "git status" in the terminal


//FOR YOU RECEIVING THE REPO FROM MY GITHUB FOR THE FIRST TIME
// 1. git clone <your-repo-url>
// 2. cd <your-repo-name>
// 3. npm install
// 4. git fetch origin
// 5. git pull origin {branch name}
// 6. npm run dev

//NOTE: You can switch between branches using the command "git checkout {branch name}"

//FOR YOU RECEIVING THE REPO FROM MY GITHUB FROM THE SECOND TIME
// 1. git fetch origin
// 2. git pull origin {branch name}
// 3. npm run dev

//NOTE: You can switch between branches using the command "git checkout {branch name}"





const Weather = () => {
    const [city, setCity] = useState(""); //sets the city or state after fecthing
    const [weather, setWeather] = useState(null); //displays the weather details
    const [loadingState, setLoadingState] = useState("idle"); // idle, pending, fulfilled, rejected
    const [error, setError] = useState(null); // for error handling

    // STEPS IN USING THE WEATHER API
    // 1. Set up the API key in the config <file>
    // 2. Create a function to fetch the weather data
    // 3. Call the function when the user clicks the search button
    // 4. set up the API connection and fetch the data
    // 5. convert the data to JSON format
    // 6. put the connection in a try and catch block to handle errors
    // 7. check if the API response is ok
    // 8. If the response is ok, set the weather state to the fetched data to display the weather details
    // 9. If the response is not ok, set the error state to an error message

    const fetchWeather = async () => {
      if (!city) {
        setError(weather.message);
        //if the city is not inputted, then set the error state to "Please enter a city name"
      }

      setLoadingState("pending");
      // => loading state = pending;
      setError(null); //clear fetching errors

        try {
          const weatherJSON = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
          const weatherDetails = await weatherJSON.json(); //converts the JSON to JavaScript Objects
          
          console.log("Weather details", weatherDetails);
          
          // if (weatherJSON.ok) {
          //   // => if the API response is ok, then set the weather state to the weatherDetails
          //   setLoadingState("fulfilled");
          //   // => loading state = fulfilled;
          //   setWeather(weatherDetails);
          //   //=> weather state = weatherDetails;
          // }
          //   else {
          //     setError(weather.message);
          //   }
        }

        catch (error) {
          console.error("There was an issue fetching the data", error);
          setError("There was an issue fetching the data. Please try again");
          // => error state = "There was an issue fetching the data. Please try again";
          setLoadingState("rejected");
          // => loading state = rejected;

        }

      }


  // const fetchWeather = async () => {
  //   setLoadingState("pending");
  //   setError(null); //clear fetching errors
  //   //sets up the connection to the API and collects or fetches the data and 
  //   // the connection and collection must be completed before the next line of code runs.
    
  //   try {
  //     const weatherAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`) 
  //   //converts JSON (JAVASCRIPT OBJECT NOTATION) to JavaScript Objects before the next line of code runs
  //   // or before the data is logged to the console
  //     const message = await weatherAPI.json();
  //     console.log("Weather details", message);
      
  //     //.ok refers to if the API response is working or not
  //     //error handling to account for complete fetching of data properties
  //     if (weatherAPI.ok) {
  //       setLoadingState("fulfilled");
  //       setWeather(message);
  //     }
  //   }

  //   catch (error) {
  //     console.log("There was an issue fetching the data", error);
  //     setError("There was an issue fetching the data. Please try again");
  //     setLoadingState("rejected");
  //   }
  // }
   
    

  return (
    <div className="weather-container">
        <h1 className="title">Weather Dashboard</h1>

        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                // city=event.target.value
            />
            <button onClick={fetchWeather} disabled={loadingState === "pending"}>
                Search
            </button>
        </div>
        {/* = EQUAL TO. This is used for the assignment of variables */}
        {/* == LOOSE EQUALITY. This is used in logical statements*/}
        {/* === STRICT EQUALITY. This is used to assign values to states */}

        {/* SHORT-CIRCUIT CONDITIONAL RENDERING */}
        {/* {condition && expression} */}
        {/* the condition must exist (it is either true or defined or it has a value) for the expression to be displayed */}

      {loadingState === "pending" && (
        <div className="loading-spinner">
            {/* SPINNER UI LOADER */}
            <div className="spinner"></div>
            {/* TEXT LOADER */}
            <p>Loading weather data...</p> 
        </div>
      )}

      {/* UI ERROR HANDLING */}
      {loadingState === "rejected" && city === "" && <p className="error">{error}</p>} 

       {/* COMPLEX SHORT-CIRCUIT CONDITIONAL RENDERING */}
        {/* {condition1 && condition2 && expression} */}
        {/* the condition must exist (it is either true or defined or it havs a value) for the expression to be displayed */}
        {loadingState === "fulfilled" && weather && (
        <div className="weather-card">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <h3>{weather.weather[0].description}</h3>
            <h1>{Math.round(weather.main.temp)}°C</h1>
             <h1>LATITUDE is {weather.coord.lat}° and LONGITUDE is {weather.coord.lon}°</h1>
            <p>Timezone: {weather.timezone}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Pressure: {weather.main.pressure}mmHg</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}      
    </div>
  );
};

export default Weather;









// import React, { useState } from "react";
// import {API_KEY} from '../config';
// import './weather.css';

// const Weather = () => {
//     const [city, setCity] = useState(""); //sets the city or state after fecthing
//     const [weather, setWeather] = useState(null); //displays the weather details
//     const [loadingState, setLoadingState] = useState("idle"); // idle, pending, fulfilled, rejected
//     const [error, setError] = useState(null); // for error handling

//     const fetchWeather = async () => {
//         // if (!city) return;
//         setLoadingState("pending");
//         setError(null); //clear fetching errors
//         // setWeather(null);

//         try {
//             const weatherAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`); //link

//             const data = await weatherAPI.json();
//             console.log("weather details", data);

//             //error handling to account for complete fetching of data properties
//             if (weatherAPI.ok) {
//                 setWeather(data);
//                 setLoadingState("fulfilled");
//             } else {
//                 setError("No data was inputted. Input your city  ");
//                 setLoadingState("rejected");
//             }


//         } catch (error) {
//             setError("Failed to fetch weather data");
//             setLoadingState("rejected");
//             console.log("Fecthing error", error);
//         }


//     }

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



// const Greeting = ({ isLoggedIn}) => {
//   return (
//     <h1>{isLoggedIn ? "Welcome Back!" : "Please Sign In"}</h1>
//   );
// }
// export default Greeting;



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
