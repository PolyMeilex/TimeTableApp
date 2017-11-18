<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout
      ref="layout"
      view="lHh Lpr fff"
      :left-class="{'bg-grey-2': true}"
    >
      <q-toolbar slot="header" color="dark">
        <q-btn
          flat
          @click="$refs.layout.toggleLeft()"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Plan Lekcji
          <div slot="subtitle">v3.0.2</div>
        </q-toolbar-title>

        <q-btn flat @click="SetColour(1)" :color="BtnColour1">
          <q-icon name="bookmark" />1
        </q-btn>
        <q-btn flat @click="SetColour(2)" :color="BtnColour2">
          <q-icon name="bookmark" />2
        </q-btn>
      </q-toolbar>

      <div slot="left">
        <q-list no-border link inset-separator>
          <q-list-header>Menu</q-list-header>

          <q-item @click="testFc($refs.layout,1)">
            <q-item-side icon="schedule" />
            <q-item-main label="Bieżące Lekcje" sublabel="Aktualna i przyszła lekcja" />
          </q-item>

          <q-item @click="testFc($refs.layout,2)">
            <q-item-side icon="list" />
            <q-item-main label="Pełen Plan" sublabel="Wyświetla Plan Całego Dnia" />
          </q-item>

          <q-item @click="testFc($refs.layout,3)">
            <q-item-side icon="chat" />
            <q-item-main label="Informacje" sublabel="Krótki Opis Projektu" />
          </q-item>

        </q-list>
      </div>



        <!-- <router-view :GrpDis="grp"/> -->

        <component :GrpDis="grp" :is="page"></component>

    </q-layout>
  </div>

</template>

<script>
import {
  openURL,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'

import Hello from "./components/Hello.vue"
import mainA1 from "./components/mainA1.vue"
import infoC from "./components/info.vue"

export default {
  name: 'index',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    Hello,
    mainA1,
    infoC
  },
  data () {
    return {
      grp: 1,
      page: Hello,
      BtnColour1: "primary",
      BtnColour2: ""
    }
  },
  computed: {

  },
  methods: {
    SetColour(grp){
      this.grp=grp
      if (grp==1) {
        this.BtnColour1 = "primary"
        this.BtnColour2 = ""
      }
      else if (grp==2){
        this.BtnColour2 = "primary"
        this.BtnColour1 = ""
      }
    },
    testFc(l,p){

      switch (p) {
        case 1:
          this.page = Hello
          break;
        case 2:
          this.page = mainA1
          break;
        case 3:
          this.page = infoC
          break;
      }


     l.toggleLeft()
    },
    launch (url) {
      openURL(url)
    }
  },
  mounted () {

  },
  beforeDestroy () {

  }
}
</script>

<style lang="stylus">
.logo-container
  width 255px
  height 242px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
</style>
