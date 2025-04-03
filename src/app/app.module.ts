import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, ArchitectUIState } from './ThemeOptions/store';
import { ConfigActions } from './ThemeOptions/store/config.actions';
import { AppRoutingModule } from './app-routing.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// BOOTSTRAP COMPONENTS

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LaddaModule } from 'angular2-ladda';
import { NgxLoadingModule } from 'ngx-loading';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
// import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { CountUpModule } from 'countup.js-angular2';
import { AgmCoreModule } from '@agm/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NouisliderModule } from 'ng2-nouislider';
import { NgSelectModule } from '@ng-select/ng-select';
// import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AngularEditorModule } from '@kolkov/angular-editor';
// import { TextMaskModule } from 'angular2-text-mask';
import { ClipboardModule } from 'ngx-clipboard';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ChartsModule } from 'ng2-charts';
import { CurrencyMaskModule } from "ng2-currency-mask";
// import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// ANGULAR MATERIAL COMPONENTS

import { MatCheckboxModule } from '@angular/material/checkbox';

// LAYOUT

import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { AppsLayoutComponent } from './Layout/apps-layout/apps-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';
import { ThemeOptions } from './theme-options';
import { OptionsDrawerComponent } from './ThemeOptions/options-drawer/options-drawer.component';
// import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';

// HEADER

import { HeaderComponent } from './Layout/Components/header/header.component';
import { DotsComponent } from './Layout/Components/header/elements/dots/dots.component';
import { SearchBoxComponent } from './Layout/Components/header/elements/search-box/search-box.component';
import { MegamenuComponent } from './Layout/Components/header/elements/mega-menu/mega-menu.component';
import { MegapopoverComponent } from './Layout/Components/header/elements/mega-menu/elements/megapopover/megapopover.component';
import { UserBoxComponent } from './Layout/Components/header/elements/user-box/user-box.component';
import { DrawerComponent } from './Layout/Components/header/elements/drawer/drawer.component';

// SIDEBAR

import { SidebarComponent } from './Layout/Components/sidebar/sidebar.component';
import { LogoComponent } from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import { FooterComponent } from './Layout/Components/footer/footer.component';
import { FooterDotsComponent } from './Layout/Components/footer/elements/footer-dots/footer-dots.component';
import { FooterMenuComponent } from './Layout/Components/footer/elements/footer-menu/footer-menu.component';

// Pages

import { ForgotPasswordComponent } from './DemoPages/UserPages/forgot-password/forgot-password.component';
import { ForgotPasswordBoxedComponent } from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import { LoginBoxedComponent } from './DemoPages/UserPages/login-boxed/login-boxed.component';
import { LoginComponent } from './DemoPages/UserPages/login/login.component';
import { RegisterBoxedComponent } from './DemoPages/UserPages/register-boxed/register-boxed.component';
import { RegisterComponent } from './DemoPages/UserPages/register/register.component';

// Components

import { NgbdSortableHeaderDirective } from './DemoPages/Tables/dynamic/demo/sortable.directive';

// Apex Charts
import { NgApexchartsModule } from 'ng-apexcharts';
// Gauges Charts

import { GaugeModule } from 'angular-gauge';
import { TrendModule } from 'ngx-trend';
import { MasukappComponent } from './DemoPages/masukapp/masukapp.component';
import { LoginclComponent } from './cllogin/logincl/logincl.component';

// Angular Material

import { ApiserviceService } from './apiservice.service';
import { KosongComponent } from './cllogin/kosong/kosong.component';
import { LoginGuard } from './auth/login.guard';
import { WINDOW_PROVIDERS } from './window.providers';
import { SampleService } from './services';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { anjunganComponent } from './cllogin/anjungan/anjungan.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};
import { AccordionModule } from 'primeng/accordion';
import { ermdisplayComponent } from './cllogin/ermdisplay/ermdisplay.component';
import { TreeModule } from 'primeng/tree'
import { ButtonModule } from 'primeng/button';
import { tulisermComponent } from './clmaster/tuliserm/tuliserm.component';
import { BukuKontrasepsiComponent } from './clmaster/Kebidanan/BukuKontrasepsi/BukuKontrasepsi.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CatatanImunisasiComponent } from './clmaster/Kebidanan/CatatanImunisasi/CatatanImunisasi.component';
import { KunjunganBumilComponent } from './clmaster/Kebidanan/KunjunganBumil/KunjunganBumil.component';
import { KebidananComponent } from './clmaster/Assesment/Kebidanan/Kebidanan.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PartografComponent } from './clmaster/Assesment/Partograf/Partograf.component';
import { tulisermriComponent } from './clmaster/tulisermri/tulisermri.component';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { PersetujuanTindakanMedisComponent } from './clmaster/Assesment/Medis/PersetujuanTindakanMedis.component';
import { kajianperawatComponent } from './clmaster/Assesment/kajianperawat/kajianperawat.component';
import { riwayatkunjunganComponent } from './clmaster/Assesment/riwayatkunjungan/riwayatkunjungan.component';
import { anjungansehatComponent } from './cllogin/anjungansehat/anjungansehat.component';
import { TulisAncComponent } from './satusehat/satusehat-anc/form/tulis-anc.component';
import { TulisMtbmComponent } from './satusehat/satusehat-mtbm/form/tulis-mtbm.component';
import { TulisMtbsComponent } from './satusehat/satusehat-mtbs/form/tulis-mtbs.component';
import { TulisImunisasiComponent } from './satusehat/satusehat-imunisasi/form/tulis-imunisasi.component';
import { TulisSkriningPtmComponent } from './satusehat/satusehat-skrining-ptm/form/tulis-skrining-ptm.component';
import { MasterProvinceComponent } from './satusehat/satusehat-master/master-province/master-province.component';
import { MasterCityComponent } from './satusehat/satusehat-master/master-city/master-city.component';
import { MasterDistrictComponent } from './satusehat/satusehat-master/master-district/master-district.component';
import { MasterSubDistrictComponent } from './satusehat/satusehat-master/master-sub-district/master-sub-district.component';
import { MasterDiagnosaComponent } from './satusehat/satusehat-master/master-diagnosa/master-diagnosa.component';
import { MasterTindakanComponent } from './satusehat/satusehat-master/master-tindakan/master-tindakan.component';
import { MasterVaccineComponent } from './satusehat/satusehat-master/master-vaccine/master-vaccine.component';
import { FormVaccineComponent } from './satusehat/satusehat-imunisasi/form/form-vaccine/form-vaccine.component';
import { MasterSpecimenModule } from './satusehat/satusehat-master/master-specimen/master-specimen.module';
import { TulisSatuSehatGiziComponent } from './satusehat/satusehat-gizi/form/tulis-satusehat-gizi.component';
import { skriningComponent } from "./clmaster/skrining/skrining.component";
import { TulisSatuSehatPncComponent } from './satusehat/satusehat-pnc/form/tulis-satusehat-pnc.component';
import { TulisSatuSehatIncComponent } from './satusehat/satusehat-inc/form/tulis-satusehat-inc.component';
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
    tulisermComponent,
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
    TulisSatuSehatPncComponent,
    TulisSatuSehatIncComponent,
    MasterProvinceComponent,
    MasterCityComponent,
    MasterDistrictComponent,
    MasterSubDistrictComponent,
    MasterDiagnosaComponent,
    MasterTindakanComponent,
    MasterVaccineComponent,
    FormVaccineComponent,

    skriningComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    NgxLoadingModule.forRoot({}),
    RoundProgressModule,
    ToastrModule.forRoot(),
    SlickCarouselModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    // CountUpModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: ''
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
    MatFormFieldModule
  ],
  providers: [
    {
      provide:
        LocationStrategy, useClass: HashLocationStrategy
      // PERFECT_SCROLLBAR_CONFIG,

      // useValue:DEFAULT_PERFECT_SCROLLBAR_CONFIG,

    },

    ConfigActions,
    ThemeOptions,
    ApiserviceService,
    LoginGuard,
    WINDOW_PROVIDERS,
    SampleService


  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
    private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [this.devTool.isEnabled() ? this.devTool.enhancer() : f => f]
    );

  }
}
