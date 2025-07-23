import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterClenicProvinceComponent } from './master-clenic-province.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MasterClenicProvinceComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MasterClenicProvinceComponent
  ]
})
export class MasterClenicProvinceModule { }
