import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { satusehatMtbmComponent } from './satusehat-mtbm.component';

const routes: Routes = [
  {
    path: '',
    component: satusehatMtbmComponent,
    data: {
      title: 'satusehatMtbm'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  satusehatMtbmRoutingModule { }
