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

import { KebidananService } from './Service/Kebidanan.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

import * as moment from 'moment';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-Kebidanan',
  templateUrl: './Kebidanan.component.html',
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
export class KebidananComponent implements OnInit {
  heading = 'Keperawatan UGD';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  // Validasi file Create / Update
  validasiCreateUpdate = '';

  // Icon
  faCheck = faCheck;
  faTrash = faTrash;
  faWindowClose = faWindowClose;
  
  asesmentKebidanan: any = [];

  regexGolonganDarahIbu = new FormControl(); 
  regexGolonganDarahSuami = new FormControl(); 

  // Session
  username:any;
  // Main Data Input
  no_rm:any;
  no_transaksi:any;

  listNotransaksiPerNoRM:any;

  // Assesment Informasi
  tanggal_tiba: any;
  tanggal_assesment: any;
  cara_masuk:any='';
  cara_masuk_lainnya:any;
  asal_masuk:any='';
  asal_masuk_lainnya:any;
  dikirim_oleh:any='';
  dikirim_oleh_lainnya:any;

  // Riwayat Kesehatan
  riwayat_penyakit_diderita:any='';
  jenis_riwayat_penyakit_diderita:any;
  uraian_penyakit_yang_diderita:any;
  riwayat_pengobatan_saat_dirumah:any='';
  operasi_yang_pernah_dilakukan:any;
  riwayat_transfusi_darah:any='';
  alasan_riwayat_transfusi_darah:any;
  golongan_darah_ibu:any;
  golongan_darah_rhesus_ibu:any;
  golongan_darah_suami:any;
  golongan_darah_rhesus_suami:any;
  bersedia_transfusi_darah:any='';
  alasan_bersedia_transfusi_darah:any;
  reaksi_alergi_transfusi:any='';
  alasan_reaksi_alergi_transfusi:any;
  budaya_menolak_transfusi_darah:any='';
  faktor_keturunan_gemeli:any='';
  rw_penyakit_herediter:any='';
  alasan_rw_penyakit_herediter:any;
  rw_keluarga_saat_ini:any;
  
  // Riwayat Obstetri
  menarche_umur:any;
  menstruasi:any='';
  siklus_menstruasi:any;
  sakit_saat_menstruasi:any='';
  alasan_sakit_saat_menstruasi:any;
  menikah_yang_ke:any;
  lama_pernikahan:any;
  kontrasepsi_yang_pernah_digunakan:any='';
  lama_pemakaian:any;

  // Data Kehamilan
  gravida:any='';
  para:any;
  abortus:any='';
  hamil:any;
  hpht:any;
  hpl:any;
  keluhan_yang_dirasakan:any;
  riwayat_anc:any;
  gerakan_janin:any='';
  tinggi_fudus_uteri:any;
  taksiran_berat_janin:any;
  palpasi_leopold_1_fundus_teraba:any='';
  palpasi_leopold_2_kanan_teraba:any='';
  palpasi_leopold_2_kiri_teraba:any='';
  palpasi_leopold_3_bawah_teraba:any='';
  palpasi_leopold_4_penurunan_teraba:any;
  djj:any='';
  djj_per_menit:any;
  his:any;
  vt:any;
  kesimpulan_janin:any='';
  lainnya_kesimpulan_janin:any;
  kesimpulan_letak:any='';
  lainnya_letak_janin:any;
  kesimpulan_presentasi:any='';
  lainnya_presentasi_janin:any;

  // Pemeriksaan Fisik
  kondisi_umum:any;
  kesadaran_gcs:any;
  kesadaran_e:any='';
  kesadaran_m:any='';
  kesadaran_v:any='';
  tekanan_darah:any;
  suhu:any;
  tinggi_badan:any;
  nadi:any='';
  nadi_menit:any;
  pernapasan:any='';
  pernapasan_menit:any;
  berat_badan:any;
  kepala:any='';
  detail_kepala:any;
  mata:any='';
  detail_mata:any;
  tht:any='';
  detail_tht:any;
  leher:any='';
  detail_leher:any;
  mulut:any='';
  detail_mulut:any;
  payudara:any='';
  detail_payudara:any;
  jantung:any='';
  detail_jantung:any;
  pulmo:any='';
  detail_pulmo:any;
  abdomen:any='';
  detail_abdomen:any;
  kulit:any='';
  detail_kulit:any;
  tulang_belakang:any='';
  detail_tulang_belakang:any;
  sistem_syaraf:any='';
  detail_sistem_syaraf:any;
  genitalia_anus_rectum:any='';
  detail_genitalia_anus_rectum:any;

  // Pengkajian nyeri
  pengkajian_nyeri:any='';
  nyeri_mempengaruhi:any='';

  // Nutrisi
  perubahan_berat_badan:any='';
  penjelasan_perubahan_berat_badan:any;
  diet_khusus:any='';
  penjelasan_diet_khusus:any;
  nafsu_makan:any='';
  penjelasan_nafsu_makan:any;

  // Eliminasi
  buang_air_besar:any='';
  penjelasan_buang_air_besar:any;
  buang_air_kecil:any='';
  keterangan:any;

  // Aktifitas
  aktivitas_dan_istirahat:any='';

  // Mental
  status_mental:any='';

  // Psikosial
  respon_emosi:any='';
  support_keluarga:any='';

  // Sistem Sosial dan Budaya
  pendidikan_terakhir_ibu:any;
  pendidikan_terakhir_ayah:any;
  pekerjaan:any='';
  pekerjaan_lainnya:any;
  tinggal_bersama:any='';
  tinggal_bersama_lainnya:any;
  membantu_merawat_dirumah:any;
  bantuan_mandi:any;
  bantuan_berjalan:any;
  bantuan_bab_bak:any;
  bantuan_rawat_luka:any;
  bantuan_makan:any;
  bantuan_pemberian_obat:any;
  
  // Masalah diagnosis kebidanan
  arrayNyeri:any='';
  // nyeri:any;
  // cemas:any;
  // perubahan_nutrisi:any;
  // resiko_perdarahan:any;
  // eliminasi:any;
  // kurang_pengetahuan_persalinan:any;
  // lain_lain:any;
  nyeri:boolean=false;
  cemas:boolean=false;
  perubahan_nutrisi:boolean=false;
  resiko_perdarahan:boolean=false;
  eliminasi:boolean=false;
  kurang_pengetahuan_persalinan:boolean=false;
  lain_lain:boolean=false;
  detail_lain_lain:any;
  diagnosa_kebidanan:any;
  rencana:any='';
  
  // Riwayat Pengobatan
  obat:any='';
  dosis:any='';
  cara_pemberian:any='';
  frekuensi:any='';
  waktu:any='';
  
  // Riwayat kehamilan
  jenis_kelamin:any='';
  tahun_partus:any;
  umur_anak:any;
  ku_anak:any;
  bbi_gram:any;
  riwayat_kehamilan:any='';
  riwayat_sc:any='';
  ditolong_oleh:any;
  
  // Modal Riwayat Pengobatan
  closeResultModalRiwayatPengobatan: string;
  closeResultModalHapusRiwayatPengobatan: string;
  id_hapus_riwayat_pengobatan:any;

  // Modal Riwayat Kehamilan
  closeResultModalRiwayatKehamilan: string;
  closeResultModalHapusRiwayatKehamilan: string;
  id_hapus_riwayat_kehamilan:any;

  
  // Hidden
  hiddenCaraMasuk = true;
  hiddenAsalMasuk = true;
  hiddenDikirimOleh = true;
  
  hiddenJenisRiwayatPenyakitDiderita = true;
  hiddenRiwayatPengobatanSaatDirumah = true;

  // Disabled
  disabledLainLain = true;
  disabledRiwayatTransfusiDarah = true;
  disabledBersediaTransfusiDarah = true;
  disabledReaksiAlergiTransfusi = true;
  disabledRWPenyakitHerediter = true;
  disabledSakitSaatMenstruasi = true;

  disabledKesimpulanJanin = true;
  disabledLetak = true;
  disabledPresentasi = true;

  disabledKepala = true;
  disabledMata = true;
  disabledTHT = true;
  disabledLeher = true;
  disabledMulut = true;
  disabledPayudara = true;
  disabledJantung = true;
  disabledPulmo = true;
  disabledAbdomen = true;
  disabledKulit = true;
  disabledTulangBelakang = true;
  disabledSistemSyaraf = true;
  disabledGenitalia = true;

  disabledPerubahanBeratBadan = true;
  disabledDietKhusus = true;
  disabledNafsuMakan = true;

  disabledBuangAirBesar = true;

  disabledPekerjaan = true;
  disabledTinggalBersama = true;

  disabledDJJ = true;
  disabledNadi = true;
  disabledPernapasan = true;
  disabledLamaKontrasepsi = true;
  

  // ButtonSave
  validasiButtonSave = true;
  pipe = new DatePipe('en-US');
  constructor(
    public http :HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService, 
    private kebidananService:KebidananService, 
    private fb: FormBuilder,
    public datepipe: DatePipe,
    ) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });
    this.tanggal_tiba = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

    this.tanggal_assesment = this.pipe.transform(Date.now(), 'yyyy-MM-dd');


  }

  KebidananForm = this.fb.group({
    // Main Data Input
    no_rm: ['',Validators.required],
    no_transaksi: ['',Validators.required],

    // Assesment Informasi
    tanggal_tiba: ['',Validators.required],
    tanggal_assesment: ['',Validators.required],
    cara_masuk: ['',Validators.required],
    cara_masuk_lainnya: ['',Validators.required],
    asal_masuk: ['',Validators.required],
    asal_masuk_lainnya: ['',Validators.required],
    dikirim_oleh: ['',Validators.required],
    dikirim_oleh_lainnya: ['',Validators.required],

    // Riwayat kesehatan
    riwayat_penyakit_diderita: ['',Validators.required],
    jenis_riwayat_penyakit_diderita: ['',Validators.required],
    uraian_penyakit_yang_diderita: ['',Validators.required],
    operasi_yang_pernah_dilakukan: ['',Validators.required],
    riwayat_transfusi_darah: ['',Validators.required],
    alasan_riwayat_transfusi_darah: ['',Validators.required],
    golongan_darah_ibu: ['',Validators.required],
    golongan_darah_rhesus_ibu: ['',Validators.required],
    golongan_darah_suami: ['',Validators.required],
    golongan_darah_rhesus_suami: ['',Validators.required],
    bersedia_transfusi_darah: ['',Validators.required],
    alasan_bersedia_transfusi_darah: ['',Validators.required],
    reaksi_alergi_transfusi: ['',Validators.required],
    alasan_reaksi_alergi_transfusi: ['',Validators.required],
    budaya_menolak_transfusi_darah: ['',Validators.required],
    faktor_keturunan_gemeli: ['',Validators.required],
    rw_penyakit_herediter: ['',Validators.required],
    alasan_rw_penyakit_herediter: ['',Validators.required],
    rw_keluarga_saat_ini: ['',Validators.required],
    
    // Riwayat Obstetri
    menarche_umur: ['',Validators.required],
    menstruasi: ['',Validators.required],
    siklus_menstruasi: ['',Validators.required],
    sakit_saat_menstruasi: ['',Validators.required],
    alasan_sakit_saat_menstruasi: ['',Validators.required],
    menikah_yang_ke: ['',Validators.required],
    lama_pernikahan: ['',Validators.required],
    kontrasepsi_yang_pernah_digunakan: ['',Validators.required],
    lama_pemakaian: ['',Validators.required],

    // Data Kehamilan
    gravida: ['',Validators.required],
    para: ['',Validators.required],
    abortus: ['',Validators.required],
    hamil: ['',Validators.required],
    hpht: ['',Validators.required],
    hpl: ['',Validators.required],
    keluhan_yang_dirasakan: ['',Validators.required],
    riwayat_anc: ['',Validators.required],
    gerakan_janin: ['',Validators.required],
    tinggi_fudus_uteri: ['',Validators.required],
    taksiran_berat_janin: ['',Validators.required],
    palpasi_leopold_1_fundus_teraba: ['',Validators.required],
    palpasi_leopold_2_kanan_teraba: ['',Validators.required],
    palpasi_leopold_2_kiri_teraba: ['',Validators.required],
    palpasi_leopold_3_bawah_teraba: ['',Validators.required],
    palpasi_leopold_4_penurunan_teraba: ['',Validators.required],
    djj: ['',Validators.required],
    djj_per_menit: ['',Validators.required],
    his: ['',Validators.required],
    vt: ['',Validators.required],
    kesimpulan_janin: ['',Validators.required],
    lainnya_kesimpulan_janin: ['',Validators.required],
    kesimpulan_letak: ['',Validators.required],
    lainnya_letak_janin: ['',Validators.required],
    kesimpulan_presentasi: ['',Validators.required],
    lainnya_presentasi_janin: ['',Validators.required],
    
    // Pemeriksaan Fisik
    kondisi_umum: ['',Validators.required],
    kesadaran_gcs: ['',Validators.required],
    kesadaran_e: ['',Validators.required],
    kesadaran_m: ['',Validators.required],
    kesadaran_v: ['',Validators.required],
    tekanan_darah: ['',Validators.required],
    suhu: ['',Validators.required],
    tinggi_badan: ['',Validators.required],
    nadi: ['',Validators.required],
    nadi_menit: ['',Validators.required],
    pernapasan: ['',Validators.required],
    pernapasan_menit: ['',Validators.required],
    berat_badan: ['',Validators.required],
    kepala: ['',Validators.required],
    detail_kepala: ['',Validators.required],
    mata: ['',Validators.required],
    detail_mata: ['',Validators.required],
    tht: ['',Validators.required],
    detail_tht: ['',Validators.required],
    leher: ['',Validators.required],
    detail_leher: ['',Validators.required],
    mulut: ['',Validators.required],
    detail_mulut: ['',Validators.required],
    payudara: ['',Validators.required],
    detail_payudara: ['',Validators.required],
    jantung: ['',Validators.required],
    detail_jantung: ['',Validators.required],
    pulmo: ['',Validators.required],
    detail_pulmo: ['',Validators.required],
    abdomen: ['',Validators.required],
    detail_abdomen: ['',Validators.required],
    kulit: ['',Validators.required],
    detail_kulit: ['',Validators.required],
    tulang_belakang: ['',Validators.required],
    detail_tulang_belakang: ['',Validators.required],
    sistem_syaraf: ['',Validators.required],
    detail_sistem_syaraf: ['',Validators.required],
    genitalia_anus_rectum: ['',Validators.required],
    detail_genitalia_anus_rectum: ['',Validators.required],

    // Pengkajian nyeri
    pengkajian_nyeri: ['',Validators.required],
    nyeri_mempengaruhi: ['',Validators.required],

    // Nutrisi
    perubahan_berat_badan: ['',Validators.required],
    penjelasan_perubahan_berat_badan: ['',Validators.required],
    diet_khusus: ['',Validators.required],
    penjelasan_diet_khusus: ['',Validators.required],
    nafsu_makan: ['',Validators.required],
    penjelasan_nafsu_makan: ['',Validators.required],

    // Eliminasi
    buang_air_besar: ['',Validators.required],
    penjelasan_buang_air_besar: ['',Validators.required],
    buang_air_kecil: ['',Validators.required],
    keterangan: ['',Validators.required],
    
    // Aktifitas
    aktivitas_dan_istirahat: ['',Validators.required],

    // Mental
    status_mental: ['',Validators.required],

    // Psikosial
    respon_emosi: ['',Validators.required],
    support_keluarga: ['',Validators.required],

    // Sistem Sosial dan Budaya
    pendidikan_terakhir_ibu: ['',Validators.required],
    pendidikan_terakhir_ayah: ['',Validators.required],
    pekerjaan: ['',Validators.required],
    pekerjaan_lainnya: ['',Validators.required],
    tinggal_bersama: ['',Validators.required],
    tinggal_bersama_lainnya: ['',Validators.required],
    membantu_merawat_dirumah: ['',Validators.required],
    bantuan_mandi: ['',Validators.required],
    bantuan_berjalan: ['',Validators.required],
    bantuan_bab_bak: ['',Validators.required],
    bantuan_rawat_luka: ['',Validators.required],
    bantuan_makan: ['',Validators.required],
    bantuan_pemberian_obat: ['',Validators.required],

    // Masalah diagnosis kebidanan
    arrayNyeri: ['',Validators.required],
    nyeri: ['',Validators.required],
    cemas: ['',Validators.required],
    perubahan_nutrisi: ['',Validators.required],
    resiko_perdarahan: ['',Validators.required],
    eliminasi: ['',Validators.required],
    kurang_pengetahuan_persalinan: ['',Validators.required],
    lain_lain: ['',Validators.required],
    detail_lain_lain: ['',Validators.required],
    diagnosa_kebidanan: ['',Validators.required],
    rencana: ['',Validators.required],

    // Riwayat Pengobatan
    obat: ['',Validators.required],
    dosis: ['',Validators.required],
    cara_pemberian: ['',Validators.required],
    frekuensi: ['',Validators.required],
    waktu: ['',Validators.required],
    
    // Riwayat kehamilan
    jenis_kelamin: ['',Validators.required],
    tahun_partus: ['',Validators.required],
    umur_anak: ['',Validators.required],
    ku_anak: ['',Validators.required],
    bbi_gram: ['',Validators.required],
    riwayat_kehamilan: ['',Validators.required],
    riwayat_sc: ['',Validators.required],
    ditolong_oleh: ['',Validators.required],
  });

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.no_rm = localStorage.getItem('noRM');
    this.no_transaksi = localStorage.getItem('noTransaksi');
    
    this.tanggal_tiba = new Date();
    this.tanggal_assesment = new Date();

    this.ambilDataKebidanan();
    this.ambilSemuaNoTransaksiPerNoRM();

  }

  simpanKebidanan(){
    this.pemeriksaanButtonSave();
    let body = {
        // Main Data Input
        "no_rm" : this.no_rm,
        "no_transaksi":this.no_transaksi,
        "username": this.username,
        
        // Assesment Informasi
        "tanggal_tiba":this.datepipe.transform(this.tanggal_tiba, 'yyyy-MM-dd'),
        "tanggal_assesment":this.datepipe.transform(this.tanggal_assesment, 'yyyy-MM-dd'),
        "cara_masuk":this.cara_masuk,
        "cara_masuk_lainnya":this.cara_masuk_lainnya,
        "asal_masuk":this.asal_masuk,
        "asal_masuk_lainnya":this.asal_masuk_lainnya,
        "dikirim_oleh":this.dikirim_oleh,
        "dikirim_oleh_lainnya":this.dikirim_oleh_lainnya,
        
        // Riwayat Kesehatan
        "riwayat_penyakit_diderita":this.riwayat_penyakit_diderita,
        "jenis_riwayat_penyakit_diderita":this.jenis_riwayat_penyakit_diderita,
        "uraian_penyakit_yang_diderita":this.uraian_penyakit_yang_diderita,
        "riwayat_pengobatan_saat_dirumah":this.riwayat_pengobatan_saat_dirumah,
        "operasi_yang_pernah_dilakukan":this.operasi_yang_pernah_dilakukan,
        "riwayat_transfusi_darah":this.riwayat_transfusi_darah,
        "alasan_riwayat_transfusi_darah":this.alasan_riwayat_transfusi_darah,
        "golongan_darah_ibu":this.golongan_darah_ibu,
        "golongan_darah_rhesus_ibu":this.golongan_darah_rhesus_ibu,
        "golongan_darah_suami":this.golongan_darah_suami,
        "golongan_darah_rhesus_suami":this.golongan_darah_rhesus_suami,
        "bersedia_transfusi_darah":this.bersedia_transfusi_darah,
        "alasan_bersedia_transfusi_darah":this.alasan_bersedia_transfusi_darah,
        "reaksi_alergi_transfusi":this.reaksi_alergi_transfusi,
        "alasan_reaksi_alergi_transfusi":this.alasan_reaksi_alergi_transfusi,
        "budaya_menolak_transfusi_darah":this.budaya_menolak_transfusi_darah,
        "faktor_keturunan_gemeli":this.faktor_keturunan_gemeli,
        "rw_penyakit_herediter":this.rw_penyakit_herediter,
        "alasan_rw_penyakit_herediter":this.alasan_rw_penyakit_herediter,
        "rw_keluarga_saat_ini":this.rw_keluarga_saat_ini,
        
        // Riwayat Obstetri
        "menarche_umur":this.menarche_umur,
        "menstruasi":this.menstruasi,
        "siklus_menstruasi":this.siklus_menstruasi,
        "sakit_saat_menstruasi":this.sakit_saat_menstruasi,
        "alasan_sakit_saat_menstruasi":this.alasan_sakit_saat_menstruasi,
        "menikah_yang_ke":this.menikah_yang_ke,
        "lama_pernikahan":this.lama_pernikahan,
        "kontrasepsi_yang_pernah_digunakan":this.kontrasepsi_yang_pernah_digunakan,
        "lama_pemakaian":this.lama_pemakaian,

        // Data Kehamilan
        "gravida":this.gravida,
        "para":this.para,
        "abortus":this.abortus,
        "hamil":this.hamil,
        "hpht":this.hpht,
        "hpl":this.hpl,
        "keluhan_yang_dirasakan":this.keluhan_yang_dirasakan,
        "riwayat_anc":this.riwayat_anc,
        "gerakan_janin":this.gerakan_janin,
        "tinggi_fudus_uteri":this.tinggi_fudus_uteri,
        "taksiran_berat_janin":this.taksiran_berat_janin,
        "palpasi_leopold_1_fundus_teraba":this.palpasi_leopold_1_fundus_teraba,
        "palpasi_leopold_2_kanan_teraba":this.palpasi_leopold_2_kanan_teraba,
        "palpasi_leopold_2_kiri_teraba":this.palpasi_leopold_2_kiri_teraba,
        "palpasi_leopold_3_bawah_teraba":this.palpasi_leopold_3_bawah_teraba,
        "palpasi_leopold_4_penurunan_teraba":this.palpasi_leopold_4_penurunan_teraba,
        "djj":this.djj,
        "djj_per_menit":this.djj_per_menit,
        "his":this.his,
        "vt":this.vt,
        "kesimpulan_janin":this.kesimpulan_janin,
        "lainnya_kesimpulan_janin":this.lainnya_kesimpulan_janin,
        "kesimpulan_letak":this.kesimpulan_letak,
        "lainnya_letak_janin":this.lainnya_letak_janin,
        "kesimpulan_presentasi":this.kesimpulan_presentasi,
        "lainnya_presentasi_janin":this.lainnya_presentasi_janin,
        
        // Pemeriksaan Fisik
        "kondisi_umum":this.kondisi_umum,
        "kesadaran_gcs":this.kesadaran_gcs,
        "kesadaran_e":this.kesadaran_e,
        "kesadaran_m":this.kesadaran_m,
        "kesadaran_v":this.kesadaran_v,
        "tekanan_darah":this.tekanan_darah,
        "suhu":this.suhu,
        "tinggi_badan":this.tinggi_badan,
        "nadi":this.nadi,
        "nadi_menit":this.nadi_menit,
        "pernapasan":this.pernapasan,
        "pernapasan_menit":this.pernapasan_menit,
        "berat_badan":this.berat_badan,
        "kepala":this.kepala,
        "detail_kepala":this.detail_kepala,
        "mata":this.mata,
        "detail_mata":this.detail_mata,
        "tht":this.tht,
        "detail_tht":this.detail_tht,
        "leher":this.leher,
        "detail_leher":this.detail_leher,
        "mulut":this.mulut,
        "detail_mulut":this.detail_mulut,
        "payudara":this.payudara,
        "detail_payudara":this.detail_payudara,
        "jantung":this.jantung,
        "detail_jantung":this.detail_jantung,
        "pulmo":this.pulmo,
        "detail_pulmo":this.detail_pulmo,
        "abdomen":this.abdomen,
        "detail_abdomen":this.detail_abdomen,
        "kulit":this.kulit,
        "detail_kulit":this.detail_kulit,
        "tulang_belakang":this.tulang_belakang,
        "detail_tulang_belakang":this.detail_tulang_belakang,
        "sistem_syaraf":this.sistem_syaraf,
        "detail_sistem_syaraf":this.detail_sistem_syaraf,
        "genitalia_anus_rectum":this.genitalia_anus_rectum,
        "detail_genitalia_anus_rectum":this.detail_genitalia_anus_rectum,

        // Pengkajian nyeri
        "pengkajian_nyeri":this.pengkajian_nyeri,
        "nyeri_mempengaruhi":this.nyeri_mempengaruhi,

        // Nutrisi
        "perubahan_berat_badan":this.perubahan_berat_badan,
        "penjelasan_perubahan_berat_badan":this.penjelasan_perubahan_berat_badan,
        "diet_khusus":this.diet_khusus,
        "penjelasan_diet_khusus":this.penjelasan_diet_khusus,
        "nafsu_makan":this.nafsu_makan,
        "penjelasan_nafsu_makan":this.penjelasan_nafsu_makan,

        // Eliminasi
        "buang_air_besar":this.buang_air_besar,
        "penjelasan_buang_air_besar":this.penjelasan_buang_air_besar,
        "buang_air_kecil":this.buang_air_kecil,
        "keterangan":this.keterangan,

        // Aktifitas
        "aktivitas_dan_istirahat":this.aktivitas_dan_istirahat,

        // Mental
        "status_mental":this.status_mental,

        // Psikosial
        "respon_emosi":this.respon_emosi,
        "support_keluarga":this.support_keluarga,

        // Sistem Sosial dan Budaya
        "pendidikan_terakhir_ibu":this.pendidikan_terakhir_ibu,
        "pendidikan_terakhir_ayah":this.pendidikan_terakhir_ayah,
        "pekerjaan":this.pekerjaan,
        "pekerjaan_lainnya":this.pekerjaan_lainnya,
        "tinggal_bersama":this.tinggal_bersama,
        "tinggal_bersama_lainnya":this.tinggal_bersama_lainnya,
        "membantu_merawat_dirumah":this.membantu_merawat_dirumah,
        "bantuan_mandi":this.bantuan_mandi,
        "bantuan_berjalan":this.bantuan_berjalan,
        "bantuan_bab_bak":this.bantuan_bab_bak,
        "bantuan_rawat_luka":this.bantuan_rawat_luka,
        "bantuan_makan":this.bantuan_makan,
        "bantuan_pemberian_obat":this.bantuan_pemberian_obat,
        
        // Masalah diagnosis kebidanan
        "nyeri":this.arrayNyeri,
        // "nyeri":this.nyeri,
        // "cemas":this.cemas,
        // "perubahan_nutrisi":this.perubahan_nutrisi,
        // "resiko_perdarahan":this.resiko_perdarahan,
        // "eliminasi":this.eliminasi,
        "kurang_pengetahuan_persalinan":this.kurang_pengetahuan_persalinan,
        "lain_lain":this.lain_lain,
        "detail_lain_lain":this.detail_lain_lain,
        "diagnosa_kebidanan":this.diagnosa_kebidanan,
        "rencana":this.rencana

        
    };
    
    console.log(body);
    

    if(this.validasiButtonSave == false){
      this.toastr.error('Form Belum Terisi Semua ', 'Error', {
        timeOut: 2000,
      });                
    } else {    
      if(this.validasiCreateUpdate == 'Create'){
        this.kebidananService.simpanKebidanan(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Assesmen kebidanan sudah dibuat', 'Sukses', {
                timeOut: 2000,
              });
              
              this.ambilSemuaNoTransaksiPerNoRM()
              // this.ngOnInit();
              // this.buatDefaultNilai();
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      } else if(this.validasiCreateUpdate == 'Update') {
        this.kebidananService.updateKebidanan(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.ambilSemuaNoTransaksiPerNoRM()
              this.toastr.success('Assesmen kebidanan sudah diupdate', 'Sukses', {
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
  
  pemeriksaanButtonSave(){
    if(this.tanggal_tiba == '' || this.tanggal_assesment == '' || this.cara_masuk == '' || this.asal_masuk == ''
    || this.dikirim_oleh == ''
    ){
      this.validasiButtonSave = false;
    } else {
      this.validasiButtonSave = true;
    }
  }

  ambilDataKebidanan() {
    // console.log("Ambil Data Kebidanan");
    this.kebidananService.getKebidananAssesmentByNoTransaksiNoRM(this.no_rm, this.no_transaksi).subscribe(
      (data: any) => {
        // console.log(data);
        // console.log(JSON.stringify(data));
        this.asesmentKebidanan = data;
        // console.log("Asesment Kebidanan");
        // console.log(this.asesmentKebidanan);
        if(this.asesmentKebidanan.asesmen_informasi[0]){
          this.validasiCreateUpdate = "Update";
          
          // Pasang nilai untuk update
          this.pasangAssesmentInformasi(this.asesmentKebidanan.asesmen_informasi[0]);
          this.pasangDataKehamilan(this.asesmentKebidanan.data_kehamilan[0]);
          this.pasangEliminasiAssesment(this.asesmentKebidanan.eliminasi_asesmen[0]);
          this.pasangMasalahDiagnosisAssesment(this.asesmentKebidanan.masalah_diagnosis_kebidanan[0]);
          this.pasangSosialBudaya(this.asesmentKebidanan.sosial_budaya[0]);
          this.pasangRiwayatObsetri(this.asesmentKebidanan.riwayat_obstetri[0]);
          this.pasangRiwayatKesehatan(this.asesmentKebidanan.riwayat_kesehatan[0]);
          this.pasangPemeriksaanFisik(this.asesmentKebidanan.pemeriksaan_fisik[0]);
          this.pasangPengkajianNyeri(this.asesmentKebidanan.pengkajian_nyeri[0]);
          this.pasangNutrisiAssesment(this.asesmentKebidanan.nutrisi_asesmen[0]);
          this.pasangAktifitasDanIstirahat(this.asesmentKebidanan.aktivitas_dan_istirahat[0]);
          this.pasangStatusMental(this.asesmentKebidanan.status_mental[0]);
          this.pasangDataPsikosial(this.asesmentKebidanan.psikosial[0])
          this.pasangCheckBoxArrayNyeri(this.asesmentKebidanan.masalah_diagnosis_kebidanan[0]);

          this.pasangLamaKontrasepsi();
        } else {
          this.validasiCreateUpdate = "Create";
        }
        // this.validasiCreateUpdate = "Create";
        // console.log("Nilai Assesment Kebidanan");
        // console.log(this.asesmentKebidanan);
        // console.log(this.asesmentKebidanan.aktivitas_dan_istirahat[0]);

      },(error: any) => console.log(error)
    );
  }

  ambilDataRiwayatObat(){
    this.kebidananService.getKebidananAssesmentByNoTransaksiNoRM(this.no_rm, this.no_transaksi).subscribe(
      (data: any) => {
        this.asesmentKebidanan.riwayat_pengobatan = data.riwayat_pengobatan;
      },(error: any) => console.log(error)
    );
  }

  ambilAssesmentBaru(noTransaksiBaru){
    localStorage.setItem('noTransaksi', noTransaksiBaru);
    this.ngOnInit();
    this.validasiCreateUpdate = 'Update';
  }

  // List data yang sudah ada
  ambilSemuaNoTransaksiPerNoRM(){
    this.kebidananService.getKebidananByNoRM(this.no_rm).subscribe(
      (data: any) => {
        // console.log("Ini untuk get by No RM");
        // console.log(data);
        if(data.success == true){
          this.listNotransaksiPerNoRM = data.assesment_kebidanan;

          console.log(this.listNotransaksiPerNoRM)
        } else {
            this.toastr.error(data.message, 'Error');
        }
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }

  tambahTanggalTiba(type: string, event: MatDatepickerInputEvent<Date>) {
    // console.log(moment(event.value).format('yyyy-MM-DD'));
    this.tanggal_tiba = moment(event.value).format('yyyy-MM-DD');
  }

  tambahTanggalAssesment(type: string, event: MatDatepickerInputEvent<Date>) {
    // console.log(moment(event.value).format('yyyy-MM-DD'));
    this.tanggal_assesment = moment(event.value).format('yyyy-MM-DD');
  }

  pasangNilaiCaraMasuk(){
    // console.log(this.cara_masuk);
    if(this.cara_masuk == 'Lainnya'){
      this.hiddenCaraMasuk = false;
    } else {
      this.hiddenCaraMasuk = true;
    }
  }

  pasangNilaiAsalMasuk(){
    // console.log(this.asal_masuk);
    if(this.asal_masuk == 'Lainnya'){
      this.hiddenAsalMasuk = false;
    } else {
      this.hiddenAsalMasuk = true;
    }
  }

  pasangNilaiDikirimOleh(){
    // console.log(this.dikirim_oleh);
    if(this.dikirim_oleh == 'Lainnya'){
      this.hiddenDikirimOleh = false;
    } else {
      this.hiddenDikirimOleh = true;
    }
  }

  pasangNilaiRiwayatPenyakitDiderita(){
    // console.log(this.riwayat_penyakit_diderita);
    if(this.riwayat_penyakit_diderita == 'Ada'){
      this.hiddenJenisRiwayatPenyakitDiderita = false;
    } else {
      this.hiddenJenisRiwayatPenyakitDiderita = true;
    }
  }

  pasangNilaiRiwayatPengobatanSaatDirumah(){
    // console.log(this.riwayat_pengobatan_saat_dirumah);
    if(this.riwayat_pengobatan_saat_dirumah == 'Ada'){
      this.hiddenRiwayatPengobatanSaatDirumah = false;
    } else {
      this.hiddenRiwayatPengobatanSaatDirumah = true;
    }
  }


  // Function Modal Riwayat Pengobatan
  simpanRiwayatPengobatan(){
    let body = {
      "no_rm" : this.no_rm,
      "no_transaksi":this.no_transaksi,
      "obat":this.obat,
      "dosis":this.dosis,
      "cara_pemberian":this.cara_pemberian,
      "frekuensi":this.frekuensi,
      "waktu":this.waktu
    };

    if(this.obat == '' || this.dosis == '' || this.cara_pemberian == '' || this.frekuensi == '' || this.waktu == ''){
      this.toastr.error('Form Belum Terisi Semua ', 'Error', {
        timeOut: 2000,
      });                
    } else {
      this.kebidananService.simpanRiwayatPengobatan(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Data Riwayat Pengobatan sudah dibuat', 'Sukses', {
              timeOut: 2000,
            });              
            this.obat = '';  
            this.dosis = '';  
            this.cara_pemberian = '';  
            this.frekuensi = '';  
            this.waktu = '';  
  
            this.ambilDataRiwayatObat();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
      this.modalService.dismissAll();
    }

  }
  
  openModalRiwayatPengobatan(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-riwayat-pengobatan'}).result.then((result) => {
      this.closeResultModalRiwayatPengobatan = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModalRiwayatPengobatan = `Dismissed ${this.getDismissReasonModalRiwayatPengobatan(reason)}`;
    });
  }

  private getDismissReasonModalRiwayatPengobatan(reason: any): string {
    this.nilaiDefaultModalRiwayatPengobatan();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  nilaiDefaultModalRiwayatPengobatan(){
    this.obat = '';
    this.dosis = '';
    this.cara_pemberian = '';
    this.frekuensi = '';
    this.waktu = '';
  }

  openModalHapusRiwayatPengobatan(content, id) {
    this.id_hapus_riwayat_pengobatan = id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-hapus-riwayat-pengobatan'}).result.then((result) => {
      this.closeResultModalHapusRiwayatPengobatan = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModalHapusRiwayatPengobatan = `Dismissed ${this.getDismissReasonModalHapusRiwayatPengobatan(reason)}`;
    });
  }

  private getDismissReasonModalHapusRiwayatPengobatan(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  hapusRiwayatPengobatan(id:any){
    this.kebidananService.hapusRiwayatPengobatan(id).subscribe(
      (data: any) => {
        //  console.log(data);
        if(data.success == true){
          this.toastr.success('Riwayat pengobatan sudah dihapus', 'Sukses', {
            timeOut: 2000,
          });                
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
            this.toastr.error(data.message, 'Error');
        }
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );

  }

  batalHapusRiwayatPengobatan(){
    this.id_hapus_riwayat_pengobatan = '';
    this.modalService.dismissAll();
  }

  periksaGolonganDarahIbu(){
    if(this.regexGolonganDarahIbu.invalid){
      this.toastr.error('Harap isi golongan darah menggunakan karakter', 'Error', {
        timeOut: 2000,
      });                
      this.golongan_darah_ibu = '';
    }
  }

  periksaGolonganDarahSuami(){
    if(this.regexGolonganDarahSuami.invalid){
      this.toastr.error('Harap isi golongan darah menggunakan karakter', 'Error', {
        timeOut: 2000,
      });                
      this.golongan_darah_suami = '';
    }
  }

  // Function Riwayat Kehamilan
  simpanRiwayatKehamilan(){
    let body = {
      "no_rm" : this.no_rm,
      "no_transaksi":this.no_transaksi,
      "jenis_kelamin":this.jenis_kelamin,
      "umur_anak":this.umur_anak,
      "ku_anak":this.ku_anak,
      "bbi_gram":this.bbi_gram,
      "riwayat_persalinan":this.riwayat_kehamilan,
      "ditolong_oleh":this.ditolong_oleh
    };
    // console.log(body);

    if(this.jenis_kelamin == '' || this.umur_anak == '' || this.ku_anak == '' || this.bbi_gram == '' || this.riwayat_kehamilan == ''
    || this.ditolong_oleh == ''){
      this.toastr.error('Form Belum Terisi Semua ', 'Error', {
        timeOut: 2000,
      });                
    } else {
      this.kebidananService.simpanRiwayatKehamilan(body).subscribe(
        (data: any) => {
          //  console.log(data);
          if(data.success == true){
            this.toastr.success('Data Riwayat Kehamilan sudah dibuat', 'Sukses', {
              timeOut: 2000,
            });              
            this.jenis_kelamin = '';  
            this.umur_anak = '';  
            this.ku_anak = '';  
            this.bbi_gram = '';  
            this.riwayat_kehamilan = '';  
            this.ditolong_oleh = '';  
            this.ambilDataKebidanan();
          } else {
              this.toastr.error(data.message, 'Error');
          }
        },(error: any) => {
          this.toastr.error(error.error.message, 'Error');
        }
      );
      this.modalService.dismissAll();
    }
  }
  
  openModalRiwayatKehamilan(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-riwayat-kehamilan'}).result.then((result) => {
      this.closeResultModalRiwayatKehamilan = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModalRiwayatKehamilan = `Dismissed ${this.getDismissReasonModalRiwayatKehamilan(reason)}`;
    });
  }

  private getDismissReasonModalRiwayatKehamilan(reason: any): string {
    this.nilaiDefaultModalRiwayatKehamilan();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  nilaiDefaultModalRiwayatKehamilan(){
    this.jenis_kelamin = '';
    this.umur_anak = '';
    this.ku_anak = '';
    this.bbi_gram = '';
    this.riwayat_kehamilan = '';
    this.riwayat_sc = '';
    this.ditolong_oleh = '';
  }
  
  openModalHapusRiwayatKehamilan(content, id) {
    this.id_hapus_riwayat_kehamilan = id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-hapus-riwayat-kehamilan'}).result.then((result) => {
      this.closeResultModalHapusRiwayatKehamilan = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModalHapusRiwayatKehamilan = `Dismissed ${this.getDismissReasonModalHapusRiwayatKehamilan(reason)}`;
    });
  }

  private getDismissReasonModalHapusRiwayatKehamilan(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  hapusRiwayatKehamilan(id:any){
    this.kebidananService.hapusRiwayatKehamilan(id).subscribe(
      (data: any) => {
        //  console.log(data);
        if(data.success == true){
          this.toastr.success('Riwayat kehamilan sudah dihapus', 'Sukses', {
            timeOut: 2000,
          });                
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
            this.toastr.error(data.message, 'Error');
        }
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );

  }

  batalHapusRiwayatKehamilan(){
    this.id_hapus_riwayat_kehamilan = '';
    this.modalService.dismissAll();
  }

  pasangAssesmentInformasi(nilai){
    // console.log("Pasang Assesment Informasi");
    this.tanggal_tiba = nilai.tanggal_tiba;
    this.tanggal_assesment = nilai.tanggal_assesment;
    this.cara_masuk = nilai.cara_masuk;
    this.cara_masuk_lainnya = nilai.cara_masuk_lainnya;
    this.asal_masuk = nilai.asal_masuk;
    this.asal_masuk_lainnya = nilai.asal_masuk_lainnya;
    this.dikirim_oleh = nilai.dikirim_oleh;
    this.dikirim_oleh_lainnya = nilai.dikirim_oleh_lainnya;

    // Pasang Nilai Button
    this.pasangNilaiCaraMasuk();
    this.pasangNilaiAsalMasuk();
    this.pasangNilaiDikirimOleh();
  }

  pasangDataKehamilan(nilai){
    // console.log("Pasang Data Kehamilan");
    this.gravida = nilai.gravia;
    this.para = nilai.para;
    this.abortus = nilai.abortus;
    this.hamil = nilai.hamil;
    this.hpht = nilai.hpht;
    this.hpl = nilai.hpl;
    this.keluhan_yang_dirasakan = nilai.keluhan_yang_dirasakan;
    this.riwayat_anc = nilai.riwayat_anc;
    this.gerakan_janin = nilai.gerakan_janin;
    this.tinggi_fudus_uteri = nilai.tinggi_fudus_uteri;
    this.taksiran_berat_janin = nilai.taksiran_berat_janin;
    this.palpasi_leopold_1_fundus_teraba = nilai.palpasi_leopold_1_fundus_teraba;
    this.palpasi_leopold_2_kanan_teraba = nilai.palpasi_leopold_2_kanan_teraba;
    this.palpasi_leopold_2_kiri_teraba = nilai.palpasi_leopold_2_kiri_teraba;
    this.palpasi_leopold_3_bawah_teraba = nilai.palpasi_leopold_3_bawah_teraba;
    this.palpasi_leopold_4_penurunan_teraba = nilai.palpasi_leopold_4_penurunan_teraba;
    this.djj = nilai.djj;
    this.djj_per_menit = nilai.djj_per_menit;
    this.his = nilai.his;
    this.vt = nilai.vt;
    this.kesimpulan_janin = nilai.kesimpulan_janin;
    this.lainnya_kesimpulan_janin = nilai.lainnya_kesimpulan_janin;
    this.kesimpulan_letak = nilai.kesimpulan_letak;
    this.lainnya_letak_janin = nilai.lainnya_letak_janin;
    this.kesimpulan_presentasi = nilai.kesimpulan_presentasi;
    this.lainnya_presentasi_janin = nilai.lainnya_presentasi_janin;

  }

  pasangEliminasiAssesment(nilai){
    // console.log("Pasang Eliminasi Assesment");
    this.buang_air_besar = nilai.buang_air_besar;
    this.penjelasan_buang_air_besar = nilai.penjelasan_buang_air_besar;
    this.buang_air_kecil = nilai.buang_air_kecil;
    this.keterangan = nilai.keterangan;
    
  }

  pasangMasalahDiagnosisAssesment(nilai){
    // console.log("Pasang Masalah Diagnosis Assesment");
    this.nyeri = nilai.nyeri;
    this.cemas = nilai.cemas;
    this.perubahan_nutrisi = nilai.perubahan_nutrisi;
    this.resiko_perdarahan = nilai.resiko_perdarahan;
    this.eliminasi = nilai.eliminasi;
    this.kurang_pengetahuan_persalinan = nilai.kurang_pengetahuan_persalinan;
    this.detail_lain_lain = nilai.detail_lain_lain;
    this.diagnosa_kebidanan = nilai.diagnosa_kebidanan;
    this.rencana = nilai.rencana;
    
  }

  pasangSosialBudaya(nilai){
    // console.log("Pasang Sosial Budaya");
    this.pendidikan_terakhir_ibu = nilai.pendidikan_terakhir_ibu;
    this.pendidikan_terakhir_ayah = nilai.pendidikan_terakhir_ayah;
    this.pekerjaan = nilai.pekerjaan;
    this.pekerjaan_lainnya = nilai.pekerjaan_lainnya;
    this.tinggal_bersama = nilai.tinggal_bersama;
    this.tinggal_bersama_lainnya = nilai.tinggal_bersama_lainnya;
    this.membantu_merawat_dirumah = nilai.membantu_merawat_dirumah;
    this.bantuan_mandi = nilai.bantuan_mandi;
    this.bantuan_berjalan = nilai.bantuan_berjalan;
    this.bantuan_bab_bak = nilai.bantuan_bab_bak;
    this.bantuan_rawat_luka = nilai.bantuan_rawat_luka;
    this.bantuan_makan = nilai.bantuan_makan;
    this.bantuan_pemberian_obat = nilai.bantuan_pemberian_obat;

  }

  pasangRiwayatObsetri(nilai){
    // console.log("Pasang Riwayat Obsetri");
    this.menarche_umur = nilai.menarche_umur;
    this.menstruasi = nilai.menstruasi;
    this.siklus_menstruasi = nilai.siklus_menstruasi;
    this.sakit_saat_menstruasi = nilai.sakit_saat_menstruasi;
    this.alasan_sakit_saat_menstruasi = nilai.alasan_sakit_saat_menstruasi;
    this.menikah_yang_ke = nilai.menikah_yang_ke;
    this.lama_pernikahan = nilai.lama_pernikahan;
    this.kontrasepsi_yang_pernah_digunakan = nilai.kontrasepsi_yang_pernah_digunakan;
    this.lama_pemakaian = nilai.lama_pemakaian;
    
  }

  pasangRiwayatKesehatan(nilai){
    // console.log("Pasang Riwayat Kesehatan");
    this.riwayat_penyakit_diderita = nilai.riwayat_penyakit_diderita;
    this.riwayat_pengobatan_saat_dirumah = nilai.riwayat_pengobatan_saat_dirumah;
    this.jenis_riwayat_penyakit_diderita = nilai.jenis_riwayat_penyakit_diderita;
    this.uraian_penyakit_yang_diderita = nilai.uraian_penyakit_yang_diderita;
    this.operasi_yang_pernah_dilakukan = nilai.operasi_yang_pernah_dilakukan;
    this.riwayat_transfusi_darah = nilai.riwayat_transfusi_darah;
    this.alasan_riwayat_transfusi_darah = nilai.alasan_riwayat_transfusi_darah;
    this.golongan_darah_ibu = nilai.golongan_darah_ibu;
    this.golongan_darah_rhesus_ibu = nilai.golongan_darah_rhesus_ibu;
    this.golongan_darah_suami = nilai.golongan_darah_suami;
    this.golongan_darah_rhesus_suami = nilai.golongan_darah_rhesus_suami;
    this.bersedia_transfusi_darah = nilai.bersedia_transfusi_darah;
    this.alasan_bersedia_transfusi_darah = nilai.alasan_bersedia_transfusi_darah;
    this.reaksi_alergi_transfusi = nilai.reaksi_alergi_transfusi;
    this.alasan_reaksi_alergi_transfusi = nilai.alasan_reaksi_alergi_transfusi;
    this.budaya_menolak_transfusi_darah = nilai.budaya_menolak_transfusi_darah;
    this.faktor_keturunan_gemeli = nilai.faktor_keturunan_gemeli;
    this.rw_penyakit_herediter = nilai.rw_penyakit_herediter;
    this.alasan_rw_penyakit_herediter = nilai.alasan_rw_penyakit_herediter;
    this.rw_keluarga_saat_ini = nilai.rw_keluarga_saat_ini;
    this.pasangNilaiRiwayatPenyakitDiderita();
    this.pasangNilaiRiwayatPengobatanSaatDirumah();
  }

  pasangPemeriksaanFisik(nilai){
    // console.log("Pasang Pemeriksaan Fisik");
    this.kondisi_umum = nilai.kondisi_umum;
    this.kesadaran_gcs = nilai.kesadaran_gcs;
    this.kesadaran_e = nilai.kesadaran_e;
    this.kesadaran_m = nilai.kesadaran_m;
    this.kesadaran_v = nilai.kesadaran_v;
    this.tekanan_darah = nilai.tekanan_darah;
    this.suhu = nilai.suhu;
    this.tinggi_badan = nilai.tinggi_badan;
    this.nadi = nilai.nadi;
    this.nadi_menit = nilai.nadi_menit;
    this.pernapasan = nilai.pernapasan;
    this.pernapasan_menit = nilai.pernapasan_menit;
    this.berat_badan = nilai.berat_badan;
    this.kepala = nilai.kepala;
    this.detail_kepala = nilai.detail_kepala;
    this.mata = nilai.mata;
    this.detail_mata = nilai.detail_mata;
    this.tht = nilai.tht;
    this.detail_tht = nilai.detail_tht;
    this.leher = nilai.leher;
    this.detail_leher = nilai.detail_leher;
    this.mulut = nilai.mulut;
    this.detail_mulut = nilai.detail_mulut;
    this.payudara = nilai.payudara;
    this.detail_payudara = nilai.detail_payudara;
    this.jantung = nilai.jantung;
    this.detail_jantung = nilai.detail_jantung;
    this.pulmo = nilai.pulmo;
    this.detail_pulmo = nilai.detail_pulmo;
    this.abdomen = nilai.abdomen;
    this.detail_abdomen = nilai.detail_abdomen;
    this.kulit = nilai.kulit;
    this.detail_kulit = nilai.detail_kulit;
    this.tulang_belakang = nilai.tulang_belakang;
    this.detail_tulang_belakang = nilai.detail_tulang_belakang;
    this.sistem_syaraf = nilai.sistem_syaraf;
    this.detail_sistem_syaraf = nilai.detail_sistem_syaraf;
    this.genitalia_anus_rectum = nilai.genitalia_anus_rectum;
    this.detail_genitalia_anus_rectum = nilai.detail_genitalia_anus_rectum;
    this.pasangNilaiGCS();

  }

  pasangPengkajianNyeri(nilai){
    // console.log("Pasang Pengkajian Nyeri");
    this.pengkajian_nyeri = nilai.pengkajian_nyeri;
    this.nyeri_mempengaruhi = nilai.nyeri_mempengaruhi;
    
  }

  pasangNutrisiAssesment(nilai){
    // console.log("Pasang Nutrisi Assesment");
    this.perubahan_berat_badan = nilai.perubahan_berat_badan;
    this.penjelasan_perubahan_berat_badan = nilai.penjelasan_perubahan_berat_badan;
    this.diet_khusus = nilai.diet_khusus;
    this.penjelasan_diet_khusus = nilai.penjelasan_diet_khusus;
    this.nafsu_makan = nilai.nafsu_makan;
    this.penjelasan_nafsu_makan = nilai.penjelasan_nafsu_makan;
    
  }

  pasangAktifitasDanIstirahat(nilai){
    this.aktivitas_dan_istirahat = nilai.aktivitas_dan_istirahat;
  }

  pasangStatusMental(nilai){
    this.status_mental = nilai.status_mental;
  }

  pasangDataPsikosial(nilai){
    this.respon_emosi =  nilai.respon_emosi;
    this.support_keluarga = nilai.support_keluarga;
  }

  pasangCheckBoxArrayNyeri(nilai){
    console.log("Nilai Array Nyeri");
    console.log(nilai);
    // this.arrayNyeri = ';Nyeri;Cemas;Perubahan Nutrisi;Resiko Perdarahan;Eliminasi;Kurang Pengetahuan Persalinan;Lainnya';
    this.arrayNyeri = nilai.nyeri;
    let arrayData = this.arrayNyeri.split(';');
    arrayData.forEach((element, index)=> {
      if(element == 'Nyeri'){
        this.nyeri = true;
      } else if(element == 'Cemas') {
        this.cemas = true;
      } else if(element == 'Perubahan Nutrisi') {
        this.perubahan_nutrisi = true;
      } else if(element == 'Resiko Perdarahan') {
        this.resiko_perdarahan = true;
      } else if(element == 'Eliminasi') {
        this.eliminasi = true;
      } else if(element == 'Kurang Pengetahuan Persalinan') {
        this.kurang_pengetahuan_persalinan = true;
      } else if(element == 'Lainnya') {
        this.lain_lain = true;
        this.disabledLainLain = false;
      }
    });
  }

  pasangDisabledDetailLainLain(){
    if(this.lain_lain == true){
      this.disabledLainLain = false;
    } else {
      this.disabledLainLain = true;
    }
  }

  pasangDisabledRiwayatTransfusiDarah(){
    if(this.riwayat_transfusi_darah == 'Pernah Indikasi Waktunya'){
      this.disabledRiwayatTransfusiDarah = false;
    } else {
      this.alasan_riwayat_transfusi_darah = '';
      this.disabledRiwayatTransfusiDarah = true;
    }
  }

  pasangDisabledBersediaTransfusiDarah(){
    if(this.bersedia_transfusi_darah == 'Tidak'){
      this.disabledBersediaTransfusiDarah = false;
    } else {
      this.alasan_bersedia_transfusi_darah = '';
      this.disabledBersediaTransfusiDarah = true;
    }
  }

  pasangDisabledReaksiAlergiTransfusi(){
    if(this.reaksi_alergi_transfusi == 'Ya'){
      this.disabledReaksiAlergiTransfusi = false;
    } else {
      this.alasan_reaksi_alergi_transfusi = '';
      this.disabledReaksiAlergiTransfusi = true;
    }
  }

  pasangDisabledRWPenyakitHerediter(){
    if(this.rw_penyakit_herediter == 'Ya'){
      this.disabledRWPenyakitHerediter = false;
    } else {
      this.alasan_rw_penyakit_herediter = '';
      this.disabledRWPenyakitHerediter = true;
    }
  }

  pasangDisabledSakitSaatMenstruasi(){
    if(this.sakit_saat_menstruasi == 'Ya'){
      this.disabledSakitSaatMenstruasi = false;
    } else {
      this.alasan_sakit_saat_menstruasi = '';
      this.disabledSakitSaatMenstruasi = true;
    }
  }

  pasangDisabledKesimpulanJanin(){
    if(this.kesimpulan_janin == 'Lainnya'){
      this.disabledKesimpulanJanin = false;
    } else {
      this.lainnya_kesimpulan_janin = '';
      this.disabledKesimpulanJanin = true;
    }
  }

  pasangDisabledLetak(){
    if(this.kesimpulan_letak == 'Lainnya'){
      this.disabledLetak = false;
    } else {
      this.lainnya_letak_janin = '';
      this.disabledLetak = true;
    }
  }

  pasangDisabledPresentasi(){
    if(this.kesimpulan_presentasi == 'Lainnya'){
      this.disabledPresentasi = false;
    } else {
      this.lainnya_presentasi_janin = '';
      this.disabledPresentasi = true;
    }
  }

  pasangDisabledKepala(){
    if(this.kepala == 'Kelainan'){
      this.disabledKepala = false;
    } else {
      this.detail_kepala = '';
      this.disabledKepala = true;
    }
  }

  pasangDisabledMata(){
    if(this.mata == 'Kelainan'){
      this.disabledMata = false;
    } else {
      this.detail_mata = '';
      this.disabledMata = true;
    }
  }

  pasangDisabledTHT(){
    if(this.tht == 'Kelainan'){
      this.disabledTHT = false;
    } else {
      this.detail_tht = '';
      this.disabledTHT = true;
    }
  }

  pasangDisabledLeher(){
    if(this.leher == 'Kelainan'){
      this.disabledLeher = false;
    } else {
      this.detail_leher = '';
      this.disabledLeher = true;
    }
  }

  pasangDisabledMulut(){
    if(this.mulut == 'Kelainan'){
      this.disabledMulut = false;
    } else {
      this.detail_mulut = '';
      this.disabledMulut = true;
    }
  }

  pasangDisabledPayudara(){
    if(this.payudara == 'Kelainan'){
      this.disabledPayudara = false;
    } else {
      this.detail_payudara = '';
      this.disabledPayudara = true;
    }
  }

  pasangDisabledJantung(){
    if(this.jantung == 'Kelainan'){
      this.disabledJantung = false;
    } else {
      this.detail_jantung = '';
      this.disabledJantung = true;
    }
  }

  pasangDisabledPulmo(){
    if(this.pulmo == 'Kelainan'){
      this.disabledPulmo = false;
    } else {
      this.detail_pulmo = '';
      this.disabledPulmo = true;
    }
  }

  pasangDisabledAbdomen(){
    if(this.abdomen == 'Kelainan'){
      this.disabledAbdomen = false;
    } else {
      this.detail_abdomen = '';
      this.disabledAbdomen = true;
    }
  }

  pasangDisabledKulit(){
    if(this.kulit == 'Kelainan'){
      this.disabledKulit = false;
    } else {
      this.detail_kulit = '';
      this.disabledKulit = true;
    }
  }

  pasangDisabledTulangBelakang(){
    if(this.tulang_belakang == 'Kelainan'){
      this.disabledTulangBelakang = false;
    } else {
      this.detail_tulang_belakang = '';
      this.disabledTulangBelakang = true;
    }
  }

  pasangDisabledSistemSyaraf(){
    if(this.sistem_syaraf == 'Kelainan'){
      this.disabledSistemSyaraf = false;
    } else {
      this.detail_sistem_syaraf = '';
      this.disabledSistemSyaraf = true;
    }
  }

  pasangDisabledGenitalia(){
    if(this.genitalia_anus_rectum == 'Kelainan'){
      this.disabledGenitalia = false;
    } else {
      this.detail_genitalia_anus_rectum = '';
      this.disabledGenitalia = true;
    }
  }

  pasangDisabledPerubahanBeratBadan(){
    if(this.perubahan_berat_badan == 'Penurunan' || this.perubahan_berat_badan == 'Kenaikan'){
      this.disabledPerubahanBeratBadan = false;
    } else {
      this.penjelasan_perubahan_berat_badan = '';
      this.disabledPerubahanBeratBadan = true;
    }
  }

  pasangDisabledDietKhusus(){
    if(this.diet_khusus == 'Ada'){
      this.disabledDietKhusus = false;
    } else {
      this.penjelasan_diet_khusus = '';
      this.disabledDietKhusus = true;
    }
    
  }

  pasangDisabledNafsuMakan(){
    if(this.nafsu_makan == 'Kurang' || this.nafsu_makan == 'Tidak Ada' ){
      this.disabledNafsuMakan = false;
    } else {
      this.penjelasan_nafsu_makan = '';
      this.disabledNafsuMakan = true;
    }
    
  }

  pasangDisabledBuangAirBesar(){
    if(this.buang_air_besar == 'Konstipasi' || this.buang_air_besar == 'Diare' || this.buang_air_besar == 'Lainnya'){
      this.disabledBuangAirBesar = false;
    } else {
      this.penjelasan_buang_air_besar = '';
      this.disabledBuangAirBesar = true;
    }
    
  }

  pasangDisabledPekerjaan(){
    if(this.pekerjaan == 'Lainnya'){
      this.disabledPekerjaan = false;
    } else {
      this.pekerjaan_lainnya = '';
      this.disabledPekerjaan = true;
    }
  }

  pasangDisabledTinggalBersama(){
    if(this.tinggal_bersama == 'Lainnya'){
      this.disabledTinggalBersama = false;
    } else {
      this.tinggal_bersama_lainnya = '';
      this.disabledTinggalBersama = true;
    }
  }

  pasangNilaiNyeri(){
    if(this.nyeri == true){
      this.arrayNyeri = this.arrayNyeri + ';' + 'Nyeri';
    } else {
      let arrayData = this.arrayNyeri.split(';');
      arrayData.forEach((element, index)=> {
        if(element == ''){
          delete arrayData[index]
        } else if(element == 'Nyeri') {
          delete arrayData[index]
        }
      });

      this.arrayNyeri = '';
      arrayData.forEach((element, index)=>{
        if(element == this.arrayNyeri){
          delete arrayData[index]
        }
        this.arrayNyeri = this.arrayNyeri + ';' + element;
      });
      this.arrayNyeri.replace(';;', ';');
    }
    console.log(this.arrayNyeri);
  }

  pasangNilaiCemas(){
    if(this.cemas == true){
      this.arrayNyeri = this.arrayNyeri + ';' + 'Cemas';
    } else {
      let arrayData = this.arrayNyeri.split(';');
      arrayData.forEach((element, index)=> {
        if(element == ''){
          delete arrayData[index]
        } else if(element == 'Cemas') {
          delete arrayData[index]
        }
      });

      this.arrayNyeri = '';
      arrayData.forEach((element, index)=>{
        if(element == this.arrayNyeri){
          delete arrayData[index]
        }
        this.arrayNyeri = this.arrayNyeri + ';' + element;
      });
      this.arrayNyeri.replace(';;', ';');
    }

    console.log(this.arrayNyeri);

  }

  pasangPerubahanNutrisi(){
    if(this.perubahan_nutrisi == true){
      this.arrayNyeri = this.arrayNyeri + ';' + 'Perubahan Nutrisi';
    } else {
      let arrayData = this.arrayNyeri.split(';');
      arrayData.forEach((element, index)=> {
        if(element == ''){
          delete arrayData[index]
        } else if(element == 'Perubahan Nutrisi') {
          delete arrayData[index]
        }
      });

      this.arrayNyeri = '';
      arrayData.forEach((element, index)=>{
        if(element == this.arrayNyeri){
          delete arrayData[index]
        }
        this.arrayNyeri = this.arrayNyeri + ';' + element;
      });
      this.arrayNyeri.replace(';;', ';');
    }

    console.log(this.arrayNyeri);

  }

  pasangResikoPerdarahan(){
    if(this.resiko_perdarahan == true){
      this.arrayNyeri = this.arrayNyeri + ';' + 'Resiko Perdarahan';
    } else {
      let arrayData = this.arrayNyeri.split(';');
      arrayData.forEach((element, index)=> {
        if(element == ''){
          delete arrayData[index]
        } else if(element == 'Resiko Perdarahan') {
          delete arrayData[index]
        }
      });

      this.arrayNyeri = '';
      arrayData.forEach((element, index)=>{
        if(element == this.arrayNyeri){
          delete arrayData[index]
        }
        this.arrayNyeri = this.arrayNyeri + ';' + element;
      });
      this.arrayNyeri.replace(';;', ';');
    }
    
    console.log(this.arrayNyeri);

  }

  pasangEliminasi(){
    if(this.eliminasi == true){
      this.arrayNyeri = this.arrayNyeri + ';' + 'Eliminasi';
    } else {
      let arrayData = this.arrayNyeri.split(';');
      arrayData.forEach((element, index)=> {
        if(element == ''){
          delete arrayData[index]
        } else if(element == 'Eliminasi') {
          delete arrayData[index]
        }
      });

      this.arrayNyeri = '';
      arrayData.forEach((element, index)=>{
        if(element == this.arrayNyeri){
          delete arrayData[index]
        }
        this.arrayNyeri = this.arrayNyeri + ';' + element;
      });
      this.arrayNyeri.replace(';;', ';');
    }
    console.log(this.arrayNyeri);

  }

  pasangKurangPengetahuanPersalinan(){
    if(this.kurang_pengetahuan_persalinan == true){
      this.arrayNyeri = this.arrayNyeri + ';' + 'Kurang Pengetahuan Persalinan'
    } else {
      let arrayData = this.arrayNyeri.split(';');
      arrayData.forEach((element, index)=> {
        if(element == ''){
          delete arrayData[index]
        } else if(element == 'Kurang Pengetahuan Persalinan') {
          delete arrayData[index]
        }
      });

      this.arrayNyeri = '';
      arrayData.forEach((element, index)=>{
        if(element == this.arrayNyeri){
          delete arrayData[index]
        }
        this.arrayNyeri = this.arrayNyeri + ';' + element;
      });
      this.arrayNyeri.replace(';;', ';');
    }
    console.log(this.arrayNyeri);

  }
  
  pasangDaftarMasalahKebidananLainnya(){
    if(this.lain_lain == true){
      this.arrayNyeri = this.arrayNyeri + ';' + 'Lainnya';
    } else {
      let arrayData = this.arrayNyeri.split(';');
      arrayData.forEach((element, index)=> {
        if(element == ''){
          delete arrayData[index]
        } else if(element == 'Lainnya') {
          delete arrayData[index]
        }
      });

      this.arrayNyeri = '';
      arrayData.forEach((element, index)=>{
        if(element == this.arrayNyeri){
          delete arrayData[index]
        }
        this.arrayNyeri = this.arrayNyeri + ';' + element;
      });
      this.arrayNyeri.replace(';;', ';');
    }
    console.log(this.arrayNyeri);

  }

  pasangDJJ(){
    if(this.djj == ''){
      this.djj_per_menit = '';
      this.disabledDJJ = true;
    } else {
      this.disabledDJJ = false;
    }
  }

  pasangNadi(){
    if(this.nadi == ''){
      this.nadi_menit = '';
      this.disabledNadi = true;
    } else {
      this.disabledNadi = false;
    }
  }

  periksaAngkaNadi(){
    if(isNaN(Number(this.nadi_menit))){
      this.toastr.error('Anda Harus Memasukkan Angka', 'Error', {
        timeOut: 2000,
      });                
      this.nadi_menit = '';
    }
  }

  pasangPernafasan(){
    if(this.pernapasan == ''){
      this.pernapasan_menit = '';
      this.disabledPernapasan = true;
    } else {
      this.disabledPernapasan = false;
    }
  }
  
  periksaAngkaPernafasan(){
    if(isNaN(Number(this.pernapasan_menit))){
      this.toastr.error('Anda Harus Memasukkan Angka', 'Error', {
        timeOut: 2000,
      });                
      this.pernapasan_menit = '';
    }
  }

  periksaAngkaSiklusMenstruasi(){
    if(isNaN(Number(this.siklus_menstruasi))){
      this.toastr.error('Anda Harus Memasukkan Angka', 'Error', {
        timeOut: 2000,
      });                
      this.siklus_menstruasi = '';
    }
  }

  periksaAngkaHamil(){
    if(isNaN(Number(this.hamil))){
      this.toastr.error('Anda Harus Memasukkan Angka', 'Error', {
        timeOut: 2000,
      });                
      this.hamil = '';
    }
  }

  periksaAngkaHPHT(){
    if(isNaN(Number(this.hpht))){
      this.toastr.error('Anda Harus Memasukkan Angka', 'Error', {
        timeOut: 2000,
      });                
      this.hpht = '';
    }
  }

  periksaAngkaHPL(){
    if(isNaN(Number(this.hpl))){
      this.toastr.error('Anda Harus Memasukkan Angka', 'Error', {
        timeOut: 2000,
      });                
      this.hpl = '';
    }
  }

  pasangAngkaDJJ(){
    if(isNaN(Number(this.djj_per_menit))){
      this.toastr.error('Anda Harus Memasukkan Angka', 'Error', {
        timeOut: 2000,
      });                
      this.djj_per_menit = '';
    }

  }

  pasangNilaiGCS(){
    this.kesadaran_gcs = Number(this.kesadaran_e) + Number(this.kesadaran_m) + Number(this.kesadaran_v);
  }
  
  pasangLamaKontrasepsi(){
    if(this.kontrasepsi_yang_pernah_digunakan == ''){
      this.disabledLamaKontrasepsi = true;
    } else {
      this.disabledLamaKontrasepsi = false;
    }
  }


  


}
