import { ReactNode } from "react";

export const recommendations = {
  Clear: "Sun’s out—great day for a walk or picnic! 🌞",
  Rain: "Don’t forget your umbrella! ☂️",
  Snow: "Bundle up—perfect day for hot cocoa! ❄️☕",
  Clouds: "Cloudy skies = great lighting for selfies 📸",
  Thunderstorm: "Stormy skies—stay safe and indoors ⚡",
  Mist: "Foggy morning? Great time for a slow start ☁️☕",
  Drizzle: "Light rain—good time for a cozy playlist 🎶",
  Wind: "Hold on to your hat—it's windy out! 💨",
};

interface Prop {
  children: ReactNode;
}

const Recommendations = ({ children }: Prop) => {
  return <>{children}</>;
};

export default Recommendations;
