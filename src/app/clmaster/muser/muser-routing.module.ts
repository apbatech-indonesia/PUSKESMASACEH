import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuserComponent } from './muser.component';

const routes: Routes = [
  {
    path: '',
    component: MuserComponent,
    data: {
      title: 'Muser',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuserRoutingModule { }




