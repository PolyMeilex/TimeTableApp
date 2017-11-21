<template>
  <div>
    <q-transition
 appear
 enter="zoomInDown"
 leave="zoomOut"
>

       <div v-show="show">
    <q-card color="dark">

      <q-card-title>
        {{NazwaLek}}
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
        QCard, //+
        QCardTitle, //+
        QCardMain, //+
        //QCardMedia, //-
        //QCardSeparator, //+
        QTransition
    } from 'quasar'

    export default {
        name: 'index',
        props:['GrpDis'],
        components: {
            QCard,
            QCardTitle,
            QCardMain,
          //  QCardMedia,
          //  QCardSeparator,
            QTransition
        },
        data() {
            return {
                show: true,
                NazwaLek: "-",
                SalaLek: "-",
                NazwaLekNext: "-",
                DzwonekLek: "-",
                SalaLekNext: "-",
                MPlan: "",
                MDzwonki: ""
            }
        },
        watch: {
          GrpDis: function () {

            this.grpTogle()
          }
        },
        methods: {
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


              var jsonPlanyGRP = []

              switch (day) {
                case 1:
                  jsonPlanyGRP =
                  [
                    require( "../plany/1_1.json"),
                    require( "../plany/1_2.json")
                  ]
                  break;
                case 2:
                  jsonPlanyGRP =
                  [
                    require( "../plany/2_1.json"),
                    require( "../plany/2_2.json")
                  ]
                  break;
                case 3:
                  jsonPlanyGRP =
                  [
                    require( "../plany/3_1.json"),
                    require( "../plany/3_2.json")
                  ]
                  break;
                case 4:
                  jsonPlanyGRP =
                  [
                    require( "../plany/4_1.json"),
                    require( "../plany/4_2.json")
                  ]
                  break;
                case 5:
                  jsonPlanyGRP =
                  [
                    require( "../plany/5_1.json"),
                    require( "../plany/5_2.json")
                  ]
                  break;

                }

                  console.log(jsonPlanyGRP[0]);

                //var Plan1 = require('../plany/plany.js');
                //var Plan2 = require('../plany/plany2.js');
                var dzwonkiLek = require('../plany/dzwonki.js');

                this.MDzwonki = dzwonkiLek

                if (this.GrpDis == 1) {
                    this.MPlan = jsonPlanyGRP[0];
                } else if (this.GrpDis == 2) {
                    this.MPlan = jsonPlanyGRP[1];
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

                if (day!= 6 & day!=0) {
                  this.NazwaLek = plan[TimeTest(m, me, x1, x2)].Name;
                  this.SalaLek = plan[TimeTest(m, me, x1, x2)].Sal;
                  this.DzwonekLek = dzwonkiLek[TimeTest(m, me, x1, x2)].dzwon;

                  if (h != 15) {
                      this.NazwaLekNext = plan[TimeTest(m, me, x1, x2) + 1].Name;
                      this.SalaLekNext = plan[TimeTest(m, me, x1, x2) + 1].Sal;
                  }
                }


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
        },
        beforeCreate(){
          this.$emit('isGrpNe',1)
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
