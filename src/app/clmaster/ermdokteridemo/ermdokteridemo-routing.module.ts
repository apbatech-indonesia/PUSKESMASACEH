import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import {  ermdokterComponent } from './ermdokter.component';
import { ermdokteridemoComponent } from "./ermdokteridemo.component";

const routes: Routes = [
  {
    path: "",
    component: ermdokteridemoComponent,
    data: {
      title: "ermdokteridemo",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ermdokteridemoRoutingModule {}
