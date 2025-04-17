import { ReactNode, useState } from "react";

export const weatherIcons = [
  { clear: "src/SVG/day_clear.svg" },
  { clouds: "src/SVG/cloudy.svg" },
  { rain: "src/SVG/day_rain.svg" },
  { drizzle: "src/SVG/mist.svg" },
  { thunderstorm: "src/SVG/thunder.svg" },
  { snow: "src/SVG/snow.svg" },
  { mist: "src/SVG/mist.svg" },
  { smoke: "src/SVG/fog.svg" },
  { haze: "src/SVG/mist.svg" },
  { dust: "src/SVG/mist.svg" },
  { fog: "src/SVG/mist.svg" },
  { sand: "src/SVG/wind.svg" },
  { ash: "src/SVG/mist.svg" },
  { squall: "src/SVG/wind.svg" },
  { tornado: "src/SVG/tornado.svg" },
];

interface Prop {
  children: ReactNode;
}

const Recomendation = ({ children }: Prop) => {
  const [information, setInformation] = useState(false);
  return (
    <>
      {information && (
        <div
          className="alert alert-outline-clear alert-dismissible fade show"
          role="alert"
        >
          {children}
          <button
            onClick={() => setInformation(false)}
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {!information && (
        <button
          onClick={() => setInformation(true)}
          className="btn btn-outline-clear"
        >
          Recommendation for the weather
        </button>
      )}
    </>
  );
};

export default Recomendation;
