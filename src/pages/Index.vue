<template>
  <q-page style="overflow-x: hidden"  v-on:dblclick="$router.push('/FullTable')" >
    <lesson-card :lessonInfo="GetLessonInfo(todayPlan,userGrp,lessonId)" :time="timeLeftString"></lesson-card>
    <lesson-card :lessonInfo="GetLessonInfo(todayPlan,userGrp,lessonId+1)"></lesson-card>
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
      timeLeftString: "0"
    };
  },
  watch: {
    userGrp() {
      this.$emit("TriggerTrans")
    }
  },
  methods: {
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
    formatTimeMs(inMs) {
          let ms = inMs % 1000;
          inMs = (inMs - ms) / 1000;
          let secs = inMs % 60;
          inMs = (inMs - secs) / 60;
          let mins = inMs % 60;
          let hrs = (inMs - mins) / 60;

          return this.formatTime({hrs,mins,secs});
    },
    formatTime(timeObj) {
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
        return hrs + "h " +  Math.abs(mins) + "min " +  Math.abs(secs) + "s";
      }
    },
    getTimeLeft(endH,endM){
      let curDate = new Date();

      let endDate = new Date();
      endDate.setHours(endH);
      endDate.setMinutes(endM);
      endDate.setSeconds(0);

      let timeLeftMs = endDate.getTime() - curDate.getTime()
      
      // If time between dates is higher than 45 min, it means there is gap between lessons
      // Here we calculate how long the gap is
      if (timeLeftMs > 2700000) {
        timeLeftMs-=2700000;
      }

      return timeLeftMs;
    },
    timerLoop(){
      const date = new Date();
      
      this.lessonId = QuickGetLessonId(date);

      let info = this.GetLessonInfo(this.todayPlan,1,this.lessonId);

      let end = info.end.split(":");
      let endH = parseInt(end[0]);
      let endM = parseInt(end[1]);

      if (endH == NaN || endM == NaN){
        endH = 0;
        endM = 0;
      } 

      let timeLeft = this.getTimeLeft(endH,endM)

      // if(timeLeft>18000000) timeLeft = 0; // 5h limit
      if (timeLeft < -1800000) timeLeft = 0; // -0.5h limit

      this.timeLeftString = this.formatTimeMs(timeLeft);

      if (this._isDestroyed != true) {
        setTimeout(() => {
          this.timerLoop();
        }, 1000);
      }
    }
  },
  created() {
    const date = new Date();

    // date.setHours(16);
    // date.setMinutes(5);

    let todayPlanRaw = this.GetTodayPlan(this.plan, date);
    if (todayPlanRaw == null) todayPlanRaw = [];
    this.todayPlan = todayPlanRaw.map(plan => {
      return {
        end: plan.end,
        lessons: [plan.lessons.g1, plan.lessons.g2]
      };
    });

    this.timerLoop();

  }
};
</script>
