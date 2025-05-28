import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgReduxModule } from "@angular-redux/store";
import { NgRedux, DevToolsExtension } from "@angular-redux/store";
import { rootReducer, ArchitectUIState } from "./ThemeOptions/store";
import { ConfigActions } from "./ThemeOptions/store/config.actions";
import { AppRoutingModule } from "./app-routing.module";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";

import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";

// BOOTSTRAP COMPONENTS

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { LaddaModule } from "angular2-ladda";
import { NgxLoadingModule } from "ngx-loading";
import { RoundProgressModule } from "angular-svg-round-progressbar";
// import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import { ToastrModule } from "ngx-toastr";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
// import { CountUpModule } from 'countup.js-angular2';
import { AgmCoreModule } from "@agm/core";
import { ImageCropperModule } from "ngx-image-cropper";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { NouisliderModule } from "ng2-nouislider";
import { NgSelectModule } from "@ng-select/ng-select";
// import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { AngularEditorModule } from "@kolkov/angular-editor";
// import { TextMaskModule } from 'angular2-text-mask';
import { ClipboardModule } from "ngx-clipboard";
import { TextareaAutosizeModule } from "ngx-textarea-autosize";
import { ColorPickerModule } from "ngx-color-picker";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { DROPZONE_CONFIG } from "ngx-dropzone-wrapper";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { ChartsModule } from "ng2-charts";
import { CurrencyMaskModule } from "ng2-currency-mask";
// import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
// ANGULAR MATERIAL COMPONENTS

import { MatCheckboxModule } from "@angular/material/checkbox";

// LAYOUT

import { BaseLayoutComponent } from "./Layout/base-layout/base-layout.component";
import { AppsLayoutComponent } from "./Layout/apps-layout/apps-layout.component";
import { PagesLayoutComponent } from "./Layout/pages-layout/pages-layout.component";
import { ThemeOptions } from "./theme-options";
import { OptionsDrawerComponent } from "./ThemeOptions/options-drawer/options-drawer.component";
// import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';

// HEADER

import { HeaderComponent } from "./Layout/Components/header/header.component";
import { DotsComponent } from "./Layout/Components/header/elements/dots/dots.component";
import { SearchBoxComponent } from "./Layout/Components/header/elements/search-box/search-box.component";
import { MegamenuComponent } from "./Layout/Components/header/elements/mega-menu/mega-menu.component";
import { MegapopoverComponent } from "./Layout/Components/header/elements/mega-menu/elements/megapopover/megapopover.component";
import { UserBoxComponent } from "./Layout/Components/header/elements/user-box/user-box.component";
import { DrawerComponent } from "./Layout/Components/header/elements/drawer/drawer.component";

// SIDEBAR

import { SidebarComponent } from "./Layout/Components/sidebar/sidebar.component";
import { LogoComponent } from "./Layout/Components/sidebar/elements/logo/logo.component";

// FOOTER

import { FooterComponent } from "./Layout/Components/footer/footer.component";
import { FooterDotsComponent } from "./Layout/Components/footer/elements/footer-dots/footer-dots.component";
import { FooterMenuComponent } from "./Layout/Components/footer/elements/footer-menu/footer-menu.component";

// Pages

import { ForgotPasswordComponent } from "./DemoPages/UserPages/forgot-password/forgot-password.component";
import { ForgotPasswordBoxedComponent } from "./DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component";
import { LoginBoxedComponent } from "./DemoPages/UserPages/login-boxed/login-boxed.component";
import { LoginComponent } from "./DemoPages/UserPages/login/login.component";
import { RegisterBoxedComponent } from "./DemoPages/UserPages/register-boxed/register-boxed.component";
import { RegisterComponent } from "./DemoPages/UserPages/register/register.component";

// Components

import { NgbdSortableHeaderDirective } from "./DemoPages/Tables/dynamic/demo/sortable.directive";

// Apex Charts
import { NgApexchartsModule } from "ng-apexcharts";
// Gauges Charts

import { GaugeModule } from "angular-gauge";
import { TrendModule } from "ngx-trend";
import { MasukappComponent } from "./DemoPages/masukapp/masukapp.component";
import { LoginclComponent } from "./cllogin/logincl/logincl.component";

// Angular Material

import { ApiserviceService } from "./apiservice.service";
import { KosongComponent } from "./cllogin/kosong/kosong.component";
import { LoginGuard } from "./auth/login.guard";
import { WINDOW_PROVIDERS } from "./window.providers";
import { SampleService } from "./services";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { anjunganComponent } from "./cllogin/anjungan/anjungan.component";

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: "https://httpbin.org/post",
  maxFilesize: 50,
  acceptedFiles: "image/*",
};
import { AccordionModule } from "primeng/accordion";
import { ermdisplayComponent } from "./cllogin/ermdisplay/ermdisplay.component";
import { TreeModule } from "primeng/tree";
import { ButtonModule } from "primeng/button";
import { BukuKontrasepsiComponent } from "./clmaster/Kebidanan/BukuKontrasepsi/BukuKontrasepsi.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CatatanImunisasiComponent } from "./clmaster/Kebidanan/CatatanImunisasi/CatatanImunisasi.component";
import { KunjunganBumilComponent } from "./clmaster/Kebidanan/KunjunganBumil/KunjunganBumil.component";
import { KebidananComponent } from "./clmaster/Assesment/Kebidanan/Kebidanan.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { PartografComponent } from "./clmaster/Assesment/Partograf/Partograf.component";
import { tulisermriComponent } from "./clmaster/tulisermri/tulisermri.component";
import { AngularSignaturePadModule } from "@almothafar/angular-signature-pad";
import { PersetujuanTindakanMedisComponent } from "./clmaster/Assesment/Medis/PersetujuanTindakanMedis.component";
import { kajianperawatComponent } from "./clmaster/Assesment/kajianperawat/kajianperawat.component";
import { riwayatkunjunganComponent } from "./clmaster/Assesment/riwayatkunjungan/riwayatkunjungan.component";
import { anjungansehatComponent } from "./cllogin/anjungansehat/anjungansehat.component";
import { TulisAncComponent } from "./satusehat/satusehat-anc/form/tulis-anc.component";
import { TulisMtbmComponent } from "./satusehat/satusehat-mtbm/form/tulis-mtbm.component";
import { TulisMtbsComponent } from "./satusehat/satusehat-mtbs/form/tulis-mtbs.component";
import { TulisImunisasiComponent } from "./satusehat/satusehat-imunisasi/form/tulis-imunisasi.component";
import { TulisSkriningPtmComponent } from "./satusehat/satusehat-skrining-ptm/form/tulis-skrining-ptm.component";
import { MasterProvinceComponent } from "./satusehat/satusehat-master/master-province/master-province.component";
import { MasterCityComponent } from "./satusehat/satusehat-master/master-city/master-city.component";
import { MasterDistrictComponent } from "./satusehat/satusehat-master/master-district/master-district.component";
import { MasterSubDistrictComponent } from "./satusehat/satusehat-master/master-sub-district/master-sub-district.component";
import { MasterDiagnosaComponent } from "./satusehat/satusehat-master/master-diagnosa/master-diagnosa.component";
import { MasterTindakanComponent } from "./satusehat/satusehat-master/master-tindakan/master-tindakan.component";
import { MasterVaccineComponent } from "./satusehat/satusehat-master/master-vaccine/master-vaccine.component";
import { FormVaccineComponent } from "./satusehat/satusehat-imunisasi/form/form-vaccine/form-vaccine.component";
import { MasterSpecimenModule } from "./satusehat/satusehat-master/master-specimen/master-specimen.module";
import { TulisSatuSehatGiziComponent } from "./satusehat/satusehat-gizi/form/tulis-satusehat-gizi.component";
import { skriningComponent } from "./clmaster/skrining/skrining.component";
import { NgxYoutubePlayerModule } from "ngx-youtube-player";
import { TulisSatuSehatGigiComponent } from "./satusehat/satusehat-gigi/form/tulis-satusehat-gigi.component";
import { pkgComponent } from "./clmaster/pkg/pkg.component";
import { FormGiziComponent } from "./clmaster/pkg/form/form-gizi/form-gizi.component";
import { ModalWrapperComponent } from "./clmaster/pkg/components/modal-wrapper/modal-wrapper.component";
import { FormDemografiPriaComponent } from "./clmaster/pkg/form/form-demografi-pria/form-demografi-pria.component";
import { FormAbnormalitasJantungComponent } from "./clmaster/pkg/form/form-abnormalitas-jantung/form-abnormalitas-jantung.component";
import { FormAktivitasFisikComponent } from "./clmaster/pkg/form/form-aktivitas-fisik/form-aktivitas-fisik.component";
import { FormDemografiWanitaComponent } from "./clmaster/pkg/form/form-demografi-wanita/form-demografi-wanita.component";
import { FormIvaComponent } from "./clmaster/pkg/form/form-iva/form-iva.component";
import { FormHpvDnaComponent } from "./clmaster/pkg/form/form-hpv-dna/form-hpv-dna.component";
import { FormKankerPayudaraComponent } from "./clmaster/pkg/form/form-kanker-payudara/form-kanker-payudara.component";
import { FormHasilEkgComponent } from "./clmaster/pkg/form/form-hasil-ekg/form-hasil-ekg.component";
import { FormPeriodontalComponent } from "./clmaster/pkg/form/form-periodontal/form-periodontal.component";
import { FormKariesGigiHilangComponent } from "./clmaster/pkg/form/form-karies-gigi-hilang/form-karies-gigi-hilang.component";
import { FormMataTelingaComponent } from "./clmaster/pkg/form/form-mata-telinga/form-mata-telinga.component";
import { FormRapidTestCapinComponent } from "./clmaster/pkg/form/form-rapid-test-capin/form-rapid-test-capin.component";
import { FormRisikoJantungStrokeComponent } from "./clmaster/pkg/form/form-risiko-jantung-stroke/form-risiko-jantung-stroke.component";
import { FormProfilLipidComponent } from "./clmaster/pkg/form/form-profil-lipid/form-profil-lipid.component";
import { FormHepatitisComponent } from "./clmaster/pkg/form/form-hepatitis/form-hepatitis.component";
import { FormGulaDarahLanjutanHba1cComponent } from "./clmaster/pkg/form/form-gula-darah-lanjutan-hba1c/form-gula-darah-lanjutan-hba1c.component";
import { FormGulaDarahLanjutanGdpComponent } from "./clmaster/pkg/form/form-gula-darah-lanjutan-gdp/form-gula-darah-lanjutan-gdp.component";
import { FormFungsiGinjalComponent } from "./clmaster/pkg/form/form-fungsi-ginjal/form-fungsi-ginjal.component";
import { FormSirosisHatiComponent } from "./clmaster/pkg/form/form-sirosis-hati/form-sirosis-hati.component";
import { FormThoraxTbcComponent } from "./clmaster/pkg/form/form-thorax-tbc/form-thorax-tbc.component";
import { FormSputumTbcComponent } from "./clmaster/pkg/form/form-sputum-tbc/form-sputum-tbc.component";
import { FormPpokPumaComponent } from "./clmaster/pkg/form/form-ppok-puma/form-ppok-puma.component";
import { FormTekananDarahComponent } from "./clmaster/pkg/form/form-tekanan-darah/form-tekanan-darah.component";
import { FormTuberkulosisComponent } from "./clmaster/pkg/form/form-tuberkulosis/form-tuberkulosis.component";
import { FormTekananGulaComponent } from "./clmaster/pkg/form/form-tekanan-gula/form-tekanan-gula.component";
import { FormPerilakuMerokokComponent } from "./clmaster/pkg/form/form-perilaku-merokok/form-perilaku-merokok.component";
import { FormKesehatanJiwaComponent } from "./clmaster/pkg/form/form-kesehatan-jiwa/form-kesehatan-jiwa.component";
import { FormLeherRahimComponent } from "./clmaster/pkg/form/form-leher-rahim/form-leher-rahim.component";
import { FormHatiComponent } from "./clmaster/pkg/form/form-hati/form-hati.component";
import { FormGiziPriaComponent } from "./clmaster/pkg/form/form-gizi-pria/form-gizi-pria.component";
import { FormGiziWanitaComponent } from "./clmaster/pkg/form/form-gizi-wanita/form-gizi-wanita.component";
import { FormTekananGulaDarahComponent } from "./clmaster/pkg/form/form-tekanan-gula-darah/form-tekanan-gula-darah.component";
import { FormKankerUsusComponent } from "./clmaster/pkg/form/form-kanker-usus/form-kanker-usus.component";
import { FormSkriningGulaDarahComponent } from "./clmaster/pkg/form/form-skrining-gula-darah/form-skrining-gula-darah.component";
import { FormFotoThoraxComponent } from "./clmaster/pkg/form/form-foto-thorax/form-foto-thorax.component";
import { SkriningGiziPertumbuhanComponent } from "./clmaster/pkg/form/skrining-gizi-pertumbuhan/skrining-gizi-pertumbuhan.component";
import { SkriningMandiriTuberkulosisBayiComponent } from "./clmaster/pkg/form/skrining-mandiri-tumbuh-kembang-tuberkulosis-bayi/skrining-mandiri-tumbuh-kembang-tuberkulosis.component";
import { SkriningTumbuhKembangPerkembanganComponent } from "./clmaster/pkg/form/skrining-perkembangan/skrining-tumbuh-kembang-perkembangan.component";
import { SkriningGigiKariesComponent } from "./clmaster/pkg/form/skrining-gigi-karies/skrining-gigi-karies.component";
import { SkriningTumbuhKembangMataTelinga } from "./clmaster/pkg/form/skrining-tumbuh-kembang-mata-telinga/skrining-tumbuh-kembang-mata-telinga.component";
import { SkriningTuberkulosisComponent } from "./clmaster/pkg/form/skrining-tuberkulosis/skrining-tuberkulosis.component";
import { tulisermModule } from "./clmaster/tuliserm/tuliserm.module";

@NgModule({
  declarations: [
    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    AppsLayoutComponent,
    PagesLayoutComponent,
    OptionsDrawerComponent,
    ermdisplayComponent,

    // HEADER

    HeaderComponent,
    DotsComponent,
    SearchBoxComponent,
    MegamenuComponent,
    MegapopoverComponent,
    UserBoxComponent,
    DrawerComponent,

    // SIDEBAR

    SidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,
    FooterDotsComponent,
    FooterMenuComponent,

    // // User Pages

    ForgotPasswordComponent,
    ForgotPasswordBoxedComponent,
    LoginBoxedComponent,
    LoginComponent,
    RegisterBoxedComponent,
    RegisterComponent,

    // Tables
    NgbdSortableHeaderDirective,
    MasukappComponent,
    LoginclComponent,
    KosongComponent,
    anjunganComponent,
    anjungansehatComponent,
    BukuKontrasepsiComponent,
    CatatanImunisasiComponent,
    KunjunganBumilComponent,
    KebidananComponent,
    PartografComponent,
    tulisermriComponent,
    PersetujuanTindakanMedisComponent,
    kajianperawatComponent,
    riwayatkunjunganComponent,
    TulisAncComponent,
    TulisMtbmComponent,
    TulisMtbsComponent,
    TulisImunisasiComponent,
    TulisSkriningPtmComponent,
    TulisSatuSehatGiziComponent,
    TulisSatuSehatGigiComponent,
    MasterProvinceComponent,
    MasterCityComponent,
    MasterDistrictComponent,
    MasterSubDistrictComponent,
    MasterDiagnosaComponent,
    MasterTindakanComponent,
    MasterVaccineComponent,
    FormVaccineComponent,
    skriningComponent,
    pkgComponent,
    ModalWrapperComponent,
    FormAbnormalitasJantungComponent,
    FormAktivitasFisikComponent,
    FormGiziComponent,
    FormGiziPriaComponent,
    FormGiziWanitaComponent,
    FormDemografiWanitaComponent,
    FormKankerUsusComponent,
    FormDemografiPriaComponent,
    FormHatiComponent,
    FormTekananGulaDarahComponent,
    FormLeherRahimComponent,
    FormKesehatanJiwaComponent,
    FormPerilakuMerokokComponent,
    FormTekananGulaComponent,
    FormTuberkulosisComponent,
    FormTekananDarahComponent,
    FormSkriningGulaDarahComponent,
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
    FormHasilEkgComponent,
    FormFotoThoraxComponent,
    FormKankerPayudaraComponent,
    FormHpvDnaComponent,
    FormIvaComponent,
    SkriningGigiKariesComponent,
    SkriningGiziPertumbuhanComponent,
    SkriningMandiriTuberkulosisBayiComponent,
    SkriningTumbuhKembangPerkembanganComponent,
    SkriningTumbuhKembangMataTelinga,
    SkriningTuberkulosisComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    CurrencyMaskModule,
    AngularSignaturePadModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    // Angular Bootstrap Components
    PerfectScrollbarModule,
    NgbModule,
    FontAwesomeModule,
    LaddaModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    // NgxYoutubePlayerModule.forRoot(), // Tambahkan modul ini
    NgxLoadingModule.forRoot({}),
    RoundProgressModule,
    ToastrModule.forRoot(),
    SlickCarouselModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    // CountUpModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: "",
    }),
    ImageCropperModule,
    NouisliderModule,
    NgSelectModule,
    // SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    AngularEditorModule,
    HttpClientModule,
    // TextMaskModule,
    ClipboardModule,
    TextareaAutosizeModule,
    ColorPickerModule,
    DropzoneModule,

    // Charts

    ChartsModule,
    NgApexchartsModule,
    GaugeModule.forRoot(),
    TrendModule,
    TreeModule,
    ButtonModule,
    MatPaginatorModule,

    // Angular Material Components

    MatCheckboxModule,
    AccordionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgxYoutubePlayerModule,

    tulisermModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
      // PERFECT_SCROLLBAR_CONFIG,

      // useValue:DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },

    ConfigActions,
    ThemeOptions,
    ApiserviceService,
    LoginGuard,
    WINDOW_PROVIDERS,
    SampleService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<ArchitectUIState>,
    private devTool: DevToolsExtension
  ) {
    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [this.devTool.isEnabled() ? this.devTool.enhancer() : (f) => f]
    );
  }
}
