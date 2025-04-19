import { useEffect } from "react";
import Input from "./Input";
import styles from "./Card.module.css";
import { FieldValues } from "react-hook-form";
import { IoMoonSharp } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import useWeather from "../hooks/useWeather";
import ForcastCards from "./ForcastCards";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { BsClouds } from "react-icons/bs";
import Recommendations, { recommendations } from "./Recommendations";

const Card = () => {
  const { city, cityWeather, darkMode, error, isLoading, setCity, toggleMode } =
    useWeather();

  const date = new Date();
  const today = date.getDate();
  const month = date.toLocaleDateString("en-En", { month: "long" });

  const newCity = (data: FieldValues) => {
    setCity(data.city);
  };

  useEffect(() => {
    sessionStorage.setItem("savedCity", JSON.stringify(city));
  }, [city]);

  useEffect(() => {
    sessionStorage.setItem("savedMode", JSON.stringify(darkMode));
  });

  return (
    <div className={darkMode ? styles.bgDarkMode : styles.bgLightMode}>
      <div className={styles.logoContainer}>
        <h1 className={styles.header}>
          <span className={styles.firstLetter}>W</span>eather{" "}
          <span className={styles.firstLetter}>A</span>pp
        </h1>
        <div>
          {darkMode ? (
            <IoMdSunny onClick={toggleMode} size={20} />
          ) : (
            <IoMoonSharp size={20} onClick={toggleMode} />
          )}
          <span className={styles.modeText}>{" Switch Mode"}</span>
        </div>
      </div>
      {isLoading && (
        <div className="d-flex align-items-center">
          <strong role="status" style={{ fontSize: "1.6rem", color: "green" }}>
            Fetching weather data....
          </strong>
          <div
            className="spinner-border ms-auto text-success"
            style={{ width: "2rem", height: "2rem" }}
            aria-hidden="true"
          ></div>
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
          <Input handleSubmission={newCity} />
          <div className={styles.tempnConditionDisplay}>
            <div className={styles.tempContainer}>
              <span className={styles.temp}>
                {cityWeather && cityWeather.list[0].main.temp
                  ? Math.floor(cityWeather.list[0].main.temp)
                  : ""}
              </span>
              <span className={styles.unitDegree}>&deg;</span>
            </div>
            <div className={styles.weatherDescription}>
              <span className={styles.styleCondition}>
                {cityWeather?.list[0].weather[0].main}
              </span>
              <span className={styles.styleDate}>
                Today, {`${today} ${month}`}
              </span>
            </div>
          </div>
          <div className={styles.weatherIcon}>
            <div
              className={
                darkMode
                  ? styles.recommendationsDarkMode
                  : styles.recommendationsLightMode
              }
            >
              <Recommendations>
                <h4>
                  {cityWeather.list[0].weather[0].main === "Clouds" &&
                    recommendations.Clouds}

                  {cityWeather.list[0].weather[0].main === "Rain" &&
                    recommendations.Rain}

                  {cityWeather.list[0].weather[0].main === "Clear" &&
                    recommendations.Clear}
                  {cityWeather.list[0].weather[0].main === "Drizzle" &&
                    recommendations.Drizzle}
                  {cityWeather.list[0].weather[0].main === "Mist" &&
                    recommendations.Mist}
                  {cityWeather.list[0].weather[0].main === "Snow" &&
                    recommendations.Snow}
                  {cityWeather.list[0].weather[0].main === "Thunderstorm" &&
                    recommendations.Thunderstorm}
                  {cityWeather.list[0].weather[0].main === "Wind" &&
                    recommendations.Wind}
                </h4>
              </Recommendations>
            </div>
            {/* //Todo => make recomendations random according to the weather conditions */}
            <img
              srcSet=""
              src={`https://openweathermap.org/img/wn/${cityWeather.list[0].weather[0].icon}@2x.png`}
              alt={`weather icon`}
            />
          </div>
          <div className={darkMode ? styles.wdDarkMode : styles.wdLightMode}>
            <h1 className={styles.countryStyle}>{cityWeather?.city.name}</h1>
            <div className={styles.weatherDetailsItems}>
              <div>
                <h4 className={styles.wDicons}>
                  <WiHumidity />
                  Humidity
                </h4>
                <h4 className={styles.wDicons}>
                  <FaWind />
                  Wind speed
                </h4>
                <h4 className={styles.wDicons}>
                  <BsClouds />
                  Clouds
                </h4>
              </div>
              <div>
                <h4>:</h4>
                <h4>:</h4>
                <h4>:</h4>
              </div>
              <div>
                <h4>{cityWeather?.list[0].main.humidity}%</h4>
                <h4>{cityWeather?.list[0].wind.speed}m/s</h4>
                <h4>{cityWeather?.list[0].clouds.all}%</h4>
              </div>
            </div>
          </div>

          <h2 className={styles.forcastText}>Forcast Report</h2>
          <div className={styles.forcastHolder} key={cityWeather?.list[0].id}>
            {cityWeather?.list.map((forecast) => (
              <ForcastCards
                forcastDate={forecast.dt_txt.substring(5, 10)}
                time={forecast.dt_txt.substring(10, 16)}
                temperature={Math.floor(forecast.main.temp)}
                srcImg={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                altImg={"weather icon"}
              />
            ))}
          </div>
        </div>
      )}

      {/* <footer className={styles.footer}>&copy;deelovestocode</footer> */}
    </div>
  );
};

export default Card;
