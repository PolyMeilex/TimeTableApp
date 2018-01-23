<template>
  <div>
    <q-transition
    name="test"
    mode="out-in"
>

       <div :key="trans">
    <q-card color="dark" class="animated" :class="{shake: StD==0}">

      <q-card-title>
        {{NazwaLek}}
        <div slot="right" class="row items-center">
          <q-btn flat small round color="faded" @click="OpenSettings">
            <q-icon name="settings" />
          </q-btn>
          <!-- <div id="odometer" class="odometer">{{MtD}}</div>min: -->
          {{MtD}}min
          {{StD}}s


        </div>

        <div slot="right" class="row items-center">

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

    import {
      QCard, // +
      QCardTitle, // +
      QCardMain, // +
      // QCardMedia, //-
      // QCardSeparator, //+
      QTransition,
      Dialog,
      Alert,
      QBtn,
      QIcon
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
        QTransition,
        QBtn,
        QIcon
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
          destroyed: true,
          SecOffset: 0
        }
      },
      watch: {
        SecOffset () {
          var LocalOffset = localStorage.getItem('LocalOffset')

          if (LocalOffset != null) {
            if (this.SecOffset != LocalOffset) {
              localStorage.setItem('LocalOffset', this.SecOffset)
            }
          }
          else{
              localStorage.setItem('LocalOffset', this.SecOffset)
          }
        },
        GrpDis () {
          this.trans = !this.trans
        }
      },
      methods: {
        getDate: function () {
          var d = new Date()
          var h = d.getHours()
          var m = d.getMinutes()
          var s = d.getSeconds()
          if (this.MtD != '-') {
            if (this.MtD == 0) {
              this.StD = 60 - s - this.SecOffset
            }
            else {
              this.StD = 60 - s
            }
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

        FetOffset(auto){
          if (auto==true) {
            localStorage.setItem('autoMode', true)
          }
          else if (auto==false) {
            localStorage.setItem('autoMode', false)
          }

          fetch("https://planapp-f8adb.firebaseio.com/TimeOffset/.json")
          .then(response  => response.json())
          .then(response => {
            this.SecOffset = response
            let a1 = Alert.create({
              color: 'positive',
              position: 'right',
              enter: 'fadeIn',
              leave: 'fadeOut',
              html: "Ustawiono: "+this.SecOffset+"s"
            })

            setTimeout(function () {
              a1.dismiss()
            }, 2000);
          })


        },

        OpenSettings () {
          Dialog.create({
            title: 'Kalibracja',
            message: 'Wpisz ile sekund spóźnia się dzwonek',
            form: {
              offset: {
                type: 'number',
                label: 'Sekundy',
                model: this.SecOffset,
              }
            },
            buttons: [
              'Cancel',
              {
                label: 'Auto',
                handler: (data) => {
                  this.FetOffset(true)
                }
              },
              {
                label: 'Pobierz',
                handler: (data) => {
                  this.FetOffset(false)
                }
              },
              {
                label: 'Ok',
                handler: (data) => {
                  localStorage.setItem('autoMode', false)
                  this.SecOffset = data.offset;
                  let a2 = Alert.create({
                    color: 'positive',
                    position: 'right',
                    enter: 'fadeIn',
                    leave: 'fadeOut',
                    html: "Ustawiono: "+this.SecOffset+"s"
                  })

                  setTimeout(function () {
                    a2.dismiss()
                  }, 2000);
                }
              }
            ]
          })
        },

        Initial () {
          var Ofset = 0
          var getDate = this.getDate()
          var h = getDate.h
          var m = getDate.m
          var day = getDate.day
          this.RequirePlan(day)

          this.ProgresLog(h, m)

          if (h < 8) {
            let me = 0; var x1 = 1; var x2 = 1
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 8) {
            let me = 45 - Ofset; let x1 = 1; let x2 = 2
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 9) {
            let me = 40 - Ofset; let x1 = 2; let x2 = 3
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 10) {
            let me = 35 - Ofset; let x1 = 3; let x2 = 4
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 11) {
            let me = 30 - Ofset; let x1 = 4; let x2 = 5
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 12) {
            let me = 25 - Ofset; let x1 = 5; let x2 = 6
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 13) {
            let me = 20 - Ofset; let x1 = 6; let x2 = 7
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 14) {
            let me = 20 - Ofset; let x1 = 7; let x2 = 8
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 15) {
            let me = 15 - Ofset; let x1 = 8; let x2 = 8
            this.PrintPlan(m, me, x1, x2, day, h)
          }

          if (this.destroyed != true) {
            setTimeout(this.Initial, 1000)
          }
        }

      },
      created () {
        this.destroyed = false

        let locOff = localStorage.getItem('LocalOffset');
        if (locOff != null) {
          this.SecOffset = locOff
        }

        this.Initial()

        if (localStorage.getItem('autoMode')=='true') {
          this.FetOffset(true)
        }
      },
      destroyed () {
        this.destroyed = true
      }
    }
</script>
