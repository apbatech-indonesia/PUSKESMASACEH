import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { kasirfarmasibelirComponent } from './kasirfarmasibelir.component';

const routes: Routes = [
  {
    path: '',
    component: kasirfarmasibelirComponent,
    data: {
      title: 'kasirfarmasibelir'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  kasirfarmasibelirRoutingModule { }
