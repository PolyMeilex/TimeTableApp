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

          <q-item @click="testFc($refs.layout,4)">
            <q-item-side icon="warning" />
            <q-item-main label="Experimental" sublabel="Chat" />
          </q-item>

        </q-list>
      </div>



        <!-- <router-view :GrpDis="grp"/> -->

        <component :GrpDis="grp" :FName="FName" :is="page"></component>


        

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
  QItemMain,
  Alert,
  QInput
} from 'quasar'

import Hello from "./components/Hello.vue"
import mainA1 from "./components/mainA1.vue"
import infoC from "./components/info.vue"
import chat from "./components/chat.vue"

import firebase from 'firebase'

// var Firebase = require('firebase')
// console.log(Firebase);

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
    Alert,
    QInput
  },
  data () {
    return {
      grp: 1,
      FName:"-",
      page: Hello,
      BtnColour1: "primary",
      BtnColour2: "",
      SendMes:""
    }
  },
  computed: {

  },
  methods: {
    // onDoubleTap(){
    //   console.log("left");
    // },
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
        case 4:
            this.page = chat
          break;
      }


     l.toggleLeft()
    },
    launch (url) {
      openURL(url)
    }
  },
  beforeCreate() {
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.

        var user = result.user;
        if (user!=null) {
          this.FName = user;

          Alert.create({
            enter: 'zoomInDown',
            leave: 'zoomOut',
            color: 'positive',
            icon: 'wifi',
            html: `Zalogowano: `,
            position: 'bottom',
            actions: [
              {
                label: 'Zamknij',
                handler() {}
              }
            ]
          })

        }

      }.bind(this)).catch(function(error) {});
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
