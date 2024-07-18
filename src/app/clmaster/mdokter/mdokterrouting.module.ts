import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MdokterComponent } from './mdokter.component';

const routes: Routes = [
  {
    path: '',
    component: MdokterComponent,
    data: {
      title: 'mdokter'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MdokterRoutingModule { }
