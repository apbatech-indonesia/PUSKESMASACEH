import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {glminiComponent } from './glmini.component';

const routes: Routes = [
  {
    path: '',
    component: glminiComponent,
    data: {
      title: 'glmini'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  glminiRoutingModule { }
