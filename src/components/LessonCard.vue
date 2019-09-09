<template>
  <q-card
    :class="{'bg-dark':!primary,'bg-primary':primary,'text-white':true,'lesson-card':true, 'flex':true}"
  >
    <div style="width:60%" v-if="lessonInfo">
      <q-card-section>
        <div class="text-h6">{{lessonInfo.title}}</div>
      </q-card-section>

      <q-card-section>
        <div>
          <b>Sala:</b>
          {{lessonInfo.room}}
        </div>

        <div :class="{'text-faded':!primary}">Dzwonek: {{lessonInfo.start}} - {{lessonInfo.end}}</div>
      </q-card-section>
    </div>
    <div style="width:70%" v-else>
      <q-card-section>
        <q-icon name="warning" class="text-red" style="font-size: 4rem;" />
        <div class="text-h6">Nie znaleziono informacji o tej lekcji</div>
      </q-card-section>
    </div>

    <q-card-section style="width:40%;">
      <slot></slot>
    </q-card-section>
  </q-card>
</template>


<script>
export default {
  name: "LessonCard",
  props: ["lessonInfo", "primary"]
};
</script>

<style>
.lesson-card {
  margin: 8px;
  margin-bottom: 0px;
}
</style>
