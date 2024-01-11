import React, { useEffect, useState } from "react";
import { Input } from "../../components";
import styles from "./HomeContainer.module.css";
import search_icon from "../../assets/search.png";
import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloud.png";
import drizzle_icon from "../../assets/drizzle.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/wind.png";
import humidity_icon from "../../assets/humidity.png";
import storm_icon from "../../assets/thunderstorm.png";
import haze_icon from "../../assets/haze.png";

interface WeatherData {
  main: {
    humidity?: number;
    temp?: number;
  };
  wind: {
    speed?: number;
  };
  name?: string;
  weather: {
    description: string;
    icon: string;
  }[];
}

const HomeContainer: React.FC = () => {
  const apiKey = "c1bbe714ac530d052910f744c4c3da7b";
  const [wicon, setWicon] = useState<string>(cloud_icon);
  const [humidity, setHumidity] = useState<string>("N/A");
  const [windSpeed, setWindSpeed] = useState<string>("N/A");
  const [temperature, setTemperature] = useState<string>("N/A");
  const [location, setLocation] = useState<string>("location");
  const [condition, setCondition] = useState<string>("weather condition");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      searchByCoordinates(latitude, longitude);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const search = async () => {
    if (searchValue === "") {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=Metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data: WeatherData = await response.json();

      updateWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const searchByCoordinates = async (latitude: number, longitude: number) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data: WeatherData = await response.json();

      updateWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const updateWeatherData = (data: WeatherData) => {
    if (data.main && data.main.humidity) {
      setHumidity(`${data.main.humidity}%`);
    } else {
      setHumidity("N/A");
    }

    if (data.wind && data.wind.speed) {
      setWindSpeed(`${Math.floor(data.wind.speed)} Km/h`);
    } else {
      setWindSpeed("N/A");
    }

    if (data.main && data.main.temp) {
      setTemperature(`${Math.floor(data.main.temp)}°C`);
    } else {
      setTemperature("N/A");
    }

    if (data.name) {
      setLocation(data.name);
    } else {
      setLocation("N/A");
    }

    if (data.weather && data.weather[0] && data.weather[0].description) {
      setCondition(data.weather[0].description);
    } else {
      setCondition("weather condition");
    }

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
      setWicon(storm_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWicon(snow_icon);
    } else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
      setWicon(haze_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  return (
    <div className={styles.container} style={{ height: "100vh" }}>
      <div>
        <h1 className="font-semibold text-4xl text-white flex justify-center items-center pt-10">
          Welcome to Weather App!😊
        </h1>
      </div>
      <div className="top-bar flex justify-center items-center h-1/6 space-x-5">
        <Input
          type="text"
          placeholder="Search"
          className={`${styles.cityInput} cityInput`}
          value={searchValue}
          onChange={handleInputChange}
        />
        <div className={`${styles.searchIcon}`}>
          <img src={search_icon} alt="magnifying glass icon" onClick={search} />
        </div>
      </div>
      <div className={styles.weatherImage}>
        <img src={wicon} alt="weather icon" />
      </div>
      <div className={`${styles.weatherTemp} weathertemp`}>{temperature}</div>
      <div className={`${styles.weatherLocation} weatherLocation`}>{location}</div>
      <div className={`${styles.weatherCondition} weatherCondition`}>{condition}</div>
      <div className={styles.dataContainer}>
        <div className={styles.element}>
          <img src={humidity_icon} alt="icon humidity" className={styles.icon} />
          <div className={styles.data}>
            <div className="humidityPercent">{humidity}</div>
            <div className={styles.text}>Humidity</div>
          </div>
        </div>

        <div className={styles.element}>
          <img src={wind_icon} alt="" className={styles.icon} />
          <div className={styles.data}>
            <div className="windRate">{windSpeed}</div>
            <div className={styles.text}>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
