import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterSpecimenComponent } from './master-specimen.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MasterSpecimenComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MasterSpecimenComponent
  ]
})
export class MasterSpecimenModule { }
