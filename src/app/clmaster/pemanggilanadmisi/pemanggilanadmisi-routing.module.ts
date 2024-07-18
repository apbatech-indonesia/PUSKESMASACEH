import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {   pemanggilanadmisiComponent } from './pemanggilanadmisi.component';

const routes: Routes = [
  {
    path: '',
    component: pemanggilanadmisiComponent,
    data: {
      title: 'pemanggilanadmisi'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  pemanggilanadmisiRoutingModule { }
