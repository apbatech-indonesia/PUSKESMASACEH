import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ApiserviceService } from 'src/app/apiservice.service';
import { EmrService } from './Service/Emr.service';
import { DatePipe } from '@angular/common';
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-KunjunganBumil',
  templateUrl: './KunjunganBumil.component.html',
  styles: [
    ``
  ],
  providers: [ DatePipe ],
})


export class KunjunganBumilComponent implements OnInit {
  pageSizeOptions: number[] = [2,5,10,25,100]; 
  currentPage: number = 1;
  pageSize: number = 10;
  bumilPage: any = [];

  page: any = {};
  currentDate: any;

  obatList: any = [];

  cari: any = {};
  cariNew: any = {};
  bumil: any = {};
  bumilList: any = [];
  bumilForm: FormGroup;

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
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    
    console.log('page a11');
    console.log(this.route.snapshot.paramMap.get('a'));
    console.log(this.route.snapshot.paramMap.get('tanggal_mulai'));
    console.log(this.route.snapshot.paramMap);
    // this.page.no_rm = localStorage.getItem('noRM');
    // this.page.no_transaksi = localStorage.getItem('noTransaksi');
    this.page.username = localStorage.getItem('username');
    this.currentDate = new Date();
    let startDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    this.cari.tanggal_mulai = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    this.cari.tanggal_akhir = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.search();
    this.initFormObMinta();
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

  initFormObMinta() {
    this.bumil = {};
    console.log(this.bumil.dokter+'a10');
    this.bumilForm = this.fb.group({
      no_rm: ['', [Validators.required]],
      dokter: ['', [Validators.required]],
      tanggal_kunjungan: ['', [Validators.required]],
    });
    // this.bumil.no_transaksi = this.page.no_transaksi;
    this.bumil.username = this.page.username;
    this.bumil.tanggal_kunjungan = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    console.log(this.bumil.dokter+'a10b');

  }

  update() {
    let body = this.bumil;
    this.emrServ.bumilUpdate(body)
      .subscribe(response => {
        if (response.success == true) {
          this.toastr.success('', 'Ubah data berhasil', {
            timeOut: 2000,
          });
          // this.initFormObMinta();
          this.search();
          this.modalService.dismissAll();
        } else {
          this.toastr.error(response.message, 'Gagal');
        }
      })
  }

  getPaginatedData(){
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.bumilPage = this.bumilList.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.search();
  }

  store() {
    this.bumil.tanggal = this.bumil.tanggal_kunjungan;
    let body = this.bumil; 
    console.log('store a11');
    console.log(body);
    this.emrServ.bumilCreate(body)
      .subscribe(response => {
        if (response.success == true) {
          this.toastr.success('', 'Tambah data berhasil', {
            timeOut: 2000,
          });
          this.initFormObMinta();
          this.modalService.dismissAll();
          this.search();
        } else {
          this.toastr.error(response.message, 'Gagal');
        }
      })
  }

  search(){
    console.log('new a11');
    //handle value null ketika hapus ng-select dokter 
    this.cari.dokter = this.cari.dokter ?? ''; 
    this.cariNew = {...this.cari};
    let tglMulai = this.cari.tanggal_mulai;
    this.cariNew.year = tglMulai.substr(0,4);
    this.cariNew.month = this.monthIndo[tglMulai.substr(5,2)];
    
    localStorage.setItem('tanggal_mulai', this.cariNew.tanggal_mulai);
    localStorage.setItem('tanggal_akhir', this.cariNew.tanggal_akhir);
    localStorage.setItem('dokter', this.cariNew.dokter);
    localStorage.setItem('nama', this.cariNew.nama);
    this.emrServ.bumilList(this.cari)
      .subscribe(resp => {
        this.bumilList = resp.data;
        this.getPaginatedData();
        // console.log('a11b');
        // console.log(this.bumilList);
      });
  }

  showCreate(content) {
    this.initFormObMinta();
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  showEdit(content, id) {
    this.initFormObMinta();
    this.show(id);
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  show(id){
    this.emrServ.bumilShow(id)
    .subscribe(response => {
      if (response) {
        this.bumil = response.data;
        console.log(this.bumil.dokter+'a13');;
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
        if(response.success == true){
          this.dokterList = response.dokter;
        }else{
          console.log('Gagal BE proses, '+response.message);
        }
        });
  }
  caripasien(a){
    this.emrServ.pasienList(a.target.value)
    .subscribe(response => {
      if(response.success == true){
        let pasienListOri = response.pasien;
        this.pasienList = pasienListOri.map(function(val, key) {
          return{ 
            pasien_label : val.pasien+'('+val.norm+')', 
            pasien_value : val.pasien+'('+val.norm+')', 
            pasien_nama : val.pasien, 
            pasien_norm : val.norm, 
          }
        });
      }else{
        console.log('Gagal BE proses, '+response.message);
      }
      });
  }
  getPasien() {
    this.emrServ.pasienList('a')
      .subscribe(response => {
        if(response.success == true){
          let pasienListOri = response.pasien;
          this.pasienList = pasienListOri.map(function(val, key) {
            return{ 
              pasien_label : val.pasien+'('+val.norm+')', 
              pasien_value : val.pasien+'('+val.norm+')', 
              pasien_nama : val.pasien, 
              pasien_norm : val.norm, 
            }
          });
        }else{
          console.log('Gagal BE proses, '+response.message);
        }
        });
  }

}
