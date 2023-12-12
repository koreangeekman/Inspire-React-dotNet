import React from "react";
import Icon from "@mdi/react";
import {
  mdiFormatVerticalAlignTop,
  mdiPlusMinusVariant, 
  mdiFormatVerticalAlignBottom
  } from '@mdi/js';


export default function WeatherData(props) {
  
  return (
    <div v-if="temps.C?.mainTemp" className="weatherData">

    <span className="d-flex align-items-center pt-2">

      <span className="d-block tempSmall pt-3 ps-2">
        <div className="d-flex align-items-center">
          <Icon path={mdiFormatVerticalAlignTop} size={1} />
          <p className="mb-0 px-2">
            { props.temps[props.format].maxTemp }
          </p>
        </div>
        <div>
          <hr />
        </div>
      </span>

      <Icon className="px-3" path={mdiPlusMinusVariant} size={1} />

      <span className="d-block tempSmall pb-4 pe-2">
        <div>
          <hr />
        </div>
        <div className="d-flex align-items-center">
          <p className="mb-0 px-2">
            { props.temps[props.format].minTemp }
          </p>
          <Icon path={mdiFormatVerticalAlignBottom} size={1} />
        </div>
      </span>

    </span>

    <div className="d-flex justify-content-between align-items-center tempBig">
      <p className="mb-0 px-2">
        { props.temps[props.format].mainTemp }
      </p>
      <img className="img-fluid weatherIcon" src={props.data.weatherIcon} alt={props.data.weather} />
    </div>

    <p className="tempSmall">
      Feels like: { props.temps[props.format].feels_like }
    </p>

  </div>
  )
}