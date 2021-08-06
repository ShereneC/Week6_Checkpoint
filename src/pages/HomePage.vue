<template>
  <div class="col-8">
    <div class="" v-if="user.isAuthenticated">
      <CreatePost />
    </div>
    <PostThread :posts="posts" />
  </div>
  <div class="col-3">
    <div class="">
      <h3>These will be Ads</h3>
      {{ ads }}
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { adsService } from '../services/AdsService'
import { postsService } from '../services/PostsService'

export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await adsService.getAds()
      } catch (error) {
        console.error(error)
      }
    })
    return {
      user: computed(() => AppState.user),
      ads: computed(() => AppState.ads),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}

</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
