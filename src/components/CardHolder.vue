<template>
  <div id="flex-card-holder">
    <lesson-card
      :class="{ 'full-size': isFullSize(), 'half-size': ! isFullSize() }"
      :lessonInfo="this.lessonInfo"
      :primary="this.primary"
    ></lesson-card>
  </div>
</template>

<script>
import LessonCard from "./LessonCard";
export default {
  name: "CardHolder",
  props: ["lessonInfo", "primary"],
  components: {
    "lesson-card": LessonCard
  },
  methods: {
    isFullSize() {
      // return { "full-size": false };
      return true;
    }
  }
};
</script>

<style>
#flex-card-holder {
  display: flex;
}
.full-size {
  width: 100%;
}
.half-size {
  width: 50%;
}
</style>