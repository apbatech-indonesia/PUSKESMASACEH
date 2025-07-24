import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { satusehatImunisasiComponent } from "./satusehat-imunisasi.component";

const routes: Routes = [
  {
    path: "",
    component: satusehatImunisasiComponent,
    data: {
      title: "ermdokterrm",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class satusehatImunisasiRoutingModule {}
