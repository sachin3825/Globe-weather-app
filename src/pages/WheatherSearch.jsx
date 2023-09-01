import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { snapshot, useSnapshot } from "valtio";
import { CiSearch } from "react-icons/ci";

import state from "../store";
import CustomButton from "../components/CustomButton";
import { fadeAnimation, slideAnimation } from "../config/motion";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";

import snow from "../assets/snow.png";
import wind from "../assets/wind.png";

const WeatherSearch = () => {
  const snap = useSnapshot(state);
  const api_key = "b3fbcc5265670448b43c4c538678a35e";

  const [cityData, setCityData] = useState(null);
  const [weatherImage, setWeatherImage] = useState(cloud);
  const [error, setError] = useState(null);

  const search = async () => {
    setError(null);
    const element = document.querySelector(".cityInput");
    const cityName = element.value;
    if (!cityName) {
      setError("Please enter a city name.");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCityData(data);
        setError(null); // Clear any previous error
      } else {
        setError("City not found. Please enter a valid city name.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    }
  };

  const grantAccess = () => {
    // Request location permission
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setCityData(data);
            setError(null);
          } else {
            setError("Location not found. Please try again later.");
          }
        } catch (error) {
          setError("Error fetching data. Please try again later.");
        }
      },
      () => {
        setError("Location access denied or unavailable.");
      }
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    const fetchWeatherImage = (weatherType) => {
      // Map weather condition to corresponding image
      const weatherImageMap = {
        Clear: clear,
        Clouds: cloud,
        Drizzle: drizzle,
        Rain: rain,
        Snow: snow,
        Mist: cloud,
        Smoke: cloud,
        Haze: cloud,
        Dust: cloud,
        Fog: cloud,
        Sand: cloud,
        Ash: cloud,
        Squall: wind,
        Tornado: wind,
      };

      return weatherImageMap[weatherType] || cloud; // Default to cloud image
    };

    if (cityData) {
      const weatherType = cityData.weather[0].main;
      const newWeatherImage = fetchWeatherImage(weatherType);
      setWeatherImage(newWeatherImage);
    }
  }, [cityData]);

  return (
    <AnimatePresence>
      {!snap.intro && (
        <div className='w-full flex  flex-col gap-5 justify-center items-center p-3 '>
          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton
              type='filled'
              title={"Grant access"}
              handleClick={() => grantAccess()}
              customStyle={"w-fit px-4 py-2.5 font-bold text-sm"}
            />
            <CustomButton
              type='filled'
              title={"Go Back"}
              handleClick={() => (state.intro = true)}
              customStyle={"w-fit px-4 py-2.5 font-bold text-sm ml-5"}
            />
          </motion.div>
          <div className='container w-full'>
            <motion.div {...slideAnimation("down")}>
              <div className='top-bar flex items-center justify-center gap-5'>
                <input
                  type='text'
                  placeholder='Search'
                  className='cityInput w-2/6 h-10 bg-white border-none outline-none rounded-full pl-10 text-xl focus:border-black focus:border-spacing-2 transition-all duration-200 focus:outline'
                  onKeyDownCapture={handleKeyPress}
                />
                <div
                  onClick={search}
                  className='flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200'
                >
                  <CiSearch />
                </div>
                <div className='error-message text-red-500'>{error}</div>
              </div>
            </motion.div>
          </div>
          {cityData && (
            <motion.div {...fadeAnimation} className='mt-5'>
              <h1 className='text-4xl font-bold text-white'>{cityData.name}</h1>
            </motion.div>
          )}
          {cityData && (
            <motion.div
              {...fadeAnimation}
              className='flex justify-between w-1/2 items-center lg:flex-row sm:flex-col md:gap-5'
            >
              <div className='flex text-white gap-5 items-center'>
                <img src={weatherImage} alt='weather' width={80} />
                <h2 className='text-2xl'>
                  {(cityData.main.temp - 273.15).toFixed(1)}°C
                </h2>
              </div>
              <div className='flex object-contain w-content h-full items-center  gap-3 text-slate-300'>
                <img src={humidity} alt='humidity' />
                <div>
                  <p className='text-lg'>{cityData.main.humidity}%</p>
                  <p className='text-xs'>Humidity</p>
                </div>
              </div>
              <div className='flex object-contain w-content h-full items-center gap-3 text-slate-300'>
                <img src={wind} alt='wind' />
                <div>
                  <p className='text-lg'>{cityData.wind.speed} km/h</p>
                  <p className='text-xs'>Wind speed</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default WeatherSearch;
