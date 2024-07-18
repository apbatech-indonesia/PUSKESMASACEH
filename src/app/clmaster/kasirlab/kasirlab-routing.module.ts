import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { kasirlabComponent } from './kasirlab.component';

const routes: Routes = [
  {
    path: '',
    component: kasirlabComponent,
    data: {
      title: 'kasirlab'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  kasirlabRoutingModule { }
