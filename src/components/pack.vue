<template>
  <div id="Main">
    <div>
      <transition
      appear
      name="test"
      mode="out-in"
      >
        <div :key="trans" >

          <transition-group
          leave-active-class="animated bounceOutRight"
          mode="out-in"
          >
            <q-card color="dark" v-for="lek in TodayPlanOnline" :key="GetDataToDisplay(lek,GrpDis).ln" v-touch-hold:300=" (e) => SwipeHandler(e,lek)">
              <q-card-title class="noClicks">
                {{GetDataToDisplay(lek,GrpDis).ln}}
              </q-card-title>
            </q-card>
          </transition-group>

        </div>
      </transition>
    </div>

  </div>
</template>



<script>
    import {
      QCard,
      QCardTitle,
      QCardMain,
      TouchHold
    } from 'quasar'

    export default {
      directives: {
        TouchHold
      },
      name: 'index',
      props: ['GrpDis','OnlinePlanJson'],
      components: {
        QCard,
        QCardTitle,
        QCardMain
      },
      data () {
        return {
          TodayPlanOnline:null,
          trans: false
        }
      },
      watch: {
        GrpDis: function () {
          this.trans = !this.trans
        }
      },
      methods: {
        SwipeHandler(e,lek){
          let index = this.TodayPlanOnline.indexOf(lek);
          this.TodayPlanOnline.splice(index,1)
        },
        GetDataToDisplay(lek,grp){
          if (grp == 1) {
            return lek.g1;
          }
          else if (grp ==2) {
            return lek.g2;
          }
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

            this.TodayPlanOnline = this.TodayPlanOnline.map( (lek,i) => {
                return {
                  g1:lek.g1,
                  g2:lek.g2,
                  i:i
                }
            })

          }
        },
        Initial () {
          let d = new Date()
          let h = d.getHours()
          let m = d.getMinutes()
          let day = d.getDay()

          this.RequirePlan(day)
        }

      },
      created () {
        this.Initial()
      }

    }
</script>


<style scoped>
  #Main{
    overflow: hidden;
  }
  .noClicks {
    pointer-events: none;
  }
</style>
