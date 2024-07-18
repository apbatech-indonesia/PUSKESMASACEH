import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { tulisermkoreksiComponent } from './tulisermkoreksi.component';

const routes: Routes = [
  {
    path: '',
    component: tulisermkoreksiComponent,
    data: {
      title: 'tulisermkoreksi'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  tulisermkoreksiRoutingModule { }
