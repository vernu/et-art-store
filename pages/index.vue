<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="6">
        <h1>Welcome to ET Arts</h1>
        <p>
          A place to buy and sell Artistic products: Drawings, Paintings, String
          work and more
        </p>
        <v-btn color="primary" link nuxt to="/discover">Discover</v-btn>
        <v-btn outlined link nuxt to="/sell">Start Selling</v-btn>
        <br />
        <br />
        <br />
        <v-row justify="content-between"
          ><v-col v-for="(category, i) in categories" :key="i">
            <v-chip link to="" outlined color="primary">
              <v-card-title>{{ category.name }}</v-card-title></v-chip
            >
          </v-col></v-row
        > </v-col
      ><v-col sm="12" md="6">
        <v-carousel continuous cycle interval="3000" vertical-delimiters>
          <v-carousel-item v-for="(item, i) in featuredItems" :key="i">
            <v-img
              :src="item.mainImage"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
              height="100%"
            >
              <div class="text-h3" align="center" justify="center">
                {{ item.name }}
              </div>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <h2>Popular Sellers</h2>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="3"
        v-for="(seller, i) in popularSellers"
        :key="i"
      >
        <v-card elevation="6" nuxt link :to="`/discover?seller=${i}`">
          <v-card-title>
            {{ seller.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <h2>Recently Added</h2>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="3"
        v-for="(item, i) in recentlyAddedItems"
        :key="i"
      >
        <v-card elevation="6">
          <v-img
            :src="item.mainImage"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
            height="200px"
          >
            <v-card-title v-text="item.name"></v-card-title>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-actions>
            <v-btn text color="teal accent-4" link nuxt :to="`items/${i}`">
              View
            </v-btn>
            <v-spacer />
            <div>ETB {{ item.price }}</div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      categories: [],
      featuredItems: [],
      recentlyAddedItems: [],
      popularSellers: [{ name: "isra el" }, { name: "vernu" }],
    };
  },
  async created() {
    this.fetchCategories();
    this.fetchFeaturedItems();
    this.fetchRecentlyAddedItems();
  },

  methods: {
    async fetchCategories() {
      const categs = [];
      const ref = this.$fire.firestore.collection("categories");
      const querySnapshot = await ref.get();
      querySnapshot.forEach((doc) => {
        categs.push({ ...doc.data(), id: doc.id });
      });
      this.categories = categs;
    },

    async fetchFeaturedItems() {
      const items = [];
      const ref = this.$fire.firestore
        .collection("items")
        .where("isFeatured", "==", true);
      const querySnapshot = await ref.get();
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      this.featuredItems = items;
      console.log(items);
    },
    async fetchRecentlyAddedItems() {
      const items = [];
      const ref = this.$fire.firestore.collection("items");
      const querySnapshot = await ref.get();
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      this.recentlyAddedItems = items;
    },
  },
};
</script>
