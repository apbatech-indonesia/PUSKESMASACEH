import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobatComponent } from './mobat.component';

const routes: Routes = [
  {
    path: '',
    component: MobatComponent,
    data: {
      title: 'mobat'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobatRoutingModule { }
