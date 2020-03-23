import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";

import settings from "./settings/settings";
import plan from "./plan/plan";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    settings,
    plan
  },

  strict: process.env.DEV ? true : false
});
export default store;
export const settingsMod = getModule(settings, store);
export const planMod = getModule(plan, store);
