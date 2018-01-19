<template>
  <div>
    <q-transition
    appear
    name="test"
    mode="out-in"
>

       <div :key="trans">
    <q-card color="dark">

      <q-card-title>
        {{NazwaLek}}
        <div slot="right" class="row items-center">

          <!-- <div id="odometer" class="odometer">{{MtD}}</div>min: -->
          <div id="odometerM" class="odometer"></div>min
          <div id="odometerS" class="odometer"></div>s


        </div>
      </q-card-title>
      <!-- <q-card-separator /> -->

      <q-card-main>
        <b>Sala: </b>{{SalaLek}}
        <p class="text-faded">Dzwonek: {{DzwonekLek}}</p>
      </q-card-main>

    </q-card>

    <q-card color="dark">

      <q-card-title>
        {{NazwaLekNext}}
      </q-card-title>

      <!-- <q-card-separator /> -->

      <q-card-main>
        <b>Sala: </b>{{SalaLekNext}}
        <!-- <p class="text-faded">{{DzwonekLek}}</p> -->
      </q-card-main>

    </q-card>

    </div>

</q-transition>

  </div>

</template>

<script>

    // import VueOdometer from 'v-odometer/src'

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
      props: ['GrpDis'],
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
          show: true,
          NazwaLek: '-',
          SalaLek: '-',
          NazwaLekNext: '-',
          DzwonekLek: '-',
          SalaLekNext: '-',
          MPlan: '',
          MDzwonki: '',
          MtD: '-',
          StD: '-',
          Mse: null,
          trans: false,
          destroyed: true
        }
      },
      watch: {
        GrpDis: function () {
          // this.Initial()
          this.trans = !this.trans
        },
        StD: function() {
          document.getElementById('odometerS').innerHTML = this.StD;
          document.getElementById('odometerM').innerHTML = this.MtD;
        }
      },
      methods: {
        getDate: function () {
          var d = new Date()
          var h = d.getHours()
          var m = d.getMinutes()
          var s = d.getSeconds()
          if (this.MtD != '-') {
            this.StD = 60 - s
          }
          else {
            this.StD = '-'
          }
          var day = d.getDay()

          return {
            h,
            m,
            s,
            day
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
              Se = [{s: [8, 0], e: [14, 20]}, {s: [8, 0], e: [14, 20]}]
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
              Se = [{s: [8, 0], e: [14, 20]}, {s: [8, 0], e: [14, 20]}]
              jsonPlanyGRP =
                  [
                    require('../Plany/5_1.json'),
                    require('../Plany/5_2.json')
                  ]
              break
          }

          // var Plan1 = require('../Plany/Plany.js');
          // var Plan2 = require('../Plany/Plany2.js');
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

        PrintPlan: function (m, me, x1, x2, day, h) {
          var plan = this.MPlan
          var dzwonkiLek = this.MDzwonki

          function TimeTest (m, me, x1, x2) {
            if (m < me) {
              return x1
            }
            else if (m >= me) {
              return x2
            }
          }

          if (day != 6 & day != 0) {
            this.NazwaLek = plan[TimeTest(m, me, x1, x2)].Name
            this.SalaLek = plan[TimeTest(m, me, x1, x2)].Sal
            this.DzwonekLek = dzwonkiLek[TimeTest(m, me, x1, x2)].dzwon

            var Mtd = me - m
            if (Mtd > 0) {
              if (Mtd != 1) {
                this.MtD = Mtd
              }
              else if (Mtd == 1) {
                this.MtD = 0
              }
            }
            else {
              this.MtD = '-'
            }

            if (h != 15) {
              this.NazwaLekNext = plan[TimeTest(m, me, x1, x2) + 1].Name
              this.SalaLekNext = plan[TimeTest(m, me, x1, x2) + 1].Sal
            }
          }
        },
        Initial () {
          var Ofset = 0
          var getDate = this.getDate()
          var h = getDate.h
          var m = getDate.m
          var day = getDate.day
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

          if (this.destroyed != true) {
            setTimeout(this.Initial, 1000)
          }
        }

      },
      created () {
        this.destroyed = false
        this.Initial()
      },
      beforeCreate () {
        this.$emit('isGrpNe', 1)
      },
      destroyed () {
        console.log('destroyed')
        this.destroyed = true
      }
    }
</script>
