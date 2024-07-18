import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { laporanlrComponent } from './laporanlr.component';

const routes: Routes = [
  {
    path: '',
    component: laporanlrComponent,
    data: {
      title: 'laporanlr'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class laporanlrRoutingModule { }
