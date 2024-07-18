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
import {  ermdokterComponent } from './ermdokter.component';
import { ermdokterRoutingModule } from './ermdokter-routing.module';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,
    MatDatepickerModule,
    CurrencyMaskModule,
    NgbModule,
    AngularEditorModule,
    FontAwesomeModule,
    TextareaAutosizeModule,
    ermdokterRoutingModule,
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
  declarations: [ermdokterComponent]
})
export class ermdokterModule { }
