import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {skriningComponent } from './skrining.component';

const routes: Routes = [
  {
    path: '',
    component: skriningComponent,
    data: {
      title: 'skrining'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class skriningRoutingModule { }
