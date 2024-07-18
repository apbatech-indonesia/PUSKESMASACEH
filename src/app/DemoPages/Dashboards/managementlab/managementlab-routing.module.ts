import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementlabComponent } from './managementlab.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementlabComponent,
    data: {
      title: 'Managementlab'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementlabRoutingModule { }
