import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {   ermdokterrmComponent } from './ermdokterrm.component';

const routes: Routes = [
  {
    path: '',
    component: ermdokterrmComponent,
    data: {
      title: 'ermdokterrm'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ermdokterrmRoutingModule { }
