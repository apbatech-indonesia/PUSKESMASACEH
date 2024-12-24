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
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe, formatDate } from "@angular/common";
import { SampleService } from "src/app/services";
import { AppComponent } from "../../app.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResolveEnd } from "@angular/router";
import { FarmasijualService } from "../kasirfarmasijual/farmasijual.service";

@Component({
  selector: "app-mpdaftarpasien",
  templateUrl: "./mpdaftarpasien.component.html",
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

      .reject-message {
        font-size: 0.25em;
      }

      .reject-message::before {
        display: none;
        height: 100px;
      }

      .reject-message i {
        margin: 0 0.4em;
        color: #000000;
        font-size: 0.25em;
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
export class MpdaftarpasienComponent implements OnInit {
  heading = "Pendaftaran Pasien";
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
  tgllahir: any;
  username: any;
  kelas: string;
  tglp: any;
  tglpp: any;

  myDate = new Date();
  hostName: string;
  URLINVOICE: string;
  tgldaftarbpjs: any = new Date();
  idhs: any = "";
  kodeorg: any = "";
  tglss: any;
  slug: any;
  myDatev2 = new Date();
  kdprov: any = "";

  constructor(
    private appComponent: AppComponent,
    public FarmasijualService: FarmasijualService,
    public hots: SampleService,
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
    this.username = this.userDetails.username;
    this.tglp = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglpp = this.datepipe.transform(this.myDate, "dd-MM-yyyy");

    this.tglss = this.datepipe.transform(
      this.myDate,
      "yyyy-MM-ddTHH:mm:ss+07:00"
    );
    // 2024-01-26T10:32:37+07:00
    // "2024-01-26T10:31:37+07:00",
    this.authService.cabangper(this.kdklinik).subscribe(
      (data) => {
        for (let x of data) {
          this.kodeorg = x.kodeorg;
          this.slug = x.slug;
          this.kdprov = x.kdprov;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.pastdate();
  }

  showloadss: boolean;

  ksatusehat(
    notransaksi,
    norm,
    idpasien,
    idhis,
    idsatusehat,
    pasien,
    nampoli,
    namdokter,
    nopengenal
  ) {
    this.showloadss = true;

    this.authService.ceksatusehat(notransaksi).subscribe(
      (data) => {
        if (data.length) {
          this.toastr.error("Sudah terkirim sebelumnya", "", {
            timeOut: 2000,
          });

          this.showloadss = false;

          return;
        } else {
          const headers = new HttpHeaders({
            "kd-cabang": this.kdcabang,
          });

          this.authService.getpasien(nopengenal, headers).subscribe(
            (data) => {
              if (data.entry.length !== 0) {
                this.idhs = data.entry[0].resource.id;

                let body = {
                  data: {
                    organizationId: this.kodeorg,
                    patientId: this.idhs,
                    patientNama: pasien,
                    practitionerId: idhis,
                    practitionerNama: namdokter,
                    periodStart: this.tglss,
                    periodEnd: this.tglss,
                    locationId: idsatusehat,
                    locationDisplay: nampoli,
                  },
                };

                this.authService
                  .simpanencounter(body, headers)
                  .subscribe((response) => {
                    if (response.resourceType === "Encounter") {
                      let bodyx = {
                        stssimpan: "2",
                        token: response.id,
                        notransaksi: notransaksi,
                        norm: norm,
                        idpasien: idpasien,
                      };
                      this.authService
                        .simpantoken(bodyx)
                        .subscribe((response) => {
                          if (response.length) {
                            this.toastr.success("Berhasil Kirim ");
                            this.showloadss = false;
                          }
                        });
                    } else {
                      console.log(response.issue[0]);

                      this.toastr.error(response.issue[0].diagnostics);
                    }
                  });
              } else {
                this.idhs = "Gagal Get IHS";
                this.showloading = false;

                this.toastr.error(
                  "Silahkan Lengkapi NIK Pasein Agar dapat ID Satu Sehat Pasien",
                  "SATU SEHAT ID PASIEN",
                  {
                    timeOut: 2000,
                  }
                );
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
  }
  rj: number;
  far: number;
  lab: number;
  rad: number;
  emr: number;
  pcare: number;
  upload: number;
  min: any;
  minbpjs: any;

  pastdate() {
    var tdate: any = new Date();
    var date: any = tdate.getDate();
    if (date < 10) {
      date = "0" + date;
    }
    var month: any = tdate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }

    var year: any = tdate.getFullYear();
    this.min = year + "-" + month + "-" + date;
    this.minbpjs = date + "-" + month + "-" + year;
  }
  non(a) {
    this.tglp = this.datepipe.transform(this.myDate, "yyyy-MM-dd");

    this.toastr.error("Tidak di ijinkan menulis tanggal manual");
  }

  nonx() {
    this.kliniks = "";
    this.dokter = "";
    this.tdokter = [];
  }
  hak() {
    this.authService.hakakses(this.kdcabang).subscribe(
      (data) => {
        for (let x of data) {
          this.rj = x.rj;
          this.far = x.farmasi;
          this.lab = x.lab;
          this.rad = x.rad;
          this.emr = x.emr;
          this.pcare = x.pcare;
          this.upload = x.upload;
          // this.kdprovider = x.kdprovider
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  profileForm = this.fb.group({
    norm: ["", Validators.required],
    pasienin: ["", Validators.required],
    indetitas: ["", Validators.required],
    noindetitas: ["", Validators.required],
    hp: ["", Validators.required],
    dokter: ["", Validators.required],
    kliniksx: ["", Validators.required],

    cusi: ["", Validators.required],
    cusid: ["", Validators.required],
    noasuransi: ["", Validators.required],
  });

  cities12 = [
    { id: 1, name: "Vilnius" },
    { id: 2, name: "Kaunas" },
    { id: 3, name: "Pavilnys", disabled: true },
    { id: 4, name: "Pabradė" },
    { id: 5, name: "Klaipėda" },
  ];
  selectedCity: any;
  tcariall: any;
  pasienc = "";
  caripasienc(a) {
    this.authService
      .pasienantrian(this.kdcabang, "3", "", a.target.value, "")
      .subscribe(
        (data) => {
          this.tcariall = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  ngOnInit() {
    this.hostName = this.hots.getHostname();

    this.URLINVOICE = "https://" + this.hostName + "/";
    this.klinik();
    this.tmppuser();
    this.hak();
    this.pilihdokter();
    this.lihatpas();
  }

  tmppas: any;
  totalpasien: any;
  caripasx: any;

  caripassd(a) {
    this.authService
      .pasiendaftar(this.kdcabang, a.target.value, this.caripasx)
      .subscribe(
        (data) => {
          this.tmppas = data;
          this.totalpasien = data.length;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  pilihk(a) {
    this.authService.pasiendaftar(this.kdcabang, "", a).subscribe(
      (data) => {
        this.tmppas = data;
        this.totalpasien = data.length;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tpolidaf: any;

  lihatpas() {
    this.authService.pasiendaftar(this.kdcabang, "", "").subscribe(
      (data) => {
        this.tmppas = data;
        this.totalpasien = data.length;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.listpolidaf(this.kdcabang).subscribe(
      (data) => {
        this.tpolidaf = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  klinik() {
    // this.authService.klinikper(this.kdklinik)
    // .subscribe(
    //   data => {

    //     this.subheading = Array.prototype.map.call(data,s=>s.nama).toString();

    // },
    //   Error => {

    //    console.log(Error)
    //   }
    // )

    this.authService.cabangbyid(this.kdklinik, this.kdcabang).subscribe(
      (data) => {
        this.cabangarr = Array.prototype.map
          .call(data, (s) => s.nama)
          .toString();
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tmpusers: any;
  tklinik: any;
  kliniks: string = "";

  tmppuser() {
    this.authService.poli(this.kdcabang).subscribe(
      (data) => {
        this.tklinik = data;
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

  edituser() {}

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

  indetitas: string = "";
  noindetitas: "";
  dokter: string = "";
  tdokter: any;
  kdpolibpjsku: any;
  tlistjadwal: any;

  pilihklinik(a) {
    if (this.dash === "BPJS") {
      this.authService.polibyid(this.kdcabang, a).subscribe(
        (data) => {
          console.log(data);

          if (data.length) {
            this.kdpolibpjsku = data[0].kdpolibpjs;
            this.showloading = true;

            this.authService
              .cekjadwalv22(this.kdpolibpjsku, this.tglp, a)
              .subscribe(
                (data) => {
                  if (data == 200) {
                    console.log(data);
                    this.tlistjadwal = data;
                    this.showloading = false;
                  } else {
                    this.showloading = false;
                    this.jadwal = "";
                    this.tdokter = [];
                    this.tjadwal = [];

                    this.toastr.error(
                      "jadwal tidak ada di tanggal " + this.tglp
                    );
                    return;
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

      this.authService.dokterperpolix(this.kdcabang, a).subscribe(
        (data) => {
          this.tdokter = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else {
      this.authService.polibyid(this.kdcabang, a).subscribe(
        (data) => {
          console.log(data);

          if (data.length) {
            this.kdpolibpjsku = data[0].kdpolibpjs;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );

      this.authService.dokterperpolix(this.kdcabang, a).subscribe(
        (data) => {
          this.tdokter = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
    }
  }

  tkloter: any;
  kloter = "";

  pilihdokter() {
    this.authService.kostumer(this.kdcabang, "1", "").subscribe(
      (data) => {
        this.tcus = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tcus: any;
  cusi = "";
  tcusid: any;
  cusid = "";
  dash: string;

  pilkel(a) {
    console.log(this.cusi);
    this.authService.kostumerd(this.kdcabang, "1", "", a).subscribe(
      (data) => {
        this.tcusid = data;

        for (let x of data) {
          this.dash = x.dash;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tjadwal: any;
  showloading: boolean;
  pilihjadwal(a) {
    this.authService
      .cekjadwalv222(this.dokter, this.kliniks, this.tglp)
      .subscribe((data) => {
        // this.tjadwal = data;

        if (data.length) {
          this.jadwaltidak = "1";
          this.listjadwal = data;
        } else {
          this.jadwaltidak = "0";
        }
      });

    this.showloading = true;
    this.authService
      .cekjadwal(this.dokter, this.kliniks, this.tglp)
      .subscribe((data) => {
        if (data.length) {
          this.showloading = false;

          this.tjadwal = data;
        } else {
          this.showloading = false;
          this.toastr.error(
            "Jadwal Di Hafiz tidak ada silahkan ganti dokter yang hari ini praktek sesuai hafiz"
          );
          this.tjadwal = [];
          // this.toastr.error(
          //   "Jadwal Di Hafiz tidak ada silahkan ganti dokter yang hari ini praktek sesuai hafiz"
          // );
          // return;
        }
      });
  }

  jadwaltidak: any;
  listjadwal: any;

  //  tglp: Date = new Date();

  norm: "";
  pasien: "";
  hp: "";
  noasuransi = "";
  tpasien: any;

  caripasien(a) {
    this.authService.caripasienful(a.target.value).subscribe(
      (data) => {
        this.tpasien = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  pasienin = "";

  tantrian: any;

  kdpolibpjs: any;
  dashx: any;
  noantrianbpjs: any;
  jadwal: any = "";

  pilihpasienc() {
    this.authService
      .pasienantrian(this.kdcabang, "2", this.pasienc, "", "")
      .subscribe(
        (data) => {
          this.tantrian = data;

          for (let x of data) {
            this.noasuransi = x.noasuransi;
            // this.tgldaftarbpjs = x.tglpriksa
            this.kdpolibpjs = x.kdpolibpjs;
            this.dashx = x.dash;
            this.kdprovider = x.kdprovider;
            this.sudahpcare = x.spcare;
            this.noantrianbpjs = x.noantrianbpjs;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  bataldaf() {
    // this.norm = ''
    // this.pasienin=''
    // this.indetitas=''
    // this.noindetitas=''
    // this.hp='',
    // // this.kliniks='',
    // // this.dokter='',

    // // this.cusi=''
    // // this.cusid=''
    // this.noasuransi='0';

    this.profileForm.reset();
  }
  notransaksix: any;

  sss() {
    let body = {
      norm: this.norm,
      pasien: this.pasienin,
      indetitas: this.indetitas,
      noindetitas: this.noindetitas,
      kduser: this.username,
      hp: this.hp,
      kdpoli: this.kliniks,
      kddokter: this.dokter,
      kelas: "1",
      tgldaftar: this.tglp,
      kostumer: this.cusi,
      kdkostumer: this.cusid,
      noasuransi: this.noasuransi,
      kdcabang: this.kdcabang,
      kdklinik: this.kdklinik,
      stssimpan: "1",
    };

    console.log(body);
  }

  simpan(content71) {
    if (this.jadwal === "") {
      this.toastr.error("belum memilih jadwal, silahkan memilih jadwal");
      return;
    }

    if (this.dash === "BPJS") {
      console.log(this.kdpolibpjsku);
      if (this.kdpolibpjsku != "998" && this.kdpolibpjsku != "005") {
        if (this.jadwaltidak === "0") {
          this.toastr.error(
            "Jadwal Dokter / Poliklinik yang di pilih tidak terdapat jadwal hafis hari ini , silahkan ganti dokter atau tambahkan jadwal dokter terlebih dahulu di hafis"
          );

          this.modalService.open(content71, {});

          return;
        }
      }

      if (this.noindetitas.length < 16) {
        this.toastr.error("NIK harus 16 digit");
        return;
      }

      if (this.noindetitas.length > 16) {
        this.toastr.error("NIK harus 16 digit");
        return;
      }

      if (this.noasuransi.length < 13) {
        this.toastr.error("No Kartu harus 13 digit");
        return;
      }

      if (this.noasuransi.length > 13) {
        this.toastr.error("No Kartu harus 13 digit");
        return;
      }

      this.authService.tmpbpjs(this.noasuransi, "noka").subscribe(
        (data) => {
          if (data) {
            console.log(data.metaData.code);
            if (data.metaData.code == 200) {
              this.aktif = data.response.aktif;
              this.ketaktif = data.response.ketAktif;

              if (data.response.kdProviderPst.kdProvider != this.kdprov) {
                const swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger",
                  },
                  buttonsStyling: false,
                });

                swalWithBootstrapButtons
                  .fire({
                    title: "Peserta Tidak Sesuai Faskes",
                    text:
                      "Peserta " +
                      this.pasienin +
                      " Faskes " +
                      data.response.kdProviderPst.nmProvider +
                      " Tidak sesuai faskes apakah yakin akan melanjutkan?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Batal",
                    reverseButtons: true,
                  })
                  .then((result) => {
                    if (result.value) {
                      if (this.aktif == true) {
                        console.log("asd");
                        this.authService
                          .verifdaftar(
                            this.norm,
                            this.kdcabang,
                            this.kliniks,
                            this.tglp
                          )
                          .subscribe(
                            (data) => {
                              if (data.length) {
                                this.toastr.error(
                                  "Anda Sudah Terdaftar di Poli yang sama",
                                  "Eror"
                                );
                              } else {
                                let body = {
                                  norm: this.norm,
                                  pasien: this.pasienin,
                                  indetitas: this.indetitas,
                                  noindetitas: this.noindetitas,
                                  kduser: this.username,
                                  hp: this.hp,
                                  kdpoli: this.kliniks,
                                  kddokter: this.dokter,
                                  kelas: "1",
                                  tgldaftar: this.tglp,
                                  kostumer: this.cusi,
                                  kdkostumer: this.cusid,
                                  noasuransi: this.noasuransi,
                                  kdcabang: this.kdcabang,
                                  kdklinik: this.kdklinik,
                                  stssimpan: "1",
                                  kdprovider: this.kdprovider,
                                  idhs: this.idhs,
                                };

                                this.authService
                                  .simpandaftarrj(body)
                                  .subscribe((response) => {
                                    if (response) {
                                      this.toastr.success(
                                        "" + response,
                                        "Sukses",
                                        {
                                          timeOut: 2000,
                                        }
                                      );
                                      this.appComponent.sendNotificationDokter(
                                        this.dokter
                                      );
                                      this.pasienc = response;

                                      this.authService
                                        .pasienantrian(
                                          this.kdcabang,
                                          "2",
                                          response,
                                          "",
                                          ""
                                        )
                                        .subscribe(
                                          (data) => {
                                            for (let x of data) {
                                              this.noasuransi = x.noasuransi;
                                              // this.tgldaftarbpjs = x.tglpriksa
                                              this.kdpolibpjs = x.kdpolibpjs;
                                              this.dashx = x.dash;
                                              this.kdprovider = x.kdprovider;
                                              this.sudahpcare = x.spcare;
                                              this.noantrianbpjs =
                                                x.noantrianbpjs;
                                            }

                                            if (this.dash === "BPJS") {
                                              setTimeout(() => {
                                                let bodyAddFktp = {
                                                  nomorkartu:
                                                    data[0].noasuransi,
                                                  nik: data[0].nopengenal,
                                                  nohp: "082176678897",
                                                  kodepoli: this.kdpolibpjs,
                                                  namapoli: data[0].nampoli,
                                                  norm: data[0].norm,
                                                  tanggalperiksa:
                                                    data[0].tglpriksa,
                                                  kodedokter: parseInt(
                                                    data[0].kddokterbpjs
                                                  ),
                                                  namadokter: data[0].namdokter,
                                                  jampraktek: this.jadwal,
                                                  nomorantrean:
                                                    data[0].kodeantrian +
                                                    "-" +
                                                    data[0].noantrian,
                                                  angkaantrean: parseInt(
                                                    data[0].noantrian
                                                  ),
                                                  keterangan: "daftar",
                                                };

                                                console.log(bodyAddFktp);
                                                this.authService
                                                  .addBpjsAntrian(
                                                    bodyAddFktp,
                                                    this.slug
                                                  )
                                                  .subscribe((response) => {
                                                    if (
                                                      response.data.code == 200
                                                    ) {
                                                      this.tantrian = data;
                                                      this.toastr.success(
                                                        response.data.message,
                                                        "Sukses",
                                                        {
                                                          timeOut: 2000,
                                                        }
                                                      );

                                                      setTimeout(() => {
                                                        let bodyeditfarmasiterkirim =
                                                          {
                                                            stssimpan: "3",
                                                            notransaksi:
                                                              this.pasienc,
                                                          };

                                                        this.authService
                                                          .editobatsk(
                                                            bodyeditfarmasiterkirim
                                                          )
                                                          .subscribe(
                                                            (response) => {
                                                              console.log(
                                                                response
                                                              );
                                                            }
                                                          );
                                                      }, 250);

                                                      // setTimeout(() => {
                                                      //   let bodypanggil={
                                                      //     "tanggalperiksa":this.tantrian[0].tglpriksa,
                                                      //       "kodepoli": this.kdpolibpjs,
                                                      //       "nomorkartu":  this.tantrian[0].noasuransi,
                                                      //       "status": 1
                                                      //     }

                                                      //       this.authService.PanggilBpjsAntrian(bodypanggil,this.slug)
                                                      //       .subscribe(response => {

                                                      //         if(response.data.code == 200){

                                                      //   let bodyeditfarmasiterkirimv={
                                                      //     "stssimpan":'4',
                                                      //     "notransaksi":this.pasienc,

                                                      //   }

                                                      //   this.authService.editobatsk(bodyeditfarmasiterkirimv)
                                                      //   .subscribe(response => {

                                                      //     console.log(response)

                                                      //   })

                                                      //           this.toastr.success(response.data.message, 'Sukses', {
                                                      //             timeOut: 2000,
                                                      //           });

                                                      //         }else{

                                                      //           this.toastr.error(response.metadata.message, 'Error');

                                                      //         }

                                                      //       })

                                                      // }, 250);
                                                    } else {
                                                      this.toastr.error(
                                                        response.data.message,
                                                        ""
                                                      );
                                                    }
                                                  });
                                              }, 500);
                                            }
                                          },
                                          (Error) => {
                                            console.log(Error);
                                          }
                                        );

                                      this.bataldaf();
                                    } else {
                                      this.toastr.error(
                                        "Simpan  Gagal",
                                        "Eror"
                                      );
                                    }

                                    const headers = new HttpHeaders({
                                      "kd-cabang": this.kdcabang,
                                    });

                                    this.authService
                                      .getpasien(
                                        this.tantrian[0].nopengenal,
                                        headers
                                      )
                                      .subscribe(
                                        (data) => {
                                          if (data.entry.length !== 0) {
                                            this.idhs =
                                              data.entry[0].resource.id;

                                            let bodyvvv = {
                                              data: {
                                                organizationId: this.kodeorg,
                                                patientId: this.idhs,
                                                patientNama:
                                                  this.tantrian[0].pasien,
                                                practitionerId:
                                                  this.tantrian[0].idhis,
                                                practitionerNama:
                                                  this.tantrian[0].namdokter,
                                                periodStart: this.tglss,
                                                periodEnd: this.tglss,
                                                locationId:
                                                  this.tantrian[0].idsatusehat,
                                                locationDisplay:
                                                  this.tantrian[0].nampoli,
                                              },
                                            };

                                            this.authService
                                              .simpanencounter(bodyvvv, headers)
                                              .subscribe((response) => {
                                                if (
                                                  response.resourceType ===
                                                  "Encounter"
                                                ) {
                                                  let bodyxss = {
                                                    stssimpan: "2",
                                                    token: response.id,
                                                    notransaksi: response,
                                                    norm: this.tantrian[0].norm,
                                                    idpasien: this.idhs,
                                                  };
                                                  this.authService
                                                    .simpantoken(bodyxss)
                                                    .subscribe((response) => {
                                                      if (response.length) {
                                                        // this.toastr.success('Berhasil Kirim ');
                                                      }
                                                    });
                                                } else {
                                                  // console.log(response.issue[0])
                                                  // this.toastr.error(response.issue[0].diagnostics);
                                                }
                                              });
                                          } else {
                                            this.showloading = false;

                                            this.idhs = "Gagal Get IHS";
                                            this.toastr.error(
                                              "Silahkan Lengkapi NIK Pasein Agar dapat ID Satu Sehat Pasien",
                                              "SATU SEHAT ID PASIEN",
                                              {
                                                timeOut: 2000,
                                              }
                                            );
                                          }
                                        },
                                        (Error) => {
                                          console.log(Error);
                                        }
                                      );
                                  });
                              }
                            },
                            (Error) => {
                              console.log(Error);
                            }
                          );
                      } else {
                        this.toastr.error(
                          "STATUS KEPERSETAAN " + this.ketaktif,
                          "Eror"
                        );
                      }
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
              } else {
                if (this.aktif == true) {
                  console.log("asd");
                  this.authService
                    .verifdaftar(
                      this.norm,
                      this.kdcabang,
                      this.kliniks,
                      this.tglp
                    )
                    .subscribe(
                      (data) => {
                        if (data.length) {
                          this.toastr.error(
                            "Anda Sudah Terdaftar di Poli yang sama",
                            "Eror"
                          );
                        } else {
                          let body = {
                            norm: this.norm,
                            pasien: this.pasienin,
                            indetitas: this.indetitas,
                            noindetitas: this.noindetitas,
                            kduser: this.username,
                            hp: this.hp,
                            kdpoli: this.kliniks,
                            kddokter: this.dokter,
                            kelas: "1",
                            tgldaftar: this.tglp,
                            kostumer: this.cusi,
                            kdkostumer: this.cusid,
                            noasuransi: this.noasuransi,
                            kdcabang: this.kdcabang,
                            kdklinik: this.kdklinik,
                            stssimpan: "1",
                            kdprovider: this.kdprovider,
                            idhs: this.idhs,
                          };

                          this.authService
                            .simpandaftarrj(body)
                            .subscribe((response) => {
                              if (response) {
                                this.toastr.success("" + response, "Sukses", {
                                  timeOut: 2000,
                                });
                                this.appComponent.sendNotificationDokter(
                                  this.dokter
                                );
                                this.pasienc = response;

                                this.authService
                                  .pasienantrian(
                                    this.kdcabang,
                                    "2",
                                    response,
                                    "",
                                    ""
                                  )
                                  .subscribe(
                                    (data) => {
                                      for (let x of data) {
                                        this.noasuransi = x.noasuransi;
                                        // this.tgldaftarbpjs = x.tglpriksa
                                        this.kdpolibpjs = x.kdpolibpjs;
                                        this.dashx = x.dash;
                                        this.kdprovider = x.kdprovider;
                                        this.sudahpcare = x.spcare;
                                        this.noantrianbpjs = x.noantrianbpjs;
                                      }

                                      if (this.dash === "BPJS") {
                                        setTimeout(() => {
                                          let bodyAddFktp = {
                                            nomorkartu: data[0].noasuransi,
                                            nik: data[0].nopengenal,
                                            nohp: "082176678897",
                                            kodepoli: this.kdpolibpjs,
                                            namapoli: data[0].nampoli,
                                            norm: data[0].norm,
                                            tanggalperiksa: data[0].tglpriksa,
                                            kodedokter: parseInt(
                                              data[0].kddokterbpjs
                                            ),
                                            namadokter: data[0].namdokter,
                                            jampraktek: this.jadwal,
                                            nomorantrean:
                                              data[0].kodeantrian +
                                              "-" +
                                              data[0].noantrian,
                                            angkaantrean: parseInt(
                                              data[0].noantrian
                                            ),
                                            keterangan: "daftar",
                                          };

                                          console.log(bodyAddFktp);
                                          this.authService
                                            .addBpjsAntrian(
                                              bodyAddFktp,
                                              this.slug
                                            )
                                            .subscribe((response) => {
                                              if (response.data.code == 200) {
                                                this.toastr.success(
                                                  response.data.message,
                                                  "Sukses",
                                                  {
                                                    timeOut: 2000,
                                                  }
                                                );
                                                this.tantrian = data;

                                                setTimeout(() => {
                                                  let bodyeditfarmasiterkirim =
                                                    {
                                                      stssimpan: "3",
                                                      notransaksi: this.pasienc,
                                                    };

                                                  this.authService
                                                    .editobatsk(
                                                      bodyeditfarmasiterkirim
                                                    )
                                                    .subscribe((response) => {
                                                      console.log(response);
                                                    });
                                                }, 250);

                                                // setTimeout(() => {
                                                //   let bodypanggil={
                                                //     "tanggalperiksa":this.tantrian[0].tglpriksa,
                                                //       "kodepoli": this.kdpolibpjs,
                                                //       "nomorkartu":  this.tantrian[0].noasuransi,
                                                //       "status": 1
                                                //     }

                                                //       this.authService.PanggilBpjsAntrian(bodypanggil,this.slug)
                                                //       .subscribe(response => {

                                                //         if(response.data.code == 200){

                                                //   let bodyeditfarmasiterkirimv={
                                                //     "stssimpan":'4',
                                                //     "notransaksi":this.pasienc,

                                                //   }

                                                //   this.authService.editobatsk(bodyeditfarmasiterkirimv)
                                                //   .subscribe(response => {

                                                //     console.log(response)

                                                //   })

                                                //           this.toastr.success(response.data.message, 'Sukses', {
                                                //             timeOut: 2000,
                                                //           });

                                                //         }else{

                                                //           this.toastr.error(response.metadata.message, 'Error');

                                                //         }

                                                //       })

                                                // }, 250);
                                              } else {
                                                this.toastr.error(
                                                  response.data.message,
                                                  ""
                                                );
                                              }
                                            });
                                        }, 500);
                                      }
                                    },
                                    (Error) => {
                                      console.log(Error);
                                    }
                                  );

                                this.bataldaf();
                              } else {
                                this.toastr.error("Simpan  Gagal", "Eror");
                              }

                              const headers = new HttpHeaders({
                                "kd-cabang": this.kdcabang,
                              });

                              this.authService
                                .getpasien(this.tantrian[0].nopengenal, headers)
                                .subscribe(
                                  (data) => {
                                    if (data.entry.length !== 0) {
                                      this.idhs = data.entry[0].resource.id;

                                      let bodyvvv = {
                                        data: {
                                          organizationId: this.kodeorg,
                                          patientId: this.idhs,
                                          patientNama: this.tantrian[0].pasien,
                                          practitionerId:
                                            this.tantrian[0].idhis,
                                          practitionerNama:
                                            this.tantrian[0].namdokter,
                                          periodStart: this.tglss,
                                          periodEnd: this.tglss,
                                          locationId:
                                            this.tantrian[0].idsatusehat,
                                          locationDisplay:
                                            this.tantrian[0].nampoli,
                                        },
                                      };

                                      this.authService
                                        .simpanencounter(bodyvvv, headers)
                                        .subscribe((response) => {
                                          if (
                                            response.resourceType ===
                                            "Encounter"
                                          ) {
                                            let bodyxss = {
                                              stssimpan: "2",
                                              token: response.id,
                                              notransaksi: response,
                                              norm: this.tantrian[0].norm,
                                              idpasien: this.idhs,
                                            };
                                            this.authService
                                              .simpantoken(bodyxss)
                                              .subscribe((response) => {
                                                if (response.length) {
                                                  // this.toastr.success('Berhasil Kirim ');
                                                }
                                              });
                                          } else {
                                            // console.log(response.issue[0])
                                            // this.toastr.error(response.issue[0].diagnostics);
                                          }
                                        });
                                    } else {
                                      this.showloading = false;

                                      this.idhs = "Gagal Get IHS";
                                      this.toastr.error(
                                        "Silahkan Lengkapi NIK Pasein Agar dapat ID Satu Sehat Pasien",
                                        "SATU SEHAT ID PASIEN",
                                        {
                                          timeOut: 2000,
                                        }
                                      );
                                    }
                                  },
                                  (Error) => {
                                    console.log(Error);
                                  }
                                );
                            });
                        }
                      },
                      (Error) => {
                        console.log(Error);
                      }
                    );
                } else {
                  this.toastr.error(
                    "STATUS KEPERSETAAN " + this.ketaktif,
                    "Eror"
                  );
                }
              }
            } else {
              this.toastr.error(data.metaData.message, "Eror");
            }
          } else {
            this.toastr.error("Gagal Memuat Data BPJS", "Eror");
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else {
      console.log("xs");

      let body = {
        norm: this.norm,
        pasien: this.pasienin,
        indetitas: this.indetitas,
        noindetitas: this.noindetitas,
        kduser: this.username,
        hp: this.hp,
        kdpoli: this.kliniks,
        kddokter: this.dokter,
        kelas: "1",
        tgldaftar: this.tglp,
        kostumer: this.cusi,
        kdkostumer: this.cusid,
        noasuransi: this.noasuransi,
        kdcabang: this.kdcabang,
        kdklinik: this.kdklinik,
        stssimpan: "1",
        kdprovider: this.kdprovider,
        idhs: this.idhs,
      };

      this.authService.simpandaftarrj(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });
          this.appComponent.sendNotificationDokter(this.dokter);
          this.pasienc = response;

          this.authService
            .pasienantrian(this.kdcabang, "2", response, "", "")
            .subscribe(
              (data) => {
                this.tantrian = data;
                for (let x of data) {
                  this.noasuransi = x.noasuransi;
                  // this.tgldaftarbpjs = x.tglpriksa
                  this.kdpolibpjs = x.kdpolibpjs;
                  this.dashx = x.dash;
                  this.kdprovider = x.kdprovider;
                  this.sudahpcare = x.spcare;
                  this.noantrianbpjs = x.noantrianbpjs;
                }

                if (this.dash === "BPJS") {
                  setTimeout(() => {
                    let bodyAddFktp = {
                      nomorkartu: this.tantrian[0].noasuransi,
                      nik: this.tantrian[0].nopengenal,
                      nohp: "082176678897",
                      kodepoli: this.kdpolibpjs,
                      namapoli: this.tantrian[0].nampoli,
                      norm: this.tantrian[0].norm,
                      tanggalperiksa: this.tantrian[0].tglpriksa,
                      kodedokter: parseInt(this.tantrian[0].kddokterbpjs),
                      namadokter: this.tantrian[0].namdokter,
                      jampraktek: this.jadwal,
                      nomorantrean:
                        this.tantrian[0].kodeantrian +
                        "-" +
                        this.tantrian[0].noantrian,
                      angkaantrean: parseInt(this.tantrian[0].noantrian),
                      keterangan: "daftar",
                    };

                    console.log(bodyAddFktp);
                    this.authService
                      .addBpjsAntrian(bodyAddFktp, this.slug)
                      .subscribe((response) => {
                        if (response.data.code == 200) {
                          this.toastr.success(response.data.message, "Sukses", {
                            timeOut: 2000,
                          });
                        } else {
                          this.toastr.error(response.data.message, "");
                        }
                      });
                  }, 500);
                }
              },
              (Error) => {
                console.log(Error);
              }
            );

          this.bataldaf();
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
    }
  }

  statuskirim: any = "";
  noref = "";

  simpanantrian(a, b) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Cetak Antrian?",
        text: "Yakin Akan Cetak Antrian User",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cetak",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          // this.authService.panggil(a, this.noref)
          //   .subscribe(
          //     data => {

          //       console.log(data)

          //     },
          //     Error => {

          //       console.log(Error)
          //     }
          //   )

          setTimeout(() => {
            this.authService.waktuTunggucb1(a, "1", b).subscribe(
              (data) => {
                console.log(data);
              },
              (Error) => {
                console.log(Error);
              }
            );

            alert("1");
          }, 3000);

          setTimeout(() => {
            this.authService.waktuTunggucb2(a, "2", b).subscribe(
              (data) => {
                console.log(data);
              },
              (Error) => {
                console.log(Error);
              }
            );
          }, 4500);

          setTimeout(() => {
            this.authService.waktuTunggucb3(a, "3").subscribe(
              (data) => {
                console.log(data);
              },
              (Error) => {
                console.log(Error);
              }
            );
          }, 5600);

          swalWithBootstrapButtons.fire(
            "Berhasil Cetak ",
            "Cetak Telah Berhasil.",
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

  simpanantrianx(a, b) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Cetak Antrian?",
        text: "Yakin Akan Cetak Antrian User",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cetak",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          // this.authService.panggil(a, this.noref)
          //   .subscribe(
          //     data => {

          //       console.log(data)

          //     },
          //     Error => {

          //       console.log(Error)
          //     }
          //   )

          setTimeout(() => {
            this.authService.waktuTunggucb3(a, "3").subscribe(
              (data) => {
                console.log(data);
              },
              (Error) => {
                console.log(Error);
              }
            );
          }, 4000);

          swalWithBootstrapButtons.fire(
            "Berhasil Cetak ",
            "Cetak Telah Berhasil.",
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

  simpanantrianxX(a, b) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Cetak Antrian?",
        text: "Yakin Akan Cetak Antrian User",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cetak",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.authService.waktuTunggucb3(a, "3").subscribe(
            (data) => {
              console.log(data);
            },
            (Error) => {
              console.log(Error);
            }
          );

          swalWithBootstrapButtons.fire(
            "Berhasil Cetak ",
            "Cetak Telah Berhasil.",
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
  openLarge(content) {
    this.caripas = "2";
    this.authService.pasien(this.kdcabang, "2", "").subscribe(
      (data) => {
        this.tpasien = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.modalService.open(content, {
      size: "lg",
    });
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
    idhs
  ) {
    this.noindetitas = nopengenal;
    this.hp = hp;
    this.indetitas = tandapengenal;
    this.cusi = kdasuransi;
    this.noasuransi = noasuransi;
    this.pasienin = pasien;
    this.norm = norm;
    this.tgllahir = tgllahir;
    this.idhs = idhs;

    const headers = new HttpHeaders({
      "kd-cabang": this.kdcabang,
    });

    this.authService.getpasien(nopengenal, headers).subscribe(
      (data) => {
        if (data.entry.length !== 0) {
          this.idhs = data.entry[0].resource.id;
        } else {
          this.idhs = "Gagal Get IHS";
          this.toastr.error(
            "Silahkan Lengkapi NIK Pasein Agar dapat ID Satu Sehat Pasien",
            "SATU SEHAT ID PASIEN",
            {
              timeOut: 2000,
            }
          );
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

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
    this.modalService.dismissAll();
    this.jadwal = "";
    this.tjadwal = [];
    this.kliniks = "";
    this.dokter = "";
  }
  usia: any = "";
  cetaknoantrian() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/cetakantrian.php?kdcabang=" +
        this.kdcabang +
        "&notransaksi=" +
        this.pasienc,
      "_blank",
      "location=no,toolbar=no,height=570,width=500,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  batalpriksa(
    notransaksi,
    norm,
    kddokter,
    kdpoli,
    nokunjungan,
    noantrianbpjs,
    noasuransi,
    kdpolibpjs,
    tglPeriksa,
    status,
    dash,
    spcare
  ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    Swal.fire({
      title: "Batalkan Pendaftaran",
      text: "Alasan mengapa pendaftaran ingin dibatalkan?",
      input: "textarea",
      inputPlaceholder: "Alasan anda",
      confirmButtonText: "Ya, Batal Daftar",
      showDenyButton: true,
      denyButtonText: "Tidak",
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage("Wajib Diisi");
        } else {
          if (status === "SELESAI") {
            if (dash === "BPJS") {
              this.authService.deletekunjungan(nokunjungan).subscribe(
                (data) => {
                  console.log(data);

                  if (data.metaData.code == 200) {
                    let body = {
                      kdcabang: this.kdcabang,
                      notransaksi: notransaksi,
                      norm: norm,
                      kddokter: kddokter,
                      kdpoli: kdpoli,
                      kduser: this.username,
                      stssimpan: "1",
                    };

                    this.authService.hapustrx(body).subscribe((response) => {
                      this.tantrian = [];
                    });

                    this.toastr.success(data.response, "Sukses", {
                      timeOut: 2000,
                    });

                    let bodyFktp = {
                      tanggalperiksa: tglPeriksa,
                      kodepoli: kdpolibpjs,
                      nomorkartu: noasuransi,
                      alasan: value,
                    };
                    this.authService
                      .cancelBpjsAntrian(bodyFktp, this.slug)
                      .subscribe((data) => {
                        if (data.data.code == 200) {
                          this.toastr.success(data.data.message, "Sukses", {
                            timeOut: 2000,
                          });
                        } else {
                          this.toastr.error(data.data.message, "Error");
                        }
                      });
                  } else {
                    let body = {
                      kdcabang: this.kdcabang,
                      notransaksi: notransaksi,
                      norm: norm,
                      kddokter: kddokter,
                      kdpoli: kdpoli,
                      kduser: this.username,
                      stssimpan: "1",
                    };

                    this.authService.hapustrx(body).subscribe((response) => {
                      this.tantrian = [];
                    });

                    this.toastr.success(data.response, "Sukses", {
                      timeOut: 2000,
                    });

                    let bodyFktp = {
                      tanggalperiksa: tglPeriksa,
                      kodepoli: kdpolibpjs,
                      nomorkartu: noasuransi,
                      alasan: value,
                    };
                    this.authService
                      .cancelBpjsAntrian(bodyFktp, this.slug)
                      .subscribe((data) => {
                        if (data.data.code == 200) {
                          this.toastr.success(data.data.message, "Sukses", {
                            timeOut: 2000,
                          });
                        } else {
                          this.toastr.error(data.data.message, "Error");
                        }
                      });

                    // this.toastr.error(data.response[0].message, 'Sukses', {
                    //   timeOut: 2000,
                    // });
                  }
                },
                (Error) => {
                  console.log(Error);
                }
              );
            } else {
              let body = {
                kdcabang: this.kdcabang,
                notransaksi: notransaksi,
                norm: norm,
                kddokter: kddokter,
                kdpoli: kdpoli,
                kduser: this.username,
                stssimpan: "1",
              };

              this.authService.hapustrx(body).subscribe((response) => {
                this.tantrian = [];
              });
            }
          } else {
            if (dash === "BPJS") {
              if (spcare === "TERDAFTAR DI PCARE") {
                this.authService
                  .deletependaftaranpcare(
                    noasuransi,
                    "",
                    noantrianbpjs,
                    kdpolibpjs
                  )
                  .subscribe(
                    (data) => {
                      if (data.metaData.code == 200) {
                        let bodyFktp = {
                          tanggalperiksa: tglPeriksa,
                          kodepoli: kdpolibpjs,
                          nomorkartu: noasuransi,
                          alasan: value,
                        };
                        this.authService
                          .cancelBpjsAntrian(bodyFktp, this.slug)
                          .subscribe((data) => {
                            if (data.data.code == 200) {
                              this.toastr.success(data.data.message, "Sukses", {
                                timeOut: 2000,
                              });
                            } else {
                              this.toastr.error(data.data.message, "Error");
                            }
                          });

                        let body = {
                          kdcabang: this.kdcabang,
                          notransaksi: notransaksi,
                          norm: norm,
                          kddokter: kddokter,
                          kdpoli: kdpoli,
                          kduser: this.username,
                          stssimpan: "1",
                        };

                        this.authService
                          .hapustrx(body)
                          .subscribe((response) => {
                            this.tantrian = [];
                          });
                      } else {
                        let body = {
                          kdcabang: this.kdcabang,
                          notransaksi: notransaksi,
                          norm: norm,
                          kddokter: kddokter,
                          kdpoli: kdpoli,
                          kduser: this.username,
                          stssimpan: "1",
                        };

                        this.authService
                          .hapustrx(body)
                          .subscribe((response) => {
                            this.tantrian = [];
                          });

                        this.toastr.error(data.response.message, "Error");
                      }
                    },
                    (Error) => {
                      console.log(Error);
                    }
                  );
              } else {
                let bodyFktp = {
                  tanggalperiksa: tglPeriksa,
                  kodepoli: kdpolibpjs,
                  nomorkartu: noasuransi,
                  alasan: value,
                };
                this.authService
                  .cancelBpjsAntrian(bodyFktp, this.slug)
                  .subscribe((data) => {
                    if (data.data.code == 200) {
                      this.toastr.success(data.data.message, "Sukses", {
                        timeOut: 2000,
                      });
                    } else {
                      this.toastr.error(data.data.message, "Error");
                    }
                  });

                let body = {
                  kdcabang: this.kdcabang,
                  notransaksi: notransaksi,
                  norm: norm,
                  kddokter: kddokter,
                  kdpoli: kdpoli,
                  kduser: this.username,
                  stssimpan: "1",
                };

                this.authService.hapustrx(body).subscribe((response) => {
                  this.tantrian = [];
                });
              }
            } else {
              let body = {
                kdcabang: this.kdcabang,
                notransaksi: notransaksi,
                norm: norm,
                kddokter: kddokter,
                kdpoli: kdpoli,
                kduser: this.username,
                stssimpan: "1",
              };

              this.authService.hapustrx(body).subscribe((response) => {
                this.tantrian = [];
              });
            }
          }

          // Swal.fire({
          //   title: 'Mohon Tunggu!',
          //   allowEscapeKey: false,
          //   allowOutsideClick: false,
          //   showConfirmButton: false,
          //   timer: 2000,
          //   didOpen: () => {
          //     Swal.showLoading();
          //     let body = {
          //       "kdcabang": this.kdcabang, "notransaksi": notransaksi, "norm": norm,
          //       "kddokter": kddokter, "kdpoli": kdpoli, "kduser": this.username, "stssimpan": '1'
          //     }
          //     this.authService.hapustrx(body)
          //       .subscribe(response => {
          //         if (response) {
          //           this.toastr.success('' + response, '-', {
          //             timeOut: 2000,
          //           });
          //           setTimeout(() => {
          //             this.authService.pasienantrian(this.kdcabang, '2', this.pasienc, '', '')
          //               .subscribe(
          //                 data => {
          //                   this.tantrian = data;
          //                 },
          //                 Error => {
          //                   console.log(Error)
          //                 }
          //               )
          //           }, 200);
          //           if (this.dashx === 'BPJS') {
          //             this.toastr.success('Berhasil Hapus ,Untuk Di pCare Silahkan Hapus lewat Portal', '-', {
          //               timeOut: 2000,
          //             });
          //             this.authService.deletekunjungan(nokunjungan)
          //               .subscribe(
          //                 data => { },
          //                 Error => {

          //                   console.log(Error)
          //                 }
          //               )

          //               this.authService.deletependaftaranpcare(noasuransi,'',noantrianbpjs,kdpolibpjs)
          //               .subscribe(
          //                 data => {

          //                   this.toastr.error(data.response.message, 'Error');

          //                  },
          //                 Error => {
          //                   console.log(Error)
          //                 }
          //               )

          //               let bodyFktp = {"data":{
          //                 "tanggalperiksa": tglPeriksa,
          //                 "kodepoli": kdpolibpjs,
          //                 "nomorkartu": noasuransi,
          //                 "alasan": value
          //               }}
          //               this.authService.batal(bodyFktp).subscribe(
          //                 data => {

          //                   if(data.metadata.code == 200){

          //                     this.toastr.success(data.metadata.message, 'Sukses', {
          //                       timeOut: 2000,
          //                     });

          //                   }else{
          //                     this.toastr.error(data.metadata.message, 'Error');

          //                   }

          //                   // if(data.data.code == 200){

          //                   //   this.toastr.success(data.data.message, 'Sukses', {
          //                   //     timeOut: 2000,
          //                   //   });

          //                   // }else{
          //                   //   this.toastr.error(data.data.message, 'Error');

          //                   // }
          //                 }
          //               )

          //           } else { }
          //         } else {
          //           this.toastr.error('Simpan  Gagal', 'Eror');
          //         }
          //       }
          //       )

          //   }
          // }).then(
          //   () => { },
          //   (dismiss) => {

          //   }
          // )
        }
      },
    });
  }

  namabpjs: string;
  tglakhirberlaku: string;
  jeniskelas: string;
  jenispeserta: string;
  aktif: any;
  ketaktif: string;
  kdprovider: string = "";
  namaprovider: string;
  carinobpjs: string = "noka";

  pstProl: string;
  pstPrb: string;

  cekbpjsv(content, x) {
    if (this.pcare <= 0) {
      this.toastr.error("Belum Langganan Fitur Ini", "Eror");
    } else {
      this.kdpolibpjs = x.kdpolibpjs;
      this.noasuransi = x.noasuransi;

      this.authService.tmpbpjs(x.noasuransi, this.carinobpjs).subscribe(
        (data) => {
          if (data) {
            console.log(data.metaData.code);
            if (data.metaData.code == 200) {
              this.showloading = false;

              this.namabpjs = data.response.nama;
              this.tglakhirberlaku = data.response.tglAkhirBerlaku;
              this.jeniskelas = data.response.jnsKelas.nama;
              this.jenispeserta = data.response.jnsPeserta.nama;
              this.aktif = data.response.aktif;
              this.ketaktif = data.response.ketAktif;
              this.kdprovider = data.response.kdProviderPst.kdProvider;
              this.namaprovider = data.response.kdProviderPst.nmProvider;
              this.pstProl = data.response.pstProl;
              this.pstPrb = data.response.pstPrb;
            } else if (data.metaData.code == 204) {
              this.toastr.error("Kartu Tidak di temukan", "Eror");

              this.namabpjs = "";
              this.tglakhirberlaku = "";
              this.jeniskelas = "";
              this.jenispeserta = "";
              this.aktif = "";
              this.ketaktif = "";
              this.kdprovider = "";
              this.namaprovider = "";
              this.pstProl = "";
              this.pstPrb = "";

              this.showloading = false;
            } else {
              this.toastr.error(data.response.message, "Eror");
              this.showloading = false;
            }
          } else {
            this.toastr.error("Gagal Memuat Data BPJS", "Eror");
            this.showloading = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );

      this.authService
        .cekjadwal(x.kddokter, x.kdpoli, this.tglp)
        .subscribe((data) => {
          this.jadwal = data[0].jadwal;
        });

      let bodyAddFktp = {
        nomorkartu: x.noasuransi,
        nik: x.nopengenal,
        nohp: "082176678897",
        kodepoli: x.kdpolibpjs,
        namapoli: x.nampoli,
        norm: x.norm,
        tanggalperiksa: x.tglpriksa,
        kodedokter: parseInt(x.kddokterbpjs),
        namadokter: x.namdokter,
        jampraktek: this.jadwal,
        nomorantrean: x.kodeantrian + "-" + x.noantrian,
        angkaantrean: parseInt(x.noantrian),
        keterangan: "daftar",
      };

      console.log(bodyAddFktp);

      setTimeout(() => {
        if (x.dari === "OUT") {
          setTimeout(() => {
            let bodyAddFktp = {
              nomorkartu: x.noasuransi,
              nik: x.nopengenal,
              nohp: "082176678897",
              kodepoli: x.kdpolibpjs,
              namapoli: x.nampoli,
              norm: x.norm,
              tanggalperiksa: x.tglpriksa,
              kodedokter: parseInt(x.kddokterbpjs),
              namadokter: x.namdokter,
              jampraktek: this.jadwal,
              nomorantrean: x.kodeantrian + "-" + x.noantrian,
              angkaantrean: parseInt(x.noantrian),
              keterangan: "daftar",
            };

            console.log(bodyAddFktp);
            this.authService
              .addBpjsAntrian(bodyAddFktp, this.slug)
              .subscribe((response) => {
                if (response.data.code == 200) {
                  this.toastr.success(response.data.message, "Sukses", {
                    timeOut: 2000,
                  });

                  this.showloadss = false;
                } else {
                  this.showloadss = false;
                  this.toastr.error(response.data.message, "-");
                }
              });
          }, 500);
        }

        this.caribynikandno("noka");

        this.modalService.open(content, {});
      }, 250);
    }
  }

  cekbpjsk(a) {
    if (this.dash === "BPJS") {
      if (this.pcare <= 0) {
        this.toastr.error("Anda Belum Langganan Fitur ini", "Eror");
      } else {
        if (this.noasuransi.length <= 5) {
          this.toastr.error("Silahkan Isi No Kartu BPJS", "Eror");
        } else {
          this.authService.tmpbpjs(this.noasuransi, this.carinobpjs).subscribe(
            (data) => {
              if (data) {
                console.log(data.metaData.code);
                if (data.metaData.code == 200) {
                  this.namabpjs = data.response.nama;
                  this.tglakhirberlaku = data.response.tglAkhirBerlaku;
                  this.jeniskelas = data.response.jnsKelas.nama;
                  this.jenispeserta = data.response.jnsPeserta.nama;
                  this.aktif = data.response.aktif;
                  this.ketaktif = data.response.ketAktif;
                  this.kdprovider = data.response.kdProviderPst.kdProvider;
                  this.namaprovider = data.response.kdProviderPst.nmProvider;

                  if (this.aktif == true) {
                  } else {
                    this.toastr.error(
                      "NOMOR PESERTA : " + this.ketaktif,
                      "Eror"
                    );
                  }
                } else if (data.metaData.code == 204) {
                  this.toastr.error("Kartu Tidak di temukan", "Eror");

                  this.namabpjs = "";
                  this.tglakhirberlaku = "";
                  this.jeniskelas = "";
                  this.jenispeserta = "";
                  this.aktif = "";
                  this.ketaktif = "";
                  this.kdprovider = "";
                  this.namaprovider = "";

                  this.showloading = false;
                } else {
                  this.toastr.error(data.response.message, "Eror");
                  this.showloading = false;
                }
              } else {
                this.toastr.error("Gagal Memuat Data BPJS", "Eror");
                this.showloading = false;
              }
            },
            (Error) => {
              console.log(Error);
            }
          );
        }
      }
    }
  }
  cekbpjs(content) {
    if (this.pcare <= 0) {
      this.toastr.error("Anda Belum Langganan Fitur ini", "Eror");
    } else {
      if (this.noasuransi.length <= 5) {
        this.toastr.error("Silahkan Isi No Kartu BPJS", "Eror");
      } else {
        this.showloading = true;

        this.modalService.open(content, {});

        this.authService.tmpbpjs(this.noasuransi, this.carinobpjs).subscribe(
          (data) => {
            if (data) {
              console.log(data.metaData.code);
              if (data.metaData.code == 200) {
                this.showloading = false;

                this.namabpjs = data.response.nama;
                this.tglakhirberlaku = data.response.tglAkhirBerlaku;
                this.jeniskelas = data.response.jnsKelas.nama;
                this.jenispeserta = data.response.jnsPeserta.nama;
                this.aktif = data.response.aktif;
                this.ketaktif = data.response.ketAktif;
                this.kdprovider = data.response.kdProviderPst.kdProvider;
                this.namaprovider = data.response.kdProviderPst.nmProvider;
              } else if (data.metaData.code == 204) {
                this.toastr.error("Kartu Tidak di temukan", "Eror");

                this.namabpjs = "";
                this.tglakhirberlaku = "";
                this.jeniskelas = "";
                this.jenispeserta = "";
                this.aktif = "";
                this.ketaktif = "";
                this.kdprovider = "";
                this.namaprovider = "";

                this.showloading = false;
              } else {
                this.toastr.error(data.response.message, "Eror");
                this.showloading = false;
              }
            } else {
              this.toastr.error("Gagal Memuat Data BPJS", "Eror");
              this.showloading = false;
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
      }
    }
  }

  caribynikandno(a: any) {
    if (a === "noka") {
      this.authService.tmpbpjs(this.noasuransi, this.carinobpjs).subscribe(
        (data) => {
          if (data) {
            console.log(data.metaData.code);
            if (data.metaData.code == 200) {
              this.showloading = false;

              this.namabpjs = data.response.nama;
              this.tglakhirberlaku = data.response.tglAkhirBerlaku;
              this.jeniskelas = data.response.jnsKelas.nama;
              this.jenispeserta = data.response.jnsPeserta.nama;
              this.aktif = data.response.aktif;
              this.ketaktif = data.response.ketAktif;
              this.kdprovider = data.response.kdProviderPst.kdProvider;
              this.namaprovider = data.response.kdProviderPst.nmProvider;
            } else if (data.metaData.code == 204) {
              this.toastr.error("Kartu Tidak di temukan", "Eror");

              this.namabpjs = "";
              this.tglakhirberlaku = "";
              this.jeniskelas = "";
              this.jenispeserta = "";
              this.aktif = "";
              this.ketaktif = "";
              this.kdprovider = "";
              this.namaprovider = "";

              this.showloading = false;
            } else {
              this.toastr.error(data.response.message, "Eror");
              this.showloading = false;
            }
          } else {
            this.toastr.error("Gagal Memuat Data BPJS", "Eror");
            this.showloading = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else {
      this.authService.tmpbpjs(this.noindetitas, this.carinobpjs).subscribe(
        (data) => {
          if (data) {
            console.log(data.metaData.code);
            if (data.metaData.code == 200) {
              this.showloading = false;

              this.namabpjs = data.response.nama;
              this.tglakhirberlaku = data.response.tglAkhirBerlaku;
              this.jeniskelas = data.response.jnsKelas.nama;
              this.jenispeserta = data.response.jnsPeserta.nama;
              this.aktif = data.response.aktif;
              this.ketaktif = data.response.ketAktif;
              this.kdprovider = data.response.kdProviderPst.kdProvider;
              this.namaprovider = data.response.kdProviderPst.nmProvider;
            } else if (data.metaData.code == 204) {
              this.toastr.error("Kartu Tidak di temukan", "Eror");

              this.namabpjs = "";
              this.tglakhirberlaku = "";
              this.jeniskelas = "";
              this.jenispeserta = "";
              this.aktif = "";
              this.ketaktif = "";
              this.kdprovider = "";
              this.namaprovider = "";

              this.showloading = false;
            } else {
              this.toastr.error(data.response.message, "Eror");
              this.showloading = false;
            }
          } else {
            this.toastr.error("Gagal Memuat Data BPJS", "Eror");
            this.showloading = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    }
  }

  currentTAntrian: any = null;
  daftarbpjs(content, obj: any) {
    if (this.pcare <= 0) {
      this.toastr.error("Belum Langganan Fitur Ini", "Eror");
    } else {
      if (this.tantrian[0].dari === "OUT") {
        setTimeout(() => {
          let bodyAddFktp = {
            nomorkartu: this.tantrian[0].noasuransi,
            nik: this.tantrian[0].nopengenal,
            nohp: "082176678897",
            kodepoli: this.kdpolibpjs,
            namapoli: this.tantrian[0].nampoli,
            norm: this.tantrian[0].norm,
            tanggalperiksa: this.tantrian[0].tglpriksa,
            kodedokter: parseInt(this.tantrian[0].kddokterbpjs),
            namadokter: this.tantrian[0].namdokter,
            jampraktek: this.jadwal,
            nomorantrean:
              this.tantrian[0].kodeantrian + "-" + this.tantrian[0].noantrian,
            angkaantrean: parseInt(this.tantrian[0].noantrian),
            keterangan: "daftar",
          };

          console.log(bodyAddFktp);
          this.authService
            .addBpjsAntrian(bodyAddFktp, this.slug)
            .subscribe((response) => {
              if (response.data.code == 200) {
                this.toastr.success(response.data.message, "Sukses", {
                  timeOut: 2000,
                });

                this.showloadss = false;
              } else {
                this.showloadss = false;
                this.toastr.error(response.data.message, "-");
              }
            });
        }, 500);
      } else {
        setTimeout(() => {
          let bodypanggil = {
            tanggalperiksa: this.tantrian[0].tglpriksa,
            kodepoli: this.kdpolibpjs,
            nomorkartu: this.tantrian[0].noasuransi,
            status: 1,
          };

          this.authService
            .PanggilBpjsAntrian(bodypanggil, this.slug)
            .subscribe((response) => {
              if (response.data.code == 200) {
                let bodyeditfarmasiterkirimv = {
                  stssimpan: "4",
                  notransaksi: this.pasienc,
                };

                setTimeout(() => {
                  this.authService
                    .editobatsk(bodyeditfarmasiterkirimv)
                    .subscribe((response) => {
                      console.log(response);
                    });
                }, 250);

                this.toastr.success(response.data.message, "Sukses", {
                  timeOut: 2000,
                });
              } else {
                this.toastr.error(response.metadata.message, "Error");
              }
            });
        }, 250);
      }

      this.caribynikandno("noka");

      this.authService
        .cekjadwal(
          this.tantrian[0].kddokter,
          this.tantrian[0].kdpoli,
          this.tantrian[0].tglpriksa
        )
        .subscribe((data) => {
          this.jadwal = data[0].jadwal;
        });

      this.modalService.open(content, {});
    }
  }

  kdtkp: any;
  keluhanbpjs: string = "";
  sudahpcare: string;
  minx: any;
  jeniskun: any = true;

  kirimantrean() {
    this.authService
      .cekjadwal(
        this.tantrian[0].kddokter,
        this.tantrian[0].kdpoli,
        this.tantrian[0].tglpriksa
      )
      .subscribe((data) => {
        this.jadwal = data[0].jadwal;
      });

    this.showloadss = true;

    setTimeout(() => {
      let bodyAddFktp = {
        nomorkartu: this.tantrian[0].noasuransi,
        nik: this.tantrian[0].nopengenal,
        nohp: "082176678897",
        kodepoli: this.kdpolibpjs,
        namapoli: this.tantrian[0].nampoli,
        norm: this.tantrian[0].norm,
        tanggalperiksa: this.tantrian[0].tglpriksa,
        kodedokter: parseInt(this.tantrian[0].kddokterbpjs),
        namadokter: this.tantrian[0].namdokter,
        jampraktek: this.jadwal,
        nomorantrean:
          this.tantrian[0].kodeantrian + "-" + this.tantrian[0].noantrian,
        angkaantrean: parseInt(this.tantrian[0].noantrian),
        keterangan: "daftar",
      };

      this.authService
        .addBpjsAntrian(bodyAddFktp, this.slug)
        .subscribe((response) => {
          if (response.data.code == 200) {
            this.toastr.success(response.data.message, "Sukses", {
              timeOut: 2000,
            });

            this.showloadss = false;
          } else {
            this.toastr.error(response.data.message, "-");
            this.showloadss = false;
          }
        });
    }, 500);
  }

  kirimpcarev2() {
    if (this.kdprovider === "3") {
      this.toastr.error(
        "Kode Provider Kosong Tidak Bisa Melalui Bridging",
        "Eror"
      );
    } else {
      this.showloading = true;

      let body = {
        data: {
          kdProviderPeserta: this.kdprovider,
          tglDaftar: this.datepipe.transform(this.tglp, "dd-MM-yyyy"),
          noKartu: this.noasuransi,
          kdPoli: this.kdpolibpjs,
          keluhan: this.keluhanbpjs,
          kunjSakit: this.jeniskun,
          sistole: 0,
          diastole: 0,
          beratBadan: 0,
          tinggiBadan: 0,
          respRate: 0,
          lingkarPerut: 0,
          heartRate: 0,
          rujukBalik: 0,
          kdTkp: this.kdtkp,
        },
      };

      console.log(body);

      this.authService.simpanpcaredaftarv1(body).subscribe((response) => {
        if (response) {
          if (response.metaData.code == 201) {
            this.toastr.success("Berhasil Kirim PCare", "-", {
              timeOut: 2000,
            });

            this.sudahpcare = "Berhasil Kirim PCare";

            this.showloading = false;

            let body = {
              notransaksi: this.pasienc,
              stssimpan: "1",
              noantrian: response.response.message,
              kdtkp: this.kdtkp,
              jeniskun: this.jeniskun,
            };

            this.authService.updatepcare(body).subscribe((response) => {});

            // this.showloadss = true;

            this.modalService.dismissAll();
          } else if (response.metaData.code == 412) {
            this.toastr.error(
              response.response.field + response.response.message,
              "Eror"
            );

            this.showloading = false;
          } else {
            this.toastr.error(response.metaData.message, "Eror");

            this.showloading = false;
          }
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");

          this.showloading = false;
        }
      });
    }
  }
  kirimpcare() {
    // let currentTAntrian = this.currentTAntrian

    if (this.kdprovider === "3") {
      this.toastr.error(
        "Kode Provider Kosong Tidak Bisa Melalui Bridging",
        "Eror"
      );
    } else {
      this.showloading = true;

      let body = {
        data: {
          kdProviderPeserta: this.kdprovider,
          tglDaftar: this.minbpjs,
          noKartu: this.noasuransi,
          kdPoli: this.kdpolibpjs,
          keluhan: this.keluhanbpjs,
          kunjSakit: this.jeniskun,
          sistole: 0,
          diastole: 0,
          beratBadan: 0,
          tinggiBadan: 0,
          respRate: 0,
          lingkarPerut: 0,
          heartRate: 0,
          rujukBalik: 0,
          kdTkp: this.kdtkp,
        },
      };

      this.authService.simpanpcaredaftar(body).subscribe((response) => {
        if (response) {
          if (response.metaData.code == 201) {
            this.toastr.success("Berhasil Kirim PCare", "-", {
              timeOut: 2000,
            });

            this.sudahpcare = "Berhasil Kirim PCare";

            this.showloading = false;

            let body = {
              notransaksi: this.pasienc,
              stssimpan: "1",
              noantrian: response.response.message,
              kdtkp: this.kdtkp,
              jeniskun: this.jeniskun,
            };

            this.authService.updatepcare(body).subscribe((response) => {});

            // this.showloadss = true;

            this.modalService.dismissAll();
          } else if (response.metaData.code == 412) {
            this.toastr.error(
              response.response.field + response.response.message,
              "Eror"
            );

            this.showloading = false;
          } else {
            this.toastr.error(response.metaData.message, "Eror");

            this.showloading = false;
          }
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");

          this.showloading = false;
        }
      });
    }
  }

  polibpjs: any;

  cekpcare(content, nourut) {
    this.modalService.open(content, {});

    this.showloading = true;
    this.authService
      .ceklistdaftarpcare(this.noantrianbpjs, this.minbpjs)
      .subscribe(
        (data) => {
          if (data) {
            console.log(data.metaData.code);
            if (data.metaData.code == 200) {
              this.showloading = false;

              this.namabpjs = data.response.peserta.nama;
              this.polibpjs = data.response.poli.nmPoli;
            } else {
              this.toastr.error("Gagal Memuat Data BPJS", "Eror");
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
  lihatprov() {
    this.authService
      .getpendaftaranprovider(this.tglpp, this.nourut)
      .subscribe((data) => {
        if (data.metaData.code == 200) {
          this.tlistprovider = data.response.list;
        } else {
          this.toastr.error(data.metaData.message, "Eror");
          this.tlistprovider = [];
        }
      });
  }

  tlistprovider: any;
  nourut: any = "15";
  pilihnourut(a) {
    this.cekprv(a);
  }
  cekprv(a) {
    this.authService
      .getpendaftaranprovider(
        this.datepipe.transform(a, "dd-MM-yyyy"),
        this.nourut
      )
      .subscribe((data) => {
        if (data.metaData.code == 200) {
          this.tlistprovider = data.response.list;
        } else {
          this.toastr.error(data.metaData.message, "Eror");
          this.tlistprovider = [];
        }
      });
  }
  tbynourut: any = "";
  pasienbayangan: any = "";
  polibayangan: any = "";
  keluhan: any = "";
  noasuransibayangan: any = "";

  lihatbynourut(a: any) {
    console.log(a.target.value);
    this.authService
      .pendaftaranbynourut(this.tglpp, a.target.value)
      .subscribe((data) => {
        if (data.metaData.code == 200) {
          this.pasienbayangan = data.response.peserta.nama;
          this.polibayangan = data.response.poli.nmPoli;
          this.keluhan = data.response.keluhan;
          this.noasuransibayangan = data.response.peserta.noKartu;
          this.tbynourut = data.response.noUrut;
        } else {
          this.toastr.error(data.metaData.message, "Eror");
          this.pasienbayangan = "";

          this.polibayangan = "";
          this.keluhan = "";
          this.noasuransibayangan = "";
          this.tbynourut = "";
        }
      });
  }

  statussimpan: any = "1";
  jk: any;
  nourutbpjs: any;

  pilihpasienbyprovider(a, b) {
    this.statussimpan = "2";
    this.noantrianbpjs = b;

    this.authService.tmpbpjs(a, this.carinobpjs).subscribe(
      (data) => {
        if (data) {
          console.log(data.metaData.code);
          if (data.metaData.code == 200) {
            this.showloading = false;

            this.pasienin = data.response.nama;
            this.namabpjs = data.response.nama;
            this.tglakhirberlaku = data.response.tglAkhirBerlaku;
            this.jeniskelas = data.response.jnsKelas.nama;
            this.jenispeserta = data.response.jnsPeserta.nama;
            this.aktif = data.response.aktif;
            this.ketaktif = data.response.ketAktif;
            this.kdprovider = data.response.kdProviderPst.kdProvider;
            this.namaprovider = data.response.kdProviderPst.nmProvider;

            this.jk = data.response.sex;
            this.tgllahir = data.response.tglLahir;
            this.noindetitas = data.response.noKTP;
            this.hp = data.response.noHP;
            this.noasuransi = a;
          } else if (data.metaData.code == 204) {
            this.toastr.error("Kartu Tidak di temukan", "Eror");

            this.namabpjs = "";
            this.tglakhirberlaku = "";
            this.jeniskelas = "";
            this.jenispeserta = "";
            this.aktif = "";
            this.ketaktif = "";
            this.kdprovider = "";
            this.namaprovider = "";

            this.showloading = false;
          } else {
            this.toastr.error(data.response.message, "Eror");
            this.showloading = false;
          }
        } else {
          this.toastr.error("Gagal Memuat Data BPJS", "Eror");
          this.showloading = false;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tpasientgl: any;

  cekpasientgl(a) {
    this.authService
      .pasienrm(this.kdcabang, "1", "", "21", this.tglp, this.tglp)
      .subscribe((data) => {
        this.tpasientgl = data;
      });
  }
  carinamapasien(a) {
    this.authService
      .pasienrm(this.kdcabang, "1", a.target.value, "21", this.tglp, this.tglp)
      .subscribe((data) => {
        this.tpasientgl = data;
      });
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
}
