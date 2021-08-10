<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 bg-dark">
          <Login />
        </div>
        <div class="col-md-10 m-0">
          <div class="row">
            <Navbar />
          </div>
          <div class="row">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer>The end</footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
