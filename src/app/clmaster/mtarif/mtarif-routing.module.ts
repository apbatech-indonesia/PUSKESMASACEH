import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MtarifComponent } from './mtarif.component';

const routes: Routes = [
  {
    path: '',
    component: MtarifComponent,
    data: {
      title: 'mtarif'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  MtarifRoutingModule { }
