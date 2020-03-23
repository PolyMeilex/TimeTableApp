import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

import { LocalStorage, Notify, LoadingBar } from "quasar";

import { PlanJSON, Time } from "./types";

@Module({ namespaced: true, name: "plan" })
class Plan extends VuexModule {
  planJSON: PlanJSON | null = null;

  @Mutation
  public setPlanJSON(newPlan: PlanJSON): void {
    this.planJSON = newPlan;
    LocalStorage.set("plan/planJSON", newPlan);
  }

  @Mutation
  public initLocalStorage(): void {
    const planJSON: PlanJSON | null = LocalStorage.getItem("plan/planJSON");

    if (planJSON) {
      this.planJSON = planJSON;
    }
  }

  a: boolean = false;
  @Mutation
  public test(): void {
    this.a = !this.a;
  }

  @Action
  public downloadPlan(payload: any): void {
    LoadingBar.start();

    fetch(
      `https://codenomik.ekonomikzamosc.pl/api/ekolib/index_v2.php?planId=${payload.planId}&planType=${payload.planType}`
    )
      .then(response => response.json())
      .then(response => {
        // Convert time in string to Time Obj
        response.days = response.days.map((day: any) => {
          day.hours = day.hours.map((hour: any) => {
            let rawStart: string[] = hour.start.split(":");
            let rawEnd: string[] = hour.end.split(":");

            let start: Time = {
              str: hour.start,
              h: parseInt(rawStart[0]),
              m: parseInt(rawStart[1])
            };
            let end: Time = {
              str: hour.end,
              h: parseInt(rawEnd[0]),
              m: parseInt(rawEnd[1])
            };

            hour.start = start;
            hour.end = end;

            let hourKey = uuidv4();

            hour.lessons = hour.lessons.map((l: any) => {
              if (hour.splited) {
                l.key = uuidv4();
              } else {
                l.key = hourKey;
              }
              return l;
            });

            return hour;
          });
          return day;
        });

        if (this.planJSON) {
          if (response.generated != this.planJSON.generated) {
            Notify.create({
              type: "positive",
              message: "Pobrano nowy plan: " + response.generated
            });
          } else {
            Notify.create({
              type: "gray",
              message: "Plan jest już aktualny: " + response.generated
            });
          }
        } else {
          Notify.create({
            type: "positive",
            message: "Pobrano plan: " + response.generated
          });
        }

        this.context.commit("setPlanJSON", response);

        LoadingBar.stop();
      })
      .catch(e => LoadingBar.stop());
  }
}

function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default Plan;
