import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  mpdaftarpasienriComponent } from './mpdaftarpasienri.component';

const routes: Routes = [
  {
    path: '',
    component: mpdaftarpasienriComponent,
    data: {
      title: 'mpdaftarpasienri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class mpdaftarpasienriRoutingModule { }
