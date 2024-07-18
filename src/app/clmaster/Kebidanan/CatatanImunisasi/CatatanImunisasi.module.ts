import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatatanImunisasiComponent } from './CatatanImunisasi.component';
import { CatatanImunisasiRoutingModule } from './CatatanImunisasi-routing.module';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    CatatanImunisasiRoutingModule,
    
    NgSelectModule,
    NgMultiSelectDropDownModule,
    MatPaginatorModule,
  ],
  declarations: [CatatanImunisasiComponent]
})
export class CatatanImunisasiModule { }
