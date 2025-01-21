import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { laporanskriningilpComponent } from './laporanskriningilp.component';

const routes: Routes = [
  {
    path: '',
    component: laporanskriningilpComponent,
    data: {
      title: 'Laporanskriningilp'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class laporanskriningilpRoutingModule { }
