import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { assperawatComponent } from './assperawat.component';

const routes: Routes = [
  {
    path: '',
    component: assperawatComponent,
    data: {
      title: 'assperawat'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class assperawatRoutingModule { }
