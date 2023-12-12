import React from "react";
import Pop from "../../utils/Pop";
import { AppState } from "../../AppState";
import { clockService } from "../../services/Widgets/ClockService.js";
import "../../assets/scss/widget/ClockWidget.scss"

export default function ClockWidget() {
  
    function _greetings() {
      const hour = new Date().getHours();
      let ToD = '';
      if (hour < 3) {
        ToD = 'Go to sleep!'
      } else if (hour < 6) {
        Pop.error('.. Did you sleep??'); return
      } else if (hour < 12) {
        ToD = 'Good morning!'
      } else if (hour == 12) {
        Pop.success(`It's hiiigh nooon~`); return
      } else if (hour < 17) {
        ToD = 'Good afternoon!'
      } else if (hour < 22) {
        ToD = 'Good evening!'
      } else if (hour >= 22) {
        ToD = 'Good night!'
      }
      Pop.success(ToD)
    }

    function _drawClock() {
      const date = new Date(); let ampm = '';
      let hh = date.getHours(); let mm = date.getMinutes(); let ss = date.getSeconds();
      if (AppState.settings.clock.timeFormat == 12) {
        if (hh == 0) {
          hh = 12;
          ampm = 'am';
        } else if (hh == 12) {
          ampm = 'pm';
        } else if (hh > 12) {
          hh -= 12;
          ampm = 'pm';
        } else {
          ampm = 'am';
        }
      }
      AppState.widgets.clock = hh + (ss % 2 == 0 ? '<span class="text-secondary">:</span>' : ':') + (mm < 10 ? '0' + mm : mm) + `${ampm}`
  }
  
  function toggleFormat() {
    clockService.toggleFormat();
  }
  
  _greetings();
  setInterval(_drawClock, 500);

  return (
    <p className="fs-1 mb-0 clock" v-html={currentTime} onClick={toggleFormat}></p>
  )
}