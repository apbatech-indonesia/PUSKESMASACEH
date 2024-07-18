import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssesmentAnakComponent } from './AssesmentAnak.component';

const routes: Routes = [
  {
    path: '',
    component: AssesmentAnakComponent,
    data: {
      title: 'Assesment Anak'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssesmentAnakRoutingModule { }






