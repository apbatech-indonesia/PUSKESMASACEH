import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {promoComponent } from './promo.component';

const routes: Routes = [
  {
    path: '',
    component: promoComponent,
    data: {
      title: 'promo',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class promoRoutingModule { }




