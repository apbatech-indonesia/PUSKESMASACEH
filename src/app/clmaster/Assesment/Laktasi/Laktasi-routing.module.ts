import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LaktasiComponent } from './Laktasi.component';

const routes: Routes = [
  {
    path: '',
    component: LaktasiComponent,
    data: {
      title: 'Laktasi'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LaktasiRoutingModule { }






