import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { laporanlabComponent } from './laporanlab.component';

const routes: Routes = [
  {
    path: '',
    component: laporanlabComponent,
    data: {
      title: 'laporanlab'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class laporanlabRoutingModule { }
