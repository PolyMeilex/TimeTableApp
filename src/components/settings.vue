<template>
  <div>

    <q-card color="dark" class="darkbg-text">

      <q-list>
        <q-item>
          <q-field dark icon="person" label="Jestem:" helper="Opcje nauczyciel i sala lekcyjna są aktualnie niedostępne">
            <q-option-group type="radio" v-model="mode" :options="[
            { label: 'Uczniem', value: 'o'},
            { label: 'Nauczycielem', value: 'n',disable:true  },
            { label: 'Salą Lekcyjną', value: 's',disable:true  }
          ]" />
          </q-field>
        </q-item>

        <q-item>
          <q-field dark icon="list" label="Mój Plan To:" helper="Wybierz swoją klasę">
            <q-select dark v-model="plan" radio :options="oList" />
          </q-field>
        </q-item>

        <q-item style="center">
          <q-btn color="primary" style="margin-left: auto;" @click="save">
            Save
          </q-btn>
        </q-item>

      </q-list>

    </q-card>

  </div>
</template>

<script>
import {
  Alert,
  QCard,
  QRadio,
  QList,
  QItem,
  QOptionGroup,
  QField,
  QSelect,
  QBtn
} from "quasar";

export default {
  name: "index",
  components: {
    QCard,
    QRadio,
    QList,
    QItem,
    QOptionGroup,
    QField,
    QSelect,
    QBtn
  },
  data() {
    return {
      mode: "o",
      oList: [
        { label: "1at", value: 1 },
        { label: "1bt", value: 2 },
        { label: "1ct", value: 3 },
        { label: "1dt", value: 4 },
        { label: "1et", value: 5 },
        { label: "1ft", value: 6 },
        { label: "1gt", value: 7 },
        { label: "1ht", value: 8 },
        { label: "2at", value: 9 },
        { label: "2bt", value: 10 },
        { label: "2ct", value: 11 },
        { label: "2dt", value: 12 },
        { label: "2et", value: 13 },
        { label: "2ft", value: 14 },
        { label: "2gt", value: 15 },
        { label: "2ht", value: 16 },
        { label: "3at", value: 17 },
        { label: "3bt", value: 18 },
        { label: "3ct", value: 19 },
        { label: "3dt", value: 20 },
        { label: "3et", value: 21 },
        { label: "3ft", value: 22 },
        { label: "4at", value: 23 },
        { label: "4bt", value: 24 },
        { label: "4ct", value: 25 },
        { label: "4dt", value: 26 },
        { label: "4et", value: 27 },
        { label: "4ft", value: 28 },
        { label: "4gt", value: 29 }
      ],
      plan: 10
    };
  },
  methods: {
    save() {
      localStorage.setItem(
        "settings",
        JSON.stringify({ id: this.plan, name: this.oList[this.plan - 1].label })
      );
      let a2 = Alert.create({
        color: "positive",
        position: "bottom-right",
        enter: "fadeIn",
        leave: "fadeOut",
        html: `Saved`
      });

      setTimeout(function() {
        a2.dismiss();
      }, 2000);
    }
  },
  beforeCreate() {},
  created() {

    

  }
};
</script>

<style>
.darkbg-text {
  color: #fff;
}
</style>

