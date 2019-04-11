<template>
  <q-page>
    <q-card class="bg-dark text-white lesson-card flex" style="margin: 8px;">

      <q-card-section>

        
        Aktualne ustawienia to: <b>Uczeń: {{ currentLabel }}</b>
        <br/>

        <br/>
        <span class="text-subtitle1">Jetem:</span>
        <br/>
        <q-radio dark v-model="typeSelect" val="nr" label="Uczeniem" style="margin-left:-10px;"/>
        <q-radio dark value="" val="1" label="Nauczycielem" disabled/>
        <q-radio dark value="" val="2" label="Salą" disabled />

        <q-select
          v-model="model"
          use-input
          input-debounce="0"
          label="Moja Klasa To:"
          :stack-label="true"
          :options="options"
          @filter="filterFn"
          style="width: 250px"
          hide-selected
          dark
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>

        <br/>
        <q-btn color="primary" @click="save"> Zapisz </q-btn>

      </q-card-section>


    </q-card>
  </q-page>
</template>


<script>
// const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

const stringOptions = [
  "1at",
  "1bt",
  "1ct",
  "1dt",
  "1et",
  "1ft",
  "1gt",
  "1ht",
  "2at",
  "2bt",
  "2ct",
  "2dt",
  "2et",
  "2ft",
  "2gt",
  "2ht",
  "3at",
  "3bt",
  "3ct",
  "3dt",
  "3et",
  "3ft",
  "4at",
  "4bt",
  "4ct",
  "4dt",
  "4et",
  "4ft",
  "4gt"
];

export default {
  name: "PageSettings",
  data() {
    return {
      model: null,
      options: stringOptions,
      typeSelect: 'nr',
      currentLabel: 'None'
    };
  },
  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    save(){
      localStorage.setItem('klasa', stringOptions.indexOf(this.model) + 1);
      localStorage.setItem('klasa-label', this.model);
      this.currentLabel = this.model;
      
      this.$emit("downloadPlan");

      this.$router.push("/");

      // setTimeout(() => {
      //   // location.reload();  
      // }, 1000);
      
    }
  },
  created(){
    let l = localStorage.getItem('klasa-label');
    if (l==null) l = "none";

    this.currentLabel = l;
  }
};
</script>

