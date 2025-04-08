import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { satusehatKmpComponent } from './satusehat-kmp.component';

const routes: Routes = [
  {
    path: '',
    component: satusehatKmpComponent,
    data: {
      title: 'ermdokterrm'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class satusehatKmpRoutingModule { }
