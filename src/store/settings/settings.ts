import { VuexModule, Module, Mutation } from "vuex-module-decorators";

import { LocalStorage } from "quasar";

@Module({ namespaced: true, name: "settings" })
class Settings extends VuexModule {
  grp: 0 | 1 = 0;
  planId: number = 31;
  planLabel: string = "";
  planType: "o" | "n" | "s" = "o";

  @Mutation
  public setGrp(newGrp: 0 | 1): void {
    this.grp = newGrp;
    LocalStorage.set("settings/grp", newGrp);
  }

  @Mutation
  public setPlanId(newId: number): void {
    this.planId = newId;
    LocalStorage.set("settings/planId", newId);
  }

  @Mutation
  public setPlanLabel(newLabel: string): void {
    this.planLabel = newLabel;
    LocalStorage.set("settings/planLabel", newLabel);
  }

  @Mutation
  public setPlanType(newType: "o" | "n" | "s"): void {
    this.planType = newType;
    LocalStorage.set("settings/planType", newType);
  }

  @Mutation
  public initLocalStorage(): void {
    const grp: number | null = LocalStorage.getItem("settings/grp");
    if (grp != null) {
      if (grp == 0 || grp == 1) {
        this.grp = grp;
      }
    }

    const planId: number | null = LocalStorage.getItem("settings/planId");
    if (planId) this.planId = planId;

    const planLabel: string | null = LocalStorage.getItem("settings/planLabel");
    if (planLabel) this.planLabel = planLabel;

    const planType: "o" | "n" | "s" | null = LocalStorage.getItem(
      "settings/planType"
    );
    if (planType) this.planType = planType;
  }
}

export default Settings;
