import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MpdaftarpasienComponent } from './mpdaftarpasien.component';

const routes: Routes = [
  {
    path: '',
    component: MpdaftarpasienComponent,
    data: {
      title: 'mpdaftarpasien'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MpdaftarpasienRoutingModule { }
