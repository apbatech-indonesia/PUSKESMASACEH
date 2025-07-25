import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ValidationComponent } from "./validation.component";

const routes: Routes = [
  {
    path: "",
    component: ValidationComponent,
    data: {
      title: "Validation",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationRoutingModule {}
