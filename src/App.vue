<template>
<div id="q-app">
  <q-layout ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}">
    <q-toolbar slot="header" color="dark">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Plan Lekcji
        <div slot="subtitle">v3.6.1</div>
      </q-toolbar-title>


      <q-btn flat @click="SetColour(1)" :color="BtnColour1" v-if="isGrpNe==1">
        <q-icon name="bookmark" />1
      </q-btn>

      <q-btn flat @click="SetColour(2)" :color="BtnColour2" v-if="isGrpNe==1">
        <q-icon name="bookmark" />2
      </q-btn>





    </q-toolbar>

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

        <q-side-link item to="/Pack">
          <q-item-side icon="chrome reader mode" />
          <q-item-main label="Pack Books" sublabel="" />
        </q-side-link>

        <q-side-link item to="/zasts">
          <q-item-side icon="warning" />
          <q-item-main label="Experimental" sublabel="Zastępstwa" />
        </q-side-link>

      </q-list>
    </div>

    <transition appear name="test" mode="out-in">
      <router-view
        :key="trans"
        :GrpDis="grp"
        :ZastArray="ZastArray"
        :SortedByDayArray="SortedByDayArray"
        :MDzwonki="dzwonkiLek"
        :OnlinePlanJson="OnlinePlanJson"
        @grpTrigger="trans=!trans"
      />
    </transition>

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
    Toast
  },
  data() {
    return {
      grp: 1,
      trans:false,
      isGrpNe: 1,
      BtnColour1: 'primary',
      BtnColour2: '',
      ZastArray:null,
      SortedByDayArray:[],
      localZast: false,
      dzwonkiLek: require('./Plany/dzwonki.js'),
      OnlinePlanJson:null
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

    let app = require('./fInit.js').app;

    fetch('https://ekonomik-api.herokuapp.com')
    .then(response  => response.json())
    .then(response => {
      this.ZastArray = response
      localStorage.setItem('LocalZasts', JSON.stringify(response))
      this.localZast = false
    }).catch(e=>console.log(e))



    fetch('https://39wodm-user.freehosting.host/index.php?nr=2')
    .then(response  => response.json())
    .then(response => {
      this.OnlinePlanJson = response;
      localStorage.setItem('OnlinePlanJson', JSON.stringify(response))
      // this.localZast = false
    }).catch(e=>console.log(e))



  }
}
</script>

<style>

* {
  user-select: none;
}

</style>
