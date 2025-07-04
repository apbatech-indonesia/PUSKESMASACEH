import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { satusehatMtbsComponent } from './satusehat-mtbs.component';

const routes: Routes = [
  {
    path: '',
    component: satusehatMtbsComponent,
    data: {
      title: 'satusehatMtbs'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  satusehatMtbsRoutingModule { }
