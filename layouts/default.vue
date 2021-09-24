<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-btn icon link to="/" nuxt>
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn v-for="(item, i) in items" :key="i" link :to="item.to">
        {{ item.title }}</v-btn
      >
      <v-spacer />
      <div v-if="currentUser">
        {{ currentUser.email }} <v-btn v-on:click="signout"> Signout</v-btn>
      </div>
      <v-btn v-else link to="/signin" nuxt> Signin</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isSignedin: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Discover",
          to: "/discover",
        },
      ],
      title: "ET Art Store",
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
    }),
  },
  methods: {
    ...mapActions({
      signout: "auth/signout",
    }),
  },
  created() {
    // this.$store.dispatch("auth/checkAuthStatus");
  },
};
</script>
