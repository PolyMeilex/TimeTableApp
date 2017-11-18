<template>
  <div>
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

      <q-card  color="dark" v-if="DispName!=null">
        <!-- Notice the slot="overlay" -->
        <q-card-title slot="overlay" class="center">
          {{DispName}}
        </q-card-title>


      </q-card>


      <q-card  color="dark" v-if="DispName!=null">

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
            name="Ryszard"
            avatar="../statics/icons/android-icon-36x36.png"
            :text="['No kurwa witam']"
            stamp="4 minutes ago"
          />

        </QCardMain>

      </q-card>






    </div>

</q-transition>

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
        QChatMessage
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
            QChatMessage
        },
        data() {
            return {
                show: true,
                DispName: this.FName.displayName,
                photoURL: this.FName.photoURL
            }
        },
        watch: {
          FName: function () {
            this.photoURL = this.FName.photoURL;
            this.DispName = this.FName.displayName;
          }
        },
        methods: {
          login(){
              firebase.auth().signInWithRedirect(provider);
          }
        },
        created() {

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
