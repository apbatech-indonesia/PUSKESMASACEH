import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { obatComponent } from './obat.component';


const routes: Routes = [
  {
    path: '',
    component: obatComponent,
    data: {
      title: 'berita'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class obatRoutingModule { }
