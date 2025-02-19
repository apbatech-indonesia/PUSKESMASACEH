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
@Component({
  selector: "app-mrekening",
  templateUrl: "./mrekening.component.html",
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
export class MrekeningComponent implements OnInit {
  heading = "Master Rekening";
  subheading: any;
  icon = "pe-7s-diamond icon-gradient bg-warm-flame";

  options: FormGroup;
  public userDetails: any;
  nama: any;
  akses: any;

  kdklinik: any;
  cabangarr: any;

  cariuser: any;
  kdcabang: any;
  poliklinik: any;
  namarekening = "";
  norekening = "";
  norekeningl = "";

  kdcoarek = "";
  constructor(
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
  np: any = "";
  tgolonganlab: any = "";
  ngOnInit() {
    this.klinik();

    this.daftcoa();
    this.tmprek();

    this.authService.golongan(this.kdcabang, "", "3").subscribe(
      (data) => {
        this.tgolonganlab = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  showedit: boolean;
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
  trek: any;

  tmprek() {
    this.authService.rekening(this.kdcabang).subscribe(
      (data) => {
        this.trek = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  coadetail: any;
  daftcoa() {
    this.authService.coaper("101.000", this.kdcabang).subscribe(
      (data) => {
        this.coadetail = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  simpan() {
    // $kdklinik  = $_POST["kdklinik"];
    // $kdcabang  = $_POST["kdcabang"];
    // $norekening  = $_POST["norekening"];
    // $namarekening  = $_POST["namarekening"];
    // $namarekeningl  = $_POST["namarekeningl"];
    // $kdcoa  = $_POST["kdcoa"];

    // $stssimpan  = $_POST["stssimpan"];

    console.log(
      this.kdklinik,
      this.kdcabang,
      this.namarekening,
      this.norekening,
      this.norekeningl,
      this.kdcoarek,
      "1"
    );

    this.authService
      .simpanrekening(
        this.kdklinik,
        this.kdcabang,
        this.namarekening,
        this.norekening,
        this.norekeningl,
        this.kdcoarek,
        "1"
      )
      .then((data) => {
        this.tmprek();

        if (data) {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });

          this.namarekening = "";
          this.norekening = "";
          this.norekeningl = "";
          this.showedit = false;
        } else {
          this.toastr.error("Simpan User Gagal", "Eror");
        }
      });
  }

  tmpusers: any;

  cariuserx(a) {
    console.log(a.target.value);

    this.authService
      .carirekening(this.kdcabang, a.target.value)
      .subscribe((data) => {
        this.trek = data;
      });
  }

  rekeningform = this.fb.group({
    namarekening: ["", Validators.required],
    norekening: ["", Validators.required],
    kdcoarek: ["", Validators.required],
  });

  edit(norekening, namarekening, kdcoa, akun) {
    this.norekening = norekening;
    this.norekeningl = norekening;
    this.namarekening = namarekening;
    this.kdcoarek = kdcoa;
    this.showedit = true;
  }
  batal() {
    this.namarekening = "";
    this.norekening = "";
    this.norekeningl = "";
    this.showedit = false;
  }
  edituser() {
    this.authService
      .simpanrekening(
        this.kdklinik,
        this.kdcabang,
        this.namarekening,
        this.norekening,
        this.norekeningl,
        this.kdcoarek,
        "2"
      )
      .then((data) => {
        this.tmprek();

        if (data) {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });

          this.namarekening = "";
          this.norekening = "";
          this.norekeningl = "";
          this.showedit = false;
        } else {
          this.toastr.error("Simpan User Gagal", "Eror");
        }
      });
  }

  delet(norekening, namarekening, kdcoa, akun) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus Rekening?",
        text: "Yakin Akan Menghapus Rekening",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.authService
            .simpanrekening(
              this.kdklinik,
              this.kdcabang,
              this.namarekening,
              norekening,
              norekening,
              this.kdcoarek,
              "3"
            )
            .then((data) => {
              this.tmprek();

              if (data) {
                this.toastr.success("Berhasil", "Sukses", {
                  timeOut: 2000,
                });

                this.namarekening = "";
                this.norekening = "";
                this.norekeningl = "";
                this.showedit = false;
              } else {
                this.toastr.error("Simpan User Gagal", "Eror");
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

  simpanj() {
    let body = {
      kdmetode: this.kdmetode,
      namatamplates: this.np,
      status: "PERKEJAAN",
      kdcabang: this.kdcabang,
      kdklinik: this.kdklinik,
      stssimpan: "11",
    };

    this.authService.simpantamplatelab(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.authService.golongan(this.kdcabang, "", "3").subscribe(
          (data) => {
            this.tgolonganlab = data;
          },
          (Error) => {
            console.log(Error);
          }
        );

        this.np = "";
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }
  kdmetode: any;
  namatamplates: any;

  pilihsubjek(a, b) {
    this.kdmetode = a;
    this.np = b;
  }

  batalx() {
    this.kdmetode = "";
    this.np = "";
  }

  deletesubjekx(a, b) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus Metode?",
        text: "Yakin Akan Menghapus Metode",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            kdmetode: a,
            namatamplates: b,
            status: "PERKEJAAN",
            kdcabang: this.kdcabang,
            kdklinik: this.kdklinik,
            stssimpan: "3",
          };

          this.authService.simpantamplatelab(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              this.authService.golongan(this.kdcabang, "", "3").subscribe(
                (data) => {
                  this.tgolonganlab = data;
                },
                (Error) => {
                  console.log(Error);
                }
              );
              this.np = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });

          swalWithBootstrapButtons.fire(
            "Berhasil Hapus Metode",
            "User Telah Terhapus Dari Database.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  }
}
