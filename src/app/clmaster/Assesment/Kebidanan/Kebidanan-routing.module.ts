import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KebidananComponent } from './Kebidanan.component';

const routes: Routes = [
  {
    path: '',
    component: KebidananComponent,
    data: {
      title: 'Kebidanan'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class KebidananRoutingModule { }






