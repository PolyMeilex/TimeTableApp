<template>
  <div>

    <q-layout>

    <q-transition
 appear
 enter="zoomInDown"
 leave="zoomOut"
>

    <div v-show="show">
      <!-- <q-card  color="dark">
        <q-card-media>
          <img src="~assets/1.png" style="padding:50px">

          <q-card-title slot="overlay" class="center">
            ChatRoom
          </q-card-title>
        </q-card-media>
      </q-card> -->

      <q-card  color="dark" v-if="DispName==null">
        <!-- Notice the slot="overlay" -->
        <q-card-title slot="overlay" class="center">
          <q-btn color="primary" @click="login">LogIn</q-btn>
        </q-card-title>


      </q-card>

      <!-- <q-card  color="dark" v-if="DispName!=null">
        <q-card-title slot="overlay" class="center">
          {{DispName}}
        </q-card-title>
      </q-card> -->


      <q-card  color="dark" v-if="DispName!=null" id="ScroleFromDown">
        <QCardMain>

          <q-chat-message
            label='Sobota, 18th'
          />
          <q-chat-message
            name="me"
            :avatar="photoURL"
            :text="['Elo Elo']"
            stamp="7 minutes ago"
            sent
          />
          <q-chat-message
            :name="message.Name"
            avatar="../statics/icons/android-icon-36x36.png"
            :text="[message.Mes]"
            stamp="4 minutes ago"
            v-for="message in RefF"
          />
        </QCardMain>

      </q-card>






    </div>

</q-transition>

<q-toolbar slot="footer" color="dark" v-if="DispName!=null">
 <q-toolbar-title>
   <q-input v-model="SendMes" inverted float-label="Message" :after="[{icon: 'arrow_forward', content: true,
     handler () {

       sendMSG('a','b','c')

     }
     }]" />
 </q-toolbar-title>
</q-toolbar>

</q-layout>

  </div>

</template>

<script>
    import {
        QCard,
        QCardTitle,
        QCardMain,
        QCardMedia,
        QCardActions,
        QCardSeparator,
        QTransition,
        QList,
        QListHeader,
        QItem,
        QItemMain,
        QBtn,
        QChatMessage,
        QLayout,
        QToolbar,
        QToolbarTitle,
        QIcon,
        QInput
    } from 'quasar'

    import firebase from 'firebase'

    const config = {
        apiKey: "AIzaSyDW7Q8FN84LBIK4pqFLPKfK69gR4O8mde8",
        authDomain: "planapp-f8adb.firebaseapp.com",
        databaseURL: "https://planapp-f8adb.firebaseio.com",
        projectId: "planapp-f8adb",
        storageBucket: "planapp-f8adb.appspot.com",
        messagingSenderId: "74132727513"
      };

      const app = firebase.initializeApp(config);
      const db = app.database();

      const Ref = db.ref('Messages');




      var provider = new firebase.auth.FacebookAuthProvider();

      provider.addScope('public_profile');




    export default {
        name: 'index',
        props:['FName'],
        components: {
            QCard,
            QCardTitle,
            QCardMain,
            QCardMedia,
            QCardActions,
            QCardSeparator,
            QTransition,
            QList,
            QListHeader,
            QItem,
            QItemMain,
            QBtn,
            QChatMessage,
            QToolbar,
            QToolbarTitle,
            QIcon,
            QInput,
            QLayout
        },
        data() {
            return {
                show: true,
                DispName: this.FName.displayName,
                photoURL: this.FName.photoURL,
                RefD: "",
                SendMes:""
            }
        },
        watch: {
          FName: function () {
            this.photoURL = this.FName.photoURL;
            this.DispName = this.FName.displayName;
          },
          RefD: function () {
            document.body.scrollTop = document.body.scrollHeight
          }
        },
        methods: {
          login(){
              firebase.auth().signInWithRedirect(provider);
          },
          sendMSG(name,mes,img){
            var startNew = {"Name":name,"Mes":mes,"img":img};
            Ref.push(startNew);
          }
        },
        firebase:{
          RefF: Ref,
          RefD: Ref
        },
        created() {
          document.body.scrollTop = document.body.scrollHeight
        },
        mounted(){
          document.body.scrollTop = document.body.scrollHeight
        }

    }
</script>

<style>

</style>
