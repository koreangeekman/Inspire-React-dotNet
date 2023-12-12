import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.js"


class ObservableAppState {

  user = null
  /** @type {import('./models/Account.js').Account | null} */
  account = null
  
  /** @type {import('./models/Account.js').Account[]} */
  appAuthors = []

  widgets = { // to anchor the current instance of simple widget data objects
    /** @type {import('./models/Widget/Weather.js').Weather} */
    weather: {}, // populated by OpenWeather API on get
    bgImg: {},
    quote: {},
    clock: ''
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