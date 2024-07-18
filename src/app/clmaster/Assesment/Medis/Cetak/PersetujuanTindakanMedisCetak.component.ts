import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  faSearch,faCheck, faTrash, faWindowClose, faPlusCircle, faPrint, faBookMedical
} from '@fortawesome/free-solid-svg-icons';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe, formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';


import { PersetujuanTindakanMedisService } from '../Service/persetujuantindakanmedis.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

import * as moment from 'moment';
// import { printDiv } from 'src/library/print/print-div';



@Component({
    selector: 'app-PersetujuanTindakanMedisCetak',
    templateUrl: './PersetujuanTindakanMedisCetak.component.html',
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
  export class PersetujuanTindakanMedisCetakComponent implements OnInit {
    heading = 'Persetujuan Tindakan Medis (Informed Concent)';
    subheading :any;
    icon = 'pe-7s-diamond icon-gradient bg-warm-flame';
  
    // Validasi file Create / Update
    validasiCreateUpdate = '';
  
    // Icon
    faCheck = faCheck;
    faTrash = faTrash;
    faWindowClose = faWindowClose;
    faPlusCircle = faPlusCircle;
    faPrint = faPrint;
    faBookMedical = faBookMedical;

    // Main Data
    id:any;
    username:any;
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
    tanggal:any='';
    dokter:any='';
  
    
    
    constructor(
        public http :HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public toastr: ToastrService, 
        private apiService:PersetujuanTindakanMedisService, 
        private fb: FormBuilder,
        public datepipe: DatePipe,
        ) {
        // this.options = fb.group({
        //   hideRequired: false,
        //   floatLabel: 'auto',
        // });
    }

    ngOnInit() {
      this.username = localStorage.getItem('username');
      this.no_rm = localStorage.getItem('noRM');
      this.no_transaksi = localStorage.getItem('noTransaksi');
        
      this.ambilDataPerNoRMNoTransaksi();
      setTimeout(() => {
        window.print();
      }, 2500);
 
    }
   
    cetakParams(idPage){
      // printDiv(idPage);
      // window.print();
    }
  
    cetak(){
      //
      // window.print();
    }
  
    ambilDataPerNoRMNoTransaksi(){
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

    pasangNilaiPerNoRMNoTransaksi(params){
      this.idPersetujuanTindakanMedis = params.id;
      // Biodata Keluarga
      this.namaKeluarga = params.nama_pengunjung;
      this.nikKeluarga = params.nik_pengunjung;
      this.tempatLahirKeluarga = params.tempat_lahir_pengunjung;
      this.tanggalLahirKeluarga = moment(params.tanggal_lahir_pengunjung).format('DD MMMM yyyy');
      this.jenisKelaminKeluarga = params.jenis_kelamin_pengunjung;
      this.alamatKeluarga = params.alamat_pengunjung;
      this.telpKeluarga = params.no_hp_pengunjung;
      this.hubunganDenganPasien = params.tindakan_medis_kepada;
  
      // Biodata Pasien
      this.namaPasien = params.nama;
      this.nikPasien = params.nik;
      this.tempatLahirPasien = params.tempat_lahir;
      this.tanggalLahirPasien = moment(params.tanggal_lahir).format('DD MMMM yyyy');
      this.jenisKelaminPasien = params.jenis_kelamin;
      this.alamatPasien = params.alamat;
      this.telpPasien = params.no_hp;
  
      // Tindakan Medis
      this.tindakanMedis = params.tindakan_medis_berupa;
      this.kota = params.tempat;
      this.tanggal = moment(params.tanggal_persetujuan).format('DD MMMM yyyy');
      this.dokter = params.dokter;
      
      
    }
    

  }