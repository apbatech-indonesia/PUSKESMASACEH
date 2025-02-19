import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {skrininglaporanComponent } from './skrininglaporan.component';

const routes: Routes = [
  {
    path: '',
    component: skrininglaporanComponent,
    data: {
      title: 'skrininglaporan'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class skrininglaporanRoutingModule { }
