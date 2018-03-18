<template>
  <div>

    <div>

      <q-card  color="dark">
        <q-card-title  class="center">
          Aplikacja Oparta Jest Na:
        </q-card-title>

        <q-list>
          <q-item>
            <q-item-main label="VueJs" sublabel="FrameWork Do JS (Znacznie uławia tworzenie SinglePageApp)" />
          </q-item>

          <q-item>
            <q-item-main label="Ekonomik Api" sublabel="Server node.js parsujący plany lekcji oraz zastępstwa ze strony szkoły" />
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
        <q-card-title class="center">
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

  </div>

</template>

<script>
    import {
      QCard, // +
      QCardTitle, // +
      QCardMain, // +
      QTransition, // +
      QList, // +
      QListHeader, // +
      QItem, // +
      QItemMain // +
    } from 'quasar'

    export default {
      name: 'index',
      components: {
        QCard,
        QCardTitle,
        QCardMain,
        QTransition,
        QList,
        QListHeader,
        QItem,
        QItemMain
      },
      beforeCreate () {
        // this.$emit('isGrpNe', 0)
      },
      created () {

      }

    }
</script>
