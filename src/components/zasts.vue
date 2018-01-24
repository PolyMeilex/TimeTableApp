<template>
<div>
  <!-- <q-transition appear name="test" mode="out-in"> -->

    <div :key="trans">

      <div v-for="info in ZastArray">
        <q-card color="primary">
          <q-card-title>
            {{info.dateTitle}}
          </q-card-title>
        </q-card>

        <q-card color="dark" v-for="zas in info.zast" :key="zas.NrLekcji">

          <q-card-title>
            {{zas.Opis}}
            <div slot="right" class="row items-center">nr.{{zas.NrLekcji}}</div>
          </q-card-title>
          <!-- <q-card-separator /> -->

          <q-card-main>
            Grp: <b>{{zas.Klasa}}</b>
            <p class="text-faded">Sala: {{zas.Sala}}</p>
            <p class="text-faded">Nauczyciel: {{zas.Nauczyciel}}</p>
          </q-card-main>

        </q-card>

      </div>



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
