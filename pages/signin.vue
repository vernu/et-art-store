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
          <v-btn v-else v-on:click="signInWithEmailAndPassword">Signin</v-btn>
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
import { mapMutations } from "vuex";
export default {
  name: "Signin",
  data: () => {
    return {
      email: "",
      password: "",
      signinInProgress: false,
    };
  },
  methods: {
    async signinWithGoogle() {},
    async signInAnonymously() {
      try {
        await this.$fire.auth.signInAnonymously();
      } catch (e) {
        console.log(e);
      }
    },
    async signInWithEmailAndPassword() {
      this.signinInProgress = true;
      try {
        const authRes = await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
        console.log(authRes.user);
        this.setCurrentUser(authRes.user);
      } catch (e) {
        console.log(e);
      }

      this.signinInProgress = false;
    },

    async signout() {
      try {
        await this.$fire.auth.signOut();
      } catch (e) {
        console.log(e);
      }
    },

    ...mapMutations({
      setCurrentUser: "auth/setCurrentUser",
    }),
  },
};
</script>

<style scoped>
</style>