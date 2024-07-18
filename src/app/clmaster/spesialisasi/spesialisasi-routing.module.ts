import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  spesialisasiComponent } from './spesialisasi.component';

const routes: Routes = [
  {
    path: '',
    component: spesialisasiComponent,
    data: {
      title: 'spesialisasi'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class spesialisasiRoutingModule { }
