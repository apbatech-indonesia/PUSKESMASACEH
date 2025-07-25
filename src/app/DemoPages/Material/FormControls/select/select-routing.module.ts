import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SelectComponent } from "./select.component";

const routes: Routes = [
  {
    path: "",
    component: SelectComponent,
    data: {
      title: "Select",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectRoutingModule {}
