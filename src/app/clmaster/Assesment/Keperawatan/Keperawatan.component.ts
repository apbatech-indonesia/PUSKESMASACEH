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

import { KeperawatanService } from './Service/Keperawatan.service';
import { KepUGDService } from '../../UGD/KeperawatanUGD/Service/kep-ugd.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

import * as moment from 'moment';
import { L } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-Keperawatan',
  templateUrl: './Keperawatan.component.html',
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
export class KeperawatanComponent implements OnInit {
  heading = 'Asesment Keperawatan';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  // Validasi file Create / Update
  validasiCreateUpdate = '';

  // Icon
  faCheck = faCheck;
  faTrash = faTrash;
  faWindowClose = faWindowClose;

  asesmentKeperawatan: any = [];
  // Session
  username:any;
  // Main Data Input
  no_rm:any;
  no_transaksi:any;

  listNotransaksiPerNoRM:any;
  // Alasan masuk RS
  alasan:any='';

  // Riwayat kesehatan
  pernah_dirawat:string='';
  tahun_bulan_pernah_dirawat:string='';
  lokasi_pernah_dirawat:string='';
  dilakukan_tindakan_operatif:string='';
  jenis_tindakan_operasi:string='';
  riwayat_penyakit_keluarga:string='';
  nama_penderita:string='';
  penyakit_lainnya:string='';

  // Pemeriksaan Fisik
  td:string='';
  nadi:string='';
  rr:string='';
  suhu:string='';
  bb:string='';
  tb:string='';


  gcs:number=0;
  mata:string='';
  motorik:string='';
  verbal:string='';
  keadaan_umum:string='';
  keadaan_umum_lainnya:string='';
  kepala:string='';
  kepala_lainnya:string='';
  mulut:string='';
  mulut_lainnya:string='';
  gigi:string='';
  leher:string='';
  respirasi:string='';
  respirasi_lainnya:string='';
  jantung:string='';
  jantung_lainnya:string='';
  keluhan:string='';
  keluhan_lainnya:string='';
  abdomen:string='';
  abdomen_lainnya:string='';
  mual:string='';
  muntah:string='';
  defekasi:string='';
  defekasi_lainnya:string='';
  pembatasan_makanan:string='';
  pendengaran:string='';
  pendengaran_abnormal:string='';
  penglihatan:string='';
  penglihatan_abnormal:string='';
  bak:string='';
  bak_abnormal:string='';
  bab:string='';
  bab_abnormal:string='';
  uregenitalia:string='';
  uregenitalia_abnormal:string='';
  keadaan_kulit:string='';
  keadaan_kulit_abnormal:string='';
  decubitus:string='';
  terdapat_luka:string='';
  terdapat_lokasi_luka:string='';
  jenis_kelamin:string='';
  masalah_prostat:string='';
  hamil:string='';
  alat_kontrasepsi:string='';
  jenis_alat_kontrasepsi:string='';
  
  // Status fungsional
  aktifitas_dan_mobilisasi:string='';
  berjalan:string='';
  berjalan_lainnya:string='';
  alat_ambulatory:string='';
  alat_ambulatory_lainnya:string='';
  pola_istirahat:string='';
  pola_istirahat_lainnya:string='';
  resiko_jatuh:string='';
  nyeri:string='';
  status_psikologi:string='';
  kecenderungan_bunuh_diri:string='';
  pembimbing_kecenderungan_bunuh_diri:string='';
  status_mental:string='';
  masalah_status_mental:string='';
  butuh_bimbingan_rohani:string='';

  // Status gizi
  intake_nutrisi_lewat:string='';
  intake_nutrisi_lewat_lainnya:string='';
  penurunan_berat_badan:string='';
  keraguan_naik_bb:string='';
  jumlah_turun_berat_badan:string='';
  asupan_makan_berkurang:string='';
  diagnosis_khusus:string='';
  isi_diagnosis_khusus:string='';
  total_status_gizi:number=0;
  
  // Perencanaan pulang pasien
  umur_lebih_65_tahun:string='';
  keterbatasan_mobilitas:string='';
  pengobatan_lanjutan:string='';
  bantuan_aktifitas:string='';
  perencanaan_pulang:string='';

  // Nilai Button
  buttonKeadaanUmumLainnya = true;
  buttonKepalaLainnya = true;
  buttonMulutLainnya = true;
  buttonRespirasiLainnya = true;
  buttonJantungLainnya = true;

  // Nilai Hidden
  hiddenPernahDirawat = true;
  hiddenPernahDioperasi = true;
  hiddenPenyakitKeluarga = true;
  hiddenPenderitaPenyakitKeluarga = true;
  hiddenKeadaanUmum = true;
  hiddenKepala = true;
  hiddenMulut = true;
  hiddenRespirasi = true;
  hiddenJantung = true;
  hiddenKeluhan = true;
  hiddenAbdomen = true;
  hiddenDefekasi = true;
  hiddenPendengaran = true;
  hiddenPenglihatan = true;
  hiddenBAK = true;
  hiddenBAB = true;
  hiddenUregenitalia = true;
  hiddenKeadaanKulit = true;
  hiddenTerdapatLuka = true;
  hiddenMasalahProstat = true;
  hiddenHamil = true;
  hiddenAlatKontrasepsi = true;
  hiddenJenisAlatKontrasepsi = true;
  hiddenBerjalan = true;
  hiddenAlatAmbulatory = true;
  hiddenPolaIstirahat = true;
  hiddenKecenderunganBunuhDiri = true;
  hiddenStatusMental = true;
  hiddenIntakeNutrisiLewatLainnya = true;
  hiddenDiagnosisKhusus = true;
  hiddenPerencaanPulang = true;

  // Disabled
  stringButtonUbahPemeriksaanFisik = 'Ubah';
  disabledPemeriksaanFisik = true;

  perencanaanPulang1 = false;
  perencanaanPulang2 = false;
  perencanaanPulang3 = false;
  perencanaanPulang4 = false;
  perencanaanPulang5 = false;
  perencanaanPulang6 = false;
  perencanaanPulang7 = false;
  
  constructor(
    public http :HttpClient,
    private datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService, 
    private keperawatanService:KeperawatanService,  
    private kepUgdService:KepUGDService, 
    private fb: FormBuilder
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

    // Alasan masuk RS
    alasan: ['',Validators.required],

    // Riwayat kesehatan
    pernah_dirawat: ['',Validators.required],
    tahun_bulan_pernah_dirawat: ['',Validators.required],
    lokasi_pernah_dirawat: ['',Validators.required],
    dilakukan_tindakan_operatif: ['',Validators.required],
    jenis_tindakan_operasi: ['',Validators.required],
    riwayat_penyakit_keluarga: ['',Validators.required],
    nama_penderita: ['',Validators.required],
    penyakit_lainnya: ['',Validators.required],

    // Pemeriksaan Fisik
    td: ['',Validators.required],
    nadi: ['',Validators.required],
    rr: ['',Validators.required],
    suhu: ['',Validators.required],
    bb: ['',Validators.required],
    tb: ['',Validators.required],
    gcs: ['',Validators.required],
    mata: ['',Validators.required],
    motorik: ['',Validators.required],
    verbal: ['',Validators.required],
    keadaan_umum: ['',Validators.required],
    keadaan_umum_lainnya: ['',Validators.required],
    kepala: ['',Validators.required],
    kepala_lainnya: ['',Validators.required],
    mulut: ['',Validators.required],
    mulut_lainnya: ['',Validators.required],
    gigi: ['',Validators.required],
    leher: ['',Validators.required],
    respirasi: ['',Validators.required],
    jantung: ['',Validators.required],
    keluhan: ['',Validators.required],
    keluhan_lainnya: ['',Validators.required],
    abdomen: ['',Validators.required],
    abdomen_lainnya: ['',Validators.required],
    mual: ['',Validators.required],
    muntah: ['',Validators.required],
    defekasi: ['',Validators.required],
    defekasi_lainnya: ['',Validators.required],
    pembatasan_makanan: ['',Validators.required],
    pendengaran: ['',Validators.required],
    pendengaran_abnormal: ['',Validators.required],
    penglihatan: ['',Validators.required],
    penglihatan_abnormal: ['',Validators.required],
    bak: ['',Validators.required],
    bak_abnormal: ['',Validators.required],
    bab: ['',Validators.required],
    bab_abnormal: ['',Validators.required],
    uregenitalia: ['',Validators.required],
    uregenitalia_abnormal: ['',Validators.required],
    keadaan_kulit: ['',Validators.required],
    keadaan_kulit_abnormal: ['',Validators.required],
    decubitus: ['',Validators.required],
    terdapat_luka: ['',Validators.required],
    terdapat_lokasi_luka: ['',Validators.required],
    jenis_kelamin: ['',Validators.required],
    masalah_prostat: ['',Validators.required],
    hamil: ['',Validators.required],
    alat_kontrasepsi: ['',Validators.required],
    jenis_alat_kontrasepsi: ['',Validators.required],
    
    // Perencanaan pulang pasien
    umur_lebih_65_tahun: ['',Validators.required],
    keterbatasan_mobilitas: ['',Validators.required],
    pengobatan_lanjutan: ['',Validators.required],
    bantuan_aktifitas: ['',Validators.required],
    perencanaan_pulang: ['',Validators.required],

    // Status fungsional
    aktifitas_dan_mobilisasi: ['',Validators.required],
    berjalan: ['',Validators.required],
    berjalan_lainnya: ['',Validators.required],
    alat_ambulatory: ['',Validators.required],
    alat_ambulatory_lainnya: ['',Validators.required],
    pola_istirahat: ['',Validators.required],
    pola_istirahat_lainnya: ['',Validators.required],
    resiko_jatuh: ['',Validators.required],
    nyeri: ['',Validators.required],
    status_psikologi: ['',Validators.required],
    kecenderungan_bunuh_diri: ['',Validators.required],
    pembimbing_kecenderungan_bunuh_diri: ['',Validators.required],
    status_mental: ['',Validators.required],
    butuh_bimbingan_rohani: ['',Validators.required],

    // Status gizi
    intake_nutrisi_lewat: ['',Validators.required],
    intake_nutrisi_lewat_lainnya: ['',Validators.required],
    penurunan_berat_badan: ['',Validators.required],
    keraguan_naik_bb: ['',Validators.required],
    jumlah_turun_berat_badan: ['',Validators.required],
    asupan_makan_berkurang: ['',Validators.required],
    diagnosis_khusus: ['',Validators.required],
    isi_diagnosis_khusus: ['',Validators.required],
    total_status_gizi: ['',Validators.required],
    
  });

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.no_rm = localStorage.getItem('noRM');
    this.no_transaksi = localStorage.getItem('noTransaksi');
    this.ambilDataKeperawatan();
    this.ambilSemuaNoTransaksiPerNoRM();
  }

  simpan(){
    let body = {
        // Main Data Input
        "no_rm" : this.no_rm,
        "no_transaksi":this.no_transaksi,
        "username" : this.username,
        
        // Alasan masuk RS
        "alasan":this.alasan,

        // Pemeriksaan Fisik
        "td":this.td,
        "nadi":this.nadi,
        "rr":this.rr,
        "suhu":this.suhu,
        "bb":this.bb,
        "tb":this.tb,
        "gcs":this.gcs,
        "mata":this.mata,
        "motorik":this.motorik,
        "verbal":this.verbal,
        "keadaan_umum":this.keadaan_umum,
        "keadaan_umum_lainnya":this.keadaan_umum_lainnya,
        "kepala":this.kepala,
        "kepala_lainnya":this.kepala_lainnya,
        "mulut":this.mulut,
        "mulut_lainnya":this.mulut_lainnya,
        "gigi":this.gigi,
        "leher":this.leher,
        "respirasi":this.respirasi,
        "respirasi_lainnya":this.respirasi_lainnya,
        "jantung":this.jantung,
        "jantung_lainnya":this.jantung_lainnya,
        "keluhan":this.keluhan,
        "keluhan_lainnya":this.keluhan_lainnya,
        "abdomen":this.abdomen,
        "abdomen_lainnya":this.abdomen_lainnya,
        "mual":this.mual,
        "muntah":this.muntah,
        "defekasi":this.defekasi,
        "defekasi_lainnya":this.defekasi_lainnya,
        "pembatasan_makanan":this.pembatasan_makanan,
        "pendengaran":this.pendengaran,
        "pendengaran_abnormal":this.pendengaran_abnormal,
        "penglihatan":this.penglihatan,
        "penglihatan_abnormal":this.penglihatan_abnormal,
        "bak":this.bak,
        "bak_abnormal":this.bak_abnormal,
        "bab":this.bab,
        "bab_abnormal":this.bab_abnormal,
        "uregenitalia":this.uregenitalia,
        "uregenitalia_abnormal":this.uregenitalia_abnormal,
        "keadaan_kulit":this.keadaan_kulit,
        "keadaan_kulit_abnormal":this.keadaan_kulit_abnormal,
        "decubitus":this.decubitus,
        "terdapat_luka":this.terdapat_luka,
        "terdapat_lokasi_luka":this.terdapat_lokasi_luka,
        "jenis_kelamin":this.jenis_kelamin,
        "masalah_prostat":this.masalah_prostat,
        "hamil":this.hamil,
        "alat_kontrasepsi":this.alat_kontrasepsi,
        "jenis_alat_kontrasepsi":this.jenis_alat_kontrasepsi,
        
        // Perencanaan pulang pasien
        "umur_lebih_65_tahun":this.umur_lebih_65_tahun,
        "keterbatasan_mobilitas":this.keterbatasan_mobilitas,
        "pengobatan_lanjutan":this.pengobatan_lanjutan,
        "bantuan_aktifitas":this.bantuan_aktifitas,
        "perencanaan_pulang":this.perencanaan_pulang,

        // Riwayat kesehatan
        "pernah_dirawat":this.pernah_dirawat,
        "tahun_bulan_pernah_dirawat":this.tahun_bulan_pernah_dirawat,
        "lokasi_pernah_dirawat":this.lokasi_pernah_dirawat,
        "dilakukan_tindakan_operatif":this.dilakukan_tindakan_operatif,
        "jenis_tindakan_operasi":this.jenis_tindakan_operasi,
        "riwayat_penyakit_keluarga":this.riwayat_penyakit_keluarga,
        "nama_penderita":this.nama_penderita,
        "penyakit_lainnya":this.penyakit_lainnya,

        // Status fungsional
        "aktifitas_dan_mobilisasi":this.aktifitas_dan_mobilisasi,
        "berjalan":this.berjalan,
        "berjalan_lainnya":this.berjalan_lainnya,
        "alat_ambulatory":this.alat_ambulatory,
        "alat_ambulatory_lainnya":this.alat_ambulatory_lainnya,
        "pola_istirahat":this.pola_istirahat,
        "pola_istirahat_lainnya":this.pola_istirahat_lainnya,
        "resiko_jatuh":this.resiko_jatuh,
        "nyeri":this.nyeri,
        "status_psikologi":this.status_psikologi,
        "kecenderungan_bunuh_diri":this.kecenderungan_bunuh_diri,
        // "sudah_dilaporkan":this.sudah_dilaporkan,
        "status_mental":this.status_mental,
        // "sebutkan_status_mental":this.sebutkan_status_mental,
        "butuh_bimbingan_rohani":this.butuh_bimbingan_rohani,
        "pembimbing_kecenderungan_bunuh_diri":this.pembimbing_kecenderungan_bunuh_diri,
        "masalah_status_mental":this.masalah_status_mental,

        // Status gizi
        "intake_nutrisi_lewat":this.intake_nutrisi_lewat,
        "intake_nutrisi_lewat_lainnya":this.intake_nutrisi_lewat_lainnya,
        "penurunan_berat_badan":this.penurunan_berat_badan,
        "keraguan_naik_bb":this.keraguan_naik_bb,
        "jumlah_turun_berat_badan":this.jumlah_turun_berat_badan,
        "asupan_makan_berkurang":this.asupan_makan_berkurang,
        "diagnosis_khusus":this.diagnosis_khusus,
        "isi_diagnosis_khusus":this.isi_diagnosis_khusus,
        "total_status_gizi":this.total_status_gizi,
    };
    
    if(this.alasan == ''){
      this.toastr.error('Harap Isi Data Alasan Masuk Rumah Sakit', 'Error', {
        timeOut: 2000,
      });                
    } else {
      // console.log(body);

      if(this.validasiCreateUpdate == 'Create'){
        this.keperawatanService.simpanKeperawatan(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Assesmen keperawatan sudah dibuat', 'Sukses', {
                timeOut: 2000,
              });                
              this.ambilSemuaNoTransaksiPerNoRM();
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
        this.keperawatanService.updateKeperawatan(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Assesmen keperawatan sudah diupdate', 'Sukses', {
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
  
  ambilDataKeperawatan() {
    // console.log("Ambil Data Keperawatan");
    this.keperawatanService.getKeperawatanByNoTransaksiNoRM(this.no_rm, this.no_transaksi).subscribe(
      (data: any) => {
        // console.log(data);
        // console.log(JSON.stringify(data));
        this.asesmentKeperawatan = data;
        // console.log("Asesment Keperawatan");
        // console.log(this.asesmentKeperawatan);
        if(this.asesmentKeperawatan.alasan_masuk_rs[0]){
          this.validasiCreateUpdate = "Update";
        } else {
          this.validasiCreateUpdate = "Create";
          this.pasangNilaiPemeriksaanFisik();
        }
        // this.validasiCreateUpdate = "Create";
        // console.log("Nilai Assesment Keperawatan");
        // console.log(this.asesmentKeperawatan);
        // console.log(this.asesmentKebidanan.aktivitas_dan_istirahat[0]);

        // Pasang nilai untuk update
        this.pasangAlasanMasukRS(this.asesmentKeperawatan.alasan_masuk_rs[0]);
        this.pasangPemeriksaanFisik(this.asesmentKeperawatan.pemeriksaan_fisik[0]);
        this.pasangPerencanaanPulang(this.asesmentKeperawatan.perencanaan_pulang[0]);
        this.pasangRiwayatKesehatan(this.asesmentKeperawatan.riwayat_kesehatan[0]);
        this.pasangStatusFungsional(this.asesmentKeperawatan.status_fungsional[0]);
        this.pasangStatusGizi(this.asesmentKeperawatan.status_gizi[0]);
        this.periksaNilaiStatusMental();

      },(error: any) => console.log(error)
    );
  }

  pasangNilaiPemeriksaanFisik(){
    this.kepUgdService.getKepUGDAssesmentByNoTransaksiNoRM(this.no_rm, this.no_transaksi).subscribe(
      (data: any) => {
        // console.log("Data");
        // console.log(data);
        // console.log(data.pemeriksaan_fisik_assesment_kep_ugd[0]);
        this.nadi = data.pemeriksaan_fisik_assesment_kep_ugd[0].nadi;
        this.rr = data.pemeriksaan_fisik_assesment_kep_ugd[0].rr;
        this.suhu = data.pemeriksaan_fisik_assesment_kep_ugd[0].suhu;
        this.mata = data.pemeriksaan_fisik_assesment_kep_ugd[0].eye;
        this.motorik = data.pemeriksaan_fisik_assesment_kep_ugd[0].motorik;
        this.verbal = data.pemeriksaan_fisik_assesment_kep_ugd[0].verbal;
        this.gcs = data.pemeriksaan_fisik_assesment_kep_ugd[0].gcs;
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
    this.keperawatanService.getKeperawatanByNoRM(this.no_rm).subscribe(
      (data: any) => {
        // console.log("Ini untuk get by No RM");
        // console.log(data);
        if(data.success == true){
          this.listNotransaksiPerNoRM = data.alasan_masuk_rs;
        } else {
            this.toastr.error(data.message, 'Error');
        }
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
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

  periksaNilaiPernahDirawat(): void{
    console.log("Periksa Pernah Dirawat");
    console.log(this.pernah_dirawat);
    if(this.pernah_dirawat == 'Ya'){
      this.hiddenPernahDirawat = false;
    } else {
      this.hiddenPernahDirawat = true;
    }
  }
  
  periksaNilaiPernahDioperasi(): void{
    console.log("Periksa Pernah Dioperasi");
    console.log(this.dilakukan_tindakan_operatif);
    if(this.dilakukan_tindakan_operatif == 'Ya'){
      this.hiddenPernahDioperasi = false;
    } else {
      this.hiddenPernahDioperasi = true;
    }
  }
  
  periksaNilaiPenyakitKeluarga(): void{
    console.log("Periksa Penyakit Keluarga");
    console.log(this.riwayat_penyakit_keluarga);
    if(this.riwayat_penyakit_keluarga == ''){
      this.hiddenPenyakitKeluarga = true;
      this.hiddenPenderitaPenyakitKeluarga = true;
    } else{
      if(this.riwayat_penyakit_keluarga == 'Lainnya'){
        this.hiddenPenyakitKeluarga = false;
      }else{
        this.hiddenPenyakitKeluarga = true;
      }
      this.hiddenPenderitaPenyakitKeluarga = false;
    }
  }

  pasangNilaiGCS(): void{
    this.gcs = 0;
    console.log("Pasang Nilai GCS Mata");
    console.log(this.mata);
    if(this.mata == '1'){
      this.gcs += 1;
    } else if(this.mata == '2'){
      this.gcs += 2;
    } else if(this.mata == '3'){
      this.gcs += 3;
    } else if(this.mata == '4'){
      this.gcs += 4;
    }
    
    console.log("Pasang Nilai Motorik");
    console.log(this.motorik);
    if(this.motorik == '1'){
      this.gcs += 1;
    } else if(this.motorik == '2'){
      this.gcs += 2;
    } else if(this.motorik == '3'){
      this.gcs += 3;
    } else if(this.motorik == '4'){
      this.gcs += 4;
    } else if(this.motorik == '5'){
      this.gcs += 5;
    } else if(this.motorik == '6'){
      this.gcs += 6;
    } 
    
    console.log("Pasang Nilai Verbal");
    console.log(this.verbal);
    if(this.verbal == '1'){
      this.gcs += 1;
    } else if(this.verbal == '2'){
      this.gcs += 2;
    } else if(this.verbal == '3'){
      this.gcs += 3;
    } else if(this.verbal == '4'){
      this.gcs += 4;
    } else if(this.verbal == '5'){
      this.gcs += 5;
    } 
  }

  periksaNilaiKeadaanUmum(): void{
    console.log("Periksa Keadaan Umum");
    console.log(this.keadaan_umum);
    if(this.keadaan_umum == 'Lainnya'){
      this.hiddenKeadaanUmum = false;
    }else{
      this.hiddenKeadaanUmum = true;
    }
  }
  
  periksaNilaiKepala(): void{
    console.log("Periksa Kepala");
    console.log(this.kepala);
    if(this.kepala == 'Lainnya'){
      this.hiddenKepala = false;
    }else{
      this.hiddenKepala = true;
    }
  }

  periksaNilaiMulut(): void{
    console.log("Periksa Mulut");
    console.log(this.mulut);
    if(this.mulut == 'Lainnya'){
      this.hiddenMulut = false;
    }else{
      this.hiddenMulut = true;
    }
  }

  periksaNilaiRespirasi(): void{
    console.log("Periksa Respirasi");
    console.log(this.respirasi);
    if(this.respirasi == 'Lainnya'){
      this.hiddenRespirasi = false;
    }else{
      this.hiddenRespirasi = true;
    }
  }

  periksaNilaiJantung(): void{
    console.log("Periksa Jantung");
    console.log(this.jantung);
    if(this.jantung == 'Lainnya'){
      this.hiddenJantung = false;
    }else{
      this.hiddenJantung = true;
    }
  }

  periksaNilaiKeluhan(): void{
    console.log("Periksa Keluhan");
    console.log(this.keluhan);
    if(this.keluhan == 'Ya'){
      this.hiddenKeluhan = false;
    }else{
      this.hiddenKeluhan = true;
    }
  }

  periksaNilaiAbdomen(): void{
    console.log("Periksa Abdomen");
    console.log(this.abdomen);
    if(this.abdomen == 'Lainnya' || this.abdomen == 'Jumlah Bising Usus'){
      this.hiddenAbdomen = false;
    }else{
      this.hiddenAbdomen = true;
    }
  }

  periksaNilaiDefekasi(): void{
    console.log("Periksa Defekasi");
    console.log(this.defekasi);
    if(this.defekasi == 'Tidak Normal'){
      this.hiddenDefekasi = false;
    }else{
      this.hiddenDefekasi = true;
    }
  }

  periksaNilaiPendengaran(): void{
    console.log("Periksa Pendengaran");
    console.log(this.pendengaran);
    if(this.pendengaran == 'Tidak Normal'){
      this.hiddenPendengaran = false;
    }else{
      this.hiddenPendengaran = true;
    }
  }

  periksaNilaiPenglihatan(): void{
    console.log("Periksa Penglihatan");
    console.log(this.penglihatan);
    if(this.penglihatan == 'Tidak Normal'){
      this.hiddenPenglihatan = false;
    }else{
      this.hiddenPenglihatan = true;
    }
  }

  periksaNilaiBAK(): void{
    console.log("Periksa BAK");
    console.log(this.bak);
    if(this.bak == 'Tidak Normal'){
      this.hiddenBAK = false;
    }else{
      this.hiddenBAK = true;
    }
  }

  periksaNilaiBAB(): void{
    console.log("Periksa BAB");
    console.log(this.bab);
    if(this.bab == 'Tidak Normal'){
      this.hiddenBAB = false;
    }else{
      this.hiddenBAB = true;
    }
  }

  periksaNilaiUregenitalia(): void{
    console.log("Periksa Uregenitalia");
    console.log(this.uregenitalia);
    if(this.uregenitalia == 'Tidak Normal'){
      this.hiddenUregenitalia = false;
    }else{
      this.hiddenUregenitalia = true;
    }
  }

  periksaNilaiKeadaanKulit(): void{
    console.log("Periksa Keadaan Kulit");
    console.log(this.keadaan_kulit);
    if(this.keadaan_kulit == 'Tidak Normal'){
      this.hiddenKeadaanKulit = false;
    }else{
      this.hiddenKeadaanKulit = true;
    }
  }

  periksaNilaiLokasiLuka(): void{
    console.log("Periksa Lokasi Luka");
    console.log(this.terdapat_luka);
    if(this.terdapat_luka == 'Ya'){
      this.hiddenTerdapatLuka = false;
    }else{
      this.hiddenTerdapatLuka = true;
    }
  }

  periksaNilaiReproduksi(): void{
    console.log("Periksa Jenis Kelamin");
    console.log(this.jenis_kelamin);
    if(this.jenis_kelamin == 'Laki - Laki'){
      this.hiddenMasalahProstat = false;
      this.hiddenHamil = true;
      this.hiddenAlatKontrasepsi = true;
      this.hiddenJenisAlatKontrasepsi = true;
    }else if(this.jenis_kelamin == 'Wanita'){
      this.hiddenMasalahProstat = true;
      this.hiddenHamil = false;
      this.hiddenAlatKontrasepsi = false;
      if(this.alat_kontrasepsi == 'Ya'){
        this.hiddenJenisAlatKontrasepsi = false;
      }else{
        this.hiddenJenisAlatKontrasepsi = true;
      }
    }else{
      this.hiddenMasalahProstat = true;
      this.hiddenHamil = true;
      this.hiddenAlatKontrasepsi = true;
      this.hiddenJenisAlatKontrasepsi = true;
    }
  }

  periksaNilaiBerjalan(): void{
    console.log("Periksa Berjalan");
    console.log(this.berjalan);
    if(this.berjalan == 'Lainnya'){
      this.hiddenBerjalan = false;
    }else{
      this.hiddenBerjalan = true;
    }
  }

  periksaNilaiAlatAmbulatory(): void{
    console.log("Periksa Alat Ambulatory");
    console.log(this.alat_ambulatory);
    if(this.alat_ambulatory == 'Lainnya'){
      this.hiddenAlatAmbulatory = false;
    }else{
      this.hiddenAlatAmbulatory = true;
    }
  }

  periksaNilaiPolaIstirahat(): void{
    console.log("Periksa Pola Istirahat");
    console.log(this.pola_istirahat);
    if(this.pola_istirahat == 'Lainnya'){
      this.hiddenPolaIstirahat = false;
    }else{
      this.hiddenPolaIstirahat = true;
    }
  }

  periksaNilaiKecenderunganBunuhDiri(): void{
    console.log("Periksa Kecenderungan Bunuh Diri");
    console.log(this.kecenderungan_bunuh_diri);
    if(this.kecenderungan_bunuh_diri == 'Ya'){
      this.hiddenKecenderunganBunuhDiri = false;
    }else{
      this.hiddenKecenderunganBunuhDiri = true;
    }
  }

  periksaNilaiStatusMental(): void{
    console.log("Periksa Status Mental");
    console.log(this.status_mental);
    if(this.status_mental == 'Sadar dan Orientasi Baik' || this.status_mental == '' ){
      this.hiddenStatusMental = true;
    }else{
      this.hiddenStatusMental = false;
    }
  }

  periksaNilaiIntakeNutrisi(): void{
    console.log("Periksa Intake Nutrisi");
    console.log(this.intake_nutrisi_lewat);
    if(this.intake_nutrisi_lewat == 'Lainnya'){
      this.hiddenIntakeNutrisiLewatLainnya = false;
    }else{
      this.hiddenIntakeNutrisiLewatLainnya = true;
    }
  }

  pasangNilaiTotalStatusGizi(): void{
    this.total_status_gizi = 0;
    console.log("Pasang Nilai Penurunan Berat Badan");
    console.log(this.penurunan_berat_badan);
    if(this.penurunan_berat_badan == "Ya"){
      this.total_status_gizi += 1;
    } else {
      this.total_status_gizi += 0;
    }
    
    console.log("Pasang Nilai Keraguan Penurunan Berat Badan");
    console.log(this.keraguan_naik_bb);
    if(this.keraguan_naik_bb == "Ya"){
      this.total_status_gizi += 2;
    } else {
      this.total_status_gizi += 0;
    }
    
    console.log("Pasang Nilai Jumlah Turun Berat Badan");
    console.log(this.jumlah_turun_berat_badan);
    if(this.jumlah_turun_berat_badan == "1-5 kg"){
      this.total_status_gizi += 1;
    } else if(this.jumlah_turun_berat_badan == "6-10 kg"){
      this.total_status_gizi += 2;
    }  else if(this.jumlah_turun_berat_badan == "11-15 kg"){
      this.total_status_gizi += 3;
    }  else if(this.jumlah_turun_berat_badan == ">15 kg"){
      this.total_status_gizi += 4;
    } else {
      this.total_status_gizi += 0;
    }

    console.log("Pasang Nilai Asupan Makan Berkurang");
    console.log(this.asupan_makan_berkurang);
    if(this.asupan_makan_berkurang == "Ya"){
      this.total_status_gizi += 1;
    } else {
      this.total_status_gizi += 0;
    }
    
    console.log("Pasang Nilai Diagnosis Khusus");
    console.log(this.diagnosis_khusus);
    if(this.diagnosis_khusus == "Ya"){
      this.total_status_gizi += 1;
      this.hiddenDiagnosisKhusus = false;
    } else {
      this.total_status_gizi += 0;
      this.hiddenDiagnosisKhusus = true;
    }
    
  }

  pasangNilaiPerencanaanPulang(): void{
    if(this.umur_lebih_65_tahun == "Ya"){
      this.hiddenPerencaanPulang = false;
    } else if(this.keterbatasan_mobilitas == "Ya"){
      this.hiddenPerencaanPulang = false;
    } else if(this.pengobatan_lanjutan == "Ya"){
      this.hiddenPerencaanPulang = false;
    } else if(this.bantuan_aktifitas == "Ya"){
      this.hiddenPerencaanPulang = false;
    } else {
      this.hiddenPerencaanPulang = true;
    }
    
  }

  pasangNilaiCheckButtonPerencanaanPulang1(){
    this.perencanaan_pulang = this.perencanaan_pulang + ';'+ 'Perawatan Diri(Mandi, BAB, BAK)';
    console.log(this.perencanaan_pulang);
  }
  
  pasangNilaiCheckButtonPerencanaanPulang2(){
    this.perencanaan_pulang = this.perencanaan_pulang + ';'+ 'Pemantauan Pemberian Obat';
    console.log(this.perencanaan_pulang);
  }
  
  pasangNilaiCheckButtonPerencanaanPulang3(){
    this.perencanaan_pulang = this.perencanaan_pulang + ';'+ 'Pemantauan Diri';
    console.log(this.perencanaan_pulang);
  }
  
  pasangNilaiCheckButtonPerencanaanPulang4(){
    this.perencanaan_pulang = this.perencanaan_pulang + ';'+ 'Perawatan Luka';
    console.log(this.perencanaan_pulang);
  }
  
  pasangNilaiCheckButtonPerencanaanPulang5(){
    this.perencanaan_pulang = this.perencanaan_pulang + ';'+ 'Latihan Fisik Lanjutan';
    console.log(this.perencanaan_pulang);
  }
  
  pasangNilaiCheckButtonPerencanaanPulang6(){
    this.perencanaan_pulang = this.perencanaan_pulang + ';'+ 'Pendampingan Tenaga Khusus Dirumah';
    console.log(this.perencanaan_pulang);
  }
  
  pasangNilaiCheckButtonPerencanaanPulang7(){
    this.perencanaan_pulang = this.perencanaan_pulang + ';'+ 'Bantuan Untuk Melakukan Aktifitas Fisik';
    console.log(this.perencanaan_pulang);
  }
  
  loadCheckBoxPerencanaanPulang(nilai) {
    let perencanaanPulangArray = this.perencanaan_pulang.split(';');
    perencanaanPulangArray.forEach((element,index)=>{
      if(element == 'Perawatan Diri(Mandi, BAB, BAK)'){
        this.perencanaanPulang1 = true;
      } else if(element == 'Pemantauan Pemberian Obat'){
        this.perencanaanPulang2 = true;
      } else if(element == 'Pemantauan Diri'){
        this.perencanaanPulang3 = true;
      } else if(element == 'Perawatan Luka'){
        this.perencanaanPulang4 = true;
      } else if(element == 'Latihan Fisik Lanjutan'){
        this.perencanaanPulang5 = true;
      } else if(element == 'Pendampingan Tenaga Khusus Dirumah'){
        this.perencanaanPulang6 = true;
      } else if(element == 'Bantuan Untuk Melakukan Aktifitas Fisik'){
        this.perencanaanPulang7 = true;
      } else {

      }
    });
   
  }

  periksaAngkaInput(params, params2){
    if(params2 == 'Pemeriksaan Fisik'){
      if(params == 'TD'){
        if(!Number(this.td)){
          this.toastr.error('Tekanan Darah Harus berisi Angka ', 'Error', {
            timeOut: 2000,
          });             
          this.td = '';
        }
      } else if(params == 'Nadi'){
        if(!Number(this.nadi)){
          this.toastr.error('Nadi Harus berisi Angka ', 'Error', {
            timeOut: 2000,
          });             
          this.nadi = '';
        }
      } else if(params == 'RR'){
        if(!Number(this.rr)){
          this.toastr.error('Frekuensi Nafas Harus berisi Angka ', 'Error', {
            timeOut: 2000,
          });             
          this.rr = '';
        }
      } else if(params == 'Suhu Tubuh'){
        if(!Number(this.suhu)){
          this.toastr.error('Suhu Tubuh Harus berisi Angka ', 'Error', {
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
      } else if(params == 'TB'){
        if(!Number(this.tb)){
          this.toastr.error('Tinggi Badan Harus berisi Angka ', 'Error', {
            timeOut: 2000,
          });             
          this.tb = '';
        }
      }
  
    } 
  }

  pasangAlasanMasukRS(nilai){
    // console.log("Pasang Alasan Masuk RS");
    
    this.alasan = nilai.alasan;
    
  }

  pasangPemeriksaanFisik(nilai){
    console.log("Pasang Pemeriksaan Fisik");
    
    this.td = nilai.td;
    this.nadi = nilai.nadi;
    this.rr = nilai.rr;
    this.suhu = nilai.suhu;
    this.bb = nilai.bb;
    this.tb = nilai.tb;
    this.gcs = nilai.gcs;
    this.mata = nilai.mata;
    this.motorik = nilai.motorik;
    this.verbal = nilai.verbal;
    this.keadaan_umum = nilai.keadaan_umum;
    this.keadaan_umum_lainnya = nilai.keadaan_umum_lainnya;
    this.kepala = nilai.kepala;
    this.kepala_lainnya = nilai.kepala_lainnya;
    this.mulut = nilai.mulut;
    this.mulut_lainnya = nilai.mulut_lainnya;
    this.gigi = nilai.gigi;
    this.leher = nilai.leher;
    this.respirasi = nilai.respirasi;
    this.respirasi_lainnya = nilai.respirasi_lainnya;
    this.jantung = nilai.jantung;
    this.jantung_lainnya = nilai.jantung_lainnya;
    this.keluhan = nilai.keluhan;
    this.keluhan_lainnya = nilai.keluhan_lainnya;
    this.abdomen = nilai.abdomen;
    this.abdomen_lainnya = nilai.abdomen_lainnya;
    this.mual = nilai.mual;
    this.muntah = nilai.muntah;
    this.defekasi = nilai.defekasi;
    this.defekasi_lainnya = nilai.defekasi_lainnya;
    this.pembatasan_makanan = nilai.pembatasan_makanan;
    this.pendengaran = nilai.pendengaran;
    this.pendengaran_abnormal = nilai.pendengaran_abnormal;
    this.penglihatan = nilai.penglihatan;
    this.penglihatan_abnormal = nilai.penglihatan_abnormal;
    this.bak = nilai.bak;
    this.bak_abnormal = nilai.bak_abnormal;
    this.bab = nilai.bab;
    this.bab_abnormal = nilai.bab_abnormal;
    this.uregenitalia = nilai.uregenitalia;
    this.uregenitalia_abnormal = nilai.uregenitalia_abnormal;
    this.keadaan_kulit = nilai.keadaan_kulit;
    this.keadaan_kulit_abnormal = nilai.keadaan_kulit_abnormal;
    this.decubitus = nilai.decubitus;
    this.terdapat_luka = nilai.terdapat_luka;
    this.terdapat_lokasi_luka = nilai.terdapat_lokasi_luka;
    this.jenis_kelamin = nilai.jenis_kelamin;
    this.masalah_prostat = nilai.masalah_prostat;
    this.hamil = nilai.hamil;
    this.alat_kontrasepsi = nilai.alat_kontrasepsi;
    this.jenis_alat_kontrasepsi = nilai.jenis_alat_kontrasepsi;
    
    this.periksaNilaiKeadaanUmum();
    this.periksaNilaiKepala();
    this.periksaNilaiMulut();
    this.periksaNilaiRespirasi();
    this.periksaNilaiJantung();
    this.periksaNilaiKeluhan();
    this.periksaNilaiAbdomen();
    this.periksaNilaiDefekasi();
    this.periksaNilaiPendengaran();
    this.periksaNilaiPenglihatan();
    this.periksaNilaiBAK();
    this.periksaNilaiBAB();
    this.periksaNilaiUregenitalia();
    this.periksaNilaiKeadaanKulit();
    this.periksaNilaiLokasiLuka();
    this.periksaNilaiReproduksi();
    
    
  }

  pasangPerencanaanPulang(nilai){
    console.log("Pasang Perencanaan Pulang");
    this.umur_lebih_65_tahun = nilai.umur_lebih_65_tahun;
    this.keterbatasan_mobilitas = nilai.keterbatasan_mobilitas;
    this.pengobatan_lanjutan = nilai.pengobatan_lanjutan;
    this.bantuan_aktifitas = nilai.bantuan_aktifitas;
    this.perencanaan_pulang = nilai.perencanaan_pulang;
    
    if(this.umur_lebih_65_tahun == "Ya"){
      this.hiddenPerencaanPulang = false;
    } else if(this.keterbatasan_mobilitas == "Ya"){
      this.hiddenPerencaanPulang = false;
    } else if(this.pengobatan_lanjutan == "Ya"){
      this.hiddenPerencaanPulang = false;
    } else if(this.bantuan_aktifitas == "Ya"){
      this.hiddenPerencaanPulang = false;
    } else {
      this.hiddenPerencaanPulang = true;
    }
    
    this.loadCheckBoxPerencanaanPulang(nilai.perencanaan_pulang);
    
    
  }

  pasangRiwayatKesehatan(nilai){
    console.log("Pasang Riwayat Kesehatan");
    
    this.pernah_dirawat = nilai.pernah_dirawat;
    this.tahun_bulan_pernah_dirawat = nilai.tahun_bulan_pernah_dirawat;
    this.lokasi_pernah_dirawat = nilai.lokasi_pernah_dirawat;
    this.dilakukan_tindakan_operatif = nilai.dilakukan_tindakan_operatif;
    this.jenis_tindakan_operasi = nilai.jenis_tindakan_operasi;
    this.riwayat_penyakit_keluarga = nilai.riwayat_penyakit_keluarga;
    this.nama_penderita = nilai.nama_penderita;
    this.penyakit_lainnya = nilai.penyakit_lainnya;
    
    this.periksaNilaiPernahDirawat();
    this.periksaNilaiPernahDioperasi();
    this.periksaNilaiPenyakitKeluarga();
    
  }

  pasangStatusFungsional(nilai){
    console.log("Pasang Status Fungsional");
    
    this.aktifitas_dan_mobilisasi = nilai.aktifitas_dan_mobilisasi;
    this.berjalan = nilai.berjalan;
    this.berjalan_lainnya = nilai.berjalan_lainnya;
    this.alat_ambulatory = nilai.alat_ambulatory;
    this.alat_ambulatory_lainnya = nilai.alat_ambulatory_lainnya;
    this.pola_istirahat = nilai.pola_istirahat;
    this.pola_istirahat_lainnya = nilai.pola_istirahat_lainnya;
    this.resiko_jatuh = nilai.resiko_jatuh;
    this.nyeri = nilai.nyeri;
    this.status_psikologi = nilai.status_psikologi;
    this.kecenderungan_bunuh_diri = nilai.kecenderungan_bunuh_diri;
    this.pembimbing_kecenderungan_bunuh_diri = nilai.pembimbing_kecenderungan_bunuh_diri;
    this.status_mental = nilai.status_mental;
    this.masalah_status_mental = nilai.masalah_status_mental;
    this.butuh_bimbingan_rohani = nilai.butuh_bimbingan_rohani;
    
    this.periksaNilaiBerjalan();
    this.periksaNilaiAlatAmbulatory();
    this.periksaNilaiPolaIstirahat();
    this.periksaNilaiKecenderunganBunuhDiri();
    this.periksaNilaiStatusMental();

  }

  pasangStatusGizi(nilai){
    console.log("Pasang Status Gizi");
    
    this.intake_nutrisi_lewat = nilai.intake_nutrisi_lewat;
    this.intake_nutrisi_lewat_lainnya = nilai.intake_nutrisi_lewat_lainnya;
    this.penurunan_berat_badan = nilai.penurunan_berat_badan;
    this.keraguan_naik_bb = nilai.keraguan_naik_bb;
    this.jumlah_turun_berat_badan = nilai.jumlah_turun_berat_badan;
    this.asupan_makan_berkurang = nilai.asupan_makan_berkurang;
    this.diagnosis_khusus = nilai.diagnosis_khusus;
    this.isi_diagnosis_khusus = nilai.isi_diagnosis_khusus;
    this.total_status_gizi = nilai.total_status_gizi;
    
    this.periksaNilaiIntakeNutrisi();
    this.pasangNilaiTotalStatusGizi();

  }

  

}
