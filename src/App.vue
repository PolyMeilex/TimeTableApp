<template>
<div id="q-app">
  <q-layout ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}">
    <q-toolbar slot="header" color="dark">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Plan Lekcji
        <div slot="subtitle">v3.5</div>
      </q-toolbar-title>

      <q-transition appear enter="fadeIn" leave="fadeOut">

        <q-btn flat @click="SetColour(1)" :color="BtnColour1" v-if="isGrpNe==1">
          <q-icon name="bookmark" />1
        </q-btn>

      </q-transition>

      <q-transition appear enter="fadeIn" leave="fadeOut">

        <q-btn flat @click="SetColour(2)" :color="BtnColour2" v-if="isGrpNe==1">
          <q-icon name="bookmark" />2
        </q-btn>

      </q-transition>




    </q-toolbar>

    <div id="ProgresBar"></div>

    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>Menu</q-list-header>

        <q-side-link item to="/">
          <q-item-side icon="schedule" />
          <q-item-main label="Bieżące Lekcje" sublabel="Aktualna i przyszła lekcja" />
        </q-side-link>

        <q-side-link item to="/mainA1">
          <q-item-side icon="list" />
          <q-item-main label="Pełen Plan" sublabel="Wyświetla Plan Całego Dnia" />
        </q-side-link>

        <q-side-link item to="/info">
          <q-item-side icon="chat" />
          <q-item-main label="Informacje" sublabel="Krótki Opis Projektu" />
        </q-side-link>

        <q-side-link item to="/zasts">
          <q-item-side icon="warning" />
          <q-item-main label="Experimental" sublabel="Zastępstwa" />
        </q-side-link>

      </q-list>
    </div>

    <q-transition appear name="test" mode="out-in">
      <router-view
        :GrpDis="grp"
        :ZastArray="ZastArray"
        :SortedByDayArray="SortedByDayArray"
        :MDzwonki="dzwonkiLek"
        :PlanRequirer="PlanRequirer"
        :OnlinePlanJson="OnlinePlanJson"
      />
    </q-transition>

  </q-layout>
</div>
</template>

<style>

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.test-enter-active,
.test-leave-active {
  transition: opacity .5s
}

.test-enter,
.test-leave-to
  {
  opacity: 0
}
</style>

<script>
import {
  QSideLink,
  QLayout, // +
  QToolbar, // +
  QToolbarTitle, // +
  QBtn, // +
  QIcon, // +
  QList, // +
  QListHeader, // +
  QItem, // +
  QItemSide, // +
  QItemMain, // +
  // Alert, // -
  // QInput, //-
  QTransition, // +
  Toast // +
  // Events
} from 'quasar'

import Hello from './components/Hello.vue'
import mainA1 from './components/mainA1.vue'
import infoC from './components/info.vue'
// import chat from './components/chat.vue'
import zasts from './components/zasts.vue'

export default {
  name: 'index',
  components: {
    QSideLink,
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
    QTransition,
    Toast
  },
  data() {
    return {
      grp: 1,
      isGrpNe: 1,
      BtnColour1: 'primary',
      BtnColour2: '',
      ZastArray:null,
      SortedByDayArray:[],
      localZast: false,
      dzwonkiLek: require('./Plany/dzwonki.js'),
      OnlinePlanJson:null,
      PlanRequirer: [
        {
          'Se': [{s: [8, 0], e: [14, 20]}, {s: [8, 0], e: [15, 15]}],
          'Plan':[require('./Plany/1_1.json'),require('./Plany/1_2.json')]
        },
        {
          'Se':[{s: [8, 55], e: [14, 20]}, {s: [8, 55], e: [14, 20]}],
          'Plan':[require('./Plany/2_1.json'),require('./Plany/2_2.json')]
        },
        {
          'Se':[{s: [8, 0], e: [14, 20]}, {s: [8, 0], e: [14, 20]}],
          'Plan':[require('./Plany/3_1.json'),require('./Plany/3_2.json')]
        },
        {
          'Se':[{s: [8, 0], e: [15, 15]}, {s: [8, 0], e: [14, 20]}],
          'Plan':[require('./Plany/4_1.json'),require('./Plany/4_2.json')]
        },
        {
          'Se':[{s: [8, 0], e: [14, 20]}, {s: [8, 0], e: [14, 20]}],
          'Plan':[require('./Plany/5_1.json'),require('./Plany/5_2.json')]
        }
      ]
    }
  },
  watch:{
    ZastArray: function() {
      this.ZastArray.forEach(function(elem) {
        function compare(a, b) {
          if (a.NrLekcji < b.NrLekcji)
            return -1;
          if (a.NrLekcji > b.NrLekcji)
            return 1;
          return 0;
        }
        return elem.zast.sort(compare);
      });

      this.ZastArray.forEach((elem) => {
        let Splited = elem.dateTitle.replace( /^\D+/g, '');

        if (Splited!='') {
          let dateExtract = Splited.split('.');

          if (dateExtract!=null) {
            let year = 2018;
            let month = dateExtract[1] - 1;
            let day = dateExtract[0];
            let DayTester = new Date(year,month,day);
            let Day = DayTester.getDay();

            let obj = {'e':elem,'d':Day}
            this.SortedByDayArray.push(obj)
          }
        }
      })
      if (this.ZastArray != null) {
        if (this.ZastArray[0].dateTitle != "Brak Zastępstw" & this.localZast==false) {
          Toast.create({
            html: "Wykryto Nowe Zastępstwa",
            icon: 'list',
            timeout: 10000,
            color: '#fff',
            bgColor: '#333',
            button: {
              label: 'Otwórz',
              handler:() => {
                this.$router.push("/zasts")
              }
            }
          })
        }
      }

    }
  },
  methods: {
    SetColour(grp) {
      this.grp = grp
      if (grp == 1) {
        this.BtnColour1 = 'primary'
        this.BtnColour2 = ''
      } else if (grp == 2) {
        this.BtnColour2 = 'primary'
        this.BtnColour1 = ''
      }
      localStorage.setItem('grpStorage', grp)
    }
  },
  created() {
    var grp = localStorage.getItem('grpStorage')
    if (grp == 'null') {
      this.SetColour(1)
    } else if (grp != null) {
      this.SetColour(grp)
    }

    this.ZastArray = JSON.parse(localStorage.getItem('LocalZasts'));
    this.localZast = true;

    let LocalPlan = localStorage.getItem('OnlinePlanJson');
    if (LocalPlan!=null) {
      this.OnlinePlanJson = JSON.parse(LocalPlan);
    }


    try {
      // fetch('http://127.0.0.1:8080')
      fetch('https://ekonomik-api-ekonomik-api.7e14.starter-us-west-2.openshiftapps.com/')
      .then(response  => response.json())
      .then(response => {
        this.ZastArray = response
        localStorage.setItem('LocalZasts', JSON.stringify(response))
        this.localZast = false
      })
    } catch (e) {

    }

    try {
      // fetch('http://127.0.0.1:8080')
      fetch('https://ekonomik-api-ekonomik-api.7e14.starter-us-west-2.openshiftapps.com/plan')
      .then(response  => response.json())
      .then(response => {
        this.OnlinePlanJson = response;
        localStorage.setItem('OnlinePlanJson', JSON.stringify(response))
        // this.localZast = false
      })
    } catch (e) {}


  }
}
</script>

<style>
#ProgresBar {
  display: block;
  width: 0%;
  max-width: 100%;
  height: 2px;
  background-color: #027be3;
  transition: width 2s;
  position: fixed;
  top: 50px;
  z-index: 999;
}
</style>
