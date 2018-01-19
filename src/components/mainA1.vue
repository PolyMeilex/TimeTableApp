<template>
  <div>
    <q-tabs color="grey-10" v-model="selectedTab">
      <q-tab :alert="DayData==1" :default="DayData==1" slot="title" name="1">Po</q-tab>
      <q-tab :alert="DayData==2" :default="DayData==2" slot="title" name="2">Wt</q-tab>
      <q-tab :alert="DayData==3" :default="DayData==3" slot="title" name="3">Śr</q-tab>
      <q-tab :alert="DayData==4" :default="DayData==4" slot="title" name="4">Cz</q-tab>
      <q-tab :alert="DayData==5" :default="DayData==5" slot="title" name="5">Pi</q-tab>
    </q-tabs>




<div v-touch-swipe.horizontal="SwipeHandler">



    <q-transition
    appear
    name="test"
    mode="out-in"
>

    <div :key="trans" >
      <q-card :color="PrimaryCheck(MPlan.indexOf(lek))" v-for="lek in MPlan" :key="lek.Id">
        <q-card-title>
          {{lek.Name}}
        </q-card-title>
        <q-card-main>
          <b>Sala: </b>{{lek.Sal}}

          <p :class="FadedTextCheck(MPlan.indexOf(lek))">Dzwonek: {{DzCheck(MPlan.indexOf(lek))}}</p>
        </q-card-main>
      </q-card>
    </div>


  </q-transition>
</div>
  </div>

</template>



<script>
    import {
      QCard, // +
      QCardTitle, // +
      QCardMain, // +
      QTransition, // +
      QTabs, // +
      QTab, // +
      TouchSwipe
      // QTabPane //-
    } from 'quasar'

    export default {
      directives: {
        TouchSwipe
      },
      name: 'index',
      props: ['GrpDis'],
      components: {
        QCard,
        QCardTitle,
        QCardMain,
        QTransition,
        QTabs,
        QTab
        // QTabPane
      },
      data () {
        return {
          show: true,
          DzwonekLek: [],
          MPlan: [],
          MDzwonki: [],
          AktualnaL: 0,
          Mse: null,
          DayData: 1,
          selectedTab: '1',
          trans: false
        }
      },
      watch: {
        selectedTab: function () {
          console.log(this.selectedTab)

          this.RequirePlan(Number(this.selectedTab))

          this.trans = !this.trans
        },
        GrpDis: function () {
          this.grpTogle()
          this.trans = !this.trans
        },
        DayData: function () {

        }
      },
      methods: {
        SwipeHandler (obj) {
          var direction = obj.direction

          if (direction == 'right' & Number(this.selectedTab) < 5) {
            var num = Number(this.selectedTab) + 1

            this.selectedTab = num.toString()
          }
          else if (direction == 'left' & Number(this.selectedTab) > 1) {
            var num = Number(this.selectedTab) - 1
            this.selectedTab = num.toString()
          }
        },
        FadedTextCheck (i) {
          if (i == this.AktualnaL) {
            return {'text-faded': false}
          }
          else {
            return {'text-faded': true}
          }
        },
        PrimaryCheck (i) {
          if (i == this.AktualnaL) {
            return 'primary'
          }
          else {
            return 'dark'
          }
        },
        DzCheck (i) {
          if (this.MDzwonki[i]) {
            return this.MDzwonki[i].dzwon
          }
          else {
            return '-'
          }
        },
        grpTogle: function () {
          this.RequirePlan(Number(this.selectedTab))
        },
        getDate: function () {
          var d = new Date()
          var h = d.getHours()
          var m = d.getMinutes()
          var day = d.getDay()

          if (day != 6 & day != 7 & day != 0) {
            this.DayData = day
            this.selectedTab = this.DayData.toString()
          }
          else {
            this.DayData = 1
            this.selectedTab = this.DayData.toString()
          }

          return {
            h,
            m,
            day
          }
        },

        ProgresLog (h, m) {
          try {
            var MseObj = this.Mse

            var Sh = MseObj.s[0]
            var Sm = MseObj.s[1]

            var Eh = (MseObj.e[0] - Sh) * 60
            var Em = MseObj.e[1] - Sm
            var Ef = Eh + Em

            var Th = (h - Sh) * 60
            var Tm = m - Sm
            var Tf = Th + Tm

            var Proc = Tf / Ef * 100
            setTimeout(function () { document.getElementById('ProgresBar').style.width = Proc + '%' }, 100)
          }
          catch (e) {
          }
        },

        RequirePlan: function (day) {
          var jsonPlanyGRP = []
          var Se = []

          switch (day) {
            case 1:
              Se = [{s: [8, 0], e: [14, 20]}, {s: [8, 0], e: [15, 15]}]
              jsonPlanyGRP =
                  [
                    require('../Plany/1_1.json'),
                    require('../Plany/1_2.json')
                  ]
              break
            case 2:
              Se = [{s: [8, 55], e: [14, 20]}, {s: [8, 55], e: [14, 20]}]
              jsonPlanyGRP =
                  [
                    require('../Plany/2_1.json'),
                    require('../Plany/2_2.json')
                  ]
              break
            case 3:
              Se = [{s: [8, 0], e: [15, 15]}, {s: [8, 0], e: [15, 15]}]
              jsonPlanyGRP =
                  [
                    require('../Plany/3_1.json'),
                    require('../Plany/3_2.json')
                  ]
              break
            case 4:
              Se = [{s: [8, 0], e: [15, 15]}, {s: [8, 0], e: [14, 20]}]
              jsonPlanyGRP =
                  [
                    require('../Plany/4_1.json'),
                    require('../Plany/4_2.json')
                  ]
              break
            case 5:
              Se = [{s: [8, 0], e: [13, 20]}, {s: [8, 0], e: [13, 20]}]
              jsonPlanyGRP =
                  [
                    require('../Plany/5_1.json'),
                    require('../Plany/5_2.json')
                  ]
              break
          }
          var dzwonkiLek = require('../Plany/dzwonki.js')

          this.MDzwonki = dzwonkiLek

          if (this.GrpDis == 1) {
            this.Mse = Se[0]
            this.MPlan = jsonPlanyGRP[0]
          }
          else if (this.GrpDis == 2) {
            this.Mse = Se[1]
            this.MPlan = jsonPlanyGRP[1]
          }
        },
        PrintPlan: function (m, me, x1, x2, day, h) {
          // var plan = this.MPlan
          // var dzwonkiLek = this.MDzwonki

          function TimeTest (m, me, x1, x2) {
            if (m < me) {
              return x1
            }
            else if (m >= me) {
              return x2
            }
          }

          this.AktualnaL = TimeTest(m, me, x1, x2)
        },
        Initial () {
          var Ofset = 0
          var getDate = this.getDate()
          var h = getDate.h
          var m = getDate.m
          var day = this.DayData

          this.RequirePlan(day)
          this.ProgresLog(h, m)

          if (h == 8) {
            var me = 45 - Ofset; var x1 = 1; var x2 = 2
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 9) {
            var me = 40 - Ofset; var x1 = 2; var x2 = 3
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 10) {
            var me = 35 - Ofset; var x1 = 3; var x2 = 4
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 11) {
            var me = 30 - Ofset; var x1 = 4; var x2 = 5
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 12) {
            var me = 25 - Ofset; var x1 = 5; var x2 = 6
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 13) {
            var me = 20 - Ofset; var x1 = 6; var x2 = 7
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 14) {
            var me = 20 - Ofset; var x1 = 7; var x2 = 8
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 15) {
            var me = 15 - Ofset; var x1 = 8; var x2 = 8
            this.PrintPlan(m, me, x1, x2, day, h)
          }
        }

      },
      beforeCreate () {
        this.$emit('isGrpNe', 1)
      },
      created () {
        this.Initial()
      }

    }
</script>

<style lang="stylus">
.logo-container
  width 255px
  height 242px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
</style>
