import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ApiserviceService } from 'src/app/apiservice.service';
import { EmrService } from './Service/Emr.service';
import { DatePipe } from '@angular/common';
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-BukuKontrasepsi',
  templateUrl: './BukuKontrasepsi.component.html',
  styles: [
    ``
  ],
  providers: [DatePipe],
})


export class BukuKontrasepsiComponent implements OnInit {
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];
  currentPage: number = 1;
  pageSize: number = 10;
  ktssPage: any = [];

  page: any = {};
  currentDate: any;

  ktss: any = [];
  ktssList: any = [];
  cari: any = {};
  cariNew: any = {};
  ktssForm: FormGroup;

  ktssBaru: any = [];
  ktssCabut: any = [];
  ktssPasangUlang: any = [];
  ktssBeriUlang: any = [];
  pasienList: any = [];
  cekList: any = [];
  dokterList: any = [];
  monthIndo: any = {
    '01': "Januari",
    '02': "Februari",
    '03': "Maret",
    '04': "April",
    '05': "Mei",
    '06': "Juni",
    '07': "Juli",
    '08': "Agustus",
    '09': "September",
    '10': "Oktober",
    '11': "November",
    '12': "Desesmber",
  }

  constructor(
    public toastr: ToastrService,
    private modalService: NgbModal,
    // private servApi: ApiserviceService,
    private emrServ: EmrService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.page.username = localStorage.getItem('username');

    console.log(this.page.username)
    this.currentDate = new Date();
    this.cari.tanggal_mulai = '2024-01-01';
    this.cari.tanggal_akhir = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.search();
    this.initKtss();
    this.searchDokter();
    this.getPasien();
  }

  print() {
    const printContents = document.getElementById('contentToPrint').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();

    document.body.innerHTML = originalContents;
  }

  initKtss() {
    this.ktss = {};
    this.ktssForm = this.fb.group({
      tanggal: ['', [Validators.required]],
      no_rm: ['', [Validators.required]],
      dokter: ['', [Validators.required]],
    });
    this.ktss.username = this.page.username;
    this.ktss.tanggal = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.ktssBaru = [
      {
        "label": "iud",
        "key": "iud",
        "value": null
      },
      {
        "label": "mow",
        "key": "mow",
        "value": null
      },
      {
        "label": "mop",
        "key": "mop",
        "value": null
      },
      {
        "label": "kondom",
        "key": "kondom",
        "value": null
      },
      {
        "label": "implant",
        "key": "implant",
        "value": null
      },
      {
        "label": "suntikan",
        "key": "suntikan",
        "value": null
      },
      {
        "label": "pil",
        "key": "pil",
        "value": null
      },
    ]
    this.ktssCabut = [
      {
        "label": "iud",
        "key": "pencabutan_iud",
        "value": null
      },
      {
        "label": "implant",
        "key": "pencabutan_implant",
        "value": null
      },
    ]
    this.ktssPasangUlang = [
      {
        "label": "iud",
        "key": "pasang_ulang_iud",
        "value": null
      },
      {
        "label": "implant",
        "key": "pasang_ulang_implant",
        "value": null
      },
    ]
    this.ktssBeriUlang = [
      {
        "label": "kondom",
        "key": "kontrasepsi_ulang_kondom",
        "value": null
      },
      {
        "label": "suntikan",
        "key": "kontrasepsi_ulang_suntikan",
        "value": null
      },
      {
        "label": "pill",
        "key": "kontrasepsi_ulang_pil",
        "value": null
      },
    ]
  }

  getBodyKtss(){
    let body = {
      ...this.ktss,
      "iud": "",
      "mow": "",
      "mop": "",
      "pencabutan_iud": "",
      "pencabutan_implant": "",
    }
    body[this.ktss.peserta_baru_metode] = '1';
    body['pencabutan_'+this.ktss.pencabutan] = '1';
    this.ktssBaru.forEach( (v,k) => {
      // console.log(this.ktssBaru[k].key);
      // console.log(this.ktssBaru[k].value);
      if(this.ktssBaru[k].value){
        body[this.ktssBaru[k].key] = '1';
      }else{
        body[this.ktssBaru[k].key] = '0';
      }
    });
    this.ktssPasangUlang.forEach( (v,k) => {
      if(this.ktssPasangUlang[k].value){
        body[this.ktssPasangUlang[k].key] = '1';
      }else{
        body[this.ktssPasangUlang[k].key] = '0';
      }
    });
    this.ktssCabut.forEach( (v,k) => {
      if(this.ktssCabut[k].value){
        body[this.ktssCabut[k].key] = '1';
      }else{
        body[this.ktssCabut[k].key] = '0';
      }
    });
    this.ktssBeriUlang.forEach( (v,k) => {
      if(this.ktssBeriUlang[k].value){
        body[this.ktssBeriUlang[k].key] = '1';
      }else{
        body[this.ktssBeriUlang[k].key] = '0';
      }
    });
    return body; 
  }

  update() {
    let body = this.getBodyKtss();
    this.emrServ.update(body)
      .subscribe(response => {
        if (response.success == true) {
          this.toastr.success('', 'Ubah data berhasil', {
            timeOut: 2000,
          });
          // this.initKtss();
          this.search();
          this.modalService.dismissAll();
        } else {
          this.toastr.error(response.message, 'Gagal');
        }
      })
  }

  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.ktssPage = this.ktssList.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.search();
  }

  store() {
    // this.ktss.faskes = 'a11';
    // this.ktss.sasaran_atau_tahun = 'a12';
    // this.ktss.tgl_mulai = '2024-11-11';
    // this.ktss.tgl_akhir = '2024-11-12';
    // let body = this.ktss;
    let body = this.getBodyKtss();
    console.log('store a11');
    console.log(body);
    this.emrServ.create(body)
      .subscribe(response => {
        if (response.success == true) {
          this.toastr.success('', 'Tambah data berhasil', {
            timeOut: 2000,
          });
          this.initKtss();
          this.modalService.dismissAll();
          this.search();
        } else {
          this.toastr.error(response.message, 'Gagal');
        }
      })
  }

  search() {
    console.log('list a11a'); 
    //handle value null ketika hapus ng-select dokter 
    this.cari.dokter = this.cari.dokter ?? ''; 
    this.cariNew = {...this.cari};
    let tglMulai = this.cari.tanggal_mulai;
    console.log(tglMulai);
    this.cariNew.year = tglMulai.substr(0,4);
    this.cariNew.month = this.monthIndo[tglMulai.substr(5,2)];
    localStorage.setItem('tanggal_mulai', this.cariNew.tanggal_mulai);
    localStorage.setItem('tanggal_akhir', this.cariNew.tanggal_akhir);
    localStorage.setItem('dokter', this.cariNew.dokter);
    localStorage.setItem('nama', this.cariNew.nama);
    this.emrServ.list(this.cari)
      .subscribe(resp => {
        if(resp.success == true){
          this.ktssList = resp.data;
          this.getPaginatedData()
          // console.log(this.ktss);
        }else{
          this.toastr.error(resp.message, 'Gagal');
        }
      });
  }

  showCreate(content) {
    this.initKtss();
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  showEdit(content, id) {
    this.initKtss();
    this.show(id);
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  show(id) {
    this.emrServ.show(id)
      .subscribe(response => {
        if (response.success == true) {
          this.ktss = response.data;
          console.log('ulang a11');
          this.ktssBaru.forEach((v,k) => {
            // if(this.ktss.hasOwnProperty(v.key)){
            if(this.ktss[v.key] == '1'){
              this.ktssBaru[k].value = true;
            }else{
              this.ktssBaru[k].value = false;
            }
          });
          this.ktssPasangUlang.forEach((v,k) => {
            if(this.ktss[v.key] == '1'){
              this.ktssPasangUlang[k].value = true;
            }else{
              this.ktssPasangUlang[k].value = false;
            }
          });
          this.ktssCabut.forEach((v,k) => {
            if(this.ktss[v.key] == '1'){
              this.ktssCabut[k].value = true;
            }else{
              this.ktssCabut[k].value = false;
            }
          });
          this.ktssBeriUlang.forEach((v,k) => {
            if(this.ktss[v.key] == '1'){
              this.ktssBeriUlang[k].value = true;
            }else{
              this.ktssBeriUlang[k].value = false;
            }
          });
          // console.log(this.ktssBeriUlang);
        } else {
          this.toastr.error(response.message, 'Gagal');
        }
      });
  }

  delete(id){
    let isDelete = confirm('Apakah anada yakin menghapus data?');
    if(isDelete){
      this.emrServ.delete(id)
      .subscribe(resp => {
        if(resp.success == true){
          this.toastr.success('', 'Hapus data berhasil', {
            timeOut: 2000,
          });
          this.search();
        }else {
          this.toastr.error(resp.message, 'Gagal');
        }
      });
    }
  }

  searchDokter() {
    this.emrServ.dokterList()
      .subscribe(response => {
        if (response.success == true) {
          this.dokterList = response.dokter;
        } else {
          console.log('Gagal BE proses, ' + response.message);
        }
      });
  }

  caripasien(a){
    this.emrServ.pasienList(a.target.value)
    .subscribe(response => {
      if (response.success == true) {
        let pasienListOri = response.pasien;
        this.pasienList = pasienListOri.map(function (val, key) {
          return {
            pasien_label: val.pasien + '(' + val.norm + ')',
            pasien_value: val.pasien + '(' + val.norm + ')',
            pasien_nama: val.pasien,
            pasien_norm: val.norm,
          }
        });
      } else {
        console.log('Gagal BE proses, ' + response.message);
      }
    });
  }
  getPasien() {
    this.emrServ.pasienList('a')
      .subscribe(response => {
        if (response.success == true) {
          let pasienListOri = response.pasien;
          this.pasienList = pasienListOri.map(function (val, key) {
            return {
              pasien_label: val.pasien + '(' + val.norm + ')',
              pasien_value: val.pasien + '(' + val.norm + ')',
              pasien_nama: val.pasien,
              pasien_norm: val.norm,
            }
          });
        } else {
          console.log('Gagal BE proses, ' + response.message);
        }
      });
  }

}
