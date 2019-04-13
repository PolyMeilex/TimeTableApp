<template>
  <q-page style="overflow-x: hidden" v-on:dblclick="$router.push('/FullTable')">
    <lesson-card :lessonInfo="GetLessonInfo(todayPlan,userGrp,lessonId)">
      <div class="flex justify-end">
        <q-btn round color="grey-7" icon="settings" flat @click="isSyncConfigOpen=true"/>
        <span style="color: hsla(0,0%,100%,.6); line-height:42px;">{{timeLeftString}}</span>
      </div>
    </lesson-card>
    <lesson-card :lessonInfo="GetLessonInfo(todayPlan,userGrp,lessonId+1)"></lesson-card>

    <q-dialog v-model="isSyncConfigOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Kalibracja</div>
        </q-card-section>

        <q-card-section>Dzwonek:</q-card-section>

        <q-card-section>
          <q-radio v-model="syncMult" :val="1" label="Spózinia się" style="margin-left:-10px;"/>
          <q-radio v-model="syncMult" :val="-1" label="Śpieszy się"/>
        </q-card-section>

        <q-card-section>
          <q-input v-model="syncConfigS" type="number" label="Sekundy"/>
          <q-input v-model="syncConfigM" type="number" label="Minuty"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Reset" color="primary" @click="SaveSyncConfig(0,0,true)"/>
          <q-btn flat label="OK" color="primary" @click="SaveSyncConfig(syncConfigS,syncConfigM)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>


<script>
import LessonCard from "../components/LessonCard";

import { QuickGetLessonId } from "../functions/LessonTimeCalc.js";

export default {
  name: "PageIndex",
  props: ["plan", "userGrp"],
  components: {
    "lesson-card": LessonCard
  },
  data() {
    return {
      todayPlan: [],
      lessonId: 1,
      timeLeftString: "0",
      isSyncConfigOpen: false,
      syncMult: 1,
      syncConfigS: 0,
      syncConfigM: 0,
      syncValue: 0
    };
  },
  watch: {
    userGrp() {
      this.$emit("TriggerTrans");
    }
  },
  methods: {
    SaveSyncConfig(iS, iM, reset) {
      console.log("call");
      this.isSyncConfigOpen = false;
      let value = 0;

      let s = parseInt(iS);
      let m = parseInt(iM);

      if (isNaN(s) || isNaN(m)) return;

      value += s;
      value += m * 60;
      value *= this.syncMult;

      localStorage.setItem("LocalOffset", value);
      this.syncValue = value;

      if (reset) {
        this.syncConfigS = iS;
        this.syncConfigM = iM;
      }
    },
    GetTodayPlan(plan, date) {
      const day = date.getDay() - 1;
      if (day >= 0 && day <= 4) return plan[day];
      else return plan[0];
    },
    GetLessonInfo(plan, grp, id) {
      const p = plan[id - 1];
      const emptyLesson = { title: "-", room: "-", end: "00:00" };

      if (p == null) return emptyLesson;

      const lesson = p.lessons[grp - 1];

      if (lesson == null) return emptyLesson;

      return { title: lesson.subject, room: lesson.room.name, end: p.end };
    },
    GetTimeFromMs(inMs) {
      let ms = inMs % 1000;
      inMs = (inMs - ms) / 1000;
      let secs = inMs % 60;
      inMs = (inMs - secs) / 60;
      let mins = inMs % 60;
      let hrs = (inMs - mins) / 60;

      return { hrs, mins, secs };
    },
    FormatTime(timeObj) {
      let hrs = timeObj.hrs;
      let mins = timeObj.mins;
      let secs = timeObj.secs;

      if (hrs == 0) {
        if (mins == 1) {
          return secs + "s";
        } else {
          return mins + "min " + Math.abs(secs) + "s";
        }
      } else {
        return hrs + "h " + Math.abs(mins) + "min " + Math.abs(secs) + "s";
      }
    },
    GetTimeLeft(endH, endM) {
      let curDate = new Date(); // curDate.setHours(8);
      // curDate.setMinutes(0);
      // curDate.setSeconds(10);

      let endDate = new Date();
      endDate.setHours(endH);
      endDate.setMinutes(endM);
      endDate.setSeconds(this.syncValue);

      let timeLeftMs = endDate.getTime() - curDate.getTime();
      
      // If time between dates is higher than 45 min, it means there is gap between lessons
      // Here we calculate how long the gap is
      if (timeLeftMs > 2700000) {
        timeLeftMs -= 2700000;
      }
      
      return timeLeftMs;
    },
    TimerLoop() {
      const date = new Date();

      this.lessonId = QuickGetLessonId(date);

      let info = this.GetLessonInfo(this.todayPlan, 1, this.lessonId);

      let end = info.end.split(":");
      let endH = parseInt(end[0]);
      let endM = parseInt(end[1]);

      if (isNaN(endH) || isNaN(endM)) {
        endH = 0;
        endM = 0;
      }

      

      let timeLeft = this.GetTimeLeft(endH, endM);


      // if(timeLeft>18000000) timeLeft = 0; // 5h limit
      if (timeLeft < -1800000) timeLeft = 0; // -0.5h limit

      this.timeLeftString = this.FormatTime(this.GetTimeFromMs(timeLeft));

      if (this._isDestroyed != true) {
        setTimeout(() => {
          this.TimerLoop();
        }, 1000);
      }
    }
  },
  created() {
    // ReMap Plan Data To Simpler Form
    const date = new Date();

    let todayPlanRaw = this.GetTodayPlan(this.plan, date);
    if (todayPlanRaw == null) todayPlanRaw = [];

    this.todayPlan = todayPlanRaw.map(plan => {
      return {
        end: plan.end,
        lessons: [plan.lessons.g1, plan.lessons.g2]
      };
    });
    //

    // Get Local Time Offset
    let off = parseInt(localStorage.getItem("LocalOffset"));
    if (isNaN(off)) off = 0;

    if (off < 0) this.syncMult = -1;

    let obj = this.GetTimeFromMs(Math.abs(off) * 1000);

    this.syncValue = off;
    this.syncConfigS = obj.secs;
    this.syncConfigM = obj.mins;
    //

    // Run Main Loop
    this.TimerLoop();
  }
};
</script>
