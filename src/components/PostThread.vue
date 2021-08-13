<template>
  <div class="row">
    <div class="col-12 d-flex">
      <button type="button" class="btn btn-primary" @click="getNewer" v-if="newer">
        Most Recent Posts
      </button>
      <button type="button" class="btn btn-primary" @click="getOlder" v-if="older">
        Older Posts
      </button>
    </div>
    <div class="col-12" v-if="posts">
      <PostCard v-for="p in posts" :key="p.id" :post="p" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { postsService } from '../services/PostsService'
export default {
  name: 'Thread',
  setup() {
    onMounted(async() => {
      try {
        await postsService.getPosts(AppState.older)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      posts: computed(() => AppState.posts),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),

      async getOlder() {
        await postsService.getOlder(AppState.older)
      }
    }
  }

}
</script>
