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

import { AssesmentAwalService } from './Service/assesment-awal.service';
import { UGDService } from '../../UGD/UGD/Service/ugd.service';
import { TemplateService } from '../../Template/Service/Template.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

import { AssesmentAwalCetakComponent } from './Cetak/AssesmentAwalCetak.component';

import * as moment from 'moment';

import { GlobalComponent } from 'src/app/EMR/Globals/global.component';

@Component({
  selector: 'app-AssesmentAwal',
  templateUrl: './AssesmentAwal.component.html',
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
export class AssesmentAwalComponent implements OnInit {
  @ViewChild('signature')
  public signaturePad: SignaturePadComponent;
  
  public signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 500,
    'canvasHeight': 300,
    'penColor': 'rgb(3, 3, 255)',
  
  
    'backgroundColor': 'rgb(252, 252, 252)',
  };
  
  private urlGambar = GlobalComponent.urlGambar;

  heading = 'Asesmen Awal Medis Rawat Inap';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  // Validasi file Create / Update
  validasiCreateUpdate = '';
  validasiButtonTerisi = true;

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
  arrayKodeDokter:any= '';
  arrayNamaDokter:any= '';
  arrayIsiKonsulDokter:any= '';

  // Array Daftar Alergi
  listDaftarAlergi: any = [];
  arrayObatMakanan:any= '';
  arrayKeteranganAlergi:any= '';
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
  keluhan_utama:any= '';
  riwayat_penyakit_sekarang:any;
  riwayat_penyakit_dahulu:any;
  riwayat_penyakit_keluarga:any;
  
  // Diagnosis Alergi
  diagnosis:any;
  indikasi_rawat_inap:any;
  anamnesis:any= '';

  gambar_anatomi:any;
  image_gambar_anatomi = '';
  td:any;
  suhu:any;
  bb:any;
  saturasi:any;
  hr:any;
  rr:any;
  eye:any= '';
  motorik:any= '';
  verbal:any= '';
  gcs:any;
  keterangan_pemeriksaan_fisik:any;

  primer_kerja:any;
  diferensial_diagnosis:any;
  sekunder:any;

  rencana:any;
  isi_rencana:any;

  rencana_template:any;
  isi_rencana_template:any;
  
  // Modal 
  judulModal: string;
  listIsiModal:any;
  closeResultModal: string;
  idHapusTemplate:any;
  idEditTemplate:any;
  closeResultModalHapusTemplate: string;

  // Hidden
  hiddenGambarAnatomi = true;
  hiddenListDokter = true;
  hiddenFilterTemplate = true;
  
  // Disabled
  stringButtonUbahPemeriksaanFisik = 'Ubah';
  disabledPemeriksaanFisik = false;
  disabledButtonSimpan = true;

  constructor(
    public http :HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService, 
    private assesmentAwalService:AssesmentAwalService, 
    private ugdService:UGDService, 
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
      
    // Data Pasien
    pembayaranPasien: ['',Validators.required],
    namaPasien: ['',Validators.required],
    tempatLahirPasien: ['',Validators.required],
    tanggalLahirPasien: ['',Validators.required],
    alamat: ['',Validators.required],
    umur: ['',Validators.required],
    jenis_kelamin: ['',Validators.required],
    agama: ['',Validators.required],
    status_pernikahan: ['',Validators.required],
    telepon: ['',Validators.required],
    pendidikan: ['',Validators.required],
    pekerjaan: ['',Validators.required],

    // Daftar Alergi
    arrayObatMakanan: ['',Validators.required],
    arrayKeteranganAlergi: ['',Validators.required],

    // Keluhan Riwayat Pasien
    keluhan_utama: ['',Validators.required],
    riwayat_penyakit_sekarang: ['',Validators.required],
    riwayat_penyakit_dahulu: ['',Validators.required],
    riwayat_penyakit_keluarga: ['',Validators.required],
    
    // Diagnosis Alergi
    diagnosis: ['',Validators.required],
    indikasi_rawat_inap: ['',Validators.required],
    anamnesis: ['',Validators.required],

    gambar: ['',Validators.required],
    td: ['',Validators.required],
    suhu: ['',Validators.required],
    bb: ['',Validators.required],
    saturasi: ['',Validators.required],
    hr: ['',Validators.required],
    rr: ['',Validators.required],
    eye: ['',Validators.required],
    motorik: ['',Validators.required],
    verbal: ['',Validators.required],
    gcs: ['',Validators.required],
    keterangan_pemeriksaan_fisik: ['',Validators.required],
    
    primer_kerja: ['',Validators.required],
    diferensial_diagnosis: ['',Validators.required],
    sekunder: ['',Validators.required],

    rencana: ['',Validators.required],
    isi_rencana: ['',Validators.required],

    rencana_template: ['',Validators.required],
    isi_rencana_template: ['',Validators.required],
    
    // Array Daftar Alergi
    listDaftarAlergi: ['',Validators.required]

  });

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.no_rm = localStorage.getItem('noRM');
    this.no_transaksi = localStorage.getItem('noTransaksi');
    this.validasiCreateUpdate = 'Create';

    this.ambilDataPasien();
    this.ambilListDokter();
    this.ambilSemuaTemplate();
    this.ambilDataAssesmentAwal();
    this.ambilSemuaNoTransaksiPerNoRM();
    // this.ambilDataUGD();
    
  }

  ambilAssesmentBaru(noTransaksiBaru){
    localStorage.setItem('noTransaksi', noTransaksiBaru);
    this.ngOnInit();
    this.validasiCreateUpdate = 'Update';
  }

  // List data yang sudah ada
  ambilSemuaNoTransaksiPerNoRM(){
    this.assesmentAwalService.getByNoRM(this.no_rm).subscribe(
      (data: any) => {
        if(data.success == true){
          this.listNotransaksiPerNoRM = data.asesmenAwal;
        } else {
          this.toastr.error(data.message, 'Error');
        }
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
          this.pasangImageAnatomi(data.image[0]);
          this.pasangUpdateDiagnosis(this.listAssesmentAwal[0].diagnosis[0]);
          this.pasangUpdateDiagnosisAlergi(this.listAssesmentAwal[0].diagnosis_alergi[0]);
          this.pasangUpdateRencanaDanInstruksi(this.listAssesmentAwal[0].rencana_dan_instruksi[0]);
      },(error: any) => console.log(error)
    );
  }

  periksaValidasiButtonTerisi(){
    if(this.keluhan_utama == ''){
      this.validasiButtonTerisi = true;
    } else {
      this.validasiButtonTerisi = false;
    }
  }

  periksaDisabledButtonSimpan()
  {
    if(this.keluhan_utama == ''){
      this.disabledButtonSimpan = true;
    } else {
      this.disabledButtonSimpan = false;
    }
  }

  simpan(){
    // this.periksaDisabledButtonSimpan();
    if(this.keluhan_utama == ''){
      this.toastr.error('Harap Lengkapi Field Asesmen Awal', 'Error', {
        timeOut: 2000,
      });               
    } else {
      let body = {
          // Main Data Input
          "no_rm" : this.no_rm,
          "no_transaksi":this.no_transaksi,
          "username":this.username,
  
          // Diagnosis Alergi
          "diagnosis":this.diagnosis,
          "indikasi_rawat_inap":this.indikasi_rawat_inap,
          "anamnesis":this.anamnesis,
          
          // Keluhan Riwayat Pasien
          "keluhan_utama":this.keluhan_utama,
          "riwayat_penyakit_sekarang":this.riwayat_penyakit_sekarang,
          "riwayat_penyakit_dahulu":this.riwayat_penyakit_dahulu,
          "riwayat_penyakit_keluarga":this.riwayat_penyakit_keluarga,
  
          // Diagnosa
          "primer_kerja":this.primer_kerja,
          "diferensial_diagnosis":this.diferensial_diagnosis,
          "sekunder":this.sekunder,
  
          // Pemeriksaan Fisik
          "td":this.td,
          "suhu":this.suhu,
          "bb":this.bb,
          "saturasi":this.saturasi,
          "hr":this.hr,
          "rr":this.rr,
          "eye":this.eye,
          "motorik":this.motorik,
          "verbal":this.verbal,
          "gcs":this.gcs,
          "keterangan_pemeriksaan_fisik":this.keterangan_pemeriksaan_fisik,
          "rencana":this.rencana,
          "isi_rencana":this.isi_rencana,
          // Alergi obat array
          "daftar_alergi":this.listDaftarAlergi,
  
          // Konsul Dokter
          "konsul_dokter_lain":this.listDokter,
  
      };
      
      console.log(body);
  
      if(this.validasiCreateUpdate == 'Create'){
        this.assesmentAwalService.simpan(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Asesmen awal sudah dibuat', 'Sukses', {
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
        console.log("Update Terpanggil");
        this.assesmentAwalService.update(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Asesmen awal sudah diupdate', 'Sukses', {
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

  ambilDataUGD(){
    this.ugdService.getUGDAssesmentByNoTransaksiNoRM(this.no_rm, this.no_transaksi).subscribe(
      (data: any) => {
        // console.log(data.pemeriksaan_fisik_assesment_ugd[0]);
        if(this.validasiCreateUpdate == 'Create'){
          this.td = data.pemeriksaan_fisik_assesment_ugd[0].sistole;
          this.suhu = data.pemeriksaan_fisik_assesment_ugd[0].suhu_tubuh;
          this.bb = data.pemeriksaan_fisik_assesment_ugd[0].berat_badan;
          this.saturasi = data.pemeriksaan_fisik_assesment_ugd[0].saturasi;
          this.hr = data.pemeriksaan_fisik_assesment_ugd[0].heart_rate;
          this.rr = data.pemeriksaan_fisik_assesment_ugd[0].frekuensi_nafas;
          this.eye = data.pemeriksaan_fisik_assesment_ugd[0].eye;
          this.motorik = data.pemeriksaan_fisik_assesment_ugd[0].motorik;
          this.verbal = data.pemeriksaan_fisik_assesment_ugd[0].verbal;
          this.gcs = data.pemeriksaan_fisik_assesment_ugd[0].gcs;
        }
      }
    );
  }

  pasangImageAnatomi(params){
    console.log('pasangImageAnatomi');
    if(params){
      console.log(params);
      this.hiddenGambarAnatomi = false;
      this.image_gambar_anatomi = this.urlGambar + params.path;
      this.gambar_anatomi = params.anggota_tubuh;
  
      console.log(this.image_gambar_anatomi);
      console.log(this.gambar_anatomi);
      this.background = this.image_gambar_anatomi;
      this.signaturePad.fromDataURL(this.background)
    }
  }

  ubahDisabledPemeriksaanFisik(){
    let string = this.stringButtonUbahPemeriksaanFisik;
    if(string == 'Ubah'){
      this.stringButtonUbahPemeriksaanFisik = 'Selesai';
      this.disabledPemeriksaanFisik = false;
    } else if(string = 'Selesai'){
      this.stringButtonUbahPemeriksaanFisik = 'Ubah';
      this.disabledPemeriksaanFisik = true;
    }
  }

  pasangNilaiGCSPemeriksaanFisik(){
    this.gcs = Number(this.eye) + Number(this.motorik) + Number(this.verbal);
  }

  // pasangNilaiPemeriksaanFisikUpdate(nilai){
  //   this.sistole = nilai.sistole;
  //   this.diastole = nilai.diastole;
  //   this.suhu_tubuh = nilai.suhu_tubuh;
  //   this.berat_badan = nilai.berat_badan;
  //   this.saturasi = nilai.saturasi;
  //   this.gcs_pemeriksaan_fisik = nilai.gcs;
  //   this.eye = nilai.eye;
  //   this.motorik = nilai.motorik;
  //   this.verbal = nilai.verbal;
  //   this.heart_rate = nilai.heart_rate;
  //   this.irama = nilai.irama;
  //   this.frekuensi_nafas = nilai.frekuensi_nafas;
  //   this.tipe = nilai.tipe;
  //   this.gambar_anatomi = nilai.gambar_anatomi;
  //   this.cttn_pem_fisik_dan_penunjng = nilai.cttn_pem_fisik_dan_penunjng;
  //   this.pasangImageAnatomi(this.gambar_anatomi);
  //   this.pasangNilaiGCS();

  // }
  
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

  ubahlistNamaObatAlergi(id, event){
    this.listDaftarAlergi[id].obat_alergi = event.target.value;
  }

  ubahlistJenisAlergi(id, event){
    this.listDaftarAlergi[id].jenis_alergi = event.target.value;
  }

  ubahlistKeteranganAlergi(id, event){
    this.listDaftarAlergi[id].keterangan_alergi = event.target.value;
  }

  hapusArrayDaftarAlergi(nilai){
    console.log(this.listDaftarAlergi);
    this.listDaftarAlergi.splice(nilai, 1);
  }

  tambahArrayDaftarAlergi(){
    if(this.arrayObatMakanan == ''){
      this.toastr.error('Harap Lengkapi Field Alergi Obat', 'Error', {
        timeOut: 2000,
      });               
    } else if(this.arrayKeteranganAlergi == ''){
      console.log(this.arrayKeteranganAlergi);
      this.toastr.error('Harap Lengkapi Field Keterangan Alergi Obat', 'Error', {
        timeOut: 2000,
      });               
    } else if(this.arrayJenisAlergi == ''){
      this.toastr.error('Harap Lengkapi Field Jenis Alergi Obat', 'Error', {
        timeOut: 2000,
      });               
    } else{
      this.listDaftarAlergi.push({
        // kode_diagnosa_sekunder:this.arrayKodeDiagnosaSekunder,
        obat_alergi:this.arrayObatMakanan,
        keterangan_alergi:this.arrayKeteranganAlergi,
        jenis_alergi:this.arrayJenisAlergi
  
      });
      this.arrayObatMakanan = '';
      this.arrayKeteranganAlergi = '';
      this.arrayJenisAlergi = '';
      this.toastr.success('Daftar alergi obat sudah ditambahkan', 'Sukses', {
        timeOut: 2000,
      });                
    }
  }

  background:string;
  createSignaturePad(nilai: any): void{
    this.hiddenGambarAnatomi = false;
    if(nilai == 'Putih'){
      this.image_gambar_anatomi= '';
      this.gambar_anatomi = 'Putih';
    }else if(nilai == 'Tubuh'){
      this.image_gambar_anatomi= './assets/images/anatomi/tubuh.png';
      this.gambar_anatomi = 'Tubuh';
    }else if(nilai == 'Organ'){
      this.image_gambar_anatomi= './assets/images/anatomi/organ.png';
      this.gambar_anatomi = 'Organ';
    }else if(nilai == 'Kepala'){
      this.image_gambar_anatomi= './assets/images/anatomi/kepala.png';
      this.gambar_anatomi = 'Kepala';
    }else if(nilai == 'Mata Hidung'){
      this.image_gambar_anatomi= './assets/images/anatomi/mata_hidung.jpg';
      this.gambar_anatomi = 'Mata Hidung';
    }else if(nilai == 'Mulut'){
      this.image_gambar_anatomi= './assets/images/anatomi/mulut.png';
      this.gambar_anatomi = 'Mulut';
    }else if(nilai == 'Kemaluan'){
      this.image_gambar_anatomi= './assets/images/anatomi/kemaluan.png';
      this.gambar_anatomi = 'Kemaluan';
    }else{
      this.image_gambar_anatomi= '';
      this.gambar_anatomi = '';
    }
    this.background = this.image_gambar_anatomi;
    this.signaturePad.fromDataURL(this.background)
    console.log(this.background);
  }

  public signatureImage : string;
  uploadSignaturePad(){
    this.signatureImage = this.signaturePad.toDataURL();
    let body = {
      "no_rm" : this.no_rm,
      "no_transaksi":this.no_transaksi,
      "fitur":"Assesment Awal",
      "anggota_tubuh":this.gambar_anatomi,
      "image":this.signatureImage
    };
    this.assesmentAwalService.uploadSignaturePad(body).subscribe(
      (data: any) => {
        if(data){
          this.toastr.success('Berhasil', 'Sukses', {
            timeOut: 2000,
          });
        } else {
          this.toastr.error('Simpan Foto Gagal', 'Eror');
        }
      },(error: any) => console.log(error)
    );
  }

  drawComplete(event: Event) {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart(event: Event) {
    console.log('begin drawing');
  }

  clearSignaturePad(){
    this.signaturePad.clear();
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

  fungsiHiddenListDokter(params){
    console.log("fungsiHiddenListDokter");
    console.log(params);
    if(params == 'Tampil'){
      this.hiddenListDokter = false;
    } else {
      this.hiddenListDokter = true;
    }
  }

  ambilListDokterDenganParams(parameter, parameterIndex){
    let params = parameter.target.value;
    console.log("Params");
    console.log(params);
    if(params == ''){
      this.hiddenListDokter = true;
    } else {
      this.hiddenListDokter = false;
      this.listNamaDokter = [];
      console.log(params);
      this.arrayIndexDokter = parameterIndex;
      this.assesmentAwalService.getDokterByParams(params).subscribe(
        (data: any) => {
          this.listNamaDokter = data.dokter;
        },(error: any) => {
          // this.toastr.error(error.error.message, 'Error');
        }
      );
      
    }
    
  }
  
  periksaNamaDokterDenganParams(){
    let params = this.arrayNamaDokter;
    console.log(params);
    if(params == ''){

    } else {
      this.assesmentAwalService.getDokterByParams(params).subscribe(
        (data: any) => {
          this.listNamaDokter = data.dokter;
          console.log('Data List Nama Dokter Baru');
          console.log(this.listNamaDokter);
          this.listNamaDokter.forEach((key:any, val:any) => {
            if(this.arrayNamaDokter == key.namdokter){
              this.arrayKodeDokter = key.kddokter;
            } else {
              this.arrayKodeDokter = '';
            }
          })
      
        },(error: any) => {
          // this.toastr.error(error.error.message, 'Error');
        }
      );
      
      // arrayData2.forEach((keys : any, vals :any) => {
      //   if (key.group_id == keys.id) {
      //       key.group_name = keys.group_name;
      //   }
      // })
      
    }

  }
  
  tambahArrayDokter(){
    if(this.arrayKodeDokter == ''){
      this.toastr.error('Masukan Kode Dokter');
    } else if(this.arrayNamaDokter == ''){
      this.toastr.error('Masukan Nama Dokter');
    } else if(this.arrayIsiKonsulDokter == ''){
      this.toastr.error('Masukan Isi Konsul');
    } else {
      this.listDokter.push({
        // kode_diagnosa_sekunder:this.arrayKodeDiagnosaSekunder,
        kode_dokter:this.arrayKodeDokter,
        nama_dokter:this.arrayNamaDokter,
        isi_konsul:this.arrayIsiKonsulDokter
      });
      this.arrayKodeDokter = '';
      this.arrayNamaDokter = '';
      this.arrayIsiKonsulDokter = '';
      this.hiddenListDokter = true;
    }
  }

  pasangNilaiCreateNamaDokter(paramsKodeDokter, paramsNamaDokter){
    if(typeof this.arrayIndexDokter == 'string'){
      this.arrayKodeDokter = paramsKodeDokter;
      this.arrayNamaDokter = paramsNamaDokter;
    } else {
      this.listDokter[this.arrayIndexDokter].kode_dokter = paramsKodeDokter;
      this.listDokter[this.arrayIndexDokter].nama_dokter = paramsNamaDokter;
    }

    this.listNamaDokter = [];
    this.hiddenListDokter = true;
  }

  ubahlistNamaDokter(id, event){
    this.listDokter[id].nama_dokter = event.target.value;
  }

  hapusArrayDokter(nilai){
    this.listDokter.splice(nilai, 1);
  }

  updateStatusRaber(id){
    this.assesmentAwalService.updateStatusRaber(id).subscribe(
      (data: any) => {        
        this.ngOnInit();
        this.toastr.success('Raber sudah dibuat', 'Sukses', {
          timeOut: 2000,
        });  
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal'}).result.then((result) => {
      this.closeResultModal = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModal = `Dismissed ${this.getDismissReasonModal(reason)}`;
    });
  }
  
  private getDismissReasonModal(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ubahJudulModal(string){
    this.judulModal = string;
    this.templateService.getTemplateByMenuAndJudul('AssesmentAwal', this.judulModal).subscribe(
      (data: any) => {
        if(data.success == true){
          this.listIsiModal = data.data;
        } else {
            this.toastr.error(data.message, 'Error');
        }
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }

  pasangIsiModal(string){
    this.isi_rencana_template = string;
    this.modalService.dismissAll();
  }

  buatTemplate(){
    console.log(this.rencana_template);
    if(!this.rencana_template){
      this.toastr.error('Masukkan Nama Rencana', 'Error');
    } else if(!this.isi_rencana_template){
      this.toastr.error('Masukkan Isi Rencana', 'Error');
    } else {
      if(Number(this.idEditTemplate)){
        console.log("Edit");
        let body = {
            // Main Data Input
            "id":this.idEditTemplate,
            "username":this.username,
            "hak_akses":"Super Admin",
            "router_link":"AsesmenAwal",
            "judul":this.rencana_template,
            "isi":this.isi_rencana_template,
        };
        console.log(body);
        this.templateService.updateTemplate(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Template Asesmen awal sudah dibuat', 'Sukses', {
                timeOut: 2000,
              });                
              this.rencana_template = '';
              this.isi_rencana_template = '';
              this.ambilSemuaTemplate();
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      } else {
        let body = {
            // Main Data Input
            "username":this.username,
            "hak_akses":"Super Admin",
            "router_link":"AsesmenAwal",
            "judul":this.rencana_template,
            "isi":this.isi_rencana_template,
        };
        console.log(body);
        this.templateService.simpanTemplate(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Template Asesmen awal sudah dibuat', 'Sukses', {
                timeOut: 2000,
              });                
              this.rencana_template = '';
              this.isi_rencana_template = '';
              this.ambilSemuaTemplate();
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      }
      this.idEditTemplate = '';
    }
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

  hapusTemplate(){
    this.templateService.deleteTemplate(this.idHapusTemplate).subscribe(
      (data: any) => {
        this.toastr.success('Template Asesmen awal sudah dihapus', 'Sukses', {
          timeOut: 2000,
        });            
        this.ambilSemuaTemplate();
        this.modalService.dismissAll();    
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }

  batalHapusTemplate(){
    this.idHapusTemplate = '';
    this.modalService.dismissAll();
  }

  openModalHapusTemplate(content, id) {
    this.idHapusTemplate = id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-hapus-template'}).result.then((result) => {
      this.closeResultModalHapusTemplate = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModalHapusTemplate = `Dismissed ${this.getDismissReasonModalHapusTemplate(reason)}`;
    });
  }
  
  private getDismissReasonModalHapusTemplate(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  editArrayTemplate(id, judul, isi){
    this.idEditTemplate = id;
    this.rencana_template = judul;
    this.isi_rencana_template = isi;
  }

  pilihArrayTemplate(judul, isi){
    this.rencana = judul;
    this.isi_rencana = isi;
    this.hiddenFilterTemplate = true;
  }

  ambilFilterTemplate(event){
    let routerLink = 'AsesmenAwal';
    let params = event.target.value;
    this.templateService.getFilterTemplate(routerLink, params).subscribe(
      (data: any) => {
        this.listFilterTemplate = data.template; 
      },(error: any) => {
        // this.toastr.error(error.error.message, 'Error');
      }
    );
  }
  
  keyupFilterTemplate(event){
    let nilaiKeyup = event.target.value;
    if(nilaiKeyup){
      this.hiddenFilterTemplate = false;
    } else {
      this.listFilterTemplate = [];
      this.hiddenFilterTemplate = true;
    }
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

  pasangUpdateDiagnosis(nilai){
    this.primer_kerja = nilai.primer_kerja;
    this.diferensial_diagnosis = nilai.diferensial_diagnosis;
    this.sekunder = nilai.sekunder;
  }
  
  pasangUpdateDiagnosisAlergi(nilai){
    this.diagnosis = nilai.diagnosis;
    this.indikasi_rawat_inap = nilai.indikasi_rawat_inap;
    this.anamnesis = nilai.anamnesis;
  }

  pasangUpdateRencanaDanInstruksi(nilai){
    this.rencana = nilai.rencana;
    this.isi_rencana = nilai.isi_rencana;
    
  }

  periksaAngkaInput(params){
    if(params == 'TD'){
      if(!Number(this.td)){
        this.toastr.error('TD Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.td = '';
      }
    } else if(params == 'Suhu'){
      if(!Number(this.suhu)){
        this.toastr.error('Suhu Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.suhu = '';
      }
    } else if(params == 'BB'){
      if(!Number(this.bb)){
        this.toastr.error('Berat Badan Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.bb = '';
      }
    } else if(params == 'Saturasi'){
      if(!Number(this.saturasi)){
        this.toastr.error('Saturasi Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.saturasi = '';
      }
    } else if(params == 'HR'){
      if(!Number(this.hr)){
        this.toastr.error('HR Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.hr = '';
      }
    } else if(params == 'RR'){
      if(!Number(this.rr)){
        this.toastr.error('RR Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.rr = '';
      }
    } else if(params == 'Eye'){
      if(!Number(this.eye)){
        this.toastr.error('Eye Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.eye = '';
      }
    } else if(params == 'Motorik'){
      if(!Number(this.motorik)){
        this.toastr.error('Motorik Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.motorik = '';
      }
    } else if(params == 'Verbal'){
      if(!Number(this.verbal)){
        this.toastr.error('Verbal Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.verbal = '';
      }
    } else if(params == 'GCS'){
      if(!Number(this.gcs)){
        this.toastr.error('GCS Harus berisi Angka ', 'Error', {
          timeOut: 2000,
        });             
        this.gcs = '';
      }
    }
  }









}
