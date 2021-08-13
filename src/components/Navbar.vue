<template>
  <!-- NOTE having difficulties getting the navbar to stretch out to take up its full row -->
  <nav class="col-12 navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-column align-self-stretch">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex">
        <!-- <img
          alt="logo"
          src="../assets/img/cw-logo.png"
          height="45"
        /> -->
        <h2>The Network</h2>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'About' }" class="nav-link">
            About
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Search' }" class="nav-link">
            Search
          </router-link>
        </li>
      </ul>
      <form @submit.prevent="searchFor">
        <input name="Search" type="text" placeholder="Search for..." aria-label="Search" v-model="state.searchTerm">
        <button type="submit" class="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { postsService } from '../services/PostsService'
export default {
  setup() {
    const state = reactive({
      dropOpen: false,
      searchTerm: ''
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
      async searchFor() {
        await postsService.searchFor(state.searchTerm)
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
