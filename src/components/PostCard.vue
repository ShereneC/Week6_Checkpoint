<template>
  <div class="col-12 mt-2 shadow-light bg-gray border border-light d-flex flex-column align-items-center rounded">
    <div class="row">
      {{ post.body }}
    </div>
    <div class="row justify-content-center">
      <img class="cover-img w-50" :src="post.imgUrl" alt="" srcset="">
    </div>
    <div class="row">
      <p> likeIds:{{ post.likeIds }}</p>
    </div>

    <div class="row">
      <div class="col-12 d-flexj justify-content-between">
        <p class="m-1">
          Posted by:
        </p>
        <router-link router-link :to="{ name: 'Profile', params: {id: post.creator.id } }" class="p-3 align-self-end">
          <img
            :src="post.creator.picture"
            alt="user photo"
            height="30"
            class="rounded"
          />{{ post.creator.email }}
        </router-link>
      </div>
    </div>
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
