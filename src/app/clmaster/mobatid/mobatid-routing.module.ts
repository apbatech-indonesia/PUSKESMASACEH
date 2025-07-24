import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  MobatidComponent } from './mobatid.component';

const routes: Routes = [
  {
    path: '',
    component: MobatidComponent,
    data: {
      title: 'mobatid',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobatidRoutingModule { }




