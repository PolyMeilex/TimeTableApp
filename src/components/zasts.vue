<template>
<div>
  <!-- <q-transition appear name="test" mode="out-in"> -->

    <div :key="trans">

      <q-card color="dark" v-for="zas in ZastArray" :key="zas.NrLekcji">

        <q-card-title>
          {{zas.Opis}}
          <div slot="right" class="row items-center">{{zas.NrLekcji}}</div>
        </q-card-title>
        <!-- <q-card-separator /> -->

        <q-card-main>
          <b>{{zas.Klasa}}</b>
          <p class="text-faded">{{zas.Sala}}</p>
        </q-card-main>

      </q-card>

    </div>

  <!-- </q-transition> -->

</div>
</template>

<script>
    import {
      QCard, // +
      QCardTitle, // +
      QCardMain, // +
      // QCardMedia, //-
      // QCardSeparator, //+
      QTransition
    } from 'quasar'

    export default {
      name: 'index',
      props: ['ZastArray'],
      components: {
        QCard,
        QCardTitle,
        QCardMain,
        //  QCardMedia,
        //  QCardSeparator,
        QTransition
      },
      data () {
        return {
          trans: false
        }
      },
      watch: {
        ZastArray: function() {
          this.trans = !this.trans;
        }
      },
      methods: {

      },
      created () {

      },
      beforeCreate () {

      },
      destroyed () {

      }
    }
</script>
