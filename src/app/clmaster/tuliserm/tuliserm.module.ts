import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { LaddaModule } from "angular2-ladda";
// import { PageTitleModule } from '../../../../Layout/Components/page-title/page-title.module';
import { PageTitleModule } from "src/app/Layout/Components/page-title/page-title.module";
import { tulisermComponent } from "./tuliserm.component";

import { TextareaAutosizeModule } from "ngx-textarea-autosize";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { CurrencyMaskModule } from "ng2-currency-mask";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { tulisermRoutingModule } from "./tuliserm-routing.module";
import { AngularSignaturePadModule } from "@almothafar/angular-signature-pad";

import { TreeModule } from "primeng/tree";
import { ButtonModule } from "primeng/button";
import { NgApexchartsModule } from "ng-apexcharts";
import { skriningModule } from "../skrining/skrining.module";
import { KebidananModule } from "../Assesment/Kebidanan/Kebidanan.module";
import { PartografModule } from "../Assesment/Partograf/Partograf.module";
import { KajianperawatModule } from "../Assesment/kajianperawat/kajianperawat.module";
import { PersetujuanTindakanMedisModule } from "../Assesment/Medis/PersetujuanTindakanMedis.module";
import { KunjunganBumilModule } from "../Kebidanan/KunjunganBumil/KunjunganBumil.module";
import { CatatanImunisasiModule } from "../Kebidanan/CatatanImunisasi/CatatanImunisasi.module";
import { BukuKontrasepsiModule } from "../Kebidanan/BukuKontrasepsi/BukuKontrasepsi.module";
import { FormBalitaSakitModule } from "../Assesment/form-balita-sakit/form-balita-sakit.module";
import { MasterClenicDokterModule } from "../master/master-clenic-dokter/master-clenic-dokter.module";
import { FormAssessmentResikoJatuhModule } from "../Assesment/form-assessment-resiko-jatuh/form-assessment-resiko-jatuh.module";

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
    tulisermRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    NgApexchartsModule,
    skriningModule,
    KebidananModule,
    PartografModule,
    KajianperawatModule,
    PersetujuanTindakanMedisModule,
    KunjunganBumilModule,
    CatatanImunisasiModule,
    BukuKontrasepsiModule,
    FormBalitaSakitModule,
    FormAssessmentResikoJatuhModule,
    MasterClenicDokterModule,
  ],
  declarations: [tulisermComponent],
})
export class tulisermModule {}
