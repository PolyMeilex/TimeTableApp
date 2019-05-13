<template>
  <q-page>
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
        <span>PDF lub treść ogłoszenia:</span>
        <div class="html-view" v-html="post.content.rendered"></div>
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
      fetch("https://ekolib.tk/wp-api/wp/v2/media/" + banerId)
        .then(r => r.json())
        .then(j => {
          let url = j["source_url"];
          if (url) {
            post.hasBanner = true;
            post.bannerUrl = url;
          }
        });
    }
  },
  created() {
    fetch("https://ekolib.tk/wp-api/wp/v2/posts?categories=54")
      .then(r => r.json())
      .then(j =>
        j.map(p => {
          p.hasBanner = false;
          p.bannerUrl = "";
          return p;
        })
      )
      .then(j => (this.posts = j))
      .then(() => {
        this.posts.forEach(p => {
          if (p["featured_media"]) this.getBaner(p, p["featured_media"]);
        });
      });
  }
};
</script>

