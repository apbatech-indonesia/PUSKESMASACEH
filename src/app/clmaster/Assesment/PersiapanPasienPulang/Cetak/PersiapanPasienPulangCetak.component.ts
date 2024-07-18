import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  faSearch,faCheck, faTrash, faWindowClose, faPlusCircle, faPrint
} from '@fortawesome/free-solid-svg-icons';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe, formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { printDiv } from 'src/library/print/print-div';

import { PersiapanPasienPulangService } from '../Service/persiapanpasienpulang.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

import * as moment from 'moment';

@Component({
    selector: 'app-PersiapanPasienPulangCetak',
    templateUrl: './PersiapanPasienPulangCetak.component.html',
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
  export class PersiapanPasienPulangCetakComponent implements OnInit {
    heading = 'Persiapan Pasien Pulang';
    subheading :any;
    icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

    faPrint = faPrint;

    dataPasien = [];
    tanggalLahirPasien:any = '';
  
    dataPasienPulang = [];

    // Session
    username:any;
    // Main Data Input
    no_rm:any = '';
    no_transaksi:any = '';
    
    idPasienPulang: any = '';
    tanggal_pulang: any = '';
    anjuran: any = '';
    keterangan_anjuran: any = '';
    respon: any = '';
    keterangan_respon: any = '';
    hasil: any = '';
    keterangan_hasil: any = '';
    keterangan_lain: any = '';
    listObat = [];
  
    constructor(
      public http :HttpClient,
      private router: Router,
      private route: ActivatedRoute,
      private modalService: NgbModal,
      public toastr: ToastrService, 
      private apiService:PersiapanPasienPulangService, 
      private fb: FormBuilder,
      public datepipe: DatePipe,
      ) {
      // this.options = fb.group({
      //   hideRequired: false,
      //   floatLabel: 'auto',
      // });

    }

    ngOnInit(): void {
      this.username = localStorage.getItem('username');
      this.no_rm = localStorage.getItem('noRM');
      this.no_transaksi = localStorage.getItem('noTransaksi');
      this.idPasienPulang = this.route.snapshot.params.id;
      
      this.ambilDataPasien();
      this.ambilDataPasienPulang();
      
    }

    cetakParams(idPage){
      printDiv(idPage);
      // window.print();
    }
  
    cetak(){
      printDiv('halamanCetak');
      // window.print();
    }

    ambilDataPasien(){
      this.apiService.getDataPasien(this.no_rm).subscribe(
        (data: any) => {
          this.dataPasien = data.pasien[0];
          this.tanggalLahirPasien = this.pasangNamaHari(this.dataPasien['tgllahir']);
        },(error: any) => console.log(error)
      );
    }

    ambilDataPasienPulang(){  
      this.apiService.getByNoTransaksiNoRM(this.route.snapshot.params.id).subscribe(
        (data: any) => {
          console.log(data);
          this.dataPasienPulang = data.data;

          this.tanggal_pulang = this.pasangNamaHari(this.dataPasienPulang['tanggal_pulang']);
          this.anjuran = this.dataPasienPulang['anjuran'];
          this.keterangan_anjuran = this.dataPasienPulang['keterangan_anjuran'];
          this.respon = this.dataPasienPulang['respon'];
          this.keterangan_respon = this.dataPasienPulang['keterangan_respon'];
          this.hasil = this.dataPasienPulang['hasil'];
          this.keterangan_hasil = this.dataPasienPulang['keterangan_hasil'];
          this.keterangan_lain = this.dataPasienPulang['keterangan_lain'];
          this.listObat = this.dataPasienPulang['obatdibawapulang'];
        },(error: any) => console.log(error)
      );    

    }
  
    pasangNamaHari(tanggal){
      const tanggalBaru = new Date(tanggal).getDay();
      let hari = '';
      if(tanggalBaru == 0){
        hari = 'Minggu';
      } else if(tanggalBaru == 1){
        hari = 'Senin';
      } else if(tanggalBaru == 2){
        hari = 'Selasa';
      } else if(tanggalBaru == 3){
        hari = 'Rabu';
      } else if(tanggalBaru == 4){
        hari = 'Kamis';
      } else if(tanggalBaru == 5){
        hari = 'Jumat';
      } else if(tanggalBaru == 6){
        hari = 'Sabtu';
      } else {
        hari = '';
      }
      return hari + ', ' + this.datepipe.transform(tanggal, 'dd-MM-yyyy');
    }

      
  }
  