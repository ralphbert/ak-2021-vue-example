<template>
  <div>
    <button class="btn btn-primary" v-if="!stream" @click="start">Start</button>
    <button class="btn btn-danger" v-if="stream" @click="stop">Stop</button>

    <div v-if="error">{{ error.message }}</div>
    <div v-show="stream">
      <video class="bg-primary" ref="video"></video>

      <button @click="snapshot">Snapshot</button>

      <div>
        <h6>Captured snapshot</h6>
        <canvas ref="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebcamLoader",
  data() {
    return {
      error: null,
      stream: null,
    };
  },
  computed: {
    video() {
      return this.$refs.video
    },
    canvas() {
      return this.$refs.canvas;
    },
    context() {
      return this.canvas.getContext('2d');
    },
    size() {
      const w = this.video.videoWidth;
      const h = this.video.videoHeight;

      return {
        w, h,
      };
    }
  },
  methods: {
    stop() {
      if (this.video?.srcObject) {
        const {w, h} = this.size;
        this.video.srcObject = null;
        const tracks = this.stream.getTracks();

        tracks.forEach(function (track) {
          track.stop();
        });

        this.stream = null;
        this.context.fillRect(0, 0, w, h);
      }
    },
    async start() {
      this.error = null;

      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true,
        });

        const player = this.$refs.video;
        player.srcObject = this.stream;
        player.onloadeddata = () => {
          player.play();
        }
      } catch (err) {
        this.error = err;
      }
    },
    snapshot() {
      const {w, h} = this.size;
      this.canvas.width = w;
      this.canvas.height = h;
      this.context.fillRect(0, 0, w, h);
      this.context.drawImage(this.video, 0, 0, w, h);
      this.canvas.style.display = "block";

      const imgData = this.context.getImageData(0, 0, w, h);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];

        const v = (red + green + blue) / 3;

        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = alpha;
      }

      this.context.putImageData(new ImageData(data, w, h), 0, 0);
    },
  },
  beforeDestroy() {
    this.stop();
  }
}
</script>

<style scoped>

</style>
