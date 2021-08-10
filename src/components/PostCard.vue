<template>
  <div class="col-12 shadow-light bg-gray border border-light d-flex flex-column align-items-center rounded">
    <div class="row">
      <div class="col">
        {{ post.body }}
      </div>
    </div>
    <div class="row justify-content-center">
      <img class="cover-img w-50" :src="post.imgUrl" alt="" srcset="">
    </div>
    <div class="row">
      <div class="col-12 d-flex" v-if="post.likeIds.length">
        <h4>Likes:</h4>
        <span v-for="(l, index) in post.likeIds" :key="index" :likeId="l">👍</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p @click="addLike">
          Add Like
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flexj justify-content-between">
        <p class="m-1">
          Posted by:
        </p>

        <router-link router-link
                     :to="{ name: 'ProfilePage', params: {id: post.creatorId } }"
                     class="p-3
        align-self-end"
        >
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
import { computed, reactive } from '@vue/runtime-core'
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
    const state = reactive
    return {
      state,
      posts: computed(() => AppState.posts),
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
      },
      async addLike() {
        try {
          await postsService.addLike(props.post.id)
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
