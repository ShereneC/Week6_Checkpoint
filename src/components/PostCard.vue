<template>
  <div class="col-12 mt-2 shadow-light bg-gray border border-light d-flex flex-column align-items-center rounded">
    {{ post.body }}
    <img class="cover-img w-50" :src="post.imgUrl" alt="" srcset="">
    <p> likeIds:{{ post.likeIds }}</p>
    <p>creatorIds: {{ post.creatorId }}</p>
    <div class="align-self-end" v-if="account.id === post.creatorId">
      <button class="btn btn-danger" @click.stop="destroy">
        delete
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { postsService } from '../services/PostsService'
export default {

  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await postsService.destroy(props.post.id)
            Pop.toast('It is gone!', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
