import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {   perminobatriComponent } from './perminobatri.component';

const routes: Routes = [
  {
    path: '',
    component: perminobatriComponent,
    data: {
      title: 'perminobatri',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class perminobatriRoutingModule { }




