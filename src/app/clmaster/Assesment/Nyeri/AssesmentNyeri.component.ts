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

import { AssesmentNyeriService } from './Service/assesment-nyeri.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { TemplateService } from '../../Template/Service/Template.service';

// import { AssesmentAnakCetakComponent } from './Cetak/AssesmentAnakCetak.component';

import * as moment from 'moment';

@Component({
  selector: 'app-AssesmentNyeri',
  templateUrl: './AssesmentNyeri.component.html',
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
export class AssesmentNyeriComponent implements OnInit {
  @ViewChild('signature')
  public signaturePad: SignaturePadComponent;
  
  public signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 500,
    'canvasHeight': 300,
    'penColor': 'rgb(3, 3, 255)',
  
  
    'backgroundColor': 'rgb(252, 252, 252)',
  };
  
  heading = 'Asesmen Keperawatan Nyeri';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

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
  
  asesmentNyeriPerNoRM: any = [];
  asesmenNyeri: any = [];
  
  // listNotransaksiPerNoRM:any;
  // Main Data Input
  // no_rm:any;
  // no_transaksi:any;
  // username:any;
  no_rm:any;
  no_transaksi:any;
  username:any;

  idAsesmenNyeri:any;
  tanggal:any = '';
  jam:any = '';
  provokasi:any = '';
  kualitas:any = '';
  lokasi:any = '';
  skala:any = '';
  waktu:any = '';
  intervensi:any = '';
  status:any;

  cekValidasiSimpan = false;
  alertNilaiSkala: boolean = false;

  loading: boolean = false;

  constructor(
    public http :HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService, 
    private AssesmentNyeriService:AssesmentNyeriService, 
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

    tanggal: ['',Validators.required], 
    jam: ['',Validators.required], 
    provokasi: ['',Validators.required], 
    kualitas: ['',Validators.required], 
    lokasi: ['',Validators.required], 
    skala: ['',Validators.required], 
    waktu: ['',Validators.required], 
    intervensi: ['',Validators.required], 
    status: ['',Validators.required], 
    
  });

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.no_rm = localStorage.getItem('noRM');
    this.no_transaksi = localStorage.getItem('noTransaksi');
    this.pasangNilaiValidasiCreateUpdate();
    this.pasangNilaiValidasiButtonCreateUpdate();
    this.ambilDataGetByNoRM();
    this.defaultDateTime();
  }

  defaultDateTime() {
    const sekarang = new Date();
    
    this.tanggal = sekarang;
    this.tanggal = moment(sekarang).format('yyyy-MM-DD');
    const jamSekarang = sekarang.getHours().toString().padStart(2, '0');
    const menitSekarang = sekarang.getMinutes().toString().padStart(2, '0');

    this.jam = `${jamSekarang}:${menitSekarang}`;
  }

  tambahTanggal(type: string, event: MatDatepickerInputEvent<Date>) {
    // console.log(moment(event.value).format('yyyy-MM-DD'));
    this.tanggal = moment(event.value).format('yyyy-MM-DD');
    console.log(this.tanggal);
  }

  onTimeChange(value:{hour:string,minute:string})
  {
    //  console.log(value)
     // yang atas digunakan untuk jam versi 1 lagi
    //  this.jam=`${value.hour}:${value.minute}`;
    this.jam = value;
  }

  validasiRequired(){
    if(this.tanggal === ''){
      this.toastr.error('Tanggal tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    }else if (!this.isValidDate(this.tanggal)){
      this.toastr.error('Format Tanggal Tidak Sesuai', 'Error');
      this.cekValidasiSimpan = false;
    }else if (this.jam === ''){
      this.toastr.error('Jam Waktu tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    }else if (this.provokasi === ''){
      this.toastr.error('Provokasi tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    }else if (this.kualitas === ''){
      this.toastr.error('Kualitas tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    }else if (this.lokasi === ''){
      this.toastr.error('Lokasi tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    }else if (this.skala === ''){
      this.toastr.error('Skala tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    }else if (this.waktu === ''){
      this.toastr.error('Waktu tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    }else if (this.intervensi === ''){
      this.toastr.error('Intervensi tidak boleh kosong', 'Error');
      this.cekValidasiSimpan = false;
    }else{
      this.cekValidasiSimpan = true;
    }
  }

  private isValidDate(dateString: string): boolean {
    // Gunakan regex untuk memeriksa apakah format tanggal sesuai (YYYY-MM-DD)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }

  simpan(){
    this.validasiRequired();
    let body = {
      // Main Data Input
      "id":this.idAsesmenNyeri,
      "no_rm":this.no_rm,
      "no_transaksi":this.no_transaksi,
      "username":this.username,
      "tanggal":this.tanggal,
      "jam":this.jam,
      "provokasi":this.provokasi,
      "kualitas":this.kualitas,
      "lokasi":this.lokasi,
      "skala":this.skala,
      "waktu":this.waktu,
      "intervensi":this.intervensi,
      "status":this.status, 
    };
    
    // console.log(body);
    // console.log('Cek validasi simpan : ' + this.cekValidasiSimpan);

    if(this.cekValidasiSimpan == true){
      if(this.validasiCreateUpdate == 'Create'){
        this.AssesmentNyeriService.simpan(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Assesmen nyeri sudah dibuat', 'Sukses', {
                timeOut: 2000,
              });                
              this.ngOnInit();
              this.buatDefaultNilai();
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      } else if(this.validasiCreateUpdate == 'Update') {
        this.AssesmentNyeriService.update(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Assesmen nyeri sudah diupdate', 'Sukses', {
                timeOut: 2000,
              });
              this.validasiCreateUpdate = 'Create';
              this.validasiButtonCreateUpdate = 'Simpan';
              this.ngOnInit();
              this.buatDefaultNilai();
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

  periksaNilaiSkala(event: any){
    const valSkala = event.target.value;
    const isNumSkala = /^\d+$/.test(valSkala) && !/\s/.test(valSkala);
    if (isNumSkala) {
      this.alertNilaiSkala = false;
    } else {
      this.alertNilaiSkala = true;
      this.skala = '';
    }
  }

  pasangNilaiValidasiCreateUpdate() {
    if(this.validasiCreateUpdate != 'Update'){
      this.validasiCreateUpdate = 'Create';
    }
  }
  
  pasangNilaiValidasiButtonCreateUpdate() {
    if(this.validasiButtonCreateUpdate != 'Update'){
      this.validasiButtonCreateUpdate = 'Simpan';
    }
  }

  ambilAssesmentBaru(id){
    // localStorage.setItem('noTransaksi', noTransaksiBaru);
    this.idAsesmenNyeri = id;
    this.validasiCreateUpdate = 'Update';
    this.validasiButtonCreateUpdate = 'Update';
    this.ambilDataAsesmenNyeri();
    this.ngOnInit();
  }
  
  hapusAsesmenNyeri(id){
    // localStorage.setItem('noTransaksi', noTransaksiBaru);
    this.idAsesmenNyeri = id;
    // this.hapusDataAsesmenNyeriById();
    this.alertHapusAsesmenNyeri();
    // this.ngOnInit();
  }

  alertHapusAsesmenNyeri( ){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Hapus',
      text: 'Hapus Asesment Keperawatan Nyeri?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      // console.log(result);
      // console.log(this.idAsesmenNyeri);
      if (result.value) {
        // console.log(this.idAsesmenNyeri);
        this.hapusDataAsesmenNyeriById();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
    
      }
    }); 
  }

  hapusDataAsesmenNyeriById() {
    // console.log(this.idAsesmenNyeri);
    this.AssesmentNyeriService.deleteDataByID(this.idAsesmenNyeri).subscribe(
      (data: any) => {
        //  console.log(data);
        if(data.success == true){
          this.toastr.success('Assesmen nyeri sudah dihapus', 'Sukses', {
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

  ambilDataAsesmenNyeri() {
    this.AssesmentNyeriService.getDataByID(this.idAsesmenNyeri).subscribe(
      (data: any) => {
        // console.log('ini ambil data by id');
        // console.log(data);
        // console.log(JSON.stringify(data));
        this.asesmenNyeri = data;
        if(this.asesmenNyeri.asesmenNyeri[0]){
          this.validasiCreateUpdate = "Update";
          this.validasiButtonCreateUpdate = "Update";
          this.idAsesmenNyeri = this.asesmenNyeri.asesmenNyeri[0].id;
        } else {
          this.validasiCreateUpdate = "Create";
          this.validasiButtonCreateUpdate = "Simpan";
        }

        // // Pasang nilai untuk update
        this.pasangAsesmenNyeri(this.asesmenNyeri.asesmenNyeri[0]);
        
      },(error: any) => console.log(error)
    );
  }

  ambilDataGetByNoRM() {
    this.loading = true;
    this.AssesmentNyeriService.getByNoRM(this.no_rm).subscribe(
      (data: any) => {
        // console.log(data);
        // console.log(JSON.stringify(data));
        this.asesmentNyeriPerNoRM = data.asesmenNyeri;
        // console.log("Asesment asesmentNyeriPerNoRM.data");
        // console.log(this.asesmentNyeriPerNoRM);
        // if(this.asesmentAnak.data != null){
        //   this.validasiCreateUpdate = "Update";
        //   this.idAsesmenAnak = this.asesmentAnak.data.id;
        // } else {
        //   this.validasiCreateUpdate = "Create";
        // }
        // console.log(this.validasiCreateUpdate);

        // // Pasang nilai untuk update
        this.loading = false;
      },(error: any) => {
        this.loading = false;
        console.log(error); 
      }
    );
  }

  
  pasangAsesmenNyeri(nilai){
    this.tanggal = nilai.tanggal;
    this.jam = nilai.jam;
    this.provokasi = nilai.provokasi;
    this.kualitas = nilai.kualitas;
    this.lokasi = nilai.lokasi;
    this.skala = nilai.skala;
    this.waktu = nilai.waktu;
    this.intervensi = nilai.intervensi;
  }
  
  buatDefaultNilai(){
    this.idAsesmenNyeri = '';
    // this.tanggal = '';
    // this.jam = '';
    this.provokasi = '';
    this.kualitas = '';
    this.lokasi = '';
    this.skala = '';
    this.waktu = '';
    this.intervensi = '';
    this.status = '';
  
  }
  
  




}
