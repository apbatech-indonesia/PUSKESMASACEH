import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CetakComponent } from './Cetak.component';
import { CetakRoutingModule } from './Cetak-routing.modules';


@NgModule({
  imports: [
    CommonModule,
    CetakRoutingModule,
  ],
  declarations: [CetakComponent]
})

export class CetakModule { }
