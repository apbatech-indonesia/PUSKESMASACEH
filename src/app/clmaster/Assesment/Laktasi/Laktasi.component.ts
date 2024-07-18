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

import { LaktasiService } from './Service/laktasi.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

import * as moment from 'moment';

@Component({
  selector: 'app-Laktasi',
  templateUrl: './Laktasi.component.html',
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
export class LaktasiComponent implements OnInit {
    heading = 'Asesmen Laktasi';
    subheading :any;
    icon = 'pe-7s-diamond icon-gradient bg-warm-flame';
  
    // Validasi file Create / Update
    validasiCreateUpdate = '';
  
    // Icon
    faCheck = faCheck;
    faTrash = faTrash;
    faWindowClose = faWindowClose;
    
    listNotransaksiPerNoRM: any = [];
    assesmentLaktasiSebelumnya: any = [];
    assesmentLaktasiSekarang: any = [];
    assesmentLaktasiKeadaanIbu: any = [];
  
    // Session
    username:any;
    // Main Data Input
    no_rm:any;
    no_transaksi:any;
    
    // Assesment Laktasi Sebelumnya
    anak_keberapa:any;
    jenis_kelamin:string = '';
    umur:any = '';
    menyusui_eksklusif:string = '';
    umur_disapih:any = '';
    masalah_dalam_menyusui:any = '';

    // Laktasi Sekarang
    kelainan_payudara:any;
    melakukan_perawatan_payudara:any;
    minum_obat_pelancar_asi:any;
    puting_susu:any;
    pengeluaran_asi:any;
    keadaan_umum_bayi:any = '';
    apgar_score:any;
    jumlah_bayi:string = '';
    berat_lahir_bayi:any;
    panjang_badan_bayi:any;
    jenis_kelamin_bayi:string = '';
    keadaan_anus_bayi:any;
    kelainan_bawaan:string = '';
    kelainan_bawaan_lainnya:any;

    // Keadaan Ibu
    keadaan_umum_ibu:any = '';
    kesulitan_menyusui:string = '';
    kesulitan_menyusui_lainnya:any;
    td:any;
    rr:any;
    nadi:any;
    suhu:any;
    kontraksi:string = '';
    tinggi_fudus:any;
    jumlah_perdarahan:any;

    // Disable
    disabledKelainanBawaan = true;
    disabledKesulitanMenyusui = true;
    
    // Modal
    idModalHapusLaktasiSebelumnya: any;
    closeResultModalLaktasiSebelumnya: string;
    closeResultModalHapusLaktasiSebelumnya: string;

    constructor(
        public http :HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public toastr: ToastrService, 
        private laktasiService:LaktasiService, 
        private fb: FormBuilder
        ) {
        // this.options = fb.group({
        //   hideRequired: false,
        //   floatLabel: 'auto',
        // });
    
      }

      inputForm = this.fb.group({
        // Main Data Input
        no_rm: ['',Validators.required],
        no_transaksi: ['',Validators.required],
        username: ['',Validators.required],
    
        // Assesment Laktasi Sebelumnya
        anak_keberapa: ['',Validators.required],
        jenis_kelamin: ['',Validators.required],
        umur: ['',Validators.required],
        menyusui_eksklusif: ['',Validators.required],
        umur_disapih: ['',Validators.required],
        masalah_dalam_menyusui: ['',Validators.required],

        // Laktasi Sekarang
        kelainan_payudara: ['',Validators.required],
        melakukan_perawatan_payudara: ['',Validators.required],
        minum_obat_pelancar_asi: ['',Validators.required],
        puting_susu: ['',Validators.required],
        pengeluaran_asi: ['',Validators.required],
        keadaan_umum_bayi: ['',Validators.required],
        apgar_score: ['',Validators.required],
        jumlah_bayi: ['',Validators.required],
        berat_lahir_bayi: ['',Validators.required],
        panjang_badan_bayi: ['',Validators.required],
        jenis_kelamin_bayi: ['',Validators.required],
        keadaan_anus_bayi: ['',Validators.required],
        kelainan_bawaan: ['',Validators.required],
        kelainan_bawaan_lainnya: ['',Validators.required],
        
        // Keadaan Ibu
        keadaan_umum_ibu: ['',Validators.required],
        kesulitan_menyusui: ['',Validators.required],
        kesulitan_menyusui_lainnya: ['',Validators.required],
        td: ['',Validators.required],
        rr: ['',Validators.required],
        nadi: ['',Validators.required],
        suhu: ['',Validators.required],
        kontraksi: ['',Validators.required],
        tinggi_fudus: ['',Validators.required],
        jumlah_perdarahan: ['',Validators.required],
        
      });
    
      ngOnInit(): void {
        this.username = localStorage.getItem('username');
        this.no_rm = localStorage.getItem('noRM');
        this.no_transaksi = localStorage.getItem('noTransaksi');
        this.ambilDataLaktasi();
        this.ambilSemuaNoTransaksiPerNoRM();
        this.ambilLaktasiSebelumnyaPerNoRM();

        console.log('this.assesmentLaktasiSebelumnya.length');
        console.log(this.assesmentLaktasiSebelumnya.length);

    
      }

      simpan(){
        let body = {
            // Main Data Input
            "no_rm" : this.no_rm,
            "no_transaksi":this.no_transaksi,
            "username":this.username,
            
            // Laktasi Sekarang
            "kelainan_payudara":this.kelainan_payudara,
            "melakukan_perawatan_payudara":this.melakukan_perawatan_payudara,
            "minum_obat_pelancar_asi":this.minum_obat_pelancar_asi,
            "puting_susu":this.puting_susu,
            "pengeluaran_asi":this.pengeluaran_asi,
            "keadaan_umum_bayi":this.keadaan_umum_bayi,
            
            "apgar_score":this.apgar_score,
            "jumlah_bayi":this.jumlah_bayi,
            "berat_lahir_bayi":this.berat_lahir_bayi,
            "panjang_badan_bayi":this.panjang_badan_bayi,
            "jenis_kelamin_bayi":this.jenis_kelamin_bayi,
            "keadaan_anus_bayi":this.keadaan_anus_bayi,
            
            "kelainan_bawaan":this.kelainan_bawaan,
            "kelainan_bawaan_lainnya":this.kelainan_bawaan_lainnya,

            // Keadaan Ibu
            "keadaan_umum_ibu":this.keadaan_umum_ibu,
            "kesulitan_menyusui":this.kesulitan_menyusui,
            "kesulitan_menyusui_lainnya":this.kesulitan_menyusui_lainnya,
            "td":this.td,
            "rr":this.rr,
            "nadi":this.nadi,
            
            "suhu":this.suhu,
            "kontraksi":this.kontraksi,
            "tinggi_fudus":this.tinggi_fudus,
            "jumlah_perdarahan":this.jumlah_perdarahan

        }
          
        // console.log(body);
        if(this.keadaan_umum_bayi == '' || this.keadaan_umum_ibu == ''){
          this.toastr.error('Harap isi data terlebih dahulu', 'Error', {
            timeOut: 2000,
          });                
        } else {
          if(this.validasiCreateUpdate == 'Create'){
            this.laktasiService.simpan(body).subscribe(
              (data: any) => {
                //  console.log(data);
                if(data.success == true){
                  this.toastr.success('Asesmen Laktasi sudah dibuat', 'Sukses', {
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
            this.laktasiService.update(body).subscribe(
              (data: any) => {
                //  console.log(data);
                if(data.success == true){
                  this.toastr.success('Asesmen Laktasi sudah diupdate', 'Sukses', {
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

      ambilAssesmentBaru(noTransaksiBaru){
        localStorage.setItem('noTransaksi', noTransaksiBaru);
        this.ngOnInit();
        this.validasiCreateUpdate = 'Update';
      }
    
      ambilDataLaktasi() {
        this.laktasiService.getByNoTransaksiNoRM(this.no_rm, this.no_transaksi).subscribe(
          (data: any) => {
            // console.log(data);
            // console.log(JSON.stringify(data));
            this.assesmentLaktasiSekarang = data.riwayat_laktasi_sekarang;
            this.assesmentLaktasiKeadaanIbu = data.keadaan_ibu;
            if(this.assesmentLaktasiSekarang[0]){
              this.validasiCreateUpdate = "Update";
              // Pasang nilai untuk update
              this.pasangNilaiLaktasiSekarang(this.assesmentLaktasiSekarang[0]);
              this.pasangNilaiKeadaanIbu(this.assesmentLaktasiKeadaanIbu[0]);
  
              this.pasangNilaiKelainanBawaan();
              this.pasangNilaiKesulitanMenyusui();
              
            } else {
              this.validasiCreateUpdate = "Create";
            }
          },(error: any) => console.log(error)
        );
      }

      // List data yang sudah ada
      ambilSemuaNoTransaksiPerNoRM(){
        this.laktasiService.getByNoRM(this.no_rm).subscribe(
          (data: any) => {
            // console.log("Ini untuk get by No RM");
            // console.log(data);
            if(data.success == true){
              this.listNotransaksiPerNoRM = data.riwayat_laktasi_sekarang;
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      }

      // Laktasi Sekarang
      pasangNilaiLaktasiSekarang(nilai){
        // console.log("Pasang Laktasi Sekarang");
        // console.log(nilai);
        this.kelainan_payudara = nilai.kelainan_payudara;
        this.melakukan_perawatan_payudara = nilai.melakukan_perawatan_payudara;
        this.minum_obat_pelancar_asi = nilai.minum_obat_pelancar_asi;
        this.puting_susu = nilai.puting_susu;
        this.pengeluaran_asi = nilai.pengeluaran_asi;
        this.keadaan_umum_bayi = nilai.keadaan_umum_bayi;
        this.apgar_score = nilai.apgar_score;
        this.jumlah_bayi = nilai.jumlah_bayi;
        this.berat_lahir_bayi = nilai.berat_lahir_bayi;
        this.panjang_badan_bayi = nilai.panjang_badan_bayi;
        this.jenis_kelamin_bayi = nilai.jenis_kelamin_bayi;
        this.keadaan_anus_bayi = nilai.keadaan_anus_bayi;
        this.kelainan_bawaan = nilai.kelainan_bawaan;
        this.kelainan_bawaan_lainnya = nilai.kelainan_bawaan_lainnya;
        
      }

      // Keadaan Ibu
      pasangNilaiKeadaanIbu(nilai){
        // console.log("Pasang Keadaan Ibu");
        this.keadaan_umum_ibu = nilai.keadaan_umum_ibu;
        this.kesulitan_menyusui = nilai.kesulitan_menyusui;
        this.kesulitan_menyusui_lainnya = nilai.kesulitan_menyusui_lainnya;
        this.td = nilai.td;
        this.rr = nilai.rr;
        this.nadi = nilai.nadi;
        this.suhu = nilai.suhu;
        this.kontraksi = nilai.kontraksi;
        this.tinggi_fudus = nilai.tinggi_fudus;
        this.jumlah_perdarahan = nilai.jumlah_perdarahan;

      }

      // Laktasi Sebelumnya
      ambilLaktasiSebelumnyaPerNoRM(){
        this.laktasiService.getByLaktasiSebelumnyaNoRM(this.no_rm).subscribe(
          (data: any) => {
            // console.log("Ini untuk Laktasi Sebelumnya");
            // console.log(data);
            if(data.success == true){
              this.assesmentLaktasiSebelumnya = data.riwayat_laktasi_sebelumnya;
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      }

      simpanLaktasiSebelumnya(){
        if(this.anak_keberapa == '' || this.jenis_kelamin == '' || this.umur == '' || this.menyusui_eksklusif == ''
        || this.umur_disapih == '' || this.masalah_dalam_menyusui == ''
        ){
          this.toastr.error('Harap Lengkapi Data', 'Error', {
            timeOut: 2000,
          });              
        } else {
          let body = {
            "no_rm" : this.no_rm,
            "no_transaksi":this.no_transaksi,
            "username":this.username,
  
            "anak_keberapa":this.anak_keberapa,
            "jenis_kelamin":this.jenis_kelamin,
            "umur":this.umur,
            "menyusui_eksklusif":this.menyusui_eksklusif,
            "umur_disapih":this.umur_disapih,
            "masalah_dalam_menyusui":this.masalah_dalam_menyusui
            
          };
          // console.log(body);
  
          this.laktasiService.simpanLaktasiSebelumnya(body).subscribe(
            (data: any) => {
              //  console.log(data);
              if(data.success == true){
                this.toastr.success('Data Laktasi Sebelumnya sudah dibuat', 'Sukses', {
                  timeOut: 2000,
                });              
                this.anak_keberapa = '';  
                this.jenis_kelamin = '';  
                this.umur = '';  
                this.menyusui_eksklusif = '';  
                this.umur_disapih = '';  
                this.masalah_dalam_menyusui = '';  
  
                this.ambilLaktasiSebelumnyaPerNoRM();
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

      hapusLaktasiSebelumnya(){
        this.laktasiService.hapusLaktasiSebelumnya(this.idModalHapusLaktasiSebelumnya).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Data Laktasi Sebelumnya sudah dihapus', 'Sukses', {
                timeOut: 2000,
              });              
              this.ambilLaktasiSebelumnyaPerNoRM();
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
        this.modalService.dismissAll();
      }
      

      openModalLaktasiSebelumnya(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-laktasi-sebelumnya'}).result.then((result) => {
          this.closeResultModalLaktasiSebelumnya = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalLaktasiSebelumnya = `Dismissed ${this.getDismissReasonModalLaktasiSebelumnya(reason)}`;
        });
      }
          
      private getDismissReasonModalLaktasiSebelumnya(reason: any): string {
        this.nilaiDefaultRiwayatLaktasiSebelumnya();
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

      nilaiDefaultRiwayatLaktasiSebelumnya(){
        this.anak_keberapa = '';
        this.jenis_kelamin = '';
        this.umur = '';
        this.menyusui_eksklusif = '';
        this.umur_disapih = '';
        this.masalah_dalam_menyusui = '';
      }

      openModalHapusLaktasiSebelumnya(content, id) {
        this.idModalHapusLaktasiSebelumnya = id;
        this.modalService.open(content, {ariaLabelledBy: 'modal-hapus-laktasi-sebelumnya'}).result.then((result) => {
          this.closeResultModalHapusLaktasiSebelumnya = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResultModalLaktasiSebelumnya = `Dismissed ${this.getDismissReasonModalHapusLaktasiSebelumnya(reason)}`;
        });
      }
          
      private getDismissReasonModalHapusLaktasiSebelumnya(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

      pasangNilaiKelainanBawaan(){
        if(this.kelainan_bawaan == 'Ada'){
          this.disabledKelainanBawaan = false;
        } else {
          this.kelainan_bawaan_lainnya = '';
          this.disabledKelainanBawaan = true;
        }
      }

      pasangNilaiKesulitanMenyusui(){
        if(this.kesulitan_menyusui == 'Ada'){
          this.disabledKesulitanMenyusui = false;
        } else {
          this.kesulitan_menyusui_lainnya = '';
          this.disabledKesulitanMenyusui = true;
        }
      }

      pasangNilaiAnakKe(){
        if(isNaN(Number(this.anak_keberapa))){
          this.toastr.error('Anda Harus Memasukkan Angka', 'Sukses', {
            timeOut: 2000,
          });                
          this.anak_keberapa = '';
        }
      }

      pasangNilaiUmur(){
        if(isNaN(Number(this.umur))){
          this.toastr.error('Anda Harus Memasukkan Angka', 'Sukses', {
            timeOut: 2000,
          });                
          this.umur = '';
        }
      }

      pasangNilaiUmurDisapih(){
        if(isNaN(Number(this.umur_disapih))){
          this.toastr.error('Anda Harus Memasukkan Angka', 'Sukses', {
            timeOut: 2000,
          });                
          this.umur_disapih = '';
        }
      }


}