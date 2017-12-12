<template>
  <div>
    <q-transition
 appear
 enter="zoomInDown"
 leave="zoomOut"
>

    <div v-show="show">
      <q-card  color="dark">
        <q-card-media>
          <img src="~assets/1.png" style="padding:50px">
          <!-- Notice the slot="overlay" -->
          <q-card-title slot="overlay" class="center">
            Krótki Opis Aplikacji
          </q-card-title>
        </q-card-media>
      </q-card>

      <q-card  color="dark">
        <!-- Notice the slot="overlay" -->
        <q-card-title slot="overlay" class="center">
          Aplikacja Oparta Jest Na:
        </q-card-title>

        <q-list>
          <q-item>
            <q-item-main label="VueJs" sublabel="FrameWork Do JS (Znacznie uławia tworzenie SinglePageApp)" />
          </q-item>

          <q-item>
            <q-item-main label="FireBase" sublabel="Baza Danych Przechowująca Plany Lekcji" />
          </q-item>

          <q-item>
            <q-item-main label="Webpack (Babel)" sublabel="Kompilacja z Js ES6 do Js ES5" />
          </q-item>

          <q-item>
            <q-item-main label="PWA" sublabel="Uruchamianie Aplikacji W Trybie Standalone" />
          </q-item>

          <q-item>
            <q-item-main label="PWA-ServiceWorker" sublabel="Zapisywanie Strony I Planów Do Pamięci Urządzenia (Tryb Offline)" />
          </q-item>

        </q-list>

      </q-card>


      <q-card  color="dark">
        <!-- Notice the slot="overlay" -->
        <q-card-title slot="overlay" class="center">
          Narzędzia:
        </q-card-title>

        <q-list>
          <q-item>
            <q-item-main label="Atom" sublabel="Edytor Tekstu By GitHub" />
          </q-item>

          <q-item>
            <q-item-main label="NPM" sublabel="Zarządzanie Paczkami Js" />
          </q-item>

          <q-item>
            <q-item-main label="Eslintrc" sublabel="Dokładna Analiza Kodu" />
          </q-item>

        </q-list>

      </q-card>

    </div>

</q-transition>

  </div>

</template>

<script>
    import {
      QCard, // +
      QCardTitle, // +
      QCardMain, // +
      QCardMedia, // +
      // QCardActions, //-
      // QCardSeparator, //-
      QTransition, // +
      QList, // +
      QListHeader, // +
      QItem, // +
      QItemMain // +
    } from 'quasar'

    export default {
      name: 'index',
      props: ['GrpDis'],
      components: {
        QCard,
        QCardTitle,
        QCardMain,
        QCardMedia,
        // QCardActions,
        // QCardSeparator,
        QTransition,
        QList,
        QListHeader,
        QItem,
        QItemMain
      },
      data () {
        return {
          show: true
        }
      },
      methods: {

      },
      beforeCreate () {
        this.$emit('isGrpNe', 0)
      },
      created () {

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
