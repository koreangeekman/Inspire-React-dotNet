import { AppState } from "../../AppState.js";
import { Weather } from "../../models/Widget/Weather.js";
import { logger } from "../../utils/Logger.js";
import { accountService } from "../AccountService.js";
import { weatherAPI } from "../AxiosService.js";

const WEATHER_CACHE = {};

class WeatherService {

  changeTempType() {
    const format = AppState.settings.weather.format;
    if (format == 'F') {
      AppState.settings.weather.format = 'C'
    }
    if (format == 'C') {
      AppState.settings.weather.format = 'F'
    }
  }

  async getWeather() {
    const settings = AppState.settings.weather;
    const city = AppState.settings.weather.city;

    // 15min cache use
    if (new Date() - settings.lastPoll < 900000 && WEATHER_CACHE[city]) {
      AppState.widgets.weather = WEATHER_CACHE[city];
      logger.log('returned weather from cache')
      return
    }

    let query = '';
    if (city) {
      query = `?q=${city}`;
    }
    // if (settings.location.length > 0 && settings.coords) { //settings.location = [lon, lat]
    //   query = `?lat=${settings.location[0]}&lon=${settings.location[1]}`;
    // }

    const res = await weatherAPI.get(`${query}`);
    const weatherPoll = new Weather(res.data);

    settings.lastPoll = weatherPoll.details.dt
    if (AppState.account.id) {
      const weather = { lastPoll: settings.lastPoll }
      accountService.updateSettings({ weather });
    }

    logger.log('returned weather from API')
    WEATHER_CACHE[city] = weatherPoll;
    AppState.widgets.weather = WEATHER_CACHE[city];
  }

}

export const weatherService = new WeatherService();