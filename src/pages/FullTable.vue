<template>
  <q-page @dblclick="dbClickHandle()">
    <div class="bg-grey-10">
      <q-tabs align="left" v-model="currentTab">
        <q-tab class="text-white text-bold" :name="1" :alert="day == 1 ? 'red' : false">Po</q-tab>
        <q-tab class="text-white text-bold" :name="2" :alert="day == 2 ? 'red' : false">Wt</q-tab>
        <q-tab class="text-white text-bold" :name="3" :alert="day == 3 ? 'red' : false">Śr</q-tab>
        <q-tab class="text-white text-bold" :name="4" :alert="day == 4 ? 'red' : false">Cz</q-tab>
        <q-tab class="text-white text-bold" :name="5" :alert="day == 5 ? 'red' : false">Pi</q-tab>
      </q-tabs>
    </div>

    <q-tab-panels
      v-model="currentTab"
      animated
      swipeable
      infinite
      style="background-color:transparent;"
    >
      <q-tab-panel
        style="background-color:transparent; padding:0px;"
        v-for="(day, index_day) in planMod.planJSON.days"
        :name="index_day + 1"
        :key="index_day"
      >
        <div v-for="(period, index) in day.hours" :key="index">
          <transition name="trans-left" mode="out-in">
            <lesson-card
              :lesson="getLesson(period)"
              :key="getKey(period)"
              :start="period.start.str"
              :end="period.end.str"
              :pre=" index+1+'. ' "
              :primary="index == currentLesson && (index_day+1) == currentTab"
            ></lesson-card>
          </transition>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import LessonCard from "../components/LessonCard.vue";

import { QuickGetPeriodId } from "../functions/PeriodTimeCalc";

import { PlanJSON, Lesson, Period } from "../store/plan/types";

import { settingsMod, planMod } from "@/store";

@Component({
  components: {
    "lesson-card": LessonCard
  }
})
export default class FullTable extends Vue {
  currentTab = this.day;
  planMod = planMod;

  get date(): Date {
    let d = new Date();
    d.setHours(8);
    d.setMinutes(45);
    return d;
  }

  get day(): number {
    let day = this.date.getDay();
    if (day > 5 || day === 0) day = 1;
    return day;
  }

  get currentLesson(): number {
    return QuickGetPeriodId(this.date);
  }

  getLesson(period: Period): Lesson | undefined {
    if (period.splited) {
      return period.lessons.find(l => l.grp == settingsMod.grp);
    } else {
      return period.lessons[0];
    }
  }

  getKey(period: Period): string {
    let lesson = this.getLesson(period);

    if (lesson) {
      return lesson.key;
    } else {
      return "";
    }
  }

  dbClickHandle() {
    window.navigator.vibrate(100);
    this.$router.push("/");
  }
}
</script>
