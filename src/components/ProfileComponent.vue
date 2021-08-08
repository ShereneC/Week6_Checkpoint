<template>
  <div class="col-12 mt-2 shadow-light bg-gray border border-light d-flex flex-column align-items-start rounded">
    <div class="row">
      <div class="col">
        <h3>Welcome, {{ user.nickname }} !</h3>
        <p>Bio: {{ account.bio }}</p>
      </div>
      <div class="row m-1">
        <div class="col">
          <h5>Find me on</h5>
          <div v-if="account.linkedin">
            <a href="https://www.linkedin.com/">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-2">
      <div class="col">
        <img
          :src="account.coverImg"
          alt="user photo"
          height="100"
          class="rounded-50"
        />
        <span class="mx-3">{{ user.name }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h5>CodeWorks Cohort: {{ account.class }}</h5>
        <div v-if="account.graduated==true">
          <h5>Graduated!</h5>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex flex-row ">
        <!--NOTE  This will not stretch to fill the whole column, flex-grow-1 justify-content-between not working, why? I do not want to put margins in the h5,s but they are too close together because between is not working-->
        <h5 class="mx-2">
          User Stats:    1
        </h5>
        <h5 class="mx-2">
          Your Posts:    1
        </h5>
        <h5 class="mx-2">
          Received Likes:    1
        </h5>
        <div class="pr-5 action" data-toggle="modal" data-target="#edit-account">
          <span>✏ <small>Edit</small></span>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade"
       id="edit-account"
       tabindex="-1"
       role="dialog"
       aria-labelledby="edit-account"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Edit My Account
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editAccount">
            <div class="form-group">
              <label class="pr-2" for="bio">Bio</label>
              <textarea type="text"
                        id="bio"
                        class="form-control"
                        required
                        placeholder="About myself..."
                        v-model="account.bio"
              ></textarea>
            </div>
            <div class="form-group">
              <label class="pr-2" for="imgUrl">Cover Image</label>
              <input type="text"
                     id="imgUrl"
                     class="form-control"
                     required
                     placeholder="Image Url..."
                     v-model="account.coverImg"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="linkedin">LinkedIn URL</label>
              <input type="text"
                     id="linkedin"
                     class="form-control"
                     required
                     placeholder="Url..."
                     v-model="account.coverImg"
              >
            </div>
            <!-- <div class="form-group">
              <label class="pr-2" for="photos">Inspiration Images</label>
              <textarea type="text"
                        id="photos"
                        class="form-control"
                        placeholder="Image Urls..."
                        v-model="state.newProject.photoString"
              ></textarea>
              <small class="text-muted">add many urls seperated by a line break. Current Photos:</small>
              <small>{{ photos }}</small>
            </div> -->
            <div>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { computed } from '@vue/runtime-core'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'ProfileComponent',
  setup() {
    // const router = useRoute()

    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
      // account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
