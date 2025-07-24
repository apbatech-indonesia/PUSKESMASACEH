import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { satusehatAncComponent } from "./satusehat-anc.component";

const routes: Routes = [
  {
    path: "",
    component: satusehatAncComponent,
    data: {
      title: "satusehatAnc",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class satusehatAncRoutingModule {}
