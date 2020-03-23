<template>
  <q-page>
    <q-table
      id="my-table"
      title
      :data="data"
      :columns="columns"
      row-key="name"
      :pagination="{rowsPerPage:10}"
      separator="cell"
      hide-bottom
      dense
    />
  </q-page>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import LessonCard from "../components/LessonCard.vue";

import { QuickGetPeriodId } from "../functions/PeriodTimeCalc";

import { PlanJSON, Lesson, Period } from "../store/plan/types";

import { settingsMod, planMod } from "@/store";

@Component
export default class WeekTable extends Vue {
  columns = [
    {
      name: "",
      required: true,
      label: "",
      align: "left",
      field: (row: any) => row.nr + 1 + ". " + row.time
    }
  ];
  data = [
    { nr: 0, time: "8:00-8:45" },
    { nr: 1, time: "8:55-9:40" },
    { nr: 2, time: "9:50-10:35" },
    { nr: 3, time: "10:45-11:30" },
    { nr: 4, time: "11:40-12:25" },
    { nr: 5, time: "12:35-13:20" },
    { nr: 6, time: "13:35-14:20" },
    { nr: 7, time: "14:30-15:15" },
    { nr: 8, time: "15:20-16:05" },
    { nr: 9, time: "16:10-16:55" }
  ];

  get settingsGrp(): number {
    return this.$store.state.settings.grp;
  }

  getLesson(period: Period): Lesson | undefined {
    if (period.splited) {
      return period.lessons.find(l => l.grp == settingsMod.grp);
    } else {
      return period.lessons[0];
    }
  }

  genLessonLabel(dayId: number, pId: number): string {
    let day = planMod.planJSON?.days[dayId];
    let period = day?.hours[pId];
    if (!period) return "-";

    let lesson = this.getLesson(period);

    if (lesson) {
      return `${lesson.subject} | ${lesson.room.name} - ${lesson.teacher.name} ${lesson.className.name}`;
    }

    return "-";
  }

  created() {
    let list = ["Po", "Wt", "Śr", "Cz", "Pi"];

    list.forEach((d, id) => {
      this.columns.push({
        name: d,
        required: true,
        label: d,
        align: "left",
        field: (row: any) => this.genLessonLabel(id, row.nr)
      });
    });

    fetch("https://codenomik.ekonomikzamosc.pl/api/ekolib/color.php")
      .then(res => res.text())
      .then(c => {
        document.documentElement.style.setProperty("--bg-color", c);
      })
      .catch(e => {});
  }
}
</script>

<style>
:root {
  --bg-color: #fff;
  /* 027be3 */
}

#my-table {
  max-width: 100%;
}

thead > tr:first-child {
  background-color: var(--bg-color);
  color: #000099;
  font-weight: bold;
}

td:first-child {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0px 5px !important;

  position: sticky;
  left: 0;
  z-index: 1;
}
</style>