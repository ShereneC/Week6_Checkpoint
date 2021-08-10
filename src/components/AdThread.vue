<template>
  <div class="row">
    <div class="col-12 d-flex flex-column">
      <AdCard v-for="(a, index) in ads"
              :key="index"
              :ad="a"
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { adsService } from '../services/AdsService'
export default {
  name: 'AdThread',
  setup() {
    onMounted(async() => {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      ads: computed(() => AppState.ads)
    }
  }

}
</script>
