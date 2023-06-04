<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vuetify from 'vuetify';

export default {
  vuetify: new Vuetify(),
};
</script>
