<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12" v-if="user.isAuthenticated">
        <CreatePost />
      </div>
    </div>
    <div class="row">
      <div class="col-8 d-flex">
        <PostThread />
      </div>
      <div class="col-4">
        <AdThread :ads="ads" />
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  setup() {
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
