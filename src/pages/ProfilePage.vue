<template>
  <div class="col-8 profile-page">
    <div class="row">
      <ProfileComponent />
    </div>
    <div class="row" v-if="account.email === user.email">
      <CreatePost />
    </div>
    <div class="row">
      <PostThread :posts="posts" />
    </div>
  </div>
  <div class="col-3">
    <div class="">
      <h3>User starts here</h3>
      {{ user }}
      <h3>Account starts here</h3>
      {{ account }}
    </div>
  </div>
</template>

<script>
// import { AuthService } from '../services/AuthService'
import { computed, onMounted } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'Profile',
  setup() {
    const router = useRoute()

    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
