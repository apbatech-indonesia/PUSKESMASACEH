
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from 'src/app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';

import { skriningService } from "./skrining.service";

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-skrining',
  templateUrl: './skrining.component.html',
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

    .card-header-custom {
      height: 44px;
      background-color: #1D2D44;
      color: white;
      font-size: 16px;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 0px;
    }

    .fw-semi-custom {
      font-weight: 600;
    }

    .text-primary-custom {
      color: #2329BE;
    }

    .edit-skrining-button-custom {
      background-color: #2329BE;
      width: auto;
      height: 36px;
      color: white;
      padding: 4px 10px 4px 10px;
      border-style: none;
      border-radius: 6px;
      cursor: pointer;
    }
    
    .create-skrining-button-custom {
      background-color: #009688;
      width: auto;
      height: 36px;
      color: white;
      padding: 4px 10px 4px 10px;
      border-style: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .w-btn-custom {
      width: 121px !important;    
    }

    .h-btn-custom {
      height: 36px !important;
    }

    .search-button-custom {
      background-color: #4AB4DE;
      width: auto;
      height: 36px;
      color: white;
      padding: 6px 14px 6px 14px;
      border-style: none;
      border-radius: 6px;
    }

    .save-button-custom {
      background-color: #29A259;
      width: auto;
      height: 36px;
      color: white;
      padding: 4px 10px 4px 10px;
      border-style: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .save-button-custom:disabled {
      background-color: #979797;
      width: auto;
      height: 36px;
      color: white;
      padding: 4px 10px 4px 10px;
      border-style: none;
      border-radius: 6px;
    }

    .cancel-button-custom {
      background-color: #CD1818;
      width: auto;
      height: 36px;
      color: white;
      padding: 4px 10px 4px 10px;
      border-style: none;
      border-radius: 6px;
      cursor: pointer;
    }

    ::ng-deep .accordion .bg-test {
      background-color: white;
      height: 2.5rem;
      border: solid 1px #DAD5D5;
    }  
    ::ng-deep .accordion .collapse {
      border: solid 1px #DAD5D5;
    }  
    ::ng-deep .accordion .collapse .card-body{
      padding: 0px;
    }  
    `
  ], providers: [
    DatePipe,
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    NgbAccordionConfig
  ],
})
export class skriningComponent implements OnInit {
  @Input() norm: string;
  @Input() idpasien: string;
  
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  notransaksi: string = this.route.snapshot.paramMap.get('notrans')

  heading = 'Skrining';
  subheading: any;
  options: FormGroup;
  public userDetails: any;
  nama: any;
  akses: any;
  kdklinik: any;
  kdcabang: any;




  // this InputVar is a reference to our input.

  InputVar: ElementRef;
  closeResultModal: string;
  no_transaksi: string;
  no_rm: string;
  arrCluster: any = [];
  clusterId: number;
  arrSkrining: any = [];
  questions: any = [];
  titleModal: string;
  subTitleModal: string;

  patientData: any = {
    noantrian: '-',
    norm: '-',
    pasien: '-',
    umur: '-',
    tgllahir: '-',
    jeniskelamin: '-',
    nampoli: '-',
    costumer: '-',
    namdokter: '-',
    alamat: '-'
  }
  cabangData: any;
  useCaseId: any;


  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private modalService: NgbModal, 
    public toastr: ToastrService, 
    private authService: ApiserviceService, 
    private serviceUrl: skriningService, 
    private fb: FormBuilder,
    private NgbAccordionConfig: NgbAccordionConfig,
  ) {
    NgbAccordionConfig.closeOthers = true;
    NgbAccordionConfig.type = 'test';
    NgbAccordionConfig.animation = true;
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.no_transaksi = localStorage.getItem('noTransaksi');
    this.no_rm = localStorage.getItem('noRM');
    this.userDetails = data.userData
    this.nama = this.userDetails.nama
    this.akses = this.userDetails.hakakses
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
  }

  ngOnInit() {
    this.ambilDataCluster();
    // this.initPage()
  }

  showLoading() {
    Swal.fire('Mohon tunggu!')
    Swal.showLoading()
    this.stopLoading(5000)
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => { Swal.close() }, timing)
  }

  getPasien() {
    return new Promise((resolve) => {
      this.authService.datapasien(this.userData.kdcabang, this.notransaksi)
        .subscribe((data) => {
          data.forEach(e => {
            resolve(e)
          })
        })
    })
  }

  getCabang() {
    return new Promise((resolve) => {
      this.authService.cabangper(this.userData.kdklinik)
        .subscribe((data) => {
          data.forEach(e => {
            resolve(e)
          })
        })
    })
  }

  async initPage() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()

    const data = {
      rmno: this.norm,
      orgId: this.cabangData.kodeorg,
      branchId: this.cabangData.kdcabang,
      villageId: "",
      patientId: this.idpasien,
      clusterId: "",
      patientName: this.patientData.pasien,
      locationId: this.patientData.locationid,
      locationName: this.patientData.locationid,
      visitDate: new Date().toISOString(),
      screening_ids: []
    }
    console.log('data init')
    console.log(data)
    // let response: any = await this.serviceUrl.register({
    //   data: {
    //     rmno: this.notransaksi,
    //     orgId: this.cabangData.kodeorg,
    //     branchId: "",
    //     villageId: "",
    //     patientId: this.idpasien,
    //     clusterId: "",
    //     patientName: this.patientData.pasien,
    //     locationId: this.patientData.locationid,
    //     locationName: this.patientData.locationid,
    //     visitDate:"",
    //     screening_ids: []
    //   }
    // })
    // this.useCaseId = response.data.use_case_id
    // this.ambilDataCluster()
  }

  async ambilDataCluster() {
    try {
      let response: any = await this.serviceUrl.getCluster({
        // rmno: "02-047-02",     
        // patientId: "P01078707999"
        // rmno: this.norm,     
        // patientId: ''
        // patientId: this.idpasien
      });
      this.arrCluster = response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Gagal memuat data. Silakan coba lagi.',
      });
    }
  }

  async getClusterById(idCluster){
    this.arrSkrining = [];
    this.clusterId = idCluster;
    const body = {
      "show_child" : "yes",
      "key_name":"cluster_id",
      "key_operator":"=",
      "key_value":this.clusterId,
      "max_row": 50,
      "order_by": "id",
      "order_type": "Asc"
    }
    try {
      let response: any = await this.serviceUrl.getSkrinigById(body);
      this.arrSkrining = response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Gagal memuat data. Silakan coba lagi.',
      });
    }
  }

  openModal(content, data, cluster, subCluster, number) {
    this.titleModal = `${cluster} - ${subCluster}`
    this.subTitleModal = `${number}. ${data.name}`
    this.questions = data.questionnaires
    this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal'}).result.then((result) => {
      this.closeResultModal = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModal = `Dismissed ${this.getDismissReasonModal(reason)}`;
    });
  }

  change() {
    console.log(this.questions)
  }

  onCheckedCQuestions(value, index){
    this.questions.forEach((item, idx) => {
      if (idx === index) {
        let arrAnswer = []
        if(!item.answer){
          arrAnswer.push(value)
        }else if(item.answer.lenght === 0){
          arrAnswer.push(value)
        }else{
          arrAnswer = item.answer
          const indexItem = item.answer.indexOf(value);
          if (indexItem !== -1) {
            arrAnswer.splice(indexItem, 1);
          } else {
            arrAnswer.push(value)
          }
        }
        item.answer = arrAnswer
      }
    });
  }

  simpan(){
    console.log('this.questions simpan')
    console.log(this.questions)
  }
  
  private getDismissReasonModal(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
