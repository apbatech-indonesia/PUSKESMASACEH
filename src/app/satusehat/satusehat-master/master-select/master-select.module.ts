import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterSelectComponent } from './master-select.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MasterSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MasterSelectComponent
  ]
})
export class MasterSelectModule { }
