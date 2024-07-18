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
import {   laporanfarmasiComponent } from './laporanfarmasi.component';
import {  llaporanfarmasiRoutingModule } from './laporanfarmasi.routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,
    llaporanfarmasiRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgSelectModule,
    NgbModule,
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
  declarations: [laporanfarmasiComponent]
})
export class laporanfarmasiModule { }
