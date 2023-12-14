import React from "react";
import "../../../assets/scss/widget/Weather/WeatherDetails.scss"

export default function WeatherDetails({details}) {
      function formatSunrise() {
        const sunrise = details.sunrise
        console.log('sunrise formatted', sunrise);
        const hh = sunrise.getHours(); const mm = sunrise.getMinutes(); const ss = sunrise.getSeconds();
        return hh + ':' + (mm < 10 ? "0" + mm : mm) + ':' + (ss < 10 ? "0" + ss : ss)
      }

      function formatSunset() {
        const sunset = details.sunset
        console.log('sunset formatted', sunset);
        const hh = sunset.getHours(); const mm = sunset.getMinutes(); const ss = sunset.getSeconds();
        return hh + ':' + (mm < 10 ? "0" + mm : mm) + ':' + (ss < 10 ? "0" + ss : ss)
      }
  
  return (
    <div>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">City: </p>
        <p className="mb-0">{ details.city }</p>
      </span>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">Timezone:</p>
        <p className="mb-0">GMT{ details.timezone / 3600 }</p>
      </span>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">Sunrise:</p>
        <p className="mb-0">{ formatSunrise() }am</p>
      </span>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">Sunset: </p>
        <p className="mb-0">{ formatSunset() }pm</p>
      </span>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">Weather: </p>
        <p className="mb-0">{ details.weather }</p>
      </span>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">Humidity: </p>
        <p className="mb-0">{ details.humidity }%</p>
      </span>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">[Recorded at: </p>
        <p className="mb-0">{ details.dt.toLocaleTimeString() }]</p>
      </span>
    </div>
  )
}