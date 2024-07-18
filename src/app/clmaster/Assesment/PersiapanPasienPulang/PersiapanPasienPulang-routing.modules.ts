import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersiapanPasienPulangComponent } from './PersiapanPasienPulang.component';

const routes: Routes = [
  {
    path: '',
    component: PersiapanPasienPulangComponent,
    data: {
      title: 'PersiapanPasienPulang'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PersiapanPasienPulangRoutingModule { }






