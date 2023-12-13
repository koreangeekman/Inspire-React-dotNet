import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.js"


class ObservableAppState {

  user = null
  /** @type {import('./models/Account.js').Account | null} */
  account = null
  
  /** @type {import('./models/Account.js').Account[]} */
  appAuthors = []

  
  /** @type {import('./models/Widget/ToDo.js').ToDo[]} */
  todos = []


  widgets = { // to anchor the current instance of simple widget data objects
    /** @type {import('./models/Widget/Weather.js').Weather | null} */
    weather: null, // populated by OpenWeather API on get
    bgImg: {},
    quote: {},
    clock: ''
  }
  
  settings = {
    todo: {
      showAll: true,
      sortOpt: 'none' // alpha, -alpha, createAt, -createAt, updatedAt, -updatedAt, length, -length
    },
    pomodoro: {
      workTime: 25,
      breakTime: 5,
      cycles: 1,
      breakTimeAudioCue: '',
      workTimeAudioCue: '',
    },
    weather: {
      city: 'Boise',
      location: {
        lon: -116.2035,
        lat: 43.6135
      }, // [lon, lat]
      format: 'F', // 'K'elvin, 'F'ahrenheit, 'C'elsius
      lastPoll: new Date()
    },
    quote: {
      enabled: true,
      autoChange: false,
      cycle: 3600 // auto-refresh interval
    },
    bgImg: {
      enabled: true,
      bgColor: '#123456', // if bgImg is disabled/unresponsive, set a custom bg-color
      autoChange: false,
      cycle: 3600 // auto-refresh interval
    },
    clock: {
      timeFormat: '12',
      timeZone: '0'
    }
  }

  constructor() {
    makeAutoObservable(this)
  }

}

// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    action(() => {
      target[prop] = value
    })()
    return true
  }
})