import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AdsService {
  async getAds() {
    const res = await api.get('api/ads')
    // logger.log(res.data)
    AppState.ads = res.data
  }

  // async getAdById(id) {
  //   const res = await api.get(`/ads/${id}`)
  //   AppState.activeAd = res.data
  // }

  // async createAd(ad) {
  //   const res = await api.post('/ads', ad)
  //   AppState.ads.push(res.data)
  //   return res.data.id
  // }

  // async destroy(id) {
  //   await api.delete(`/ads/${id}`)
  //   AppState.ads = AppState.ads.filter(ad => ad.id !== id)
  // }
}

export const adsService = new AdsService()
