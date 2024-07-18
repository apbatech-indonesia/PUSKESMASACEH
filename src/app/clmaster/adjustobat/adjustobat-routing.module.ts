import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  adjustobatComponent } from './adjustobat.component';

const routes: Routes = [
  {
    path: '',
    component: adjustobatComponent,
    data: {
      title: 'adjustobat'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  adjustobatRoutingModule { }
