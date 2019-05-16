<template>
  <q-page style="max-width:700px; margin:auto;">
    <q-card class="bg-dark text-white" style="margin: 8px;" :key="post.id" v-for="post in posts">
      <img v-if="post.hasBanner" :src="post.bannerUrl">
      <q-card-section>
        <a
          @click="openLink(post.link)"
          style="cursor:pointer;"
          class="text-h6"
        >{{ toTitleCase(post.slug.replace(/-/g,' ')) }}</a>
      </q-card-section>

      <q-card-section>
        <q-btn
          class="bg-primary"
          v-if="post.hasPdf"
          @click="$router.push('/PdfReader/'+ encodeURIComponent(post.pdfUrl))"
        >Open Pdf</q-btn>
      </q-card-section>

      <q-card-section>
        <q-expansion-item v-if="post.content.rendered != null" label="Treść Posta" dark>
          <q-card class="bg-grey-9">
            <q-card-section class="html-view" v-html="post.content.rendered"/>
          </q-card>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>


<style>
.html-view * {
  color: white;
  text-decoration: none;
}
</style>


<script>
export default {
  name: "News",
  data() {
    return {
      posts: []
    };
  },
  methods: {
    openLink(link) {
      window.open(link, "_blank");
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    getBaner(post, banerId) {
      this.$q.loadingBar.start();
      fetch("https://ekolib.tk/wp-api/wp/v2/media/" + banerId)
        .then(r => r.json())
        .then(j => {
          let url = j["source_url"];
          if (url) {
            post.hasBanner = true;
            post.bannerUrl = url;
          }
          this.$q.loadingBar.stop();
        });
    },
    getPdf(post) {
      const content = post.content.rendered;
      if (content != null) {
        const el = document.createElement("div");
        el.innerHTML = content;
        const pdfA = el.querySelector(".pdfemb-viewer");
        if (pdfA != null) {
          const link = pdfA.getAttribute("href");
          if (link != null) {
            post.hasPdf = true;
            post.pdfUrl = link;
          }
        }
      }
    }
  },
  created() {
    this.$q.loadingBar.start();
    fetch("https://ekolib.tk/wp-api/wp/v2/posts?categories=54")
      .then(r => r.json())
      .then(j =>
        j.map(p => {
          p.hasBanner = false;
          p.bannerUrl = "";

          p.hasPdf = false;
          p.pdfUrl = "";
          return p;
        })
      )
      .then(j => (this.posts = j))
      .then(() => {
        this.posts.forEach(p => {
          this.getPdf(p);
          if (p["featured_media"]) this.getBaner(p, p["featured_media"]);
        });
      })
      .then(() => this.$q.loadingBar.stop())
      .catch(e => this.$q.loadingBar.stop());
  }
};
</script>

