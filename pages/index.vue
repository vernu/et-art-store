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

        <v-progress-linear
          v-if="loadingCategories"
          indeterminate
          color="blue"
          height="20px"
          striped
        ></v-progress-linear>
        <v-row justify="content-between"
          ><v-col v-for="(category, i) in categories" :key="i">
            <v-chip link to="" outlined color="primary">
              <v-card-title>{{ category.name }}</v-card-title></v-chip
            >
          </v-col></v-row
        > </v-col
      ><v-col sm="12" md="6">
        <v-carousel continuous cycle interval="3000" vertical-delimiters>
          <v-row v-if="loadingFeaturedItems" align-content="space-around">
            <v-col><br /></v-col>
            <v-col>
              <v-progress-circular
                :size="70"
                :width="7"
                color="blue"
                indeterminate
              ></v-progress-circular
            ></v-col>
          </v-row>

          <v-carousel-item v-else v-for="(item, i) in featuredItems" :key="i">
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
    <v-progress-linear
      v-if="loadingRecentlyAddedItems"
      indeterminate
      color="blue"
      height="20px"
    ></v-progress-linear>
    <v-row v-else>
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      categories: (state) => state.home.categories,
      loadingCategories: (state) => state.home.loadingCategories,
      featuredItems: (state) => state.home.featuredItems,
      loadingFeaturedItems: (state) => state.home.loadingFeaturedItems,
      recentlyAddedItems: (state) => state.home.recentlyAddedItems,
      loadingRecentlyAddedItems: (state) =>
        state.home.loadingRecentlyAddedItems,
    }),
  },
  data: () => {
    return {
      popularSellers: [{ name: "isra el" }, { name: "vernu" }],
    };
  },
  async created() {
    this.$store.dispatch("home/fetchCategories");
    this.$store.dispatch("home/fetchFeaturedItems");
    this.$store.dispatch("home/fetchRecentlyAddedItems");
  },

  methods: {},
};
</script>
