import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  kasirradComponent } from './kasirrad.component';

const routes: Routes = [
  {
    path: '',
    component: kasirradComponent,
    data: {
      title: 'kasirrad'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  kasirradRoutingModule { }
