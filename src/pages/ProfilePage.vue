<template>
  <div class="col-8 profile-page">
    <div class="row">
      <ProfileThread :profile="profile" />
    </div>
    <div class="row" v-if="account.id === profile.id">
      <CreatePost />
    </div>
    <div class="row">
      <PostThread :posts="posts" />
    </div>
  </div>

  <div class="col-4">
    <AdThread :ads="ads" />
  </div>
  <!-- <div class="">
      <h3>User starts here</h3>
      {{ user }}
      <h3>Account starts here</h3>
      {{ account }}
    </div>
  </div> -->
</template>

<script>
// import { AuthService } from '../services/AuthService'
import { computed, onMounted } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
export default {
  name: 'ProfilePage',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        // NOTE why is this in here, I think it should be in profile.vue / well, actuallyl I made a thread
        await profileService.getProfileById(route.params.id)
        await postsService.getPostById(route.params.id)
        await postsService.getPosts({ creatorId: route.params.id })
      } catch (error) {
        Pop.toast(error, 'error')
      }
      // },
      // try {
      // await postsService.getPosts({ creatorId: router.params.id })  NOTE something wrong with this line - it is not passing the creatorid???  I see it up in the url when I click on a user, but when I put this code in, it breaks the Login page.
      // } catch (error) {
      //   Pop.toast(error, 'error')
      // }
    })
    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.profile)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
