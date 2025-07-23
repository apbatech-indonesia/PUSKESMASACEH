import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterClenicDistrictComponent } from './master-clenic-district.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MasterClenicDistrictComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MasterClenicDistrictComponent
  ]
})
export class MasterClenicDistrictModule { }
