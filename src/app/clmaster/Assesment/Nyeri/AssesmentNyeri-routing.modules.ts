import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssesmentNyeriComponent } from './AssesmentNyeri.component';

const routes: Routes = [
  {
    path: '',
    component: AssesmentNyeriComponent,
    data: {
      title: 'Assesment Nyeri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssesmentNyeriRoutingModule { }






