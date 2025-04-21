import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { PageTitleModule } from "src/app/Layout/Components/page-title/page-title.module";
import { pkgRoutingModule } from "./pkg-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { pkgComponent } from "./pkg.component";
import { FormGiziComponent } from "./form/form-gizi/form-gizi.component";
import { ModalWrapperComponent } from "./components/modal-wrapper/modal-wrapper.component";
import { FormGiziPriaComponent } from "./form/form-gizi-pria/form-gizi-pria.component";
import { FormGiziWanitaComponent } from "./form/form-gizi-wanita/form-gizi-wanita.component";
import { FormDemografiWanitaComponent } from "./form/form-demografi-wanita/form-demografi-wanita.component";
import { FormDemografiPriaComponent } from "./form/form-demografi-pria/form-demografi-pria.component";
import { FormHatiComponent } from "./form/form-hati/form-hati.component";
import { FormLeherRahimComponent } from "./form/form-leher-rahim/form-leher-rahim.component";
import { FormKesehatanJiwaComponent } from "./form/form-kesehatan-jiwa/form-kesehatan-jiwa.component";
import { FormAktivitasFisikComponent } from "./form/form-aktivitas-fisik/form-aktivitas-fisik.component";
import { FormPerilakuMerokokComponent } from "./form/form-perilaku-merokok/form-perilaku-merokok.component";
import { FormTekananGulaComponent } from "./form/form-tekanan-gula/form-tekanan-gula.component";
import { FormTuberkulosisComponent } from "./form/form-tuberkulosis/form-tuberkulosis.component";
import { FormTekananDarahComponent } from "./form/form-tekanan-darah/form-tekanan-darah.component";
import { FormGulaDarahComponent } from "./form/form-skrining-gula-darah/form-skrining-gula-darah.component";
import { FormPpokPumaComponent } from "./form/form-ppok-puma/form-ppok-puma.component";
import { FormSputumTbcComponent } from "./form/form-sputum-tbc/form-sputum-tbc.component";
import { FormThoraxTbcComponent } from "./form/form-thorax-tbc/form-thorax-tbc.component";
import { FormSirosisHatiComponent } from "./form/form-sirosis-hati/form-sirosis-hati.component";
import { FormFungsiGinjalComponent } from "./form/form-fungsi-ginjal/form-fungsi-ginjal.component";
import { FormGulaDarahLanjutanGdpComponent } from "./form/form-gula-darah-lanjutan-gdp/form-gula-darah-lanjutan-gdp.component";
import { FormGulaDarahLanjutanHba1cComponent } from "./form/form-gula-darah-lanjutan-hba1c/form-gula-darah-lanjutan-hba1c.component";
import { FormHepatitisComponent } from "./form/form-hepatitis/form-hepatitis.component";
import { FormProfilLipidComponent } from "./form/form-profil-lipid/form-profil-lipid.component";
import { FormRisikoJantungStrokeComponent } from "./form/form-risiko-jantung-stroke/form-risiko-jantung-stroke.component";
import { FormRapidTestCapinComponent } from "./form/form-rapid-test-capin/form-rapid-test-capin.component";
import { FormMataTelingaComponent } from "./form/form-mata-telinga/form-mata-telinga.component";
import { FormKariesGigiHilangComponent } from "./form/form-karies-gigi-hilang/form-karies-gigi-hilang.component";
import { FormPeriodontalComponent } from "./form/form-periodontal/form-periodontal.component";
import { FormAbnormalitasJantungComponent } from "./form/form-abnormalitas-jantung/form-abnormalitas-jantung.component";
import { FormHasilEkgComponent } from "./form/form-hasil-ekg/form-hasil-ekg.component";
import { FormKankerPayudaraComponent } from "./form/form-kanker-payudara/form-kanker-payudara.component";
import { FormHpvDnaComponent } from "./form/form-hpv-dna/form-hpv-dna.component";
import { FormIvaComponent } from "./form/form-iva/form-iva.component";
import { AppModule } from "src/app/app.module";
import { FormTekananGulaDarahComponent } from './form/form-tekanan-gula-darah/form-tekanan-gula-darah.component';
import { FormTekananKankerUsusComponent } from './form/form-tekanan-kanker-usus/form-tekanan-kanker-usus.component';
import { FormKankerUsusComponent } from './form/form-kanker-usus/form-kanker-usus.component';
import { FormFotoThoraxComponent } from './form/form-foto-thorax/form-foto-thorax.component';
@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    pkgRoutingModule,
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
    AngularEditorModule,
    NgbAccordionModule,
    AppModule,
  ],
  declarations: [
    pkgComponent,
    ModalWrapperComponent,
    FormGiziComponent,
    FormGiziPriaComponent,
    FormGiziWanitaComponent,
    FormDemografiWanitaComponent,
    FormDemografiPriaComponent,
    FormHatiComponent,
    FormLeherRahimComponent,
    FormKesehatanJiwaComponent,
    FormAktivitasFisikComponent,
    FormPerilakuMerokokComponent,
    FormTekananGulaComponent,
    FormTuberkulosisComponent,
    FormTekananDarahComponent,
    FormGulaDarahComponent,
    FormPpokPumaComponent,
    FormSputumTbcComponent,
    FormThoraxTbcComponent,
    FormSirosisHatiComponent,
    FormFungsiGinjalComponent,
    FormGulaDarahLanjutanGdpComponent,
    FormGulaDarahLanjutanHba1cComponent,
    FormHepatitisComponent,
    FormProfilLipidComponent,
    FormRisikoJantungStrokeComponent,
    FormRapidTestCapinComponent,
    FormMataTelingaComponent,
    FormKariesGigiHilangComponent,
    FormPeriodontalComponent,
    FormAbnormalitasJantungComponent,
    FormHasilEkgComponent,
    FormKankerPayudaraComponent,
    FormHpvDnaComponent,
    FormIvaComponent,
    FormTekananGulaDarahComponent,
    FormTekananKankerUsusComponent,
    FormKankerUsusComponent,
    FormFotoThoraxComponent,
  ],
})
export class pkgModule {}
