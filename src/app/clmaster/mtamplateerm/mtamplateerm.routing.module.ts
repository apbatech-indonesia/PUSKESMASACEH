import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MtamplateermComponent } from './mtamplateerm.component';

const routes: Routes = [
  {
    path: '',
    component: MtamplateermComponent,
    data: {
      title: 'Mtamplate'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MtamplateRoutingModule { }
