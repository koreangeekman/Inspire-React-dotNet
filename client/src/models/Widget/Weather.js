export class Weather {
  constructor(data) {
    this.data = {
      temp: data.main.temp,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      feels_like: data.main.feels_like,
      weather: data.weather["0"].description,
      weatherIcon: `https://openweathermap.org/img/wn/${data.weather["0"].icon}.png`
    }
    this.details = {
      weather: data.weather["0"].description,
      city: data.name,
      timezone: data.timezone, // pre-formatting / shift in seconds from UTC
      sunrise: new Date(data.sys.sunrise),
      sunset: new Date(data.sys.sunset),
      humidity: data.main.humidity,
      dt: new Date(data.dt * 1000)
    }
    this.conditions = {
      clouds: data.clouds.all, // % coverage cloudiness
      rain: data.rain ? data.rain : { '3h': 0 }, // 3 hr rain volume in mm
      snow: data.snow ? data.snow : { '3h': 0 }, // 3 hr snow volume in mm
      visibility: data.visibility, //  distance in meters (up to 10km limit)
      wind: data.wind
    }

    // below for if using another version from the openweather api with 4-5 days of every 3 hrs information
    // this.data.temp = data.list[0].main.temp
    // this.data.temp_min = data.list[0].main.temp_min
    // this.data.temp_max = data.list[0].main.temp_max
    // this.data.feels_like = data.list[0].main.feels_like
    // this.data.weatherIcon = data.list[0].weather[0].icon
    // this.details.weather = data.list[0].weather[0].description
    // this.details.location = data.city.name
    // this.details.timezone = data.city.timezone // pre-formatting / shift in seconds from UTC
    // this.details.sunrise = data.city.sunrise // pre-formatting
    // this.details.sunset = data.city.sunset // pre-formatting
    // this.details.humidity = data.list[0].main.humidity
    // this.conditions.clouds = data.list[0].clouds // % coverage cloudiness
    // this.conditions.rain = data.list[0].rain ? data.list[0].rain : { '3h': 0 } // 3 hr rain volume in mm
    // this.conditions.snow = data.list[0].snow ? data.list[0].snow : { '3h': 0 } // 3 hr snow volume in mm
    // this.conditions.visibility = data.list[0].visibility // % coverage cloudiness
    // this.conditions.wind = data.list[0].wind
  }
}