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

@Component({
  selector: "app-muser",
  templateUrl: "./muser.component.html",
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
export class MuserComponent implements OnInit {
  heading = "Master User";
  subheading: any;
  icon = "pe-7s-diamond icon-gradient bg-warm-flame";

  options: FormGroup;
  public userDetails: any;
  nama: any;
  akses: any;

  kdklinik: any;
  cabangarr: any;
  Username: "";
  password: string = "";
  namal: "";
  hakakses: string = "";
  statuspustu: string = "utama";
  kdcb: string = "";
  cariuser: any;

  form: FormGroup;
  kdcabang: any;

  constructor(
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
    this.kdcb = this.userDetails.kdcabang;
  }
  profileForm = this.fb.group({
    Username: ["", Validators.required],
    password: ["", Validators.required],
    namal: ["", Validators.required],
    hakakses: ["", Validators.required],
    statuspustu: ["", Validators.required],
  });

  onSubmit() {
    this.profileForm.reset();
  }

  ngOnInit() {
    this.klinik();
    this.tmppuser();
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
      },
    );

    this.authService.cabangper(this.kdklinik).subscribe(
      (data) => {
        this.cabangarr = data;
      },
      (Error) => {
        console.log(Error);
      },
    );
  }

  simpan() {
    this.authService
      .simpanuser(
        this.Username,
        this.password,
        this.namal,
        this.hakakses,
        this.kdcabang,
        this.kdklinik,
        "1",
        "",
        this.statuspustu,
      )
      .then((data) => {
        this.tmppuser();

        if (data) {
          if (data === "User Sudah ada") {
            this.Username = "";
            this.toastr.error("User Sudah ada", "Eror");
          } else {
            this.toastr.success("" + data, "Sukses", {
              timeOut: 2000,
            });

            this.Username = "";
            this.password = "";
            this.namal = "";
            this.hakakses = "";
            // this.kdcb = ''
          }
        } else {
          this.toastr.error("Simpan User Gagal", "Eror");
        }
      });
  }

  showedit: boolean;

  batal() {
    this.Username = "";
    this.password = "";
    this.namal = "";
    this.hakakses = "";
    this.kdcb = "";
    this.showedit = false;
  }
  tmpusers: any;
  tmppuser() {
    this.authService.tampiluser(this.kdcabang).subscribe(
      (data) => {
        this.tmpusers = data;
      },
      (Error) => {
        console.log(Error);
      },
    );
  }

  cariuserx(a) {
    console.log(a.target.value);

    this.authService
      .cariuser(this.kdcabang, a.target.value)
      .subscribe((data) => {
        this.tmpusers = data;
      });
  }
  kduserlogin: any;

  edit(
    kduser,
    username,
    nama,
    hakakses,
    kdcabang,
    password,
    pass,
    statuspustu,
  ) {
    this.Username = username;
    this.namal = nama;
    this.hakakses = hakakses;
    this.kdcb = kdcabang;
    this.showedit = true;
    this.password = pass;
    this.statuspustu = statuspustu;

    this.kduserlogin = kduser;
  }

  edituser() {
    this.authService
      .simpanuser(
        this.Username,
        this.password,
        this.namal,
        this.hakakses,
        this.kdcb,
        this.kdklinik,
        "2",
        this.kduserlogin,
        this.statuspustu,
      )
      .then((data) => {
        if (data === 201) {
          this.toastr.error(
            "User Sudah Di Buat Transaksi Tidak Bisa Di Ubah Hanya Bisa Edit Selain USername",
            "Eror",
          );
          setTimeout(() => {
            this.tmppuser();
          }, 150);
        } else if (data === 200) {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });

          this.Username = "";
          this.password = "";
          this.namal = "";
          this.hakakses = "";
          this.kdcb = "";
          this.showedit = false;
          setTimeout(() => {
            this.tmppuser();
          }, 150);
        }
      });
  }

  delete(a, b) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus User?",
        text: "Yakin Akan Menghapus User",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.authService.deleteuser(a, b, this.kdcabang).then((data) => {
            if (data === 201) {
              this.toastr.error(
                "Hapus Gagal Karena User Sudah Di buat Untuk Transaksi",
                "Eror",
              );
            } else if (data === 200) {
              setTimeout(() => {
                this.tmppuser();
              }, 200);
              this.toastr.success("Berhasil", "Sukses", {
                timeOut: 2000,
              });
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }

  setting(a, b, c) {
    this.authService
      .simpanuserx(this.user, a, c, this.kdklinik, "3")
      .then((data) => {
        if (data) {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });

          this.tmppuser();
          this.modalService.dismissAll();
        } else {
          this.toastr.error("Simpan User Gagal", "Eror");
        }
      });
  }

  user: any;
  open(content, a, c) {
    if (a === "Dokter") {
      this.dafatrdokter();
      this.user = c;
      this.modalService.open(content, {});
    } else {
    }
  }

  caripass(a) {
    this.authService
      .caridokter(this.kdcabang, a.target.value)
      .subscribe((data) => {
        this.tdokter = data;
      });
  }
  tdokter: any;

  dafatrdokter() {
    this.authService.dokter(this.kdcabang).subscribe(
      (data) => {
        this.tdokter = data;
      },
      (Error) => {
        console.log(Error);
      },
    );
  }
}
