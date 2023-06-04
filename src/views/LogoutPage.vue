<template>
  <div id="logout"></div>
</template>

<script>
export default {
  created() {
    this.startLogout();
  },
  methods: {
    startLogout() {
      this.$session.destroy();
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>
