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
// import { printDiv } from 'src/library/print/print-div';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';

import { PartografService } from './Service/partograf.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
// import { TemplateService } from '../Template/Service/Template.service';

// import { AssesmentAnakCetakComponent } from './Cetak/AssesmentAnakCetak.component';

import * as moment from 'moment';

@Component({
  selector: 'app-Partograf',
  templateUrl: './Partograf.component.html',
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
export class PartografComponent implements OnInit {
  @ViewChild('signature')
  public signaturePad: SignaturePadComponent;
  
  public signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 500,
    'canvasHeight': 300,
    'penColor': 'rgb(3, 3, 255)',
  
  
    'backgroundColor': 'rgb(252, 252, 252)',
  };
  
  heading = 'Partograf';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';
  imageWaktuAtas = '../../../../assets/images/EMR/Partograf/waktuatas.jpg';
  imageDenyut = '../../../../assets/images/EMR/Partograf/denyutfix.jpg';
  imageAirKetuban = '../../../../assets/images/EMR/Partograf/airpenfix.jpg';
  imageBukaServik = '../../../../assets/images/EMR/Partograf/bukaservik.jpg';
  imageKontraksi = '../../../../assets/images/EMR/Partograf/kontraksifix.jpg';
  imageKetuban = '../../../../assets/images/EMR/Partograf/ketubanfix.jpg';
  imageObatCairan = '../../../../assets/images/EMR/Partograf/obatcairanfixss.jpg';
  imageTekananDarah = '.../../../../assets/images/EMR/Partograf/tdfix.jpg';
  imageTemperatur = '../../../../assets/images/EMR/Partograf/tempfix.jpg';
  imageUrine = '../../../../assets/images/EMR/Partograf/urinefix.jpg';

  // Validasi file Create / Update
  validasiCreateUpdate = '';

  validasiButtonCreateUpdate = '';

  listFilterTemplate: any = [];

  // Icon
  faBook = faBook;
  faCheck = faCheck;
  faTrash = faTrash;
  faWindowClose = faWindowClose;
  faPencilAlt = faPencilAlt;
  faPlusCircle = faPlusCircle;
  faPrint = faPrint;

  no_rm:any;
  no_transaksi:any;
  username:any;

  idPartograf:any;
  idTabelKala4:any;

  waktuPecahKetuban:any = '';
  tanggal_masuk:any = '';
  waktuMasuk:any = '';
  waktuMules:any = '';
  inputG:any = '';
  inputP:any = '';
  inputA:any = '';
  minggu:any = '';
  alertNilaiGPA:boolean = false;
  alertNilaiMinggu:boolean = false;
  namaPasien:any;
  
  partografData: any = [];
  createUpdatePartograf:any;

  catatanPersalinanData: any = [];
  tabelKala4Data: any = [];
  grafikPartografData: any = [];

  makanMinumData: any = [];

//   catatan Persalinan
  tanggal_persalinan:any;
  tempat_persalinan:any;
  tempat_persalinan_select:string = '';
  tempat_persalinan_input:any = '';
  alamat_tempat_persalinan:any;
  catatan:any;
  alasan_merujuk:any;
  tempat_rujukan:any;
  pendamping_saat_merujuk:string = '';
  masalah_dalam_kehamilan:string = '';

  // Kala I
  partogram_melewati_garis_waspada:string = '';
  masalah_lain:any;
  penatalaksanaan_masalah:any;
  hasilnya:any;

  // Kala II
  episiotomi:string = '';
  hasil_episiotomi:any = '';
  pendamping_saat_persalinan:string = '';
  gawat_janin:string = '';
  gawat_janini_tindakan:any;
  hasil_djj:any;
  distosia_bahu:string = '';
  distosia_bahu_tindakan:any;
  masalah_lain_penatalaksanaan:any;
  
  // kala III
  inisiasi_menyusu_dini:string = '';
  alasan:any;
  lama_kala:any;
  pemberian_oksitosin:string = '';
  alasan_tindakan_oksitosin:any;
  pemberian_oksitosin_2:string = '';
  alasan_tidak:any;
  penenangan_tali_pusat:string = '';
  alasan_tindakan_tali_pusat:any;
  masase_fudus_uteri:string = '';
  alasan_tindakan_fudus_uteri:any;
  plasenta_lahir_lengkap:string = '';
  plasenta_tidak_lengkap:any;
  plasenta_tidak_lahir:string = '';
  tindakan_plasenta_tidak_lahir:any;
  laserasi:string = '';
  lokasi_laserasi:any;
  laserasi_perineum:string = '';
  derajat_laserasi_perineum:string = '';
  tindakan_laserasi_perineum:any;
  atoni_uteri:string = '';
  tindakan_atoni_uteri:any;
  jumlah_darah_keluar:any;
  masalah_dan_penatalaksanaan:any;
  ku:any;
  td:any;
  nadi:any;
  nafas:any;
  masalah_dan_penatalaksanaan_kala_v:any;
  berat_badan:any;
  panjang_badan:any;
  jenis_kelamin:string = '';
  peneliaan_bayi_baru_lahir:string = '';
  sebutkan_cacat_bawaan:any;
  hiportemi_tindakan:any;
  pemberian_asi_setelah_jam_pertama:string = '';
  waktu_pemberian_asi:any;
  tindak_alasan:any;
  masalah_lain_sebutkan:any;

  selectedIntervensi:any = [];
  selectedIntervensiAfiksia:any = [];
  afiksia_lainnya:any;
  
  // selected
  bayi_lahir_select:string = '';
  input_afiksia_lainnya:any;
  nilaiBayiLahir:any;
  nilaiAfiksia:any;

  // modal pemantauan kala IV
  modalk4_jam_ke:any;
  modalk4_waktu:any;
  modalk4_tekanan_darah:any;
  modalk4_nadi:any;
  modalk4_suhu:any;
  modalk4_tinggi_fundus_uteri:any;
  modalk4_kontraksi_uterus:any;
  modalk4_kandung_kemih:any;
  modalk4_darah_keluar:any;
  arrKalaIV: any = [];

  // modal waktu
  closeResultModalWaktu: string;
  waktuGpa:any;
  // ampm:string = '';
  modalX:any;
  modalY:any;
  validasiWaktu:boolean = false;
  
  idPartografGrafik:any;
  
  // modal denyut jantung janin
  closeResultModalDenyutJanin: string;
  denyut_jantung:any;
  jam_djj_select:string = '';
  nextDataDjj:any;
  nowDataDjj:any;
  createUpdateDjj:any;
  alertNilaiDjj:boolean = false;
  validasiSimpanDjj:boolean = false;

  // modal ketuban penyusup
  closeResultModalKetubanPenyusup: string;
  air_ketuban_select:string = '';
  penyusupan_select:string = '';
  jam_ketuban_penyusup_select:string = '';
  nextDataKetubanPenyusup:any;
  nowDataKetubanPenyusup:any;
  createUpdateKetubanPenyusup:any;
  validasiSimpanKetuban:boolean = false;

  // modal pembukaan serviks dan turunnya kepala
  closeResultModalPembukaanServiks: string;
  pembukaan_select:string = '';
  penurunan_select:string = '';
  jam_pembukaan_penurunan_select:string = '';
  nextDataPembukaanServiks:any;
  nowDataPembukaanServiks:any;
  createUpdatePembukaanServiks:any;
  validasiSimpanPembukaan:boolean = false;

  // modal kontraksi
  closeResultModalKontraksi: string;
  jumlah_kontraksi_select:string = '';
  lama_kontraksi:any;
  jam_kontraksi_select:string = '';
  nextDataKontraksi:any;
  nowDataKontraksi:any;
  createUpdateKontraksi:any;
  alertNilaiLamaKontraksi:boolean = false;
  validasiSimpanKontraksi:boolean = false;
  
  // modal Oksitosin
  closeResultModalOksitosin: string;
  tetes_oksitosin:any;
  jam_oksitosin_select:string = '';
  nextDataOksitosin:any;
  nowDataOksitosin:any;
  createUpdateOksitosin:any;
  alertNilaiOksitosin:boolean = false;
  validasiSimpanOksitosin:boolean = false;
  
  // modal Obat dan Cairan
  closeResultModalObat: string;
  obat_1:any;
  obat_2:any;
  obat_3:any;
  obat_4:any;
  cairan_1:any;
  cairan_2:any;
  cairan_3:any;
  cairan_4:any;
  jam_obat_cairan_select:string = '';
  nextDataObat:any;
  nowDataObat:any;
  createUpdateObat:any;
  validasiSimpanObat:boolean = false;


  // modal Nadi
  closeResultModalNadi: string;
  nadi_input:any;
  jam_nadi_select:string = '';
  nextDataNadi:any;
  nowDataNadi:any;
  createUpdateNadi:any;
  validasiSimpanNadi:boolean = false;
  alertNilaiNadi:boolean = false;
  
  // modal Tekanan Darah
  closeResultModalTekananDarah: string;
  tekanan_sistole:any;
  tekanan_distole:any;
  jam_tekanan_darah_select:string = '';
  nextDataTekananDarah:any;
  nowDataTekananDarah:any;
  createUpdateTekananDarah:any;
  alertNilaiSytole:boolean = false;
  alertNilaiDistole:boolean = false;
  validasiSimpanTekananDarah:boolean = false;
  
  // modal Temp C
  closeResultModalTempC: string;
  temp_c:any;
  jam_temp_c_select:string = '';
  nextDataTempC:any;
  nowDataTempC:any;
  createUpdateTempC:any;
  alertNilaiTemp:boolean = false;
  validasiSimpanTemp:boolean = false;
  
  // modal Urin
  closeResultModalUrin: string;
  protein_select:string = '';
  aseton_select:string = '';
  volume:any;
  jam_urin_select:string = '';
  nextDataUrin:any;
  nowDataUrin:any;
  createUpdateUrin:any;
  alertNilaiVolume:boolean = false;
  validasiSimpanUrin:boolean = false;
  
  // input makan minum
  makan_terakhir:any;
  minum_terakhir:any;
  makan_jenis:any;
  minum_jenis:any;
  makan_porsi:any;
  minum_porsi:any;
  createUpdateMakanMinum:any;
  idMakanMinum:any;

  // grafik
  nilaiJamKe1:any;
  nilaiJamKe2:any;
  nilaiJamKe3:any;
  nilaiJamKe4:any;
  nilaiJamKe5:any;
  nilaiJamKe6:any;
  nilaiJamKe7:any;
  nilaiJamKe8:any;
  nilaiJamKe9:any;
  nilaiJamKe10:any;
  nilaiJamKe11:any;
  nilaiJamKe12:any;
  nilaiJamKe13:any;
  nilaiJamKe14:any;
  nilaiJamKe15:any;
  nilaiJamKe16:any;
  // grafik Djj
  titikDjj:any = [];
  garisDjj: any[] = [];
  // grafik ketuban penyusup
  titikKetubanPenyusup:any = [];
  // grafik pembukaan serviks & turunnya kepala
  titikPembukaan:any = [];
  titikTurun:any = [];
  garisPembukaan:any = [];
  garisTurun:any = [];
  waktuBawah:any = [];
  // grafik kontraksi
  titikKontraksi:any = [];
  // grafik oksitosin
  titikOksitosin:any = [];
  // grafik obat
  titikObat:any = [];
  // grafik Nadi
  titikNadi:any = [];
  garisNadi: any = [];
  // grafik tekanan darah
  titikSystole:any = [];
  titikDistole:any = [];
  garisSystole: any = [];
  garisDistole: any = [];
  // grafik temp C
  titikTempC:any = [];
  // grafik urin
  titikUrin:any = [];

  loading = false;
  validasiSimpanPartograf: boolean = false;
  alertKondisiIbu: boolean = false;
  alertBeratBadan: boolean = false;
  alertPanjangBadan: boolean = false;
  alertNilaiJamIV: boolean = false;
  alertNilaiWaktuIV: boolean = false;
  alertNilaiDarahIV: boolean = false;
  alertNilaiNadiIV: boolean = false;
  alertNilaiSuhuIV: boolean = false;
  alertNilaiUteriIV: boolean = false;
  alertNilaiUterusIV: boolean = false;
  alertNilaiKemihIV: boolean = false;
  alertNilaiKeluarIV: boolean = false;
  validasiSimpanMakanMinum: boolean = false;
  validasiSimpanKalaIV: boolean = false;
  validasiSimpanCatatanPersalinan: boolean = false;
  validasiSimpanAfiksia: boolean = false;

  constructor(
    public http :HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService, 
    private PartografService:PartografService, 

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

    // tanggal_masuk: ['',Validators.required],
    waktuPecahKetuban: ['',Validators.required],
    waktuMasuk: ['',Validators.required],
    waktuMules: ['',Validators.required],

    tanggal_persalinan: ['',Validators.required],

  });

    ngOnInit(): void {
        this.username = localStorage.getItem('username');
        this.no_rm = localStorage.getItem('noRM');
        this.no_transaksi = localStorage.getItem('noTransaksi');
        this.ambilDataPartograf();
        this.ambilDataPasien();
    }

    ambilDataPartograf() {
        this.loading = true;
        this.PartografService.getByNoRmNoTr(this.no_rm, this.no_transaksi).subscribe(
          (data: any) => {
            // console.log('data partograf');
            // console.log(data);
            this.partografData = data.data[0];
            if(this.partografData){
              this.idPartograf = this.partografData.id;
              this.createUpdatePartograf = 'Update';
            }else{
              this.createUpdatePartograf = 'Create';
            }
            this.catatanPersalinanData = data.catatanPersalinan;
            this.tabelKala4Data = data.tabelkala4;
            // console.log(this.partografData.id);
            // this.idPartograf = data.data[0].id;
            if(this.partografData){
              this.grafikPartografData = this.partografData.grafikpartograf;
            }else{
              this.grafikPartografData = [];
            }
            this.makanMinumData = data.makanMinumTerakhir;
            if(this.makanMinumData){
              this.idMakanMinum = this.makanMinumData.id;
              this.createUpdateMakanMinum = 'Update';
            }else{
              this.createUpdateMakanMinum = 'Create';
            }
            // console.log(this.createUpdateMakanMinum);
            let filterDjj = this.grafikPartografData.filter(item => item.denyut_jantung == null);
            let filterKetuban = this.grafikPartografData.filter(item => item.air_ketuban == null);
            let filterPembukaan = this.grafikPartografData.filter(item => item.pembukaan_serviks == null);
            let filterKontraksi = this.grafikPartografData.filter(item => item.jumlah_kontraksi == null);
            let filterOksitosin = this.grafikPartografData.filter(item => item.total_tetes == null);
            let filterObat = this.grafikPartografData.filter(item => item.obat == null);
            let filterNadi = this.grafikPartografData.filter(item => item.nadi == null);
            let filterTekananDarah = this.grafikPartografData.filter(item => item.systole == null);
            let filterTempC = this.grafikPartografData.filter(item => item.temp == null);
            let filterUrin = this.grafikPartografData.filter(item => item.protein == null);
            this.nextDataDjj = filterDjj[0];
            this.nextDataKetubanPenyusup = filterKetuban[0];
            this.nextDataPembukaanServiks = filterPembukaan[0];
            this.nextDataKontraksi = filterKontraksi[0];
            this.nextDataOksitosin = filterOksitosin[0];
            this.nextDataObat = filterObat[0];
            this.nextDataNadi = filterNadi[0];
            this.nextDataTekananDarah = filterTekananDarah[0];
            this.nextDataTempC = filterTempC[0];
            this.nextDataUrin = filterUrin[0];
            // console.log('this.grafikPartografData')  ;
            // console.log(this.grafikPartografData);
            if(this.partografData){
              this.pasangPartograf(this.partografData);
            }else{
              this.defaultDateTimeMasuk();
            }
            if(this.catatanPersalinanData){
              this.pasangCatatanPersalinan(this.catatanPersalinanData);
            }else{
              this.defaultDateTime();
            }
            this.pasangGrafikWaktu(this.grafikPartografData);
            this.pasangGrafikDjj(this.grafikPartografData);
            this.pasangGrafikKetubanPentusupan(this.grafikPartografData);
            this.pasangGrafikPembukaanServiks(this.grafikPartografData);
            this.pasangGrafikKontraksi(this.grafikPartografData);
            this.pasangGrafikOksitosin(this.grafikPartografData);
            this.pasangGrafikObat(this.grafikPartografData);
            this.pasangGrafikNadi(this.grafikPartografData);
            this.pasangGrafikTekananDarah(this.grafikPartografData);
            this.pasangGrafikTempC(this.grafikPartografData);
            this.pasangGrafikUrin(this.grafikPartografData);
            if(this.makanMinumData){
              this.pasangMakanMinum(this.makanMinumData);
            }
            this.loading = false;
          },(error: any) => {
            this.loading = false;
            console.log(error)
          }
        );
    }

    ambilDataPasien() {
      this.PartografService.getPasienNoRm(this.no_rm).subscribe(
        (data: any) => {


      
          
          if(data.pasien[0].pasien){
            this.namaPasien = data.pasien[0].pasien;
console.log(data.pasien[0].pasien)

          }else{
            this.namaPasien = '';
          }
          // console.log('data pasien');
          // console.log(data.pasien[0].pasien);
          
        }
      );
    }

    pasangPartograf(nilai){
        this.inputG = nilai.g;
        this.inputP = nilai.p;
        this.inputA = nilai.a;
        this.minggu = nilai.hamil_minggu;
        this.waktuPecahKetuban = nilai.waktu_ketuban_pecah;
        this.tanggal_masuk = nilai.tanggal_masuk;
        this.waktuMasuk = nilai.waktu_masuk;
        this.waktuMules = nilai.waktu_mules;
    }
    pipe = new DatePipe('en-US');
    defaultDateTimeMasuk() {
      // const sekarang = new Date();
      
      // this.tanggal_masuk = sekarang;
      // this.tanggal_masuk = moment(sekarang).format('yyyy-MM-DD');

      this.tanggal_masuk = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    }

    defaultDateTime() {
      // const sekarang = new Date();
      
      // this.tanggal_persalinan = sekarang;
      // this.tanggal_persalinan = moment(sekarang).format('yyyy-MM-DD');
      this.tanggal_persalinan = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    }
    
    pasangCatatanPersalinan(nilai){
        // console.log('nilai catatan persalinan');
        // console.log(nilai);
        this.tanggal_persalinan = nilai.tanggal_persalinan;
        if(nilai.tempat_persalinan === null){
          this.tempat_persalinan_select = '';
        }else{
          const arrTempatPersalinan = ['Rumah Ibu','Polindes','Klinik Swasta','Puskesmas','Rumah Sakit'];
          const cekTempatPersalinan = !arrTempatPersalinan.includes(nilai.tempat_persalinan);
          if(cekTempatPersalinan === true){
            this.tempat_persalinan_input = nilai.tempat_persalinan;
            this.tempat_persalinan_select = 'Lainnya';
          }else{
            this.tempat_persalinan_select = nilai.tempat_persalinan;
          }
        }
        this.alamat_tempat_persalinan = nilai.alamat_tempat_persalinan;
        this.catatan = nilai.catatan;
        this.alasan_merujuk = nilai.alasan_merujuk;
        this.tempat_rujukan = nilai.tempat_rujukan;
        this.pendamping_saat_merujuk = nilai.pendamping_saat_merujuk??'';
        this.masalah_dalam_kehamilan = nilai.masalah_dalam_kehamilan??'';
        // kala 1
        this.partogram_melewati_garis_waspada = nilai.partogram_melewati_garis_waspada??'';
        this.masalah_lain = nilai.masalah_lain;
        this.penatalaksanaan_masalah = nilai.penatalaksanaan_masalah;
        this.hasilnya = nilai.hasilnya;

        // kala2
        this.episiotomi = nilai.episiotomi??'';
        this.hasil_episiotomi = nilai.hasil_episiotomi??'';
        this.pendamping_saat_persalinan = nilai.pendamping_saat_persalinan??'';
        this.gawat_janin = nilai.gawat_janin??'';
        this.gawat_janini_tindakan = nilai.gawat_janini_tindakan??'';
        this.hasil_djj = nilai.hasil_djj??'';
        this.distosia_bahu = nilai.distosia_bahu??'';
        this.distosia_bahu_tindakan = nilai.distosia_bahu_tindakan??'';
        this.masalah_lain_penatalaksanaan = nilai.masalah_lain_penatalaksanaan;

        // kala3
        this.inisiasi_menyusu_dini = nilai.inisiasi_menyusu_dini??'';
        this.alasan = nilai.alasan??'';
        this.lama_kala = nilai.lama_kala;
        this.pemberian_oksitosin = nilai.pemberian_oksitosin??'';
        this.alasan_tindakan_oksitosin = nilai.alasan_tindakan_oksitosin??'';
        this.pemberian_oksitosin_2 = nilai.pemberian_oksitosin_2??'';
        this.alasan_tidak = nilai.alasan_tidak??'';
        this.penenangan_tali_pusat = nilai.penenangan_tali_pusat??'';
        this.alasan_tindakan_tali_pusat = nilai.alasan_tindakan_tali_pusat??'';
        this.masase_fudus_uteri = nilai.masase_fudus_uteri??'';
        this.alasan_tindakan_fudus_uteri = nilai.alasan_tindakan_fudus_uteri??'';
        this.plasenta_lahir_lengkap = nilai.plasenta_lahir_lengkap??'';
        this.plasenta_tidak_lengkap = nilai.plasenta_tidak_lengkap??'';
        this.plasenta_tidak_lahir = nilai.plasenta_tidak_lahir??'';
        this.tindakan_plasenta_tidak_lahir = nilai.tindakan_plasenta_tidak_lahir??'';
        this.laserasi = nilai.laserasi??'';
        this.lokasi_laserasi = nilai.lokasi_laserasi??'';
        this.laserasi_perineum = nilai.laserasi_perineum??'';
        this.derajat_laserasi_perineum = nilai.derajat_laserasi_perineum??'';
        this.tindakan_laserasi_perineum = nilai.tindakan_laserasi_perineum??'';
        this.atoni_uteri = nilai.atoni_uteri??'';
        this.tindakan_atoni_uteri = nilai.tindakan_atoni_uteri??'';
        this.jumlah_darah_keluar = nilai.jumlah_darah_keluar;
        this.masalah_dan_penatalaksanaan = nilai.masalah_dan_penatalaksanaan;

        // kala 4
        this.ku = nilai.ku;
        this.td = nilai.td;
        this.nadi = nilai.nadi;
        this.nafas = nilai.nafas;
        this.masalah_dan_penatalaksanaan_kala_v = nilai.masalah_dan_penatalaksanaan_kala_v;

        // bayi baru lahir
        this.berat_badan = nilai.berat_badan;
        this.panjang_badan = nilai.berat_badan;
        this.jenis_kelamin = nilai.jenis_kelamin??'';
        this.peneliaan_bayi_baru_lahir = nilai.peneliaan_bayi_baru_lahir??'';
        // console.log('cek asfiksia_tindakan : ' + nilai.asfiksia_tindakan);
        if(nilai.bayi_lahir != null){
          this.bayi_lahir_select = 'Normal';
          this.selectedIntervensi = nilai.bayi_lahir.split(',').map(item => item.trim());
        }
        if(nilai.asfiksia_tindakan != null){
          this.bayi_lahir_select = 'Afiksia';
          this.selectedIntervensiAfiksia = nilai.asfiksia_tindakan.split(',').map(item => item.trim());
          let cekLainnya = this.selectedIntervensiAfiksia.includes('Lain-lain');
          if(cekLainnya === true){
            let lastArr = this.selectedIntervensiAfiksia.at(-1);
            // console.log(lastArr);
            this.input_afiksia_lainnya = lastArr;
          }
        }
        this.sebutkan_cacat_bawaan = nilai.sebutkan_cacat_bawaan;
        this.hiportemi_tindakan = nilai.hiportemi_tindakan;
        this.pemberian_asi_setelah_jam_pertama = nilai.pemberian_asi_setelah_jam_pertama??'';
        this.tindak_alasan = nilai.tindak_alasan??'';
        this.waktu_pemberian_asi = nilai.waktu_pemberian_asi??'';
        this.masalah_lain_sebutkan = nilai.masalah_lain_sebutkan;

    }

    pasangGrafikWaktu(nilai){
      this.nilaiJamKe1 = nilai[0]?.jam_utama;
      this.nilaiJamKe2 = nilai[1]?.jam_utama;
      this.nilaiJamKe3 = nilai[2]?.jam_utama;
      this.nilaiJamKe4 = nilai[3]?.jam_utama;
      this.nilaiJamKe5 = nilai[4]?.jam_utama;
      this.nilaiJamKe6 = nilai[5]?.jam_utama;
      this.nilaiJamKe7 = nilai[6]?.jam_utama;
      this.nilaiJamKe8 = nilai[7]?.jam_utama;
      this.nilaiJamKe9 = nilai[8]?.jam_utama;
      this.nilaiJamKe10 = nilai[9]?.jam_utama;
      this.nilaiJamKe11 = nilai[10]?.jam_utama;
      this.nilaiJamKe12 = nilai[11]?.jam_utama;
      this.nilaiJamKe13 = nilai[12]?.jam_utama;
      this.nilaiJamKe14 = nilai[13]?.jam_utama;
      this.nilaiJamKe15 = nilai[14]?.jam_utama;
      this.nilaiJamKe16 = nilai[15]?.jam_utama;
    }

    pasangGrafikDjj(nilai) {
      let number = 0;
      let nilaiY = 0;
      let nilaiX = 0;
      
      for(let row of nilai){
        let denyut: number = parseInt(row.denyut_jantung, 10) || 0;
        let xInt: number = parseInt(row.x, 10) || 0;

        nilaiY= -2 * denyut + 400;

        if(row.jam_dipilih_djj == row.jam_utama){
          nilaiX = row.x;
        }else if(row.jam_dipilih_djj != row.jam_utama){
          let tambahX = xInt + 19;
          nilaiX = tambahX;
        }
        
        if(row.denyut_jantung != null){
          this.titikDjj.push({'titikX': nilaiX ,'titikY' : nilaiY,'nilaiDjj' : row.denyut_jantung,'idGrafik' : row.id});
        }
            
        number++;
      }

      this.garisDjj = this.titikDjj.map((item, index, array) => {
        const nextItem = array[index + 1];
        if (nextItem) {
          return { "point": `${item.titikX},${item.titikY} ${nextItem.titikX},${nextItem.titikY}` };
        } else {
          return { "point": `${item.titikX},${item.titikY}` };
        }
      });

      // console.log(this.titikDjj);
      // console.log(this.garisDjj);
    }

    pasangGrafikNadi(nilai){
      let number = 0;
      let nilaiY = 0;
      let nilaiX = 0;
      
      for(let row of nilai){
        let nadi: number = parseInt(row.nadi, 10) || 0;
        let xInt: number = parseInt(row.x, 10) || 0;
        
        nilaiY= -2 * nadi + 360;

        if(row.jam_pilihan_nadi == row.jam_utama){
          nilaiX = row.x;
        }else if(row.jam_pilihan_nadi != row.jam_utama){
          let tambahX = xInt + 19;
          nilaiX = tambahX;
        }
        
        if(row.nadi != null){
          this.titikNadi.push({
            'titikX': nilaiX ,
            'titikY' : nilaiY,
            'nilaiNadi' : row.nadi,
            'idGrafik' : row.id
          });
        }
            
        number++;
      }

      this.garisNadi = this.titikNadi.map((item, index, array) => {
        const nextItem = array[index + 1];
        if (nextItem) {
          return { "point": `${item.titikX},${item.titikY} ${nextItem.titikX},${nextItem.titikY}` };
        } else {
          return { "point": `${item.titikX},${item.titikY}` };
        }
      });
    }

    pasangGrafikTekananDarah(nilai){
      let number = 0;
      let nilaiX = 0;
      let nilaiSystoleY = 0;
      let nilaiDistoleY = 0;
      
      for(let row of nilai){
        let systole: number = parseInt(row.systole, 10) || 0;
        let distole: number = parseInt(row.distole, 10) || 0;
        let xInt: number = parseInt(row.x, 10) || 0;
        
        nilaiSystoleY= -2 * systole + 360;
        nilaiDistoleY= -2 * distole + 360;

        if(row.jam_dipilih_systole_dan_distole == row.jam_utama){
          nilaiX = row.x;
        }else if(row.jam_dipilih_systole_dan_distole != row.jam_utama){
          let tambahX = xInt + 19;
          nilaiX = tambahX;
        }
        
        if(row.systole != null){
          this.titikSystole.push({
            'titikX': nilaiX ,
            'titikY' : nilaiSystoleY,
            'nilaiSystole' : row.systole,
            'idGrafik' : row.id
          });

          this.titikDistole.push({
            'titikX': nilaiX ,
            'titikY' : nilaiDistoleY,
            'nilaiDistole' : row.distole,
            'idGrafik' : row.id
          });
        }
            
        number++;
      }

      this.garisSystole = this.titikSystole.map((item, index, array) => {
        const nextItem = array[index + 1];
        if (nextItem) {
          return { "point": `${item.titikX},${item.titikY} ${nextItem.titikX},${nextItem.titikY}` };
        } else {
          return { "point": `${item.titikX},${item.titikY}` };
        }
      });
      this.garisDistole = this.titikDistole.map((item, index, array) => {
        const nextItem = array[index + 1];
        if (nextItem) {
          return { "point": `${item.titikX},${item.titikY} ${nextItem.titikX},${nextItem.titikY}` };
        } else {
          return { "point": `${item.titikX},${item.titikY}` };
        }
      });
    }

    pasangGrafikOksitosin(nilai){
      let nilaiOxtY = 16;
      let nilaiOksitosinY = 35;

      let number = 0;
      let nilaiY = 0;
      let nilaiX = 0;
      
      for(let row of nilai){
        let xInt: number = parseInt(row.x, 10) || 0;

        if(row.jam_dipilih_total_tetes == row.jam_utama){
          nilaiX = xInt;
        }else if(row.jam_dipilih_total_tetes != row.jam_utama){
          let tambahX = xInt + 19;
          nilaiX = tambahX;
        }
        
        if(row.total_tetes != null){
          this.titikOksitosin.push({
            'titikOxtX': nilaiX ,
            'titikOxtY' : nilaiOxtY,
            'labelOxt' : 'Oxt',
            'titikTetesX': nilaiX ,
            'titikTetesY' : nilaiOksitosinY,
            'nilaiOksitosin' : row.total_tetes,
            'idGrafik' : row.id
          });
        }
            
        number++;
      }
    }

    pasangGrafikKontraksi(nilai){
      let number = 0;
      let nilaiY = 0;
      let nilaiX = 0;
      let warna = '';
      for(let row of nilai){
        let jml_kontraksi: number = parseInt(row.jumlah_kontraksi, 10) || 0;
        let dtk_kontraksi: number = parseInt(row.detik_kontraksi, 10) || 0;
        let xInt: number = parseInt(row.x, 10) || 0;

        if(dtk_kontraksi < 20){
          warna = 'red';
        }else if(dtk_kontraksi >= 20 && dtk_kontraksi <= 40){
          warna = 'blue';
        }else if(dtk_kontraksi > 40){
          warna = 'black';
        }
      // y=−20x+120

        nilaiY= -20 * jml_kontraksi + 100;

        // switch (jml_kontraksi) {
        //   case 1:
        //     nilaiY = 80;
        //     break;
        //   case 2:
        //     nilaiY = 60;
        //     break;
        //   case 3:
        //     nilaiY = 40;
        //     break;
        //   case 4:
        //     nilaiY = 20;
        //     break;
        //   case 5:
        //     nilaiY = 0;
        //     break;
        // }

        if(row.jam_dipilih_detik_dan_jumlah_kontraksi == row.jam_utama){
          nilaiX = row.x;
        }else if(row.jam_dipilih_detik_dan_jumlah_kontraksi != row.jam_utama){
          let tambahX = xInt + 19;
          nilaiX = tambahX;
        }
        
        if(row.jumlah_kontraksi != null){
          let nilaiHeight = -nilaiY + 100;
          this.titikKontraksi.push({
            'titikX': nilaiX, 
            'titikY' : nilaiY, 
            'warna' : warna, 
            'height' : nilaiHeight, 
            'idGrafik' : row.id
          });
        }
            
        number++;
      }
      
    }

    pasangGrafikObat(nilai){
      let nilaiY = 8;
      let number = 0;
      
      for(let row of nilai){
        let xInt: number = parseInt(row.x, 10) || 0;
        // let nilaiTurunY= -20 * turun + 200;
        // this.selectedIntervensi = nilai.bayi_lahir.split(',').map(item => item.trim());
        if(row.obat != null){
          let arrObat = row.obat.split(',').map(item => item.trim());
          if(row.cairan != null){
            let arrCairan = row.cairan.split(',').map(item => item.trim());
            const mergeObatCairan = arrObat.concat(arrCairan);
            this.titikObat.push({
              'titikX': xInt ,
              'titikY' : nilaiY, 
              'dataObat' : mergeObatCairan,
              'cairan' : row.cairan,
              'idGrafik' : row.id
            });
          }else{
            const mergeObatCairan = arrObat;
            this.titikObat.push({
              'titikX': xInt ,
              'titikY' : nilaiY, 
              'dataObat' : mergeObatCairan,
              'cairan' : row.cairan,
              'idGrafik' : row.id
            });
          }
          // console.log(mergeObatCairan);
        }
        number++;
      }
    }

    pasangGrafikUrin(nilai){
      let nilaiProteinY = 16;
      let nilaiAsetonY = 34;
      let nilaiVolumeY = 56;
      let number = 0;
      
      for(let row of nilai){
        let xInt: number = parseInt(row.x, 10) || 0;
        
        if(row.temp != null){
          this.titikUrin.push({
            'titikX': xInt ,
            'titikProY' : nilaiProteinY, 
            'titikAseY' : nilaiAsetonY, 
            'titikVolY' : nilaiVolumeY, 
            'dataPro' : row.protein,
            'dataAse' : row.aseton,
            'dataVol' : row.volume,
            'idGrafik' : row.id
          });
          // console.log(mergeObatCairan);
        }
        number++;
      }
    }

    pasangGrafikTempC(nilai){
      let nilaiY = 16;
      let number = 0;
      
      for(let row of nilai){
        let xInt: number = parseInt(row.x, 10) || 0;
        
        if(row.temp != null){
          this.titikTempC.push({
            'titikX': xInt ,
            'titikY' : nilaiY, 
            'dataTemp' : row.temp,
            'idGrafik' : row.id
          });
          // console.log(mergeObatCairan);
        }
        number++;
      }
    }

    pasangGrafikPembukaanServiks(nilai){
      let number = 0;
      let nilaiY = 0;
      let nilaiX = 0;
      let nilaiWaktuBawahY = 240;
      
      for(let row of nilai){
        let pembukaan: number = parseInt(row.pembukaan_serviks, 10) || 0;
        let turun: number = parseInt(row.turunnya_kepala, 10) || 0;
        let xInt: number = parseInt(row.x, 10) || 0;

        let nilaiBukaY= -20 * pembukaan + 200;
        let nilaiTurunY= -20 * turun + 200;

        if(row.jam_dipilih_turunnya_kepala_dan_pembukaan_serviks == row.jam_utama){
          nilaiX = row.x;
        }else if(row.jam_dipilih_turunnya_kepala_dan_pembukaan_serviks != row.jam_utama){
          let tambahX = xInt + 19;
          nilaiX = tambahX;
        }
        
        if(row.pembukaan_serviks != null){
          this.titikPembukaan.push({'titikX': nilaiX ,'titikY' : nilaiBukaY,'idGrafik' : row.id});
          this.titikTurun.push({'titikX': nilaiX ,'titikY' : nilaiTurunY,'idGrafik' : row.id});
        }
        this.waktuBawah.push({'titikX': xInt ,'titikY' : nilaiWaktuBawahY,'jam' : row.jam_utama});
            
        number++;
      }

      this.garisPembukaan = this.titikPembukaan.map((item, index, array) => {
        const nextItem = array[index + 1];
        if (nextItem) {
          return { "point": `${item.titikX},${item.titikY} ${nextItem.titikX},${nextItem.titikY}` };
        } else {
          return { "point": `${item.titikX},${item.titikY}` };
        }
      });
      this.garisTurun = this.titikTurun.map((item, index, array) => {
        const nextItem = array[index + 1];
        if (nextItem) {
          return { "point": `${item.titikX},${item.titikY} ${nextItem.titikX},${nextItem.titikY}` };
        } else {
          return { "point": `${item.titikX},${item.titikY}` };
        }
      });

      // console.log(this.titikPembukaan);
    }

    pasangGrafikKetubanPentusupan(nilai){
      let nilaiAirKetubanY = 16;
      let nilaiAirPenyusupY = 35;

      let number = 0;
      let nilaiY = 0;
      let nilaiX = 0;
      
      for(let row of nilai){
        let xInt: number = parseInt(row.x, 10) || 0;

        if(row.jam_dipilih_air_ketuban_penyusupan == row.jam_utama){
          nilaiX = xInt + 6;
        }else if(row.jam_dipilih_air_ketuban_penyusupan != row.jam_utama){
          let tambahX = xInt + 24;
          nilaiX = tambahX;
        }
        
        if(row.air_ketuban != null){
          this.titikKetubanPenyusup.push({
            'titikKetubanX': nilaiX ,
            'titikKetubanY' : nilaiAirKetubanY,
            'titikPenyusupX': nilaiX ,
            'titikPenyusupY' : nilaiAirPenyusupY,
            'nilaiKetuban' : row.air_ketuban,
            'nilaiPenyusup' : row.air_penyusup,
            'idGrafik' : row.id});
        }
            
        number++;
      }

    }

    pasangMakanMinum(nilai){
      this.makan_terakhir = nilai.makan_terakhir;
      this.makan_jenis = nilai.jenis_makan;
      this.makan_porsi = nilai.porsi_makan;
      this.minum_terakhir = nilai.minum_terakhir;
      this.minum_jenis = nilai.jenis_minum;
      this.minum_porsi = nilai.porsi_minum;
    }

    periksaNilaiGPA(event: any, jenis){
      const isNumeric = /^[0-9]*$/;
      if(jenis === 'G'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiGPA = false;
        }else{
          this.alertNilaiGPA = true;
          this.inputG = '';
        }
      }else if(jenis === 'P'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiGPA = false;
        }else{
          this.alertNilaiGPA = true;
          this.inputP = '';
        }
      }else if(jenis === 'A'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiGPA = false;
        }else{
          this.alertNilaiGPA = true;
          this.inputA = '';
        }
      }
    }
    
    periksaNilaiMinggu(event: any){
      const isNumeric = /^[0-9]*$/;
      if (isNumeric.test(event.target.value)) {
        this.alertNilaiMinggu = false;
      }else{
        this.alertNilaiMinggu = true;
        this.minggu = '';
      }
    }
    cekSimpanPartograf(){
      if(this.tanggal_masuk === 'Invalid date' || this.tanggal_masuk === ''){
        this.validasiSimpanPartograf = false;
        this.toastr.error('Nilai Tanggal tidak boleh kosong dan harus sesuai', 'Error');
      }else if(this.inputG === '' || this.inputP === '' || this.inputA === ''){
        this.validasiSimpanPartograf = false;
        this.toastr.error('Nilai G, P, dan A tidak boleh kosong', 'Error');
      }else if(this.minggu === ''){
        this.validasiSimpanPartograf = false;
        this.toastr.error('Nilai Hamil/Minggu tidak boleh kosong', 'Error');
      }else if(this.waktuPecahKetuban === ''){
        this.validasiSimpanPartograf = false;
        this.toastr.error('Nilai Ketuban Pecah tidak boleh kosong', 'Error');
      }else if(this.waktuMules === ''){
        this.validasiSimpanPartograf = false;
        this.toastr.error('Nilai Mules Sejak Jam tidak boleh kosong', 'Error');
      }else if(this.waktuMasuk === ''){
        this.validasiSimpanPartograf = false;
        this.toastr.error('Nilai Waktu Masuk tidak boleh kosong', 'Error');
      }else{
        this.validasiSimpanPartograf = true;
      }
    }
    simpan_partograf(){
      this.cekSimpanPartograf();
      let body = {
        "id": this.idPartograf,
        "no_rm": this.no_rm,
        "no_transaksi":this.no_transaksi,
        "username":this.username,
        "g": this.inputG,
        "p": this.inputP,
        "a": this.inputA,
        "hamil_minggu": this.minggu,
        "waktu_ketuban_pecah":this.waktuPecahKetuban,
        "waktu_mules":this.waktuMules,
        "tanggal_masuk":this.tanggal_masuk,
        "waktu_masuk":this.waktuMasuk,
        
      };
      console.log(body);
      if(this.validasiSimpanPartograf === true){
        if(this.createUpdatePartograf === 'Create'){
          this.PartografService.simpan(body).subscribe(
            (data: any) => {
              //  console.log(data);
              if(data.success == true){
                this.toastr.success('Data partograf berhasil dibuat', 'Sukses', {
                  timeOut: 2000,
                });                
                this.ngOnInit();
                // this.buatDefaultNilai();
                this.defaultNilaiArrayGrafik();
              } else {
                  this.toastr.error(data.message, 'Error');
              }
            },(error: any) => {
              this.toastr.error(error.error.message, 'Error');
            }
          );
        }else if(this.createUpdatePartograf === 'Update'){
          this.PartografService.updatePartograf(body).subscribe(
            (data: any) => {
              //  console.log(data);
              if(data.success == true){
                this.toastr.success('Data partograf berhasil disimpan', 'Sukses', {
                  timeOut: 2000,
                });                
                this.ngOnInit();
                // this.buatDefaultNilai();
                this.defaultNilaiArrayGrafik();
              } else {
                  this.toastr.error(data.message, 'Error');
              }
            },(error: any) => {
              this.toastr.error(error.error.message, 'Error');
            }
          );
        }
      }else{
        this.toastr.error('belumlengkap', 'Error');

      }
    }

    periksaKondisiIbu(event:any, jenis){
      const isNumeric = /^[0-9]*$/;
      if(jenis === 'ku'){
        if (isNumeric.test(event.target.value)) {
          this.alertKondisiIbu = false;
        }else{
          this.alertKondisiIbu = true;
          this.ku = '';
        }
      }else if(jenis === 'td'){
        if (isNumeric.test(event.target.value)) {
          this.alertKondisiIbu = false;
        }else{
          this.alertKondisiIbu = true;
          this.td = '';
        }
      }else if(jenis === 'nadi'){
        if (isNumeric.test(event.target.value)) {
          this.alertKondisiIbu = false;
        }else{
          this.alertKondisiIbu = true;
          this.nadi = '';
        }
      }else if(jenis === 'nafas'){
        if (isNumeric.test(event.target.value)) {
          this.alertKondisiIbu = false;
        }else{
          this.alertKondisiIbu = true;
          this.nafas = '';
        }
      }
    }
    
    periksaBeratBadan(event:any){
      const isNumeric = /^[0-9]*$/;
      if (isNumeric.test(event.target.value)) {
        this.alertBeratBadan = false;
      }else{
        this.alertBeratBadan = true;
        this.berat_badan = '';
      }
    }
    
    periksaPanjangBadan(event:any){
      const isNumeric = /^[0-9]*$/;
      if (isNumeric.test(event.target.value)) {
        this.alertPanjangBadan = false;
      }else{
        this.alertPanjangBadan = true;
        this.panjang_badan = '';
      }
    }

    periksaPemantauanKalaIV(event:any, jenis){
      const isNumeric = /^[0-9]*$/;
      if(jenis === 'jam'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiJamIV = false;
        }else{
          this.alertNilaiJamIV = true;
          this.modalk4_jam_ke = '';
        }
      }else if(jenis === 'waktu'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiWaktuIV = false;
        }else{
          this.alertNilaiWaktuIV = true;
          this.modalk4_waktu = '';
        }
      }else if(jenis === 'darah'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiDarahIV = false;
        }else{
          this.alertNilaiDarahIV = true;
          this.modalk4_tekanan_darah = '';
        }
      }else if(jenis === 'nadi'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiNadiIV = false;
        }else{
          this.alertNilaiNadiIV = true;
          this.modalk4_nadi = '';
        }
      }else if(jenis === 'suhu'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiSuhuIV = false;
        }else{
          this.alertNilaiSuhuIV = true;
          this.modalk4_suhu = '';
        }
      }else if(jenis === 'uteri'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiUteriIV = false;
        }else{
          this.alertNilaiUteriIV = true;
          this.modalk4_tinggi_fundus_uteri = '';
        }
      }else if(jenis === 'uterus'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiUterusIV = false;
        }else{
          this.alertNilaiUterusIV = true;
          this.modalk4_kontraksi_uterus = '';
        }
      }else if(jenis === 'kemih'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiKemihIV = false;
        }else{
          this.alertNilaiKemihIV = true;
          this.modalk4_kandung_kemih = '';
        }
      }else if(jenis === 'keluar'){
        if (isNumeric.test(event.target.value)) {
          this.alertNilaiKeluarIV = false;
        }else{
          this.alertNilaiKeluarIV = true;
          this.modalk4_darah_keluar = '';
        }
      }
    }

    joinBayiLahirAfiksia(){
      this.nilaiBayiLahir = this.selectedIntervensi.join(",");
      let cekLainnya = this.selectedIntervensiAfiksia.includes('Lain-lain');
      
      if(cekLainnya === true){
        if(this.input_afiksia_lainnya === undefined || this.input_afiksia_lainnya === ''){
          this.validasiSimpanAfiksia = false;
          this.toastr.error('Input Sebutkan Lain-lain pada Bayi Lahir harus di isi', 'Error');
        }else{
          this.selectedIntervensiAfiksia.push(this.input_afiksia_lainnya);
          this.validasiSimpanAfiksia = true;
          this.nilaiAfiksia = this.selectedIntervensiAfiksia.join(",");
        }
      }else{
        this.nilaiAfiksia = this.selectedIntervensiAfiksia.join(",");
        this.validasiSimpanAfiksia = true;
        this.input_afiksia_lainnya = '';
      }
      // console.log(this.nilaiBayiLahir);
      // console.log(this.nilaiAfiksia);
    }

    periksaValidasiSimpanPersalinan(){
      if(this.tempat_persalinan_select === 'Lainnya' && this.tempat_persalinan_input === ''){
        this.toastr.error('Input Tempat Persalinan Lainnya harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.episiotomi === 'Ya' && this.hasil_episiotomi === ''){
        this.toastr.error('Input Hasilnya Epistomi ya harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.gawat_janin === 'Ya' && this.gawat_janini_tindakan === ''){
        this.toastr.error('Input Hasil Tindakan Gawat Janin ya harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.gawat_janin === 'Pemantauan DJJ' && this.hasil_djj === ''){
        this.toastr.error('Input Hasil Tindakan Gawat Janin Pemantauan DJJ harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.distosia_bahu === 'Ya' && this.distosia_bahu_tindakan === ''){
        this.toastr.error('Input Hasil Tindakan Distosia Bahu ya harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.inisiasi_menyusu_dini === 'Tidak' && this.alasan === ''){
        this.toastr.error('Input Alasan Tidak Menyusui Dini harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.pemberian_oksitosin != '' && this.alasan_tindakan_oksitosin === ''){
        this.toastr.error('Input Alasan Pemberian Oksitosin harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.pemberian_oksitosin_2 === 'Ya' && this.alasan_tidak === ''){
        this.toastr.error('Input Alasan ya Pemberian oksitosin harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.penenangan_tali_pusat === 'Tidak' && this.alasan_tindakan_tali_pusat === ''){
        this.toastr.error('Input Alasan tidak Penegangan Tali Pusat harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.masase_fudus_uteri === 'Tidak' && this.alasan_tindakan_fudus_uteri === ''){
        this.toastr.error('Input Alasan tidak Masase Fudus Uteri harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.plasenta_lahir_lengkap === 'Tidak' && this.plasenta_tidak_lengkap === ''){
        this.toastr.error('Input Plasenta Tidak Lengkap harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.plasenta_tidak_lahir === 'Ya' && this.tindakan_plasenta_tidak_lahir === ''){
        this.toastr.error('Input Tindakan Plasenta Tidak Lahir harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.laserasi === 'Ya' && this.lokasi_laserasi === ''){
        this.toastr.error('Input Lokasi Laserasi harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.derajat_laserasi_perineum === 'Tidak dijahit' && this.tindakan_laserasi_perineum === ''){
        this.toastr.error('Input Alasan Tindakan Tidak Dijahit harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.atoni_uteri === 'Ya' && this.tindakan_atoni_uteri === ''){
        this.toastr.error('Input Tindakan Atoni Uteri harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.pemberian_asi_setelah_jam_pertama === 'Ya, Waktu..jam setelah lahir' && this.waktu_pemberian_asi === ''){
        this.toastr.error('Input Detail Ya Pemberian Asi harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }else if(this.pemberian_asi_setelah_jam_pertama === 'Tindak alasan' && this.tindak_alasan === ''){
        this.toastr.error('Input Detail Tindak Alasan Pemberian Asi harus di isi', 'Error');
        this.validasiSimpanCatatanPersalinan = false;
      }
      else{
        this.validasiSimpanCatatanPersalinan = true;
      }
    }

    periksaNilaiSimpanCatatanPersalinan(){
      if(this.tempat_persalinan_select === 'Lainnya'){
        this.tempat_persalinan = this.tempat_persalinan_input;
      }else{
        this.tempat_persalinan = this.tempat_persalinan_select;
      }
    }

    simpan_catatan_persalinan(){
      this.periksaValidasiSimpanPersalinan();
      this.joinBayiLahirAfiksia();
      this.periksaNilaiSimpanCatatanPersalinan();
      let body = {
        "no_rm":this.no_rm,
        "no_transaksi":this.no_transaksi,
        "username":this.username,

        "tanggal_persalinan":this.tanggal_persalinan,
        "tempat_persalinan":this.tempat_persalinan,
        "alamat_tempat_persalinan":this.alamat_tempat_persalinan,
        "catatan":this.catatan,
        "alasan_merujuk":this.alasan_merujuk,
        "tempat_rujukan":this.tempat_rujukan,
        "pendamping_saat_merujuk":this.pendamping_saat_merujuk,
        "masalah_dalam_kehamilan":this.masalah_dalam_kehamilan,
        "partogram_melewati_garis_waspada":this.partogram_melewati_garis_waspada,
        "masalah_lain":this.masalah_lain,
        "penatalaksanaan_masalah":this.penatalaksanaan_masalah,
        "hasilnya":this.hasilnya,
        "episiotomi":this.episiotomi,
        "hasil_episiotomi":this.hasil_episiotomi,
        "pendamping_saat_persalinan":this.pendamping_saat_persalinan,
        "gawat_janin":this.gawat_janin,
        "gawat_janini_tindakan":this.gawat_janini_tindakan,
        "hasil_djj":this.hasil_djj,
        "distosia_bahu":this.distosia_bahu,
        "distosia_bahu_tindakan":this.distosia_bahu_tindakan,
        "masalah_lain_penatalaksanaan":this.masalah_lain_penatalaksanaan,
        "inisiasi_menyusu_dini":this.inisiasi_menyusu_dini,
        "alasan":this.alasan,
        "lama_kala":this.lama_kala,
        "pemberian_oksitosin":this.pemberian_oksitosin,
        "alasan_tindakan_oksitosin":this.alasan_tindakan_oksitosin,
        "pemberian_oksitosin_2":this.pemberian_oksitosin_2,
        "alasan_tidak":this.alasan_tidak,
        "penenangan_tali_pusat":this.penenangan_tali_pusat,
        "alasan_tindakan_tali_pusat":this.alasan_tindakan_tali_pusat,
        "masase_fudus_uteri":this.masase_fudus_uteri,
        "alasan_tindakan_fudus_uteri":this.alasan_tindakan_fudus_uteri,
        "plasenta_lahir_lengkap":this.plasenta_lahir_lengkap,
        "plasenta_tidak_lengkap":this.plasenta_tidak_lengkap,
        "plasenta_tidak_lahir":this.plasenta_tidak_lahir,
        "tindakan_plasenta_tidak_lahir":this.tindakan_plasenta_tidak_lahir,
        "laserasi":this.laserasi,
        "lokasi_laserasi":this.lokasi_laserasi,
        "laserasi_perineum":this.laserasi_perineum,
        "derajat_laserasi_perineum":this.derajat_laserasi_perineum,
        "tindakan_laserasi_perineum":this.tindakan_laserasi_perineum,
        "atoni_uteri":this.atoni_uteri,
        "tindakan_atoni_uteri":this.tindakan_atoni_uteri,
        "jumlah_darah_keluar":this.jumlah_darah_keluar,
        "masalah_dan_penatalaksanaan":this.masalah_dan_penatalaksanaan,
        "ku":this.ku,
        "td":this.td,
        "nadi":this.nadi,
        "nafas":this.nafas,
        "masalah_dan_penatalaksanaan_kala_v":this.masalah_dan_penatalaksanaan_kala_v,
        "berat_badan":this.berat_badan,
        "panjang_badan":this.panjang_badan,
        "jenis_kelamin":this.jenis_kelamin,
        "peneliaan_bayi_baru_lahir":this.peneliaan_bayi_baru_lahir,
        "bayi_lahir":this.nilaiBayiLahir,
        "asfiksia_tindakan":this.nilaiAfiksia,
        "sebutkan_cacat_bawaan":this.sebutkan_cacat_bawaan,
        "hiportemi_tindakan":this.hiportemi_tindakan,
        "pemberian_asi_setelah_jam_pertama":this.pemberian_asi_setelah_jam_pertama,
        "tindak_alasan":this.tindak_alasan,
        "waktu_pemberian_asi":this.waktu_pemberian_asi,
        "masalah_lain_sebutkan":this.masalah_lain_sebutkan,
        "tabel_pemantauan":this.arrKalaIV
      };

      // console.log(body);
      
      if(this.validasiSimpanCatatanPersalinan === true && this.validasiSimpanAfiksia === true){
        this.PartografService.simpanCatatanPersalinan(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Data Catatan Persalinan berhasil dibuat', 'Sukses', {
                timeOut: 2000,
              });                
              this.ngOnInit();
              // this.buatDefaultNilai();
                this.defaultNilaiArrayGrafik();
                this.arrKalaIV = [];
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      }

    }

    hapusKalaIVFinal(id){
      this.idTabelKala4 = id;
      // console.log('this.idTabelKala4 : '+this.idTabelKala4);
      this.alertHapusTabelKala4();  
    }

    alertHapusTabelKala4( ){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Hapus',
        text: 'Hapus Tabel Pemantau Kala IV?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          // console.log(this.idAsesmenNyeri);
          this.hapusDataTabelKala4();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
      
        }
      }); 
    }
  
    hapusDataTabelKala4() {
      // console.log(this.idAsesmenNyeri);
      this.PartografService.deleteTabelKala4(this.idTabelKala4).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Tabel Pemantau Kala IV berhasil dihapus', 'Sukses', {
              timeOut: 2000,
            });
            // this.pasangNilaiModal();
            // this.waktuIntervensi = '';
            // this.sift = '';
            // this.modalService.dismissAll();
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

    tambahTanggal(type: string, event: MatDatepickerInputEvent<Date>) {
        // console.log(moment(event.value).format('yyyy-MM-DD'));
        this.tanggal_masuk = moment(event.value).format('yyyy-MM-DD');
    }
    
    tambahTanggalPersalinan(type: string, event: MatDatepickerInputEvent<Date>) {
        // console.log(moment(event.value).format('yyyy-MM-DD'));
        this.tanggal_persalinan = moment(event.value).format('yyyy-MM-DD');
        // console.log('cek tanggal persalinan : '+ this.tanggal_persalinan);

    }

    onTimeChangeMasuk(value:{hour:string,minute:string})
    {
        this.waktuMasuk = value;
    }
    
    onTimeChangeMules(value:{hour:string,minute:string})
    {
        this.waktuMules = value;
    }
    
    onTimeChangeKetuban(value:{hour:string,minute:string})
    {
        this.waktuPecahKetuban = value;
    }

    periksaNilaiTempatPersalinan(){
        if(this.tempat_persalinan_select == 'Lainnya'){
            this.tempat_persalinan = this.tempat_persalinan_input;
        }else{
          this.tempat_persalinan_input = '';
          this.tempat_persalinan = this.tempat_persalinan_select;
        }
    }

    periksaNilaiGawatJanin(){
        if(this.gawat_janin == 'Tidak' || this.gawat_janin == ''){
            this.gawat_janini_tindakan = '';
            this.hasil_djj = '';
        }else if(this.gawat_janin == 'Ya'){
            this.hasil_djj = '';
        }else{
          this.gawat_janini_tindakan = '';
        }
    }
    
    periksaNilaiDistosiaBahu(){
        if(this.distosia_bahu == 'Tidak' || this.distosia_bahu == ''){
            this.distosia_bahu_tindakan = '';
        }
    }
    
    periksaNilaiEpisiotomi(){
        if(this.episiotomi == 'Tidak' || this.episiotomi == ''){
            this.hasil_episiotomi = '';
        }
    }
    
    periksaNilaiMenyusuDini(){
        if(this.inisiasi_menyusu_dini == 'Ya' || this.inisiasi_menyusu_dini == ''){
            this.alasan = '';
        }
    }
    
    periksaPemberianOksitosin(){
      this.alasan_tindakan_oksitosin = '';
    }
    
    periksaNilaiPemberianOksitosin2(){
        if(this.pemberian_oksitosin_2 == 'Tidak' || this.pemberian_oksitosin_2 == ''){
            this.alasan_tidak = '';
        }
    }
    
    periksaNilaiPenenanganTaliPusat(){
        if(this.penenangan_tali_pusat == 'Ya' || this.penenangan_tali_pusat == ''){
            this.alasan_tindakan_tali_pusat = '';
        }
    }
    
    periksaNilaiMasaseFudusUteri(){
        if(this.masase_fudus_uteri == 'Ya' || this.masase_fudus_uteri == ''){
            this.alasan_tindakan_fudus_uteri = '';
        }
    }
    
    periksaNilaiPlasentaLahirLengkap(){
        if(this.plasenta_lahir_lengkap == 'Ya' || this.plasenta_lahir_lengkap == ''){
            this.plasenta_tidak_lengkap = '';
        }
    }
    
    periksaNilaiPlasentaTidakLahir(){
        if(this.plasenta_tidak_lahir == 'Tidak' || this.plasenta_tidak_lahir == ''){
            this.tindakan_plasenta_tidak_lahir = '';
        }
    }
    
    periksaNilaiLaserasi(){
        if(this.laserasi == 'Ya' || this.laserasi == ''){
            this.lokasi_laserasi = '';
        }
    }
    
    periksaNilaiLaserasiPerineum(){
        if(this.derajat_laserasi_perineum == 'Penjahitan' || this.derajat_laserasi_perineum == ''){
            this.tindakan_laserasi_perineum = '';
        }
    }
    
    periksaNilaiAtoniUteri(){
        if(this.atoni_uteri == 'Tidak' || this.atoni_uteri == ''){
            this.tindakan_atoni_uteri = '';
        }
    }
    
    periksaBayiLahir(){
        if(this.bayi_lahir_select == 'Normal'){
          this.selectedIntervensiAfiksia = [];
        }else if(this.bayi_lahir_select == 'Afiksia'){
          this.selectedIntervensi = [];
        }else{
          this.selectedIntervensiAfiksia = [];
          this.selectedIntervensi = [];
        }
    }

    onRadioButtonChange(option: string) {
      const index = this.selectedIntervensi.indexOf(option);

      if (index !== -1) {
          this.selectedIntervensi.splice(index, 1);
      } else {
          this.selectedIntervensi.push(option);
      }

      // console.log('Pilihan Select button:', this.selectedIntervensi);
    }
    
    onRadioButtonChangeAfiksia(option: string) {
      const index = this.selectedIntervensiAfiksia.indexOf(option);

      if (index !== -1) {
          this.selectedIntervensiAfiksia.splice(index, 1);
      } else {
          this.selectedIntervensiAfiksia.push(option);
      }

      // console.log('Pilihan Select button Afiksia:', this.selectedIntervensiAfiksia);
    }

    periksaNilaiPemberianAsi(){
      if(this.pemberian_asi_setelah_jam_pertama == 'Ya, Waktu..jam setelah lahir'){
          this.tindak_alasan = '';
      }else if(this.pemberian_asi_setelah_jam_pertama == ''){
          this.waktu_pemberian_asi = '';
          this.tindak_alasan = '';  
      }else if (this.pemberian_asi_setelah_jam_pertama == 'Tindak alasan'){
        this.waktu_pemberian_asi = '';
      }
   }

  openModalTambahKala4(content) {
    
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  
  nilaiAwalModalKala4(){
    this.modalk4_jam_ke = '';
    this.modalk4_waktu ='';
    this.modalk4_tekanan_darah = '';
    this.modalk4_nadi = '';
    this.modalk4_suhu = '';
    this.modalk4_tinggi_fundus_uteri = '';
    this.modalk4_kontraksi_uterus = '';
    this.modalk4_kandung_kemih = '';
    this.modalk4_darah_keluar = '';
  }

  cekTambahKalaIV(){
    if(this.modalk4_jam_ke === undefined || this.modalk4_jam_ke === ''){
      this.toastr.error('Input Jam Ke harus di isi', 'Error');
      this.validasiSimpanKalaIV = false;
    }else if(this.modalk4_waktu === undefined || this.modalk4_waktu === ''){
      this.toastr.error('Input Waktu harus di isi', 'Error');
      this.validasiSimpanKalaIV = false;
    }else if(this.modalk4_tekanan_darah === undefined || this.modalk4_tekanan_darah === ''){
      this.toastr.error('Input Tekanan Darah harus di isi', 'Error');
      this.validasiSimpanKalaIV = false;
    }else if(this.modalk4_nadi === undefined || this.modalk4_nadi === ''){
      this.toastr.error('Input Nadi harus di isi', 'Error');
      this.validasiSimpanKalaIV = false;
    }else if(this.modalk4_suhu === undefined || this.modalk4_suhu === ''){
      this.toastr.error('Input Suhu harus di isi', 'Error');
      this.validasiSimpanKalaIV = false;
    }else if(this.modalk4_tinggi_fundus_uteri === undefined || this.modalk4_tinggi_fundus_uteri === ''){
      this.toastr.error('Input Tinggi Fundus Uteri harus di isi', 'Error');
      this.validasiSimpanKalaIV = false;
    }else if(this.modalk4_kontraksi_uterus === undefined || this.modalk4_kontraksi_uterus === ''){
      this.toastr.error('Input Kontraksi Uterus harus di isi', 'Error');
      this.validasiSimpanKalaIV = false;
    }else if(this.modalk4_kandung_kemih === undefined || this.modalk4_kandung_kemih === ''){
      this.toastr.error('Input Kandung Kemih Uterus harus di isi', 'Error');
      this.validasiSimpanKalaIV = false;
    }else if(this.modalk4_darah_keluar === undefined || this.modalk4_darah_keluar === ''){
      this.toastr.error('Input Darah Keluar Uterus harus di isi', 'Error');
      this.validasiSimpanKalaIV = false;
    }else{
      this.validasiSimpanKalaIV = true;
    }
  }
  tambahKalaIV() {
    this.cekTambahKalaIV();
    let objTambahKalaIV = {
      jam_ke: this.modalk4_jam_ke,
      waktu: this.modalk4_waktu,
      td: this.modalk4_tekanan_darah,
      nadi: this.modalk4_nadi,
      suhu: this.modalk4_suhu,
      tgl_fundus_uteri: this.modalk4_tinggi_fundus_uteri,
      kontraksi_uterus: this.modalk4_kontraksi_uterus,
      kandung_kemih: this.modalk4_kandung_kemih,
      darah_yang_keluar: this.modalk4_darah_keluar,
    };
    // console.log(objTambahKalaIV);
    if(this.validasiSimpanKalaIV === true){
      this.arrKalaIV.push(objTambahKalaIV);
  
      this.modalService.dismissAll();
  
      this.nilaiAwalModalKala4();
    }
    // console.log('arr arrKalaIV:', this.arrKalaIV);
  }

  hapusKalaIV(index){
    // console.log(index);
    this.arrKalaIV.splice(index, 1);
    // console.log('arr arrKalaIV:', this.arrKalaIV);

  }

  defaultNilaiArrayGrafik(){
    this.titikDjj = [];
    this.garisDjj = [];
    this.titikKetubanPenyusup = [];
    this.titikPembukaan = [];
    this.titikTurun = [];
    this.garisPembukaan = [];
    this.garisTurun = [];
    this.waktuBawah = [];
    this.titikKontraksi = [];
    this.titikOksitosin = [];
    this.titikObat = [];
    this.titikNadi = [];
    this.garisNadi = [];
    this.titikSystole = [];
    this.titikDistole = [];
    this.garisSystole = [];
    this.garisDistole = [];
    this.titikTempC = [];
    this.titikUrin = [];
  }

  openModalWaktu(content,x,y){
    this.modalX = x;
    this.modalY = y;
    if(this.idPartograf){
      this.modalService.open(content, {ariaLabelledBy: 'modal-buat-waktu'}).result.then((result) => {
        this.closeResultModalWaktu = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalWaktu = `Dismissed ${this.getDismissReasonModalWaktu(reason)}`;
      });
    }else{
      this.toastr.error('Data Partograf belum diinput', 'Error');
    }
  }

  private getDismissReasonModalWaktu(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onTimeChangeWaktu(value){
    this.waktuGpa = value;
  }

  buatDefaultNilaiJam(){
    this.waktuGpa = '';
    // this.ampm = '';
    this.modalX = '';
    this.modalY = '';
  }

  cekValidasiWaktu(){
    if(this.waktuGpa === '' || this.waktuGpa === undefined){
      this.validasiWaktu = false;
      this.toastr.error('Input nilai waktu di isi', 'Error');
    }else{
      this.validasiWaktu = true;
    }
  }

  simpan_waktu(){
    this.cekValidasiWaktu();
    if(this.validasiWaktu === true){
      let waktu = this.waktuGpa;
      let separatedTime = waktu.split(":");
      let hour = separatedTime[0]; 
      let minute = separatedTime[1]; 
      let body = {
        "partograf_id":this.idPartograf,
        "jam":hour,
        "menit":minute,
        // "waktu":this.ampm,
        "x":this.modalX,
        "y":this.modalY,
      };
  
      // console.log(body);
      this.PartografService.simpanJamPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Buat Waktu berhasil dibuat', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.buatDefaultNilaiJam();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  periksaNilaiDjj(event: any){
    const valDjj = event.target.value;
    const isNumDjj = /^\d+$/.test(valDjj) && !/\s/.test(valDjj);
    if (isNumDjj && valDjj >= 80 && valDjj <= 200) {
      this.alertNilaiDjj = false;
    } else if (valDjj <= 80) {
      this.alertNilaiDjj = true;
    } else {
      this.alertNilaiDjj = true;
      this.denyut_jantung = '';
    }
  }

  openModalDenyutJanin(content, id, jenis){
    if(jenis == 'create'){
      if(this.nextDataDjj){
        this.nowDataDjj = this.nextDataDjj;
        this.idPartografGrafik = this.nowDataDjj.id;
        this.createUpdateDjj = 'Simpan';
        this.buatDefaultNilaiDjj();
        
        this.modalService.open(content, {ariaLabelledBy: 'modal-denyut-janin'}).result.then((result) => {
          this.closeResultModalDenyutJanin = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalDenyutJanin = `Dismissed ${this.getDismissReasonModalDenyutJanin(reason)}`;
        });
      }else{
        this.toastr.error('Jam belum ditambahkan atau semua data Denyut Jantung Janin telah terisi', 'Error', {
          timeOut: 5000,
        });
      }
    }else{
      this.idPartografGrafik = id;
      let dataEditDjj = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
      this.nowDataDjj = dataEditDjj[0];
      this.denyut_jantung = this.nowDataDjj.denyut_jantung;
      this.jam_djj_select = this.nowDataDjj.jam_dipilih_djj;
      this.createUpdateDjj = 'Ubah';

      this.modalService.open(content, {ariaLabelledBy: 'modal-denyut-janin'}).result.then((result) => {
        this.closeResultModalDenyutJanin = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalDenyutJanin = `Dismissed ${this.getDismissReasonModalDenyutJanin(reason)}`;
      });
    }
  }

  private getDismissReasonModalDenyutJanin(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  buatDefaultNilaiDjj(){
    this.denyut_jantung = '';
    this.jam_djj_select = '';
  }

  cekValidasiSimpanDjj(){
    if(this.denyut_jantung === ''){
      this.toastr.error('Input nilai Denyut Jantung harus di isi', 'Error');
      this.validasiSimpanDjj = false;
    }else if(this.denyut_jantung <= 79){
      this.toastr.error('Input nilai Denyut Jantung Tidak Sesuai', 'Error');
      this.validasiSimpanDjj = false;
    }
    else if(this.jam_djj_select == ''){
      this.toastr.error('Pilihan Jam harus di pilih', 'Error');
      this.validasiSimpanDjj = false;
    }else{
      this.validasiSimpanDjj = true;
    }
  }

  simpan_djj(){
    this.cekValidasiSimpanDjj();
    let filterDataGrafikById = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
    let body = {
      // isi
      "grafik_partograf_id":this.idPartografGrafik,
      "denyut_jantung":this.denyut_jantung,
      "jam_dipilih_djj":this.jam_djj_select,

      "air_ketuban": filterDataGrafikById[0].air_ketuban,
      "air_penyusup": filterDataGrafikById[0].air_penyusup,
      "jam_dipilih_air_ketuban_penyusupan": filterDataGrafikById[0].jam_dipilih_air_ketuban_penyusupan,

      "turunnya_kepala": filterDataGrafikById[0].turunnya_kepala,
      "pembukaan_serviks": filterDataGrafikById[0].pembukaan_serviks,
      "jam_dipilih_turunnya_kepala_dan_pembukaan_serviks": filterDataGrafikById[0].jam_dipilih_turunnya_kepala_dan_pembukaan_serviks,

      "jumlah_kontraksi": filterDataGrafikById[0].jumlah_kontraksi,
      "detik_kontraksi": filterDataGrafikById[0].detik_kontraksi,
      "jam_dipilih_detik_dan_jumlah_kontraksi": filterDataGrafikById[0].jam_dipilih_detik_dan_jumlah_kontraksi,

      "total_tetes": filterDataGrafikById[0].total_tetes,
      "jam_dipilih_total_tetes": filterDataGrafikById[0].jam_dipilih_total_tetes,

      "obat": filterDataGrafikById[0].obat,
      "cairan": filterDataGrafikById[0].cairan,
      "jam_dipilih_obat_dan_cairan": filterDataGrafikById[0].jam_dipilih_obat_dan_cairan,

      "nadi": filterDataGrafikById[0].nadi,
      "jam_pilihan_nadi": filterDataGrafikById[0].jam_pilihan_nadi,

      "systole": filterDataGrafikById[0].systole,
      "distole": filterDataGrafikById[0].distole,
      "jam_dipilih_systole_dan_distole": filterDataGrafikById[0].jam_dipilih_systole_dan_distole,

      "temp": filterDataGrafikById[0].temp,
      "jam_dipilih_temp": filterDataGrafikById[0].jam_dipilih_temp,

      "protein": filterDataGrafikById[0].protein,
      "jam_dipilih_protein": filterDataGrafikById[0].jam_dipilih_protein,
      
      "aseton": filterDataGrafikById[0].aseton,
      "jam_dipilih_aseton": filterDataGrafikById[0].jam_dipilih_aseton,

      "volume": filterDataGrafikById[0].volume,
      "jam_dipilih_volume": filterDataGrafikById[0].jam_dipilih_volume
    }

    // console.log(body);
    if(this.validasiSimpanDjj == true){
      this.PartografService.updateGrafikPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Denyut Jantung Janin berhasil simpan', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.buatDefaultNilaiDjj();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }
  
  openModalKetubanPenyusup(content, id, jenis){
    if(jenis == 'create'){
      if(this.nextDataKetubanPenyusup){
        this.nowDataKetubanPenyusup = this.nextDataKetubanPenyusup;
        this.idPartografGrafik = this.nowDataKetubanPenyusup.id;
        this.createUpdateKetubanPenyusup = 'Simpan';
        this.defaultNilaiKetubanPenyusup();
        this.modalService.open(content, {ariaLabelledBy: 'modal-ketuban-penyusup'}).result.then((result) => {
          this.closeResultModalKetubanPenyusup = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalKetubanPenyusup = `Dismissed ${this.getDismissReasonModalKetubanPenyusup(reason)}`;
        });
      }else{
        this.toastr.error('Jam belum ditambahkan atau semua data Air Ketuban & Penyusupan telah terisi', 'Error', {
          timeOut: 5000,
        });
      }
    }else{
      this.idPartografGrafik = id;
      let dataEditKetubanPenyusup = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
      this.nowDataKetubanPenyusup = dataEditKetubanPenyusup[0];
      this.air_ketuban_select = this.nowDataKetubanPenyusup.air_ketuban;
      this.penyusupan_select = this.nowDataKetubanPenyusup.air_penyusup;
      this.jam_ketuban_penyusup_select = this.nowDataKetubanPenyusup.jam_dipilih_air_ketuban_penyusupan;
      this.createUpdateKetubanPenyusup = 'Ubah';
      this.modalService.open(content, {ariaLabelledBy: 'modal-ketuban-penyusup'}).result.then((result) => {
        this.closeResultModalKetubanPenyusup = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalKetubanPenyusup = `Dismissed ${this.getDismissReasonModalKetubanPenyusup(reason)}`;
      });
    }
  }

  private getDismissReasonModalKetubanPenyusup(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  defaultNilaiKetubanPenyusup(){
    this.air_ketuban_select = '';
    this.penyusupan_select = '';
    this.jam_ketuban_penyusup_select = '';
  }

  cekValidasiKetuban(){
    if(this.air_ketuban_select === '' || this.penyusupan_select === '' || this.jam_ketuban_penyusup_select === ''){
      this.validasiSimpanKetuban = false;
      this.toastr.error('Input pilihan tidak boleh ada yang kosong', 'Error');
    }else{
      this.validasiSimpanKetuban = true;
    }
  }

  simpan_KetubanPenyusup(){
    this.cekValidasiKetuban();
    let filterDataGrafikById = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
    let body = {
      "grafik_partograf_id": this.idPartografGrafik,

      "denyut_jantung": filterDataGrafikById[0].denyut_jantung,
      "jam_dipilih_djj": filterDataGrafikById[0].jam_dipilih_djj,
      // isi
      "air_ketuban": this.air_ketuban_select,
      "air_penyusup": this.penyusupan_select,
      "jam_dipilih_air_ketuban_penyusupan": this.jam_ketuban_penyusup_select,

      "turunnya_kepala": filterDataGrafikById[0].turunnya_kepala,
      "pembukaan_serviks": filterDataGrafikById[0].pembukaan_serviks,
      "jam_dipilih_turunnya_kepala_dan_pembukaan_serviks": filterDataGrafikById[0].jam_dipilih_turunnya_kepala_dan_pembukaan_serviks,

      "jumlah_kontraksi": filterDataGrafikById[0].jumlah_kontraksi,
      "detik_kontraksi": filterDataGrafikById[0].detik_kontraksi,
      "jam_dipilih_detik_dan_jumlah_kontraksi": filterDataGrafikById[0].jam_dipilih_detik_dan_jumlah_kontraksi,

      "total_tetes": filterDataGrafikById[0].total_tetes,
      "jam_dipilih_total_tetes": filterDataGrafikById[0].jam_dipilih_total_tetes,

      "obat": filterDataGrafikById[0].obat,
      "cairan": filterDataGrafikById[0].cairan,
      "jam_dipilih_obat_dan_cairan": filterDataGrafikById[0].jam_dipilih_obat_dan_cairan,

      "nadi": filterDataGrafikById[0].nadi,
      "jam_pilihan_nadi": filterDataGrafikById[0].jam_pilihan_nadi,

      "systole": filterDataGrafikById[0].systole,
      "distole": filterDataGrafikById[0].distole,
      "jam_dipilih_systole_dan_distole": filterDataGrafikById[0].jam_dipilih_systole_dan_distole,

      "temp": filterDataGrafikById[0].temp,
      "jam_dipilih_temp": filterDataGrafikById[0].jam_dipilih_temp,

      "protein": filterDataGrafikById[0].protein,
      "jam_dipilih_protein": filterDataGrafikById[0].jam_dipilih_protein,
      
      "aseton": filterDataGrafikById[0].aseton,
      "jam_dipilih_aseton": filterDataGrafikById[0].jam_dipilih_aseton,

      "volume": filterDataGrafikById[0].volume,
      "jam_dipilih_volume": filterDataGrafikById[0].jam_dipilih_volume
    };

    // console.log(body);
    if(this.validasiSimpanKetuban === true){
      this.PartografService.updateGrafikPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Air Ketuban & Penyusupan berhasil simpan', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.defaultNilaiKetubanPenyusup();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  openModalServiksKepala(content, id, jenis){
    if(jenis == 'create'){
      if(this.nextDataPembukaanServiks){
        this.nowDataPembukaanServiks = this.nextDataPembukaanServiks;
        this.idPartografGrafik = this.nowDataPembukaanServiks.id;
        this.createUpdatePembukaanServiks = 'Simpan';
        this.defaultNilaiPembukaanServiks();
        this.modalService.open(content, {ariaLabelledBy: 'modal-pembukaan-serviks'}).result.then((result) => {
          this.closeResultModalPembukaanServiks = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalPembukaanServiks = `Dismissed ${this.getDismissReasonModalPembukaanServiks(reason)}`;
        });
      }else{
        this.toastr.error('Jam belum ditambahkan atau semua data Pembukaan Serviks & Turunnya Kepala telah terisi', 'Error', {
          timeOut: 5000,
        });
      }
    }else{
      this.idPartografGrafik = id;
      let dataEditPembukaanServiks = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
      this.nowDataPembukaanServiks = dataEditPembukaanServiks[0];
      this.pembukaan_select = this.nowDataPembukaanServiks.pembukaan_serviks;
      this.penurunan_select = this.nowDataPembukaanServiks.turunnya_kepala;
      this.jam_pembukaan_penurunan_select = this.nowDataPembukaanServiks.jam_dipilih_turunnya_kepala_dan_pembukaan_serviks;
      this.createUpdatePembukaanServiks = 'Ubah';
      this.modalService.open(content, {ariaLabelledBy: 'modal-pembukaan-serviks'}).result.then((result) => {
        this.closeResultModalPembukaanServiks = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalPembukaanServiks = `Dismissed ${this.getDismissReasonModalPembukaanServiks(reason)}`;
      });
    }
  }

  private getDismissReasonModalPembukaanServiks(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  defaultNilaiPembukaanServiks(){
    this.pembukaan_select = '';
    this.penurunan_select = '';
    this.jam_pembukaan_penurunan_select = '';
  }

  cekValidasiSimpanPembukaan(){
    if(this.pembukaan_select === '' || this.penurunan_select === '' || this.jam_pembukaan_penurunan_select === ''){
      this.toastr.error('Input pilihan tidak boleh ada yang kosong', 'Error');
      this.validasiSimpanPembukaan = false;
    }else{
      this.validasiSimpanPembukaan = true;
    }
  }

  simpan_pembukaanserviks(){
    this.cekValidasiSimpanPembukaan();
    let filterDataGrafikById = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
    let body = {
      "grafik_partograf_id": this.idPartografGrafik,

      "denyut_jantung": filterDataGrafikById[0].denyut_jantung,
      "jam_dipilih_djj": filterDataGrafikById[0].jam_dipilih_djj,

      "air_ketuban": filterDataGrafikById[0].air_ketuban,
      "air_penyusup": filterDataGrafikById[0].air_penyusup,
      "jam_dipilih_air_ketuban_penyusupan": filterDataGrafikById[0].jam_dipilih_air_ketuban_penyusupan,

      "turunnya_kepala": this.penurunan_select,
      "pembukaan_serviks": this.pembukaan_select,
      "jam_dipilih_turunnya_kepala_dan_pembukaan_serviks": this.jam_pembukaan_penurunan_select,

      "jumlah_kontraksi": filterDataGrafikById[0].jumlah_kontraksi,
      "detik_kontraksi": filterDataGrafikById[0].detik_kontraksi,
      "jam_dipilih_detik_dan_jumlah_kontraksi": filterDataGrafikById[0].jam_dipilih_detik_dan_jumlah_kontraksi,

      "total_tetes": filterDataGrafikById[0].total_tetes,
      "jam_dipilih_total_tetes": filterDataGrafikById[0].jam_dipilih_total_tetes,

      "obat": filterDataGrafikById[0].obat,
      "cairan": filterDataGrafikById[0].cairan,
      "jam_dipilih_obat_dan_cairan": filterDataGrafikById[0].jam_dipilih_obat_dan_cairan,

      "nadi": filterDataGrafikById[0].nadi,
      "jam_pilihan_nadi": filterDataGrafikById[0].jam_pilihan_nadi,

      "systole": filterDataGrafikById[0].systole,
      "distole": filterDataGrafikById[0].distole,
      "jam_dipilih_systole_dan_distole": filterDataGrafikById[0].jam_dipilih_systole_dan_distole,

      "temp": filterDataGrafikById[0].temp,
      "jam_dipilih_temp": filterDataGrafikById[0].jam_dipilih_temp,

      "protein": filterDataGrafikById[0].protein,
      "jam_dipilih_protein": filterDataGrafikById[0].jam_dipilih_protein,
      
      "aseton": filterDataGrafikById[0].aseton,
      "jam_dipilih_aseton": filterDataGrafikById[0].jam_dipilih_aseton,

      "volume": filterDataGrafikById[0].volume,
      "jam_dipilih_volume": filterDataGrafikById[0].jam_dipilih_volume
    };

    // console.log(body);
    if(this.validasiSimpanPembukaan === true){
      this.PartografService.updateGrafikPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Pembukaan Serviks & Turunnya Kepala berhasil dibuat', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.defaultNilaiPembukaanServiks();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  periksaNilaiLamaKontraksi(event: any){
    const isNumeric = /^[0-9]*$/;
    if (isNumeric.test(event.target.value)) {
      this.alertNilaiLamaKontraksi = false;

    }else{
      this.alertNilaiLamaKontraksi = true;
      this.lama_kontraksi = '';
    }
  }

  openModalKontraksi(content, id, jenis){
    if(jenis == 'create'){
      if(this.nextDataKontraksi){
        this.nowDataKontraksi = this.nextDataKontraksi;
        this.idPartografGrafik = this.nowDataKontraksi.id;
        this.createUpdateKontraksi = 'Simpan';
        this.defaultNilaiKontraksi();
        this.modalService.open(content, {ariaLabelledBy: 'modal-pembukaan-serviks'}).result.then((result) => {
          this.closeResultModalKontraksi = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalKontraksi = `Dismissed ${this.getDismissReasonModalKontraksi(reason)}`;
        });
      }else{
        this.toastr.error('Jam belum ditambahkan atau semua data Kontraksi telah terisi', 'Error', {
          timeOut: 5000,
        });
      }
    }else{
      this.idPartografGrafik = id;
      let dataEditKontraksi = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
      this.nowDataKontraksi = dataEditKontraksi[0];
      this.jumlah_kontraksi_select = this.nowDataKontraksi.jumlah_kontraksi; 
      this.lama_kontraksi = this.nowDataKontraksi.detik_kontraksi;
      this.jam_kontraksi_select = this.nowDataKontraksi.jam_dipilih_detik_dan_jumlah_kontraksi;
      this.createUpdateKontraksi = 'Ubah';
      this.modalService.open(content, {ariaLabelledBy: 'modal-pembukaan-serviks'}).result.then((result) => {
        this.closeResultModalKontraksi = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalKontraksi = `Dismissed ${this.getDismissReasonModalKontraksi(reason)}`;
      });
    }
  }

  private getDismissReasonModalKontraksi(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  defaultNilaiKontraksi(){
    this.jumlah_kontraksi_select = '';
    this.lama_kontraksi = '';
    this.jam_kontraksi_select = '';
  }

  cekValidasiSimpanKontraksi(){
    if(this.jumlah_kontraksi_select === '' || this.lama_kontraksi === '' || this.jam_kontraksi_select === ''){
      this.toastr.error('Input pilihan tidak boleh ada yang kosong', 'Error');
      this.validasiSimpanKontraksi = false;
    }else{
      this.validasiSimpanKontraksi = true;
    }
  }

  simpan_kontraksi(){
    this.cekValidasiSimpanKontraksi();
    let filterDataGrafikById = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
    let body = {
      "grafik_partograf_id": this.idPartografGrafik,

      "denyut_jantung": filterDataGrafikById[0].denyut_jantung,
      "jam_dipilih_djj": filterDataGrafikById[0].jam_dipilih_djj,

      "air_ketuban": filterDataGrafikById[0].air_ketuban,
      "air_penyusup": filterDataGrafikById[0].air_penyusup,
      "jam_dipilih_air_ketuban_penyusupan": filterDataGrafikById[0].jam_dipilih_air_ketuban_penyusupan,

      "turunnya_kepala": filterDataGrafikById[0].turunnya_kepala,
      "pembukaan_serviks": filterDataGrafikById[0].pembukaan_serviks,
      "jam_dipilih_turunnya_kepala_dan_pembukaan_serviks": filterDataGrafikById[0].jam_dipilih_turunnya_kepala_dan_pembukaan_serviks,
      // isi
      "jumlah_kontraksi": this.jumlah_kontraksi_select,
      "detik_kontraksi": this.lama_kontraksi,
      "jam_dipilih_detik_dan_jumlah_kontraksi": this.jam_kontraksi_select,

      "total_tetes": filterDataGrafikById[0].total_tetes,
      "jam_dipilih_total_tetes": filterDataGrafikById[0].jam_dipilih_total_tetes,

      "obat": filterDataGrafikById[0].obat,
      "cairan": filterDataGrafikById[0].cairan,
      "jam_dipilih_obat_dan_cairan": filterDataGrafikById[0].jam_dipilih_obat_dan_cairan,

      "nadi": filterDataGrafikById[0].nadi,
      "jam_pilihan_nadi": filterDataGrafikById[0].jam_pilihan_nadi,

      "systole": filterDataGrafikById[0].systole,
      "distole": filterDataGrafikById[0].distole,
      "jam_dipilih_systole_dan_distole": filterDataGrafikById[0].jam_dipilih_systole_dan_distole,

      "temp": filterDataGrafikById[0].temp,
      "jam_dipilih_temp": filterDataGrafikById[0].jam_dipilih_temp,

      "protein": filterDataGrafikById[0].protein,
      "jam_dipilih_protein": filterDataGrafikById[0].jam_dipilih_protein,
      
      "aseton": filterDataGrafikById[0].aseton,
      "jam_dipilih_aseton": filterDataGrafikById[0].jam_dipilih_aseton,

      "volume": filterDataGrafikById[0].volume,
      "jam_dipilih_volume": filterDataGrafikById[0].jam_dipilih_volume
    };

    // console.log(body);
    if(this.validasiSimpanKontraksi === true){
      this.PartografService.updateGrafikPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Kontraksi Tiap 10 Menit berhasil dibuat', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.defaultNilaiKontraksi();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  periksaNilaiTetesOksitosin(event: any){
    const isNumeric = /^[0-9]*$/;
    if (isNumeric.test(event.target.value)) {
      this.alertNilaiOksitosin = false;

    }else{
      this.alertNilaiOksitosin = true;
      this.tetes_oksitosin = '';
    }
  }

  openModalOksitosin(content, id, jenis){
    if(jenis == 'create'){
      if(this.nextDataOksitosin){
        this.nowDataOksitosin = this.nextDataOksitosin;
        this.idPartografGrafik = this.nowDataOksitosin.id;
        this.createUpdateOksitosin = 'Simpan';
        this.defaultNilaiOksitosin();
        this.modalService.open(content, {ariaLabelledBy: 'modal-oksitosin'}).result.then((result) => {
          this.closeResultModalOksitosin = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalOksitosin = `Dismissed ${this.getDismissReasonModalOksitosin(reason)}`;
        });
      }else{
        this.toastr.error('Jam belum ditambahkan atau semua data Oksitosin telah terisi', 'Error', {
          timeOut: 5000,
        });
      }
    }else{
      this.idPartografGrafik = id;
      let dataEditOksitosin = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
      this.nowDataOksitosin = dataEditOksitosin[0];
      this.tetes_oksitosin = this.nowDataOksitosin.total_tetes;
      this.jam_oksitosin_select = this.nowDataOksitosin.jam_dipilih_total_tetes;
      this.createUpdateOksitosin = 'Ubah';
      this.modalService.open(content, {ariaLabelledBy: 'modal-oksitosin'}).result.then((result) => {
        this.closeResultModalOksitosin = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalOksitosin = `Dismissed ${this.getDismissReasonModalOksitosin(reason)}`;
      });
    }

  }

  private getDismissReasonModalOksitosin(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  defaultNilaiOksitosin(){
    this.tetes_oksitosin = '';
    this.jam_oksitosin_select = '';
  }

  cekValidasiSimpanOksitosin(){
    if(this.tetes_oksitosin === '' || this.jam_oksitosin_select === ''){
      this.toastr.error('Input Total Tetes dan pilihan Jam tidak boleh ada yang kosong', 'Error');
      this.validasiSimpanOksitosin = false;
    }else{
      this.validasiSimpanOksitosin = true;
    }
  }

  simpan_oksitosin(){
    this.cekValidasiSimpanOksitosin();
    let filterDataGrafikById = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
    let body = {
      "grafik_partograf_id": this.idPartografGrafik,

      "denyut_jantung": filterDataGrafikById[0].denyut_jantung,
      "jam_dipilih_djj": filterDataGrafikById[0].jam_dipilih_djj,

      "air_ketuban": filterDataGrafikById[0].air_ketuban,
      "air_penyusup": filterDataGrafikById[0].air_penyusup,
      "jam_dipilih_air_ketuban_penyusupan": filterDataGrafikById[0].jam_dipilih_air_ketuban_penyusupan,

      "turunnya_kepala": filterDataGrafikById[0].turunnya_kepala,
      "pembukaan_serviks": filterDataGrafikById[0].pembukaan_serviks,
      "jam_dipilih_turunnya_kepala_dan_pembukaan_serviks": filterDataGrafikById[0].jam_dipilih_turunnya_kepala_dan_pembukaan_serviks,
      
      "jumlah_kontraksi": filterDataGrafikById[0].jumlah_kontraksi,
      "detik_kontraksi": filterDataGrafikById[0].detik_kontraksi,
      "jam_dipilih_detik_dan_jumlah_kontraksi": filterDataGrafikById[0].jam_dipilih_detik_dan_jumlah_kontraksi,
      // isi
      "total_tetes": this.tetes_oksitosin,
      "jam_dipilih_total_tetes": this.jam_oksitosin_select,

      "obat": filterDataGrafikById[0].obat,
      "cairan": filterDataGrafikById[0].cairan,
      "jam_dipilih_obat_dan_cairan": filterDataGrafikById[0].jam_dipilih_obat_dan_cairan,

      "nadi": filterDataGrafikById[0].nadi,
      "jam_pilihan_nadi": filterDataGrafikById[0].jam_pilihan_nadi,

      "systole": filterDataGrafikById[0].systole,
      "distole": filterDataGrafikById[0].distole,
      "jam_dipilih_systole_dan_distole": filterDataGrafikById[0].jam_dipilih_systole_dan_distole,

      "temp": filterDataGrafikById[0].temp,
      "jam_dipilih_temp": filterDataGrafikById[0].jam_dipilih_temp,

      "protein": filterDataGrafikById[0].protein,
      "jam_dipilih_protein": filterDataGrafikById[0].jam_dipilih_protein,
      
      "aseton": filterDataGrafikById[0].aseton,
      "jam_dipilih_aseton": filterDataGrafikById[0].jam_dipilih_aseton,

      "volume": filterDataGrafikById[0].volume,
      "jam_dipilih_volume": filterDataGrafikById[0].jam_dipilih_volume
    };

    // console.log(body);
    if(this.validasiSimpanOksitosin === true){
      this.PartografService.updateGrafikPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Cairan Oksitosin berhasil simpan', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.defaultNilaiOksitosin();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  openModalObat(content, id, jenis){
    if(jenis == 'create'){
      if(this.nextDataObat){
        this.nowDataObat = this.nextDataObat;
        this.idPartografGrafik = this.nowDataObat.id;
        this.createUpdateObat = 'Simpan';
        this.defaultNilaiObat();
        this.modalService.open(content, {ariaLabelledBy: 'modal-obat-cairan'}).result.then((result) => {
          this.closeResultModalObat = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalObat = `Dismissed ${this.getDismissReasonModalObat(reason)}`;
        });
      }else{
        this.toastr.error('Jam belum ditambahkan atau semua data Obat dan Cairan telah terisi', 'Error', {
          timeOut: 5000,
        });
      }
      
    }else{
      this.idPartografGrafik = id;
      let dataEditObat = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
      this.nowDataObat = dataEditObat[0];
      let splitObat = this.nowDataObat.obat.split(',');
      this.obat_1 = splitObat[0];
      if(splitObat[1]){
        this.obat_2 = splitObat[1];
      }else{
        this.obat_2 = '';
      }
      if(splitObat[2]){
        this.obat_3 = splitObat[2];
      }else{
        this.obat_3 = '';
      }
      if(splitObat[3]){
        this.obat_4 = splitObat[3];
      }else{
        this.obat_4 = '';
      }
      if(this.nowDataObat.cairan){
        let splitCairan = this.nowDataObat.cairan.split(',');
        if( splitCairan[0]){
          this.cairan_1 = splitCairan[0];
        }else{
          this.cairan_1 = '';
        }
        if(splitCairan[1]){
          this.cairan_2 = splitCairan[1];
        }else{
          this.cairan_2 = '';
        }
        if(splitCairan[2]){
          this.cairan_3 = splitCairan[2];
        }else{
          this.cairan_3 = '';
        }
        if(splitCairan[3]){
          this.cairan_4 = splitCairan[3];
        }else{
          this.cairan_4 = '';
      }
      
      }
      this.jam_obat_cairan_select = this.nowDataObat.jam_dipilih_obat_dan_cairan;
      this.createUpdateObat = 'Ubah';
      this.modalService.open(content, {ariaLabelledBy: 'modal-obat-cairan'}).result.then((result) => {
        this.closeResultModalObat = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalObat = `Dismissed ${this.getDismissReasonModalObat(reason)}`;
      });
    }
  }

  private getDismissReasonModalObat(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  defaultNilaiObat(){
    this.obat_1 = '';
    this.obat_2 = '';
    this.obat_3 = '';
    this.obat_4 = '';
    this.cairan_1 = '';
    this.cairan_2 = '';
    this.cairan_3 = '';
    this.cairan_4 = '';
    this.jam_obat_cairan_select = '';
  }

  cekValidasiSimpanObat(){
    if(this.obat_1 === '' || this.jam_obat_cairan_select === ''){
      this.toastr.error('Input Obat 1 dan Jam tidak boleh ada yang kosong', 'Error');
      this.validasiSimpanObat = false;
    }else{
      this.validasiSimpanObat = true;
    }
  }

  simpan_obat(){
    this.cekValidasiSimpanObat();
    let  arrObat = [this.obat_1, this.obat_2, this.obat_3, this.obat_4];
    let mergeObat = arrObat.filter(item => item !== "").join(',');
    let arrCairan = [this.cairan_1, this.cairan_2, this.cairan_3, this.cairan_4];
    let mergeCairan = arrCairan.filter(item => item !== "").join(',');
    let filterDataGrafikById = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
    let body = {
      "grafik_partograf_id": this.idPartografGrafik,

      "denyut_jantung": filterDataGrafikById[0].denyut_jantung,
      "jam_dipilih_djj": filterDataGrafikById[0].jam_dipilih_djj,

      "air_ketuban": filterDataGrafikById[0].air_ketuban,
      "air_penyusup": filterDataGrafikById[0].air_penyusup,
      "jam_dipilih_air_ketuban_penyusupan": filterDataGrafikById[0].jam_dipilih_air_ketuban_penyusupan,

      "turunnya_kepala": filterDataGrafikById[0].turunnya_kepala,
      "pembukaan_serviks": filterDataGrafikById[0].pembukaan_serviks,
      "jam_dipilih_turunnya_kepala_dan_pembukaan_serviks": filterDataGrafikById[0].jam_dipilih_turunnya_kepala_dan_pembukaan_serviks,
      
      "jumlah_kontraksi": filterDataGrafikById[0].jumlah_kontraksi,
      "detik_kontraksi": filterDataGrafikById[0].detik_kontraksi,
      "jam_dipilih_detik_dan_jumlah_kontraksi": filterDataGrafikById[0].jam_dipilih_detik_dan_jumlah_kontraksi,
      
      "total_tetes": filterDataGrafikById[0].total_tetes,
      "jam_dipilih_total_tetes": filterDataGrafikById[0].jam_dipilih_total_tetes,
      // isi
      "obat": mergeObat,
      "cairan": mergeCairan,
      "jam_dipilih_obat_dan_cairan": this.jam_obat_cairan_select,

      "nadi": filterDataGrafikById[0].nadi,
      "jam_pilihan_nadi": filterDataGrafikById[0].jam_pilihan_nadi,

      "systole": filterDataGrafikById[0].systole,
      "distole": filterDataGrafikById[0].distole,
      "jam_dipilih_systole_dan_distole": filterDataGrafikById[0].jam_dipilih_systole_dan_distole,

      "temp": filterDataGrafikById[0].temp,
      "jam_dipilih_temp": filterDataGrafikById[0].jam_dipilih_temp,

      "protein": filterDataGrafikById[0].protein,
      "jam_dipilih_protein": filterDataGrafikById[0].jam_dipilih_protein,
      
      "aseton": filterDataGrafikById[0].aseton,
      "jam_dipilih_aseton": filterDataGrafikById[0].jam_dipilih_aseton,

      "volume": filterDataGrafikById[0].volume,
      "jam_dipilih_volume": filterDataGrafikById[0].jam_dipilih_volume
    };

    // console.log(body);
    if(this.validasiSimpanObat === true){
      this.PartografService.updateGrafikPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Obat dan Cairan berhasil simpan', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.defaultNilaiObat();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  periksaNilaiNadi(event: any){
    const isNumeric = /^-?\d*[.]?\d{0,2}$/;
    if (isNumeric.test(event.target.value) && event.target.value >= 60 && event.target.value <= 180) {
      this.alertNilaiNadi = false;
    }else if(event.target.value <= 60){
      this.alertNilaiNadi = true;
    }
    else{
      this.alertNilaiNadi = true;
      this.nadi_input = '';
    }
  }

  openModalNadi(content, id, jenis){
    if(jenis == 'create'){
      if(this.nextDataNadi){
        this.nowDataNadi = this.nextDataNadi;
        this.idPartografGrafik = this.nowDataNadi.id;
        this.createUpdateNadi = 'Simpan';
        this.defaultNilaiNadi();
        this.modalService.open(content, {ariaLabelledBy: 'modal-nadi'}).result.then((result) => {
          this.closeResultModalNadi = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalNadi = `Dismissed ${this.getDismissReasonModalNadi(reason)}`;
        });
      }else{
        this.toastr.error('Jam belum ditambahkan atau semua data Nadi telah terisi', 'Error', {
          timeOut: 5000,
        });
      }
      
    }else{
      this.idPartografGrafik = id;
      let dataEditNadi = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
      this.nowDataNadi = dataEditNadi[0];
      this.nadi_input = this.nowDataNadi.nadi;
      this.jam_nadi_select = this.nowDataNadi.jam_pilihan_nadi;
      this.createUpdateNadi = 'Ubah';
      this.modalService.open(content, {ariaLabelledBy: 'modal-nadi'}).result.then((result) => {
        this.closeResultModalNadi = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalNadi = `Dismissed ${this.getDismissReasonModalNadi(reason)}`;
      });
    }
  }

  private getDismissReasonModalNadi(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  defaultNilaiNadi(){
    this.nadi_input = '';
    this.jam_nadi_select = '';
  }

  cekValidasiSimpanNadi(){
    if(this.nadi_input === '' || this.jam_nadi_select === ''){
      this.toastr.error('Input Nadi dan pilihan Jam tidak boleh ada yang kosong', 'Error');
      this.validasiSimpanNadi = false;
    }else if(this.nadi_input <= 59){
      this.toastr.error('Nilai Nadi tidak sesuai', 'Error');
      this.validasiSimpanNadi = false;
    }
    else{
      this.validasiSimpanNadi = true;
    }
  }

  simpan_nadi(){
    this.cekValidasiSimpanNadi();
    let filterDataGrafikById = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
    let body = {
      "grafik_partograf_id": this.idPartografGrafik,

      "denyut_jantung": filterDataGrafikById[0].denyut_jantung,
      "jam_dipilih_djj": filterDataGrafikById[0].jam_dipilih_djj,

      "air_ketuban": filterDataGrafikById[0].air_ketuban,
      "air_penyusup": filterDataGrafikById[0].air_penyusup,
      "jam_dipilih_air_ketuban_penyusupan": filterDataGrafikById[0].jam_dipilih_air_ketuban_penyusupan,

      "turunnya_kepala": filterDataGrafikById[0].turunnya_kepala,
      "pembukaan_serviks": filterDataGrafikById[0].pembukaan_serviks,
      "jam_dipilih_turunnya_kepala_dan_pembukaan_serviks": filterDataGrafikById[0].jam_dipilih_turunnya_kepala_dan_pembukaan_serviks,
      
      "jumlah_kontraksi": filterDataGrafikById[0].jumlah_kontraksi,
      "detik_kontraksi": filterDataGrafikById[0].detik_kontraksi,
      "jam_dipilih_detik_dan_jumlah_kontraksi": filterDataGrafikById[0].jam_dipilih_detik_dan_jumlah_kontraksi,
      
      "total_tetes": filterDataGrafikById[0].total_tetes,
      "jam_dipilih_total_tetes": filterDataGrafikById[0].jam_dipilih_total_tetes,
      
      "obat": filterDataGrafikById[0].obat,
      "cairan": filterDataGrafikById[0].cairan,
      "jam_dipilih_obat_dan_cairan": filterDataGrafikById[0].jam_dipilih_obat_dan_cairan,
      // isi
      "nadi": this.nadi_input,
      "jam_pilihan_nadi": this.jam_nadi_select,

      "systole": filterDataGrafikById[0].systole,
      "distole": filterDataGrafikById[0].distole,
      "jam_dipilih_systole_dan_distole": filterDataGrafikById[0].jam_dipilih_systole_dan_distole,

      "temp": filterDataGrafikById[0].temp,
      "jam_dipilih_temp": filterDataGrafikById[0].jam_dipilih_temp,

      "protein": filterDataGrafikById[0].protein,
      "jam_dipilih_protein": filterDataGrafikById[0].jam_dipilih_protein,
      
      "aseton": filterDataGrafikById[0].aseton,
      "jam_dipilih_aseton": filterDataGrafikById[0].jam_dipilih_aseton,

      "volume": filterDataGrafikById[0].volume,
      "jam_dipilih_volume": filterDataGrafikById[0].jam_dipilih_volume
    };

    // console.log(body);
    if(this.validasiSimpanNadi === true){
      this.PartografService.updateGrafikPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Nadi berhasil simpan', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.defaultNilaiNadi();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  periksaTekananDarah(event: any, jenis){
    const isNumeric = /^[0-9]*$/;
    if(jenis === 'sytole'){
      if (isNumeric.test(event.target.value) && event.target.value >= 60 && event.target.value <= 180) {
        this.alertNilaiSytole = false;
      }else if(event.target.value <= 60){
        this.alertNilaiSytole = true;
      }
      else{
        this.alertNilaiSytole = true;
        this.tekanan_sistole = '';
      }
    }else{
      if (isNumeric.test(event.target.value) && event.target.value >= 60 && event.target.value <= 180) {
        this.alertNilaiDistole = false;
      }else if(event.target.value <= 60){
        this.alertNilaiDistole = true;
      }
      else{
        this.alertNilaiDistole = true;
        this.tekanan_distole = '';
      }
    }
  }

  openModalTekananDarah(content, id, jenis){
    if(jenis == 'create'){
      if(this.nextDataTekananDarah){
        this.nowDataTekananDarah = this.nextDataTekananDarah;
        this.idPartografGrafik = this.nowDataTekananDarah.id;
        this.createUpdateTekananDarah = 'Simpan';
        this.defaultNilaiTekananDarah();
        this.modalService.open(content, {ariaLabelledBy: 'modal-tekanan-darah'}).result.then((result) => {
          this.closeResultModalTekananDarah = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalTekananDarah = `Dismissed ${this.getDismissReasonModalTekananDarah(reason)}`;
        });
      }else{
        this.toastr.error('Jam belum ditambahkan atau semua data Nadi telah terisi', 'Error', {
          timeOut: 5000,
        });
      }
    }else{
      this.idPartografGrafik = id;
      let dataEditTekananDarah = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
      this.nowDataTekananDarah = dataEditTekananDarah[0];
      this.tekanan_sistole = this.nowDataTekananDarah.systole;
      this.tekanan_distole = this.nowDataTekananDarah.distole;
      this.jam_tekanan_darah_select = this.nowDataTekananDarah.jam_dipilih_systole_dan_distole;
      this.createUpdateTekananDarah = 'Ubah';
      this.modalService.open(content, {ariaLabelledBy: 'modal-tekanan-darah'}).result.then((result) => {
        this.closeResultModalTekananDarah = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalTekananDarah = `Dismissed ${this.getDismissReasonModalTekananDarah(reason)}`;
      });
    }
  }

  private getDismissReasonModalTekananDarah(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  defaultNilaiTekananDarah(){
    this.tekanan_sistole = '';
    this.tekanan_distole = '';
    this.jam_tekanan_darah_select = '';
  }

  cekValidasiSimpanTekananDarah(){
    if(this.tekanan_sistole === '' || this.tekanan_distole === '' || this.jam_tekanan_darah_select === ''){
      this.toastr.error('Input Sytole, Distole dan pilihan Jam tidak boleh ada yang kosong', 'Error');
      this.validasiSimpanTekananDarah = false;
    }else if(this.tekanan_sistole <= 59){
      this.toastr.error('Nilai Sytole tidak sesuai', 'Error');
      this.validasiSimpanTekananDarah = false;
    }else if(this.tekanan_distole <= 59){
      this.toastr.error('Nilai Distole tidak sesuai', 'Error');
      this.validasiSimpanTekananDarah = false;
    }
    else{
      this.validasiSimpanTekananDarah = true;
    }
  }

  simpan_tekanan_darah(){
    this.cekValidasiSimpanTekananDarah();
    let filterDataGrafikById = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
    let body = {
      "grafik_partograf_id": this.idPartografGrafik,

      "denyut_jantung": filterDataGrafikById[0].denyut_jantung,
      "jam_dipilih_djj": filterDataGrafikById[0].jam_dipilih_djj,

      "air_ketuban": filterDataGrafikById[0].air_ketuban,
      "air_penyusup": filterDataGrafikById[0].air_penyusup,
      "jam_dipilih_air_ketuban_penyusupan": filterDataGrafikById[0].jam_dipilih_air_ketuban_penyusupan,

      "turunnya_kepala": filterDataGrafikById[0].turunnya_kepala,
      "pembukaan_serviks": filterDataGrafikById[0].pembukaan_serviks,
      "jam_dipilih_turunnya_kepala_dan_pembukaan_serviks": filterDataGrafikById[0].jam_dipilih_turunnya_kepala_dan_pembukaan_serviks,
      
      "jumlah_kontraksi": filterDataGrafikById[0].jumlah_kontraksi,
      "detik_kontraksi": filterDataGrafikById[0].detik_kontraksi,
      "jam_dipilih_detik_dan_jumlah_kontraksi": filterDataGrafikById[0].jam_dipilih_detik_dan_jumlah_kontraksi,
      
      "total_tetes": filterDataGrafikById[0].total_tetes,
      "jam_dipilih_total_tetes": filterDataGrafikById[0].jam_dipilih_total_tetes,
      
      "obat": filterDataGrafikById[0].obat,
      "cairan": filterDataGrafikById[0].cairan,
      "jam_dipilih_obat_dan_cairan": filterDataGrafikById[0].jam_dipilih_obat_dan_cairan,
      
      "nadi": filterDataGrafikById[0].nadi,
      "jam_pilihan_nadi": filterDataGrafikById[0].jam_pilihan_nadi,
      // isi
      "systole": this.tekanan_sistole,
      "distole": this.tekanan_distole,
      "jam_dipilih_systole_dan_distole": this.jam_tekanan_darah_select,

      "temp": filterDataGrafikById[0].temp,
      "jam_dipilih_temp": filterDataGrafikById[0].jam_dipilih_temp,

      "protein": filterDataGrafikById[0].protein,
      "jam_dipilih_protein": filterDataGrafikById[0].jam_dipilih_protein,
      
      "aseton": filterDataGrafikById[0].aseton,
      "jam_dipilih_aseton": filterDataGrafikById[0].jam_dipilih_aseton,

      "volume": filterDataGrafikById[0].volume,
      "jam_dipilih_volume": filterDataGrafikById[0].jam_dipilih_volume
    };

    // console.log(body);
    if(this.validasiSimpanTekananDarah === true){
      this.PartografService.updateGrafikPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Tekanan Darah berhasil simpan', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.defaultNilaiTekananDarah();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  periksaNilaiTemp(event: any){
    const isNumeric = /^-?\d*[.]?\d{0,2}$/;
    if (isNumeric.test(event.target.value) && event.target.value >= 32 && event.target.value <= 42) {
      this.alertNilaiTemp = false;
    }else if(event.target.value <= 32){
      this.alertNilaiTemp = true;
    }
    else{
      this.alertNilaiTemp = true;
      this.temp_c = '';
    }
  }
  
  openModalTempC(content, id, jenis){
    if(jenis == 'create'){
      if(this.nextDataTempC){
        this.nowDataTempC = this.nextDataTempC;
        this.idPartografGrafik = this.nowDataTempC.id;
        this.createUpdateTempC = 'Simpan';
        this.defaultNilaiTempC();
        this.modalService.open(content, {ariaLabelledBy: 'modal-temp-c'}).result.then((result) => {
          this.closeResultModalTempC = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalTempC = `Dismissed ${this.getDismissReasonModalTempC(reason)}`;
        });
      }else{
        this.toastr.error('Jam belum ditambahkan atau semua data Temp C telah terisi', 'Error', {
          timeOut: 5000,
        });
      }
    }else{
      this.idPartografGrafik = id;
      let dataEditTempC = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
      this.nowDataTempC = dataEditTempC[0];
      this.temp_c = this.nowDataTempC.temp;
      this.jam_temp_c_select = this.nowDataTempC.jam_dipilih_temp;
      this.createUpdateTempC = 'Ubah';
      this.modalService.open(content, {ariaLabelledBy: 'modal-temp-c'}).result.then((result) => {
        this.closeResultModalTempC = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalTempC = `Dismissed ${this.getDismissReasonModalTempC(reason)}`;
      });
    }
  }

  private getDismissReasonModalTempC(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  defaultNilaiTempC(){
    this.temp_c = '';
    this.jam_temp_c_select = '';
  }

  cekValidasiSimpanTemp(){
    if(this.temp_c === '' || this.jam_temp_c_select === ''){
      this.validasiSimpanTemp = false;
      this.toastr.error('Input Temp C dan pilihan Jam tidak boleh ada yang kosong', 'Error');
    }else if(this.temp_c <= 31){
      this.validasiSimpanTemp = false;
      this.toastr.error('Nilai Temp C tidak sesuai', 'Error');
    }
    else{
      this.validasiSimpanTemp = true;
    }
  }

  simpan_temp_c(){
    this.cekValidasiSimpanTemp();
    let filterDataGrafikById = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
    let body = {
      "grafik_partograf_id": this.idPartografGrafik,

      "denyut_jantung": filterDataGrafikById[0].denyut_jantung,
      "jam_dipilih_djj": filterDataGrafikById[0].jam_dipilih_djj,

      "air_ketuban": filterDataGrafikById[0].air_ketuban,
      "air_penyusup": filterDataGrafikById[0].air_penyusup,
      "jam_dipilih_air_ketuban_penyusupan": filterDataGrafikById[0].jam_dipilih_air_ketuban_penyusupan,

      "turunnya_kepala": filterDataGrafikById[0].turunnya_kepala,
      "pembukaan_serviks": filterDataGrafikById[0].pembukaan_serviks,
      "jam_dipilih_turunnya_kepala_dan_pembukaan_serviks": filterDataGrafikById[0].jam_dipilih_turunnya_kepala_dan_pembukaan_serviks,
      
      "jumlah_kontraksi": filterDataGrafikById[0].jumlah_kontraksi,
      "detik_kontraksi": filterDataGrafikById[0].detik_kontraksi,
      "jam_dipilih_detik_dan_jumlah_kontraksi": filterDataGrafikById[0].jam_dipilih_detik_dan_jumlah_kontraksi,
      
      "total_tetes": filterDataGrafikById[0].total_tetes,
      "jam_dipilih_total_tetes": filterDataGrafikById[0].jam_dipilih_total_tetes,
      
      "obat": filterDataGrafikById[0].obat,
      "cairan": filterDataGrafikById[0].cairan,
      "jam_dipilih_obat_dan_cairan": filterDataGrafikById[0].jam_dipilih_obat_dan_cairan,
      
      "nadi": filterDataGrafikById[0].nadi,
      "jam_pilihan_nadi": filterDataGrafikById[0].jam_pilihan_nadi,
      
      "systole": filterDataGrafikById[0].systole,
      "distole": filterDataGrafikById[0].distole,
      "jam_dipilih_systole_dan_distole": filterDataGrafikById[0].jam_dipilih_systole_dan_distole,
      // isi
      "temp": this.temp_c,
      "jam_dipilih_temp": this.jam_temp_c_select,

      "protein": filterDataGrafikById[0].protein,
      "jam_dipilih_protein": filterDataGrafikById[0].jam_dipilih_protein,
      
      "aseton": filterDataGrafikById[0].aseton,
      "jam_dipilih_aseton": filterDataGrafikById[0].jam_dipilih_aseton,

      "volume": filterDataGrafikById[0].volume,
      "jam_dipilih_volume": filterDataGrafikById[0].jam_dipilih_volume
    };

    // console.log(body);
    if(this.validasiSimpanTemp === true){
      this.PartografService.updateGrafikPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Temp C berhasil simpan', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.defaultNilaiTekananDarah();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  periksaNilaiVolume(event: any){
    const isNumeric = /^-?\d*[.]?\d{0,2}$/;
    if (isNumeric.test(event.target.value)) {
      this.alertNilaiVolume = false;
    }else{
      this.alertNilaiVolume = true;
      this.volume = '';
    }
  }

  openModalUrin(content, id, jenis){
    if(jenis == 'create'){
      if(this.nextDataUrin){
        this.nowDataUrin = this.nextDataUrin;
        this.idPartografGrafik = this.nowDataUrin.id;
        this.createUpdateUrin = 'Simpan';
        this.defaultNilaiUrin();
        this.modalService.open(content, {ariaLabelledBy: 'modal-urin'}).result.then((result) => {
          this.closeResultModalUrin = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalUrin = `Dismissed ${this.getDismissReasonModalUrin(reason)}`;
        });
      }else{
        this.toastr.error('Jam belum ditambahkan atau semua data Urin telah terisi', 'Error', {
          timeOut: 5000,
        });
      }
      
    }else{
      this.idPartografGrafik = id;
      let dataEditUrin = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
      this.nowDataUrin = dataEditUrin[0];
      this.protein_select = this.nowDataUrin.protein;
      this.aseton_select = this.nowDataUrin.aseton;
      this.volume = this.nowDataUrin.volume;
      this.jam_urin_select = this.nowDataUrin.jam_dipilih_protein;
      this.createUpdateUrin = 'Ubah';
      this.modalService.open(content, {ariaLabelledBy: 'modal-urin'}).result.then((result) => {
        this.closeResultModalUrin = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResultModalUrin = `Dismissed ${this.getDismissReasonModalUrin(reason)}`;
      });
    }
  }
  private getDismissReasonModalUrin(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  defaultNilaiUrin(){
    this.protein_select = '';
    this.aseton_select = '';
    this.volume = '';
    this.jam_urin_select = '';
  }

  cekValidasiSimpanUrin(){
    if(this.protein_select === '' || this.aseton_select === '' || this.volume === '' || this.jam_urin_select === ''){
      this.toastr.error('Input dan pilihan tidak boleh ada yang kosong', 'Error');
      this.validasiSimpanUrin = false;
    }else{
      this.validasiSimpanUrin = true;
    }
  }

  simpan_urin(){
    this.cekValidasiSimpanUrin();
    let filterDataGrafikById = this.grafikPartografData.filter(item => item.id == this.idPartografGrafik);
    let body = {
      "grafik_partograf_id": this.idPartografGrafik,

      "denyut_jantung": filterDataGrafikById[0].denyut_jantung,
      "jam_dipilih_djj": filterDataGrafikById[0].jam_dipilih_djj,

      "air_ketuban": filterDataGrafikById[0].air_ketuban,
      "air_penyusup": filterDataGrafikById[0].air_penyusup,
      "jam_dipilih_air_ketuban_penyusupan": filterDataGrafikById[0].jam_dipilih_air_ketuban_penyusupan,

      "turunnya_kepala": filterDataGrafikById[0].turunnya_kepala,
      "pembukaan_serviks": filterDataGrafikById[0].pembukaan_serviks,
      "jam_dipilih_turunnya_kepala_dan_pembukaan_serviks": filterDataGrafikById[0].jam_dipilih_turunnya_kepala_dan_pembukaan_serviks,
      
      "jumlah_kontraksi": filterDataGrafikById[0].jumlah_kontraksi,
      "detik_kontraksi": filterDataGrafikById[0].detik_kontraksi,
      "jam_dipilih_detik_dan_jumlah_kontraksi": filterDataGrafikById[0].jam_dipilih_detik_dan_jumlah_kontraksi,
      
      "total_tetes": filterDataGrafikById[0].total_tetes,
      "jam_dipilih_total_tetes": filterDataGrafikById[0].jam_dipilih_total_tetes,
      
      "obat": filterDataGrafikById[0].obat,
      "cairan": filterDataGrafikById[0].cairan,
      "jam_dipilih_obat_dan_cairan": filterDataGrafikById[0].jam_dipilih_obat_dan_cairan,
      
      "nadi": filterDataGrafikById[0].nadi,
      "jam_pilihan_nadi": filterDataGrafikById[0].jam_pilihan_nadi,
      
      "systole": filterDataGrafikById[0].systole,
      "distole": filterDataGrafikById[0].distole,
      "jam_dipilih_systole_dan_distole": filterDataGrafikById[0].jam_dipilih_systole_dan_distole,
      
      "temp": filterDataGrafikById[0].temp,
      "jam_dipilih_temp": filterDataGrafikById[0].jam_dipilih_temp,
      // isi
      "protein": this.protein_select,
      "jam_dipilih_protein": this.jam_urin_select,
      
      "aseton": this.aseton_select,
      "jam_dipilih_aseton": this.jam_urin_select,

      "volume": this.volume,
      "jam_dipilih_volume": this.jam_urin_select
    };

    // console.log(body);
    if(this.validasiSimpanUrin === true){
      this.PartografService.updateGrafikPartograf(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Data Urin berhasil simpan', 'Sukses', {
              timeOut: 2000,
            });                
            this.ngOnInit();
            this.modalService.dismissAll();
            this.defaultNilaiTekananDarah();
            this.defaultNilaiArrayGrafik();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  cekSimpanMakanMinum(){
    if(this.makan_terakhir === undefined || this.makan_terakhir === ''){
      this.toastr.error('Nilai Makan Terakhir tidak boleh kosong', 'Error');
      this.validasiSimpanMakanMinum = false;
    }else if(this.makan_jenis === undefined || this.makan_jenis === ''){
      this.toastr.error('Nilai Jenis Makan tidak boleh kosong', 'Error');
      this.validasiSimpanMakanMinum = false;
    }else if(this.makan_porsi === undefined || this.makan_porsi === ''){
      this.toastr.error('Nilai Porsi Makan tidak boleh kosong', 'Error');
      this.validasiSimpanMakanMinum = false;
    }else if(this.minum_terakhir === undefined || this.minum_terakhir === ''){
      this.toastr.error('Nilai Minum Terakhir tidak boleh kosong', 'Error');
      this.validasiSimpanMakanMinum = false;
    }else if(this.minum_jenis === undefined || this.minum_jenis === ''){
      this.toastr.error('Nilai Jenis Minum tidak boleh kosong', 'Error');
      this.validasiSimpanMakanMinum = false;
    }else if(this.minum_porsi === undefined || this.minum_porsi === ''){
      this.toastr.error('Nilai Porsi Minum tidak boleh kosong', 'Error');
      this.validasiSimpanMakanMinum = false;
    }else{
      this.validasiSimpanMakanMinum = true;
    }
  }

  simpan_makanminum(){
    this.cekSimpanMakanMinum();
    let body = {
      "id": this.idMakanMinum,
      "no_rm": this.no_rm,
      "no_transaksi": this.no_transaksi,
      "username": this.username,
      "makan_terakhir": this.makan_terakhir,
      "jenis_makan": this.makan_jenis,
      "porsi_makan": this.makan_porsi,
      "minum_terakhir": this.minum_terakhir,
      "jenis_minum": this.minum_jenis,
      "porsi_minum": this.minum_porsi,
    };
    
    // console.log(body);
    if(this.validasiSimpanMakanMinum === true){
      if(this.createUpdateMakanMinum === 'Create'){
        this.PartografService.simpanMakanMinum(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Makan dan Minum Terakhir berhasil simpan', 'Sukses', {
                timeOut: 2000,
              });                
              this.ngOnInit();
              this.modalService.dismissAll();
              this.defaultNilaiTekananDarah();
              this.defaultNilaiArrayGrafik();
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      }else if(this.createUpdateMakanMinum === 'Update'){
        this.PartografService.updateMakanMinum(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Makan dan Minum Terakhir berhasil simpan', 'Sukses', {
                timeOut: 2000,
              });                
              this.ngOnInit();
              this.modalService.dismissAll();
              this.defaultNilaiTekananDarah();
              this.defaultNilaiArrayGrafik();
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

}
