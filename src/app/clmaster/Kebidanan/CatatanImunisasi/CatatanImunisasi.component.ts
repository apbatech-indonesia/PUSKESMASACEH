import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ApiserviceService } from 'src/app/apiservice.service';
import { EmrService } from './Service/Emr.service';
import { DatePipe } from '@angular/common';
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-CatatanImunisasi',
  templateUrl: './CatatanImunisasi.component.html',
  styles: [
    ``
  ],
  providers: [DatePipe],
})


export class CatatanImunisasiComponent implements OnInit {
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];
  currentPage: number = 1;
  pageSize: number = 10;
  imnsPage: any = [];

  page: any = {};
  currentDate: any;

  searchForm: FormGroup;

  cari: any = {};
  cariNew: any = {};
  imns: any = {};
  imnsList: any = [];
  imnsForm: FormGroup;

  cekList: any = [];
  dokterList: any = [];
  pasienList: any = [];
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
  ) { }

  ngOnInit() {
    this.page.username = localStorage.getItem('username');
    this.currentDate = new Date();
    this.page.current_date = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    let startDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    this.cari.tanggal_mulai = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    this.cari.tanggal_akhir = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.search();
    this.initImns();
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

  initImns() {
    this.imns = {};
    this.imnsForm = this.fb.group({
      no_rm: ['', [Validators.required]],
      nik: ['', [Validators.required]],
    });
    // this.bumil.no_transaksi = this.page.no_transaksi;
    this.imns.username = this.page.username;
    this.imns.tanggal_kunjungan = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  update() {
    let body = this.imns;
    this.emrServ.update(body)
      .subscribe(response => {
        if (response.success == true) {
          this.toastr.success('', 'Ubah data berhasil', {
            timeOut: 2000,
          });
          // this.initImns();
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
    this.imnsPage = this.imnsList.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.search();
  }

  store() {
    this.imns.faskes = 'a11';
    this.imns.sasaran_atau_tahun = 'a12';
    this.imns.tgl_mulai = this.page.current_date;
    this.imns.tgl_akhir = this.page.current_date;
    let body = this.imns;
    console.log('store a11');
    // console.log(this.currentDate);
    // console.log(this.page);
    console.log(body);
    this.emrServ.create(body)
      .subscribe(response => {
        if (response.success == true) {
          this.toastr.success('', 'Tambah data berhasil', {
            timeOut: 2000,
          });
          this.initImns();
          this.modalService.dismissAll();
          this.search();
        } else {
          this.toastr.error(response.message, 'Gagal');
        }
      }, Error => {
        this.toastr.error(Error.error.message, 'Gagal');
       });
  }

  search() {
    console.log('list a11a');
    this.cariNew = {...this.cari};
    let tglMulai = this.cari.tanggal_mulai;
    console.log(tglMulai);
    this.cariNew.year = tglMulai.substr(0,4);
    this.cariNew.month = this.monthIndo[tglMulai.substr(5,2)];
    console.log(this.cariNew);
    localStorage.setItem('tanggal_mulai', this.cariNew.tanggal_mulai);
    localStorage.setItem('tanggal_akhir', this.cariNew.tanggal_akhir);
    localStorage.setItem('nik', this.cariNew.nik);
    localStorage.setItem('nama_bayi', this.cariNew.nama_bayi);
    this.emrServ.list(this.cari)
      .subscribe(resp => {
        if (resp.success == true) {
          this.imnsList = resp.data;
          this.getPaginatedData();
          // console.log(this.imnsList);
        } else {
          this.toastr.error(resp.message, 'Gagal');
        }
      });
  }

  showCreate(content) {
    this.initImns();
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  showEdit(content, id) {
    this.initImns();
    this.show(id);
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  show(id) {
    this.emrServ.show(id)
      .subscribe(response => {
        if (response) {
          this.imns = response.data;
          console.log(this.imns.dokter + 'a13');
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
    this.emrServ.pasienList('')
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
