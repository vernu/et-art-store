export const state = () => ({
  categories: [],
  loadingCategories: false,
  featuredItems: [],
  loadingFeaturedItems: false,
  recentlyAddedItems: [],
  loadingRecentlyAddedItems: false
});

export const actions = {
  async fetchCategories({ commit }) {
    commit("setLoadingCategories", { loading: true });
    const categories = [];
    const ref = this.$fire.firestore.collection("categories");
    const querySnapshot = await ref.get();
    querySnapshot.forEach(doc => {
      categories.push({ ...doc.data(), id: doc.id });
    });
    commit("setCategories", { categories });
    commit("setLoadingCategories", { loading: false });
  },

  async fetchFeaturedItems({ commit }) {
    commit("setLoadingFeaturedItems", { loading: true });
    const featuredItems = [];
    const ref = this.$fire.firestore
      .collection("items")
      .where("isFeatured", "==", true);
    const querySnapshot = await ref.get();
    querySnapshot.forEach(doc => {
      featuredItems.push({ ...doc.data(), id: doc.id });
    });
    commit("setFeaturedItems", { featuredItems });

    commit("setLoadingFeaturedItems", { loading: false });
  },

  async fetchRecentlyAddedItems({ commit }) {
    commit("setLoadingRecentlyAddedItems", { loading: true });
    const recentlyAddedItems = [];
    const ref = this.$fire.firestore.collection("items");
    const querySnapshot = await ref.get();
    querySnapshot.forEach(doc => {
      recentlyAddedItems.push({ ...doc.data(), id: doc.id });
    });
    commit("setRecentlyAddedItems", { recentlyAddedItems });
    commit("setLoadingRecentlyAddedItems", { loading: false });
  }
};

export const mutations = {
  setCategories(state, { categories }) {
    state.categories = categories;
  },
  setLoadingCategories(state, { loading }) {
    state.loadingCategories = loading;
  },

  setFeaturedItems(state, { featuredItems }) {
    state.featuredItems = featuredItems;
  },
  setLoadingFeaturedItems(state, { loading }) {
    state.loadingFeaturedItems = loading;
  },
  setRecentlyAddedItems(state, { recentlyAddedItems }) {
    state.recentlyAddedItems = recentlyAddedItems;
  },
  setLoadingRecentlyAddedItems(state, { loading }) {
    state.loadingRecentlyAddedItems = loading;
  }
};
