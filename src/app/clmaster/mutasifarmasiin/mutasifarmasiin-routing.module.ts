import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {mutasifarmasiinComponent } from './mutasifarmasiin.component';

const routes: Routes = [
  {
    path: '',
    component: mutasifarmasiinComponent,
    data: {
      title: 'mutasifarmasiin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  mutasifarmasiinRoutingModule { }
