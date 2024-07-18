import { AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmrService } from '../Service/Emr.service';
import { ActivatedRoute } from '@angular/router';
// import * as log from 'node_modules1/loglevel';

@Component({
  selector: 'app-Cetak',
  templateUrl: './Cetak.component.html',
  styles: [
    `
      .example-container .mat-radio-button {
        margin: 0 5px;
      }
    `
  ],
  // styleUrls: ['print.component.scss'],
  providers: [
  ],
})
export class CetakComponent{

  bumilList: any = [];
  bumilPage: any = [];
  cari: any = {};
  page: any = {};
  bumil: any = {};
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
    private emrServ: EmrService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap.get('tanggal_mulai'));
    this.initPage();
    this.list();
  }
  
  initPage(){
    console.log('page a11');
    this.page.tanggal_mulai = localStorage.getItem('tanggal_mulai') != 'undefined' ? localStorage.getItem('tanggal_mulai') : '';
    this.page.tanggal_akhir = localStorage.getItem('tanggal_akhir') != 'undefined' ? localStorage.getItem('tanggal_akhir') : '';
    this.page.dokter = localStorage.getItem('dokter') != 'undefined' ? localStorage.getItem('dokter') : '';
    this.page.nama = localStorage.getItem('nama') != 'undefined' ? localStorage.getItem('nama') : '';
    let tglMulai = this.page.tanggal_mulai;
    this.page.year = tglMulai.substr(0,4);
    this.page.month = this.monthIndo[tglMulai.substr(5,2)];
    // this.page.tanggal_mulai = this.route.snapshot.paramMap.get('tanggal_mulai');
    // this.page.tanggal_akhir = this.route.snapshot.paramMap.get('tanggal_akhir');
    // this.page.tanggal_mulai = localStorage.getItem('tanggal_mulai');
    // this.page.tanggal_akhir = localStorage.getItem('tanggal_akhir');
    // this.page.dokter = localStorage.getItem('dokter');
    // this.page.nama = localStorage.getItem('nama');
  }

  list(){
    // this.cari.tanggal_mulai = "2024-01-01";
    // this.cari.tanggal_akhir = "2024-01-30";
    this.emrServ.bumilList(this.page)
      .subscribe(resp => {
        this.bumilList = resp.data;
      });
  }

  // print() {
  //   console.log('print a11');
  //   const printContents = document.getElementById('contentToPrint').innerHTML;
  //   const originalContents = document.body.innerHTML;

  //   document.body.innerHTML = printContents;
  //   window.print();

  //   document.body.innerHTML = originalContents;
  //   console.log('print a99');
  // }
  
  // ngAfterViewInit(){
  //   this.print();
  // }
  // ngOnDestroy(){
  //   this.print();
  // }
  // ngOnChanges(){
  //   this.print();
  // }

  print(){
    window.print();
  }
  print2() {
    const css = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">`;
    const css2 = `
    `;
    const printContents = document.getElementById('contentToPrint').innerHTML;
    const pageContent = `<!DOCTYPE html><html><head>${css}</head><body onload="window.print()">${printContents}</html>`;
    let popupWindow: Window;
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      popupWindow = window.open(
        '',
        '_blank',
        'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
      );
      popupWindow.window.focus();
      popupWindow.document.write(pageContent);
        popupWindow.document.close();
      popupWindow.onbeforeunload = event => {
        popupWindow.close();
      };
      popupWindow.onabort = event => {
        popupWindow.document.close();
        popupWindow.close();
      };
    } else {
      popupWindow = window.open('', '_blank', 'width=600,height=600');
      popupWindow.document.open();
      popupWindow.document.write(pageContent);
      popupWindow.document.close();
    }
  }
   
}
