<template>
  <div class="login">
    <span class="navbar-text">
      <button
        class="btn btn-outline-primary text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>

      <div class="dropdown" v-else>
        <div
          class="dropdown-toggle d-flex flex-column justify-content-center"
          @click="state.dropOpen = !state.dropOpen"
        >
          <img
            :src="user.picture"
            alt="user photo"
            height="40"
            width="40"
            class="rounded"
          />
          <p class="mx-3">{{ user.name }}</p>
        </div>
        <div
          class="dropdown-menu p-0 list-group w-100"
          :class="{ show: state.dropOpen }"
          @click="state.dropOpen = false"
        >
          <router-link :to="{ name: 'Account', params: {id: account.id} }">
            <div class="list-group-item list-group-item-action hoverable">
              Account
            </div>
          </router-link>
          <div
            class="list-group-item list-group-item-action hoverable"
            @click="logout"
          >
            logout
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Login',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
