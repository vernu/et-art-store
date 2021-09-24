<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" md="4">
        <h2>Sell</h2>

        <v-form>
          <v-select
            :items="allCategories"
            v-model="selectedCategory"
            item-text="name"
            item-value="id"
            outlined
            label="Select Category"
          ></v-select>
          <v-text-field label="Item Name" v-model="itemName"></v-text-field>
          <v-text-field
            label="Price"
            type="number"
            v-model="price"
            required
          ></v-text-field>

          <v-file-input
            v-model="itemImage"
            accept="image/*"
            prepend-icon="mdi-camera"
            label="Image"
          ></v-file-input>

          <v-progress-circular indeterminate v-if="isSubmitting" />
          <v-btn v-else v-on:click="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
    }),
  },
  data: () => {
    return {
      allCategories: [],
      selectedCategory: null,
      isSubmitting: false,
      itemName: null,
      price: null,
      itemImage: null,
      imageUrl: null,
    };
  },
  methods: {
    async submit() {
      try {
        const category = this.allCategories.filter(
          (categ) => categ.id == this.selectedCategory
        )[0];

        const timestamp = new Date().getTime();
        this.isSubmitting = true;
        const imageRef = this.$fire.storage
          .ref()
          .child(`items/${timestamp}-${this.itemImage.name}`);
        const snapshot = await imageRef.put(this.itemImage);
        const imageDownloadUrl = await snapshot.ref.getDownloadURL();
        this.imageUrl = imageDownloadUrl;
        const ref = this.$fire.firestore.collection("items").doc();
        await ref.set({
          name: this.itemName,
          price: parseInt(this.price),
          categoryId: category.id,
          categoryName: category.name,
          mainImage: this.imageUrl,
          userId: this.currentUser.id,
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.isSubmitting = false;
        this.$router.push("/");
      }
    },
  },
  async created() {
    const categories = [];
    const ref = this.$fire.firestore.collection("categories");
    const querySnapshot = await ref.get();
    querySnapshot.forEach((doc) => {
      categories.push({ ...doc.data(), id: doc.id });
    });
    this.allCategories = categories;
  },
};
</script>