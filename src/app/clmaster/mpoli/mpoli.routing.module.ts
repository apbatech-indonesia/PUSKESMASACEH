import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MpoliComponent } from './mpoli.component';

const routes: Routes = [
  {
    path: '',
    component: MpoliComponent,
    data: {
      title: 'Mpoli',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MpoliRoutingModule { }




