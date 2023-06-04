<template>
  <div id="app" :class="layout">
    <component v-bind:is="layout"></component>
  </div>
</template>

<script>
import OutsideLayout from './views/layout/OutsideLayout.vue';
import InsideLayout from './views/layout/InsideLayout.vue';

export default {
  components: {
    OutsideLayout,
    InsideLayout,
  },
  created() {
    this.$session.start();
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style lang="scss">
  @import "assets/css/app.scss";
  @import "assets/css/password.css";
  @import "assets/css/roboto.css";
  @import "assets/css/materialdesignicons.min.css";
</style>
