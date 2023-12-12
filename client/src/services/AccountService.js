import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger.js'
import Pop from "../utils/Pop.js";
import { api } from './AxiosService'

class AccountService {

  async getAppAuthors() {
    try {
      const res = await api.get('/account/authors');
      AppState.appAuthors = res.data.map(author => new Account(author));
    } catch (error) {
      Pop.error(error)
    }
  }

  async getAccount() {
    try {
      if (AppState.account) {
        return AppState.account
      }
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
      return AppState.account
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???')
      return null
    }
  }
}

export const accountService = new AccountService()