import { useEffect } from "react";
import Input from "./Input";
import styles from "./Card.module.css";
import { FieldValues } from "react-hook-form";
import { IoMoonSharp } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import useWeather from "../hooks/useWeather";
import create, { CanceledError } from "../services/weatherService";

const Card = () => {
  const {
    city,
    cityWeather,
    darkMode,
    error,
    isLoading,
    setCity,
    setCityWeather,
    setError,
    setIsLoading,
    toggleMode,
  } = useWeather();

  const today = new Date();

  useEffect(() => {
    setIsLoading(true);

    const { request, cancel } = create(city).getData();

    request
      .then((res) => {
        setCityWeather(res.data);
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
          alert("City not found. Please make sure the city is correct.");
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

  const newCity = (data: FieldValues) => {
    setCity(data.city);
  };

  useEffect(() => {
    localStorage.setItem("savedCity", JSON.stringify(city));
  }, [city]);

  return (
    <div className={darkMode ? styles.bgDarkMode : styles.bgLightMode}>
      <div className={styles.logoContainer}>
        <h1 className={styles.header}>
          <span className={styles.firstLetter}>W</span>eather{" "}
          <span className={styles.firstLetter}>A</span>pp
        </h1>
        <div>
          {darkMode ? (
            <IoMdSunny onClick={toggleMode} size={30} />
          ) : (
            <IoMoonSharp size={30} onClick={toggleMode} />
          )}
          <span className={styles.modeText}>{" Switch Mode"}</span>
        </div>
      </div>
      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && (
        <p className="text-danger">
          Failed to fetch weather data, refresh your browser.
        </p>
      )}
      {cityWeather && (
        <div
          className={
            darkMode
              ? styles.cardContainerDarkMode
              : styles.cardContainerLightMode
          }
        >
          <div className={styles.imgContainer}>
            <div className={styles.weatherIcon}>
              <img
                src={`https://openweathermap.org/img/wn/${cityWeather?.weather[0].icon}@2x.png`}
                alt={`weather icon`}
              />
            </div>
            <div className={styles.tempContainer}>
              <span className={styles.temp}>
                {cityWeather && cityWeather.main.temp
                  ? Math.floor(cityWeather.main.temp)
                  : ""}
              </span>
              <span className={styles.unitDegree}>&deg;C</span>
            </div>
          </div>
          <div className={styles.weatherDetails}>
            <h1>{cityWeather?.name}</h1>
            <h3>Condition: {cityWeather?.weather[0].description}</h3>
            <h4>Humidity: {cityWeather?.main.humidity}%</h4>
            <h4>Wind speed: {cityWeather?.wind.speed}m/s</h4>
            <h4>Wind direction: {cityWeather?.wind.deg}&deg;</h4>
            <h4>Clouds: {cityWeather?.clouds.all}%</h4>
            <h4>
              Date: {today.toLocaleDateString()} at {today.toLocaleTimeString()}
            </h4>
          </div>
        </div>
      )}
      <Input handleSubmission={newCity} />
      <footer className={styles.footer}>&copy;deelovestocode</footer>
    </div>
  );
};

export default Card;
