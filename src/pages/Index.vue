<template>
  <q-page style="overflow-x: hidden" v-on:dblclick="dbClickHandle()">
    <lesson-card
      v-if="getPeriod(periodId)"
      :lesson="getLesson(getPeriod(periodId))"
      :start="getPeriod(periodId).start.str"
      :end="getPeriod(periodId).end.str"
    >
      <div class="flex justify-end" style="height: 40%;">
        <span style="color: hsla(0,0%,100%,.6);align-self: center;">{{timeLeftString}}</span>
      </div>
    </lesson-card>

    <lesson-card
      v-if="getPeriod(periodId+1)"
      :lesson="getLesson(getPeriod(periodId+1))"
      :start="getPeriod(periodId+1).start.str"
      :end="getPeriod(periodId+1).end.str"
    ></lesson-card>

    <q-card
      :class="{
        'bg-dark': !primary,
        'bg-primary': primary,
        'text-white': true,
        'lesson-card': true,
        flex: true
      }"
      dark
    >
      <q-card-section v-if="getPeriod(periodId) == null && getPeriod(periodId + 1) == null">
        <div class="text-h6">Brak lekcji na dziś</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import LessonCard from "@/components/LessonCard.vue";

import { QuickGetPeriodId } from "@/functions/PeriodTimeCalc";

import { PlanJSON, Lesson, Period } from "@/store/plan/types";

import { settingsMod, planMod } from "@/store";

@Component({
  components: {
    "lesson-card": LessonCard,
  },
})
export default class Index extends Vue {
  date = new Date();

  get grp(): number {
    return settingsMod.grp;
  }

  @Watch("grp")
  onGrp() {
    this.$emit("triggerTrans");
  }

  get periodId(): number {
    return QuickGetPeriodId(this.date);
  }

  get timeLeftString(): string {
    let period = this.getPeriod(this.periodId);
    console.log(period);
    if (period == null) return "-";
    let start = period.start;
    let end = period.end;

    let endDate = new Date();
    endDate.setHours(end.h);
    endDate.setMinutes(end.m);
    endDate.setSeconds(0);

    let timeLeftMs = endDate.getTime() - this.date.getTime();

    // If time between dates is higher than 45 min, it means there is gap between lessons
    // Here we calculate how long the gap is
    if (timeLeftMs > 2700000) {
      timeLeftMs -= 2700000;
    }

    // 5h limit
    if (timeLeftMs > 18000000) timeLeftMs = 0;
    // -0.5h limit
    else if (timeLeftMs < -1800000) timeLeftMs = 0;

    return this.formatTime(this.getTimeFromMs(timeLeftMs));
  }

  get day(): number {
    let day = this.date.getDay();
    if (day > 5 || day === 0) day = 1;
    return day;
  }

  getTimeFromMs(inMs: number): any {
    let ms = inMs % 1000;
    inMs = (inMs - ms) / 1000;
    let secs = inMs % 60;
    inMs = (inMs - secs) / 60;
    let mins = inMs % 60;
    let hrs = (inMs - mins) / 60;

    return { hrs, mins, secs };
  }

  formatTime(time: any): string {
    let hrs = time.hrs;
    let mins = time.mins;
    let secs = time.secs;

    if (hrs == 0) {
      if (mins == 0) {
        return secs + "s";
      } else {
        return mins + "min " + Math.abs(secs) + "s";
      }
    } else {
      return hrs + "h " + Math.abs(mins) + "min " + Math.abs(secs) + "s";
    }
  }

  getPeriod(periodId: number): Period | undefined {
    return planMod.planJSON?.days[this.day - 1]?.hours[periodId];
  }

  getLesson(period: Period | null): Lesson | undefined {
    if (period != null) {
      if (period.splited) {
        return period.lessons.find((l) => l.grp == this.grp);
      } else {
        return period.lessons[0];
      }
    } else {
      return undefined;
    }
  }

  timerLoop() {
    this.date = new Date();

    // @ts-ignore
    if (this._isDestroyed != true) {
      setTimeout(() => {
        // this.timerLoop();
      }, 1000);
    }
  }

  created() {
    this.timerLoop();
  }

  dbClickHandle() {
    window.navigator.vibrate(100);
    this.$router.push("/FullTable");
  }
}
</script>
