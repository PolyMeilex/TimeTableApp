<template>
  <q-layout view="lHh Lpr lFf" style="background-color: rgb(23, 23, 23);">
    <q-header elevated>
      <q-toolbar class="bg-dark">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <div class="toolbar-title">
          Plan Lekcji {{ userClassLabel }}
          <div class="toolbar-subtitle">
            <div>v{{ version }}</div>
          </div>
        </div>

        <q-btn
          flat
          round
          @click="$emit('setGrp', 1)"
          :color="userGrp == 1 ? 'primary' : 'white'"
          icon="bookmark"
          >1</q-btn
        >
        <q-btn
          flat
          round
          @click="$emit('setGrp', 2)"
          :color="userGrp == 2 ? 'primary' : 'white'"
          icon="bookmark"
          >2</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <drawer-list></drawer-list>
    </q-drawer>

    <q-drawer side="right" bordered content-class="bg-grey-2">
      <drawer-list></drawer-list>
    </q-drawer>

    <q-page-container>
      <transition name="trans-left" mode="out-in">
        <router-view
          :key="trans"
          :plan="plan"
          :userGrp="userGrp"
          :userClassLabel="userClassLabel"
          @TriggerTrans="TriggerTrans"
          @downloadPlan="$emit('downloadPlan')"
        />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" lang="ts">
import Vue from "vue";

import { version } from "../../package.json";
import DrawerList from "../components/DrawerList.vue";

export default Vue.extend({
  name: "MyLayout",
  props: ["userGrp", "userClassLabel", "plan", "forceReRender"],
  components: { DrawerList },
  data() {
    return {
      version: version,
      leftDrawerOpen: false,
      trans: false
    };
  },
  watch: {
    forceReRender() {
      this.TriggerTrans();
    }
  },
  methods: {
    TriggerTrans() {
      this.trans = !this.trans;
    }
  },
  created() {
    // if (this.$q.platform.is.desktop) {
    // this.leftDrawerOpen = true;
    // }
  }
});
</script>

<style>
.toolbar-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-width: 1px;
  max-width: 100%;
  font-size: 18px;
  font-weight: 500;
  padding: 0 12px;
}
.toolbar-subtitle {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  font-size: 12px;
  opacity: 0.7;
}
</style>
