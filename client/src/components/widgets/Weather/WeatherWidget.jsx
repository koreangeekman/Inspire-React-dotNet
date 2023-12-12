import Pop from "../../../utils/Pop.js";
import React from "react";
import Icon from "@mdi/react";
import { mdiRefreshCircle } from '@mdi/js';
import { logger } from "../../../utils/Logger";
import { AppState } from "../../../AppState";
import { weatherService } from "../../../services/Widgets/WeatherService.js";
import "../../../assets/scss/widget/Weather/WeatherWidget.scss"
import WeatherData from "./WeatherData.jsx";
import WeatherDetails from "./WeatherDetails.jsx";

export default function WeatherWidget() {
  
  let temps = null;
  let weather = null;
  let settings = null;

  async function getWeather() {
    try {
      await weatherService.getWeather();
      _calcVariables();
      weather = AppState.widgets.weather;
    }
    catch (error) { Pop.error(error); }
  }

  function _calcFormat(temp, format) {
    if (format == 'F') { return `${((temp - 273.15) * (9 / 5) + 32).toFixed(0)}ºF` }
    if (format == 'C') { return `${(temp - 273.15).toFixed(1)}ºC` }
    return `${temp.toFixed(2)}ºK`
  }

  function _calcVariables() {
    const formats = ['K', 'F', 'C'] // HAH
    formats.forEach(format => {
      const weatherData = AppState.widgets.weather
      const mainTemp = _calcFormat(weatherData?.data.temp, format)
      const minTemp = _calcFormat(weatherData?.data.temp_min, format)
      const maxTemp = _calcFormat(weatherData?.data.temp_max, format)
      const feels_like = _calcFormat(weatherData?.data.feels_like, format)
      temps[format] = { mainTemp, minTemp, maxTemp, feels_like }
    })
    logger.log('calculated temps', temps.value)
  }
  
  function temperature() {
        let kelvin = AppState.widgets.weather?.data.temp;
        let format = AppState.settings.weather.format;
        return _calcFormat(kelvin, format);
      }

    function changeTempType() { weatherService.changeTempType(); }
    function refreshWeather() { getWeather(); }

  return (
    <section className="position-relative">
      <div className="position-absolute refresh" type="button" title="Update weather data" onClick={refreshWeather}>
        <Icon path={mdiRefreshCircle} size={1} />
      </div>
      <div className="temp rounded">
        <p className="fs-2 mb-0 px-2" onClick={changeTempType}>
          { temperature() }
        </p>
      </div>

      <span className="position-absolute hidden">
        <div className="d-md-flex justify-content-center rounded weather">

          <div className="d-block text-center weatherData px-3" id="weatherData">
            <WeatherData data={weather?.data} temps={temps} format={settings?.format} />
          </div>

          <div className="bar d-none d-md-inline"></div>
          <div className="d-inline d-md-none">
            <hr />
          </div>

          <div className="d-flex flex-column justify-content-between weatherDetails p-3" id="weatherDetails">
            <WeatherDetails details={weather?.details} />
          </div>

        </div>
        <div className="d-flex justify-content-center text-white p-3">
          {/* { weather.conditions } */}
        </div>
      </span>

  </section>
  )
}