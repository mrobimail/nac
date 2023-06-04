<template>
  <v-app id="inspire">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-0">
        <v-btn text class="text-capitalize title no-active" to="/">NAC</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon class="mr-2">mdi-account-circle</v-icon>{{ user }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in headerMenu" :key="index" @click="forceRedirect(item.link)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vuetify from 'vuetify';

export default {
  vuetify: new Vuetify(),
  data() {
    return {
      user: 'User',
      headerMenu: [
        {
          title: 'Kijelentkezés',
          link: '/logout',
        },
      ],
    };
  },
  methods: {
    forceRedirect(path) {
      window.location.pathname = path;
    },
  },
};
</script>

<style>
  .v-btn--active.no-active::before {
    display: none;
  }
</style>
