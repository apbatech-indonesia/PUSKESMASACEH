import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  mkamarComponent } from './mkamar.component';

const routes: Routes = [
  {
    path: '',
    component: mkamarComponent,
    data: {
      title: 'mkamar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class mkamarRoutingModule { }
