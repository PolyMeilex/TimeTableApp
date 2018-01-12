<template>
<!-- Don't drop "q-app" class -->
<div id="q-app">
  <q-layout ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}">
    <q-toolbar slot="header" color="dark">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Plan Lekcji
        <div slot="subtitle">v3.2.8</div>
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

        <!-- <q-item @click="testFc($refs.layout,4)">
            <q-item-side icon="warning" />
            <q-item-main label="Experimental" sublabel="Chat" />
          </q-item> -->

      </q-list>
    </div>



    <!-- <router-view :GrpDis="grp"/> -->

    <component :GrpDis="grp" :is="page" :UserD="UserD" @isGrpNe="isGrpNe=$event"></component>




  </q-layout>
</div>
</template>

<style>
.test-enter-active,
.test-leave-active {
  transition: opacity .5s
}

.test-enter,
.test-leave-to
/* .fade-leave-active below version 2.1.8 */

  {
  opacity: 0
}
</style>

<script>
import {
  //  openURL,
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
import chat from './components/chat.vue'

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
    infoC,
    chat,
    // Alert,
    // QInput,
    QTransition,
    Toast
  },
  data() {
    return {
      grp: 1,
      isGrpNe: 1,
      UserD: null,
      page: Hello,
      BtnColour1: 'primary',
      BtnColour2: '',
      SendMes: ''
    }
  },
  computed: {

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
    },
    testFc(l, p) {
      switch (p) {
        case 1:
          this.page = Hello
          break
        case 2:
          this.page = mainA1
          break
        case 3:
          this.page = infoC
          break
        case 4:
          this.page = chat
          break
      }

      l.toggleLeft()
    },
  },
  beforeCreate() {

  },
  created() {
    var grp = localStorage.getItem('grpStorage')
    if (grp == 'null') {
      this.SetColour(1)
    } else if (grp != null) {
      this.SetColour(grp)
    }


    try {
      var data = null;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {

          var JOBJ = JSON.parse(this.responseText);
          // var JOBJ = string;

          console.log(JOBJ);

          JOBJ.forEach(function(elem) {
            Toast.create({
              html: "<b>Nr:</b>" + elem.NrLekcji + " <b>Sal:</b>" + elem.Sala + "<b>Opis:</b>" + elem.Opis,
              icon: 'list',
              timeout: 10000,
              color: '#fff',
              bgColor: '#333',
              button: {
                label: 'Zamknij',
                handler() {
                  // Specify what to do when button is clicked/tapped
                }
              }
            })
          });


        }
      });

      xhr.open("GET", "https://ekonomik-api-ekonomik-api.7e14.starter-us-west-2.openshiftapps.com/");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader("postman-token", "9e5b7f5a-13d5-a3a1-e585-5fd7269128b9");

      xhr.send(data);
    } catch (e) {

    }

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
