
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
    
    .riwayat-skrining-button-custom {
      background-color: #E7A422;
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
  screeningPatientId: null;
  screeningPatientData: any = {};
  idScreening: any;
  closeResultModalRiwayat: string;


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
    this.getScreeningDataByNoTr();
    this.initPage()
    // this.ambilGroup();
  }

  showLoading() {
    Swal.fire('Mohon tunggu!')
    Swal.showLoading()
    this.stopLoading(5000)
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => { Swal.close() }, timing)
  }

  getScreeningDataByNoTr() {
    let body = {
      "transactionNo": this.no_transaksi,
      "screeningId": ""
    }
    this.serviceUrl.getScreeningDataByNoTr(body).subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          this.screeningPatientId = data.data.screening_patient.id;
          this.screeningPatientData = data.data;
          this.ambilGroup();
        }else{
          this.screeningPatientId = null;
          this.screeningPatientData = {};
          this.ambilGroup();
        }
      },(error: any) => {
        if (error.error.statusCode === 404) {
          this.screeningPatientId = null;
          this.screeningPatientData = {};
          this.ambilGroup();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Gagal memuat data. Silakan coba lagi.',
          });
        }
      }
    );
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
    // this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    console.log('this.patientData')
    console.log(this.patientData)
    console.log('this.cabangData')
    console.log(this.cabangData)
  }

  async ambilGroup() {
    try {
      let response: any = await this.serviceUrl.getGroup({
        // "rmno": "02-047-02",     
        // "transactionNo": "12345"
        "rmno": this.norm,     
        "transactionNo": this.notransaksi
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

  async getScreeningById(idCluster){
    this.arrSkrining = [];
    this.clusterId = idCluster;
    // const body = {
    //   "show_child" : "yes",
    //   "key_name":"cluster_id",
    //   "key_operator":"=",
    //   "key_value":this.clusterId,
    //   "max_row": 50,
    //   "order_by": "id",
    //   "order_type": "Asc"
    // }
    const body = {
      "clusterId" : this.clusterId,
      "transactionNo" : this.notransaksi
    }
    // const body = {
    //   "clusterId" : 1,
    //   "transactionNo" : "12345"
    // }
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
    // const mapQuestion = data.questionnaires.map(parent => ({
    //   ...parent,
    //   answered: true
    // }))
    // this.questions = mapQuestion
    this.questions = data.questionnaires
    this.idScreening = data.id
    console.log('data')
    console.log(data)
    this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal'}).result.then((result) => {
      this.closeResultModal = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModal = `Dismissed ${this.getDismissReasonModal(reason)}`;
    });
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

  registerAndSave(){
    // const body = {
    //   "data": {
    //     "rmno": "02-047-022",
    //     "orgId": "1000121966",
    //     "transactionNo":"2025012401",
    //     "branchId":"088",
    //     "villageId":"1101012001",  // Desa/kelurahan  Keude Bakongan Aceh
    //     "patientId": "P01078707999",
    //     "clusterId": 1,
    //     "patientName": "Suherman",
    //     "locationId" :"5e7aa695-0b35-47ba-bc6b-28c680b99590",
    //     "locationName":"Rumah Sakit Sehat Semua",
    //     "visitDate":"2025-01-20",
    //     "screening_ids": [1,5]
    //   }
    // }
    const body = {
      data : {
        rmno: this.norm,
        orgId: this.cabangData.kodeorg,
        transactionNo: this.notransaksi,
        branchId: this.cabangData.kdcabang,
        villageId: this.patientData.kdkelurahan,
        patientId: this.idpasien,
        clusterId: this.clusterId,
        patientName: this.patientData.pasien,
        locationId: this.patientData.locationid,
        locationName: this.patientData.locationid,
        visitDate: this.patientData.tglpriksa,
        screening_ids: [this.idScreening]
      }
    }
    console.log('data register')
    console.log(body)
    this.serviceUrl.register(body).subscribe(
      (data: any) => {
        console.log('data response register')
        console.log(data)
        if (data.statusCode == '00') {
          console.log('terdaftar')
          this.screeningPatientId = data.data.screening_patient_id
          console.log('this.screeningPatientId')
          console.log(this.screeningPatientId)
          setTimeout(() => {
            this.saveDataScreening()
          }, 500);
        }else{
          console.log('tidak terdaftar')
        }
      },(error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Gagal menyimpan data. Silakan coba lagi.',
        });
      }
    );
    
  }

  simpan(){
    if(this.screeningPatientId === null){
      this.registerAndSave()
    }else{
      this.saveDataScreening()
    }
  }
  
  saveDataScreening(){
    const mapQuesioner = this.questions.map(item => {
      // if(item.type)
      return {
        "id": item.id,                 
        "type": item.type,                   
        "answer": item.answered
      }
    })
    const body = {
      "screening_patient": {
        "id": this.screeningPatientId
      },
      "screening_data": [
        {
          "screening_id": this.idScreening,
          "questionnaires":mapQuesioner
        }
      ]
    }
    console.log('this.questions')
    console.log(this.questions)
    console.log('mapQuesioner')
    console.log(mapQuesioner)
    console.log('body simpan screening')
    console.log(body)
    this.serviceUrl.saveScreening(body).subscribe(
      (data: any) => {
        console.log('data response save')
        console.log(data)
        if (data.statusCode == '200') {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "<small>Data Skrining Berhasil Di Simpan</small>",
            showConfirmButton: false,
            timer: 3000
          });
          document.getElementById("closeModal").click();
          this.getScreeningDataByNoTr()
          setTimeout(() => {
            this.getScreeningById(this.clusterId);
          }, 300);
        }else{
          console.log('tidak tersimpan')
        }
      },(error: any) => {
        console.log('error')
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.error.statusMsg,
        });
      }
    );
  }
  
  openModalRiwayat(content) {
    this.getDataHistory();
    this.modalService.open(content, {size: 'md', ariaLabelledBy: 'modal-riwayat'}).result.then((result) => {
      this.closeResultModalRiwayat = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModalRiwayat = `Dismissed ${this.getDismissReasonModalRiwayat(reason)}`;
    });
  }

  private getDismissReasonModalRiwayat(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }  

  getDataHistory(){
    const body = {
      "rmno": this.norm,
      "transactionNo": '' 
    }
    this.serviceUrl.getDataHistory(body).subscribe(
      (data: any) => {
        console.log('data history')
        console.log(data)
      },(error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.error.message,
        });
      }
    );
  }


}
