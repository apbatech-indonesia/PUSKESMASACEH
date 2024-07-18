import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  ermdisplayComponent } from './ermdisplay.component';

const routes: Routes = [
  {
    path: '',
    component: ermdisplayComponent,
    data: {
      title: 'ermdisplay'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ermdisplayRoutingModule { }
