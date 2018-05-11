<template>
  <div style="overflow-x: hidden">

       <div>
         <q-card color="dark" class="animated" :class="{shake: Dtriger}" v-if="TodayPlanOnline != null">

           <q-card-title>
             {{GetDataToDisplay(NrLek,GrpDis).l.subject}}
             <div slot="right" class="row items-center">
               <q-btn flat small round color="faded" @click="OpenSettings">
                 <q-icon name="settings" />
               </q-btn>
               {{TtD}}

             </div>

           </q-card-title>

           <q-card-main>
             <b>Sala: </b>{{GetDataToDisplay(NrLek,GrpDis).l.room.name}}
             <p class="text-faded">Dzwonek: {{GetDataToDisplay(NrLek,GrpDis).d}}</p>

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
            {{GetDataToDisplay(NrLek+1,GrpDis).l.subject}}
          </q-card-title>

          <q-card-main>
            <b>Sala: </b>{{GetDataToDisplay(NrLek+1,GrpDis).l.room.name}}
            <p class="text-faded">Dzwonek: {{GetDataToDisplay(NrLek+1,GrpDis).d}}</p>
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
        QBtn,
        QIcon,
        QCollapsible
      },
      data () {
        return {
          TodayPlanOnline:null,
          LekcjaOBJ:null,
          NazwaLek: '-',
          SalaLek: '-',
          NazwaLekNext: '-',
          DzwonekLek: '-',
          SalaLekNext: '-',
          NrLek: 0,
          TtD:0,
          Dtriger:false,
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
          this.$emit('grpTrigger')
        }
      },
      methods: {
        GetDataToDisplay(lekNr,grp){
          // this.DzwonekLek = this.MDzwonki[lekNr];
          
          if (lekNr<8) {
            if (grp == 1) {
              return {
                l:this.TodayPlanOnline[lekNr].lessons.g1,
                d:this.MDzwonki[lekNr]
              }
            }
            else if (grp ==2) {
              return {
                l:this.TodayPlanOnline[lekNr].lessons.g2,
                d:this.MDzwonki[lekNr]
              }
            }
          }
          else {
              return{
                teacher: {
                  "name": "-",
                  "value": "0"
                },
                room: {
                  "name": "0",
                  "value": "0"
                },
                subject: "-"
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
        FetOffset(){
          fetch("https://planapp-f8adb.firebaseio.com/TimeOffset/.json")
          .then(response  => response.json())
          .then(response => this.SecOffset = response)
        },
        msToTime(s) {
          let ms = s % 1000;
          s = (s - ms) / 1000;
          let secs = s % 60;
          s = (s - secs) / 60;
          let mins = s % 60;
          let hrs = (s - mins) / 60;

          return {hrs,mins,secs}
        },
        OpenSettings () {
          let time = this.msToTime(this.SecOffset*1000)

          Dialog.create({
            title: 'Kalibracja',
            message: 'Wpisz ile śpieszy się dzwonek',
            form: {
              oS: {
                type: 'number',
                label: 'Sekundy',
                model: time.secs
              },
              oM: {
                type: 'number',
                label: 'Minuty',
                model: time.mins
              }
            },
            buttons: [
              'Cancel',
              {
                label: 'Pobierz',
                handler: (data) => {
                  localStorage.setItem('autoMode', true)
                  this.FetOffset()
                }
              },
              {
                label: 'Ok',
                handler: (data) => {
                  localStorage.setItem('autoMode', false)

                  if (data.oS == null) {data.oS = 0}
                  if (data.oM == null) {data.oM = 0}

                  this.SecOffset = data.oM * 60 + data.oS;

                  let nTime = this.msToTime(this.SecOffset*1000)

                  let a2 = Alert.create({
                    color: 'positive',
                    position: 'bottom-left',
                    enter: 'fadeIn',
                    leave: 'fadeOut',
                    html: `Ustawiono: ${nTime.hrs}h ${nTime.mins}m ${nTime.secs}s`
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


          let timeLeftMs = DzDate.getTime() - curDate.getTime()

          if (timeLeftMs > 2700000) {
            timeLeftMs-=2700000;
          }

          let timeLeft = this.msToTime(timeLeftMs)

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
