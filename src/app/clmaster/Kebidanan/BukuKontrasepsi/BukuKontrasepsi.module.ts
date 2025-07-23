import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BukuKontrasepsiComponent } from './BukuKontrasepsi.component';
import { BukuKontrasepsiRoutingModule } from './BukuKontrasepsi-routing.module';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    BukuKontrasepsiRoutingModule,
    
    NgSelectModule,
    NgMultiSelectDropDownModule,
    MatPaginatorModule,
  ],
  declarations: [BukuKontrasepsiComponent],
  exports: [BukuKontrasepsiComponent]
})
export class BukuKontrasepsiModule { }
