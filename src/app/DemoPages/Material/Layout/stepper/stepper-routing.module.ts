import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StepperComponent } from "./stepper.component";

const routes: Routes = [
  {
    path: "",
    component: StepperComponent,
    data: {
      title: "Stepper",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepperRoutingModule {}
