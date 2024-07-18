import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KunjunganBumilComponent } from './KunjunganBumil.component';
import { KunjunganBumilRoutingModule } from './KunjunganBumil-routing.module';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    KunjunganBumilRoutingModule,
    
    NgSelectModule,
    NgMultiSelectDropDownModule,
    MatPaginatorModule,
  ],
  declarations: [KunjunganBumilComponent]
})
export class KunjunganBumilModule { }
