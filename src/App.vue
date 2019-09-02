<template>
  <div id="q-app" style="overflow-x: hidden;">
    <router-view
      :userGrp="userGrp"
      :userClassLabel="userClassLabel"
      :plan="onlinePlanJson"
      @setGrp="setGrp"
      @downloadPlan="downloadPlan"
      :forceReRender="forceReRender"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      onlinePlanJson: [],
      userGrp: 1,
      userClass: 24,
      userClassLabel: "3bt",
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
      if (userClass != null && !isNaN(parseInt(userClass)))
        this.userClass = parseInt(userClass);

      let userClassLabel = localStorage.getItem("klasa-label");
      if (userClassLabel != null) this.userClassLabel = userClassLabel;
      else localStorage.setItem("klasa-label", "3bt");

      this.$q.loadingBar.start();

      let optional = "";

      let userMode = localStorage.getItem("user-mode");

      if (userMode == "n") {
        optional = "&type=n";
      }

      fetch(
        "https://codenomik.ekonomikzamosc.pl/api/ekolib/index.php?nr=" +
          this.userClass +
          optional
      )
        .then(response => response.json())
        .then(response => {
          this.onlinePlanJson = response;
          localStorage.setItem("OnlinePlanJson", JSON.stringify(response));
          this.forceReRender = !this.forceReRender;
          this.$q.loadingBar.stop();
        })
        .catch(e => this.$q.loadingBar.stop());
    }
  },
  created() {
    let userGrp = localStorage.getItem("GrpStorage");
    if (userGrp != null && !isNaN(parseInt(userGrp)))
      this.userGrp = parseInt(userGrp);

    let userClass = localStorage.getItem("klasa");
    if (userClass != null && !isNaN(parseInt(userClass)))
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
