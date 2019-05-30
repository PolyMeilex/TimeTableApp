<template>
  <q-page>
    <q-card class="bg-dark text-white lesson-card flex" style="margin: 8px;">
      <q-card-section>
        Aktualne ustawienia to:
        <b>Uczeń: {{ currentLabel }}</b>
        <br>

        <br>
        <span class="text-subtitle1">Jetem:</span>
        <br>
        <q-radio dark v-model="typeSelect" val="o" label="Uczeniem" style="margin-left:-10px;"/>
        <q-radio dark v-model="typeSelect" val="n" label="Nauczycielem"/>
        <q-radio dark value val="2" label="Salą" disabled/>

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

        <br>
        <q-btn color="primary" @click="save">Zapisz</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>


<script>
const classOptions = [
  { id: 1, name: "1at" },
  { id: 2, name: "1bt" },
  { id: 3, name: "1ct" },
  { id: 4, name: "1dt" },
  { id: 5, name: "1et" },
  { id: 6, name: "1ft" },
  { id: 7, name: "1gt" },
  { id: 8, name: "1ht" },
  { id: 9, name: "2at" },
  { id: 10, name: "2bt" },
  { id: 11, name: "2ct" },
  { id: 12, name: "2dt" },
  { id: 13, name: "2et" },
  { id: 14, name: "2ft" },
  { id: 15, name: "2gt" },
  { id: 16, name: "2ht" },
  { id: 17, name: "3at" },
  { id: 18, name: "3bt" },
  { id: 19, name: "3ct" },
  { id: 20, name: "3dt" },
  { id: 21, name: "3et" },
  { id: 22, name: "3ft" },
  { id: 23, name: "4at" },
  { id: 24, name: "4bt" },
  { id: 25, name: "4ct" },
  { id: 26, name: "4dt" },
  { id: 27, name: "4et" },
  { id: 28, name: "4ft" },
  { id: 29, name: "4gt" }
];

const teacherOptions = [
  { id: 1, name: "A.Agłuszewicz (Aa)" },
  { id: 2, name: "M.Bajaka (Bj)" },
  { id: 3, name: "R.Banicka (Bn)" },
  { id: 4, name: "A.Barton-Szuwara (Ba)" },
  { id: 5, name: "K.Skóra (Sa)" },
  { id: 6, name: "B.Czajczyk (Ck)" },
  { id: 7, name: "K.Czarnowska (Cz)" },
  { id: 8, name: "P.Czechoński (Cc)" },
  { id: 9, name: "K.Czochra (Cr)" },
  { id: 10, name: "K.Duławska (Du)" },
  { id: 11, name: "M.Filipowski (Fm)" },
  { id: 12, name: "J.Frańczuk (Fr)" },
  { id: 14, name: "A.Glinka (Gl)" },
  { id: 15, name: "P.Grzesiuk (Gr)" },
  { id: 16, name: "A.Gwozda (Gw)" },
  { id: 17, name: "M.Halinowska (Hl)" },
  { id: 18, name: "A.Harkot (Ha)" },
  { id: 19, name: "S.Horoszkiewicz (Hs)" },
  { id: 20, name: "M.Jagi (Ja)" },
  { id: 21, name: "A.Kitka-Nowosadzka (Ka)" },
  { id: 22, name: "W.Kobylarz (Kb)" },
  { id: 23, name: "Ł.Kołodziejczyk (Ko)" },
  { id: 24, name: "E.Kowalewska (Kw)" },
  { id: 25, name: "S.Kowalska (Kl)" },
  { id: 26, name: "E.Kraczkowska (Ke)" },
  { id: 27, name: "B.Kukułowicz (Kk)" },
  { id: 28, name: "E.Kycko (Kc)" },
  { id: 29, name: "W.Litwin (Lt)" },
  { id: 31, name: "M.Łapińska (Ła)" },
  { id: 32, name: "E.Łój (Łj)" },
  { id: 33, name: "T.Manachowski (Mc)" },
  { id: 34, name: "E.Martynowska (Me)" },
  { id: 35, name: "A.Matelak (Mk)" },
  { id: 36, name: "P.Misiorek (Mp)" },
  { id: 37, name: "W.Molek (Ml)" },
  { id: 38, name: "M.Mróz (Mm)" },
  { id: 39, name: "K.Nieckarz (Nz)" },
  { id: 40, name: "K.Nowicka (Nk)" },
  { id: 43, name: "J.Piotrowska (Pt)" },
  { id: 44, name: "B.Poliszuk (Ps)" },
  { id: 45, name: "B.Szponar (Sp)" },
  { id: 46, name: "A.Puchacz (Pu)" },
  { id: 47, name: "R.Rochowiak (Rr)" },
  { id: 48, name: "A.Rosa-Niemczuk (Ra)" },
  { id: 50, name: "A.Sarecka-Nowak (Sr)" },
  { id: 51, name: "K.Siek (Sy)" },
  { id: 52, name: "K.Sierak (Si)" },
  { id: 54, name: "J.Sternik (St)" },
  { id: 55, name: "E.Swacha (Sh)" },
  { id: 56, name: "M.Szczuchniak (Sc)" },
  { id: 57, name: "Ł.Szewczyk (Sz)" },
  { id: 58, name: "K.Szwec (Sw)" },
  { id: 59, name: "B.Szybiak-Silezin (Sk)" },
  { id: 61, name: "M.Ścibak (Sm)" },
  { id: 62, name: "B.Tanowska (Tn)" },
  { id: 63, name: "D.Torba (Tb)" },
  { id: 64, name: "J.Tucka (Tj)" },
  { id: 65, name: "R.Turczyn (Tr)" },
  { id: 66, name: "M.Wasilewska (Wm)" },
  { id: 67, name: "K.Ważna (Wa)" },
  { id: 68, name: "Z.Ważny (Wy)" },
  { id: 69, name: "K.Zubańska (Zu)" },
  { id: 70, name: "J.Żuber (Żb)" },
  { id: 73, name: "A.Kuźma (Kz)" },
  { id: 76, name: "E.Mączka (Ma)" },
  { id: 77, name: "B.Taras (Ts)" },
  { id: 78, name: "M.Molas (Mr)" },
  { id: 79, name: "M.Gnyp (Gp)" },
  { id: 80, name: "M.Woszak (Ws)" },
  { id: 81, name: "A.Sokół (So)" },
  { id: 82, name: "k.Zalewski (Za)" }
];

export default {
  name: "PageSettings",
  data() {
    return {
      model: null,
      options: [],
      typeSelect: "o",
      currentLabel: "None",
      stringOptions: classOptions.map(c => c.name)
    };
  },
  watch: {
    typeSelect() {
      if (this.typeSelect == "n") {
        this.stringOptions = teacherOptions.map(t => t.name);
      } else {
        this.stringOptions = classOptions.map(c => c.name);
      }
    }
  },
  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = this.stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();

        this.options = this.stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    save() {
      let id = 10;
      if (this.typeSelect == "n") {
        id = teacherOptions[this.stringOptions.indexOf(this.model)].id;
      } else {
        id = classOptions[this.stringOptions.indexOf(this.model)].id;
      }

      localStorage.setItem("user-mode", this.typeSelect);
      localStorage.setItem("klasa", id);
      localStorage.setItem("klasa-label", this.model);
      this.currentLabel = this.model;

      this.$emit("downloadPlan");

      this.$router.push("/");

      // setTimeout(() => {
      //   // location.reload();
      // }, 1000);
    }
  },
  created() {
    let l = localStorage.getItem("klasa-label");
    if (l == null) l = "none";

    this.currentLabel = l;
  }
};
</script>

