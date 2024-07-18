import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { laporanrmComponent } from './laporanrm.component';

const routes: Routes = [
  {
    path: '',
    component: laporanrmComponent,
    data: {
      title: 'laporanrm'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class laporanrmRoutingModule { }
