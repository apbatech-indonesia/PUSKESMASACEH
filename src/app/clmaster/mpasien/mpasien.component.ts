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
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

// 1103072308910001
@Component({
  selector: "app-mpasien",
  templateUrl: "./mpasien.component.html",
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
export class MpasienComponent implements OnInit {
  date2 = new FormControl(new Date());
  heading = "Tambah Pasien";
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

  norm: any;
  pasien: any;
  tgllahir: any;
  tahun: any;
  bulan: any;
  hari: any;
  tempatlahir: any;
  an: string = "An";
  kelamin: string = "";
  alamat: "";
  alamats: "";
  indetitas: string = "KTP";
  noindetitas: any = "";
  nohp: any = "";
  agama: string = "TIDAK TAHU";
  marital: string = "TIDAK TAHU";
  pendidikan: string = "TIDAK TAHU";
  perkerjaan: string = "TIDAK TAHU";

  golda: string = "Tidak Tahu";
  kdcabang: any;
  myDate = new Date();
  usia: any = "";
  noasuransi: string = "";
  tglp: any;
  constructor(
    public http: HttpClient,
    private datepipe: DatePipe,
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
    this.tgllahir = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglp = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
  }
  showtombolpasien: boolean = true;
  profileForm = this.fb.group({
    pasien: ["", Validators.required],
    kelamin: ["", Validators.required],
    tempatlahir: ["", Validators.required],
    alamat: ["", Validators.required],

    keluarahan: ["", Validators.required],
    indetitas: ["", Validators.required],
    // noindetitas: ['',Validators.required],
    // nohp: ['',Validators.required],
    agama: ["", Validators.required],
    marital: ["", Validators.required],
    pendidikan: ["", Validators.required],
    perkerjaan: ["", Validators.required],
    golda: ["", Validators.required],
  });
  tgolonganlab: any;
  ngOnInit() {
    this.klinik();
    // this.tmppuser()
    this.tmpantri();
    this.authService.golongan(this.kdcabang, "", "3").subscribe(
      (data) => {
        this.tgolonganlab = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
    // let body = {"id" : 'ax'};

    //     this.http.post<any>('https://clenicapp.com/phpjwt/crud-file/get-single-products.php',body).subscribe(data => {

    // console.log(data.message)

    //   })

    //   this.authService.lit(body)
    // .subscribe(response => {

    //   console.log(response.message)

    // })
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

    this.authService.cabangper(this.kdklinik).subscribe(
      (data) => {
        this.cabangarr = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tantri: any;
  tpropinsi: any;
  tpasien: any;
  totalpasien: any;

  tmpantri() {
    this.authService.pasien(this.kdcabang, "2", "").subscribe(
      (data) => {
        this.tpasien = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.propinsi("").subscribe(
      (data) => {
        this.tpropinsi = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.totalpasien(this.kdcabang).subscribe(
      (data) => {
        this.totalpasien = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tmpusers: any;
  tmppuser() {
    this.authService.tampiluser(this.kdcabang).subscribe(
      (data) => {
        this.tmpusers = data;
      },
      (Error) => {
        console.log(Error);
      }
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

  edit() {}

  //  delete(a){

  //     const swalWithBootstrapButtons = Swal.mixin({
  //       customClass: {
  //         confirmButton: 'btn btn-success',
  //         cancelButton: 'btn btn-danger'
  //       },
  //       buttonsStyling: false
  //     });

  //     swalWithBootstrapButtons.fire({
  //       title: 'Hapus User?',
  //       text: 'Yakin Akan Menghapus User',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Hapus',
  //       cancelButtonText: 'Batal',
  //       reverseButtons: true
  //     }).then((result) => {
  //       if (result.value) {
  //         swalWithBootstrapButtons.fire(
  //           'Berhasil Hapus User',
  //           'User Telah Terhapus Dari Database.',
  //           'success'
  //         );

  //         this.authService.deleteuser(a).then(data =>{
  //           this.tmppuser()

  //       })

  //       } else if (
  //         /* Read more about handling dismissals below */
  //         result.dismiss === Swal.DismissReason.cancel
  //       ) {
  //         swalWithBootstrapButtons.fire(
  //           'Cancelled',
  //           'Your imaginary file is safe :)',
  //           'error'
  //         );
  //       }
  //     });

  //  }

  panggil(a) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Paggil Pasien?",
        text: "Yakin Akan Panggil Pasin User",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Panggil",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "Berhasil Pangil ",
            "User Telah Pangil ",
            "success"
          );

          this.norm = a;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }
  shownorm(content) {
    if (this.norm === "") {
      this.toastr.error("belum memilih pasien");
      return;
    }
    this.normbaru = "";
    this.modalService.open(content).result.then(
      (result) => {},
      (reason) => {}
    );
  }
  propinsi: "";
  propinsiid: "";
  tkab: any;
  kabupaten: "";
  pilihpro(prov_id, prov_name) {
    this.propinsiid = prov_id;
    this.propinsi = prov_name;

    this.modalService.dismissAll();

    this.authService.kabupaten(this.propinsiid, "").subscribe(
      (data) => {
        this.tkab = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tkec: any;
  kecamatan: "";
  kabupatenid;
  pilihkab(city_id, city_name) {
    this.kabupatenid = city_id;
    this.kabupaten = city_name;

    this.modalService.dismissAll();

    this.authService.kecamatan(this.kabupatenid, "").subscribe(
      (data) => {
        this.tkec = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tkelurahan: any;
  keluarahan = "";
  kecamatanid = "";

  pilihkec(dis_id, dis_name) {
    this.kecamatanid = dis_id;
    this.kecamatan = dis_name;

    this.modalService.dismissAll();

    this.authService.keluarahan(this.kecamatanid, "").subscribe(
      (data) => {
        this.tkelurahan = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  edituser() {
    let body = {
      nama: this.pasien,
      tlahir: this.tempatlahir,
      jeniskelamin: this.kelamin,
      tanggallahir: this.tgllahir,
      alamat: this.alamat,
      kodekel: this.keluarahanid,
      identitas: this.indetitas,
      noidentitas: this.noindetitas,
      nohp: this.nohp,
      agama: this.agama,
      marital: this.marital,
      pendidikan: this.pendidikan,
      perkerjaan: this.perkerjaan,
      golda: this.golda,
      norm: this.norm,
      stssimpan: "2",
      kdcabang: this.kdcabang,
      noasuransi: this.noasuransi,
      kdklinik: this.kdklinik,
      kdpanggil: this.an,
      usia: this.usia,
    };

    this.authService.simpanpasbaru(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.authService.pasien(this.kdcabang, "2", "").subscribe(
          (data) => {
            this.tpasien = data;
          },
          (Error) => {
            console.log(Error);
          }
        );

        this.Batal();
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  Hapus() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus Pasien?",
        text: "Yakin Akan Menghapus Pasien",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            nama: this.pasien,
            tlahir: this.tempatlahir,
            jeniskelamin: this.kelamin,
            tanggallahir: this.tgllahir,
            alamat: this.alamat,
            kodekel: this.keluarahanid,
            identitas: this.indetitas,
            noidentitas: this.noindetitas,
            nohp: this.nohp,
            agama: this.agama,
            marital: this.marital,
            pendidikan: this.pendidikan,
            perkerjaan: this.perkerjaan,
            golda: this.golda,
            norm: this.norm,
            stssimpan: "3",
            kdcabang: this.kdcabang,
            kdklinik: this.kdklinik,
          };

          this.authService.simpanpasbaru(body).subscribe((response) => {
            if (response) {
              if (response.metadata.code === 201) {
                this.toastr.error(response.metadata.message, "Eror");
              } else if (response.metadata.code === 200) {
                this.toastr.success(response.metadata.message, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.authService.pasien(this.kdcabang, "2", "").subscribe(
                    (data) => {
                      this.tpasien = data;
                    },
                    (Error) => {
                      console.log(Error);
                    }
                  );
                }, 150);

                this.Batal();
                this.verifsimpan = "1";
              }

              //     this.authService.pasien(this.kdcabang,'2','')
              //     .subscribe(
              //       data => {

              // this.tpasien = data;

              //     },
              //       Error => {

              //        console.log(Error)
              //       }
              //     )

              // this.norm='';
              // this.pasien='';

              // this.tempatlahir='';

              // // this.kelamin='';
              // this.alamat='';
              // this.alamats='';
              // // this.indetitas='';
              // this.noindetitas='';
              // this.nohp='';
              // this.agama='';
              // this.marital='';
              // this.pendidikan='';
              // this.perkerjaan='';
              // this.golda='';
              // this.kabupaten='';
              // this.kabupatenid='';
              // this.propinsi='';
              // this.propinsiid='';
              // this.kecamatan ='';
              // this.kecamatanid='';
              // this.keluarahan='';
              // this.keluarahanid='';
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

  async simpan() {
    if (this.verifsimpan === "1") {
      if (this.norm === "") {
        this.authService.pasien(this.kdcabang, "3", this.norm).subscribe(
          (data) => {
            if (data.length) {
              this.toastr.error(
                "data norm tersbut  sudah ada" + data[0].pasien
              );
              return;
            } else {
              let body = {
                nama: this.pasien,
                tlahir: this.tempatlahir,
                jeniskelamin: this.kelamin,
                tanggallahir: this.tgllahir,
                alamat: this.alamat,
                kodekel: this.keluarahanid,
                identitas: this.indetitas,
                noidentitas: this.noindetitas,
                nohp: this.nohp,
                agama: this.agama,
                marital: this.marital,
                pendidikan: this.pendidikan,
                perkerjaan: this.perkerjaan,
                golda: this.golda,
                norm: this.norm,
                stssimpan: "1",
                kdcabang: this.kdcabang,
                noasuransi: this.noasuransi,
                kdklinik: this.kdklinik,
                kdpanggil: this.an,
                usia: this.usia,
              };

              this.authService.simpanpasbaru(body).subscribe((response) => {
                if (response) {
                  this.toastr.success("" + response, "Sukses", {
                    timeOut: 2000,
                  });

                  this.authService.pasien(this.kdcabang, "2", "").subscribe(
                    (data) => {
                      this.tpasien = data;
                    },
                    (Error) => {
                      console.log(Error);
                    }
                  );

                  this.Batal();
                } else {
                  this.toastr.error("Simpan  Gagal", "Eror");
                }
              });
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
      } else {
        // kalau string "" jangan divalidasi (lolos)
        // kalau 0 jangan divalidasi (lolos)
        if (this.noindetitas != "" && this.noindetitas != "0") {
          let pasien: any = await this.authService.getPasienByTandaPengenal(
            this.cabangarr[0]?.slug,
            this.indetitas,
            this.noindetitas
          );
          let normpasien = pasien?.data?.norm;
          if (normpasien != null && normpasien != this.norm) {
            this.toastr.error(
              `pasien tersebut sudah terdaftar dengan norm ${pasien.data.norm}`,
              "Simpan Gagal"
            );
            this.norm = pasien.data.norm;
            return;
          }
        }

        let body = {
          nama: this.pasien,
          tlahir: this.tempatlahir,
          jeniskelamin: this.kelamin,
          tanggallahir: this.tgllahir,
          alamat: this.alamat,
          kodekel: this.keluarahanid,
          identitas: this.indetitas,
          noidentitas: this.noindetitas,
          nohp: this.nohp,
          agama: this.agama,
          marital: this.marital,
          pendidikan: this.pendidikan,
          perkerjaan: this.perkerjaan,
          golda: this.golda,
          norm: this.norm,
          stssimpan: "1",
          kdcabang: this.kdcabang,
          noasuransi: this.noasuransi,
          kdklinik: this.kdklinik,
          kdpanggil: this.an,
          usia: this.usia,
        };

        this.authService.simpanpasbaru(body).subscribe((response) => {
          if (response) {
            this.toastr.success("" + response, "Sukses", {
              timeOut: 2000,
            });

            this.authService.pasien(this.kdcabang, "2", "").subscribe(
              (data) => {
                this.tpasien = data;
              },
              (Error) => {
                console.log(Error);
              }
            );

            this.Batal();
          } else {
            this.toastr.error("Simpan  Gagal", "Eror");
          }
        });
      }
    } else {
      this.toastr.error("Pakai Tombol edit", "Eror");
    }
  }

  namalurah: any;
  open(content, sts) {
    if (sts == "1") {
      this.namalurah = "Propinsi";
    } else if (sts == "2") {
      this.namalurah = "Kabupaten";
    } else if (sts == "3") {
      this.namalurah = "kecamatan";
    } else if (sts == "4") {
      this.namalurah = "Kelurahan";
    }

    this.modalService.open(content).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  cariprox(a) {
    this.authService.propinsi(a.target.value).subscribe(
      (data) => {
        this.tpropinsi = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  carikab(a) {
    this.authService.kabupaten(this.propinsiid, a.target.value).subscribe(
      (data) => {
        this.tkab = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  carikec(a) {
    this.authService.kecamatan(this.kabupatenid, a.target.value).subscribe(
      (data) => {
        this.tkec = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  carikel(a) {
    this.authService.keluarahan(this.kecamatanid, a.target.value).subscribe(
      (data) => {
        this.tkelurahan = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  keluarahanid: "";

  pilihkel(subdis_id, subdis_name) {
    this.keluarahanid = subdis_id;
    this.keluarahan = subdis_name;

    this.modalService.dismissAll();
  }

  caripas: "2";
  onChange(a) {
    this.caripas = a;

    console.log(this.caripas);
  }
  caripass(a) {
    this.authService
      .pasien(this.kdcabang, this.caripas, a.target.value)
      .subscribe(
        (data) => {
          this.tpasien = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  res: any;

  datax = [];
  Batal() {
    this.norm = "";
    this.pasien = "";

    this.tempatlahir = "";
    this.kelamin = "";
    this.alamat = "";
    this.alamats = "";
    this.noindetitas = "";
    this.nohp = "";
    this.agama = "TIDAK TAHU";
    this.marital = "TIDAK TAHU";
    this.pendidikan = "TIDAK TAHU";
    this.perkerjaan = "TIDAK TAHU";
    this.golda = "Tidak Tahu";
    this.kabupaten = "";
    this.kabupatenid = "";
    this.propinsi = "";
    this.propinsiid = "";
    this.kecamatan = "";
    this.kecamatanid = "";
    this.keluarahan = "";
    this.keluarahanid = "";
    this.tgllahir = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.showtombolpasien = true;

    //     this.authService.tmpbpjs()
    //     .subscribe(
    //       data => {

    // console.log(data.response.jnsPeserta.nama)

    // this.res = data;

    //     },
    //       Error => {

    //        console.log(Error)
    //       }
    //     )
  }

  triwayat: any;

  riwayatpas(
    norm,
    kdkelurahan,
    pasien,
    tgllahir,
    jeniskelamin,
    statusmarital,
    agama,
    alamat,
    alamatsekarang,
    hp,
    kdasuransi,
    noasuransi,
    tandapengenal,
    nopengenal,
    tempatlahir,
    golda,
    aktif,
    pendidikan,
    perkerjaan,
    keluarahan,
    content2
  ) {
    this.authService.riwayatpriksa(this.kdcabang, norm).subscribe(
      (data) => {
        this.triwayat = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.modalService.open(content2).result.then(
      (result) => {},
      (reason) => {}
    );
  }
  verifsimpan = "1";

  pilihpasien(
    norm,
    kdkelurahan,
    pasien,
    tgllahir,
    jeniskelamin,
    statusmarital,
    agama,
    alamat,
    alamatsekarang,
    hp,
    kdasuransi,
    noasuransi,
    tandapengenal,
    nopengenal,
    tempatlahir,
    golda,
    aktif,
    pendidikan,
    perkerjaan,
    keluarahan,
    kdpanggil,
    usia,
    x
  ) {
    this.norm = norm;
    this.pasien = pasien;

    this.tempatlahir = tempatlahir;

    this.kelamin = jeniskelamin;
    this.alamat = alamat;
    this.alamats = alamatsekarang;
    this.indetitas = tandapengenal;
    this.noindetitas = nopengenal;
    this.nohp = hp;
    this.agama = agama;
    this.marital = statusmarital;
    this.pendidikan = pendidikan;
    this.perkerjaan = perkerjaan;
    this.golda = golda;
    this.tgllahir = tgllahir;
    this.noasuransi = noasuransi;

    this.keluarahanid = kdkelurahan;
    this.keluarahan = keluarahan;
    this.verifsimpan = "0";
    this.usia = usia;
    this.propinsi = x.prov_name;
    this.kabupaten = x.city_name;
    this.kecamatan = x.dis_name;
    this.showtombolpasien = false;

    this.an = kdpanggil;

    const difference = this.calculateDifferenceInYearsMonthsDays(
      this.tgllahir,
      this.tglp
    );
    console.log("Selisih:", difference.years, "tahun", difference.days, "hari");
    this.usia =
      difference.years +
      " tahun " +
      difference.months +
      " Bulan " +
      difference.days +
      " hari";
  }

  cekbpjsnik() {
    this.authService.tmpbpjs(this.noindetitas, "nik").subscribe(
      (data) => {
        if (data) {
          console.log(data.metaData.code);
          if (data.metaData.code == 200) {
            this.pasien = data.response.nama;
            this.kelamin = data.response.sex;

            this.noindetitas = data.response.noKTP;
            this.nohp = data.response.noHP;
            this.noasuransi = data.response.noKartu;
            const [day, month, year] = data.response.tglLahir.split("-");
            this.tgllahir = `${year}-${month}-${day}`;
            this.ktgl();

            // this.tgllahir =  this.datepipe.transform(data.response.tglLahir )
            this.toastr.success(
              "Untuk tgl lahir silahkan di sesuiakan dengan ktp"
            );
          } else if (data.metaData.code == 204) {
            this.pasien = "";
            this.kelamin = "";
            this.tgllahir = "";
            this.noindetitas = "";
            this.nohp = "";
            this.noasuransi = "";
            this.toastr.error("data tidak di temukan", "Eror");
          } else {
            this.pasien = "";
            this.kelamin = "";
            this.tgllahir = "";
            this.noindetitas = "";
            this.nohp = "";
            this.noasuransi = "";
            this.toastr.error(
              data.metaData.message + data.response.message,
              "Eror"
            );
          }
        } else {
          this.toastr.error("Gagal Memuat Data BPJS", "Eror");
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  zeros: string = "";
  generateZeros(count: number): void {
    this.zeros = "0".repeat(count);
  }

  cekbpjs(a) {
    var noasuransiv;
    var jumlahkarakter = 13;
    var jumlahnol;
    var hasilkurang: number;
    if (a.target.value.length < 13) {
      // console.log(a.target.value.length)

      // console.log(jumlahkarakter - a.target.value.length)
      hasilkurang = jumlahkarakter - a.target.value.length;
      this.generateZeros(hasilkurang);

      noasuransiv = this.zeros + "" + a.target.value;
      this.noasuransi = noasuransiv;
    } else if (a.target.value.length > 13) {
      this.toastr.error("nomor BPJS terlalu panjang maksimal 13 angka");
    } else {
      noasuransiv = this.noasuransi;
    }

    this.authService.tmpbpjs(noasuransiv, "noka").subscribe(
      (data) => {
        if (data) {
          console.log(data.metaData.code);
          if (data.metaData.code == 200) {
            this.pasien = data.response.nama;
            this.kelamin = data.response.sex;

            this.noindetitas = data.response.noKTP;
            this.nohp = data.response.noHP;
            this.toastr.success(
              "Untuk tgl lahir silahkan di sesuiakan dengan ktp"
            );

            const [day, month, year] = data.response.tglLahir.split("-");
            this.tgllahir = `${year}-${month}-${day}`;
            this.ktgl();
            // this.tgllahir = this.datepipe.transform(
            //   data.response.tglLahir,
            //   "yyyy-MM-dd"
            // );
          } else if (data.metaData.code == 204) {
            this.pasien = "";
            this.kelamin = "";
            this.tgllahir = "";
            this.noindetitas = "";
            this.nohp = "";
            this.noasuransi = "";
            this.toastr.error(
              data.metaData.message + " cek nokartu dan data tidak ada",
              "Eror"
            );
          } else {
            this.pasien = "";
            this.kelamin = "";
            this.tgllahir = "";
            this.noindetitas = "";
            this.nohp = "";
            this.noasuransi = "";
            this.toastr.error(
              data.metaData.message + data.response.message,
              "Eror"
            );
          }
        } else {
          this.toastr.error("Gagal Memuat Data BPJS", "Eror");
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  normbaru: any = "";

  ganti() {
    if (this.normbaru === "") {
      this.toastr.error("isikan norm baru");
      return;
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Ganti Norm?",
        text: "Yakin Akan Panggil Ganti Norm",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ganti",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            normlama: this.norm,
            normbaru: this.normbaru,
            stssimpan: "1",
          };

          this.authService.editnorm(body).subscribe((response) => {
            if (response) {
              this.toastr.success("", "Sukses", {
                timeOut: 2000,
              });

              this.norm = this.normbaru;
              this.tmpantri();

              this.modalService.dismissAll();
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

  kycPasien(pasien: any) {
    let isValid: Boolean = true;
    const headers = { "kd-cabang": this.kdcabang };

    if (pasien.tandapengenal != "KTP") {
      isValid = false;
      this.toastr.error("tipe identitas bukan ktp!", "Error");
    }

    if (pasien.nopengenal.length != 16) {
      isValid = false;
      this.toastr.error("no ktp harus 16 digit!", "Error");
    }

    if (isValid == true) {
      this.authService.getpasien(pasien.nopengenal, headers).subscribe(
        (data: any) => {
          if (data.entry.length <= 0) {
            this.toastr.error(
              "no ktp tidak di temukan di satu sehat!",
              "Error"
            );
          }
          if (!data.entry[0].resource.active) {
            this.toastr.error(
              "status no ktp tidak aktif di satu sehat!",
              "Error"
            );
          }
          if (data.entry[0].resource.active) {
            const payload = {
              data: {
                nik: pasien.nopengenal,
                name: pasien.pasien,
              },
            };
            this.authService.kyc(payload, headers).subscribe(
              (data: any) => {
                window.open(data.data.url, "_blank");
              },
              (error) => {
                this.toastr.error(error.message, "Error");
              }
            );
          }
        },
        (error) => {
          this.toastr.error("no ktp tidak di temukan di satu sehat!", "Error");
        }
      );
    }
  }

  calculateDifferenceInYearsMonthsDays(
    startDate: Date,
    endDate: Date
  ): { years: number; months: number; days: number } {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += previousMonth.getDate();
    }

    return { years, months, days };
  }
  usiadeal: any = "";

  ktgl() {
    const difference = this.calculateDifferenceInYearsMonthsDays(
      this.tgllahir,
      this.tglp
    );
    console.log("Selisih:", difference.years, "tahun", difference.days, "hari");
    this.usia =
      difference.years +
      " tahun " +
      difference.months +
      " Bulan " +
      difference.days +
      " hari";
    // console.log('Selisih:', difference.years, 'tahun', difference.months, 'bulan', difference.days, 'hari');
    console.log(this.usiadeal);
  }
}
