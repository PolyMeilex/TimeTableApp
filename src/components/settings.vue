<template>
  <div>

    <div>

      <q-card  color="dark">
        <q-card-title  class="center">
          Ustawienia
        </q-card-title>

        <q-card-main>
          Klasa:
         <q-select
            v-model="select"
            float-label="Jaka jest twoja kalasa?"
            radio
            dark
            :options="selectOptions"
          />

        </q-card-main>

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
      QSelect
    } from 'quasar'

    export default {
      name: 'index',
      components: {
        QCard,
        QCardTitle,
        QCardMain,
        QTransition,
        QSelect
      },
      data(){
        return {
           selectOptions: [             
                {"value":1, "label":"1at"},
                {"value":2, "label":"1bt"},
                {"value":3, "label":"1ct"},
                {"value":4, "label":"1dt"},
                {"value":5, "label":"1et"},
                {"value":6, "label":"1ft"},
                {"value":7, "label":"1gt"},
                {"value":8, "label":"1ht"},
                {"value":9, "label":"2at"},
                {"value":10, "label":"2bt"},
                {"value":11, "label":"2ct"},
                {"value":12, "label":"2dt"},
                {"value":13, "label":"2et"},
                {"value":14, "label":"2ft"},
                {"value":15, "label":"2gt"},
                {"value":16, "label":"2ht"},
                {"value":17, "label":"3at"},
                {"value":18, "label":"3bt"},
                {"value":19, "label":"3ct"},
                {"value":20, "label":"3dt"},
                {"value":21, "label":"3et"},
                {"value":22, "label":"3ft"},
                {"value":23, "label":"4at"},
                {"value":24, "label":"4bt"},
                {"value":25, "label":"4ct"},
                {"value":26, "label":"4dt"},
                {"value":27, "label":"4et"},
                {"value":28, "label":"4ft"},
                {"value":29, "label":"4gt"}              
            ],
        }
      },
      beforeCreate () {
        // this.$emit('isGrpNe', 0)
      },
      created () {

      }

    }
</script>
