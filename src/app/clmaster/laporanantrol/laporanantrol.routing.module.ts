import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { laporanantrolComponent } from './laporanantrol.component';

const routes: Routes = [
  {
    path: '',
    component: laporanantrolComponent,
    data: {
      title: 'Laporanantrol'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaporanantrolRoutingModule { }
