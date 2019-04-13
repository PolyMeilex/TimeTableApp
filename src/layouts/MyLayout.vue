<template>
  <q-layout view="lHh Lpr lFf" style="background-color: rgb(23, 23, 23);">
    <q-header elevated>
      <q-toolbar class="bg-dark">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>

        <div class="toolbar-title">
          Plan Lekcji {{userClassLabel}}
          <div class="toolbar-subtitle">
            <div>v4.0.1</div>
          </div>
        </div>

        <q-btn
          flat
          round
          @click="$emit('setGrp',1)"
          :color="userGrp==1?'primary':'white'"
          icon="bookmark"
        >1</q-btn>
        <q-btn
          flat
          round
          @click="$emit('setGrp',2)"
          :color="userGrp==2?'primary':'white'"
          icon="bookmark"
        >2</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Menu</q-item-label>

        <q-item clickable @click="$router.push('/')">
          <q-item-section avatar>
            <q-icon name="schedule"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Bieżące Lekcje</q-item-label>
            <q-item-label caption>Aktualna i przyszła lekcja</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="$router.push('/FullTable')">
          <q-item-section avatar>
            <q-icon name="list"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Pełen Plan</q-item-label>
            <q-item-label caption>Wyświetla Plan Całego Tygodnia</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="$router.push('/Settings')">
          <q-item-section avatar>
            <q-icon name="settings"/>
          </q-item-section>
          
          <q-item-section>
            <q-item-label>Ustawienia</q-item-label>
            <q-item-label caption>Ustawienia użytkownika</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition name="trans-left" mode="out-in">
        <router-view :key="trans" :plan="plan" :userGrp="userGrp" @TriggerTrans="TriggerTrans" @downloadPlan="$emit('downloadPlan')"/>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",
  props: ["userGrp","userClassLabel","plan","forceReRender"],
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      trans: false
    };
  },
  watch:{
    forceReRender(){
      this.TriggerTrans();
    }
  },
  methods: {
    TriggerTrans(){
      this.trans = !this.trans;
    }
  }
};
</script>

<style>
.toolbar-title{
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
.toolbar-subtitle{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  font-size: 12px;
  opacity: .7;
}
</style>
