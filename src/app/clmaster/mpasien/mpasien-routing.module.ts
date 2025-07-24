import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MpasienComponent } from './mpasien.component';

const routes: Routes = [
  {
    path: '',
    component: MpasienComponent,
    data: {
      title: 'mpasien',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MpasienRoutingModule { }




