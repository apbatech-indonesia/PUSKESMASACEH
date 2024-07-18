import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { kasirriComponent } from './kasirri.component';

const routes: Routes = [
  {
    path: '',
    component: kasirriComponent,
    data: {
      title: 'kasirri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  kasirriRoutingModule { }
