<template>
  <div id="q-app" style="overflow-x: hidden;">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { settingsMod, planMod } from "@/store";

@Component
export default class App extends Vue {
  created() {
    settingsMod.initLocalStorage();
    planMod.initLocalStorage();
    planMod.downloadPlan({
      planId: settingsMod.planId,
      planType: settingsMod.planType
    });
  }
}
</script>

<style></style>
