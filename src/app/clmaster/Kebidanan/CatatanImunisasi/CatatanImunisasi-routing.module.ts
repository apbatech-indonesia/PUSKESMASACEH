import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatatanImunisasiComponent } from './CatatanImunisasi.component';

const routes: Routes = [
  {
    path: '',
    component: CatatanImunisasiComponent,
    data: {
      title: 'Kebidanan CatatanImunisasi'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatatanImunisasiRoutingModule { }
