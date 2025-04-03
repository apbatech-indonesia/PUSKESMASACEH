import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { satusehatIncComponent } from './satusehat-inc.component';

const routes: Routes = [
  {
    path: '',
    component: satusehatIncComponent,
    data: {
      title: 'ermdokterrm'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class satusehatIncRoutingModule { }
