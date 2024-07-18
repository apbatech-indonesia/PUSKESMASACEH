import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersetujuanTindakanMedisComponent } from './PersetujuanTindakanMedis.component';

const routes: Routes = [
  {
    path: '',
    component: PersetujuanTindakanMedisComponent,
    data: {
      title: 'PersetujuanTindakanMedis'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PersetujuanTindakanMedisRoutingModule { }
