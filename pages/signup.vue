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
          <v-btn v-on:click="signUpWithEmailAndPassword">Signup</v-btn>
        </v-form>

        <div>Have an account? <nuxt-link to="/signin">Sign in</nuxt-link></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Signup",
  data: () => {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async signUpWithEmailAndPassword() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
      } catch (e) {
        console.log(e);
      } finally {
        this.$route.push("/");
      }
    },
  },
};
</script>