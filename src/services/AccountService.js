import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(newAccount) {
    try {
      const res = await api.put('/account', newAccount)
      AppState.account = res.data
      // eslint-disable-next-line no-self-assign
      logger.log(res.data)
    } catch (error) {
      logger.error('Not editing the account')
    }
  }
}

export const accountService = new AccountService()
