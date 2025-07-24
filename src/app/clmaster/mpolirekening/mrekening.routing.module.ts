import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MrekeningComponent } from './mrekening.component';

const routes: Routes = [
  {
    path: '',
    component: MrekeningComponent,
    data: {
      title: 'mrekening',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MrekeningRoutingModule { }




