<template>
  <div class="CreatePost col-12 mt-2 p-2 shadow-light bg-gray border border-light rounded">
    <form class="flex-column" @submit.prevent="createPost">
      <!-- NOTE Having bootstrap issues here as well, why will the textarea not spread out to the edge of the column? -->
      <div class="form-group">
        <label class="pr-2" for="body">Body</label>
        <textarea type="textarea"
                  id="body"
                  class="form-control"
                  required
                  placeholder="What would you like to talk about?..."
                  v-model="state.newPost.body"
        ></textarea>
      </div>
      <div class="form-group">
        <label class="pr-2" for="imgUrl">Cover Image</label>
        <input type="text"
               id="imgUrl"
               class="form-control"
               placeholder="Image Url..."
               v-model="state.newPost.imgUrl"
        >
      </div>
      <div>
        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">
      Close
    </button> -->
        <button type="submit" class="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { postsService } from '../services/PostsService'
export default {
  name: 'CreatePost',
  setup() {
    const state = reactive({
      newPost: {}

    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async createPost() {
        try {
          await postsService.createPost(state.newPost)
          state.newPost = {}
        } catch (error) {

        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
