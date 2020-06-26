<template>
  <div class="app-wrapper">
    <AppHeader />
    <nuxt />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppFooter
  },
  computed: mapGetters({ wss: "wsTodos/getWSState" })

  // created: function() {
  //   this.$store.commit("wsTodos/createWS");
  // },
  // watch: {
  //   wss: {
  //     handler: function(newState, oldState) {
  //       this.$store.dispatch("todos/updateState", newState);
  //     },
  //     deep: true
  //   }
  // }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.app-wrapper {
  height: 100vh;
  width: 100vw;
  background-color: #1d1e24;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
