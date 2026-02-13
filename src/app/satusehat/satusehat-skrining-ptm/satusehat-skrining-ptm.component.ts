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
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import * as moment from "moment";
import { DatePipe } from "@angular/common";
import { ChatService } from "../../chat.service";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Router } from "@angular/router";
import { FarmasijualService } from "src/app/clmaster/kasirfarmasijual/farmasijual.service";

@Component({
  selector: "app-ermdokterrm",
  templateUrl: "./satusehat-skrining-ptm.component.html",
  providers: [
    DatePipe,
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
export class satusehatSkriningPtmComponent implements OnInit {
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
  tglpx: any;

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
  myDate = new Date();
  tglpxs: any;
  kodeorg: any = "";
  tglss: any;
  constructor(
    public FarmasijualService: FarmasijualService,
    private router: Router,
    private chatService: ChatService,
    private datepipe: DatePipe,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private fb: FormBuilder,
  ) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
    this.username = this.userDetails.username;
    this.kduser = this.userDetails.kduser;
    this.tglpx = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglpxs = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglss = this.datepipe.transform(
      this.myDate,
      "yyyy-MM-ddTHH:mm:ss+07:00",
    );
  }
  slug: any;

  ngOnInit() {
    this.tmptotal();

    this.authService.cabangper(this.kdklinik).subscribe(
      (data) => {
        for (let x of data) {
          this.slug = x.slug;
        }
      },
      (Error) => {
        console.log(Error);
      },
    );
  }
  tampilpas: any;
  ktglrad() {
    this.tmptotal();
  }
  tmptotal() {
    this.authService
      .pasienrm(this.kdcabang, "1", "", "2", this.tglpx, this.tglpxs)
      .subscribe(
        (data) => {
          this.tampilpas = data;
        },
        (Error) => {
          console.log(Error);
        },
      );
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(moment(event.value).format());
    this.tglpx = moment(event.value).format();
    this.tmptotal();
  }

  cpasien(a) {
    this.authService
      .pasienrm(
        this.kdcabang,
        "1",
        a.target.value,
        "2",
        this.tglpx,
        this.tglpxs,
      )
      .subscribe(
        (data) => {
          this.tampilpas = data;
        },
        (Error) => {
          console.log(Error);
        },
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
    kelas,
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
  // x.noantrian,x.kddokter,x.namdokter,x.kodeantrian,x.notransaksi,x.kdpolibpjs,x.noasuransi,x.tglpriksa
  panggil(
    a,
    kddokter,
    namdokter,
    kodeantrian,
    notransaksi,
    kdpolibpjs,
    noasuransi,
    tglpriksa,
    pasien,
    nampoli,
  ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
        denyButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Panggil?",
        text: "Yakin Akan Panggil Antrian",
        icon: "warning",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Panggil",
        cancelButtonText: "Hadir",
        denyButtonText: "Tidak Hadir",

        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
        } else if (result.isDenied) {
          let body = {
            tanggalperiksa: tglpriksa,
            kodepoli: kdpolibpjs,
            nomorkartu: noasuransi,
            status: 2,
            waktu: this.myDate.getTime(),
          };

          var data: any;

          this.authService
            .PanggilBpjsAntrian(body, this.slug)
            .subscribe((response) => {
              if (response.data.code == 200) {
                this.toastr.success(response.data.message, "Sukses", {
                  timeOut: 2000,
                });
              } else {
                this.toastr.error(response.data.message, "Error");
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          let body = {
            tanggalperiksa: tglpriksa,
            kodepoli: kdpolibpjs,
            nomorkartu: noasuransi,
            status: 1,
          };

          var data: any;

          this.authService
            .PanggilBpjsAntrian(body, this.slug)
            .subscribe((response) => {
              if (response.data.code == 200) {
                this.toastr.success(response.data.message, "Sukses", {
                  timeOut: 2000,
                });

                let bodyeditfarmasi = {
                  stssimpan: "4",
                  notransaksi: notransaksi,
                };

                this.authService
                  .editobatsk(bodyeditfarmasi)
                  .subscribe((response) => {
                    console.log(response);
                    this.tmptotal();
                  });
              } else {
                this.toastr.error(response.metadata.message, "Error");
              }
            });
        }
      });
  }
}
