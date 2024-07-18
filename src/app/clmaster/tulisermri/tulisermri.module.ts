import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



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
import { LaddaModule } from 'angular2-ladda';
// import { PageTitleModule } from '../../../../Layout/Components/page-title/page-title.module';
import { PageTitleModule } from 'src/app/Layout/Components/page-title/page-title.module';
import {  tulisermriComponent } from './tulisermri.component';

import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { tulisermriRoutingModule } from './tulisermri-routing.module';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';

import {TreeModule} from 'primeng/tree'
import {ButtonModule} from 'primeng/button';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    LaddaModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,
    MatDatepickerModule,
    CurrencyMaskModule,
    NgbModule,
    AngularEditorModule,
    FontAwesomeModule,
    AngularSignaturePadModule,
    TextareaAutosizeModule,
    tulisermriRoutingModule,
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
     TreeModule,
    ButtonModule,
    NgApexchartsModule
  ],
  declarations: [tulisermriComponent]
})
export class tulisermriModule { }
