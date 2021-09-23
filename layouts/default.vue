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
      <v-btn link to="/signin" nuxt> Signin</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <div v-if="currentUser">current user: {{ currentUser }}</div>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";

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
    currentUser() {
      return this.$store.state.auth.currentUser;
    },
  },
  methods: {
    ...mapMutations({
      setCurrentUser: "auth/setCurrentUser",
    }),
  },
  // created() {
  //   if (!this.$store.state.auth.currentUser) {
  //     console.log(this.$fire.auth.currentUser);
  //     if (this.$fire.auth.currentUser) {
  //       this.setCurrentUser(this.$fire.auth.currentUser);
  //     }
  //   }
  // },
};
</script>
