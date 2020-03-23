<template>
  <q-card
    :class="{
      'bg-dark': !primary,
      'bg-primary': primary,
      'text-white': true,
      'lesson-card': true,
      flex: true
    }"
  >
    <div style="width:60%" v-if="lesson">
      <q-card-section>
        <div class="text-h6">{{ pre + lesson.subject + post }}</div>
      </q-card-section>

      <q-card-section>
        <div>
          <b>Sala:</b>
          {{ lesson.room.name }}
        </div>

        <div :class="{ 'text-faded': !primary }">Dzwonek: {{ start }} - {{ end }}</div>
      </q-card-section>
    </div>
    <div style="width:60%" v-else>
      <q-card-section>
        <div class="text-h6"></div>
        <div :class="{ 'text-faded': !primary }">Dzwonek: {{ start }} - {{ end }}</div>
      </q-card-section>
    </div>

    <q-card-section style="width:40%;">
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { Period, Lesson } from "@/store/plan/types";

@Component
export default class LessonCard extends Vue {
  @Prop({ default: null })
  lesson!: Lesson;
  @Prop({ default: "00" })
  start!: string;
  @Prop({ default: "00" })
  end!: string;

  @Prop({ default: "" })
  pre!: string;

  @Prop({ default: false })
  primary!: boolean;

  get post(): string {
    let name = this.lesson.className.name;
    return name ? " - " + name : "";
  }
}
</script>

<style>
.lesson-card {
  margin: 8px;
  margin-bottom: 0px;
}
</style>
