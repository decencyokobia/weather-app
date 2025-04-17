import { useState } from "react";

interface City {
  name: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Main {
  temp: number;
  humidity: number;
  feels_like: number;
  pressure: number;
}

export interface Weather {
  id: number;
  description: string;
  icon: string;
  main: string;
}

interface List {
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  dt_txt: string;
  id: number;
}

export interface AllWeatherDetails {
  city: City;
 list: List[];
}

const useWeather = () => {
  const [darkMode, setDarkMode] = useState(()=> {
    const savedMode = localStorage.getItem('savedMode');
    return savedMode ? JSON.parse(savedMode) : false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem('savedCity');
    return savedCity ? JSON.parse(savedCity) : ["London"]
  });
  const [cityWeather, setCityWeather] = useState<AllWeatherDetails>();

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return { darkMode, setDarkMode, toggleMode, isLoading, setIsLoading , error, setError, city, setCity, cityWeather, setCityWeather};
};

export default useWeather;
