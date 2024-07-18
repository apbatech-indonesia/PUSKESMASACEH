import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  bayarpiutangrjComponent } from './bayarpiutangrj.component';

const routes: Routes = [
  {
    path: '',
    component: bayarpiutangrjComponent,
    data: {
      title: 'bayarpiutangrj'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  bayarpiutangrjRoutingModule { }
