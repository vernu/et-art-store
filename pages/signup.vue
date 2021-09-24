<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" md="4">
        <h2>Sign up</h2>
        <v-form>
          <v-text-field label="Full Name" v-model="fullName"></v-text-field>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            type="password"
            v-model="confirmPassword"
          ></v-text-field>

          <v-progress-circular indeterminate v-if="signupInProgress" />
          <v-btn v-else v-on:click="signup">Signup</v-btn>
        </v-form>

        <div>Have an account? <nuxt-link to="/signin">Sign in</nuxt-link></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Signup",
  computed: {
    ...mapState({
      signupInProgress: (state) => state.auth.signupInProgress,
    }),
  },
  data: () => {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    ...mapActions({
      signUpWithEmailAndPassword: "auth/signUpWithEmailAndPassword",
    }),
    async signup() {
      this.signUpWithEmailAndPassword({
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>