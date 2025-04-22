import useWeather from "../hooks/useWeather";

const recommendation = () => {
  const {cityWeather} = useWeather();
  const weatherType = cityWeather && cityWeather.list[0].weather[0].main;

  let randomOptions: Record<string, string[]> = {
    "Clear": [
        "Sun’s out—great day for a walk or picnic! 🌞",
        "Perfect weather to get some Vitamin D 🌻",
        "Sunglasses on, good vibes only 😎",
        "Don’t forget sunscreen if you're staying out long! 🧴",
        "Try an outdoor café or rooftop spot today 🍹"
      ],
      "Clouds": [
        "Cloudy skies, but that doesn't mean gloomy vibes! ☁️",
        "Perfect day to power through your to-do list 💻",
        "Soft light is perfect for photography 📸",
        "Go for a walk—cool weather makes it easy 🚶‍♂️",
        "Grab a coffee and enjoy the cozy feel ☕"
      ],
      "Rain": [
        "Rainy day vibes: tea, chill music, and a blanket 🎶☕",
        "Don’t forget your umbrella! ☂️",
        "Good excuse to stay in and binge-watch something 🍿",
        "Perfect time to try a new recipe or journal indoors 📝",
        "Grab a warm drink and enjoy the sound of rain."
      ],
      "Thunderstorm": [
        "Stay indoors and stay safe ⚡",
        "Unplug sensitive electronics if the storm’s intense 🔌",
        "Read a book or journal while it passes 📖",
        "Light a candle and enjoy the stormy ambiance 🕯️",
        "Keep your phone charged in case of outage 🔋"
      ],
      "Drizzle": [
        "Light rain outside—grab a hoodie and you're good 🌧️",
        "A gentle drizzle makes walks feel poetic ✨",
        "Perfect weather for soft music and deep thoughts 🎵",
        "Maybe hit up a bookstore or café nearby 📚",
        "Great day for cozying up indoors with your fave drink ☕"
      ],
      "Snow": [
        "Bundle up! It's snowing out there 🧣🧤",
        "Hot chocolate and snow views? Yes, please 🍫❄️",
        "Build a snowman or go for a wintery walk ⛄",
        "Drive safely—roads might be slippery 🚗",
        "Stay warm and maybe try baking something cozy 🍪"
      ],
      "Mist": [
        "Misty morning? Perfect time for reflection 🧘",
        "Visibility is low—be extra cautious while driving 🚘",
        "Add some soft lofi to the misty vibe 🎶",
        "Wear a light jacket—it might feel chilly 🧥",
        "Enjoy the calm and quiet of the foggy weather 🌫️"
      ],
      "Fog": [
        "Foggy day—slow down and drive safe 🐢🚗",
        "Use fog lights if you're heading out 🌁",
        "Perfect time for journaling or meditating indoors 📝",
        "Grab a cozy drink and relax ☕",
        "Keep warm—fog can make it feel colder than it is ❄️"
      ],
      "Haze": [
        "Air might be dusty or dry—wear a mask outdoors 😷",
        "Limit time outside if you have allergies 🤧",
        "Close windows and run an air purifier if you can 🌬️",
        "Keep hydrated throughout the day 💧",
        "Great excuse to chill indoors with a good book 📚"
      ],
      "Dust": [
        "Dust in the air—wear a mask if you're going out 😷",
        "Try to stay indoors with windows closed 🏠",
        "Avoid strenuous activity outside 🌪️",
        "Great day for some indoor self-care 🧖",
        "Use this time to catch up on indoor hobbies 🎨"
      ],
      "Sand": [
        "Blowing sand or dust—protect your eyes and mouth 🕶️😷",
        "Avoid outdoor activities if visibility is low 🚫",
        "Stay indoors and keep windows shut 🪟",
        "Clean filters after the storm passes 🧹",
        "Hydrate well—sandstorms can dry the air 💦"
      ],
      "Smoke": [
        "Air quality might be poor—stay indoors if possible 🏡",
        "Avoid heavy exercise outside 🏃‍♂️🚫",
        "Use air purifiers if available 🌫️",
        "Close windows to keep smoke out 🚫🪟",
        "Watch a movie and keep things chill indoors 🎬"
      ],
      "Squall": [
        "Sudden gusts of wind? Stay alert and indoors 💨",
        "Bring in anything from your balcony or yard 🪴",
        "Avoid cycling or motorbiking today 🚲🚫",
        "Not the day for outdoor plans—reschedule safely 📆",
        "Perfect time to work on an indoor project 🧩"
      ],
      "Tornado": [
        "Take cover—tornado warning in effect! 🚨",
        "Stay away from windows and move to a safe zone 🛡️",
        "Keep emergency supplies nearby 🧃🔦",
        "Check weather alerts regularly 📲",
        "Stay calm and keep communication open 📞"
      ],
      "Wind": [
          "It’s windy out there—secure loose items outdoors 💨",
          "Avoid wearing flowy clothes that can flap too much 🧥😂",
          "Might not be ideal for biking or outdoor workouts 🚴‍♂️🚫",
          "Great day to fly a kite if it’s not too strong 🪁",
          "Watch out for dust or debris being blown around 🌪️",
          "Close windows to avoid things flying inside 🪟",
          "Wind can dry your skin—stay moisturized and hydrated 💧"
  ]
  
    };

    if (!weatherType || !randomOptions[weatherType]) return null;

    const options = randomOptions[weatherType];
    const randomTip = options[Math.floor(Math.random() * options.length)];
  
    return randomTip;
}

export default recommendation;




  
  