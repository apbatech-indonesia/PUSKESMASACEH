import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { returfarmasijualComponent } from "./returfarmasijual.component";

const routes: Routes = [
  {
    path: "",
    component: returfarmasijualComponent,
    data: {
      title: "returfarmasijual",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class returfarmasijualRoutingModule {}
