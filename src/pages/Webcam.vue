<template>
  <div>
    <h2>Webcam API</h2>

    <WebcamLoader></WebcamLoader>
  </div>
</template>

<script>
import WebcamLoader from "../components/WebcamLoader";

export default {
  name: "Webcam",
  components: {
    WebcamLoader,
  }
}
</script>

<style scoped>

</style>
