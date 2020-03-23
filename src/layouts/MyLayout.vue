<template>
  <q-layout view="lHh Lpr lFf" style="background-color: rgb(23, 23, 23);">
    <q-header elevated>
      <q-toolbar class="bg-dark">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <div class="toolbar-title">
          Plan Lekcji {{ settingsMod.planLabel }}
          <div class="toolbar-subtitle">
            <div>v{{ version }}</div>
          </div>
        </div>

        <q-btn
          v-if="settingsMod.planType == 'o'"
          flat
          round
          @click="settingsMod.setGrp(0)"
          :color="settingsMod.grp == 0 ? 'primary' : 'white'"
          icon="bookmark"
        >1</q-btn>
        <q-btn
          v-if="settingsMod.planType == 'o'"
          flat
          round
          @click="settingsMod.setGrp(1)"
          :color="settingsMod.grp == 1 ? 'primary' : 'white'"
          icon="bookmark"
        >2</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <drawer-list @closeDrawer="leftDrawerOpen = !leftDrawerOpen"></drawer-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered content-class="bg-grey-2">
      <drawer-list @closeDrawer="rightDrawerOpen = !rightDrawerOpen"></drawer-list>
    </q-drawer>

    <q-page-container>
      <transition name="trans-left" mode="out-in">
        <router-view v-if="planMod.planJSON" :key="transKey" @triggerTrans="triggerTrans" />
        <q-spinner-puff v-else color="primary" size="100%" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import { version } from "@/../package.json";
import DrawerList from "@/components/DrawerList.vue";

import { settingsMod, planMod } from "@/store";

@Component({
  components: { DrawerList }
})
export default class MyLayout extends Vue {
  version = version;
  leftDrawerOpen = false;
  rightDrawerOpen = false;
  transKey = false;

  settingsMod = settingsMod;
  planMod = planMod;

  triggerTrans() {
    this.transKey = !this.transKey;
  }
}
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
