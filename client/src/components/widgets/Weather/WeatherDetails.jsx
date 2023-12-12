import React from "react";

export default function WeatherDetails(props) {
      function formatSunrise() {
        const sunrise = props.details.sunrise
        console.log('sunrise formatted', sunrise);
        const hh = sunrise.getHours(); const mm = sunrise.getMinutes(); const ss = sunrise.getSeconds();
        return hh + ':' + (mm < 10 ? "0" + mm : mm) + ':' + (ss < 10 ? "0" + ss : ss)
      }

      function formatSunset() {
        const sunset = props.details.sunset
        console.log('sunset formatted', sunset);
        const hh = sunset.getHours(); const mm = sunset.getMinutes(); const ss = sunset.getSeconds();
        return hh + ':' + (mm < 10 ? "0" + mm : mm) + ':' + (ss < 10 ? "0" + ss : ss)
      }
  
  return (
    <div>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">City: </p>
        <p className="mb-0">{ props.details.city }</p>
      </span>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">Timezone:</p>
        <p className="mb-0">GMT{ props.details.timezone / 3600 }</p>
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
        <p className="mb-0">{ props.details.weather }</p>
      </span>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">Humidity: </p>
        <p className="mb-0">{ props.details.humidity }%</p>
      </span>
      <span className="d-flex justify-content-between">
        <p className="mb-0 me-2">[Recorded at: </p>
        <p className="mb-0">{ props.details.dt.toLocaleTimeString() }]</p>
      </span>
    </div>
  )
}