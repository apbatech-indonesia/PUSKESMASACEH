import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiserviceService } from "src/app/apiservice.service";
import Swal from "sweetalert2";
import { NgbPanelChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import {
  NgbModal,
  ModalDismissReasons,
  NgbDropdownConfig
} from "@ng-bootstrap/ng-bootstrap";

import { ActivatedRoute, Router } from "@angular/router";

import { skrininglaporanService } from "./skrininglaporan.service";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { DatePipe } from "@angular/common";
import { cetak } from "./cetak/cetak";
import * as XLSX from 'xlsx';
@Component({
  selector: "app-skrininglaporan",
  templateUrl: "./skrininglaporan.component.html",
  styleUrls: ["./skrininglaporan.component.css"],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class skrininglaporanComponent implements OnInit {
  @Input() norm: string;
  @Input() idpasien: string;

  config: NgbDropdownConfig = {
    autoClose: false,
    placement: 'left',
    container: 'body'
  };

  userData: any = JSON.parse(localStorage.getItem("userDatacl")).userData;
  notransaksi: string = this.route.snapshot.paramMap.get("notrans");
  branchId = this.userData.kdcabang;

  heading = "Laporan Skrining";
  subheading: any;
  options: FormGroup;
  public userDetails: any;
  nama: any;
  akses: any;
  kdklinik: any;
  kdcabang: any;

  no_transaksi: string;
  no_rm: string;

  patientData: any = {
    noantrian: "-",
    norm: "-",
    pasien: "-",
    umur: "-",
    tgllahir: "-",
    jeniskelamin: "-",
    nampoli: "-",
    costumer: "-",
    namdokter: "-",
    alamat: "-",
  };

  cabangData: any;

  activeNavId: any = 'pasien';

  arrCluster: any;
  arrVillage: any = [];

  myDate = new Date();
  startDatePasien: string;
  endDatePasien: string;
  arrSkriningPasien: any = [];
  namePasien: string;
  groupPasien: string;
  noRmPasien: string;
  klasterPasien: string;
  villagePasien: string;
  arrSkriningNamePasien: any = [];
  skriningPasien: string;
  ftrArrCluster: any = [];
  filteredVillagePasien: any = [];
  
  startDateJumlah: string;
  endDateJumlah: string;
  arrSkriningJumlah: any = [];
  villageJumlah: string;
  filteredVillageJumlah: any = [];

  arrPageSkrining: any;
  startDateSkrining: string;
  endDateSkrining: string;
  groupSkrining: string;
  klasterSkrining: string;
  ftrArrClusterSkr: any = [];
  arrSkriningNameSkr: any = [];
  skriningSkr: string;

  totalRecords: number = 0;
  maxRow: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private serviceUrl: skrininglaporanService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.no_transaksi = localStorage.getItem("noTransaksi");
    this.no_rm = localStorage.getItem("noRM");
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
  }

  ngOnInit() {
    this.initPage();
    this.getCluster();
    this.getVillage();
    this.dafaultPagePasien();
    this.defaultPageJumlah();
    this.defaultPageSkrining();
  }

  showLoading() {
    Swal.fire("Mohon tunggu!");
    Swal.showLoading();
    this.stopLoading(5000);
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => {
      Swal.close();
    }, timing);
  }

  getCluster() {
    const body = {
      "show_child": "no"
    }
    this.serviceUrl.getCluster(body).subscribe(
      (data: any) => {
        if(data.statusCode == '00'){
          this.arrCluster = data.data
        }else{
          this.arrCluster = []
        }
      },
      (error: any) => {
        console.log(error.error.statusMsg)
        this.arrCluster = []
      }
    );
  }
  
  getVillage() {
    const body = {
      "branchId": this.branchId
    }
    this.serviceUrl.getVillage(body).subscribe(
      (data: any) => {
        if(data.statusCode == 200){
          this.arrVillage = data.data
        }else{
          this.arrVillage = []
        }
      },
      (error: any) => {
        console.log(error.error.statusMsg)
        this.arrVillage = []
      }
    );
  }

  getPasien() {
    return new Promise((resolve) => {
      this.authService
        .datapasien(this.userData.kdcabang, this.notransaksi)
        .subscribe((data) => {
          data.forEach((e) => {
            resolve(e);
          });
        });
    });
  }

  getCabang() {
    return new Promise((resolve) => {
      this.authService.cabangper(this.userData.kdklinik).subscribe((data) => {
        data.forEach((e) => {
          resolve(e);
        });
      });
    });
  }

  async initPage() {
    // this.showLoading()
    this.patientData = await this.getPasien();
    this.cabangData = await this.getCabang();
  }

  dafaultPagePasien(){
    this.startDatePasien = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.endDatePasien = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.namePasien = '';
    this.groupPasien = '';
    this.noRmPasien = '';
    this.klasterPasien = '';
    this.villagePasien = '';
    this.skriningPasien = '';
    const body = {
      "startDate" : this.startDatePasien,
      "endDate" : this.endDatePasien,
      "branchId" :this.branchId,
      "villageId" :this.villagePasien,
      "clusterGroup" : this.groupPasien,
      "clusterId":this.klasterPasien,
      "rmno":this.noRmPasien,
      "patientName":this.namePasien,
      "screeningId":this.skriningPasien 
    }
    this.getScreeningPatientReport(body)
  }

  filterPagePasien(){
    const body = {
      "startDate" : this.startDatePasien,
      "endDate" : this.endDatePasien,
      "branchId" :this.branchId,
      "villageId" :this.villagePasien,
      "clusterGroup" : this.groupPasien,
      "clusterId":this.klasterPasien,
      "rmno":this.noRmPasien,
      "patientName":this.namePasien,
      "screeningId":this.skriningPasien
    }
    this.getScreeningPatientReport(body)
  }

  filterVillagePasien(event) {
    let query = event.query.toLowerCase();
    this.filteredVillagePasien = this.arrVillage.filter(village => 
        village.village_name.toLowerCase().includes(query)
    );
  }

  onSelectPasien(event){
    let query = event.village_id;
    this.villagePasien = query;
  }

  getSkriningByIdPasien() {
    const body = {
      "key_name": "cluster_id",
      "key_operator": "=",
      "key_value": this.klasterPasien ,
      "show_parent": "no"
    }
    this.serviceUrl.getSkrining(body).subscribe(
      (data: any) => {
        if(data.statusCode == '00'){
          this.arrSkriningNamePasien = data.data
        }else{
          this.arrSkriningNamePasien = []
        }
      },
      (error: any) => {
        console.log(error.error.statusMsg)
        this.arrSkriningNamePasien = []
      }
    );
  }

  filterKlasterByGroup(){
    if(this.groupPasien == ''){
      this.klasterPasien = ''
      this.ftrArrCluster = []
    }else{
      this.ftrArrCluster = this.arrCluster.filter(item => item.group == this.groupPasien)
    }
  }

  getScreeningPatientReport(body) {
    this.serviceUrl.getScreeningPatientReport(body).subscribe(
      (data: any) => {
        if(data.statusCode == '00'){
          this.arrSkriningPasien = data.data
        }else{
          this.arrSkriningPasien = []
        }
      },
      (error: any) => {
        console.log(error.error.statusMsg)
        this.arrSkriningPasien = []
      }
    );
  }

  defaultPageJumlah(){
    this.startDateJumlah = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.endDateJumlah = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.villageJumlah = ''
    const body = {
      "startDate" : this.startDateJumlah,
      "endDate" : this.endDateJumlah,
      "branchId" :this.branchId,
      "villageId" : this.villageJumlah
    }
    this.getPatientByVillage(body)
  }
  
  filterPageJumlah(){
    const body = {
      "startDate" : this.startDateJumlah,
      "endDate" : this.endDateJumlah,
      "branchId" :this.branchId,
      "villageId" : this.villageJumlah
    }
    this.getPatientByVillage(body)
  }

  filterVillageJumlah(event) {
    let query = event.query.toLowerCase();
    this.filteredVillageJumlah = this.arrVillage.filter(village => 
        village.village_name.toLowerCase().includes(query)
    );
  }

  onSelectJumlah(event){
    let query = event.village_id;
    this.villageJumlah = query;
  }

  getPatientByVillage(body) {
    this.serviceUrl.getPatientByVillage(body).subscribe(
      (data: any) => {
        if(data.statusCode == 200){
          const mapSkriningJumlah = data.data.map(parent => {
            let klaster2 = 0;
            let klaster3 = 0;
            let klaster4 = 0;
          
            parent.cluster_group.forEach(child => {
              switch (child.group_name) {
                case 'Klaster Klaster 2 - Ibu dan Anak':
                  klaster2 = child.total;
                  break;
                case 'Klaster Klaster 3 - Usia Dewasa dan Lanjut Usia':
                  klaster3 = child.total;
                  break;
                case 'Klaster Klaster 4 - Penanggulangan Penyakit Menular':
                  klaster4 = child.total;
                  break;
              }
            });
          
            return {
              ...parent,
              klaster2,
              klaster3,
              klaster4
            };
          });
          this.arrSkriningJumlah = mapSkriningJumlah
        }else{
          this.arrSkriningJumlah = []
        }
      },
      (error: any) => {
        console.log(error.error.statusMsg)
        this.arrSkriningJumlah = []
      }
    );
  }

  defaultPageSkrining(){
    this.startDateSkrining = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.endDateSkrining = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.groupSkrining = '';
    this.klasterSkrining = '';
    this.skriningSkr = '';
    this.maxRow = 10;
    const body = {
      "startDate" : this.startDateSkrining,
      "endDate" : this.endDateSkrining,
      "villageId": "",
      "branchId" :this.branchId,
      "clusterId" : this.klasterSkrining,
      "clusterGroup" : this.groupSkrining,
      "screeningId" : this.skriningSkr,
      "maxRow" : this.maxRow,
      "startRow" : 0
    }
    this.getPatientByScreening(body)  
  }
  
  filterPageSkrining(){
    const body = {
      "startDate" : this.startDateSkrining,
      "endDate" : this.endDateSkrining,
      "villageId": "",
      "branchId" :this.branchId,
      "clusterId" : this.klasterSkrining,
      "clusterGroup" : this.groupSkrining,
      "screeningId" : this.skriningSkr,
      "maxRow" : this.maxRow,
      "startRow" : 0
    }
    this.getPatientByScreening(body)  
  }

  filterKlasterByGroupSkr(){
    if(this.groupSkrining == ''){
      this.klasterSkrining = ''
      this.skriningSkr = ''
      this.ftrArrClusterSkr = []
    }else{
      this.skriningSkr = ''
      this.ftrArrClusterSkr = this.arrCluster.filter(item => item.group == this.groupSkrining)
    }
  }

  getSkriningByIdPasienSkr() {
    const body = {
      "key_name": "cluster_id",
      "key_operator": "=",
      "key_value": this.klasterSkrining ,
      "show_parent": "no"
    }
    this.serviceUrl.getSkrining(body).subscribe(
      (data: any) => {
        if(data.statusCode == '00'){
          this.arrSkriningNameSkr = data.data
        }else{
          this.arrSkriningNameSkr = []
        }
      },
      (error: any) => {
        console.log(error.error.statusMsg)
        this.arrSkriningNameSkr = []
      }
    );
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      const body = {
        "startDate": this.startDateSkrining,
        "endDate": this.endDateSkrining,
        "villageId": "",
        "branchId" :this.branchId,
        "clusterId": this.klasterSkrining,
        "clusterGroup": this.groupSkrining,
        "screeningId": this.skriningSkr,
        "maxRow": this.maxRow,
        "startRow": (page - 1) * this.maxRow
      };
      this.getPatientByScreening(body);
    }
  }

  getPatientByScreening(body) {
    this.serviceUrl.getPatientByScreening(body).subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          this.arrPageSkrining = data.data;
          this.totalRecords = data.pagination.totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.maxRow);
          this.currentPage = Math.floor(data.pagination.startRow / this.maxRow) + 1;
        } else {
          this.arrPageSkrining = [];
        }
      },
      (error: any) => {
        console.log(error.error.statusMsg);
        this.arrPageSkrining = [];
      }
    );
  }

  cetakPage(pageId:string){
    let judul;
    let tanggal;
    let filter;
    switch (pageId) {
      case 'pagePasien':
        const villageName = this.arrVillage.find(clust => clust.village_id == this.villagePasien)?.village_name ?? '';
        const kategoriName = this.ftrArrCluster.find(clust => clust.id == this.klasterPasien)?.name ?? '';
        const skriningName = this.arrSkriningNamePasien.find(clust => clust.id == this.skriningPasien)?.name ?? '';
        judul = "Laporan Skrining Pasien"
        tanggal = `Per Tanggal : ${this.datePipe.transform(this.startDatePasien, 'dd-MM-yyyy')} Sampai ${this.datePipe.transform(this.endDatePasien, 'dd-MM-yyyy')}`
        const filtersForNameFile = [
          this.noRmPasien ? 'No RM (' + (this.noRmPasien ?? '') + ')' : null,
          this.namePasien ? 'Nama Pasien (' + (this.namePasien ?? '') + ')' : null,
          this.villagePasien ? 'Daerah (' + (villageName) + ')' : null,
          this.groupPasien ? 'Klaster (' + (this.groupPasien ?? '') + ')' : null,
          this.klasterPasien ? 'Kategori (' + (kategoriName) + ')' : null,
          this.skriningPasien ? 'Skrining (' + (skriningName) + ')' : null
        ];
        filter = filtersForNameFile.filter(item => item !== null).join(', ');
        break;
      case 'pageJumlah':
        const villagName = this.arrVillage.find(clust => clust.village_id == this.villageJumlah)?.village_name ?? '';
        judul = "Laporan Jumlah Skrining Daerah"
        tanggal = `Per Tanggal : ${this.datePipe.transform(this.startDateJumlah, 'dd-MM-yyyy')} Sampai ${this.datePipe.transform(this.endDateJumlah, 'dd-MM-yyyy')}`
        filter = this.villageJumlah ? 'Daerah (' + (villagName) + ')' : ''
        break;
      case 'pageSkrining':
        const kategoriName3 = this.ftrArrClusterSkr.find(clust => clust.id == this.klasterSkrining)?.name ?? '';
        const skriningName3 = this.arrSkriningNameSkr.find(clust => clust.id == this.skriningSkr)?.name ?? '';
        judul = "Laporan Jumlah Skrining Pasien"
        tanggal = `Per Tanggal : ${this.datePipe.transform(this.startDateSkrining, 'dd-MM-yyyy')} Sampai ${this.datePipe.transform(this.endDateSkrining, 'dd-MM-yyyy')}`
        const filtersForNameFile3 = [
          this.groupSkrining ? 'Klaster (' + (this.groupSkrining ?? '') + ')' : null,
          this.klasterSkrining ? 'Kategori (' + (kategoriName3) + ')' : null,
          this.skriningSkr ? 'Skrining (' + (skriningName3) + ')' : null
        ];
        filter = filtersForNameFile3.filter(item => item !== null).join(', ');
        break;
      default:
        break;
    }
    const printContents = document.getElementById(pageId).innerHTML;
    cetak(printContents, judul, tanggal, filter)
  }

  exportToExcelFromTable(tableId): void {
    let dataExport:any[];
    let judul;
    let tanggal;
    let filter;
    switch (tableId) {
      case 'pagePasien': {
        const villageName = this.arrVillage.find(clust => clust.village_id == this.villagePasien)?.village_name ?? '';
        const kategoriName = this.ftrArrCluster.find(clust => clust.id == this.klasterPasien)?.name ?? '';
        const skriningName = this.arrSkriningNamePasien.find(clust => clust.id == this.skriningPasien)?.name ?? '';
        judul = "Laporan Skrining Pasien"
        tanggal = `Per Tanggal : ${this.datePipe.transform(this.startDatePasien, 'dd-MM-yyyy')} Sampai ${this.datePipe.transform(this.endDatePasien, 'dd-MM-yyyy')}`
        const filtersForNameFile = [
          this.noRmPasien ? 'No RM (' + (this.noRmPasien ?? '') + ')' : null,
          this.namePasien ? 'Nama Pasien (' + (this.namePasien ?? '') + ')' : null,
          this.villagePasien ? 'Daerah (' + (villageName) + ')' : null,
          this.groupPasien ? 'Klaster (' + (this.groupPasien ?? '') + ')' : null,
          this.klasterPasien ? 'Kategori (' + (kategoriName) + ')' : null,
          this.skriningPasien ? 'Skrining (' + (skriningName) + ')' : null
        ];
        const filterNilai = filtersForNameFile.filter(item => item !== null).join(' ');
        filter = `Difilter berdasarkan : ${filterNilai}`
        const worksheetData = [
          [judul],
          [tanggal],
          [filter],
          [],
        ];

        const mappedData = this.arrSkriningPasien.map(item => ({
          'Tanggal': item.tgl ? new Date(item.tgl) : '',
          'No RM': item.rm_no ?? '',
          'Nama': item.nama ?? '',
          'Daerah': item.village_name ?? '',
          'Klaster': item.group_klaster ?? '',
          'Kategori': item.klaster ?? '',
          'Skrining': item.screening ?? '',
        }))

        const header = [
          'Tanggal',
          'No RM',
          'Nama',
          'Daerah',
          'Klaster',
          'Kategori',
          'Skrining',
        ];
        
        worksheetData.push(
          header,
          ...mappedData.map(item => [
            item['Tanggal'],
            item['No RM'],
            item['Nama'],
            item['Daerah'],
            item['Klaster'],
            item['Kategori'],
            item['Skrining'],
          ])
        );
        dataExport = worksheetData;
        break;
      }
      case 'pageJumlah': {

        const villagName = this.arrVillage.find(clust => clust.village_id == this.villageJumlah)?.village_name ?? '';
        judul = "Laporan Jumlah Skrining Daerah"
        tanggal = `Per Tanggal : ${this.datePipe.transform(this.startDateJumlah, 'dd-MM-yyyy')} Sampai ${this.datePipe.transform(this.endDateJumlah, 'dd-MM-yyyy')}`
        const filterNilai = this.villageJumlah ? 'Daerah (' + (villagName) + ')' : ''
        filter = `Difilter berdasarkan : ${filterNilai}`
        const worksheetData = [
          [judul],
          [tanggal],
          [filter],
          [],
        ];

        const mappedData = this.arrSkriningJumlah.map(item => ({
          'Daerah': item.village_name ?? '',
          'Klaster 2': item.klaster2 ?? '',
          'Klaster 3': item.klaster3 ?? '',
          'Klaster 4': item.klaster4 ?? '',
        }))

        const header = [
          'Daerah',
          'Klaster 2',
          'Klaster 3',
          'Klaster 4',
        ];
        
        worksheetData.push(
          header,
          ...mappedData.map(item => [
            item['Daerah'],
            item['Klaster 2'],
            item['Klaster 3'],
            item['Klaster 4'],
          ])
        );
        dataExport = worksheetData;
        break;
      }
      case 'pageSkrining': {
        const kategoriName3 = this.ftrArrClusterSkr.find(clust => clust.id == this.klasterSkrining)?.name ?? '';
        const skriningName3 = this.arrSkriningNameSkr.find(clust => clust.id == this.skriningSkr)?.name ?? '';
        judul = "Laporan Jumlah Skrining Pasien"
        tanggal = `Per Tanggal : ${this.datePipe.transform(this.startDateSkrining, 'dd-MM-yyyy')} Sampai ${this.datePipe.transform(this.endDateSkrining, 'dd-MM-yyyy')}`
        const filtersForNameFile3 = [
          this.groupSkrining ? 'Klaster (' + (this.groupSkrining ?? '') + ')' : null,
          this.klasterSkrining ? 'Kategori (' + (kategoriName3) + ')' : null,
          this.skriningSkr ? 'Skrining (' + (skriningName3) + ')' : null
        ];
        const filterNilai = filtersForNameFile3.filter(item => item !== null).join(' ');
        filter = `Difilter berdasarkan : ${filterNilai}`
        const worksheetData = [
          [judul],
          [tanggal],
          [filter],
          [],
        ];

        const mappedData = this.arrPageSkrining.map(item => ({
          'Nama Skrining': item.screening_name ?? '',
          'Klaster': item.group_name ?? '',
          'Kategori': item.cluster_name ?? '',
          'Jumlah Skrining': item.patient_count ?? '',
        }))

        const header = [
          'Nama Skrining',
          'Klaster',
          'Kategori',
          'Jumlah Skrining',
        ];
        
        worksheetData.push(
          header,
          ...mappedData.map(item => [
            item['Nama Skrining'],
            item['Klaster'],
            item['Kategori'],
            item['Jumlah Skrining'],
          ])
        );
        dataExport = worksheetData;
        break;
      }
      default:
        break;
    }
    const mergeNameFile = `${judul} ${tanggal} ${filter}`

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataExport, { cellDates: true });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // Ekspor file
    XLSX.writeFile(wb, `${mergeNameFile}.xlsx`);

    // const tableElement = document.getElementById(tableId);
    // if (tableElement) {
    //   const additionalData = [
    //     [`${judul}`],                     
    //     [`${tanggal}`],  
    //     [`Difilter berdasarkan : ${filter}`],
    //     [] 
    //   ];
      
    //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement, { cellDates: true });

    //   const newSheet = XLSX.utils.aoa_to_sheet(additionalData);

    //   XLSX.utils.sheet_add_json(newSheet, XLSX.utils.sheet_to_json(ws, { header: 1 }), {
    //     skipHeader: true,
    //     origin: 'A5'
    //   });

    //   const wb = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, newSheet, 'Sheet Tambahan');

    //   XLSX.writeFile(wb, `${mergeNameFile}.xlsx`);

    // } else {
    //   this.toastr.error('Tabel Tidak Ditemukan', 'error', { timeOut: 3000 });
    // }
  }  
  

}
