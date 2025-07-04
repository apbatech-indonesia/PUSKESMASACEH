import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { satusehatGiziComponent } from './satusehat-gizi.component';

const routes: Routes = [
  {
    path: '',
    component: satusehatGiziComponent,
    data: {
      title: 'ermdokterrm'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  satusehatGiziRoutingModule { }
