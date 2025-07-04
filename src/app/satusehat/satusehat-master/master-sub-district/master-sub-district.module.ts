import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterSubDistrictComponent } from './master-sub-district.component';

@NgModule({
  declarations: [
    MasterSubDistrictComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MasterSubDistrictComponent
  ]
})
export class MasterSubDistrictModule { }
