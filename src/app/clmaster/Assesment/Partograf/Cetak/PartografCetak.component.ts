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
import { printDiv } from './print-div';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';

import { PartografService } from '../Service/partograf.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
// import { TemplateService } from '../../Template/Service/Template.service';

// import { AssesmentAnakCetakComponent } from './Cetak/AssesmentAnakCetak.component';

import * as moment from 'moment';

@Component({
  selector: 'app-PartografCetak',
  templateUrl: './PartografCetak.component.html',
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
export class PartografCetakComponent implements OnInit {
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
  imageWaktuAtas = './assets/images/EMR/Partograf/waktuatas.jpg';
  imageDenyut = './assets/images/EMR/Partograf/denyutfix.jpg';
  imageAirKetuban = './assets/images/EMR/Partograf/airpenfix.jpg';
  imageBukaServik = './assets/images/EMR/Partograf/bukaservik.jpg';
  imageKontraksi = './assets/images/EMR/Partograf/kontraksifix.jpg';
  imageKetuban = './assets/images/EMR/Partograf/ketubanfix.jpg';
  imageObatCairan = './assets/images/EMR/Partograf/obatcairanfixss.jpg';
  imageTekananDarah = './assets/images/EMR/Partograf/tdfix.jpg';
  imageTemperatur = './assets/images/EMR/Partograf/tempfix.jpg';
  imageUrine = './assets/images/EMR/Partograf/urinefix.jpg';

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

  namaPasien:any;

  idPartograf:any;
  idTabelKala4:any;

  waktuPecahKetuban:any = '';
  tanggal_masuk:any = '';
  waktuMasuk:any = '';
  waktuMules:any = '';
  nilaiG:any;
  nilaiP:any;
  nilaiA:any;
  minggu:any;
  
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
  tempat_persalinan_input:any;
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
  hasil_episiotomi:any;
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

  constructor(
    public http :HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService, 
    private PartografService:PartografService, 
    // private templateService:TemplateService,
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

    tanggal_masuk: ['',Validators.required],
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
        this.PartografService.getByNoRmNoTr(this.no_rm, this.no_transaksi).subscribe(
          (data: any) => {
            // console.log(data);
            this.partografData = data.data[0];
            if(this.partografData){
              this.idPartograf = this.partografData.id;
              this.createUpdatePartograf = 'Update';
            }else{
              this.createUpdatePartograf = 'Create';
            }
            // console.log(this.partografData.id);
            // this.idPartograf = data.data[0].id;
            this.grafikPartografData = data.data[0].grafikpartograf;
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

            this.pasangPartograf(this.partografData);
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
            this.pasangMakanMinum(this.makanMinumData);
          },(error: any) => console.log(error)
        );
    }

    pasangPartograf(nilai){
        this.waktuPecahKetuban = nilai.waktu_ketuban_pecah;
        this.tanggal_masuk = nilai.tanggal_masuk;
        this.waktuMasuk = nilai.waktu_masuk;
        this.waktuMules = nilai.waktu_mules;
        this.nilaiG = nilai.g;
        this.nilaiP = nilai.p;
        this.nilaiA = nilai.a;
        this.minggu = nilai.hamil_minggu;
    }

    ambilDataPasien() {
      this.PartografService.getPasienNoRm(this.no_rm).subscribe(
        (data: any) => {
          if(data.pasien[0].pasien){
            this.namaPasien = data.pasien[0].pasien;
          }else{
            this.namaPasien = '';
          }
          // console.log('data pasien');
          // console.log(data.pasien[0].pasien);
          
        },(error: any) => console.log(error)
      );
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

        nilaiY= -20 * jml_kontraksi + 100;

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

    

//   defaultNilaiArrayGrafik(){
//     this.titikDjj = [];
//     this.garisDjj = [];
//     this.titikKetubanPenyusup = [];
//     this.titikPembukaan = [];
//     this.titikTurun = [];
//     this.garisPembukaan = [];
//     this.garisTurun = [];
//     this.waktuBawah = [];
//     this.titikKontraksi = [];
//     this.titikOksitosin = [];
//     this.titikObat = [];
//     this.titikNadi = [];
//     this.garisNadi = [];
//     this.titikSystole = [];
//     this.titikDistole = [];
//     this.garisSystole = [];
//     this.garisDistole = [];
//     this.titikTempC = [];
//     this.titikUrin = [];
//   }
    cetakParams(idPage){
        printDiv(idPage);
        // window.print();
    }

    cetak(){
        printDiv('halamanCetak');
        // window.print();
    }

}
