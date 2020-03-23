<template>
  <q-list id="list">
    <q-item-label header>Menu</q-item-label>

    <q-item clickable @click="navigateTo('/')">
      <q-item-section avatar>
        <q-icon name="schedule" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Bieżące Lekcje</q-item-label>
        <q-item-label caption>Aktualna i przyszła lekcja</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable @click="navigateTo('/FullTable')">
      <q-item-section avatar>
        <q-icon name="list" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Pełen Plan</q-item-label>
        <q-item-label caption>Wyświetla Plan Całego Tygodnia</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable @click="navigateTo('/WeekTable')">
      <q-item-section avatar>
        <q-icon name="table_chart" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Tabela</q-item-label>
        <q-item-label caption>Wyświetla Tabele Całego Tygodnia</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable @click="navigateTo('/News')">
      <q-item-section avatar>
        <q-icon name="chrome_reader_mode" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Ogłoszenia</q-item-label>
        <q-item-label caption>Zastępstwa I Inne Ogłoszenia Ze Strony Szkoły</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable @click="navigateTo('/Settings')">
      <q-item-section avatar>
        <q-icon name="settings" />
      </q-item-section>

      <q-item-section>
        <q-item-label>Ustawienia</q-item-label>
        <q-item-label caption>Ustawienia użytkownika</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class DrawerList extends Vue {
  navigateTo(path: string) {
    this.$router.push(path).catch(err => this.$emit("closeDrawer"));
  }
}
</script>

<style>
.q-drawer--right #list {
  margin-top: 50%;
}
</style>
