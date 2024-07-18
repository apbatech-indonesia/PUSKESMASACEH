import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  tulisermrmComponent } from './tulisermrm.component';

const routes: Routes = [
  {
    path: '',
    component: tulisermrmComponent,
    data: {
      title: 'tulisermrm'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  tulisermrmRoutingModule { }
