<template>
  <div class="col-12 mt-2 shadow-light bg-gray border border-light d-flex flex-column align-items-start rounded">
    <div class="row">
      <div class="col">
        <h3>Welcome, {{ account.name }} !</h3>
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
          :src="account.picture"
          alt="user photo"
          height="100"
          class="rounded-50"
        />
        <span class="mx-3">{{ account.name }}</span>
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
                        v-model="state.editedAccount.bio"
              ></textarea>
            </div>
            <div class="form-group">
              <label class="pr-2" for="imgUrl">Cover Image</label>
              <input type="text"
                     id="imgUrl"
                     class="form-control"
                     required
                     placeholder="Image Url..."
                     v-model="state.editedAccount.coverImg"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="linkedin">LinkedIn URL</label>
              <input type="text"
                     id="linkedin"
                     class="form-control"
                     required
                     placeholder="Url..."
                     v-model="state.editedAccount.linkedin"
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
    <!-- // NOTE  do not need a v-if for this because this is only shwoing if you are logged in (account page) -->
    <CreatePost />
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      editedAccount: {
        bio: '',
        coverImg: '',
        linkedin: ''
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.editAccount(state.editedAccount)
          $('#edit-account').modal('hide')
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

        <style scoped>
          img {
          max-width: 100px;
          }
        </style>
