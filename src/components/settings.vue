<template>
  <div>

    <div>

      <q-card  color="dark">
        <q-card-title  class="center">
          Ustawienia
        </q-card-title>

        <q-card-main>
          Aktualne ustawienia to: <b>Uczeń: {{ myClassLabel }}</b>
          <br/>
          <p class="caption">Jetem:</p>
          <q-radio v-model="typeSelect" val="nr" label="Uczeniem" />
          <q-radio val="1" label="Nauczycielem" disabled/>
          <q-radio val="2" label="Salą" disabled />

          

          <q-select
            v-model="select"
            float-label="Moja klasa to:"
            radio
            dark
            :options="selectOptions"
          />

          
          <q-btn dark color="primary" @click="save"> Zapisz </q-btn>

      

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
      QSelect,
      QBtn,
      QRadio
    } from 'quasar'

    export default {
      name: 'index',
      components: {
        QCard,
        QCardTitle,
        QCardMain,
        QTransition,
        QSelect,
        QBtn,
        QRadio
      },
      data(){
        return {
           select:1,
           myClassLabel:"2bt",
           typeSelect: "nr",
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
      methods:{
        save(){
          localStorage.setItem('klasa', this.select);
          localStorage.setItem('klasa-label', this.selectOptions[this.select-1].label);
          location.reload();
        }
      },
      beforeCreate () {
        // this.$emit('isGrpNe', 0)
      },
      created () {
        let n = localStorage.getItem('klasa');
        if(n==null){
          n=10;
        }

        this.myClassLabel = this.selectOptions[n-1].label;
        this.select = parseInt(n);
      }

    }
</script>
