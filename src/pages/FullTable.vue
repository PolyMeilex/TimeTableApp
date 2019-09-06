<template>
  <q-page v-on:dblclick="DbClickHandle()">
    <div class="bg-grey-10">
      <q-tabs align="left" v-model="currentTab">
        <q-tab class="text-white text-bold" :name="1" :alert="day==1? 'red':false">Po</q-tab>
        <q-tab class="text-white text-bold" :name="2" :alert="day==2? 'red':false">Wt</q-tab>
        <q-tab class="text-white text-bold" :name="3" :alert="day==3? 'red':false">Śr</q-tab>
        <q-tab class="text-white text-bold" :name="4" :alert="day==4? 'red':false">Cz</q-tab>
        <q-tab class="text-white text-bold" :name="5" :alert="day==5? 'red':false">Pi</q-tab>
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
        :name="index+1"
        style="background-color:transparent; padding:0px;"
        v-for="(planForDay,index) in planForWeek"
        :key="index"
      >
        <div :key="index" v-for="(lesson,index) in planForDay">
          <transition name="trans-left" mode="out-in">
            <lesson-card
              :key="GetLessonKey(lesson,userGrp)"
              :lessonInfo="GetLessonInfo(lesson,userGrp)"
              :primary="index==currentLesson && day==currentTab"
            ></lesson-card>
          </transition>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import LessonCard from "../components/LessonCard";

import { QuickGetLessonId } from "../functions/LessonTimeCalc.js";

export default {
  name: "PageFullTable",
  props: ["plan", "userGrp"],
  components: {
    "lesson-card": LessonCard
  },
  data() {
    return {
      currentTab: 1,
      planForWeek: [],
      trans: false,
      day: 1,
      currentLesson: 0
    };
  },
  watch: {
    userGrp() {
      this.trans = !this.trans;
    }
  },
  methods: {
    DbClickHandle() {
      window.navigator.vibrate(100);
      this.$router.push("/");
    },
    GetLessonInfo(inputLesson, userGrp) {
      const emptyLesson = { title: "-", room: "-", end: 0 };

      if (inputLesson == null) return emptyLesson;

      const lesson = inputLesson.lessons[userGrp - 1];

      if (lesson == null) return emptyLesson;

      let title = lesson.subject;
      if (localStorage.getItem("user-mode") == "n") {
        if (lesson.className) {
          title += " " + lesson.className.name;
        }
      } else {
        if (lesson.teacher) {
          if (lesson.teacher.name && lesson.teacher.name != "-") {
            title += " - " + lesson.teacher.name;
          }
        }
      }

      return {
        title: title,
        room: lesson.room.name,
        end: inputLesson.end
      };
    },
    GetLessonKey(inputLesson, userGrp) {
      return inputLesson.lessons[userGrp - 1].key;
    },
    uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  },
  created() {
    let PlanRaw = this.plan;
    let Plan = PlanRaw.map(day => {
      return day.map(plan => {
        let areSame = true;

        if (plan.lessons.g1.subject != plan.lessons.g2.subject) areSame = false;
        if (plan.lessons.g1.room.name != plan.lessons.g2.room.name)
          areSame = false;

        if (areSame) {
          let key = this.uuidv4();
          plan.lessons.g1.key = key;
          plan.lessons.g2.key = key;
        } else {
          plan.lessons.g1.key = this.uuidv4();
          plan.lessons.g2.key = this.uuidv4();
        }

        return {
          end: plan.end,
          lessons: [plan.lessons.g1, plan.lessons.g2]
        };
      });
    });

    this.planForWeek = Plan;

    const d = new Date();

    this.day = d.getDay();

    if (this.day > 5 || this.day === 0) this.day = 1;

    this.currentTab = this.day;

    this.currentLesson = QuickGetLessonId(d) - 1;
  }
};
</script>
