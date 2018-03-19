<template>
  <div style="overflow-x: hidden">
    <q-transition
    name="test"
    mode="out-in"
>

       <div :key="trans">
         <q-card color="dark" class="animated" :class="{shake: Dtriger}" v-if="TodayPlanOnline != null">

           <q-card-title>
             {{GetDataToDisplay(NrLek,GrpDis).l.ln}}
             <div slot="right" class="row items-center">
               <q-btn flat small round color="faded" @click="OpenSettings">
                 <q-icon name="settings" />
               </q-btn>
               {{TtD}}

             </div>

           </q-card-title>

           <q-card-main>
             <b>Sala: </b>{{GetDataToDisplay(NrLek,GrpDis).l.s}}
             <p class="text-faded">Dzwonek: {{GetDataToDisplay(NrLek,GrpDis).d}} : {{SecOffset}}s</p>

             <q-collapsible class="bg-primary" icon="warning" label="Zastępstwo" v-if="getZastsFtd() != null">
               <div>
                         <p><b>Opis:</b> {{getZastsFtd().Opis}}</p>
                         <p><b>Sala:</b> {{getZastsFtd().Sala}}</p>
                         <p><b>Grp:</b> {{getZastsFtd().Klasa}}</p>
                         <p><b>Nauczyciel:</b> {{getZastsFtd().Nauczyciel}}</p>
               </div>
             </q-collapsible>
           </q-card-main>




         </q-card>

        <q-card color="dark" v-if="TodayPlanOnline != null">

          <q-card-title>
            {{GetDataToDisplay(NrLek+1,GrpDis).l.ln}}
          </q-card-title>

          <q-card-main>
            <b>Sala: </b>{{GetDataToDisplay(NrLek+1,GrpDis).l.s}}
            <p class="text-faded">Dzwonek: {{GetDataToDisplay(NrLek+1,GrpDis).d}}</p>
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
      QTransition,
      Dialog,
      Alert,
      QBtn,
      QIcon,
      QCollapsible
    } from 'quasar'

    export default {
      name: 'index',
      props: ['GrpDis','SortedByDayArray','MDzwonki','OnlinePlanJson'],
      components: {
        QCard,
        QCardTitle,
        QCardMain,
        QTransition,
        QBtn,
        QIcon,
        QCollapsible
      },
      data () {
        return {
          TodayPlanOnline:null,
          LekcjaOBJ:null,
          show: true,
          NazwaLek: '-',
          SalaLek: '-',
          NazwaLekNext: '-',
          DzwonekLek: '-',
          SalaLekNext: '-',
          NrLek: 0,
          TtD:0,
          Dtriger:false,
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
        GetDataToDisplay(lekNr,grp){
          // this.DzwonekLek = this.MDzwonki[lekNr];
          if (lekNr<8) {
            if (grp == 1) {
              return {
                l:this.TodayPlanOnline[lekNr].g1,
                d:this.MDzwonki[lekNr]
              }
            }
            else if (grp ==2) {
              return {
                l:this.TodayPlanOnline[lekNr].g2,
                d:this.MDzwonki[lekNr]
              }
            }
          }
          else {
              return{
                l:{
                  ln:"-",
                  s:"-"
                },
                d:"-"
              }
          }

        },
        getZastsFtd(){
          function isItDay(element) {
            let date = new Date();
            let day = date.getDay();
            return element.d == day;
          }
          let DayArray = this.SortedByDayArray.find(isItDay)


          if (DayArray != null) {
            let ZastArray = DayArray.e.zast;
            let test = ZastArray.find((element) => {
              return element.NrLekcji-1 == this.NrLek & element.Grp==this.GrpDis || element.NrLekcji-1 == this.NrLek & element.Grp==0;
            })
            return test;
          }
          else{
            return null
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

            if (auto==false) {
              let a1 = Alert.create({
                color: 'positive',
                position: 'bottom-left',
                enter: 'fadeIn',
                leave: 'fadeOut',
                html: "Ustawiono: "+this.SecOffset+"s"
              })
              setTimeout(function () {
                a1.dismiss()
              }, 2000);
            }



          })


        },
        OpenSettings () {
          function secondsToTime(secs)
          {
              secs = Math.round(secs);
              var hours = Math.floor(secs / (60 * 60));

              var divisor_for_minutes = secs % (60 * 60);
              var minutes = Math.floor(divisor_for_minutes / 60);

              var divisor_for_seconds = divisor_for_minutes % 60;
              var seconds = Math.ceil(divisor_for_seconds);

              var obj = {
                  "h": hours,
                  "m": minutes,
                  "s": seconds
              };
              return obj;
          }

          let time = secondsToTime(this.SecOffset);

          Dialog.create({
            title: 'Kalibracja',
            message: 'Wpisz ile śpieszy się dzwonek',
            form: {
              oS: {
                type: 'number',
                label: 'Sekundy',
                model: time.s
              },
              oM: {
                type: 'number',
                label: 'Minuty',
                model: time.m
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

                  if (data.oS) {
                    if (data.oM) {
                      this.SecOffset = data.oM * 60 + data.oS;
                    }
                    else {
                      this.SecOffset = data.oS;
                    }
                  }
                  else if(data.oM){
                    this.SecOffset = data.oM * 60;
                  }


                  let a2 = Alert.create({
                    color: 'positive',
                    position: 'bottom-left',
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
        RequirePlan(day) {
          if (this.OnlinePlanJson != null) {
            switch (day) {
              case 1:
                this.TodayPlanOnline = this.OnlinePlanJson.Po;
              break;
              case 2:
                this.TodayPlanOnline = this.OnlinePlanJson.Wt;
              break;
              case 3:
                this.TodayPlanOnline = this.OnlinePlanJson.Si;
              break;
              case 4:
                this.TodayPlanOnline = this.OnlinePlanJson.Cz;
              break;
              case 5:
                this.TodayPlanOnline = this.OnlinePlanJson.Pi;
              break;
              default:
                this.TodayPlanOnline = this.OnlinePlanJson.Po;
              break;
            }
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

          function msToTime(s) {
            let ms = s % 1000;
            s = (s - ms) / 1000;
            let secs = s % 60;
            s = (s - secs) / 60;
            let mins = s % 60;
            let hrs = (s - mins) / 60;

            return {hrs,mins,secs}
          }

          function formatTime(timeLeft) {
            let hrs = timeLeft.hrs
            let mins = timeLeft.mins
            let secs = timeLeft.secs

            if (hrs < 1) {
              if (mins < 1) {
                return secs + 's';
              }
              else {
                return mins + 'min ' + secs + 's';
              }
            }
            else {
              return hrs + 'h ' + mins + 'min ' + secs + 's';
            }
          }


          let NrLek = TimeTest(m, me, x1, x2)-1;

          this.NrLek = NrLek;

          let curDate = new Date();

          let DzTime = this.MDzwonki[NrLek].split(':');
          let DzDate = new Date();
          DzDate.setHours(DzTime[0])
          DzDate.setMinutes(DzTime[1])
          DzDate.setSeconds(this.SecOffset)



          let timeLeft = msToTime(DzDate.getTime() - curDate.getTime())
          this.TtD = formatTime(timeLeft);


        },
        Initial () {
          let d = new Date();
          let h = d.getHours();
          let m = d.getMinutes();
          let day = d.getDay();
          this.RequirePlan(day)

          if (h < 8) {
            let me = 0; let x1 = 1; let x2 = 1
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 8) {
            let me = 45; let x1 = 1; let x2 = 2
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 9) {
            let me = 40; let x1 = 2; let x2 = 3
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 10) {
            let me = 35; let x1 = 3; let x2 = 4
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 11) {
            let me = 30; let x1 = 4; let x2 = 5
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 12) {
            let me = 25; let x1 = 5; let x2 = 6
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 13) {
            let me = 20; let x1 = 6; let x2 = 7
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 14) {
            let me = 20; let x1 = 7; let x2 = 8
            this.PrintPlan(m, me, x1, x2, day, h)
          }
          else if (h == 15) {
            let me = 15; let x1 = 8; let x2 = 8
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
        if (localStorage.getItem('autoMode')=='true') {
          this.FetOffset(true)
        }

        this.Initial()
      },
      destroyed () {
        this.destroyed = true
      }
    }
</script>
