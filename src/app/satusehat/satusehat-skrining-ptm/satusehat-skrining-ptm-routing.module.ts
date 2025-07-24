import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { satusehatSkriningPtmComponent } from './satusehat-skrining-ptm.component';

const routes: Routes = [
  {
    path: '',
    component: satusehatSkriningPtmComponent,
    data: {
      title: 'ermdokterrm'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class satusehatSkriningPtmRoutingModule { }



