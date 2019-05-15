<template>
  <div>
    <pdf
      style="overflow: auto;"
      :src="'https://cors-anywhere.herokuapp.com/'+$route.params.link"
      ref="pdfElement"
      @loading="loadingHandle"
    >
      <template slot="loading" class="text-white">loading content here...</template>
    </pdf>
    <q-btn
      style="positon:fixed; position:fixed; bottom: 0; right: 0;"
      class="bg-primary text-white"
      @click="$router.back()"
    >Powrót</q-btn>
  </div>
</template>

<style>
.canvasWrapper {
  filter: brightness(0.95);
}
.page {
  margin: auto;
}
</style>


<script>
import pdf from "pdfvuer";

export default {
  props: {
    userClassLabel: String
  },
  components: {
    pdf
  },
  methods: {
    loadingHandle(a) {
      if (a === false) {
        this.$q.loadingBar.stop();
        this.processPdf();
      }
    },
    processPdf() {
      const rootElement = this.$refs.pdfElement.pdfViewer.div;
      const textDiv = rootElement.querySelector(".textLayer");

      setTimeout(() => {
        const arr = Array.prototype.slice.call(textDiv.children);

        arr.forEach(el => {
          const name = this.userClassLabel.toLowerCase();
          const text = el.innerText.toLowerCase();
          if (text.includes(name)) {
            el.className = "highlight";
          }
        });
      }, 1000);
    }
  },
  created() {
    this.$q.loadingBar.start();
  }
};
</script>
