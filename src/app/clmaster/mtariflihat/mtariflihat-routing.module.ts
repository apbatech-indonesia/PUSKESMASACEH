import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mtariflihatComponent } from './mtariflihat.component';

const routes: Routes = [
  {
    path: '',
    component: mtariflihatComponent,
    data: {
      title: 'mtariflihat',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class mtariflihatRoutingModule { }




