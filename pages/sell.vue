<template>
  <v-container>
    <h2>Sell</h2>

    <v-form>
      <v-text-field label="Item Name" v-model="itemName"></v-text-field>
      <v-text-field
        label="Price"
        type="number"
        v-model="price"
        required
      ></v-text-field>

      <v-text-field label="Image Url" v-model="imageUrl"></v-text-field>
      <v-progress-circular indeterminate v-if="isSubmitting" />
      <v-btn v-else v-on:click="submit">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      isSubmitting: false,
      itemName: "",
      price: null,
      imageUrl: null,
    };
  },
  methods: {
    async submit() {
      this.isSubmitting = true;
      const ref = this.$fire.firestore.collection("items").doc();
      try {
        await ref.set({
          name: this.itemName,
          price: parseInt(this.price),
          mainImage: this.imageUrl,
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>