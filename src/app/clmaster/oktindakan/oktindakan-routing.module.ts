import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { oktindakanComponent } from './oktindakan.component';

const routes: Routes = [
  {
    path: '',
    component: oktindakanComponent,
    data: {
      title: 'oktindakan'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class oktindakanRoutingModule { }
