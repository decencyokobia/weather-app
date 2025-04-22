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
import Recommendations from "./Recommendations";
import { randomOptions } from "./RandomOptions";

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

      {cityWeather && (
        <div
          className={
            darkMode
              ? styles.cardContainerDarkMode
              : styles.cardContainerLightMode
          }
        >
          <Input handleSubmission={newCity} />
          <div className={styles.errorMessage}>{error}</div>
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
                    randomOptions.Clouds[
                      Math.floor(Math.random() * randomOptions.Clouds.length)
                    ]}

                  {cityWeather.list[0].weather[0].main === "Rain" &&
                    randomOptions.Rain[
                      Math.floor(Math.random() * randomOptions.Rain.length)
                    ]}

                  {cityWeather.list[0].weather[0].main === "Clear" &&
                    randomOptions.Clear[
                      Math.floor(Math.random() * randomOptions.Clear.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Drizzle" &&
                    randomOptions.Drizzle[
                      Math.floor(Math.random() * randomOptions.Drizzle.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Mist" &&
                    randomOptions.Mist[
                      Math.floor(Math.random() * randomOptions.Mist.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Snow" &&
                    randomOptions.Snow[
                      Math.floor(Math.random() * randomOptions.Snow.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Thunderstorm" &&
                    randomOptions.Thunderstorm[
                      Math.floor(
                        Math.random() * randomOptions.Thunderstorm.length
                      )
                    ]}
                  {cityWeather.list[0].weather[0].main === "Wind" &&
                    randomOptions.Wind[
                      Math.floor(Math.random() * randomOptions.Wind.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Dust" &&
                    randomOptions.Dust[
                      Math.floor(Math.random() * randomOptions.Dust.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Fog" &&
                    randomOptions.Fog[
                      Math.floor(Math.random() * randomOptions.Fog.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Haze" &&
                    randomOptions.Fog[
                      Math.floor(Math.random() * randomOptions.Fog.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Sand" &&
                    randomOptions.Sand[
                      Math.floor(Math.random() * randomOptions.Sand.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Smoke" &&
                    randomOptions.Smoke[
                      Math.floor(Math.random() * randomOptions.Smoke.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Squall" &&
                    randomOptions.Squall[
                      Math.floor(Math.random() * randomOptions.Squall.length)
                    ]}
                  {cityWeather.list[0].weather[0].main === "Tornado" &&
                    randomOptions.Thunderstorm[
                      Math.floor(Math.random() * randomOptions.Tornado.length)
                    ]}
                </h4>
              </Recommendations>
            </div>
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
