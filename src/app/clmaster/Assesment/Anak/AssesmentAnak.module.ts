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
import { PageTitleModule } from 'src/app/Layout/Components/page-title/page-title.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AssesmentAnakComponent } from './AssesmentAnak.component';
import { AssesmentAnakRoutingModule } from './AssesmentAnak-routing.modules';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    NgSelectModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    FontAwesomeModule,
    AngularSignaturePadModule,
    AssesmentAnakRoutingModule,
    FormsModule, ReactiveFormsModule,
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
  declarations: [AssesmentAnakComponent]
})

export class AssesmentAnakModule { }
