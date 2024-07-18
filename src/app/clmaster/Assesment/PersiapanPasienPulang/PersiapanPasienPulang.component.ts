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

import { PersiapanPasienPulangService } from './Service/persiapanpasienpulang.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { TemplateService } from '../../Template/Service/Template.service';

// import { AssesmentAnakCetakComponent } from './Cetak/AssesmentAnakCetak.component';

import {
  Select2Data,
  Select2Value,
  Select2ScrollEvent,
  Select2SearchEvent,
  Select2UpdateEvent,
} from 'ng-select2-component';

import * as moment from 'moment';

@Component({
  selector: 'app-PersiapanPasienPulang',
  templateUrl: './PersiapanPasienPulang.component.html',
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
export class PersiapanPasienPulangComponent implements OnInit {
  @ViewChild('signature')
  public signaturePad: SignaturePadComponent;
  
  public signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 500,
    'canvasHeight': 300,
    'penColor': 'rgb(3, 3, 255)',
  
  
    'backgroundColor': 'rgb(252, 252, 252)',
  };
  
  heading = 'Persiapan Pasien Pulang';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  // Validasi file Create / Update
  validasiCreateUpdate = '';

  validasiButtonCreateUpdate = '';

  listFilterTemplate: any = [];

  no_rm:any;
  no_transaksi:any;
  username:any;

  // Array Obat
  listObat: any = [];
  arrayObat: any = '';
  arrayLabel: any = '';

  idPasienPulang: any = '';
  tanggal_pulang: any = '';
  anjuran: any = '';
  keterangan_anjuran: any = '';
  respon: any = '';
  keterangan_respon: any = '';
  hasil: any = '';
  keterangan_hasil: any = '';
  keterangan_lain: any = '';

  // Template
  listTemplate: any = [];
  selectTemplate: any = '';

  // Icon
  faBook = faBook;
  faCheck = faCheck;
  faTrash = faTrash;
  faWindowClose = faWindowClose;
  faPencilAlt = faPencilAlt;
  faPlusCircle = faPlusCircle;
  faPrint = faPrint;
  
  listAnjuran: any = [];
  listRespon: any = [];
  listHasil: any = [];
  select2ListAnjuran: Select2Data = [];
  select2ListRespon: Select2Data = [];
  select2ListHasil: Select2Data = [];

  listNotransaksiPerNoRM: any = [];
  persiapanPasienPulang: any = [];
  
  // listNotransaksiPerNoRM:any;
  // Main Data Input
  // no_rm:any;
  // no_transaksi:any;
  // username:any;

  cekValidasiSimpan = false;

  // Modal
  idModalTambahTemplate: any = '';
  judulModalTambahTemplate: any = '';
  detailModalTambahTemplate: any = '';
  jenisModalTambahTemplate: any = '';

  closeResultModalTemplate: string;
  closeResultModalTambahTemplate: string;

  constructor(
    public http :HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService, 
    private persiapanPasienPulangService:PersiapanPasienPulangService, 
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

    tanggal_pulang: ['',Validators.required], 
    anjuran: ['',Validators.required], 
    keterangan_anjuran: ['',Validators.required],
    respon: ['',Validators.required], 
    keterangan_respon: ['',Validators.required],
    hasil: ['',Validators.required],
    keterangan_hasil: ['',Validators.required], 
    keterangan_lain: ['',Validators.required],

    // Array Daftar Obat
    listObat: ['',Validators.required],
    
    // Modal Template
    idModalTambahTemplate: ['',Validators.required],
    judulModalTambahTemplate: ['',Validators.required],
    detailModalTambahTemplate: ['',Validators.required],
    jenisModalTambahTemplate: ['',Validators.required],

  });

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.no_rm = localStorage.getItem('noRM');
    this.no_transaksi = localStorage.getItem('noTransaksi');
    
    this.tanggal_pulang = new Date();
    
    this.validasiCreateUpdate = 'Create';

    this.selectTemplate = '';
    this.getAllTemplate();
    this.pasangListTemplate();

    // Tidak Bisa Ambil Data Per No RM dan No Transaksi karena Backend tetap keukeuh untuk get by id
    // this.ambilDataPerNoRMNoTransaksi(this.no_rm, this.no_transaksi);
    this.ambilDataPerNoRM();
    
  }

  Simpan(){
    let body = {
        // Assesment Awal Rawat Jalan
        "no_rm" : this.no_rm,
        "no_transaksi" : this.no_transaksi,
        "username" : this.username,
        "tanggal_pulang":this.datepipe.transform(this.tanggal_pulang, 'yyyy-MM-dd'),
        "anjuran" : this.anjuran,
        "keterangan_anjuran" : this.keterangan_anjuran,
        "respon" : this.respon,
        "keterangan_respon" : this.keterangan_respon,
        "hasil" : this.hasil,
        "keterangan_hasil" : this.keterangan_hasil,
        "keterangan_lain" : this.keterangan_lain,

        "obat_dibawa_pulang" : this.listObat
    };
    
    console.log(body);
  
    if(this.keterangan_anjuran == ''){
      this.toastr.error('Harap isi form terlebih dahulu', 'Error', {
        timeOut: 2000,
      });             
    } else {
      if(this.validasiCreateUpdate == 'Create'){
        this.persiapanPasienPulangService.simpan(body).subscribe(
          (data: any) => {
             //  console.log(data);
            if(data.success == true){
              this.toastr.success('Persiapan Pasien Pulang Sudah Dibuat', 'Sukses', {
                timeOut: 2000,
              });                
              // this.ngOnInit();
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      } else if(this.validasiCreateUpdate == 'Update') {
        this.persiapanPasienPulangService.update(body).subscribe(
          (data: any) => {
            //  //  console.log(data);
            if(data.success == true){
              this.toastr.success('Persiapan Pasien Pulang Sudah Diupdate', 'Sukses', {
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

  SimpanTemplate(){
    let body = {
        // Assesment Awal Rawat Jalan
        "no_rm" : this.no_rm,
        "no_transaksi" : this.no_transaksi,
        "username" : this.username,
        "hak_akses" : localStorage.getItem('hakAkses'),
        "id" : this.idModalTambahTemplate,
        "judul" : this.judulModalTambahTemplate,
        "isi" : this.detailModalTambahTemplate,
        "jenis" : this.jenisModalTambahTemplate,
        
    };
    
    console.log(body);
  
    if(this.judulModalTambahTemplate == '' || this.detailModalTambahTemplate == '' || this.jenisModalTambahTemplate == ''){
      this.toastr.error('Harap isi form terlebih dahulu', 'Error', {
        timeOut: 2000,
      });             
    } else {
      if(this.idModalTambahTemplate == ''){
        this.persiapanPasienPulangService.simpanTemplate(body).subscribe(
          (data: any) => {
            //  //  console.log(data);
            if(data.success == true){
              this.selectTemplate = '';
              this.select2ListAnjuran = [];
              this.select2ListRespon = [];
              this.select2ListHasil = [];
              this.getAllTemplate();  
              this.listTemplate = this.listAnjuran.concat(this.listRespon.concat(this.listHasil));
              this.toastr.success('Template Baru Sudah Dibuat', 'Sukses', {
                timeOut: 2000,
              });              
              // this.modalService.dismissAll();
              document.getElementById("closeModalTambahTemplate").click();     
                  

              this.idModalTambahTemplate = '';
              this.judulModalTambahTemplate = '';
              this.detailModalTambahTemplate = '';
              this.jenisModalTambahTemplate = '';
              
              // this.ngOnInit();
            } else {
                this.toastr.error(data.message, 'Error');
            }
          },(error: any) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
      } else {
        this.persiapanPasienPulangService.updateTemplate(body).subscribe(
          (data: any) => {
            //  //  console.log(data);
            if(data.success == true){
              this.selectTemplate = '';
              this.select2ListAnjuran = [];
              this.select2ListRespon = [];
              this.select2ListHasil = [];
              this.getAllTemplate();
              this.toastr.success('Template Sudah Diupdate', 'Sukses', {
                timeOut: 2000,
              });                
              // this.modalService.dismissAll();
              document.getElementById("closeModalTambahTemplate").click();     
              
              this.idModalTambahTemplate = '';
              this.judulModalTambahTemplate = '';
              this.detailModalTambahTemplate = '';
              this.jenisModalTambahTemplate = '';
              
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

  ambilDataPerNoRM(){
    this.persiapanPasienPulangService.getByNoRM(this.no_rm).subscribe(
      (data: any) => {
        console.log('ambilDataPerNoRM');
        console.log(data);
        // console.log(JSON.stringify(data));
        this.listNotransaksiPerNoRM = data.data;

      },(error: any) => console.log(error)
    );
  }

  ambilDataPerNoRMNoTransaksi(no_rm, no_transaksi, id){
    this.no_rm = no_rm;
    this.no_transaksi = no_transaksi;
    this.idPasienPulang = id;
    this.persiapanPasienPulangService.getByNoTransaksiNoRM(id).subscribe(
      (data: any) => {
        // console.log(data);
        // console.log(JSON.stringify(data));
        this.persiapanPasienPulang = data;
        if(this.persiapanPasienPulang.data){
          this.validasiCreateUpdate = "Update";
          
          this.pasangNilaiPerNoRMNoTransaksi(this.persiapanPasienPulang.data);
              // 
        } else {
          this.validasiCreateUpdate = "Create";
        }

      },(error: any) => console.log(error)
    );
  }

  pasangNilaiPerNoRMNoTransaksi(params){
    this.listObat = params.obatdibawapulang;
    
    // this.tanggal_pulang = moment(params.tanggal_pulang).format('DD-MM-yyyy');
    this.tanggal_pulang = params.tanggal_pulang;
    this.anjuran = params.anjuran;
    this.keterangan_anjuran = params.keterangan_anjuran;
    this.respon = params.respon;
    this.keterangan_respon = params.respon;
    this.hasil = params.hasil;
    this.keterangan_hasil = params.hasil;
    this.keterangan_lain = params.keterangan_lain;
    
  }

  getAllTemplate(){
    this.getTemplateAnjuran();
    this.getTemplateRespon();
    this.getTemplateHasil();

  }

  getTemplateAnjuran(){
    this.persiapanPasienPulangService.getTemplateAnjuran().subscribe(
      (data: any) => {
         this.listAnjuran = data.data;
         this.pasangListTemplate(); 
         this.pasangNilaiSelect2ListAnjuran(this.listAnjuran);
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );    
  }

  pasangNilaiSelect2ListAnjuran(array){
    array.forEach((element,index)=>{
      this.select2ListAnjuran.push({
        value: element.judul,
        label: element.judul
      });
    });
    // console.log('select2ListDokter');
    // console.log(this.select2ListDokter);
  }

  pasangNilaiAnjuran(params){
    this.listAnjuran.forEach((element, index)=>{
      if(element.judul == params.value){
        this.keterangan_anjuran = element.isi
      }
    });
  }

  getTemplateRespon(){
    this.persiapanPasienPulangService.getTemplateRespon().subscribe(
      (data: any) => {
         this.listRespon = data.data;
         this.pasangListTemplate(); 
         this.pasangNilaiSelect2ListRespon(this.listRespon);
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );    
  }
  
  pasangNilaiSelect2ListRespon(array){
    array.forEach((element,index)=>{
      this.select2ListRespon.push({
        value: element.judul,
        label: element.judul
      });
    });
    // console.log('select2ListDokter');
    // console.log(this.select2ListDokter);
  }

  pasangNilaiRespon(params){
    this.listRespon.forEach((element, index)=>{
      if(element.judul == params.value){
        this.keterangan_respon = element.isi
      }
    });
  }

  getTemplateHasil(){
    this.persiapanPasienPulangService.getTemplateHasil().subscribe(
      (data: any) => {
         this.listHasil = data.data;
         this.pasangListTemplate(); 
         this.pasangNilaiSelect2ListHasil(this.listHasil);
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );    
  }
  
  pasangNilaiSelect2ListHasil(array){
    array.forEach((element,index)=>{
      this.select2ListHasil.push({
        value: element.judul,
        label: element.judul
      });
    });
    // console.log('select2ListDokter');
    // console.log(this.select2ListDokter);
  }

  pasangNilaiHasil(params){
    this.listHasil.forEach((element, index)=>{
      if(element.judul == params.value){
        this.keterangan_hasil = element.isi
      }
    });
  }

  tambahArrayListObat(){
    if(this.arrayObat == ''){
      this.toastr.error('Harap Lengkapi Field Obat', 'Error', {
        timeOut: 2000,
      });               
    } else if(this.arrayLabel == ''){
      this.toastr.error('Harap Lengkapi Field Label Obat', 'Error', {
        timeOut: 2000,
      });               
    } else{
      this.listObat.push({
        // kode_diagnosa_sekunder:this.arrayKodeDiagnosaSekunder,
        obat:this.arrayObat,
        label:this.arrayLabel
  
      });
      this.arrayObat = '';
      this.arrayLabel = '';
      this.toastr.success('Daftar obat sudah ditambahkan', 'Sukses', {
        timeOut: 2000,
      });                
    }
  }

  hapusArrayListObat(params){
    this.listObat.splice(params,1);
    this.toastr.success('Daftar obat sudah dihapus', 'Sukses', {
      timeOut: 2000,
    });                
  }

  // Modal
  openModalTemplate(content) {
    this.pasangListTemplate();
    this.modalService.open(content, {ariaLabelledBy: 'modal-template'}).result.then((result) => {
      this.closeResultModalTemplate = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModalTemplate = `Dismissed ${this.getDismissReasonModalTemplate(reason)}`;
    });
  }
  
  private getDismissReasonModalTemplate(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  pasangListTemplate(){
    if(this.selectTemplate == ''){
      this.listTemplate = this.listAnjuran.concat(this.listRespon.concat(this.listHasil));
    } else if(this.selectTemplate == 'Anjuran'){
      this.listTemplate = this.listAnjuran;
    } else if(this.selectTemplate == 'Respon'){
      this.listTemplate = this.listRespon;
    } else if(this.selectTemplate == 'Hasil'){
      this.listTemplate = this.listHasil;
    }
    
  }

  openModalTambahTemplate(content, id) {
    this.idModalTambahTemplate = id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-tambah-template'}).result.then((result) => {
      this.closeResultModalTambahTemplate = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModalTambahTemplate = `Dismissed ${this.getDismissReasonModalTambahTemplate(reason)}`;
    });
  }
  
  private getDismissReasonModalTambahTemplate(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  pasangNilaiModal(params){
    this.idModalTambahTemplate = params.id;
    this.judulModalTambahTemplate = params.judul;
    this.detailModalTambahTemplate = params.isi;
    this.jenisModalTambahTemplate = params.jenis;

  }



  




}
