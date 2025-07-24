import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { kasirfarmasijualComponent } from "./kasirfarmasijual.component";

const routes: Routes = [
  {
    path: "",
    component: kasirfarmasijualComponent,
    data: {
      title: "kasirfarmasijual",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class kasirfarmasijualRoutingModule {}
