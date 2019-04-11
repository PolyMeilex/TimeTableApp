<template>
  <div v-on:dblclick="$router.push('/')">
    <q-tabs color="grey-10" v-model="selectedTab">
      <q-tab :alert="DayData==1" :default="DayData==1" slot="title" name="1">Po</q-tab>
      <q-tab :alert="DayData==2" :default="DayData==2" slot="title" name="2">Wt</q-tab>
      <q-tab :alert="DayData==3" :default="DayData==3" slot="title" name="3">Śr</q-tab>
      <q-tab :alert="DayData==4" :default="DayData==4" slot="title" name="4">Cz</q-tab>
      <q-tab :alert="DayData==5" :default="DayData==5" slot="title" name="5">Pi</q-tab>
    </q-tabs>

    <div v-touch-swipe.horizontal="SwipeHandler">

      <q-card :color="PrimaryCheck(lek.i)" v-for="lek in TodayPlanOnline" :key="lek.i">
        <q-card-title>
          {{lek.i+1}}.
          {{GetDataToDisplay(lek,GrpDis).subject}}
        </q-card-title>
        <q-card-main>
          <b>Sala: </b>{{GetDataToDisplay(lek,GrpDis).room.name}}

          <p :class="FadedTextCheck(lek.i)">Dzwonek: {{DzCheck(lek.i)}}</p>
       
       
       <q-collapsible class="bg-primary" icon="warning" label="Zastępstwo" v-if="getZastsFtd(lek.i) != null">
               <div>
                         <p><b>Opis:</b> {{getZastsFtd(lek.i).NrLekcji}}</p>
                         <p><b>Sala:</b> {{getZastsFtd(lek.i).Sala}}</p>
                         <p><b>Grp:</b> {{getZastsFtd(lek.i).Klasa}}</p>
                         <p><b>Nauczyciel:</b> {{getZastsFtd(lek.i).Nauczyciel}}</p>
               </div>
        </q-collapsible>
       
       </q-card-main>

         
      </q-card>

    </div>

  </div>
</template>



<script>
    import {
      QCard,
      QCardTitle,
      QCardMain,
      QTabs,
      QTab,
      TouchSwipe,
      QCollapsible
    } from 'quasar'

    export default {
      directives: {
        TouchSwipe
      },
      name: 'index',
      props: ['GrpDis','MDzwonki','OnlinePlanJson','SortedByDayArray'],
      components: {
        QCard,
        QCardTitle,
        QCardMain,
        QTabs,
        QTab,
        QCollapsible
        // QTabPane
      },
      data () {
        return {
          TodayPlanOnline:null,
          DzwonekLek: [],
          NrLek: 0,
          Mse: null,
          DayData: 1,
          selectedTab: '1'
        }
      },
      watch: {
        selectedTab: function () {
          this.RequirePlan(Number(this.selectedTab))

          // this.$emit('grpTrigger')
        },
        GrpDis: function () {
          this.grpTogle()
          this.$emit('grpTrigger')
        },
        DayData: function () {

        }
      },
      methods: {
         getZastsFtd(i){    
            let isItDay = (element) => {
              let date = new Date();
              let day = date.getDay();
              return element.d == this.selectedTab;
            }
            let DayArray = this.SortedByDayArray.find(isItDay)
            
            if (DayArray != null) {
            let ZastArray = DayArray.e.zast;
            let test = ZastArray.find((element) => {
              return element.NrLekcji-1 == i & element.Grp==this.GrpDis || element.NrLekcji-1 == i & element.Grp==0;
            })
            
            return test;
            }
            else{
              return null
            }

        },
        GetDataToDisplay(lek,grp){
          // this.DzwonekLek = this.MDzwonki[lekNr];

          if (grp == 1) {
            return lek.g1;
          }
          else if (grp ==2) {
            return lek.g2;
          }


        },
        SwipeHandler(obj) {
          if (obj.distance.x > 100) {
            var direction = obj.direction;

            if (direction == 'right' & Number(this.selectedTab) > 1 ) {
              var num = Number(this.selectedTab) - 1

              this.selectedTab = num.toString()
            }
            else if (direction == 'left' & Number(this.selectedTab) < 5) {
              var num = Number(this.selectedTab) + 1
              this.selectedTab = num.toString()
            }
          }
        },
        FadedTextCheck(i) {
          if (i == this.NrLek) {
            return {'text-faded': false}
          }
          else {
            return {'text-faded': true}
          }
        },
        PrimaryCheck(i) {
          if (i == this.NrLek) {
            return 'primary'
          }
          else {
            return 'dark'
          }
        },
        DzCheck(i) {
          if (this.MDzwonki[i]) {
            return this.MDzwonki[i]
          }
          else {
            return '-'
          }
        },
        grpTogle() {
          this.RequirePlan(Number(this.selectedTab))
        },
        getDate() {
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
          return {h,m,day};
        },
        RequirePlan(day) {
          if (this.OnlinePlanJson != null) {
            switch (day) {
              case 1:
                this.TodayPlanOnline = this.OnlinePlanJson[0];
              break;
              case 2:
                this.TodayPlanOnline = this.OnlinePlanJson[1];
              break;
              case 3:
                this.TodayPlanOnline = this.OnlinePlanJson[2];
              break;
              case 4:
                this.TodayPlanOnline = this.OnlinePlanJson[3];
              break;
              case 5:
                this.TodayPlanOnline = this.OnlinePlanJson[4];
              break;
              default:
                this.TodayPlanOnline = this.OnlinePlanJson[0];
              break;
            }

            this.TodayPlanOnline = this.TodayPlanOnline.map( (e,i) => {
                return {
                  g1:e.lessons.g1,
                  g2:e.lessons.g2,
                  i:i
                }
            })

          }
        },
        PrintPlan(m, me, x1, x2, day, h) {
          function TimeTest (m, me, x1, x2) {
            if (m < me) {
              return x1
            }
            else if (m >= me) {
              return x2
            }
          }
          this.NrLek = TimeTest(m, me, x1, x2)-1;
        },
        Initial () {
          var getDate = this.getDate()
          var h = getDate.h
          var m = getDate.m
          var day = this.DayData

          this.RequirePlan(day)

          if (h == 8) {
            var me = 45; var x1 = 1; var x2 = 2
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 9) {
            var me = 40; var x1 = 2; var x2 = 3
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 10) {
            var me = 35; var x1 = 3; var x2 = 4
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 11) {
            var me = 30; var x1 = 4; var x2 = 5
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 12) {
            var me = 25; var x1 = 5; var x2 = 6
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 13) {
            var me = 20; var x1 = 6; var x2 = 7
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 14) {
            var me = 20; var x1 = 7; var x2 = 8
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 15) {
            var me = 15; var x1 = 8; var x2 = 8
            this.PrintPlan(m, me, x1, x2, day, h)
          }
        }

      },
      created () {
        this.Initial()
      }

    }
</script>
