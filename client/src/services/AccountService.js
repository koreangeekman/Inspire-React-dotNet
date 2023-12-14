import Pop from "../utils/Pop.js";
import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger.js'
import { Account } from '../models/Account.js'
import { Settings } from '../models/Settings.js'

class AccountService {

  async getAppAuthors() {
    try {
      const res = await api.get('/account/authors');
      AppState.appAuthors = res.data.map(author => new Account(author));
    }
    catch (error) { Pop.error(error); }
  }

  async getAccount() {
    try {
      if (AppState.account) {
        return AppState.account
      }
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
      return AppState.account
    }
    catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???')
      return null
    }
  }

  async updateProfile(newData) {
    try {
      const res = await api.put('/account', newData);
      AppState.account = new Account(res.data);
    }
    catch (error) { Pop.error(error); }
  }

  async getSettings() {
    try {
      const res = await api.get('/account/settings')
      AppState.settings = new Settings(res.data)
    }
    catch (error) { Pop.error(error); }
  }

  async updateSettings(newData) {
    try {
      const res = await api.put('/account/settings', newData);
      AppState.settings = new Settings(res.data);
    }
    catch (error) { Pop.error(error); }
  }

}

export const accountService = new AccountService()