import { Component, OnInit ,ViewChild,ElementRef, EventEmitter} from '@angular/core';
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
  faPlusCircle,
  faPencilAlt,
  faPrint
} from '@fortawesome/free-solid-svg-icons';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';

import { PersetujuanTindakanMedisService } from './Service/persetujuantindakanmedis.service';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { ApiserviceService } from 'src/app/apiservice.service';

// import {
//   Select2Data,
//   Select2ScrollEvent,
//   Select2SearchEvent,
//   Select2UpdateEvent,
// } from 'ng-select2-component';

import * as moment from 'moment';

@Component({
  selector: 'app-PersetujuanTindakanMedis',
  templateUrl: './PersetujuanTindakanMedis.component.html',
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
export class PersetujuanTindakanMedisComponent implements OnInit {
  @ViewChild('signature')
  public signaturePad: SignaturePadComponent;
  
  public signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 500,
    'canvasHeight': 300,
    'penColor': 'rgb(3, 3, 255)',
  
  
    'backgroundColor': 'rgb(252, 252, 252)',
  };
  
  heading = 'Formulir Persetujuan Tindakan Medis';
  subheading :any;
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  // Validasi file Create / Update
  validasiCreateUpdate = '';

  // Icon
  faCheck = faCheck;
  faTrash = faTrash;
  faWindowClose = faWindowClose;
  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
  faPrint = faPrint;

  // Session
  username:any;
  // Main Data Input
  no_rm:any;
  no_transaksi:any;

  listNotransaksiPerNoRM:any;

  persetujuanTindakanMedis: any = [];

  idPersetujuanTindakanMedis:any='';

  // Biodata Keluarga
  namaKeluarga:any='';
  nikKeluarga:any='';
  tempatLahirKeluarga:any='';
  tanggalLahirKeluarga:any='';
  jenisKelaminKeluarga:any='';
  alamatKeluarga:any='';
  telpKeluarga:any='';
  hubunganDenganPasien:any='';

  // BiodataPasien
  namaPasien:any='';
  nikPasien:any='';
  tempatLahirPasien:any='';
  tanggalLahirPasien:any='';
  jenisKelaminPasien:any='';
  alamatPasien:any='';
  telpPasien:any='';

  // Tindakan Medis
  tindakanMedis:any='';

  kota:any='';
  tanggal:any='';sg
  dokter:any='';

  // List
  listDokter: any = [];
  select2ListDokter:  any= [];

  // Disabled
  disabledButtonSimpan = true;

  
  constructor(
    public http :HttpClient,
    private datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService, 
    private apiService:PersetujuanTindakanMedisService, 
    private fb: FormBuilder,
    private authService:ApiserviceService
    ) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });
  }

  formIsi = this.fb.group({
    // Main Data Input
    no_rm: ['',Validators.required],
    no_transaksi: ['',Validators.required],

    // Biodata Keluarga
    namaKeluarga: ['',Validators.required],
    nikKeluarga: ['',Validators.required],
    tempatLahirKeluarga: ['',Validators.required],
    tanggalLahirKeluarga: ['',Validators.required],
    jenisKelaminKeluarga: ['',Validators.required],
    alamatKeluarga: ['',Validators.required],
    telpKeluarga: ['',Validators.required],
    hubunganDenganPasien: ['',Validators.required],

    // BiodataPasien
    namaPasien: ['',Validators.required],
    nikPasien: ['',Validators.required],
    tempatLahirPasien: ['',Validators.required],
    tanggalLahirPasien: ['',Validators.required],
    jenisKelaminPasien: ['',Validators.required],
    alamatPasien: ['',Validators.required],
    telpPasien: ['',Validators.required],

    // Tindakan Medis
    tindakanMedis: ['',Validators.required],
    kota: ['',Validators.required],
    tanggal: ['',Validators.required],
    dokter: ['',Validators.required],
    
  });

  kdcabang:any;
  pipe = new DatePipe('en-US');
  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.no_rm = localStorage.getItem('noRM');
    this.no_transaksi = localStorage.getItem('noTransaksi');
    this.kdcabang = localStorage.getItem('kdcabang');
    this.tanggalLahirKeluarga =this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.tanggalLahirPasien = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.tanggal = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

    this.ambilSemuaDataDokter();
    this.ambilDataPerNoRMNoTransaksi(this.no_rm, this.no_transaksi);
    this.ambilDataPerNoRM();
    this.searchDokter()
    setTimeout(() => {
      this.tampildata()
    }, 150);

  }

  simpan(){
    this.checkValidasiSimpan();
    if(this.disabledButtonSimpan == true){
      this.toastr.error('Harap lengkapi form terlebih dahulu', 'Error', {
        timeOut: 2000,
      });                
    } else {
      let body = {
        "no_rm":this.no_rm,
        "no_transaksi":this.no_transaksi,
        "username" : this.username,
        "id" : this.idPersetujuanTindakanMedis,
        "nama_pengunjung" : this.namaKeluarga,
        "nik_pengunjung" : this.nikKeluarga,
        "tempat_lahir_pengunjung" : this.tempatLahirKeluarga,
        "tanggal_lahir_pengunjung" : this.tanggalLahirKeluarga,
        "jenis_kelamin_pengunjung" : this.jenisKelaminKeluarga,
        "alamat_pengunjung" : this.alamatKeluarga,
        "no_hp_pengunjung" : this.telpKeluarga,
        
        "tindakan_medis_berupa" : this.tindakanMedis,
        "tindakan_medis_kepada" : this.hubunganDenganPasien,
        "nama" : this.namaPasien,
        "nik" : this.nikPasien,
        "tempat_lahir" : this.tempatLahirPasien,
        "tanggal_lahir" : this.tanggalLahirPasien,
        "jenis_kelamin" : this.jenisKelaminPasien,
        "alamat" : this.alamatPasien,
        "no_hp" : this.telpPasien,
        
        "tempat" : this.kota,
        "tanggal_persetujuan" : this.tanggal,
        "dokter" : this.dokter,
        "saksi1" : this.dokter,
        "saksi2" : this.namaKeluarga
      }

      console.log(body);
  
      if(this.validasiCreateUpdate == 'Create'){
        this.apiService.simpan(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Persetujuan Tindakan Medis sudah dibuat', 'Sukses', {
                timeOut: 2000,
              });                
              this.ambilDataPerNoRM();
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
        this.apiService.update(body).subscribe(
          (data: any) => {
            //  console.log(data);
            if(data.success == true){
              this.toastr.success('Persetujuan Tindakan Medis sudah diupdate', 'Sukses', {
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

  checkValidasiSimpan(){
    if(this.namaKeluarga == '' || this.nikKeluarga == '' || this.tempatLahirKeluarga == '' || this.tanggalLahirKeluarga == '' ||
    this.jenisKelaminKeluarga == '' || this.alamatKeluarga == '' || this.telpKeluarga == '' || this.hubunganDenganPasien == '' || 
    this.namaPasien == '' || this.nikPasien == '' || this.tempatLahirPasien == '' || this.tanggalLahirPasien == '' ||  
    this.jenisKelaminPasien == '' || this.alamatPasien == '' || this.telpPasien == '' || this.tindakanMedis == '' ||  
    this.kota == '' || this.tanggal == '')
    {
      this.disabledButtonSimpan = true;
    } else {
      this.disabledButtonSimpan = false;
    }
    

  }
  
  ambilDataPerNoRMNoTransaksi(no_rm, no_transaksi){
    console.log("ambilDataPerNoRMNoTransaksi");
    this.no_rm = no_rm;
    this.no_transaksi = no_transaksi;
    this.apiService.getByNoTransaksiNoRM(this.no_rm, this.no_transaksi).subscribe(
      (data: any) => {
        // console.log(data);
        // console.log(JSON.stringify(data));
        this.persetujuanTindakanMedis = data;
        if(this.persetujuanTindakanMedis.data[0]){
          this.validasiCreateUpdate = "Update";
          
          this.pasangNilaiPerNoRMNoTransaksi(this.persetujuanTindakanMedis.data[0]);
              
        } else {
          this.validasiCreateUpdate = "Create";
        }
        // this.validasiCreateUpdate = "Create";
        // console.log("Nilai Kep UGD");
        // console.log(this.asesmentKepUGD.assesment_kep_ugd[0]);

      },(error: any) => console.log(error)
    );
  }

  ambilDataPerNoRM(){
    this.apiService.getByNoRM(this.no_rm).subscribe(
      (data: any) => {
        console.log('ambilDataPerNoRM');
        console.log(data);
        // console.log(JSON.stringify(data));
        this.listNotransaksiPerNoRM = data.data;

      },(error: any) => console.log(error)
    );
  }

  pasangNilaiPerNoRMNoTransaksi(params){
    this.idPersetujuanTindakanMedis = params.id;
    // Biodata Keluarga
    this.namaKeluarga = params.nama_pengunjung;
    this.nikKeluarga = params.nik_pengunjung;
    this.tempatLahirKeluarga = params.tempat_lahir_pengunjung;
    this.tanggalLahirKeluarga = params.tanggal_lahir_pengunjung;
    this.jenisKelaminKeluarga = params.jenis_kelamin_pengunjung;
    this.alamatKeluarga = params.alamat_pengunjung;
    this.telpKeluarga = params.no_hp_pengunjung;
    this.hubunganDenganPasien = params.tindakan_medis_kepada;

    // Biodata Pasien
    this.namaPasien = params.nama;
    this.nikPasien = params.nik;
    this.tempatLahirPasien = params.tempat_lahir;
    this.tanggalLahirPasien = params.tanggal_lahir;
    this.jenisKelaminPasien = params.jenis_kelamin;
    this.alamatPasien = params.alamat;
    this.telpPasien = params.no_hp;

    // Tindakan Medis
    this.tindakanMedis = params.tindakan_medis_berupa;
    this.kota = params.tempat;
    this.tanggal = params.tanggal_persetujuan;
    this.dokter = params.dokter;
    
    
  }

  ambilSemuaDataDokter(){
    this.apiService.getAllDokter().subscribe(
      (data: any) => {
        this.listDokter = data.dokter;
        
        this.pasangNilaiSelect2ListDokter(this.listDokter);
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
    
  }
  
  pasangNilaiSelect2ListDokter(array){
    array.forEach((element,index)=>{
      this.select2ListDokter.push({
        value: element.namdokter,
        label: element.namdokter
      });
    });
    // console.log('select2ListDokter');
    // console.log(this.select2ListDokter);
  }

  addDatePickerTanggal(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(moment(event.value).format('yyyy-MM-DD'));
    this.tanggal = moment(event.value).format('yyyy-MM-DD');
  }

  addDatePickerTanggalLahirKeluarga(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(moment(event.value).format('yyyy-MM-DD'));
    this.tanggalLahirKeluarga = moment(event.value).format('yyyy-MM-DD');
  }

  addDatePickerTanggalLahirPasien(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(moment(event.value).format('yyyy-MM-DD'));
    this.tanggalLahirPasien = moment(event.value).format('yyyy-MM-DD');
  }


  tampildata(){
    this.authService.datapasien(this.kdcabang,this.no_transaksi)
.subscribe(
 data => {
   for (let x of data )
   {
    //  this.norm =x.norm
    //            this.kdpoli = x.kdpoli
    //            this.tglpriksa = x.tglpriksa

    //            this.kdkostumerd = x.kdkostumerd
    //            this.kdkostumer = x.kdkostumer
    //            this.notransaksi = x.notransaksi
               this.namaPasien = x.pasien
    //            this.tgllahir = x.tgllahir
    //            this.noantrian = x.noantrian
    //            this.nampoli = x.nampoli
    //            this.namdokter = x.namdokter
    //            this.namacus = x.nama
    //            this.costumer = x.costumer
               this.tempatLahirPasien = x.alamat
               this.alamatPasien = x.alamat
           
    //            this.kdtarif = x.kdtarif
    //            this.kelas = x.kelas;
    //            this.umur = x.umur;
    //            this.dash = x.dash
    //            this.ststarif = x.sts;
    //            this.igdorrj = x.sts;
    //            this.noasuransi = x.noasuransi;
    //            this.kdpolibpjs = x.kdpolibpjs;
    //            this.kddokterbpjs = x.kddokterbpjs;
    //            this.tgldaftar = x.tgldaftar
    //            this.spcare = x.spcare
    //            this.nokunjungan = x.nokunjungan
    //            this.skunjungan = x.skunjungan;
    //            this.stspulang = x.jeniskunjungan;
    //            this.tandapengenal=x.tandapengenal
    //            this.nopengenal=x.nopengenal
    //            this.kdprovider=x.kdprovider
    //            this.hp=x.hp;
    //            this.jeniskelamin = x.jeniskelamin

    if(x.jeniskelamin === 'P'){
      this.jenisKelaminPasien = 'Perempuan'
    }else{
      this.jenisKelaminPasien = 'Laki - Laki'
    }


             
    //            if(this.skunjungan === '1'){
    //              this.tombollihatcetakpcare = true;
            
                
           
    //            }else{
    //              this.tombollihatcetakpcare = false;
            
    //            }



   }


   



},
 Error => {

  console.log(Error)
 }
)







}

  
searchDokter() {
  this.apiService.dokterList()
    .subscribe(response => {
      if(response.success == true){
        this.select2ListDokter = response.dokter;
      }else{
        console.log('Gagal BE proses, '+response.message);
      }
      });
}
  
}
