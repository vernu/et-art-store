<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" md="4">
        <h2>Sign in</h2>
        <v-form>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field>
          <v-progress-circular indeterminate v-if="signinInProgress" />
          <v-btn v-else v-on:click="signinWithEmailAndPassword">Signin</v-btn>
        </v-form>

        <div>
          Dont have an account? <nuxt-link to="/signup">Sign up</nuxt-link>
        </div>
        <v-btn color="red" v-on:click="signinWithGoogle"
          >Signin with Google</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Signin",
  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      signinInProgress: (state) => state.auth.signinInProgress,
    }),
  },
  methods: {
    signinWithEmailAndPassword() {
      this.$store.dispatch("auth/signinWithEmailAndPassword", {
        email: this.email,
        password: this.password,
      });
    },
    async signinWithGoogle() {},
  },
};
</script>

<style scoped>
</style>