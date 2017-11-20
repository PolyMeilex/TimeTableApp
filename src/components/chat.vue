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
          <!-- <q-chat-message
            name="me"
            :avatar="photoURL"
            :text="['Elo Elo']"
            stamp="7 minutes ago"
            sent
          /> -->
          <q-chat-message
            :name="message.Name"
            :avatar="message.img"
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

       sendMSG(DispName,SendMes,photoURL)
       scrol()
       SendMes = ''
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
                DispName: null,
                photoURL: null,
                RefD: "",
                SendMes:"",
                UserD: null
            }
        },
        watch: {
          UserD: function () {
            this.photoURL = this.UserD.photoURL;
            this.DispName = this.UserD.displayName;
          },
          RefD: function () {
            this.scrol()
          }
        },
        methods: {
          login(){
            //  firebase.auth().signInWithRedirect(provider);


            firebase.auth().signInWithPopup(provider).then(function(result) {
                console.log("start");

                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;


                this.UserD = user;
                console.log("end");
                // this.FName = result.user;

                // this.photoURL = this.FName.photoURL;
                // this.DispName = this.FName.displayName;



              }.bind(this)).catch(function(error) {
                console.log(error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });

          },
          sendMSG(name,mes,img){
            var startNew = {"Name":name,"Mes":mes,"img":img};
            Ref.push(startNew);
          },
          scrol(){
            document.body.scrollTop = document.body.scrollHeight
          }
        },
        firebase:{
          RefF: Ref,
          RefD: Ref
        },
        created() {
          this.scrol()
        },
        mounted(){
        }

    }
</script>

<style>

</style>
