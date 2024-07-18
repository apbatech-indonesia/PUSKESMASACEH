import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CetakComponent } from './Cetak.component';

const routes: Routes = [
  {
    path: '',
    component: CetakComponent,
    data: {
      title: 'MnjObat Cetak ObatMinta'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CetakRoutingModule { }






