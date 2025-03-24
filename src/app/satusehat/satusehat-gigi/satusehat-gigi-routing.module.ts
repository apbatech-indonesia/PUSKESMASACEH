import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { satusehatGigiComponent } from "./satusehat-gigi.component";

const routes: Routes = [
  {
    path: "",
    component: satusehatGigiComponent,
    data: {
      title: "ermdokterrm",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class satusehatGigiRoutingModule {}
