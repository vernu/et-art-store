export const state = () => ({
  currentUser: null
});

export const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },
  removeCurrentUser(state) {
    state.currentUser = null;
  }
};
