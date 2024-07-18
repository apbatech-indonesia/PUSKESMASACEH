import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmrService } from '../Service/Emr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Cetak',
  templateUrl: './Cetak.component.html',
  styles: [
    ``
  ],
  providers: [
  ],
})
export class CetakComponent implements OnInit {
  page: any = {};
  ktss: any = {};
  ktssList: any = [];
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
    // this.cariTanggal = this.route.snapshot.paramMap.get('notrans');
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
  }

  list() {
    this.emrServ.list(this.page)
    .subscribe(response => {
        this.ktssList = response.data;
    });
  }

  print(){
    window.print();
  }
}
