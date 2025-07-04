import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-laporanantrol',
  templateUrl: './laporanantrol.component.html',
  styles: []
})
export class laporanantrolComponent implements OnInit {
  faSearch = faSearch;

  response: any
  list: any = []
  totalall:number=0;
  totalsucess:number=0;
  totalgagal:number=0;
  percentagesuccess:number=0;
  percentagefailed:number=0;

  slug=''
  search=''
  page=1
  isSuccess=''
  urlType=''
  dateFrom=''
  dateTo=''

  isShowPasien=0
  pasienName=''

  constructor(
    private api: ApiserviceService
  ) { }

  ngOnInit() {
    this.fetchData()
  }

  changePage(data: any) {
    this.page = data.pageIndex+1
    this.fetchData()
  }

  fetchData(){
    const data = JSON.parse(localStorage.getItem("userDatacl"));

    this.api.cabangper(data.userData.kdklinik).subscribe(async (data) => {
      if (data[0].slug) {
        this.slug = data[0].slug
        let report: any = await this.api.getReportingAntrol(
          data[0].slug,
          this.search,
          this.page,
          this.isSuccess,
          this.urlType,
          this.dateFrom,
          this.dateTo
        )
        
        this.response = report
        this.list = this.response.data.data
        this.totalall = this.response.data.total_hit
        this.totalsucess = this.response.data.total_success
        this.totalgagal = this.response.data.total_failed
        this.percentagesuccess = this.response.data.percentage_success
        this.percentagefailed = this.response.data.percentage_failed
      }
    });
  }

  replaceWith(text: any, replace = '"') {
    return text.replaceAll(replace, '');
  }

  tojson(data: any){
    return JSON.parse(data)
  }

  async detailPasien(bpjsnumber: any, index: number) {
    let response: any = await this.api.getDetailPasien(this.slug, bpjsnumber)

    this.isShowPasien = index
    this.pasienName = response.data.pasien
  }
}
