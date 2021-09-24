<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" md="4">
        <h2>Sell</h2>

        <v-form>
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
export default {
  data: () => {
    return {
      isSubmitting: false,
      itemName: "",
      price: null,
      itemImage: null,
      imageUrl: null,
    };
  },
  methods: {
    async submit() {
      const timestamp = new Date().getTime();
      this.isSubmitting = true;
      const imageRef = this.$fire.storage
        .ref()
        .child(`items/${timestamp}-${this.itemImage.name}`);
      try {
        const snapshot = await imageRef.put(this.itemImage);
        const imageDownloadUrl = await snapshot.ref.getDownloadURL();
        this.imageUrl = imageDownloadUrl;
        const ref = this.$fire.firestore.collection("items").doc();
        await ref.set({
          name: this.itemName,
          price: parseInt(this.price),
          mainImage: this.imageUrl,
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.isSubmitting = false;
        this.$router.push("/");
      }
    },
  },
};
</script>