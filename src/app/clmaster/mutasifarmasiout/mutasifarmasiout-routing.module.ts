import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mutasifarmasioutComponent } from './mutasifarmasiout.component';

const routes: Routes = [
  {
    path: '',
    component: mutasifarmasioutComponent,
    data: {
      title: 'mutasifarmasiout'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  mutasifarmasioutRoutingModule { }
