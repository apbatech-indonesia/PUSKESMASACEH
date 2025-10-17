import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
import {
  NgSelectModule,
  NgSelectComponent,
  NgOption,
} from "@ng-select/ng-select";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { DatePipe } from "@angular/common";
import { FarmasijualService } from "../kasirfarmasijual/farmasijual.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-perminobat",
  templateUrl: "./perminobat.component.html",
  styles: [],
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
export class perminobatComponent implements OnInit {
  toggleMobileSidebar: any;
  satusehatheaders: any;
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
  tglp = "2013-12-12";
  tglb = "2013-12-12";
  myDate = new Date();
  showsimpan: boolean;
  tgldari = "2013-12-12";
  tglsampai = "2013-12-12";
  form: FormGroup;
  public userDetailss: any;
  @ViewChild("select") select: NgSelectComponent;
  @ViewChild("selectr") selectr: NgSelectComponent;

  @ViewChild("myinput") df: ElementRef;
  @ViewChild("myinputr") dfr: ElementRef;

  @ViewChild("myinputqty") ondf: ElementRef;
  @ViewChild("myinputqtyr") ondfr: ElementRef;
  @ViewChild("myinputket") ondfket: ElementRef;

  @ViewChild("myinputketr") ondfketr: ElementRef;

  @ViewChild("frekuensi") frekuensi: ElementRef;
  @ViewChild("jmlpakaii") jmlpakaii: ElementRef;
  @ViewChild("aturani") aturani: ElementRef;
  @ViewChild("jmlharii") jmlharii: ElementRef;

  @ViewChild("frekuensir") frekuensir: ElementRef;
  @ViewChild("jmlpakaiir") jmlpakaiir: ElementRef;
  @ViewChild("aturanir") aturanir: ElementRef;
  @ViewChild("jmlhariir") jmlhariir: ElementRef;
  @ViewChild("keteranganmr") keteranganmr: ElementRef;
  @ViewChild("Stokai") Stokai: ElementRef;

  kddokter: string;
  constructor(
    public FarmasijualService: FarmasijualService,
    private datepipe: DatePipe,
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
    this.tglp = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglb = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tgldari = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglsampai = this.datepipe.transform(this.myDate, "yyyy-MM-dd");

    const datano = JSON.parse(localStorage.getItem("noclenic"));
    this.userDetailss = datano;
    this.notrans = this.userDetailss.notrans;
    this.kddokter = this.userDetailss.kddokter;
    this.satusehatheaders = new HttpHeaders({
      "kd-cabang": this.kdcabang,
    });
    // console.log(this.userDetailss.notrans,this.userDetailss.kddokter)
    this.tampildata();
  }

  norm: string;
  kdpoli: string;
  tglpriksa: "";

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
  notrans: string;
  kelas: string;
  showdata: boolean;
  //   kelas:string;
  umur: string;

  cpptdari: any;
  nokunjungan: any;

  idpasien: any;
  idsatusehat: any;
  idhis: any;
  locationid: any;

  tampildata() {
    this.authService.datapasien(this.kdcabang, this.notrans).subscribe(
      (data) => {
        if (data.length) {
          for (let x of data) {
            this.norm = x.norm;
            this.kdpoli = x.kdpoli;
            this.tglpriksa = x.tglpriksa;

            this.kdkostumerd = x.kdkostumerd;
            this.notransaksi = x.notransaksi;
            this.pasien = x.pasien;
            this.tgllahir = x.tgllahir;
            this.noantrian = x.noantrian;
            this.nampoli = x.nampoli;
            this.namdokter = x.namdokter;
            this.namacus = x.nama;
            this.costumer = x.costumer;
            this.alamat = x.alamat;
            this.kdtarif = x.kdtarif;
            this.kelas = x.kelas;
            this.umur = x.umur;
            this.nokunjungan = x.nokunjungan;

            this.idpasien = x.idpasien;
            this.idsatusehat = x.idsatusehat;
            this.idhis = x.idhis;
            this.locationid = x.locationid;
          }

          this.cpptdari = "CPPT";
        } else {
          this.cpptdari = "CPPTRI";

          this.authService.datapasienri(this.kdcabang, this.notrans).subscribe(
            (data) => {
              for (let x of data) {
                this.norm = x.norm;
                this.kdpoli = x.kdkamar;
                this.tglpriksa = x.tglpriksa;

                this.kdkostumerd = x.kdkostumerd;
                this.notransaksi = x.notransaksi;
                this.pasien = x.pasien;
                this.tgllahir = x.tgllahir;
                this.noantrian = x.noantrian;
                this.nampoli = x.nampoli;
                this.namdokter = x.namdokter;
                this.namacus = x.nama;
                this.costumer = x.costumer;
                this.alamat = x.alamat;
                this.kdtarif = x.kdtarif;
                this.kelas = x.kelas;
                this.umur = x.umur;
              }
            },
            (Error) => {
              console.log(Error);
            }
          );
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    setTimeout(() => {
      this.tmpnonr();
    }, 150);
  }
  tdepo: any;

  ngOnInit() {
    // this.authService.gudang(this.kdcabang)
    // .subscribe(
    //   data => {
    //     this.tdepo = data;
    // },
    //   Error => {
    //    console.log(Error)
    //   }
    // )
  }
  simno: boolean = true;
  simnor: boolean = false;

  kliknonr() {
    this.simno = true;
    this.simnor = false;
  }
  nomorracik: number;
  tmetoderacik: any;

  klikr() {
    this.simno = false;
    this.simnor = true;
    this.authService.metoderacik().subscribe(
      (data) => {
        this.tmetoderacik = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService
      .nomorracik(this.kdcabang, this.notrans, this.norm)
      .subscribe(
        (data) => {
          this.nomorracik = data;
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.tmpnonr();
  }

  caritam: string = "";

  ttamplate: any;
  showtamplate: boolean = false;

  caritamplate(a) {
    if (a.target.value.length) {
      this.authService
        .hasiltamplateobat(this.kdcabang, this.kduser, a.target.value)
        .subscribe(
          (data) => {
            if (data.length) {
              this.showtamplate = true;
              this.ttamplate = data;
            } else {
              this.showtamplate = false;
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else {
      this.showtamplate = false;
    }
  }
  showtamplateb: boolean;
  ttamplateb: boolean;

  caribhp(a) {
    if (a.target.value.length) {
      this.authService
        .hasiltamplatebhp(this.kdcabang, a.target.value)
        .subscribe(
          (data) => {
            if (data.length) {
              this.showtamplateb = true;
              this.ttamplateb = data;
            } else {
              this.showtamplateb = false;
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else {
      this.showtamplateb = false;
    }
  }
  klikbhp() {
    this.simno = false;

    this.authService
      .tmpbhp(this.kdcabang, this.notrans, this.notrans + this.kddokter)
      .subscribe(
        (data) => {
          this.tlistbhpr = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  nmobat: any;
  aturan: string = " ";
  qtyk: number;
  jmlhari: number;
  keterangan: string = "";
  kdobatsatusehat: string = "";
  namaobatsatusehat: string = "";
  standart: string = "";
  satuan: string = "";
  tobat: any;
  namaob;
  frek: any;
  jmlpakai: any;
  tobata: any;
  nmobata: any;

  cariobata(a) {
    this.authService.obaterm(this.kdcabang, "2", a.target.value).subscribe(
      (data) => {
        this.tobata = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  cariobat(a) {
    this.authService.obaterm(this.kdcabang, "2", a.target.value).subscribe(
      (data) => {
        this.tobat = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  profileForm = this.fb.group({
    qtyk: ["", Validators.required],
  });
  tlistobatn: any;
  tlistobatr: any;
  tmpnonr() {
    this.authService
      .obatnonracik(this.kdcabang, this.notrans, this.notrans + this.kddokter)
      .subscribe(
        (data) => {
          this.tlistobatn = data;
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService
      .obatracik(
        this.kdcabang,
        this.notrans,
        this.notrans + this.kddokter,
        this.nomorracik
      )
      .subscribe(
        (data) => {
          this.tlistobatr = data;
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService
      .tmpbhp(this.kdcabang, this.notrans, this.notrans + this.kddokter)
      .subscribe(
        (data) => {
          this.tlistbhpr = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  tlistbhpr: any;

  caribhpt: string = "";

  pilihobattamb(kdtamplated, nama, status) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Copy",
        text: "Copy Terapi Tamplate  " + nama,

        showCancelButton: true,
        confirmButtonText: "Copy",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            kdkostumerd: this.kdkostumerd,
            norm: this.norm,
            kdpoli: this.kdpoli,
            kddokter: this.kddokter,
            kduser: this.kduser,
            kdcppt: this.notrans + this.kddokter,
            stssimpan: "1",
            kdcabang: this.kdcabang,
            notransaksi: this.notrans,
            status: status,
            kdtamplated: kdtamplated,
          };

          this.authService.copyterapitamplateb(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.klikbhp();
              }, 200);

              this.showtamplateb = false;
              this.caribhpt = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  pilihobattam(kdtamplated, nama, status) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Copy",
        text: "Copy Terapi Tamplate  " + nama,

        showCancelButton: true,
        confirmButtonText: "Copy",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          console.log(kdtamplated, nama, status);
          if (status === "Racik") {
            let body = {
              kdkostumerd: this.kdkostumerd,
              norm: this.norm,
              kdpoli: this.kdpoli,
              kddokter: this.kddokter,
              kduser: this.kduser,
              kdcppt: this.notrans + this.kddokter,
              stssimpan: "2",
              kdcabang: this.kdcabang,
              notransaksi: this.notrans,
              status: status,
              kdtamplated: kdtamplated,
            };

            this.authService.copyterapitamplate(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.tmpnonr();
                }, 200);

                this.showtamplate = false;
                this.caritam = "";
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          } else if (status === "Umum") {
            let body = {
              kdkostumerd: this.kdkostumerd,
              norm: this.norm,
              kdpoli: this.kdpoli,
              kddokter: this.kddokter,
              kduser: this.kduser,
              kdcppt: this.notrans + this.kddokter,
              stssimpan: "1",
              kdcabang: this.kdcabang,
              notransaksi: this.notrans,
              status: status,
              kdtamplated: kdtamplated,
            };

            this.authService.copyterapitamplate(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.tmpnonr();
                }, 200);

                this.showtamplate = false;
                this.caritam = "";
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          } else {
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  aturannonracik(aturan, norm, kdpoli, kddokter, notransaksi, kdpruduk, no) {
    Swal.fire({
      title: "Masukan Aturan Terbaru",
      input: "text",
      inputValue: aturan,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            aturan: value,
            no: no,
            norm: norm,
            kdpoli: kdpoli,
            kddokter: kddokter,
            kduser: this.kduser,
            kdcppt: notransaksi + kddokter,
            stssimpan: "1",
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            kdpruduk: kdpruduk,
          };

          this.authService.editaturan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  qtynonracik(
    aturan,
    norm,
    kdpoli,
    kddokter,
    notransaksi,
    kdpruduk,
    qty,
    harga,
    no
  ) {
    Swal.fire({
      title: "Masukan Qty Terbaru",
      input: "number",
      inputValue: qty,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Qty Belum disi'
          );
        } else {
          let body = {
            qty: value,
            no: no,
            norm: norm,
            kdpoli: kdpoli,
            kddokter: kddokter,
            kduser: this.kduser,
            kdcppt: notransaksi + kddokter,
            stssimpan: "3",
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            kdpruduk: kdpruduk,
            harga: harga,
          };

          this.authService.editaturan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  qtyracik(
    aturan,
    norm,
    kdpoli,
    kddokter,
    notransaksi,
    kdpruduk,
    qty,
    harga,
    no
  ) {
    Swal.fire({
      title: "Masukan Qty Terbaru",
      input: "number",
      inputValue: qty,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Qty Belum disi'
          );
        } else {
          let body = {
            qty: value,
            no: no,
            norm: norm,
            kdpoli: kdpoli,
            kddokter: kddokter,
            kduser: this.kduser,
            kdcppt: notransaksi + kddokter,
            stssimpan: "4",
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            kdpruduk: kdpruduk,
            harga: harga,
          };

          console.log(body);

          this.authService.editaturan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  keteranganracik(
    aturan,
    norm,
    kdpoli,
    kddokter,
    notransaksi,
    kdpruduk,
    qty,
    harga,
    no
  ) {
    Swal.fire({
      title: "Masukan Keterangan Terbaru",
      input: "text",
      inputValue: aturan,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Qty Belum disi'
          );
        } else {
          let body = {
            keterangan: value,
            no: no,
            norm: norm,
            kdpoli: kdpoli,
            kddokter: kddokter,
            kduser: this.kduser,
            kdcppt: notransaksi + kddokter,
            stssimpan: "5",
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            kdpruduk: kdpruduk,
            harga: harga,
          };

          console.log(body);

          this.authService.editaturan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  ketnonracik(aturan, norm, kdpoli, kddokter, notransaksi, kdpruduk, no) {
    Swal.fire({
      title: "Masukan Keterangan Terbaru",
      input: "text",
      inputValue: aturan,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            keterangan: value,
            no: no,
            norm: norm,
            kdpoli: kdpoli,
            kddokter: kddokter,
            kduser: this.kduser,
            kdcppt: notransaksi + kddokter,
            stssimpan: "2",
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            kdpruduk: kdpruduk,
          };

          this.authService.editaturan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  aturanracikm(
    kdtamplated,
    namaracik,
    metode,
    aturan,
    qty,
    keterangan,
    notransaksi,
    kdpoli
  ) {
    Swal.fire({
      title: "Masukan Aturan Terbaru",
      input: "text",
      inputValue: aturan,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            kdtamplated: kdtamplated,
            namaracik: namaracik,
            metode: metode,
            aturan: value,
            qty: qty,
            keterangan: keterangan,
            notransaksi: notransaksi,
            kdcabang: this.kdcabang,
            stssimpan: "1",
            kdpoli: kdpoli,
            kduser: this.kduser,
          };

          this.authService.editaturanm(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  qtyracikm(
    kdtamplated,
    namaracik,
    metode,
    aturan,
    qty,
    keterangan,
    notransaksi,
    kdpoli
  ) {
    Swal.fire({
      title: "Masukan Qty Terbaru",
      input: "number",
      inputValue: qty,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            kdtamplated: kdtamplated,
            namaracik: namaracik,
            metode: metode,
            aturan: aturan,
            qty: value,
            keterangan: keterangan,
            notransaksi: notransaksi,
            kdcabang: this.kdcabang,
            stssimpan: "2",
            kdpoli: kdpoli,
            kduser: this.kduser,
          };

          this.authService.editaturanm(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  keteranganracikm(
    kdtamplated,
    namaracik,
    metode,
    aturan,
    qty,
    keterangan,
    notransaksi,
    kdpoli
  ) {
    Swal.fire({
      title: "Masukan keterangan Terbaru",
      input: "text",
      inputValue: keterangan,

      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            kdtamplated: kdtamplated,
            namaracik: namaracik,
            metode: metode,
            aturan: aturan,
            qty: qty,
            keterangan: value,
            notransaksi: notransaksi,
            kdcabang: this.kdcabang,
            stssimpan: "3",
            kdpoli: kdpoli,
            kduser: this.kduser,
          };

          this.authService.editaturanm(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  metoderacik(
    kdtamplated,
    namaracik,
    metode,
    aturan,
    qty,
    keterangan,
    notransaksi,
    kdpoli
  ) {
    Swal.fire({
      title: "Masukan keterangan Terbaru",
      input: "select",
      inputValue: metode,
      inputOptions: {
        Puyer: "Puyer",
        Salep: "Salep",
        Sirup: "Sirup",
        Kapsul: "Kapsul",
      },

      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            kdtamplated: kdtamplated,
            namaracik: namaracik,
            metode: value,
            aturan: aturan,
            qty: qty,
            keterangan: value,
            notransaksi: notransaksi,
            kdcabang: this.kdcabang,
            stssimpan: "4",
            kdpoli: kdpoli,
            kduser: this.kduser,
          };

          this.authService.editaturanm(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }
  tterapi: any;

  klikorb() {
    this.simnor = false;
    this.simno = false;
    this.authService.riwayatobat(this.kdcabang, this.norm).subscribe(
      (data) => {
        this.tterapi = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  hapusobat(
    notransaksi,
    kdpoli,
    kdpruduk,
    statuso,
    dari,
    kunci,
    no,
    kdcppt,
    nama,
    kdobatbpjs,
    kdObatSK,
    kdRacikan
  ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus",
        text: "Hapus  " + nama,

        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          if (kunci === "1") {
            this.toastr.error(
              "Data telah di verifikasi tidak bisa di hapus",
              "Eror"
            );
          } else {
            let body = {
              notransaksi: notransaksi,
              kdpoli: kdpoli,
              kdpruduk: kdpruduk,
              statuso: statuso,
              dari: dari,
              kunci: kunci,
              no: no,
              kdcppt: kdcppt,
              kdcabang: this.kdcabang,
              stssimpan: "1",
            };
            this.authService.hapusobatnon(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.tmpnonr();
                }, 200);

                this.authService
                  .deleteobat(this.nokunjungan, kdObatSK)
                  .subscribe(
                    (data) => {
                      if (data.metaData.code == 200) {
                        this.toastr.success(data.metaData.message, "");

                        this.klikcekobatbpjs();
                      } else {
                        this.toastr.error(data.metaData.message, "");
                      }
                    },
                    (Error) => {
                      console.log(Error);
                    }
                  );
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  hapusobatt(a) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus",
        text: "Hapus  ",

        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            notransaksi: this.notrans,
            kdpoli: this.kdpoli,
            kdpruduk: "",
            kd: a,
            statuso: "MRacik",
            dari: "MObat",
            kunci: "0",
            no: "",
            kdcppt: this.notrans + this.kddokter,
            kdcabang: this.kdcabang,
            stssimpan: "2",
          };
          this.authService.hapusobatnon(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  onsimpan() {
    this.tambahobat();
  }
  signa: string = "";

  tambahobatedit() {
    var x: number;

    x = parseInt(this.Stok) + parseInt(this.qtydulu);

    if (x < this.qtyk) {
      this.toastr.error(
        "Stok Tidak Menyukupi untuk " +
          this.jmlhari +
          " Hari,Silahkan Sesuikan",
        "Eror"
      );
    } else {
      let body = {
        nmobat: this.nmobat,
        aturan: this.aturan,
        qtyk: this.qtyk,
        keterangan: this.keterangan,
        notrans: this.notrans,
        norm: this.norm,
        kddokter: this.kddokter,
        kdpoli: this.kdpoli,
        kdobat: this.nmobat,
        statuso: "Non Racik",
        dari: "Obat",
        kduser: this.username,
        kdcabang: this.kdcabang,
        kdcppt: this.notrans + this.kddokter,
        stssimpan: "4",
        kdkostumerd: this.kdkostumerd,
        frek: this.frek,
        jmlpakai: this.jmlpakai,
        signa: this.signa,
        jmlhari: this.jmlhari,
        no: this.no,
        cpptdari: this.cpptdari,
        kdobatsatusehat: this.kdobatsatusehat,
        namaobatsatusehat: this.namaobatsatusehat,
      };

      this.authService.simpanrxobaterm(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });

          setTimeout(async () => {
            if (this.kdobatsatusehat) await this.simpanobatsatusehat();
            this.bataledit();
            this.tmpnonr();
          }, 200);
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
    }
  }
  tambahobatal() {
    if (this.Stok < this.qtyk) {
      this.toastr.error(
        "Stok Tidak Menyukupi untuk " +
          this.jmlhari +
          " Hari,Silahkan Sesuikan",
        "Eror"
      );
    } else {
      let body = {
        nmobat: this.nmobata,
        aturan: this.aturan,
        qtyk: this.qtyk,
        keterangan: this.keterangan,
        notrans: this.notrans,
        norm: this.norm,
        kddokter: this.kddokter,
        kdpoli: this.kdpoli,
        kdobat: this.nmobat,
        statuso: "BHP",
        dari: "Obat",
        kduser: this.username,
        kdcabang: this.kdcabang,
        kdcppt: this.notrans + this.kddokter,
        stssimpan: "1",
        kdkostumerd: this.kdkostumerd,
        frek: this.frek,
        jmlpakai: this.jmlpakai,
        signa: this.signa,
        jmlhari: this.jmlhari,
        cpptdari: this.cpptdari,
        kdobatsatusehat: this.kdobatsatusehat,
        namaobatsatusehat: this.namaobatsatusehat,
      };

      console.log(body);

      this.authService.simpanrxobaterm(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });
          this.nmobat = "";

          this.select.handleClearClick();

          this.qtyk = 0;

          this.Stoka = 0;

          setTimeout(() => {
            this.klikbhp();
          }, 200);
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
    }
  }
  tambahobat() {
    if (this.Stok < this.qtyk) {
      this.toastr.error(
        "Stok Tidak Menyukupi untuk " +
          this.jmlhari +
          " Hari,Silahkan Sesuikan",
        "Eror"
      );
    } else {
      let body = {
        nmobat: this.nmobat,
        aturan: this.aturan,
        qtyk: this.qtyk,
        keterangan: this.keterangan,
        notrans: this.notrans,
        norm: this.norm,
        kddokter: this.kddokter,
        kdpoli: this.kdpoli,
        kdobat: this.nmobat,
        statuso: "Non Racik",
        dari: "Obat",
        kduser: this.username,
        kdcabang: this.kdcabang,
        kdcppt: this.notrans + this.kddokter,
        stssimpan: "1",
        kdkostumerd: this.kdkostumerd,
        frek: this.frek,
        jmlpakai: this.jmlpakai,
        signa: this.signa,
        jmlhari: this.jmlhari,
        cpptdari: this.cpptdari,
        kdobatsatusehat: this.kdobatsatusehat,
        namaobatsatusehat: this.namaobatsatusehat,
      };

      console.log(body);

      this.authService.simpanrxobaterm(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });

          setTimeout(async () => {
            if (this.kdobatsatusehat) await this.simpanobatsatusehat();
            this.nmobat = "";
            this.select.handleClearClick();
            this.frek = "";
            this.jmlpakai = "";
            this.signa = "";
            this.jmlhari = 0;
            this.qtyk = 0;
            this.keterangan = "";
            this.kdobatsatusehat = "";
            this.namaobatsatusehat = "";
            this.keterangan = "";
            this.Stok = 0;

            this.tmpnonr();
          }, 200);
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
    }
  }

  async simpanobatsatusehat() {
    let cabang: any = await this.getCabang(this.userDetails.kdklinik);

    let medication: any = await this.authService.medication(
      {
        data: {
          orgId: cabang.kodeorg,
          medicationUUID: `${this.generateUUID()}`,
          kodeObat: this.kdobatsatusehat,
          listObat: this.namaobatsatusehat,
        },
      },
      this.satusehatheaders
    );

    let medicationRequest: any = await this.authService.medicationRequest(
      {
        data: {
          orgId: cabang.kodeorg,
          medicationId: medication.id,
          MedicationRequestUUID: `${this.generateUUID()}`,
          encounterId: this.idsatusehat,
          patientId: this.idpasien,
          patientName: this.pasien,
          practitionerId: this.idhis,
          practitionerName: this.namdokter,
          listObat: this.namaobatsatusehat,
          patientInstruction: `${this.frek} x ${this.jmlpakai} ${this.satuan} per hari ${this.signa}, ${this.keterangan}`,
          frequency: this.frek,
          quantity: this.qtyk,
          duration: this.jmlhari,
          standart: this.standart,
          authoredOnDate: this.myDate.toISOString(),
          validityStartDate: this.myDate.toISOString(),
          validityEndDate: this.myDate.toISOString(),
        },
      },
      this.satusehatheaders
    );

    await this.authService.medicationDispense(
      {
        data: {
          orgId: cabang.kodeorg,
          MedicationDispenseUUID: `${this.generateUUID()}`,
          medicationId: medication.id,
          medicationRequestId: medicationRequest.id,
          patientId: this.idpasien,
          patientName: this.pasien,
          encounterId: this.idsatusehat,
          encounterDescription: this.keterangan ?? "",
          practitionerId: this.idhis,
          practitionerDescription: this.namdokter,
          locationId: this.locationid,
          preparedDate: this.myDate.toISOString(),
          handedOverDate: this.myDate.toISOString(),
          listObat: this.namaobatsatusehat,
          patientInstruction: `${this.frek} x ${this.jmlpakai} ${this.satuan} per hari ${this.signa}, ${this.keterangan}`,
          frequency: this.frek,
          duration: this.jmlhari,
          quantity: this.qtyk,
          standart: this.standart,
        },
      },
      this.satusehatheaders
    );

    await this.authService.medicationStatement(
      {
        data: {
          medicationId: medication.id,
          medicationName: this.namaobatsatusehat,
          patientId: this.idpasien,
          patientName: this.pasien,
          dosisDescription: `${this.frek} x ${this.jmlpakai} ${this.satuan} per hari ${this.signa}, ${this.keterangan}`,
          frequency: this.frek,
          period: this.jmlhari,
          periodMax: this.jmlhari,
          priodUnit: "h",
          date: this.myDate.toISOString(),
          encounterId: this.idsatusehat,
        },
      },
      this.satusehatheaders
    );
  }

  tfrekuensi: any;
  kdcp: any;
  kdbs: any;
  showfrekuensi: boolean;
  Stok: any;
  satuanlabel: any = "";

  onobat(a) {
    this.frek = "";
    this.jmlpakai = "";
    this.signa = "";
    this.jmlhari = 0;
    this.qtyk = 0;
    this.keterangan = "";
    this.kdobatsatusehat = "";
    this.namaobatsatusehat = "";
    this.authService.obatermbyid(this.kdcabang, this.nmobat).subscribe(
      (data) => {
        if (data.length) {
          for (let x of data) {
            this.kdcp = x.kdcp;
            this.kdbs = x.kdbs;
            this.kdobatsatusehat = x.kdobatsatusehat;
            this.satuanlabel = x.satuan;
            if (x.stok <= 0) {
              this.toastr.error("Maaf Stok Obat Tidak Tersedia", "Eror");
              this.select.handleClearClick();
            } else {
              this.Stok = x.stok;
              this.frekuensi.nativeElement.focus();
              setTimeout(() => {
                this.authService.frekuensiobat(this.kdcp, this.kdbs).subscribe(
                  (data) => {
                    if (data.length) {
                      this.showfrekuensi = true;
                      this.tfrekuensi = data;
                    } else {
                      this.authService.tamplatesignano("1").subscribe(
                        (data) => {
                          this.showfrekuensi = true;
                          this.tfrekuensi = data;
                        },
                        (Error) => {
                          console.log(Error);
                        }
                      );
                    }
                  },
                  (Error) => {
                    console.log(Error);
                  }
                );
              }, 200);
            }
          }
        } else {
          return data;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    // this.df.nativeElement.focus();
  }

  Stoka: any;

  onobatx(a) {
    this.authService.obatermbyid(this.kdcabang, this.nmobata).subscribe(
      (data) => {
        if (data.length) {
          for (let x of data) {
            this.kdcp = x.kdcp;
            this.kdbs = x.kdbs;
            this.satuanlabel = x.satuan;

            if (x.stok <= 0) {
              this.toastr.error("Maaf Stok Obat Tidak Tersedia", "Eror");
              this.select.handleClearClick();
            } else {
              this.Stoka = x.stok;
              this.Stokai.nativeElement.focus();
            }
          }
        } else {
          return data;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    // this.df.nativeElement.focus();
  }

  tulisfrek(a) {
    if (a.target.value === "") {
      this.showfrekuensi = true;
    } else {
      this.showfrekuensi = false;
    }
  }

  tulisjmlpakai(a) {
    //  console.log(a.target.value.length);
    if (a.target.value.length <= 0) {
      this.showjmlpakai = true;
    } else {
      this.showjmlpakai = false;
    }
  }

  tulissigna(a) {
    //  console.log(a.target.value.length);
    if (a.target.value.length <= 0) {
      this.showsigna = true;
    } else {
      this.showsigna = false;
    }
  }

  tulissignax(a) {
    this.showsigna = false;

    setTimeout(() => {
      this.authService.hari().subscribe(
        (data) => {
          if (data.length) {
            this.tjmlhari = data;
            this.showjmlhari = true;
            this.jmlharii.nativeElement.focus();
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    }, 200);
  }
  tulisjmlhari(a) {
    //  console.log(a.target.value.length);
    if (a.target.value.length <= 0) {
      this.showjmlhari = true;
    } else {
      this.showjmlhari = false;
    }
  }
  tjmlberi: any;
  showjmlpakai: boolean;

  pilihfrek(a) {
    this.frek = a;
    this.showfrekuensi = false;

    setTimeout(() => {
      this.authService.jmlobathari(this.kdcp, this.kdbs).subscribe(
        (data) => {
          if (data.length) {
            this.showjmlpakai = true;

            this.tjmlberi = data;

            this.jmlpakaii.nativeElement.focus();
          } else {
            this.authService.tamplatesignano("2").subscribe(
              (data) => {
                this.showjmlpakai = true;

                this.tjmlberi = data;
                this.jmlpakaii.nativeElement.focus();
              },
              (Error) => {
                console.log(Error);
              }
            );
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    }, 200);
  }
  pilihfrekx(a) {
    this.showfrekuensi = false;

    this.authService.tamplatesignano("2").subscribe(
      (data) => {
        this.showjmlpakai = true;

        this.tjmlberi = data;
        this.jmlpakaii.nativeElement.focus();
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  showsigna: boolean;
  tsigna: any;
  showjmlhari: boolean;

  pilihjmlpakai(a) {
    this.jmlpakai = a;
    this.showjmlpakai = false;

    setTimeout(() => {
      this.authService.signa(this.kdcp, this.kdbs).subscribe(
        (data) => {
          if (data.length) {
            this.tsigna = data;
            this.showsigna = true;
            this.aturani.nativeElement.focus();
          } else {
            this.authService.tamplatesignano("3").subscribe(
              (data) => {
                this.tsigna = data;
                this.showsigna = true;
                this.aturani.nativeElement.focus();
              },
              (Error) => {
                console.log(Error);
              }
            );

            // pilihjmlpakai
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    }, 200);
  }

  pilihjmlpakaix(a) {
    this.showjmlpakai = false;

    this.authService.tamplatesignano("3").subscribe(
      (data) => {
        this.tsigna = data;
        this.showsigna = true;
        this.aturani.nativeElement.focus();
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tjmlhari: any;

  pilihsigna(a) {
    this.signa = a;
    this.showsigna = false;

    setTimeout(() => {
      this.authService.hari().subscribe(
        (data) => {
          if (data.length) {
            this.tjmlhari = data;
            this.showjmlhari = true;
            this.jmlharii.nativeElement.focus();
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    }, 200);
  }
  pilihhari(a) {
    this.jmlhari = a;
    this.showjmlhari = false;

    var x: number;
    var y: number;

    x = this.frek * this.jmlpakai;

    y = x * this.jmlhari;

    if (isNaN(y)) {
      this.qtyk = 1;
    } else {
      this.qtyk = y;
    }

    setTimeout(() => {
      this.ondfket.nativeElement.focus();
    }, 150);
  }
  pilihharix(a) {
    this.showjmlhari = false;

    var x: number;
    var y: number;

    x = this.frek * this.jmlpakai;

    y = x * this.jmlhari;

    if (isNaN(y)) {
      this.qtyk = 1;
    } else {
      this.qtyk = y;
    }

    setTimeout(() => {
      this.ondfket.nativeElement.focus();
    }, 150);
  }

  onobatr(a) {
    this.dfr.nativeElement.focus();
  }
  onqty() {
    this.ondf.nativeElement.focus();
  }
  onqtyr() {
    this.ondfr.nativeElement.focus();
  }

  onket() {
    this.ondfket.nativeElement.focus();
  }
  tobatx: any;

  nmobatx: any;

  aturanx: string = " ";
  qtykx: number;
  keteranganx: string;

  namaracikm: string = "";
  metode: any;
  aturanm: string = "";
  qtykm: number;
  keteranganm: string = "";

  tambahobatr() {
    let body = {
      nmobat: this.nmobatx,
      aturan: "-",
      qtyk: this.qtykx,
      keterangan: this.keteranganx,
      noracik: this.ketshow,
      notrans: this.notrans,
      norm: this.norm,
      kddokter: this.kddokter,
      kdpoli: this.kdpoli,
      kdobat: this.nmobatx,
      statuso: "Racik",
      dari: "Obat",
      kduser: this.username,
      kdcabang: this.kdcabang,
      kdcppt: this.notrans + this.kddokter,
      stssimpan: "2",
      kdkostumerd: this.kdkostumerd,
      cpptdari: this.cpptdari,
      kdobatsatusehat: this.kdobatsatusehat,
      namaobatsatusehat: this.namaobatsatusehat,
    };

    this.authService.simpanrxobaterm(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.nmobatx = "";

        this.qtykx = 0;
        this.keteranganx = "";

        this.selectr.handleClearClick();

        setTimeout(() => {
          this.tmpnonr();
        }, 250);
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  cariobatx(a) {
    this.authService.obaterm(this.kdcabang, "2", a.target.value).subscribe(
      (data) => {
        this.tobatx = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  onketsimpan() {
    this.tambahobatr();
  }
  verifracik() {
    let body = {
      nmobat: this.namaracikm,
      aturan: this.aturanm,
      qtyk: this.qtykm,
      keterangan: this.keteranganm,
      noracik: this.nomorracik,
      notrans: this.notrans,
      norm: this.norm,
      kddokter: this.kddokter,
      metode: this.metode,
      kdpoli: this.kdpoli,
      kdobat: this.namaracikm,
      statuso: "MRacik",
      dari: "MObat",
      kduser: this.username,
      kdcabang: this.kdcabang,
      kdcppt: this.notrans + this.kddokter,
      stssimpan: "3",
      kdkostumerd: this.kdkostumerd,
      frekracik: this.frekracik,
      jmlpakairacik: this.jmlpakairacik,
      aturanracik: this.aturanracik,
      jmlhariracik: this.jmlhariracik,
      cpptdari: this.cpptdari,
      kdobatsatusehat: this.kdobatsatusehat,
      namaobatsatusehat: this.namaobatsatusehat,
    };

    console.log(body);

    this.authService.simpanrxobaterm(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.namaracikm = "";
        this.aturanm = "";
        this.qtykm = 0;
        this.keteranganm = "";
        this.frekracik = "";
        this.jmlpakairacik = "";
        this.aturanracik = "";
        this.jmlhariracik = "";

        setTimeout(() => {
          this.tmpnonr();

          this.authService
            .nomorracik(this.kdcabang, this.notrans, this.norm)
            .subscribe(
              (data) => {
                this.nomorracik = data;
              },
              (Error) => {
                console.log(Error);
              }
            );
        }, 250);
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  copyterapi(notransaksi, nama) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Copy",
        text: "Copy Terapi Tanggal  " + nama,

        showCancelButton: true,
        confirmButtonText: "Copy",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            notrans: notransaksi,
            notransaksi: this.notrans,
            kdkostumerd: this.kdkostumerd,
            norm: this.norm,
            kddokter: this.kddokter,
            kdpoli: this.kdpoli,
            kduser: this.kduser,
            kdcppt: this.notrans + this.kddokter,
            stssimpan: "1",
            kdcabang: this.kdcabang,
            kdtamplate: "0",
          };

          this.authService.copyterapi(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  showtomboledit: boolean;
  namaobat: any;
  no: any;
  qtydulu: any;

  editobat(
    kdpruduk,
    nama,
    qty,
    keterangan,
    signa,
    hari,
    frekuensi,
    jmlpakai,
    no
  ) {
    this.qtyk = qty;
    this.qtydulu = qty;

    this.frek = frekuensi;
    this.jmlpakai = jmlpakai;
    this.signa = signa;
    this.jmlhari = hari;
    this.keterangan = keterangan;
    this.nmobat = kdpruduk;
    this.namaobat = nama;
    this.no = no;

    this.authService.obatermbyid(this.kdcabang, this.nmobat).subscribe(
      (data) => {
        if (data.length) {
          for (let x of data) {
            this.kdcp = x.kdcp;
            this.kdbs = x.kdbs;
            this.kdobatsatusehat = x.kdobatsatusehat;
            this.namaobatsatusehat = x.namaobatsatusehat;
            this.satuanlabel = x.satuan;
            if (x.stok <= 0) {
              this.toastr.error("Maaf Stok Obat Tidak Tersedia", "Eror");
              this.select.handleClearClick();
            } else {
              this.Stok = x.stok;
              this.frekuensi.nativeElement.focus();
              setTimeout(() => {
                this.authService.frekuensiobat(this.kdcp, this.kdbs).subscribe(
                  (data) => {
                    if (data.length) {
                      this.showfrekuensi = true;
                      this.tfrekuensi = data;
                    } else {
                      this.authService.tamplatesignano("1").subscribe(
                        (data) => {
                          this.showfrekuensi = true;
                          this.tfrekuensi = data;
                        },
                        (Error) => {
                          console.log(Error);
                        }
                      );
                    }
                  },
                  (Error) => {
                    console.log(Error);
                  }
                );
              }, 200);
            }
          }
        } else {
          return data;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.showtomboledit = true;
  }

  bataledit() {
    this.showtomboledit = false;
    this.nmobat = "";

    this.frek = "";
    this.jmlpakai = "";
    this.signa = "";
    this.jmlhari = 0;
    this.qtyk = 0;
    this.keterangan = "";
    this.kdobatsatusehat = "";
    this.namaobatsatusehat = "";
    this.Stok = 0;
    this.showfrekuensi = false;
    this.showjmlpakai = false;
    this.showsigna = false;
    this.showjmlhari = false;
  }

  frekracik: any;
  jmlpakairacik: any;
  aturanracik: any;
  jmlhariracik: any;
  showfrekuensir: boolean;
  tfrekuensir: boolean;
  showjmlpakair: boolean;
  tjmlberir: any;

  onChange(a) {
    this.frekuensir.nativeElement.focus();

    this.authService.tamplatesignano("1").subscribe(
      (data) => {
        this.showfrekuensir = true;
        this.tfrekuensir = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tulisfrekr(a) {
    if (a.target.value === "") {
      this.showfrekuensir = true;
    } else {
      this.showfrekuensir = false;
    }
  }

  tulisfrekre(a) {
    this.jmlpakaiir.nativeElement.focus();
    this.showfrekuensir = false;

    this.authService.tamplatesignano("2").subscribe(
      (data) => {
        this.showjmlpakair = true;
        this.tjmlberir = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  pilihfrekr(APJML) {
    this.frekracik = APJML;
    this.jmlpakaiir.nativeElement.focus();
    this.showfrekuensir = false;

    this.authService.tamplatesignano("2").subscribe(
      (data) => {
        this.showjmlpakair = true;
        this.tjmlberir = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  showsignar: boolean;
  tsignar: boolean;
  pilihjmlpakaire(a) {
    this.showjmlpakair = false;
    this.authService.tamplatesignano("3").subscribe(
      (data) => {
        this.showsignar = true;
        this.tsignar = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
    this.aturanir.nativeElement.focus();
  }
  pilihjmlpakair(a) {
    this.jmlpakairacik = a;
    this.showjmlpakair = false;
    this.aturanir.nativeElement.focus();

    this.authService.tamplatesignano("3").subscribe(
      (data) => {
        this.showsignar = true;
        this.tsignar = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  pilihsignar(a) {
    this.showsignar = false;
    this.jmlhariir.nativeElement.focus();
    this.aturanracik = a;

    this.authService.hari().subscribe(
      (data) => {
        if (data.length) {
          this.tjmlharir = data;
          this.showjmlharir = true;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  pilihsignarr() {
    this.showsignar = false;
    this.jmlhariir.nativeElement.focus();
    this.authService.hari().subscribe(
      (data) => {
        if (data.length) {
          this.tjmlharir = data;
          this.showjmlharir = true;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  showjmlharir: boolean;
  tjmlharir: boolean;
  pilihharir(a) {
    this.jmlhariracik = a;
    this.showjmlharir = false;
    var x: number;
    var y: number;

    x = this.frekracik * this.jmlpakairacik;

    y = x * this.jmlhariracik;

    if (isNaN(y)) {
      this.qtykm = 1;
    } else {
      this.qtykm = y;
    }

    this.keteranganmr.nativeElement.focus();
  }

  pilihharire() {
    this.showjmlharir = false;
    var x: number;
    var y: number;

    x = this.frekracik * this.jmlpakairacik;

    y = x * this.jmlhariracik;

    if (isNaN(y)) {
      this.qtykm = 1;
    } else {
      this.qtykm = y;
    }

    this.keteranganmr.nativeElement.focus();
  }
  ketshow: any;

  kshowracik(
    kdtamplated,
    namaracik,
    metode,
    aturan,
    qty,
    keterangan,
    notransaksi,
    kdpoli
  ) {
    this.ketshow = kdtamplated;
  }

  batalinput() {
    this.ketshow = "";
  }

  lobatbpjs: any;
  hapusobatbpjs(a) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus",
        text: "Hapus  Obat ",

        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.authService.deleteobat(this.nokunjungan, a).subscribe(
            (data) => {
              if (data.metaData.code == 200) {
                this.toastr.success(data.metaData.message, "");

                this.klikcekobatbpjs();
              } else {
                this.toastr.error(data.metaData.message, "");
              }
            },
            (Error) => {
              console.log(Error);
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }
  klikcekobatbpjs() {
    this.authService.cekkunjunganobat(this.nokunjungan).subscribe(
      (data) => {
        console.log(data);

        this.lobatbpjs = data.response.list;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  pilihObat(data: any) {
    console.log(data.obatx);
  }

  getCabang(kdklinik: any) {
    return new Promise((resolve) => {
      this.authService.cabangper(kdklinik).subscribe((data) => {
        data.forEach((e) => {
          resolve(e);
        });
      });
    });
  }

  generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  async simpanMappingObat(kdobat, kdobatsatusehat) {
    let cabang: any = await this.getCabang(this.userDetails.kdklinik);
    cabang = cabang.slug.toUpperCase();
    await this.authService
      .simpanMappingObat(cabang, kdobat, kdobatsatusehat)
      .toPromise();
  }
}
