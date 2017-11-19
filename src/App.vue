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
          <div slot="subtitle">v3.0.5</div>
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

        <component :GrpDis="grp" :is="page" :UserD="UserD" @LogInMain="LogInMain"></component>




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
      UserD:null,
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
    },

    AlertLogin(){

      Alert.create({
        enter: 'zoomInDown',
        leave: 'zoomOut',
        color: 'positive',
        icon: 'wifi',
        html: `Zalogowano:`+ this.UserD.displayName,
        position: 'bottom',
        actions: [
          {
            label: 'Zamknij',
            handler() {}
          }
        ]
      })


    },

    LogInMain(){

      var provider = new firebase.auth.FacebookAuthProvider();

      provider.addScope('public_profile');

      firebase.auth().signInWithPopup(provider).then(function(result) {}).catch(function(error) {console.log(error);});

    }

  },
  beforeCreate() {

    firebase.auth().onAuthStateChanged(firebaseUser => {

      this.UserD = firebaseUser

      this.AlertLogin()
    });



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
