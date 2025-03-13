import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { satusehatPncComponent } from './satusehat-pnc.component';

const routes: Routes = [
  {
    path: '',
    component: satusehatPncComponent,
    data: {
      title: 'ermdokterrm'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class satusehatPncRoutingModule { }
