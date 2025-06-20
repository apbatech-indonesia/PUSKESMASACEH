import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiserviceService } from "src/app/apiservice.service";
import Swal from "sweetalert2";
import { NgbPanelChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FarmasijualService } from "../kasirfarmasijual/farmasijual.service";
@Component({
  selector: "app-mdokter",
  templateUrl: "./mdokter.component.html",
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
export class MdokterComponent implements OnInit {
  heading = "Master Dokter";
  subheading: any;
  icon = "pe-7s-diamond icon-gradient bg-warm-flame";

  options: FormGroup;
  public userDetails: any;
  nik: string = "";
  nip: string = "";
  nama: any;
  akses: any;

  kdklinik: any;
  cabangarr: any;

  cariuser: any;
  kdcabang: any;
  poliklinik: any;
  namadokter = "";
  online: string = "";
  kddokter = "";
  public usericare: any;
  public passicare: any;
  signature: any;
  clearTrigger: any;

  constructor(
    public FarmasijualService: FarmasijualService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private fb: FormBuilder
  ) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.nik = data.nik;
    this.nip = data.nip;
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
  }

  cities12 = [
    { id: 1, name: "Vilnius" },
    { id: 2, name: "Kaunas" },
    { id: 3, name: "Pavilnys", disabled: true },
    { id: 4, name: "Pabradė" },
    { id: 5, name: "Klaipėda" },
  ];
  selectedCity: any;
  ngOnInit() {
    this.klinik();
    this.dafatrdokter();
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
  tdokter: any;
  tdokterbpjs: any;

  dafatrdokter() {
    this.authService.dokter(this.kdcabang).subscribe(
      (data) => {
        this.tdokter = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.cekdokter().subscribe(
      (data) => {
        this.tdokterbpjs = data.response.list;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  kddokterbpjs: any = "";

  simpan() {
    this.authService
      .simpandokter(
        this.nik,
        this.nip,
        this.kdklinik,
        this.kdcabang,
        this.namadokter,
        this.online,
        this.kddokter,
        "1",
        this.aktif,
        this.sn,
        this.kddokterbpjs,
        this.usericare,
        this.passicare,
        this.signature
      )
      .then((data) => {
        this.dafatrdokter();
        if (data) {
          this.toastr.success("" + data, "Sukses", {
            timeOut: 2000,
          });
          this.kddokter = "";
          this.namadokter = "";
          this.nik = "0";
          this.nip = "0";
          this.kddokterbpjs = "";

          this.batal();
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
  }

  tmpusers: any;

  cariuserx(a) {
    this.authService
      .caridokter(this.kdcabang, a.target.value)
      .subscribe((data) => {
        this.tdokter = data;
      });
  }

  tdokterperpoli: any;

  dokterpp(a) {
    this.authService.dokterperpoli(this.kdcabang, a).subscribe(
      (data) => {
        this.tdokterperpoli = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  edit(data: any) {
    this.clearTrigger = new Date().getTime(); // Trigger untuk membersihkan signature pad

    this.kddokter = data.kddokter;
    this.namadokter = data.namdokter;
    this.online = data.statusonline;
    this.aktif = data.aktif;
    this.nik = data.nik;
    this.nip = data.nip;
    this.kddokterbpjs = data.kddokterbpjs;
    this.sn = data.status;
    this.usericare = data.usericare;
    this.passicare = data.passicare;
    this.signature = data.signature;
    this.showedit = true;
  }

  aktif: string = "";
  showedit: boolean;
  batal() {
    this.kddokter = "";
    this.namadokter = "";
    this.online = "";
    this.aktif = "";
    this.nik = "";
    this.nip = "";
    this.kddokterbpjs = "";
    this.sn = "";
    this.usericare = "";
    this.passicare = "";
    this.signature = "";
    this.showedit = false;
    this.clearTrigger = new Date().getTime(); // Trigger untuk membersihkan signature pad
  }
  edituser() {
    this.authService
      .simpandokter(
        this.nik,
        this.nip,
        this.kdklinik,
        this.kdcabang,
        this.namadokter,
        this.online,
        this.kddokter,
        "2",
        this.aktif,
        this.sn,
        this.kddokterbpjs,
        this.usericare,
        this.passicare,
        this.signature
      )
      .then((data) => {
        this.dafatrdokter();
        if (data) {
          this.toastr.success("" + data, "Sukses", {
            timeOut: 2000,
          });
          this.kddokter = "";
          this.namadokter = "";
          this.kddokter = "";
          this.namadokter = "";
          this.nik = "0";
          this.nip = "0";
          this.kddokterbpjs = "";

          this.batal();
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
  }

  delete(kddokter, kdpoli) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus Maping?",
        text: "Yakin Akan Menghapus Maping",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.authService
            .simpandokterpoli(
              this.kdklinik,
              this.kdcabang,
              kddokter,
              kdpoli,
              "3"
            )
            .then((data) => {
              if (data) {
                this.toastr.success("" + data, "Sukses", {
                  timeOut: 2000,
                });
                this.dokterpp(kddokter);
                this.kddokter = "";
                this.namadokter = "";
              } else {
                this.toastr.error("Hapus  Gagal", "Eror");
              }
            });

          swalWithBootstrapButtons.fire(
            "Berhasil Hapus User",
            "User Telah Terhapus Dari Database.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }

  closeResult: string;

  pol() {
    this.authService.poli(this.kdcabang).subscribe(
      (data) => {
        this.poliklinik = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  dokter: any;

  setting(content, a, b) {
    this.kddokter = a;
    this.dokter = b;
    this.pol();
    this.dokterpp(a);

    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  kodeihs: any;
  maping(content, a, kddokter) {
    this.kodeihs = "";
    this.kddokter = kddokter;

    const headers = new HttpHeaders({
      "kd-cabang": this.kdcabang,
    });

    this.authService.getdokter(a, headers).subscribe(
      (data) => {
        console.log(data.entry[0].resource.id);

        this.kodeihs = data.entry[0].resource.id;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  pilihdokter() {
    this.authService
      .simpandokter(
        this.nik,
        this.nip,
        this.kdklinik,
        this.kdcabang,
        this.namadokter,
        this.online,
        this.kddokter,
        "4",
        this.aktif,
        this.kodeihs,
        this.kddokterbpjs,
        this.usericare,
        this.passicare,
        this.signature
      )
      .then((data) => {
        this.dafatrdokter();

        if (data) {
          this.toastr.success("" + data, "Sukses", {
            timeOut: 2000,
          });
          this.kddokter = "";
          this.namadokter = "";
          this.modalService.dismissAll();
          this.batal();
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
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

  dokterform = this.fb.group({
    namadokter: ["", Validators.required],
    online: ["", Validators.required],
    aktif: ["", Validators.required],
    sn: ["", Validators.required],
    nik: ["", Validators.required],
    nip: ["", Validators.nullValidator],
  });

  sn: "";
  sna: "";

  simpanc() {
    this.authService
      .simpandokterpoli(
        this.kdklinik,
        this.kdcabang,
        this.kddokter,
        this.selectedCity,
        "1"
      )
      .then((data) => {
        console.log(data);

        // this.toastr.success(''+data, 'Sukses', {
        //   timeOut: 2000,
        // });

        // this.dokterpp(this.kddokter)

        // this.modalService.dismissAll()
        if (data === 200) {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });
          this.dokterpp(this.kddokter);

          this.modalService.dismissAll();
        } else if (data === 201) {
          this.toastr.error("Sudah ada dokter tersebut di poli ini", "Eror");
        }
      });
  }
}
