import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KunjunganBumilComponent } from './KunjunganBumil.component';

const routes: Routes = [
  {
    path: '',
    component: KunjunganBumilComponent,
    data: {
      title: 'KunjunganBumil'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KunjunganBumilRoutingModule { }
