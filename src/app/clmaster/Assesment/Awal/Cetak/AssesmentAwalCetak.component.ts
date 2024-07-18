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
import { TemplateService } from '../../../Template/Service/Template.service';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';

import { AssesmentAwalService } from '../Service/assesment-awal.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

import * as moment from 'moment';

@Component({
    selector: 'app-AssesmentAwalCetak',
    templateUrl: './AssesmentAwalCetak.component.html',
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
  export class AssesmentAwalCetakComponent implements OnInit {
    @ViewChild('signature')
    public signaturePad: SignaturePadComponent;

    heading = 'Asesmen Rawat Inap';
    subheading :any;
    icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

    AssesmentAwal: any = [];
    
    // Validasi file Create / Update
    validasiCreateUpdate = '';

    listFilterTemplate: any = [];

    // Icon
    faBook = faBook;
    faCheck = faCheck;
    faTrash = faTrash;
    faWindowClose = faWindowClose;
    faPencilAlt = faPencilAlt;
    faPlusCircle = faPlusCircle;
    faPrint = faPrint;
    
    listNotransaksiPerNoRM: any = [];
    listAssesmentAwal: any = [];

    listTemplate: any = [];
    assesmentAwal: any = [];
    daftarAlergi: any = [];
    konsulDokterLain: any = [];
    listDokter: any = [];
    listNamaDokter: any = [];
    arrayIndexDokter:any;
    arrayKodeDokter:any;
    arrayNamaDokter:any;
    arrayIsiKonsulDokter:any;

    // Array Daftar Alergi
    listDaftarAlergi: any = [];
    arrayObatMakanan:any;
    arrayKeteranganAlergi:any;
    arrayJenisAlergi:string = '';

    // Data Pasien
    pembayaranPasien:any;
    namaPasien:any;
    tempatLahirPasien:any;
    tanggalLahirPasien:any;
    alamat:any;
    umur:any;
    jenis_kelamin:any;
    agama:any;
    status_pernikahan:any;
    telepon:any;
    pendidikan:any;
    pekerjaan:any;

    // Main Data Input
    no_rm:any;
    no_transaksi:any;
    username:any;

    // Keluhan Riwayat Pasien
    keluhan_utama:any;
    riwayat_penyakit_sekarang:any;
    riwayat_penyakit_dahulu:any;
    riwayat_penyakit_keluarga:any;
    
    // Diagnosis Alergi
    diagnosis:any;
    indikasi_rawat_inap:any;
    anamnesis:any;

    gambar:any;
    gambar_anatomi:any;
    td:any;
    suhu:any;
    bb:any;
    saturasi:any;
    hr:any;
    rr:any;
    eye:any;
    motorik:any;
    verbal:any;
    gcs:any;
    keterangan_pemeriksaan_fisik:any;

    primer_kerja:any;
    diferensial_diagnosis:any;
    sekunder:any;

    rencana:any;
    isi_rencana:any;

    
    rencana_template:any;
    isi_rencana_template:any;
    

    // Hidden
    hiddenGambarAnatomi = true;
    hiddenListDokter = true;
    hiddenFilterTemplate = true;
    
    // Modal 
    judulModal: string;
    listIsiModal:any;
    closeResultModal: string;
    idHapusTemplate:any;
    idEditTemplate:any;
    closeResultModalHapusTemplate: string;

    constructor(
      public http :HttpClient,
      private router: Router,
      private route: ActivatedRoute,
      private modalService: NgbModal,
      public toastr: ToastrService, 
      private assesmentAwalService:AssesmentAwalService, 
      private templateService:TemplateService,
      private fb: FormBuilder,
      public datepipe: DatePipe,
      ) {
      // this.options = fb.group({
      //   hideRequired: false,
      //   floatLabel: 'auto',
      // });

    }

    ngOnInit(): void {
      this.username = localStorage.getItem('username');
      this.no_rm = localStorage.getItem('noRM');
      this.no_transaksi = localStorage.getItem('noTransaksi');
        
      this.ambilDataPasien();
      this.ambilListDokter();
      this.ambilSemuaTemplate();
      this.ambilDataAssesmentAwal();
      this.ambilSemuaNoTransaksiPerNoRM();
      

    }

    ambilDataPasien(){
      this.assesmentAwalService.getDataPasien(this.no_rm).subscribe(
      (data: any) => {
          this.pembayaranPasien = data.pasien[0].nama;
          this.namaPasien = data.pasien[0].pasien;
          this.tempatLahirPasien = data.pasien[0].tempatlahir;
          this.tanggalLahirPasien = moment(data.pasien[0].tgllahir).format('DD-MM-yyyy');
          this.alamat = data.pasien[0].alamat;
          if(data.pasien[0].jeniskelamin == 'L'){
            this.jenis_kelamin = 'Laki - Laki';
          } else if(data.pasien[0].jeniskelamin == 'P'){
            this.jenis_kelamin = 'Perempuan';
          }
          this.agama = data.pasien[0].agama;
          this.status_pernikahan = data.pasien[0].statusmarital;
          this.telepon = data.pasien[0].hp;
          this.pendidikan = data.pasien[0].pendidikan;
          this.pekerjaan = data.pasien[0].perkerjaan;
  
          this.hitungUmurPasien(data.pasien[0].tgllahir);
  
      },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
      }
      );
      
    }
  
    hitungUmurPasien(params){
      let tahunUmurPasien = 0;
      let bulanUmurPasien = 0;
      let hariUmurPasien = 0;
      if((+formatDate(new Date(), 'yyyy', 'en') - +formatDate(params, 'yyyy', 'en')) > 0){
        tahunUmurPasien = +formatDate(new Date(), 'yyyy', 'en') - +formatDate(params, 'yyyy', 'en');
      } else {
        tahunUmurPasien = +formatDate(params, 'yyyy', 'en') - +formatDate(new Date(), 'yyyy', 'en');
      }
      
      if((+formatDate(new Date(), 'MM', 'en') - +formatDate(params, 'MM', 'en')) > 0){
        bulanUmurPasien = +formatDate(new Date(), 'MM', 'en') - +formatDate(params, 'MM', 'en');
      } else {
        bulanUmurPasien = +formatDate(params, 'MM', 'en') - +formatDate(new Date(), 'MM', 'en');
      }
  
      if((+formatDate(new Date(), 'dd', 'en') - +formatDate(params, 'dd', 'en')) > 0){
        hariUmurPasien = +formatDate(new Date(), 'dd', 'en') - +formatDate(params, 'dd', 'en');
      } else {
        hariUmurPasien = +formatDate(params, 'dd', 'en') - +formatDate(new Date(), 'dd', 'en');
      }
  
      this.umur = tahunUmurPasien + " Tahun " + bulanUmurPasien + " Bulan " + hariUmurPasien + " Hari ";
    }
  
    ambilSemuaTemplate(){
      this.templateService.getTemplateByMenu("AsesmenAwal").subscribe(
        (data: any) => {
          this.listTemplate = data.data;
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
      
    }
  
    ambilListDokter(){
      this.assesmentAwalService.getAllDokter().subscribe(
        (data: any) => {
          this.listNamaDokter = data.dokter;
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
      
    }
  
    ambilDataAssesmentAwal() {
      this.assesmentAwalService.getByNoTransaksiNoRM(this.no_rm, this.no_transaksi).subscribe(
        (data: any) => {
          console.log(data);
          // console.log(JSON.stringify(data));
          this.listAssesmentAwal = data.asesmenAwal;
          if(this.listAssesmentAwal[0]){
            this.validasiCreateUpdate = "Update";
          } else {
            this.validasiCreateUpdate = "Create";
          }
          
          // Pasang nilai untuk update
          this.listDaftarAlergi = this.listAssesmentAwal[0].daftar_alergi;
          this.listDokter = this.listAssesmentAwal[0].konsul_dokter_lain;
  
          this.pasangUpdateKeluhanPasien(this.listAssesmentAwal[0].keluhan_riwayat_pasien[0]);
          this.pasangUpdatePemeriksaanFisik(this.listAssesmentAwal[0].pemeriksaan_fisik[0]);
          this.pasangGambarAnatomi(data.image[0]);
          this.pasangUpdateDiagnosis(this.listAssesmentAwal[0].diagnosis[0]);
          this.pasangUpdateRencanaDanInstruksi(this.listAssesmentAwal[0].rencana_dan_instruksi[0]);

          console.log("this.listAssesmentAwal[0].diagnosis[0]");
          console.log(this.listAssesmentAwal[0].diagnosis[0]);

          console.log('this.listAssesmentAwal[0].rencana_dan_instruksi[0]');
          console.log(this.listAssesmentAwal[0].rencana_dan_instruksi[0]);
          
  
        },(error: any) => console.log(error)
      );
    }

    // List data yang sudah ada
    ambilSemuaNoTransaksiPerNoRM(){
      this.assesmentAwalService.getByNoRM(this.no_rm).subscribe(
        (data: any) => {
          // console.log("Ini untuk get by No RM");
          // console.log(data);
          if(data.success == true){
            this.listNotransaksiPerNoRM = data.asesmenAwal;
            // console.log(this.listNotransaksiPerNoRM);
            // console.log(this.listNotransaksiPerNoRM);
          } else {
            this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  
    pasangUpdateKeluhanPasien(nilai){
      this.keluhan_utama = nilai.keluhan_utama;
      this.riwayat_penyakit_dahulu = nilai.riwayat_penyakit_dahulu;
      this.riwayat_penyakit_sekarang = nilai.riwayat_penyakit_sekarang;
      this.riwayat_penyakit_keluarga = nilai.riwayat_penyakit_keluarga;
      
    }
  
    pasangUpdatePemeriksaanFisik(nilai){
      this.td = nilai.td;
      this.suhu = nilai.suhu;
      this.bb = nilai.bb;
      this.saturasi = nilai.saturasi;
      this.hr = nilai.hr;
      this.rr = nilai.rr;
      this.eye = nilai.eye;
      this.motorik = nilai.motorik;
      this.verbal = nilai.verbal;
      this.gcs = nilai.gcs;
      this.keterangan_pemeriksaan_fisik = nilai.keterangan_pemeriksaan_fisik;
  
      
    }
  
    pasangGambarAnatomi(nilai){
      if(nilai){
        this.hiddenGambarAnatomi = false;
        this.gambar = nilai.path;
        this.gambar_anatomi = nilai.anggota_tubuh;
        
        // this.signaturePad.fromDataURL(this.gambar);
      }
    }
  
    pasangUpdateDiagnosis(nilai){
      this.primer_kerja = nilai.primer_kerja;
      this.diferensial_diagnosis = nilai.diferensial_diagnosis;
      this.sekunder = nilai.sekunder;
  
    
    }
  
    pasangUpdateRencanaDanInstruksi(nilai){
      console.log("pasangUpdateRencanaDanInstruksi Terpanggil");
      this.rencana = nilai.rencana;
      this.isi_rencana = nilai.isi_rencana;
      
    }
  
  
    cetakParams(idPage){
      printDiv(idPage);
      // window.print();
    }
  
    cetak(){
      printDiv('halamanCetak');
      // window.print();
    }
  
      
  }
  