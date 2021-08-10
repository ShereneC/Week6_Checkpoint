<template>
  <div class="col-12">
    <Profile :profile="profile" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
// import { profileService } from '../services/ProfileService'
export default {
  name: 'ProfileThread',
  setup() {
    onMounted(async() => {
    })
    return {
      profile: computed(() => AppState.profile)
    }
  }

}
</script>
