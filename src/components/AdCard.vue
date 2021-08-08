<template>
  <div class="Ad row">
    <div class="col-12 mt-2 shadow-light bg-gray border border-light d-flex flex-column align-items-center rounded">
      <h3>{{ ad.title }}</h3>
      <img class="w-100 rounded" :src="ad.tall" alt="Ad" srcset="">
      <a :href="ad.linkURL">Click Me!</a>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { adsService } from '../services/AdsService'
export default {
  name: 'Ad',
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  setup() {
    onMounted(async() => {
      try {
        await adsService.getAds()
      } catch (error) {
        console.error(error)
      }
    })
    return {
      ads: computed(() => AppState.ads)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
