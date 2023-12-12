import { AppState } from "../../AppState.js";

class ClockService {

  toggleFormat() {
    const settings = AppState.settings.clock;
    if (settings.timeFormat == '12') {
      settings.timeFormat = '24'
    } else {
      settings.timeFormat = '12'
    }
  }
}

export const clockService = new ClockService();