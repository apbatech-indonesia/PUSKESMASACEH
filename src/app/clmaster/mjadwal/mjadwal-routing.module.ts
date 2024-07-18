import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mjadwalComponent } from './mjadwal.component';


const routes: Routes = [
  {
    path: '',
    component: mjadwalComponent,
    data: {
      title: 'mjadwal'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class mjadwalRoutingModule { }
