<template>
  <div class="col-12 mt-2 shadow-light bg-gray border border-light d-flex flex-column align-items-start rounded">
    <div class="row">
      <div class="col">
        <h3>Welcome, {{ profile.nickname }} !</h3>
        <p>Bio: {{ profile.bio }}</p>
      </div>
      <div class="row m-1">
        <div class="col">
          <h5>Find me on</h5>
          <div v-if="profile.linkedin">
            <a href="https://www.linkedin.com/">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-2">
      <div class="col">
        <img
          :src="profile.picture"
          alt="user photo"
          height="100"
          class="rounded-50"
        />
        <span class="mx-3">{{ profile.name }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h5>CodeWorks Cohort: {{ profile.class }}</h5>
        <div v-if="profile.graduated==true">
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
        <div class="pr-5 action" v-if="account.email === profile.email" data-toggle="modal" data-target="#edit-account">
          <span>✏ <small>Edit</small></span>
        </div>
      </div>
    </div>
  </div>
  <!-- NOTE above I attempted to get the profile component working by creating an empty object in appstate called profile.  I then tried to connect all profiles properties above, but it is still not working - still getting a missing required id param error. -->
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
                     v-model="account.linkedin"
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
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import { useRoute } from 'vue-router'
export default {
  // props: {
  //   profile: {
  //     type: Object,
  //     required: true
  //   }
  // },
  setup() {
    //  const state = reactive
    const router = useRoute()

    onMounted(async() => {
      try {
        // NOTE I think i need to pass the profile id through the router into the service right here.  IT is put up there from the click on the PostCard
        // But I am getting a 400 error There is an array object object in the url address it is trying to go to.
        await profileService.getProfileById(router.params.id)
      } catch (error) {
        console.error(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      // If i try and use this it tells me I have a duplicate because of the prop I sent in.
      profile: computed(() => AppState.profile)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
