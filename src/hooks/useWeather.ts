import { useEffect, useState } from "react";
import create, { CanceledError } from "../services/weatherService";


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
  const [cityNotFound, setCityNotFound] = useState<string>('');
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem('savedCity');
    return savedCity ? JSON.parse(savedCity) : ['London'];
  });
  const [cityWeather, setCityWeather] = useState<AllWeatherDetails>();

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    setIsLoading(true);

    const { request, cancel } = create(city).getData();

    request
      .then((res) => {
        setCityWeather(res.data);
        console.log(res.data.list);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        if (err.message && err.message.includes("Network Error")) {
          setError(
            "There was a problem with the network. Please check your connection and try again."
          );
        } else if (
          err.response &&
          err.response.status === 404 &&
          err.response.data &&
          err.response.data.message.includes("city not found")
        ) {
          setCityNotFound("City not found. Please make sure the city is correct.");
          setTimeout(() => {
            setCityNotFound('');
          }, 2000);
        } else if (
          err.response &&
          err.response.status === 404 &&
          err.response.data &&
          err.response.data.message.includes("Internal error")
        ) {
          setError("Refresh Browser");
        } else {
          setError(`An error occurred: ${err.message}`);
        }
        setIsLoading(false);
      });

    return cancel;
  }, [city]);


  return { darkMode, setDarkMode, toggleMode, isLoading, setIsLoading , error, setError, city, setCity, cityWeather, setCityWeather, cityNotFound};
};

export default useWeather;
