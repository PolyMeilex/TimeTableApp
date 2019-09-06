<template>
  <q-page>
    <q-card class="bg-dark text-white lesson-card flex" style="margin: 8px;">
      <q-card-section>
        Aktualne ustawienia to:
        <b>{{ currentLabel }}</b>
        <br />

        <br />
        <span class="text-subtitle1">Jetem:</span>
        <br />
        <q-radio dark v-model="typeSelect" val="o" label="Uczeniem" style="margin-left:-10px;" />
        <q-radio dark v-model="typeSelect" val="n" label="Nauczycielem" />
        <q-radio dark value val="2" label="Salą" disabled />

        <q-select
          v-model="model"
          use-input
          input-debounce="0"
          label="Moja Klasa To:"
          :stack-label="true"
          :options="options"
          @filter="filterFn"
          style="width: 250px"
          dark
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>

        <br />
        <q-btn color="primary" @click="save">Zapisz</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>


<script>
const classOptions = [
  { id: 1, name: "1a" },
  { id: 2, name: "1b" },
  { id: 3, name: "1c" },
  { id: 4, name: "1d" },
  { id: 5, name: "1e" },
  { id: 6, name: "1f" },
  { id: 7, name: "1g" },
  { id: 8, name: "1at" },
  { id: 9, name: "1bt" },
  { id: 10, name: "1ct" },
  { id: 11, name: "1dt" },
  { id: 12, name: "1et" },
  { id: 13, name: "1ft" },
  { id: 14, name: "1gt" },
  { id: 15, name: "2at" },
  { id: 16, name: "2bt" },
  { id: 17, name: "2ct" },
  { id: 18, name: "2dt" },
  { id: 19, name: "2et" },
  { id: 20, name: "2ft" },
  { id: 21, name: "2gt" },
  { id: 22, name: "2ht" },
  { id: 23, name: "3at" },
  { id: 24, name: "3bt" },
  { id: 25, name: "3ct" },
  { id: 26, name: "3dt" },
  { id: 27, name: "3et" },
  { id: 28, name: "3ft" },
  { id: 29, name: "3ht" },
  { id: 30, name: "4at" },
  { id: 31, name: "4bt" },
  { id: 32, name: "4ct" },
  { id: 33, name: "4dt" },
  { id: 34, name: "4et" },
  { id: 35, name: "4ft" }
];

const teacherOptions = [
  { id: 1, name: "A.Agłuszewicz (Aa)" },
  { id: 2, name: "M.Bajaka (Bj)" },
  { id: 3, name: "R.Banicka (Bn)" },
  { id: 4, name: "A.Barton-Szuwara (Ba)" },
  { id: 5, name: "G.Dziaduszek (Dg)" },
  { id: 6, name: "M.Chomicka (Cm)" },
  { id: 7, name: "B.Czajczyk (Ck)" },
  { id: 8, name: "K.Czarnowska (Cz)" },
  { id: 9, name: "D.Czarny (Cd)" },
  { id: 10, name: "P.Czechoński (Cc)" },
  { id: 11, name: "K.Czochra (Cr)" },
  { id: 12, name: "K.Duławska (Du)" },
  { id: 13, name: "M.Filipowski (Fm)" },
  { id: 14, name: "J.Frańczuk (Fr)" },
  { id: 15, name: "J.Giełczyk-Zaniewski (Gz)" },
  { id: 16, name: "A.Glinka (Gl)" },
  { id: 17, name: "M.Gnyp (Gp)" },
  { id: 18, name: "J.Gorzkowski (Gj)" },
  { id: 19, name: "P.Grzesiuk (Gr)" },
  { id: 20, name: "A.Gwozda (Gw)" },
  { id: 21, name: "M.Halinowska (Hl)" },
  { id: 22, name: "A.Harkot (Ha)" },
  { id: 23, name: "S.Horoszkiewicz (Hs)" },
  { id: 25, name: "B.Kawala (Kt)" },
  { id: 26, name: "A.Kitka-Nowosadzka (Ka)" },
  { id: 27, name: "W.Kobylarz (Kb)" },
  { id: 28, name: "Ł.Kołodziejczyk (Ko)" },
  { id: 29, name: "M.Konaszek (Km)" },
  { id: 30, name: "E.Kowalewska (Kw)" },
  { id: 31, name: "S.Kowalska (Kl)" },
  { id: 32, name: "E.Kraczkowska (Ke)" },
  { id: 33, name: "B.Kukułowicz (Kk)" },
  { id: 34, name: "A.Kuźma (Kz)" },
  { id: 35, name: "E.Kycko (Kc)" },
  { id: 36, name: "W.Litwin (Lt)" },
  { id: 37, name: "M.Łapińska (Ła)" },
  { id: 38, name: "E.Łój (Łj)" },
  { id: 39, name: "M.Białas (Mb)" },
  { id: 40, name: "E.Martynowska (Me)" },
  { id: 41, name: "A.Matelak (Mk)" },
  { id: 42, name: "P.Misiorek (Mp)" },
  { id: 43, name: "M.Molas (Mr)" },
  { id: 44, name: "W.Molek (Ml)" },
  { id: 45, name: "M.Mróz (Mm)" },
  { id: 46, name: "K.Nieckarz (Nz)" },
  { id: 47, name: "K.Nowicka (Nk)" },
  { id: 50, name: "J.Piotrowska (Pt)" },
  { id: 51, name: "B.Poliszuk (Ps)" },
  { id: 52, name: "I.Pizoń (Pi)" },
  { id: 53, name: "A.Puchacz (Pu)" },
  { id: 54, name: "R.Rochowiak (Rr)" },
  { id: 55, name: "A.Rosa-Niemczuk (Ra)" },
  { id: 57, name: "A.Sarecka-Nowak (Sr)" },
  { id: 58, name: "K.Siek (Sy)" },
  { id: 60, name: "K.Skóra (Sa)" },
  { id: 61, name: "A.Sokół (So)" },
  { id: 63, name: "J.Sternik (St)" },
  { id: 64, name: "E.Swacha (Sh)" },
  { id: 65, name: "M.Szczuchniak (Sc)" },
  { id: 66, name: "A.Szeląg (Sl)" },
  { id: 67, name: "Ł.Szewczyk (Sz)" },
  { id: 68, name: "J.Szozda (Sj)" },
  { id: 69, name: "B.Szponar (Sp)" },
  { id: 70, name: "K.Szwec (Sw)" },
  { id: 71, name: "B.Szybiak-Silezin (Sk)" },
  { id: 73, name: "M.Ścibak (Sm)" },
  { id: 75, name: "B.Taras (Ts)" },
  { id: 76, name: "G.Toczek (Tc)" },
  { id: 77, name: "D.Torba (Tb)" },
  { id: 78, name: "J.Tucka (Tj)" },
  { id: 79, name: "R.Turczyn (Tr)" },
  { id: 80, name: "M.Wasilewska (Wm)" },
  { id: 81, name: "K.Ważna (Wa)" },
  { id: 82, name: "Z.Ważny (Wy)" },
  { id: 83, name: "M.Woszak (Ws)" },
  { id: 84, name: "M.Wrotniak (Wr)" },
  { id: 85, name: "K.Zubańska (Zu)" },
  { id: 87, name: "J.Żuber (Żb)" }
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
    if (l == null) l = "Brak";
    this.currentLabel = l;

    if (localStorage.getItem("user-mode") == "n") {
      this.typeSelect = "n";
    }
  }
};
</script>

