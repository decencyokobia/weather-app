import { useEffect } from "react";
import Input from "./Input";
import styles from "./Card.module.css";
import { FieldValues } from "react-hook-form";
import { IoMoonSharp } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import useWeather from "../hooks/useWeather";
import create, { CanceledError } from "../services/weatherService";
import ForcastCards from "./ForcastCards";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { BsClouds } from "react-icons/bs";
import mapWeatherToIcon from "../utils/mapWeatherToIcon";

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

  const date = new Date();
  const today = date.getDate();
  const month = date.toLocaleDateString("en-En", { month: "long" });

  let condition = cityWeather && cityWeather.list[0].weather[0].main;
  let icon = condition ? `src/SVG/${mapWeatherToIcon(condition)}` : "";

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

  useEffect(() => {
    localStorage.setItem("savedMode", JSON.stringify(darkMode));
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
            <IoMdSunny onClick={toggleMode} size={30} />
          ) : (
            <IoMoonSharp size={30} onClick={toggleMode} />
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
            <img srcSet="" src={`${icon}`} alt={`weather icon`} />

            {/* <div className={styles.recommendation}>
              {cityWeather?.list[0].weather[0].description === "light rain" ? (
                <Recomendation
                  children={
                    <>
                      <strong>Light Rain</strong>
                      <p className={styles.recoInfo}>
                        As is most likely to be a rainy day, don't leave the
                        house without your umbrella, a jacket and cover up. As
                        is most likely to be a rainy day, don't leave the house
                        without your umbrella, a jacket and cover up. As is most
                        likely to be a rainy day, don't leave the house without
                        your umbrella, a jacket and cover up.{" "}
                      </p>
                    </>
                  }
                />
              ) : (
                ""
              )}
            </div> */}
            {/* //Todo => will add recomendation according to the weather conditions */}
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
                srcImg={`src/SVG/${mapWeatherToIcon(forecast.weather[0].main)}`}
                altImg={"weather icon"}
              />
            ))}
          </div>
        </div>
      )}

      <footer className={styles.footer}>&copy;deelovestocode</footer>
    </div>
  );
};

export default Card;
