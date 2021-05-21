// Axios to make requests
const axios = require('axios').default;

// Get environment variables
const dotenv = require("dotenv")
dotenv.config()

// Make get request to check current weather
const weatherApiKey = process.env.WEATHER_API_KEY
const url = `https://api.openweathermap.org/data/2.5/weather`
//const transitionDuration = 15

exports.getCurrentWeather = async function(zipCode) {
  try {
    const parameters = {
      params: {
        zip: zipCode,
        appid: weatherApiKey,
        units: 'imperial'
      }
    }
    const response = await axios.get(url, parameters);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Get the values needed from weather
exports.getBrightnessLevel = function(weather, userMaximumBrightness) {
  // Get current time in UTC
  let date = new Date();
  let currentTimeInMinutes = Math.round(date.getTime()/1000);
  // let transitionDurationInSeconds = transitionDuration * 60;
  // let currentTimeAfterDuration = currentTimeInMinutes + transitionDurationInSeconds;
  let sunrise = weather.sys.sunrise;
  let sunset = weather.sys.sunset;

  // If the time after duration is after sunset or before sunrise, set the brightness to 100
  if (currentTimeInMinutes >= sunset || currentTimeInMinutes <= sunrise) {
    return 100 * userMaximumBrightness;
  } 
  // Otherwise it's daytime, check the cloudiness and set brightness level based on this
  else {
    return weather.clouds.all * userMaximumBrightness
  }
}