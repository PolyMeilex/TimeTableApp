<template>
  <div id="q-app" style="overflow-x: hidden;">
    <router-view :userGrp="userGrp" :userClassLabel="userClassLabel" :plan="onlinePlanJson" @setGrp="setGrp" @downloadPlan="downloadPlan" :forceReRender="forceReRender"/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      onlinePlanJson: [],
      userGrp: 1,
      userClass: 10,
      userClassLabel: "2bt",
      forceReRender: false
    };
  },
  methods: {
    setGrp(grp) {
      this.userGrp = grp;
      localStorage.setItem("GrpStorage", grp);
    },
    downloadPlan() {
      let userClass = localStorage.getItem("klasa");
      if (userClass != null && parseInt(userClass) != NaN)
      this.userClass = parseInt(userClass);

      let userClassLabel = localStorage.getItem("klasa-label");
      if (userClassLabel != null) this.userClassLabel = userClassLabel;

      fetch(
        "https://codenomik.ekonomikzamosc.pl/api/ekolib/index.php?nr=" +
          this.userClass
      )
        .then(response => response.json())
        .then(response => {
          this.onlinePlanJson = response;
          localStorage.setItem("OnlinePlanJson", JSON.stringify(response));
          this.forceReRender = !this.forceReRender;
        })
        .catch(e => console.log(e));
    }
  },
  created() {
    let userGrp = localStorage.getItem("GrpStorage");
    if (userGrp != null && parseInt(userGrp) != NaN)
      this.userGrp = parseInt(userGrp);

    let userClass = localStorage.getItem("klasa");
    if (userClass != null && parseInt(userClass) != NaN)
      this.userClass = parseInt(userClass);

    let userClassLabel = localStorage.getItem("klasa-label");
    if (userClassLabel != null) this.userClassLabel = userClassLabel;

    let userPlan = localStorage.getItem("OnlinePlanJson");
    if (userPlan != null) this.onlinePlanJson = JSON.parse(userPlan);

    this.downloadPlan();
  }
};
</script>

<style>
</style>
