import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
// import { PageTitleModule } from '../../../../Layout/Components/page-title/page-title.module';
import { PageTitleModule } from 'src/app/Layout/Components/page-title/page-title.module';
import {  mpdaftarpasienriComponent } from './mpdaftarpasienri.component';
import { mpdaftarpasienriRoutingModule } from './mpdaftarpasienri-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { MatDatepickerModule } from '@angular/material/datepicker';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({
  imports: [
    NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    
    CommonModule,
    mpdaftarpasienriRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatDatepickerModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCardModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    PageTitleModule,
    
  ],
  declarations: [mpdaftarpasienriComponent]
})
export class mpdaftarpasienriModule { }
