<template>
  <q-page>
    <q-card v-if="apiRes" dark style="margin: 8px;">
      <q-card-section>
        Aktualne ustawienia to:
        <b>{{ planLabel }}</b>
        <br />

        <br />
        <span class="text-subtitle1">Jestem:</span>
        <br />
        <q-radio
          dark
          v-model="planTypeSelected"
          val="o"
          label="Uczniem"
          style="margin-left:-10px;"
        />
        <q-radio dark v-model="planTypeSelected" val="n" label="Nauczycielem" />
        <q-radio dark v-model="planTypeSelected" val="s" label="Salą" />

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
    <q-spinner-puff v-else color="primary" size="100%" />

    <q-card v-if="apiRes && history.length > 0" dark style="margin: 8px;">
      <q-card-section>
        <q-chip
          v-for="b in history"
          :key="b.id"
          style="cursor: pointer"
          @click.native="() => openBookmark(b)"
        >
          <q-avatar icon="bookmark" color="primary" text-color="white" />
          {{ b.label }}
        </q-chip>
      </q-card-section>
    </q-card>

    <div v-if="apiErr">
      <div class="text-h6">Request Error</div>
      <q-icon name="warning" class="text-red" style="font-size: 100%;" />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import { settingsMod, planMod } from "@/store";

@Component
export default class Settings extends Vue {
  apiRes: any = null;
  apiErr: boolean = false;
  model: string | null = null;
  options: string[] = [];
  stringOptions: string[] = [];
  planTypeSelected: "o" | "n" | "s" = "o";

  history: any[] = [];

  get planLabel() {
    return settingsMod.planLabel;
  }

  @Watch("planTypeSelected")
  onTypeSelect() {
    if (this.planTypeSelected == "o") {
      this.stringOptions = this.apiRes.classes.map((c: any) => c.name);
    } else if (this.planTypeSelected == "n") {
      this.stringOptions = this.apiRes.teachers.map((t: any) => t.name);
    } else if (this.planTypeSelected == "s") {
      this.stringOptions = this.apiRes.rooms.map((r: any) => r.name);
    }
  }

  filterFn(val: any, update: any) {
    if (val === "") {
      update(() => {
        this.options = this.stringOptions;
      });
      return;
    }

    update(() => {
      const needle = val.toLowerCase();

      this.options = this.stringOptions.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    });
  }
  save() {
    if (!this.model) return;

    let label = null;
    let id = null;
    let type: "o" | "n" | "s" | null = null;
    if (this.planTypeSelected == "o") {
      label = this.model.split(" ")[0];
      id = this.apiRes.classes[this.stringOptions.indexOf(this.model)].value;
      type = "o";
    } else if (this.planTypeSelected == "n") {
      label = this.model;
      id = this.apiRes.teachers[this.stringOptions.indexOf(this.model)].value;
      type = "n";
    } else if (this.planTypeSelected == "s") {
      label = this.model;
      id = this.apiRes.rooms[this.stringOptions.indexOf(this.model)].value;
      type = "s";
    }

    if (!label || !id || !type) return;
    settingsMod.setPlanLabel(label);
    settingsMod.setPlanId(id);
    settingsMod.setPlanType(type);
    this.history.unshift({ label, type, id });

    if (this.history.length > 3) this.history.pop();

    this.$q.localStorage.set("app/history", this.history);

    this.model = null;
    planMod.downloadPlan({
      planId: settingsMod.planId,
      planType: settingsMod.planType,
    });

    this.$router.push("/");
  }

  openBookmark(bookmark: any) {
    settingsMod.setPlanLabel(bookmark.label);
    settingsMod.setPlanId(bookmark.id);
    settingsMod.setPlanType(bookmark.type);

    planMod.downloadPlan({
      planId: settingsMod.planId,
      planType: settingsMod.planType,
    });
    this.$router.push("/");
  }

  created() {
    let history: any[] | null = this.$q.localStorage.getItem("app/history");
    if (history) this.history = history;

    this.$q.loadingBar.start();
    fetch("https://codenomik.ekonomikzamosc.pl/api/ekolib/list.php")
      .then((s) => s.json())
      .then((json) => {
        this.apiRes = json;
        this.planTypeSelected = settingsMod.planType;
        this.onTypeSelect();
        this.$q.loadingBar.stop();
      })
      .catch((err) => {
        this.apiErr = true;
        this.$q.loadingBar.stop();
      });
  }
}
</script>
