import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfileService {
  async getProfileById(id) {
    try {
      const res = await api.get(`api/profiles/${id}`)
      console.log(res.data)
      AppState.user = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  // async editAccount(newProfile) {
  //   try {
  //     await api.put('account', newProfile)
  //     // await this.getProfile(newProfile.id)
  //   } catch (error) {
  //     logger.error('Did not update account')
  //   }
  // }
}
// I think it is supposed to get the information on the profiles and put it in the Profile Page

export const profileService = new ProfileService()
