import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {   verifmobileComponent } from './verifmobile.component';

const routes: Routes = [
  {
    path: '',
    component: verifmobileComponent,
    data: {
      title: 'verifmobile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  verifmobileRoutingModule { }
