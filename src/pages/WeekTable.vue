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
    />
  </q-page>
</template>

<script>
export default {
  name: "PageWeekTable",
  props: ["plan", "userGrp"],
  methods: {
    genLessonLabel(dayId, lId) {
      let l = this.plan[dayId];
      if (l != null) l = l[lId];
      if (l != null) l = l.lessons[`g${this.userGrp}`];
      if (l == null) return "-";

      let subject = l.subject;
      let roomName = l.room.name;
      let teacherName = l.teacher.name;

      if (subject == "-" && roomName == "-" && teacherName == "-") return "-";

      if ((teacherName == "") | (teacherName == null)) teacherName = "";
      else teacherName = ", " + teacherName;

      return `${l.subject} | ${roomName} ${teacherName}`;
    }
  },
  data() {
    return {
      columns: [
        {
          name: "Nr",
          required: true,
          label: "Nr",
          align: "left",
          field: row => row.time
        },
        {
          name: "Po",
          required: true,
          label: "Po",
          align: "left",
          field: row => this.genLessonLabel(0, row.nr)
        },
        {
          name: "Wt",
          required: true,
          label: "Wt",
          align: "left",
          field: row => this.genLessonLabel(1, row.nr)
        },
        {
          name: "Śr",
          required: true,
          label: "Śr",
          align: "left",
          field: row => this.genLessonLabel(2, row.nr)
        },
        {
          name: "Cz",
          required: true,
          label: "Cz",
          align: "left",
          field: row => this.genLessonLabel(3, row.nr)
        },
        {
          name: "Pi",
          required: true,
          label: "Pi",
          align: "left",
          field: row => this.genLessonLabel(4, row.nr)
        }
      ],
      data: [
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
      ]
    };
  }
};
</script>

<style>
#my-table > thead tr:first-child th:first-child,
td:first-child {
  background-color: #fff;
  position: sticky;
  left: 0;
  z-index: 1;
}
</style>