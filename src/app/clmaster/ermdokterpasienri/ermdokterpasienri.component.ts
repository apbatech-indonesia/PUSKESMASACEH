import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiserviceService } from "src/app/apiservice.service";
import Swal from "sweetalert2";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

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

@Component({
  selector: "app-ermdokterpasienri",
  templateUrl: "./ermdokterpasienri.component.html",
  styles: [],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ermdokterpasienriComponent implements OnInit {
  toggleMobileSidebar: any;
  faStar = faStar;
  faPlus = faPlus;
  faAngleDown = faAngleDown;
  faSearch = faSearch;
  faTags = faTags;
  faCalendarAlt = faCalendarAlt;

  heading = "Master Customer";
  subheading: any;
  icon = "pe-7s-diamond icon-gradient bg-warm-flame";

  options: FormGroup;
  public userDetails: any;
  nama: any;
  akses: any;

  kdklinik: any;
  cabangarr: any;

  cariuser: any;
  closeResult: string;

  kdparent = "";
  coa = "";
  kdcabang: any;
  username: any;
  tglp: String = new Date().toISOString();
  currentJustify = "start";
  currentJustify2 = "center";
  currentJustify3 = "start";

  currentOrientation = "horizontal";

  htmlContent = "";

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "25rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    uploadUrl: "no",
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    toolbarHiddenButtons: [
      [
        "textColor",
        "backgroundColor",
        "customClasses",
        "link",
        "unlink",
        "insertImage",
        "insertVideo",
        "insertHorizontalRule",
        "removeFormat",
        "toggleEditorMode",
        "strikeThrough",
        "subscript",
        "superscript",
      ],
    ],
  };
  kduser: any;
  content = "";
  received = [];
  sent = [];
  constructor(
    private modalService: NgbModal,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private fb: FormBuilder
  ) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
    this.username = this.userDetails.username;
    this.kduser = this.userDetails.kduser;
  }

  // WebSocket functionality removed
  pasienNotification(msg) {
    this.tmptotal();
  }

  sendMsg() {
    // WebSocket functionality removed
  }

  sendNotificationDokter(kodeDokter) {
    // WebSocket functionality removed
  }

  ngOnInit() {
    this.tmptotal();
  }
  totalpass: number = 0;
  totalpassbelum: number = 0;
  totalpasssudah: number = 0;
  tampilpas: any;

  tmptotal() {
    this.authService
      .t_listpasienridokter(this.kdcabang, "", this.kduser)
      .subscribe(
        (data) => {
          this.totalpass = data.length;
          this.tampilpas = data;
        },
        (Error) => {
          console.log(Error);
        }
      );

    //     this.authService.pasienperdokter(this.kdcabang,this.kduser,'BELUM','','1')
    //     .subscribe(
    //       data => {
    // this.totalpassbelum = data.length

    //     },
    //       Error => {

    //        console.log(Error)
    //       }
    //     )

    //     this.authService.pasienperdokter(this.kdcabang,this.kduser,'SUDAH','','1')
    //     .subscribe(
    //       data => {
    // this.totalpasssudah = data.length

    //     },
    //       Error => {

    //        console.log(Error)
    //       }
    //     )
  }

  cpasien(a) {
    this.authService
      .pasienperdokter(
        this.kdcabang,
        this.kduser,
        "BELUM",
        a.target.value,
        "2",
        ""
      )
      .subscribe(
        (data) => {
          this.tampilpas = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  norm: "";
  kdpoli: "";
  tglpriksa: "";
  kddokter: "";
  kdkostumerd: "";
  notransaksi: "";
  pasien: "";
  tgllahir: "";
  noantrian: "";
  nampoli: "";
  namdokter: "";
  namacus: "";
  costumer: "";
  alamat: "";
  kdtarif: "";
  showdata: boolean;
  kelas: string;

  pilihpasien(
    norm,
    kdpoli,
    tglpriksa,
    kddokter,
    kdkostumerd,
    notransaksi,
    pasien,
    tgllahir,
    noantrian,
    nampoli,
    namdokter,
    nama,
    costumer,
    alamat,
    kdtarif,
    kelas
  ) {
    this.showdata = true;
    this.norm = norm;
    this.kdpoli = kdpoli;
    this.tglpriksa = tglpriksa;
    this.kddokter = kddokter;
    this.kdkostumerd = kdkostumerd;
    this.notransaksi = notransaksi;
    this.pasien = pasien;
    this.tgllahir = tgllahir;
    this.noantrian = noantrian;
    this.nampoli = nampoli;
    this.namdokter = namdokter;
    this.namacus = nama;
    this.costumer = costumer;
    this.alamat = alamat;
    this.kdtarif = kdtarif;
    this.kelas = kelas;
  }

  panggil(a, b) {
    this.authService.panggilantrian(a, b).subscribe(
      (data) => {},
      (Error) => {
        console.log(Error);
      }
    );
  }
}
