export const state = () => ({
  signupInProgress: false,
  signinInProgress: false,
  currentUser: {}
});

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      ctx.commit("removeCurrentUser");
    } else {
      const { uid, email, phoneNumber } = authUser;
      const currentUser = { id: uid, email, phoneNumber };
      ctx.commit("setCurrentUser", { currentUser });
    }
  },

  async checkAuthStatus({ commit }) {
    // commit("setCurrentUser", { currentUser: this.$fire.auth.currentUser });
  },
  async signinWithEmailAndPassword({ commit }, { email, password }) {
    try {
      commit("setSigninInProgress", { status: true });
      const authRes = await this.$fire.auth.signInWithEmailAndPassword(
        email,
        password
      );
      // commit("setCurrentUser", { currentUser: authRes.user });
      this.$router.push("/");
    } catch (e) {
      console.log(e);
    }

    commit("setSigninInProgress", { status: false });
  },

  async signUpWithEmailAndPassword({ commit }, { name, email, password }) {
    try {
      commit("setSignupInProgress", { status: true });
      const authRes = await this.$fire.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const newUserId = authRes.user.uid;
      await this.$fire.firestore
        .collection("users")
        .doc(newUserId)
        .set({
          name,
          email,
          createdAt: this.$fireModule.firestore.Timestamp.now()
        });
      this.$router.push("/");
    } catch (e) {
      console.log(e);
    }

    commit("setSignupInProgress", { status: false });
  },

  async signout({ commit }) {
    await this.$fire.auth.signOut();
  }
};

export const mutations = {
  setCurrentUser(state, { currentUser }) {
    state.currentUser = currentUser;
  },
  setSignupInProgress(state, { status }) {
    state.signupInProgress = status;
  },
  setSigninInProgress(state, { status }) {
    state.signinInProgress = status;
  },
  removeCurrentUser(state) {
    state.currentUser = null;
  }
};
