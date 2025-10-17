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
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SampleService } from "src/app/services";
import { ObatconService } from "./obatcon.service";
@Component({
  selector: "app-mobat",
  templateUrl: "./mobat.component.html",
  styles: [
    `
      .example-container {
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
    `,
  ],
})
export class MobatComponent implements OnInit {
  faSearch = faSearch;
  heading = "Master Obat";
  subheading: any;
  icon = "pe-7s-diamond icon-gradient bg-warm-flame";

  options: FormGroup;
  public userDetails: any;
  nama: any;
  akses: any;

  kdklinik: any;
  cabangarr: any;
  Username: "";
  password: "";
  namal: "";
  hakakses: "";
  kdcb: "";
  cariuser: any;

  kdcabang: any;

  ngModelExample: number = 10;
  namaobat: string;

  disc: number = 0;
  ppn: number = 0;
  hargabeli: number = 0;
  margin: number = 0;
  hargajual: number = 0;
  bhp: string = "";
  zakaktif: string = "";
  standart: string = "";
  standartd: string = "";
  sedang: string = "";
  sedangd: string = "";
  kemasan: string = "";
  kemasand: string = "";
  zataktif: string = "";
  satuanobat: string = "";

  hostName: string;
  URLINVOICE: string;

  constructor(
    public hots: SampleService,
    public ObatconService: ObatconService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private fb: FormBuilder
  ) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });

    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
  }

  masterform = this.fb.group({
    obat: ["", Validators.required],
    // hna : ['',Validators.required],
    // ppn : ['',Validators.required],
    // hargabeli : ['',Validators.required],
    // margin : ['',Validators.required],
    // hargajual : ['',Validators.required],
    // bhp : ['',Validators.required],
    // rakinput : ['',Validators.required],
    supplierd: ["", Validators.required],
    pabrikand: ["", Validators.required],
    golonganobatd: ["", Validators.required],
    jenisobatd: ["", Validators.required],
    standart: ["", Validators.required],
  });

  rakform = this.fb.group({
    inrak: ["", Validators.required],
  });

  supform = this.fb.group({
    insup: ["", Validators.required],
    inalamat: ["", Validators.required],
  });

  pabform = this.fb.group({
    inpabrik: ["", Validators.required],
    inalamatp: ["", Validators.required],
  });

  chna(a) {
    console.log(parseInt(a.target.value));

    var kjumlah: number;
    var hrg: number;
    var disc: number;
    kjumlah = (parseInt(a.target.value) * this.ppn) / 100;

    hrg = kjumlah + this.hna;

    disc = (this.disc * hrg) / 100;

    this.hargabeli = hrg - disc;

    this.cmargin("");
  }

  cdisc(a) {
    // this.disc = a.target.value;

    var kjumlah: number;
    var hrg: number;
    var disc: number;
    kjumlah = (this.hna * this.ppn) / 100;

    console.log(kjumlah);
    hrg = kjumlah + Number(this.hna);

    disc = (this.disc * hrg) / 100;

    this.hargabeli = hrg - disc;
  }

  cppn(a) {
    var kjumlah: number;
    var hrg: number;
    var disc: number;
    kjumlah = (Number(this.hna) * this.ppn) / 100;

    hrg = kjumlah + Number(this.hna);

    disc = (this.disc * hrg) / 100;

    this.hargabeli = hrg - disc;
  }

  cmargin(a) {
    var hnx: number;
    var hny: number;
    hnx = (Number(this.hna) * this.ppn) / 100;

    var hni: number;
    var hns: number;

    hni = hnx + Number(this.hna);
    hns = (hni * this.margin) / 100;

    this.hargajual = hni + hns;
  }

  selectedCity: any;

  ngOnInit() {
    this.klinik();
    this.raks();
    this.tmpobat();
    this.hostName = this.hots.getHostname();

    this.URLINVOICE = "https://" + this.hostName + "/";
  }

  klinik() {
    this.authService.klinikper(this.kdklinik).subscribe(
      (data) => {
        this.subheading = Array.prototype.map
          .call(data, (s) => s.nama)
          .toString();
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  edit() {}

  closeResult: string;
  judulmodal: string;
  cx(kdsup, nama) {
    this.supplier = kdsup;
    this.supplierd = nama;

    this.modalService.dismissAll();
  }

  pilihgol(a, b) {
    this.golonganobat = a;
    this.golonganobatd = b;
    this.modalService.dismissAll();
  }
  pilihjenis(a, b) {
    this.jenisobatd = b;
    this.jenisobat = a;
    this.modalService.dismissAll();
  }
  cxpab(a, b) {
    this.pabrikan = a;
    this.pabrikand = b;
    this.modalService.dismissAll();
    console.log("klose");
  }

  showeditsup: boolean;
  showeditpab: boolean;
  open(content, a) {
    this.judulmodal = a;

    if (a == "2") {
      this.insup = "";
      this.inalamat = "";
      this.inhp = "";
      this.showeditsup = false;

      this.authService.carisuplier("1", "", this.kdcabang).subscribe(
        (data) => {
          this.tsupplier = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else if (a == "3") {
      this.inpabrik = "";

      this.inalamatp = "";
      this.inhpp = "";
      this.showeditpab = false;
      this.authService.carisuplier("2", "", this.kdcabang).subscribe(
        (data) => {
          this.tpabrikan = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else if (a == "4") {
      this.authService.carigolobat("1", "").subscribe(
        (data) => {
          this.golbat = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else if (a == "5") {
      this.authService.carigolobat("2", "").subscribe(
        (data) => {
          this.tjenisobat = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else {
      this.showeditrak = false;
    }

    this.inrak = "";

    this.modalService.open(content, {
      size: "lg",
    });

    //  this.modalService.open(content).result.then((result) => {

    //   //  this.closeResult = `Closed with: ${result}`;

    //  }, (reason) => {

    //    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //  });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  rak: any;
  rakinput = "";

  raks() {
    this.authService.rakobat(this.kdcabang, "").subscribe(
      (data) => {
        this.rak = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  carirak(a) {
    this.authService.rakobat(this.kdcabang, a.target.value).subscribe(
      (data) => {
        this.rak = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  golbat: any;
  golonganobat = "";

  carigol(a) {
    this.authService.carigolobat("1", a.target.value).subscribe(
      (data) => {
        this.golbat = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  jenisobat = "";
  tjenisobat: string;
  carijenisobat(a) {
    this.authService.carigolobat("2", a.target.value).subscribe(
      (data) => {
        this.tjenisobat = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  supplier = "";
  tsupplier: string;
  carisupplier(a) {
    this.authService.carisuplier("1", a.target.value, this.kdcabang).subscribe(
      (data) => {
        this.tsupplier = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  pabrikan = "";
  tpabrikan: string;

  caripabrikan(a) {
    this.authService.carisuplier("2", a.target.value, this.kdcabang).subscribe(
      (data) => {
        this.tpabrikan = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  inrak: "";
  kdrak: any;
  pilihrak(a, b) {
    this.kdrak = a;
    this.inrak = b;
    this.showeditrak = true;
  }

  showeditrak: boolean;

  simpanc() {
    this.authService
      .simpranrak(this.kdcabang, this.kdklinik, this.inrak, this.kdrak, "1")
      .then((data) => {
        if (data) {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });

          this.inrak = "";

          setTimeout(() => {
            this.raks();
          }, 100);

          this.showeditrak = false;
        } else {
          this.toastr.error("Simpan Gagal", "Eror");
        }
      });
  }

  editc() {
    this.authService
      .simpranrak(this.kdcabang, this.kdklinik, this.inrak, this.kdrak, "2")
      .then((data) => {
        this.raks();

        if (data) {
          this.toastr.success("" + data, "Sukses", {
            timeOut: 2000,
          });
          this.inrak = "";
          setTimeout(() => {
            this.raks();
          }, 100);

          this.showeditrak = false;
        } else {
          this.toastr.error("Simpan Gagal", "Eror");
        }
      });
  }

  hapus(
    kdobat,
    obat,
    golonganobat,
    jenisobat,
    hna,
    disc,
    ppn,
    hargabeli,
    margin,
    hargajual,
    bhp,
    raksimpan,
    kdsuplier,
    kdpabrikan,
    zakaktif,
    standart,
    standartd,
    sedang,
    sedangd,
    kemasan,
    kemasand,
    kdklinik,
    kdcabang,
    nama,
    sup,
    jenis,
    golongan
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
        title: "Hapus Rak?",
        text: "Yakin Akan Menghapus Rak",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            obat: obat,
            hna: hna,
            disc: disc,
            ppn: ppn,
            hargabeli: hargabeli,
            margin: margin,
            hargajual: hargajual,
            bhp: bhp,
            rakinput: "-",
            supplier: "-",
            pabrikan: "-",
            golonganobat: "-",
            jenisobat: "-",
            zakaktif: "-",
            standart: "-",
            standartd: "-",
            sedang: "-",
            sedangd: "-",
            kemasan: "-",
            kemasand: "-",
            kdcabang: this.kdcabang,
            kdklinik: this.kdklinik,
            stssimpan: "3",
            kdobat: kdobat,
            kdobatbpjs: this.obatbpjs,
          };

          this.authService.simpanobat(body).subscribe((response) => {
            if (response) {
              if (response.metadata.code === 200) {
                this.toastr.success(response.metadata.message, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.tmpobat();

                  this.batal();
                }, 150);
              } else if (response.metadata.code === 201) {
                this.toastr.error(response.metadata.message, "Eror");
              }
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }

  deleterak(a, b) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus Rak?",
        text: "Yakin Akan Menghapus Rak",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.authService
            .simpranrak(this.kdcabang, this.kdklinik, this.inrak, a, "3")
            .then((data) => {
              if (data === 200) {
                swalWithBootstrapButtons.fire(
                  "Berhasil Hapus Rak",
                  "Rak Telah Terhapus Dari Database.",
                  "success"
                );

                setTimeout(() => {
                  this.raks();
                }, 200);
              } else if (data === 201) {
                this.toastr.error(
                  "Tidak Bisa di Hapus Karena Rak Sudah Di pakai",
                  "Eror"
                );
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }

  insup = "";
  inalamat = "";
  inhp: any;
  kdsup = "";
  batalsup() {
    this.insup = "";
    this.inalamat = "";
    this.inhp = "";
    this.showeditsup = false;
  }
  batalpab() {
    this.inpabrik = "";
    this.kdpabrik = "";
    this.inalamatp = "";
    this.inhpp = "";
    this.showeditpab = false;
  }
  simpan2() {
    this.authService
      .simpansuplier(
        this.kdcabang,
        this.kdklinik,
        this.insup,
        this.inalamat,
        this.inhp,
        this.kdsup,
        "1"
      )
      .then((data) => {
        this.authService.carisuplier("1", "", this.kdcabang).subscribe(
          (data) => {
            this.tsupplier = data;
          },
          (Error) => {
            console.log(Error);
          }
        );

        if (data) {
          this.toastr.success("" + data, "Sukses", {
            timeOut: 2000,
          });

          this.insup = "";
          this.inalamat = "";
          this.inhp = "";
        } else {
          this.toastr.error("Simpan Gagal", "Eror");
        }
      });
  }

  pilihsup(kdsup, nama, alamat, hp) {
    this.kdsup = kdsup;
    this.insup = nama;
    this.inalamat = alamat;
    this.inhp = hp;
    this.showeditsup = true;
  }
  edit2() {
    this.authService
      .simpansuplier(
        this.kdcabang,
        this.kdklinik,
        this.insup,
        this.inalamat,
        this.inhp,
        this.kdsup,
        "2"
      )
      .then((data) => {
        this.authService.carisuplier("1", "", this.kdcabang).subscribe(
          (data) => {
            this.tsupplier = data;
          },
          (Error) => {
            console.log(Error);
          }
        );

        if (data) {
          this.toastr.success("" + data, "Sukses", {
            timeOut: 2000,
          });

          this.insup = "";
          this.inalamat = "";
          this.inhp = "";
          this.showeditsup = false;
        } else {
          this.toastr.error("Simpan Gagal", "Eror");
        }
      });
  }

  deletesup(a, b, c, d) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus Supplier?",
        text: "Yakin Akan Menghapus Supplier",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.authService
            .simpansuplier(this.kdcabang, this.kdklinik, b, c, d, a, "3")
            .then((data) => {
              if (data === 200) {
                setTimeout(() => {
                  this.authService
                    .carisuplier("1", "", this.kdcabang)
                    .subscribe(
                      (data) => {
                        this.tsupplier = data;
                      },
                      (Error) => {
                        console.log(Error);
                      }
                    );
                }, 100);

                this.toastr.success("Berhasil Hapus", "Sukses", {
                  timeOut: 2000,
                });
              } else if (data === 201) {
                this.toastr.error("Gagal Hapus Karena Sudah Di Pakai", "Eror");
              }
            });

          // swalWithBootstrapButtons.fire(
          //   'Berhasil Hapus Supplier',
          //   'Supplier Telah Terhapus Dari Database.',
          //   'success'
          // );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }

  inpabrik = "";
  kdpabrik = "";
  inalamatp = "";
  inhpp = "";
  edit3() {
    this.authService
      .simpanpabrikan(
        this.kdcabang,
        this.kdklinik,
        this.inpabrik,
        this.inalamatp,
        this.inhpp,
        this.kdpabrik,
        "2"
      )
      .then((data) => {
        if (data) {
          this.toastr.success("" + data, "Sukses", {
            timeOut: 2000,
          });

          this.inpabrik = "";
          this.kdpabrik = "";
          this.inalamatp = "";
          this.inhpp = "";
          this.showeditpab = false;
          setTimeout(() => {
            this.authService.carisuplier("2", "", this.kdcabang).subscribe(
              (data) => {
                this.tpabrikan = data;
              },
              (Error) => {
                console.log(Error);
              }
            );
          }, 200);
        } else {
          this.toastr.error("Simpan Gagal", "Eror");
        }
      });
  }
  simpan3() {
    this.authService
      .simpanpabrikan(
        this.kdcabang,
        this.kdklinik,
        this.inpabrik,
        this.inalamatp,
        this.inhpp,
        this.kdpabrik,
        "1"
      )
      .then((data) => {
        if (data) {
          this.toastr.success("" + data, "Sukses", {
            timeOut: 2000,
          });

          this.inpabrik = "";
          this.kdpabrik = "";
          this.inalamatp = "";
          this.inhpp = "";

          setTimeout(() => {
            this.showeditpab = false;
            this.authService.carisuplier("2", "", this.kdcabang).subscribe(
              (data) => {
                this.tpabrikan = data;
              },
              (Error) => {
                console.log(Error);
              }
            );
          }, 200);
        } else {
          this.toastr.error("Simpan Gagal", "Eror");
        }
      });
  }

  pilihpab(kdpabrikan, nama, alamat, hp) {
    this.inpabrik = nama;
    this.kdpabrik = kdpabrikan;
    this.inalamatp = alamat;
    this.inhpp = hp;
    this.showeditpab = true;
  }

  deletepab(kdpabrikan, nama, alamat, hp) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus Pabrikan?",
        text: "Yakin Akan Menghapus Pabrikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.authService
            .simpanpabrikan(
              this.kdcabang,
              this.kdklinik,
              this.inpabrik,
              this.inalamatp,
              this.inhpp,
              kdpabrikan,
              "3"
            )
            .then((data) => {
              if (data === 200) {
                swalWithBootstrapButtons.fire(
                  "Berhasil Hapus Pabrikan",
                  "Pabrikan Telah Terhapus Dari Database.",
                  "success"
                );

                setTimeout(() => {
                  this.authService
                    .carisuplier("2", "", this.kdcabang)
                    .subscribe(
                      (data) => {
                        this.tpabrikan = data;
                      },
                      (Error) => {
                        console.log(Error);
                      }
                    );
                }, 200);
              } else if (data === 201) {
                this.toastr.error(
                  "Tidak Bisa di Hapus Karena  Sudah Di pakai",
                  "Eror"
                );
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }

  // MASTER OBAT//

  obat: string = "";
  hna: number = 0;

  cities12 = [
    {
      id: 1,
      name: "ilnius",
      od: "dd",
    },
  ];

  kdobat: any;

  simpan() {
    let body = {
      obat: this.obat,
      hna: this.hna,
      disc: this.disc,
      ppn: this.ppn,
      hargabeli: this.hargabeli,
      margin: this.margin,
      hargajual: this.hargajual,
      bhp: this.bhp,
      rakinput: this.rakinput,
      supplier: this.supplier,
      pabrikan: this.pabrikan,
      golonganobat: this.golonganobat,
      jenisobat: this.jenisobat,
      zakaktif: this.zakaktif,
      standart: this.standart,
      standartd: this.standartd,
      sedang: this.sedang,
      sedangd: this.sedangd,
      kemasan: this.kemasan,
      kemasand: this.kemasand,
      kdcabang: this.kdcabang,
      kdklinik: this.kdklinik,
      stssimpan: "1",
      kdobat: this.kdobat,
      caraberi: this.cberi,
      bentuks: this.bens,
      zataktif: this.zakaktif,
      kdobatbpjs: this.obatbpjs,
      kdobatsatusehat: this.kdobatsatusehat,
      satuanobat: this.satuanobat,
    };

    this.authService.simpanobat(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.tmpobat();

        this.batal();
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  tobat: any;
  type = "1";
  totalobat: any = 0;

  cariuserx(a) {
    console.log(a.target.value);

    this.authService
      .obatmaster(this.kdcabang, "2", a.target.value, this.type)
      .subscribe(
        (data) => {
          this.tobat = data;
          this.totalobat = data.length;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  bens = "";
  cberi = "";
  tbens: any;
  tcberi: any;

  tmpobat() {
    this.authService.obat(this.kdcabang, "1", "").subscribe(
      (data) => {
        this.tobat = data;
        this.totalobat = data.length;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.carapemberian().subscribe(
      (data) => {
        this.tcberi = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.bentuksediaan().subscribe(
      (data) => {
        this.tbens = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  edituser() {
    let body = {
      obat: this.obat,
      hna: this.hna,
      disc: this.disc,
      ppn: this.ppn,
      hargabeli: this.hargabeli,
      margin: this.margin,
      hargajual: this.hargajual,
      bhp: this.bhp,
      rakinput: this.rakinput,
      supplier: this.supplier,
      pabrikan: this.pabrikan,
      golonganobat: this.golonganobat,
      jenisobat: this.jenisobat,
      zakaktif: this.zakaktif,
      standart: this.standart,
      standartd: this.standartd,
      sedang: this.sedang,
      sedangd: this.sedangd,
      kemasan: this.kemasan,
      kemasand: this.kemasand,
      kdcabang: this.kdcabang,
      kdklinik: this.kdklinik,
      stssimpan: "2",
      kdobat: this.kdobat,
      caraberi: this.cberi,
      bentuks: this.bens,
      zataktif: this.zakaktif,
      kdobatbpjs: this.obatbpjs,
      kdobatsatusehat: this.kdobatsatusehat,
      satuanobat: this.satuanobat,
    };

    this.authService.simpanobat(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.tmpobat();

        this.batal();
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  golonganobatd = "";
  supplierd = "";
  pabrikand = "";
  jenisobatd = "";
  pilihobat(
    kdobat,
    obat,
    golonganobat,
    jenisobat,
    hna,
    disc,
    ppn,
    hargabeli,
    margin,
    hargajual,
    bhp,
    raksimpan,
    kdsuplier,
    kdpabrikan,
    zakaktif,
    standart,
    standartd,
    sedang,
    sedangd,
    kemasan,
    kemasand,
    kdklinik,
    kdcabang,
    nama,
    sup,
    jenis,
    golongan,
    kdcp,
    kdbs,
    zat,
    kdobatsatusehat,
    satuanobat
  ) {
    this.zataktif = zat;

    this.kdobat = kdobat;
    (this.obat = obat),
      (this.golonganobat = golonganobat),
      (this.jenisobat = jenisobat),
      (this.hna = hna),
      (this.disc = disc),
      (this.ppn = ppn),
      (this.hargabeli = hargabeli),
      (this.margin = margin),
      (this.hargajual = hargajual),
      (this.bhp = bhp),
      (this.rakinput = raksimpan),
      (this.supplier = kdsuplier),
      (this.pabrikan = kdpabrikan),
      (this.zakaktif = zakaktif),
      (this.standart = standart),
      (this.standartd = standartd),
      (this.sedang = sedang),
      (this.sedangd = sedangd),
      (this.kemasan = kemasan),
      (this.kemasand = kemasand),
      (this.kdklinik = kdklinik),
      (this.kdcabang = kdcabang),
      (this.pabrikand = nama),
      (this.supplierd = sup),
      (this.jenisobatd = jenis),
      (this.golonganobatd = golongan);
    this.cberi = kdcp;
    this.bens = kdbs;
    this.kdobatsatusehat = kdobatsatusehat;
    this.satuanobat = satuanobat;
    this.showedit = true;
  }

  xx(a) {
    alert(a);
  }

  batal() {
    this.kdobat = "";
    (this.obat = ""),
      (this.golonganobat = ""),
      (this.jenisobat = ""),
      (this.hna = 0),
      (this.disc = 0),
      (this.ppn = 0),
      (this.hargabeli = 0),
      (this.margin = 0),
      (this.hargajual = 0),
      (this.bhp = ""),
      (this.rakinput = ""),
      (this.supplier = ""),
      (this.pabrikan = ""),
      (this.zakaktif = ""),
      (this.standart = ""),
      (this.standartd = ""),
      (this.sedang = ""),
      (this.sedangd = ""),
      (this.kemasan = ""),
      (this.kemasand = ""),
      (this.kdobatsatusehat = ""),
      (this.pabrikand = ""),
      (this.supplierd = ""),
      (this.jenisobatd = ""),
      (this.golonganobatd = "");
    this.showedit = false;
  }
  caripabrikand(a) {
    alert(a);
  }
  pilihsupi(kdsup, nama) {
    this.supplierd = nama;
    this.supplier = kdsup;

    ModalDismissReasons.BACKDROP_CLICK;
  }

  c() {
    alert("a");
  }
  showedit: boolean;
  tstokoabt: any;

  lihatstok(content, a) {
    this.authService.stokobat(this.kdcabang, a).subscribe(
      (data) => {
        this.tstokoabt = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.modalService.open(content).result.then(
      (result) => {
        //  this.closeResult = `Closed with: ${result}`;

        console.log("s");
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("sx");
      }
    );
  }

  cetakobat() {
    var redirectWindow = window.open(
      this.URLINVOICE + "clenic/report/listobat.php?kdcabang=" + this.kdcabang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  showobatbpjs: boolean;
  obatbpjs: boolean;
  kdobatsatusehat: any;
  listobat: any;
  // getobatbpjs(a):Observable<any>{
  //   return this.http.get(apiurx+'pcare/getobatbpjs.php?nama='+a)
  // }
  cariobat(a) {
    this.ObatconService.getobatbpjs(a.target.value).subscribe(
      (data) => {
        this.listobat = data.response.list;
        console.log(data.response.list);
        this.showobatbpjs = true;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  pilihtindak(a, b) {
    this.obatbpjs = a;
    this.showobatbpjs = false;
  }
}
