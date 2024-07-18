import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  faSearch,faCheck, faTrash, faWindowClose
} from '@fortawesome/free-solid-svg-icons';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http'

import { BayiService } from './Service/bayi.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

import * as moment from 'moment';

@Component({
  selector: 'app-Bayi',
  templateUrl: './Bayi.component.html',
  styles: [
    `.example-container {
      display: flex;
      flex-direction: column;
    }

    .example-container > * {
      width: 100%;
    }

    .example-container form {
      margin-bottom: 20px;
    }

    .example-container form > * {
      margin: 5px 0;
    }

    .example-container .mat-radio-button {
      margin: 0 5px;
    }`
  ],
  providers: [
    DatePipe,
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class BayiComponent implements OnInit {
  heading = 'Asesmen Bayi';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  // Validasi file Create / Update
  validasiCreateUpdate = '';

  // Icon
  faCheck = faCheck;
  faTrash = faTrash;
  faWindowClose = faWindowClose;
  
  assesmentBayi: any = [];

  // Session
  username:any;
  // Main Data Input
  no_rm:any;
  no_transaksi:any;

  listNotransaksiPerNoRM:any;

  // Data Umum
  asal_masuk:string = '';
  asal_masuk_lainnya:any = '';
  status_rujuk:string = '';
  status_rujuk_lainnya:any = '';
  diagnosa_masuk:any = '';
  sumber_informasi:string = '';
  hubungan_sumber_informasi:any = '';

  // Riwayat Kesehatan
  pernah_dirawat:string = '';
  kapan_dan_diagnosa:any;
  kelainan_kongenital:string = '';
  kelainan_kongenital_lainnya:any;
  lahir_dan_umur_kehamilan:any;
  komplikasi_kehamilan:string = '';
  komplikasi_kehamilan_lainnya:any;
  trimester_1:any;
  trimester_bidan_1:any;
  trimester_dokter_1:any;
  trimester_2:any;
  trimester_bidan_2:any;
  trimester_dokter_2:any;
  trimester_3:any;
  trimester_bidan_3:any;
  trimester_dokter_3:any;
  persalinan:string = '';
  persalinan_ditolong_oleh:string = '';
  persalinan_ditolong_oleh_lainnya:any;
  riwayat_persalinan:string = '';
  riwayat_persalinan_lainnya:any;
  apgar_score:any;
  bb_lahir:any;
  pb:any;
  lk:any;
  ld:any;
  ll:any;
  jumlah_janin:string = '';
  status_janin:any = '';
  jenis_kelamin:string = '';
  tempat_lahir:string = '';
  tempat_lahir_lainnya:any;
  trauma_lahir:string = '';
  trauma_lahir_lainnya:any;
  lahir_dalam_keadaan:string = '';
  warna_air_ketuban:string = '';
  warna_air_ketuban_lainnya:any;
  pelayanan_yang_didapat:string = '';
  riwayat_asi:string = '';
  riwayat_asi_lainnya:any;
  riwayat_pasi:string = '';
  riwayat_pasi_lainnya:any;
  riwayat_alergi:string = '';
  riwayat_alergi_lainnya:any;
  riwayat_imunisasi:string = '';
  tidak_lengkap_sebutkan:any;

  // HiddenAtauDisable
  disabledAsalMasuk = true;
  disabledStatusRujuk = true;
  disabledSumberInformasi = true;
  disabledPernahDirawat = true;
  disabledKongenital = true;
  disabledKomplikasiKehamilan = true;
  disabledPersalinanDitolongOleh = true;
  disabledRiwayatPersalinan = true;
  disabledJumlahJanin = true;
  disabledTempatLahir = true;
  disabledTraumaLahir = true;
  disabledAirKetuban = true;
  disabledRiwayatAsi = true;
  disabledRiwayatPasi = true;
  disabledRiwayatAlergi = true;
  disabledRiwayatImunisasi = true;

  
  // Check Box Pelayanan yang didapat
  pelayanan1 = false;
  pelayanan2 = false;
  pelayanan3 = false;
  pelayanan4 = false;
  pelayanan5 = false;
  pelayanan6 = false;
  
  constructor(
    public http :HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService, 
    private bayiService:BayiService, 
    private fb: FormBuilder
    ) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });

  }

  BayiForm = this.fb.group({
    // Main Data Input
    no_rm: ['',Validators.required],
    no_transaksi: ['',Validators.required],
    
    // Data Umum
    asal_masuk: ['',Validators.required],
    asal_masuk_lainnya: ['',Validators.required],
    status_rujuk: ['',Validators.required],
    status_rujuk_lainnya: ['',Validators.required],
    diagnosa_masuk: ['',Validators.required],
    sumber_informasi: ['',Validators.required],
    hubungan_sumber_informasi: ['',Validators.required],

    // Riwayat Kesehatan
    pernah_dirawat: ['',Validators.required],
    kapan_dan_diagnosa: ['',Validators.required],
    kelainan_kongenital: ['',Validators.required],
    kelainan_kongenital_lainnya: ['',Validators.required],
    lahir_dan_umur_kehamilan: ['',Validators.required],
    komplikasi_kehamilan: ['',Validators.required],
    komplikasi_kehamilan_lainnya: ['',Validators.required],
    trimester_1: ['',Validators.required],
    trimester_bidan_1: ['',Validators.required],
    trimester_dokter_1: ['',Validators.required],
    trimester_2: ['',Validators.required],
    trimester_bidan_2: ['',Validators.required],
    trimester_dokter_2: ['',Validators.required],
    trimester_3: ['',Validators.required],
    trimester_bidan_3: ['',Validators.required],
    trimester_dokter_3: ['',Validators.required],

    persalinan: ['',Validators.required],
    persalinan_ditolong_oleh: ['',Validators.required],
    persalinan_ditolong_oleh_lainnya: ['',Validators.required],
    riwayat_persalinan: ['',Validators.required],
    riwayat_persalinan_lainnya: ['',Validators.required],
    apgar_score: ['',Validators.required],
    bb_lahir: ['',Validators.required],
    pb: ['',Validators.required],
    lk: ['',Validators.required],
    ld: ['',Validators.required],
    ll: ['',Validators.required],
    jumlah_janin: ['',Validators.required],
    status_janin: ['',Validators.required],
    jenis_kelamin: ['',Validators.required],
    tempat_lahir: ['',Validators.required],
    tempat_lahir_lainnya: ['',Validators.required],
    trauma_lahir: ['',Validators.required],
    trauma_lahir_lainnya: ['',Validators.required],
    lahir_dalam_keadaan: ['',Validators.required],
    warna_air_ketuban: ['',Validators.required],
    warna_air_ketuban_lainnya: ['',Validators.required],
    pelayanan_yang_didapat: ['',Validators.required],
    riwayat_asi: ['',Validators.required],
    riwayat_asi_lainnya: ['',Validators.required],
    riwayat_pasi: ['',Validators.required],
    riwayat_pasi_lainnya: ['',Validators.required],
    riwayat_alergi: ['',Validators.required],
    riwayat_alergi_lainnya: ['',Validators.required],
    riwayat_imunisasi: ['',Validators.required],
    tidak_lengkap_sebutkan: ['',Validators.required],
  });

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.no_rm = localStorage.getItem('noRM');
    this.no_transaksi = localStorage.getItem('noTransaksi');
    this.ambilDataByID();
    this.ambilSemuaNoTransaksiPerNoRM();

  }

  simpanAssesmentBayi(){
    let body = {
        // Main Data Input
        "no_rm" : this.no_rm,
        "no_transaksi":this.no_transaksi,
        "username":this.username,
              
        // Data Umum
        "asal_masuk":this.asal_masuk,
        "asal_masuk_lainnya":this.asal_masuk_lainnya,
        "status_rujuk":this.status_rujuk,
        "status_rujuk_lainnya":this.status_rujuk_lainnya,
        "diagnosa_masuk":this.diagnosa_masuk,
        "sumber_informasi":this.sumber_informasi,
        "hubungan_sumber_informasi":this.hubungan_sumber_informasi,

        // Riwayat Kesehatan
        "pernah_dirawat":this.pernah_dirawat,
        "kapan_dan_diagnosa":this.kapan_dan_diagnosa,
        "kelainan_kongenital":this.kelainan_kongenital,
        "kelainan_kongenital_lainnya":this.kelainan_kongenital_lainnya,
        "lahir_dan_umur_kehamilan":this.lahir_dan_umur_kehamilan,
        "komplikasi_kehamilan":this.komplikasi_kehamilan,
        "komplikasi_kehamilan_lainnya":this.komplikasi_kehamilan_lainnya,
        "trimester_1":this.trimester_1,
        "trimester_bidan_1":this.trimester_bidan_1,
        "trimester_dokter_1":this.trimester_dokter_1,
        "trimester_2":this.trimester_2,
        "trimester_bidan_2":this.trimester_bidan_2,
        "trimester_dokter_2":this.trimester_dokter_2,
        "trimester_3":this.trimester_3,
        "trimester_bidan_3":this.trimester_bidan_3,
        "trimester_dokter_3":this.trimester_dokter_3,
        "persalinan":this.persalinan,
        "persalinan_ditolong_oleh":this.persalinan_ditolong_oleh,
        "persalinan_ditolong_oleh_lainnya":this.persalinan_ditolong_oleh_lainnya,
        "riwayat_persalinan":this.riwayat_persalinan,
        "riwayat_persalinan_lainnya":this.riwayat_persalinan_lainnya,
        "apgar_score":this.apgar_score,
        "bb_lahir":this.bb_lahir,
        "pb":this.pb,
        "lk":this.lk,
        "ld":this.ld,
        "ll":this.ll,
        "jumlah_janin":this.jumlah_janin,
        "status_janin":this.status_janin,
        "jenis_kelamin":this.jenis_kelamin,
        "tempat_lahir":this.tempat_lahir,
        "tempat_lahir_lainnya":this.tempat_lahir_lainnya,
        "trauma_lahir":this.trauma_lahir,
        "trauma_lahir_lainnya":this.trauma_lahir_lainnya,
        "lahir_dalam_keadaan":this.lahir_dalam_keadaan,
        "warna_air_ketuban":this.warna_air_ketuban,
        "warna_air_ketuban_lainnya":this.warna_air_ketuban_lainnya,
        "pelayanan_yang_didapat":this.pelayanan_yang_didapat,
        "riwayat_asi":this.riwayat_asi,
        "riwayat_asi_lainnya":this.riwayat_asi_lainnya,
        "riwayat_pasi":this.riwayat_pasi,
        "riwayat_pasi_lainnya":this.riwayat_pasi_lainnya,
        "riwayat_alergi":this.riwayat_alergi,
        "riwayat_alergi_lainnya":this.riwayat_alergi_lainnya,
        "riwayat_imunisasi":this.riwayat_imunisasi,
        "tidak_lengkap_sebutkan":this.tidak_lengkap_sebutkan

    }
      
    console.log(body);
    if(this.asal_masuk == '' || this.status_rujuk == '' || this.diagnosa_masuk == '' || this.sumber_informasi == ''){
      this.toastr.error('Harap lengkapi form', 'Error', {
        timeOut: 2000,
      });                
    } else {
      if(this.validasiCreateUpdate == 'Create'){
        this.bayiService.simpan(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Asesmen Bayi sudah dibuat', 'Sukses', {
                timeOut: 2000,
              });                
              this.ngOnInit();
              // this.buatDefaultNilai();
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      } else if(this.validasiCreateUpdate == 'Update') {
        this.bayiService.update(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Asesmen Bayi sudah diupdate', 'Sukses', {
                timeOut: 2000,
              });                
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      }
  
    }

  }

  // List data yang sudah ada
  ambilSemuaNoTransaksiPerNoRM(){
    this.bayiService.getByNoRM(this.no_rm).subscribe(
      (data: any) => {
        console.log("Ini untuk get by No RM");
        console.log(data);
        if(data.success == true){
          this.listNotransaksiPerNoRM = data.riwayat_kesehatan_bayi;
        } else {
            this.toastr.error(data.message, 'Error');
        }
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }

  ambilAssesmentBaru(noTransaksiBaru){
    localStorage.setItem('noTransaksi', noTransaksiBaru);
    console.log(this.no_transaksi);
    this.validasiCreateUpdate = 'Update';
    this.ambilDataByID();
    this.ngOnInit();
  }

  ambilDataByID() {
    console.log("Ambil Data Hemodialisa By ID");
    this.bayiService.getByNoTransaksiNoRM(this.no_rm, this.no_transaksi).subscribe(
      (data: any) => {
        // console.log(data);
        // console.log(JSON.stringify(data));
        this.assesmentBayi = data;

        if(this.assesmentBayi.riwayat_kesehatan_bayi[0]){
          this.validasiCreateUpdate = "Update";
        } else {
          this.validasiCreateUpdate = "Create";
        }

        // Pasang nilai untuk update
        // this.pasangNilaiAsalMasuk();
        // this.pasangNilaiStatusRujuk();
        // this.pasangSumberInformasi();
        // this.pasangNilaiPernahDirawat();
        // this.pasangNilaiKongenital();
        // this.pasangNilaiKomplikasiKehamilan();
        // this.pasangNilaiPesalinanDitolongOleh();
        // this.pasangNilaiRiwayatPersalinan();
        // this.pasangNilaiJumlahJanin();
        // this.pasangNilaiTempatLahir();
        // this.pasangNilaiTraumaLahir();
        // this.pasangNilaiAirKetuban();
        // this.pasangNilaiRiwayatAsi();
        // this.pasangNilaiRiwayatPasi();
        // this.pasangNilaiRiwayatAlergi();
        // this.pasangNilaiRiwayatImunisasi();
        // this.pasangNilaiCheckButtonPelayananID(this.assesmentBayi.riwayat_kesehatan_bayi[0].pelayanan_yang_didapat);
        this.pasangDataUpdate(this.assesmentBayi.data_umum[0], this.assesmentBayi.riwayat_kesehatan_bayi[0]);
      },(error: any) => console.log(error)
    );
  }
  
  pasangDataUpdate(nilaiDataUmum, nilaiRiwayatKesehatan){
    this.no_rm = nilaiRiwayatKesehatan.no_rm;
    this.no_transaksi = nilaiRiwayatKesehatan.no_transaksi;
    
    // Data Umum
    this.asal_masuk = nilaiDataUmum.asal_masuk;
    this.asal_masuk_lainnya = nilaiDataUmum.asal_masuk_lainnya;
    this.status_rujuk = nilaiDataUmum.status_rujuk;
    this.status_rujuk_lainnya = nilaiDataUmum.status_rujuk_lainnya;
    this.diagnosa_masuk = nilaiDataUmum.diagnosa_masuk;
    this.sumber_informasi = nilaiDataUmum.sumber_informasi;
    this.hubungan_sumber_informasi = nilaiDataUmum.hubungan_sumber_informasi;

    // Riwayat Kesehatan
    this.pernah_dirawat = nilaiRiwayatKesehatan.pernah_dirawat;
    this.kapan_dan_diagnosa = nilaiRiwayatKesehatan.kapan_dan_diagnosa;
    this.kelainan_kongenital = nilaiRiwayatKesehatan.kelainan_kongenital;
    this.kelainan_kongenital_lainnya = nilaiRiwayatKesehatan.kelainan_kongenital_lainnya;
    this.lahir_dan_umur_kehamilan = nilaiRiwayatKesehatan.lahir_dan_umur_kehamilan;
    this.komplikasi_kehamilan = nilaiRiwayatKesehatan.komplikasi_kehamilan;
    this.komplikasi_kehamilan_lainnya = nilaiRiwayatKesehatan.komplikasi_kehamilan_lainnya;
    this.trimester_1 = nilaiRiwayatKesehatan.trimester_1;
    this.trimester_bidan_1 = nilaiRiwayatKesehatan.trimester_bidan_1;
    this.trimester_dokter_1 = nilaiRiwayatKesehatan.trimester_dokter_1;
    this.trimester_2 = nilaiRiwayatKesehatan.trimester_2;
    this.trimester_bidan_2 = nilaiRiwayatKesehatan.trimester_bidan_2;
    this.trimester_dokter_2 = nilaiRiwayatKesehatan.trimester_dokter_2;
    this.trimester_3 = nilaiRiwayatKesehatan.trimester_3;
    this.trimester_bidan_3 = nilaiRiwayatKesehatan.trimester_bidan_3;
    this.trimester_dokter_3 = nilaiRiwayatKesehatan.trimester_dokter_3;
    this.persalinan = nilaiRiwayatKesehatan.persalinan;
    this.persalinan_ditolong_oleh = nilaiRiwayatKesehatan.persalinan_ditolong_oleh;
    this.persalinan_ditolong_oleh_lainnya = nilaiRiwayatKesehatan.persalinan_ditolong_oleh_lainnya;
    this.riwayat_persalinan = nilaiRiwayatKesehatan.riwayat_persalinan;
    this.riwayat_persalinan_lainnya = nilaiRiwayatKesehatan.riwayat_persalinan_lainnya;
    this.apgar_score = nilaiRiwayatKesehatan.apgar_score;
    this.bb_lahir = nilaiRiwayatKesehatan.bb_lahir;
    this.pb = nilaiRiwayatKesehatan.pb;
    this.lk = nilaiRiwayatKesehatan.lk;
    this.ld = nilaiRiwayatKesehatan.ld;
    this.ll = nilaiRiwayatKesehatan.ll;
    this.jumlah_janin = nilaiRiwayatKesehatan.jumlah_janin;
    this.status_janin = nilaiRiwayatKesehatan.status_janin;
    this.jenis_kelamin = nilaiRiwayatKesehatan.jenis_kelamin;
    this.tempat_lahir = nilaiRiwayatKesehatan.tempat_lahir;
    this.tempat_lahir_lainnya = nilaiRiwayatKesehatan.tempat_lahir_lainnya;
    this.trauma_lahir = nilaiRiwayatKesehatan.trauma_lahir;
    this.trauma_lahir_lainnya = nilaiRiwayatKesehatan.trauma_lahir_lainnya;
    this.lahir_dalam_keadaan = nilaiRiwayatKesehatan.lahir_dalam_keadaan;
    this.warna_air_ketuban = nilaiRiwayatKesehatan.warna_air_ketuban;
    
    this.warna_air_ketuban_lainnya = nilaiRiwayatKesehatan.warna_air_ketuban_lainnya;
    this.pelayanan_yang_didapat = nilaiRiwayatKesehatan.pelayanan_yang_didapat;
    this.riwayat_asi = nilaiRiwayatKesehatan.riwayat_asi;
    this.riwayat_asi_lainnya = nilaiRiwayatKesehatan.riwayat_asi_lainnya;
    this.riwayat_pasi = nilaiRiwayatKesehatan.riwayat_pasi;
    this.riwayat_pasi_lainnya = nilaiRiwayatKesehatan.riwayat_pasi_lainnya;
    
    this.riwayat_alergi = nilaiRiwayatKesehatan.riwayat_alergi;
    this.riwayat_alergi_lainnya = nilaiRiwayatKesehatan.riwayat_alergi_lainnya;
    this.riwayat_imunisasi = nilaiRiwayatKesehatan.riwayat_imunisasi;
    this.tidak_lengkap_sebutkan = nilaiRiwayatKesehatan.tidak_lengkap_sebutkan;

    this.pasangNilaiAsalMasuk();
    this.pasangNilaiStatusRujuk();
    this.pasangSumberInformasi();
    this.pasangNilaiPernahDirawat();
    this.pasangNilaiKongenital();
    this.pasangNilaiKomplikasiKehamilan();
    this.pasangNilaiPesalinanDitolongOleh();
    this.pasangNilaiRiwayatPersalinan();
    this.pasangNilaiJumlahJanin();
    this.pasangNilaiTempatLahir();
    this.pasangNilaiTraumaLahir();
    this.pasangNilaiAirKetuban();
    this.pasangNilaiRiwayatAsi();
    this.pasangNilaiRiwayatPasi();
    this.pasangNilaiRiwayatAlergi();
    this.pasangNilaiRiwayatImunisasi();
    this.pasangNilaiCheckButtonPelayananID(nilaiRiwayatKesehatan.pelayanan_yang_didapat);
    

  }

  pasangNilaiAsalMasuk(){
    if(this.asal_masuk != 'Lainnya'){
      this.asal_masuk_lainnya = '';
      this.disabledAsalMasuk = true;
    } else {
      this.disabledAsalMasuk = false;
    }
  }

  pasangNilaiStatusRujuk(){
    if(this.status_rujuk != 'Rujukan'){
      this.status_rujuk_lainnya = '';
      this.disabledStatusRujuk = true;
    } else {
      this.disabledStatusRujuk = false;
    }
  }

  pasangSumberInformasi(){
    if(this.sumber_informasi != 'Perujuk'){
      this.hubungan_sumber_informasi = '';
      this.disabledSumberInformasi = true;
    } else {
      this.disabledSumberInformasi = false;
    }
  }

  pasangNilaiPernahDirawat(){
    if(this.pernah_dirawat != 'Ya'){
      this.kapan_dan_diagnosa = '';
      this.disabledPernahDirawat = true;
    } else {
      this.disabledPernahDirawat = false;
    }
  }

  pasangNilaiKongenital(){
    if(this.kelainan_kongenital != 'Ya'){
      this.kelainan_kongenital_lainnya = '';
      this.disabledKongenital = true;
    } else {
      this.disabledKongenital = false;
    }
  }

  pasangNilaiKomplikasiKehamilan(){
    if(this.komplikasi_kehamilan == 'Ya'){
      this.disabledKomplikasiKehamilan = false;
    } else {
      this.komplikasi_kehamilan_lainnya = '';
      this.disabledKomplikasiKehamilan = true;
    }
  }

  pasangNilaiPesalinanDitolongOleh(){
    if(this.persalinan_ditolong_oleh == 'Lainnya'){
      this.disabledPersalinanDitolongOleh = false;
    } else {
      this.persalinan_ditolong_oleh_lainnya = ''
      this.disabledPersalinanDitolongOleh = true;
    }
  }

  pasangNilaiRiwayatPersalinan(){
    if(this.riwayat_persalinan != 'Lainnya'){
      this.riwayat_persalinan_lainnya = ''
      this.disabledRiwayatPersalinan = true;
    } else {
      this.disabledRiwayatPersalinan = false;
    }
    
  }

  pasangNilaiJumlahJanin(){
    if(this.jumlah_janin == ''){
      this.status_janin = '';
      this.disabledJumlahJanin = true;
    } else {
      this.disabledJumlahJanin = false;
    }
    
  }

  pasangNilaiTempatLahir(){
    if(this.tempat_lahir != 'Lainnya'){
      this.tempat_lahir_lainnya = '';
      this.disabledTempatLahir = true;
    } else {
      this.disabledTempatLahir = false;
    }
    
  }

  pasangNilaiTraumaLahir(){
    if(this.trauma_lahir != 'Ya'){
      this.trauma_lahir_lainnya = '';
      this.disabledTraumaLahir = true;
    } else {
      this.disabledTraumaLahir = false;
    }
    
  }

  pasangNilaiAirKetuban(){
    if(this.warna_air_ketuban != 'Keruh'){
      this.warna_air_ketuban_lainnya = '';
      this.disabledAirKetuban = true;
    } else {
      this.disabledAirKetuban = false;
    }
    
  }




  pasangCheckboxPelayanan1(){
    if(this.pelayanan1){
      this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ','+ 'Vit K';
    } else {
      let vitkArray = this.pelayanan_yang_didapat.split(',');
      vitkArray.forEach((element,index)=>{
        if(element == ''){
          delete vitkArray[index]
        } else if(element == 'Vit K') {
          delete vitkArray[index]
        }
      });

      this.pelayanan_yang_didapat = '';
      vitkArray.forEach((element,index)=>{
        if(element == this.pelayanan_yang_didapat){
          delete vitkArray[index]
        }
        this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ',' + element;
      });
    }
    this.pelayanan_yang_didapat.replace(',,', ',');
    console.log(this.pelayanan_yang_didapat);
  }

  pasangCheckboxPelayanan2(){
    if(this.pelayanan2){
      this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ','+ 'Inisiasi Menyusui Dini';
    } else {
      let vitkArray = this.pelayanan_yang_didapat.split(',');
      vitkArray.forEach((element,index)=>{
        if(element == ''){
          delete vitkArray[index]
        } else if(element == 'Inisiasi Menyusui Dini') {
          delete vitkArray[index]
        }
      });

      this.pelayanan_yang_didapat = '';
      vitkArray.forEach((element,index)=>{
        if(element == this.pelayanan_yang_didapat){
          delete vitkArray[index]
        }
        this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ',' + element;
      });
    }
    this.pelayanan_yang_didapat.replace(',,', ',');
    console.log(this.pelayanan_yang_didapat);
  }

  pasangCheckboxPelayanan3(){
    if(this.pelayanan3){
      this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ','+ 'Saleb Mata';
    } else {
      let vitkArray = this.pelayanan_yang_didapat.split(',');
      vitkArray.forEach((element,index)=>{
        if(element == ''){
          delete vitkArray[index]
        } else if(element == 'Saleb Mata') {
          delete vitkArray[index]
        }
      });

      this.pelayanan_yang_didapat = '';
      vitkArray.forEach((element,index)=>{
        if(element == this.pelayanan_yang_didapat){
          delete vitkArray[index]
        }
        this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ',' + element;
      });
    }
    this.pelayanan_yang_didapat.replace(',,', ',');
    console.log(this.pelayanan_yang_didapat);
  }

  pasangCheckboxPelayanan4(){
    if(this.pelayanan4){
      this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ','+ 'Mandi diatas 6 jam';
    } else {
      let vitkArray = this.pelayanan_yang_didapat.split(',');
      vitkArray.forEach((element,index)=>{
        if(element == ''){
          delete vitkArray[index]
        } else if(element == 'Mandi diatas 6 jam') {
          delete vitkArray[index]
        }
      });

      this.pelayanan_yang_didapat = '';
      vitkArray.forEach((element,index)=>{
        if(element == this.pelayanan_yang_didapat){
          delete vitkArray[index]
        }
        this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ',' + element;
      });
    }
    this.pelayanan_yang_didapat.replace(',,', ',');
    console.log(this.pelayanan_yang_didapat);
  }

  pasangCheckboxPelayanan5(){
    if(this.pelayanan5){
      this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ','+ 'Diselimuti dan Diberi Topi';
    } else {
      let vitkArray = this.pelayanan_yang_didapat.split(',');
      vitkArray.forEach((element,index)=>{
        if(element == ''){
          delete vitkArray[index]
        } else if(element == 'Diselimuti dan Diberi Topi') {
          delete vitkArray[index]
        }
      });

      this.pelayanan_yang_didapat = '';
      vitkArray.forEach((element,index)=>{
        if(element == this.pelayanan_yang_didapat){
          delete vitkArray[index]
        }
        this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ',' + element;
      });
    }
    this.pelayanan_yang_didapat.replace(',,', ',');
    console.log(this.pelayanan_yang_didapat);
  }

  pasangCheckboxPelayanan6(){
    if(this.pelayanan6){
      this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ','+ 'Perawatan Tali Pusar';
    } else {
      let vitkArray = this.pelayanan_yang_didapat.split(',');
      vitkArray.forEach((element,index)=>{
        if(element == ''){
          delete vitkArray[index]
        } else if(element == 'Perawatan Tali Pusar') {
          delete vitkArray[index]
        }
      });

      this.pelayanan_yang_didapat = '';
      vitkArray.forEach((element,index)=>{
        if(element == this.pelayanan_yang_didapat){
          delete vitkArray[index]
        }
        this.pelayanan_yang_didapat = this.pelayanan_yang_didapat + ',' + element;
      });
    }
    this.pelayanan_yang_didapat.replace(',,', ',');
    console.log(this.pelayanan_yang_didapat);
  }

  pasangNilaiRiwayatAsi(){
    if(this.riwayat_asi != 'Ya'){
      this.riwayat_asi_lainnya = '';
      this.disabledRiwayatAsi = true;
    } else {
      this.disabledRiwayatAsi = false;
    }
    
  }

  pasangNilaiRiwayatPasi(){
    if(this.riwayat_pasi != 'Ya'){
      this.riwayat_pasi_lainnya = '';
      this.disabledRiwayatPasi = true;
    } else {
      this.disabledRiwayatPasi = false;
    }
    
  }

  pasangNilaiRiwayatAlergi(){
    if(this.riwayat_alergi != 'Ya'){
      this.riwayat_alergi_lainnya = '';
      this.disabledRiwayatAlergi = true;
    } else {
      this.disabledRiwayatAlergi = false;
    }
    
  }

  pasangNilaiRiwayatImunisasi(){
    if(this.riwayat_imunisasi != 'Tidak Lengkap'){
      this.tidak_lengkap_sebutkan = '';
      this.disabledRiwayatImunisasi = true;
    } else {
      this.disabledRiwayatImunisasi = false;
    }
    
  }
  
  pasangNilaiCheckButtonPelayananID(nilai){
    let array = nilai.split(',');

    array.forEach((element,index)=>{
      if(element == 'Vit K'){
        this.pelayanan1 = true;
      } else if(element == 'Inisiasi Menyusui Dini') {
        this.pelayanan2 = true;
      } else if(element == 'Saleb Mata') {
        this.pelayanan3 = true;
      } else if(element == 'Mandi diatas 6 jam') {
        this.pelayanan4 = true;
      } else if(element == 'Diselimuti dan Diberi Topi') {
        this.pelayanan5 = true;
      } else if(element == 'Perawatan Tali Pusar') {
        this.pelayanan6 = true;
      }
    });
  }

  periksaAngkaInput(params){
    if(params == 'BB'){
      if(!Number(this.bb_lahir)){
        this.toastr.error('BB Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.bb_lahir = '';
      }
    } else if(params == 'PB'){
      if(!Number(this.pb)){
        this.toastr.error('PB Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.pb = '';
      }
    } else if(params == 'LK'){
      if(!Number(this.lk)){
        this.toastr.error('LK Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.lk = '';
      }
    } else if(params == 'LD'){
      if(!Number(this.ld)){
        this.toastr.error('LD Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.ld = '';
      }
    } else if(params == 'LL'){
      if(!Number(this.ll)){
        this.toastr.error('LL Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.ll = '';
      }
    } else if(params == 'Riwayat ASI Lainnya'){
      if(!Number(this.riwayat_asi_lainnya)){
        this.toastr.error('Riwayat ASI Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.riwayat_asi_lainnya = '';
      }
    } else if(params == 'Riwayat PASI Lainnya'){
      if(!Number(this.riwayat_pasi_lainnya)){
        this.toastr.error('Riwayat PASI Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.riwayat_pasi_lainnya = '';
      }
    } 

  }







  
  
}
