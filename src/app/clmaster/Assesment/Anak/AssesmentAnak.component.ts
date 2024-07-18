import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  faSearch,
  faCheck, 
  faTrash, 
  faWindowClose, 
  faPencilAlt,
  faPlusCircle, 
  faPrint, 
  faBook
} from '@fortawesome/free-solid-svg-icons';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe, formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { printDiv } from 'src/library/print/print-div';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';

import { AssesmentAnakService } from './Service/assesment-anak.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { TemplateService } from '../../Template/Service/Template.service';

// import { AssesmentAnakCetakComponent } from './Cetak/AssesmentAnakCetak.component';

import * as moment from 'moment';

@Component({
  selector: 'app-AssesmentAnak',
  templateUrl: './AssesmentAnak.component.html',
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
    }
    .overlay {
      background-color: aliceblue;
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 1000;
      top: 0;
      left: 0;
      opacity: 0.5;
      filter: alpha(opacity=50);
    }  
    `
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
export class AssesmentAnakComponent implements OnInit {
  @ViewChild('signature')
  public signaturePad: SignaturePadComponent;
  
  public signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 500,
    'canvasHeight': 300,
    'penColor': 'rgb(3, 3, 255)',
  
  
    'backgroundColor': 'rgb(252, 252, 252)',
  };
  
  heading = 'Asesmen Keperawatan Anak';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  // Validasi file Create / Update
  validasiCreateUpdate = '';

  validasiButtonCreateUpdate = 'Simpan';

  listFilterTemplate: any = [];

  // Icon
  faBook = faBook;
  faCheck = faCheck;
  faTrash = faTrash;
  faWindowClose = faWindowClose;
  faPencilAlt = faPencilAlt;
  faPlusCircle = faPlusCircle;
  faPrint = faPrint;
  
  asesmentAnak: any = [];
  
  // listNotransaksiPerNoRM:any;
  // Main Data Input
  // no_rm:any;
  // no_transaksi:any;
  // username:any;
  idAsesmenAnak:any;
  no_rm:any;
  no_transaksi:any;
  username:any;

  // riwayat prenatal
  lama_kehamilan:any;
  angka_kehamilan:any;
  waktu_kehamilan:string = '';
  
  komplikasi:string ='';
  tipe:string ='';
  keterangan_tipe:any;
  riwayat_natal:string = '';
  keterangan_riwayat_natal:any;
  keterangan_riwayat_natal_select:string = '';
  keterangan_riwayat_natal_input:any = '';
  riwayat_post_natal:string = '';
  keterangan_riwayat_post_natal:any;
  keterangan_riwayat_post_natal_select:string = '';
  keterangan_riwayat_post_natal_input:any = '';

  // hospitalisasi
  orang_terdekat:any;
  orang_terdekat_select:string = '';
  orang_terdekat_input:any = '';
  pendamping_anak:any;
  pendamping_anak_select:string = '';
  pendamping_anak_input:any = '';
  anak_merasa_terpisah:string = '';
  pernah_dirawat_sebelumnya:string = '';
  reaksi_anak:any;
  reaksi_anak_select:string = '';
  reaksi_anak_input:any = '';
  cemas:string = '';
  alasan_cemas:any;
  alasan_cemas_select:string = '';
  alasan_cemas_input:any = '';

  // pola asuh anak
  pengasuh:any;
  pengasuh_select:string = '';
  pengasuh_input:any = '';
  pembawaan_umum:any;
  pembawaan_umum_select:string = '';
  pembawaan_umum_input:any = '';
  tempramen:any;
  tempramen_select:string = '';
  tempramen_input:any = '';
  kebiasaan_unik:any;
  kebiasaan_unik_select:string = '';
  keterangan_kebiasaan_unik:any = '';

  riwayat_imunisasi:any;
  riwayat_imunisasi_select:string = '';
  keterangan_riwayat_imunisasi:any = '';

  // Hidden Disabled
  hiddenSelectRiwayatNatal = true;
  hiddenInputRiwayatNatal = true;
  
  hiddenSelectRiwayatPostNatal = true;
  hiddenInputRiwayatPostNatal = true;
  
  hiddenInputOrangTerdekat = true;
  hiddenInputPendampingAnak = true;
  hiddenInputReaksiAnak = true;
  hiddenInputAlasanCemas = true;
  hiddenInputPengasuh = true;
  hiddenInputPembawaanUmum = true;
  hiddenInputTempramen = true;
  hiddenInputKebiasaanUnik = true;
  hiddenInputRiwayatImunisasi = true;

  // allert riwayat prenatal
  hiddenAlertRiwayatPrenatal = true;
  pesanAlertRiwayatPrenatal = '';

  cekValidasiSimpan = false;

  loading: boolean = false;

  constructor(
    public http :HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService, 
    private assesmentAnakService:AssesmentAnakService, 
    private templateService:TemplateService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    ) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });

  }

  formInput = this.fb.group({
    // Main Data Input
    no_rm: ['',Validators.required],
    no_transaksi: ['',Validators.required],
    username: ['',Validators.required], 
    angka_kehamilan: ['',Validators.required],
    komplikasi: ['',Validators.required],
    tipe: ['',Validators.required],
    keterangan_tipe: ['',Validators.required],
    riwayat_natal: ['',Validators.required],
    keterangan_riwayat_natal: ['',Validators.required],
    riwayat_post_natal: ['',Validators.required],
    keterangan_riwayat_post_natal: ['',Validators.required],
    orang_terdekat: ['',Validators.required],
    pendamping_anak: ['',Validators.required],
    anak_merasa_terpisah: ['',Validators.required],
    pernah_dirawat_sebelumnya: ['',Validators.required],
    reaksi_anak: ['',Validators.required],
    cemas: ['',Validators.required],
    alasan_cemas: ['',Validators.required],
    pengasuh: ['',Validators.required],
    pembawaan_umum: ['',Validators.required],
    tempramen: ['',Validators.required],
    kebiasaan_unik: ['',Validators.required],
    keterangan_kebiasaan_unik: ['',Validators.required],
    riwayat_imunisasi: ['',Validators.required],
    keterangan_riwayat_imunisasi: ['',Validators.required],
  });

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.no_rm = localStorage.getItem('noRM');
    this.no_transaksi = localStorage.getItem('noTransaksi');
    this.ambilDataAsesmenAnak();
  }


  validasiRequired(){
    if(this.angka_kehamilan == ''){
      this.toastr.error('Input lama kehamilan tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.waktu_kehamilan == ''){
      this.toastr.error('Pilihan minggu atau bulan lama kehamilan harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.komplikasi == ''){
      this.toastr.error('Pilihan komplikasi saat kehamilan harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.tipe == ''){
      this.toastr.error('Pilihan tipe harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.keterangan_tipe == '') {
      this.toastr.error('Input keterangan tipe harus di isi', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.riwayat_natal == '') {
      this.toastr.error('Pilihan Riwayat Natal harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.riwayat_natal == 'Persalinan' && this.keterangan_riwayat_natal_select == '') {
      this.toastr.error('Pilihan Persalinan Riwayat Natal harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.riwayat_natal == 'Penyulit Persalinan' && this.keterangan_riwayat_natal_input == '') {
      this.toastr.error('Pilihan Penyulit Persalinan Riwayat Natal harus di isi', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.riwayat_post_natal == '') {
      this.toastr.error('Pilihan Riwayat Post Natal harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.riwayat_post_natal == 'Pasca' && this.keterangan_riwayat_post_natal_select == '') {
      this.toastr.error('Pilihan Pasca harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.riwayat_post_natal == 'Lainnya' && this.keterangan_riwayat_post_natal_input == '') {
      this.toastr.error('Input Riwayat Post Natal Lainnya harus di isi', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.anak_merasa_terpisah == '') {
      this.toastr.error('Pilihan Anak Terpisah harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.pernah_dirawat_sebelumnya == '') {
      this.toastr.error('Pilihan Anak Pernah Dirawat harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.cemas == '') {
      this.toastr.error('Pilihan Cemas harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.orang_terdekat_select == ''){
      this.toastr.error('Pilihan Orang Terdekat harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.orang_terdekat_select == 'Lainnya' && this.orang_terdekat_input == '') {
      this.toastr.error('Input Orang Terdekat Lainnya tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.pendamping_anak_select == '') {
      this.toastr.error('Pilihan Pendamping Anak harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.pendamping_anak_select == 'Lainnya' && this.pendamping_anak_input == '') {
      this.toastr.error('Input Pendamping Anak Lainnya tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.reaksi_anak_select == '') {
      this.toastr.error('Pilihan Reaksi Anak harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.reaksi_anak_select == 'Lainnya' && this.reaksi_anak_input == '') {
      this.toastr.error('Input Reaksi Anak Lainnya tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.alasan_cemas_select == '') {
      this.toastr.error('Pilihan Alasan Cemas harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.alasan_cemas_select == 'Lainnya' && this.alasan_cemas_input == ''){
      this.toastr.error('Input Alasan Cemas Lainnya tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.pengasuh_select == '') {
      this.toastr.error('Pilihan Pengasuh harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.pengasuh_select == 'Lainnya' && this.pengasuh_input == '') {
      this.toastr.error('Input Pengasuh Lainnya tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.pembawaan_umum_select == '') {
      this.toastr.error('Pilihan Pembawaan Umum harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.pembawaan_umum_select == 'Lainnya' && this.pembawaan_umum_input == '') {
      this.toastr.error('Input Pembawaan Umum Lainnya tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.tempramen_select == '') {
      this.toastr.error('Pilihan Tempramen Umum harus di pilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.tempramen_select == 'Lainnya' && this.tempramen_input == '') {
      this.toastr.error('Input Tempramen Lainnya tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.kebiasaan_unik_select == '') {
      this.toastr.error('Pilihan Kebiasaan Unik harus dipilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.kebiasaan_unik_select == 'Tidak' && this.keterangan_kebiasaan_unik == '') {
      this.toastr.error('Input Keterangan Tidak Kebiasaan Unik tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.riwayat_imunisasi_select == '') {
      this.toastr.error('Pilihan Riwayat Imunisasi harus dipilih', 'Error');
      this.cekValidasiSimpan = false;
    } else if(this.riwayat_imunisasi_select == 'Tidak Lengkap' && this.keterangan_riwayat_imunisasi == '') {
      this.toastr.error('Input Riwayat Imunisasi Tidak Lengkap tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    }else{
      this.cekValidasiSimpan = true;
    }
  }

  simpan(){
    this.validasiRequired();
    this.validasiAngkaKehamilan();
    this.validasiRiwayatNatal();
    this.validasiRiwayatPostNatal();
    this.validasiOrangTerdekat();
    this.validasiPendampingAnak();
    this.validasiReaksiAnak();
    this.validasiAlasanCemas();
    this.validasiPengasuh();
    this.validasiPembawaanUmum();
    this.validasiTempramen();
    this.validasiKebiasaanUnik();
    this.validasiRiwayatImunisasi();
    
    let body = {
      // Main Data Input
      "id":this.idAsesmenAnak,
      "no_rm":this.no_rm,
      "no_transaksi":this.no_transaksi,
      "username":this.username,

      // Riwayat Prenatal
      "lama_kehamilan":this.lama_kehamilan,
      "komplikasi":this.komplikasi,
      "tipe":this.tipe,
      "keterangan_tipe":this.keterangan_tipe,
      "riwayat_natal":this.riwayat_natal,
      "keterangan_riwayat_natal":this.keterangan_riwayat_natal,
      "riwayat_post_natal":this.riwayat_post_natal,
      "keterangan_riwayat_post_natal":this.keterangan_riwayat_post_natal,

      // Hospitalisasi
      "orang_terdekat":this.orang_terdekat,
      "pendamping_anak":this.pendamping_anak,
      "anak_merasa_terpisah":this.anak_merasa_terpisah,
      "pernah_dirawat_sebelumnya":this.pernah_dirawat_sebelumnya,
      "reaksi_anak":this.reaksi_anak,
      "cemas":this.cemas,
      "alasan_cemas":this.alasan_cemas,

      // Pola Asuh Anak
      "pengasuh":this.pengasuh,
      "pembawaan_umum":this.pembawaan_umum,
      "tempramen":this.tempramen,
      "kebiasaan_unik":this.kebiasaan_unik,
      "keterangan_kebiasaan_unik":this.keterangan_kebiasaan_unik,
      "riwayat_imunisasi":this.riwayat_imunisasi,
      "keterangan_riwayat_imunisasi":this.keterangan_riwayat_imunisasi,
    };
    
    // console.log(body);
    // console.log(this.cekValidasiSimpan);

    if(this.cekValidasiSimpan == true){
      if(this.validasiCreateUpdate == 'Create'){
        // console.log('ini create');
        this.assesmentAnakService.simpan(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Assesmen anak sudah dibuat', 'Sukses', {
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
      } else if (this.validasiCreateUpdate == 'Update') {
        // console.log('ini update');
        this.assesmentAnakService.update(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.status == 'success'){
              this.toastr.success('Assesmen anak sudah diupdate', 'Sukses', {
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
      }
    }
    
  }

  // ambilAssesmentBaru(noTransaksiBaru){
  //   localStorage.setItem('noTransaksi', noTransaksiBaru);
  //   this.ngOnInit();
  //   this.validasiCreateUpdate = 'Update';
  // }

  ambilDataAsesmenAnak() {
    this.loading = true;
    this.assesmentAnakService.getAsesmenAnakByNoTrNoRM(this.no_rm, this.no_transaksi).subscribe(
      (data: any) => {
        // console.log(data);
        // console.log(JSON.stringify(data));
        this.asesmentAnak = data;
        // console.log("Asesment asesmentAnak.data");
        // console.log(this.asesmentAnak.data);
        if(this.asesmentAnak.data != null){
          this.validasiCreateUpdate = "Update";
          this.validasiButtonCreateUpdate = "Update";
          this.idAsesmenAnak = this.asesmentAnak.data.id;
          this.loading = false;
        } else {
          this.validasiCreateUpdate = "Create";
          this.validasiButtonCreateUpdate = "Simpan";
          this.loading = false;
        }
        // console.log(this.validasiCreateUpdate);

        // // Pasang nilai untuk update
        this.pasangRiwayatPrenatal(this.asesmentAnak);
        this.pasangHospitalisasi(this.asesmentAnak);
        this.pasangPolaAsuhAnak(this.asesmentAnak);
        this.loading = false;
      },(error: any) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  validasiAngkaKehamilan(){
    this.lama_kehamilan = this.angka_kehamilan + ' ' + this.waktu_kehamilan;
  }

  validasiRiwayatNatal(){
    if(this.riwayat_natal == 'Persalinan'){
      this.keterangan_riwayat_natal = this.keterangan_riwayat_natal_select;
    }else if(this.riwayat_natal == 'Penyulit Persalinan'){
      this.keterangan_riwayat_natal = this.keterangan_riwayat_natal_input;
    }
  }

  validasiRiwayatPostNatal(){
      if(this.riwayat_post_natal == 'Pasca'){
          this.keterangan_riwayat_post_natal = this.keterangan_riwayat_post_natal_select;
      }else if(this.riwayat_post_natal == 'Lainnya'){
          this.keterangan_riwayat_post_natal = this.keterangan_riwayat_post_natal_input;
      }else{
        this.keterangan_riwayat_post_natal = '';
      }
  }

  validasiOrangTerdekat(){
    if(this.orang_terdekat_select == 'Lainnya'){
      this.orang_terdekat = this.orang_terdekat_input;
    }else{
      this.orang_terdekat = this.orang_terdekat_select;
    }
  }

  validasiPendampingAnak(){
    if(this.pendamping_anak_select == 'Lainnya'){
        this.pendamping_anak = this.pendamping_anak_input;
    }else{
      this.pendamping_anak = this.pendamping_anak_select;
    }
  }

  validasiReaksiAnak(){
    if(this.reaksi_anak_select == 'Lainnya'){
      this.reaksi_anak = this.reaksi_anak_input;  
    }else{
      this.reaksi_anak = this.reaksi_anak_select;
    }
  }

  validasiAlasanCemas(){
    if(this.alasan_cemas_select == 'Lainnya'){
      this.alasan_cemas = this.alasan_cemas_input;
    }else{
      this.alasan_cemas = this.alasan_cemas_select;
    }
  }

  validasiPengasuh(){
    if(this.pengasuh_select == 'Lainnya'){
        this.pengasuh = this.pengasuh_input;
    }else{
      this.pengasuh = this.pengasuh_select;
    }
  }

  validasiPembawaanUmum(){
    if(this.pembawaan_umum_select == 'Lainnya'){
        this.pembawaan_umum = this.pembawaan_umum_input;
    }else{
      this.pembawaan_umum = this.pembawaan_umum_select;
    }
  }
  
  validasiTempramen(){
    if(this.tempramen_select == 'Lainnya'){
      this.tempramen = this.tempramen_input;
    }else{
      this.tempramen = this.tempramen_select;
    }
  }

  validasiKebiasaanUnik(){
    if(this.kebiasaan_unik_select == 'Tidak'){
      this.kebiasaan_unik = this.kebiasaan_unik_select;
      this.keterangan_kebiasaan_unik = this.keterangan_kebiasaan_unik;
    }else{
      this.kebiasaan_unik = this.kebiasaan_unik_select;
      this.keterangan_kebiasaan_unik = '';
    }
  }
  
  validasiRiwayatImunisasi(){
    if(this.riwayat_imunisasi_select == 'Tidak Lengkap'){
      this.riwayat_imunisasi = this.riwayat_imunisasi_select;
      this.keterangan_riwayat_imunisasi = this.keterangan_riwayat_imunisasi;
    }else{
      this.riwayat_imunisasi = this.riwayat_imunisasi_select;
      this.keterangan_riwayat_imunisasi = '';
    }
  }

  cekNilaiKehamilan(event: any, jenis: string) {
    if (jenis === 'angka') {
      let nilaiInput = event.target.value;
      // console.log('Input Angka: ' + nilaiInput);
      const isValidAngka = /^\d+$/.test(nilaiInput) && !/\s/.test(nilaiInput);
      if (!isValidAngka) {
        this.hiddenAlertRiwayatPrenatal = false;
        this.angka_kehamilan = '';
        this.pesanAlertRiwayatPrenatal = 'Input lama kehamilan tidak boleh spasi atau huruf';
      } else if (this.waktu_kehamilan == 'Bulan'){
        if(nilaiInput > 12){
          this.hiddenAlertRiwayatPrenatal = false;
          this.pesanAlertRiwayatPrenatal = 'Input lama kehamilan tidak boleh lebih dari 12 bulan';
          this.angka_kehamilan = '';
        } else {
          this.angka_kehamilan = nilaiInput;
          this.hiddenAlertRiwayatPrenatal = true;
        }
      } else {
        this.angka_kehamilan = nilaiInput;
        this.hiddenAlertRiwayatPrenatal = true;
      }
    } else if (jenis === 'pilih') {
      let nilaiPilih = event.target.value;
      // console.log('Input Pilihan: ' + nilaiPilih);
      if(nilaiPilih == 'Bulan'){
        if(this.angka_kehamilan > 12){
          this.hiddenAlertRiwayatPrenatal = false;
          this.pesanAlertRiwayatPrenatal = 'Input lama kehamilan tidak boleh lebih dari 12 bulan';
          this.angka_kehamilan = '';
        }else{
          this.hiddenAlertRiwayatPrenatal=true;
          this.waktu_kehamilan = nilaiPilih;
        }
      }else{
        this.hiddenAlertRiwayatPrenatal=true;
        this.waktu_kehamilan = nilaiPilih;
      }
    }
    this.lama_kehamilan = this.angka_kehamilan + ' ' + this.waktu_kehamilan;
  }

  // validasiAngkaKehamilan(param){
  //   let nilaiAngkaKehamilan = param.target.value;
  //   // console.log(nilaiAngkaKehamilan);
  //   // // console.log(this.waktu_kehamilan);

  //   if (isNaN(nilaiAngkaKehamilan)) 
  //   {
  //     this.hiddenAlertRiwayatPrenatal = false;
  //     this.angka_kehamilan = '';
  //     this.pesanAlertRiwayatPrenatal = 'Input lama kehamilan tidak boleh huruf';
  //   }

  //   // console.log(this.angka_kehamilan);
  //   let arrayAngkaKehamilan = [];
  //   arrayAngkaKehamilan = nilaiAngkaKehamilan.split("");
  //   // console.log(arrayAngkaKehamilan);
  //   arrayAngkaKehamilan.forEach((element,index)=>{
  //     if(element == ' '){
  //       this.hiddenAlertRiwayatPrenatal = false;
  //       this.angka_kehamilan = '';
  //       this.pesanAlertRiwayatPrenatal = 'Input lama kehamilan tidak boleh spasi';
  //     }
  //   });

  //   this.lama_kehamilan = this.angka_kehamilan + ' ' + this.waktu_kehamilan;
  // }

  // validasiWaktuKehamilan(){
  //   if(this.waktu_kehamilan == 'Bulan'){
  //     if(this.angka_kehamilan > 12){
  //       this.hiddenAlertRiwayatPrenatal = false;
  //       this.pesanAlertRiwayatPrenatal = 'Input lama kehamilan tidak boleh lebih dari 12 bulan';
  //       this.angka_kehamilan = '';
        
  //     }else{
  //       this.hiddenAlertRiwayatPrenatal=true;
  //     }
  //   }else{
  //     this.hiddenAlertRiwayatPrenatal=true;
  //   }

  //   this.lama_kehamilan = this.angka_kehamilan + ' ' + this.waktu_kehamilan;
  // }

  periksaNilaiRiwayatNatal(){
    // console.log(this.riwayat_natal);
    if(this.riwayat_natal == 'Persalinan'){
      this.hiddenSelectRiwayatNatal = false;
      this.hiddenInputRiwayatNatal = true;
      this.keterangan_riwayat_natal_input = '';
    }else if(this.riwayat_natal == 'Penyulit Persalinan'){
      this.hiddenSelectRiwayatNatal = true;
      this.hiddenInputRiwayatNatal = false;
      this.keterangan_riwayat_natal_select = '';
    }else{
      this.hiddenSelectRiwayatNatal = true;
      this.hiddenInputRiwayatNatal = true;
      this.keterangan_riwayat_natal_input = '';
      this.keterangan_riwayat_natal_select = '';
    }
  }
  
  periksaNilaiRiwayatPostNatal(){
    if(this.riwayat_post_natal == 'Pasca'){
      this.hiddenSelectRiwayatPostNatal = false;
      this.hiddenInputRiwayatPostNatal = true;
      this.keterangan_riwayat_post_natal_input = '';
    }else if(this.riwayat_post_natal == 'Lainnya'){
      this.hiddenSelectRiwayatPostNatal = true;
      this.hiddenInputRiwayatPostNatal = false;
      this.keterangan_riwayat_post_natal_select = '';
    }else{
      this.hiddenSelectRiwayatPostNatal = true;
      this.hiddenInputRiwayatPostNatal = true;
      this.keterangan_riwayat_post_natal_input = '';
      this.keterangan_riwayat_post_natal_select = '';
    }
  }
  
  periksaNilaiOrangTerdekat(){
    // console.log(this.orang_terdekat_select);
    if(this.orang_terdekat_select == 'Lainnya'){
      this.hiddenInputOrangTerdekat = false;
    }else{
      this.hiddenInputOrangTerdekat = true;
      this.orang_terdekat_input = '';
    }
  }
  
  periksaNilaiPendampingAnak(){
    // console.log(this.pendamping_anak_select);
    if(this.pendamping_anak_select == 'Lainnya'){
      this.hiddenInputPendampingAnak = false;
    }else{
      this.hiddenInputPendampingAnak = true;
      this.pendamping_anak_input = '';
    }
  }

  periksaNilaiReaksiAnak(){
    // console.log(this.reaksi_anak_select);
    if(this.reaksi_anak_select == 'Lainnya'){
      this.hiddenInputReaksiAnak = false;
    }else{
      this.hiddenInputReaksiAnak = true;
      this.reaksi_anak_input = '';
    }
  }
  
  periksaNilaiAlasanCemas(){
    // console.log(this.alasan_cemas_select);
    if(this.alasan_cemas_select == 'Lainnya'){
      this.hiddenInputAlasanCemas = false;
    }else{
      this.hiddenInputAlasanCemas = true;
      this.alasan_cemas_input = '';
    }
  }

  periksaNilaiPengasuh(){
    // console.log(this.pengasuh_select);
    if(this.pengasuh_select == 'Lainnya'){
      this.hiddenInputPengasuh = false;
    }else{
      this.hiddenInputPengasuh = true;
      this.pengasuh_input = '';
    }
  }

  periksaNilaiPembawaanUmum(){
    // console.log(this.pembawaan_umum_select);
    if(this.pembawaan_umum_select == 'Lainnya'){
      this.hiddenInputPembawaanUmum = false;
    }else{
      this.hiddenInputPembawaanUmum = true;
      this.pembawaan_umum_input = '';
    }
  }

  periksaNilaiTempramen(){
    // console.log(this.tempramen_select);
    if(this.tempramen_select == 'Lainnya'){
      this.hiddenInputTempramen = false;
    }else{
      this.hiddenInputTempramen = true;
      this.tempramen_input = '';
    }
  }

  periksaKebiasaanUnik(){
    // console.log(this.kebiasaan_unik_select);
    if(this.kebiasaan_unik_select == 'Tidak'){
      this.hiddenInputKebiasaanUnik = false;
    }else{
      this.hiddenInputKebiasaanUnik = true;
      this.keterangan_kebiasaan_unik = '';
    }
  }
  
  periksaRiwayatImunisasi(){
    // console.log(this.riwayat_imunisasi_select);
    if(this.riwayat_imunisasi_select == 'Tidak Lengkap'){
      this.hiddenInputRiwayatImunisasi = false;
    }else{
      this.hiddenInputRiwayatImunisasi = true;
      this.keterangan_riwayat_imunisasi = '';
    }
  }


  pasangRiwayatPrenatal(nilai){
    // console.log('pasang nilai asesmen anak');
    // console.log(nilai);
    // console.log('ini nilai kehamilan'); 
    // console.log(nilai.data.lama_kehamilan);
    // console.log('ini nilai split lama kehamilan');
    // console.log(nilai.data.lama_kehamilan.split(' '));
    let splitLamaKehamilan  = nilai.data.lama_kehamilan.split(' ');
    // console.log(splitLamaKehamilan[0]);
    this.angka_kehamilan = splitLamaKehamilan[0];
    this.waktu_kehamilan = splitLamaKehamilan[1];
    
    this.komplikasi = nilai.data.komplikasi;
    this.tipe = nilai.data.tipe;
    this.keterangan_tipe = nilai.data.keterangan_tipe;
    this.riwayat_natal = nilai.data.riwayat_natal;
    this.keterangan_riwayat_natal = nilai.data.keterangan_riwayat_natal;
    this.riwayat_post_natal = nilai.data.riwayat_post_natal;
    this.keterangan_riwayat_post_natal = nilai.data.keterangan_riwayat_post_natal;

    if(nilai.data.riwayat_natal == 'Persalinan'){
      this.hiddenSelectRiwayatNatal = false;
      this.hiddenInputRiwayatNatal = true;
      this.keterangan_riwayat_natal_select = nilai.data.keterangan_riwayat_natal;
    }else if(nilai.data.riwayat_natal == 'Penyulit Persalinan'){
      this.hiddenSelectRiwayatNatal = true;
      this.hiddenInputRiwayatNatal = false;
      this.keterangan_riwayat_natal_input = nilai.data.keterangan_riwayat_natal;
    }

    if(nilai.data.riwayat_post_natal == 'Pasca'){
      this.hiddenSelectRiwayatPostNatal = false;
      this.hiddenInputRiwayatPostNatal = true;
      this.keterangan_riwayat_post_natal_select = nilai.data.keterangan_riwayat_post_natal;
    }else if(nilai.data.riwayat_post_natal == 'Lainnya'){
      this.hiddenSelectRiwayatPostNatal = true;
      this.hiddenInputRiwayatPostNatal = false;
      this.keterangan_riwayat_post_natal_input = nilai.data.keterangan_riwayat_post_natal;
    }
    
  }
  
  pasangHospitalisasi(nilai){
    this.orang_terdekat = nilai.data.orang_terdekat;
    this.pendamping_anak = nilai.data.pendamping_anak;
    this.anak_merasa_terpisah = nilai.data.anak_merasa_terpisah;
    this.pernah_dirawat_sebelumnya = nilai.data.pernah_dirawat_sebelumnya;
    this.reaksi_anak = nilai.data.reaksi_anak;
    this.cemas = nilai.data.cemas;
    this.alasan_cemas = nilai.data.alasan_cemas;

    const arrOrangTerdekat = ['Ayah','Ibu','Kakak','Adik'];
    const cekOrangTerdekat = !arrOrangTerdekat.includes(nilai.data.orang_terdekat);
    // console.log(cekOrangTerdekat);
    if(cekOrangTerdekat == true){
      this.hiddenInputOrangTerdekat = false;
      this.orang_terdekat_input = nilai.data.orang_terdekat;
      this.orang_terdekat_select = 'Lainnya';
    }else{
      this.hiddenInputOrangTerdekat = true;
      this.orang_terdekat_select = nilai.data.orang_terdekat;
    }
    
    const arrPendampingAnak = ['Ayah','Ibu','Kakak','Nenek'];
    const cekPendampingAnak = !arrPendampingAnak.includes(nilai.data.pendamping_anak);
    if(cekPendampingAnak == true){
      this.hiddenInputPendampingAnak = false;
      this.pendamping_anak_input = nilai.data.pendamping_anak;
      this.pendamping_anak_select = 'Lainnya';
    }else{
      this.hiddenInputPendampingAnak = true;
      this.pendamping_anak_select = nilai.data.pendamping_anak;
    }

    const arrReaksiAnak = ['Menangis','Menyendiri'];
    const cekReaksiAnak = !arrReaksiAnak.includes(nilai.data.reaksi_anak);
    if(cekReaksiAnak == true){
      this.hiddenInputReaksiAnak = false;
      this.reaksi_anak_input = nilai.data.reaksi_anak;
      this.reaksi_anak_select = 'Lainnya';
    }else{
      this.hiddenInputReaksiAnak = true;
      this.reaksi_anak_select = nilai.data.reaksi_anak;
    }

    const arrAlasanCemas = ['Lingkungan Baru','Tindakan Medis','Kurang Informasi'];
    const cekAlasanCemas = !arrAlasanCemas.includes(nilai.data.alasan_cemas);
    if(cekAlasanCemas == true){
      this.hiddenInputAlasanCemas = false;
      this.alasan_cemas_input = nilai.data.alasan_cemas;
      this.alasan_cemas_select = 'Lainnya';
    }else{
      this.hiddenInputAlasanCemas = true;
      this.alasan_cemas_select = nilai.data.alasan_cemas;
    }

  }
  
  pasangPolaAsuhAnak(nilai){
    // this.pengasuh = nilai.data.pengasuh;
    this.pembawaan_umum = nilai.data.pembawaan_umum;
    this.tempramen = nilai.data.tempramen;
    this.kebiasaan_unik = nilai.data.kebiasaan_unik;
    this.keterangan_kebiasaan_unik = nilai.data.keterangan_kebiasaan_unik;
    this.riwayat_imunisasi = nilai.data.riwayat_imunisasi;
    this.keterangan_riwayat_imunisasi = nilai.data.keterangan_riwayat_imunisasi;
    
    const arrPengasuh = ['Orang Tua','Ayah','Ibu','Saudara'];
    const cekPengasuh = !arrPengasuh.includes(nilai.data.pengasuh);
    if(cekPengasuh === true){
      this.hiddenInputPengasuh = false;
      this.pengasuh_select = 'Lainnya';
      this.pengasuh_input = nilai.data.pengasuh;
    }else{
      this.hiddenInputPengasuh = true;
      this.pengasuh_select = nilai.data.pengasuh;
    }

    const arrPembawaanUmum = ['Periang','Penyendiri','Pemalu','Pemberani'];
    const cekPembawaanUmum = !arrPembawaanUmum.includes(nilai.data.pembawaan_umum);
    if(cekPembawaanUmum === true){
      this.hiddenInputPembawaanUmum = false;
      this.pembawaan_umum_select = 'Lainnya';
      this.pembawaan_umum_input = nilai.data.pembawaan_umum;
    }else{
      this.hiddenInputPembawaanUmum = true;
      this.pembawaan_umum_select = nilai.data.pembawaan_umum;
    }

    const arrTemprament = ['Pemarah','Ramah'];
    const cekTemprament = !arrTemprament.includes(nilai.data.tempramen);
    if(cekTemprament === true){
      this.hiddenInputTempramen = false;
      this.tempramen_select = 'Lainnya';
      this.tempramen_input = nilai.data.tempramen;
    }else{
      this.hiddenInputTempramen = true;
      this.tempramen_select = nilai.data.tempramen;
    }

    if(nilai.data.kebiasaan_unik != 'Ada'){
      this.hiddenInputKebiasaanUnik = false;
      this.kebiasaan_unik_select = 'Tidak';
      this.keterangan_kebiasaan_unik = nilai.data.keterangan_kebiasaan_unik;
    }else{
      this.hiddenInputKebiasaanUnik = true;
      this.kebiasaan_unik_select = nilai.data.kebiasaan_unik;
    }

    if(nilai.data.riwayat_imunisasi == 'Tidak Lengkap'){
      this.hiddenInputRiwayatImunisasi = false;
      this.riwayat_imunisasi_select = nilai.data.riwayat_imunisasi;
      this.keterangan_riwayat_imunisasi = nilai.data.keterangan_riwayat_imunisasi;
    }else{
      this.hiddenInputRiwayatImunisasi = true;
      this.riwayat_imunisasi_select = nilai.data.riwayat_imunisasi;
    }

  }
  




}
