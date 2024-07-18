import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { kasirfarmasibeliComponent } from './kasirfarmasibeli.component';

const routes: Routes = [
  {
    path: '',
    component: kasirfarmasibeliComponent,
    data: {
      title: 'kasirfarmasibeli'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  kasirfarmasibeliRoutingModule { }
