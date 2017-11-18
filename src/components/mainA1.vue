<template>
  <div>
    <q-transition
 appear
 enter="zoomInDown"
 leave="zoomOut"
>

    <div v-show="show">
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

</template>

<script>
    import {
        QCard,
        QCardTitle,
        QCardMain,
        QTransition
    } from 'quasar'

    export default {
        name: 'index',
        props:['GrpDis'],
        components: {
            QCard,
            QCardTitle,
            QCardMain,
            QTransition
        },
        data() {
            return {
                show: true,
                DzwonekLek: [],
                MPlan: [],
                MDzwonki: [],
                AktualnaL: 0
            }
        },
        watch: {
          GrpDis: function () {
            this.grpTogle()
          }
        },
        methods: {
            FadedTextCheck(i){
              if (i==this.AktualnaL) {
                return {'text-faded':false}
              }
              else {
                return {'text-faded':true}
              }
            },
            PrimaryCheck(i){
              if (i==this.AktualnaL) {
                return "primary"
              }
              else {
                return "dark"
              }

            },
            DzCheck(i){
              if (this.MDzwonki[i]) {
                return this.MDzwonki[i].dzwon
              }
              else {
                return "-"
              }
            },
            fadeOFF: function() {
              this.show = true;
              this.Initial()
            },

            grpTogle: function() {
            this.show = false;

            setTimeout(function () { this.fadeOFF() }.bind(this), 200)
            },


            getDate: function() {
                var d = new Date()
                var h = d.getHours()
                var m = d.getMinutes()
                var day = d.getDay()

                return {
                    h,
                    m,
                    day
                }
            },

            RequirePlan: function(day) {
                var Plan1 = require('../plany/plany.js');
                var Plan2 = require('../plany/plany2.js');
                var dzwonkiLek = require('../plany/dzwonki.js');

                this.MDzwonki = dzwonkiLek

                if (this.GrpDis == 1) {
                    this.MPlan = Plan1[day - 1];
                } else if (this.GrpDis == 2) {
                    this.MPlan = Plan2[day - 1];
                }

            },
            PrintPlan: function(m, me, x1, x2, day, h) {

                var plan = this.MPlan;
                var dzwonkiLek = this.MDzwonki;



                function TimeTest(m, me, x1, x2) {
                    if (m < me) {
                        return x1
                    } else if (m >= me) {
                        return x2
                    }
                }

                this.AktualnaL = TimeTest(m, me, x1, x2)
                // console.log(this.AktualnaL);

                // this.NazwaLek = plan[TimeTest(m, me, x1, x2)].Name;
                // this.SalaLek = plan[TimeTest(m, me, x1, x2)].Sal;
                // this.DzwonekLek = dzwonkiLek[TimeTest(m, me, x1, x2)].dzwon;


            },
            Initial(){
              var Ofset = 0
              var getDate = this.getDate()
              var h = getDate.h
              var m = getDate.m
              var day = getDate.day
              this.RequirePlan(day)

              if (h==8) {var me = 45-Ofset;var x1 = 1;var x2 = 2;
                this.PrintPlan(m,me,x1,x2,day,h);
              }
              else if(h==9) {var me = 40-Ofset;var x1 = 2;var x2 = 3;
                this.PrintPlan(m,me,x1,x2,day,h);
              }
              else if(h==10){var me = 35-Ofset;var x1 = 3;var x2 = 4;
                this.PrintPlan(m,me,x1,x2,day,h);
              }
              else if(h==11){var me = 30-Ofset;var x1 = 4;var x2 = 5;
                this.PrintPlan(m,me,x1,x2,day,h);
               }
              else if(h==12){var me = 25-Ofset;var x1 = 5;var x2 = 6;
                this.PrintPlan(m,me,x1,x2,day,h);
              }
              else if(h==13){ var me = 20-Ofset; var x1 = 6; var x2 = 7;
               this.PrintPlan(m,me,x1,x2,day,h);
              }
              else if(h==14){var me = 20-Ofset;var x1 = 7;var x2 = 8;
                this.PrintPlan(m,me,x1,x2,day,h);
              }
              else if(h==15){var me = 15-Ofset; var x1 = 8; var x2 = 8;
                this.PrintPlan(m,me,x1,x2,day,h);
              }


            }

        },
        created() {
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
