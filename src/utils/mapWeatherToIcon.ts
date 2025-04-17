const mapWeatherToIcon = (condition: string): string => {
    const normalizedCondition = condition.toLowerCase();
  
    switch (normalizedCondition) {
      case "clear":
        return "day_clear.svg";
      case "clouds":
        return "cloudy.svg";
      case "rain":
        return "day_rain.svg";
      case "drizzle":
        return "mist.svg";
      case "thunderstorm":
        return "thunder.svg";
      case "snow":
        return "snow.svg";
      case "mist":
      case "haze":
      case "fog":
      case "ash":
      case "dust":
        return "mist.svg";
      case "smoke":
        return "fog.svg";
      case "sand":
      case "squall":
        return "wind.svg";
      case "tornado":
        return "tornado.svg";
      default:
        return "day_partial_cloud.svg";
    }
  };
  
  export default mapWeatherToIcon;
  