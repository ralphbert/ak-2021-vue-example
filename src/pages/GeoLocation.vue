<template>
  <div>
    <div class="row align-items-center mb-3">
      <div class="col-auto">
        <button :disabled="loading" class="btn btn-primary" @click="start()">Locate me</button>
      </div>
      <div class="col-auto">
        <span>{{ status }}</span>

        <div class="alert alert-danger" v-if="error">{{ error.message }}</div>
      </div>
    </div>


    <div class="card" v-if="position">
      <div class="card-body">
        <h5 class="card-title">Coordinates</h5>
        <p>{{ lat }}, {{ lng }}</p>
        <a :href="googleMapsLink" target="_blank">Show on maps</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeoLocation",
  data() {
    return {
      status: '',
      error: null,
      position: null,
      loading: false,
    }
  },
  computed: {
    googleMapsLink() {
      return `https://maps.google.com/?q=${this.lat},${this.lng}`;
    },
    lat() {
      return this.position?.coords?.latitude;
    },
    lng() {
      return this.position?.coords?.longitude;
    }
  },
  methods: {
    start() {
      this.error = null;
      this.position = null;

      if (!navigator.geolocation) {
        this.status = 'Geolocation is not supported by your browser';
      } else {
        this.loading = true;
        this.status = 'Locating…';

        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.position = position;
              this.status = '';
              this.error = null;
              this.loading = false;
            },
            (error) => {
              this.status = 'Error';
              this.error = error;
              this.loading = false;
            }
        );
      }

    }
  }
}
</script>

<style scoped>

</style>
