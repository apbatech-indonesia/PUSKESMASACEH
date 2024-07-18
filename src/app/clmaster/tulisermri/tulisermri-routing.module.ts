import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { tulisermriComponent } from './tulisermri.component';

const routes: Routes = [
  {
    path: '',
    component: tulisermriComponent,
    data: {
      title: 'tulisermri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  tulisermriRoutingModule { }
