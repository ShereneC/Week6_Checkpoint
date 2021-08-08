import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfileService {
  async getProfile(id) {
    try {
      const res = await api.get('/profiles/' + id)
      AppState.user = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}
// I think it is supposed to get the information on the profiles and put it in the Profile Page
export const profileService = new ProfileService()
