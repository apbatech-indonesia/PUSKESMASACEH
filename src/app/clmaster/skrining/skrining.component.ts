
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
    ::ng-deep .accordion .bg-test {
      background-color:rgb(222 238 249);
      height: 2.5rem;
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
  test = ''
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
  }

  async ambilDataCluster() {
    try {
      let response: any = await this.serviceUrl.getCluster();
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

  openModal(content, data) {
    this.titleModal = `${data.clusters[0].group} ${data.clusters[0].name}`
    this.subTitleModal = `${data.name}`
    this.questions = data.questionnaires.map(item => {
      try {
          let nilaiDef = ['Input','reference','Singgle','Select'].includes(item.type) ? '' : JSON.parse(item.default_options)
          return { ...item, default_options: nilaiDef };
      } catch (error) {
          console.error(`Error parsing default_options for id ${item.id}:`, error);
          return item;
      }
    });
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal'}).result.then((result) => {
      this.closeResultModal = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResultModal = `Dismissed ${this.getDismissReasonModal(reason)}`;
    });
  }

  change() {
    console.log(this.questions)
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
