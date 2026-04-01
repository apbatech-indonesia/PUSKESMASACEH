import { Component, OnInit, OnDestroy } from "@angular/core";
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
import { FarmasijualService } from "../kasirfarmasijual/farmasijual.service";

import { ActivatedRoute, Router } from "@angular/router";
import { WebsocketService } from "src/app/services";
import { NOTIFICATION_CHANNELS } from "src/app/constants/notification-channels";
import { EchoService } from "src/app/services/echo.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-ermdokterrm",
  templateUrl: "./ermdokterrm.component.html",
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
export class ermdokterrmComponent implements OnInit, OnDestroy {
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
  sortValue: any = null;
  filterPoli: any = null;
  tklinik: any;
  echoUnsub: any;
  hasilLabCount: number;
  permintaanLabCount: number;

  constructor(
    public FarmasijualService: FarmasijualService,
    private router: Router,
    private chatService: ChatService,
    private notificationService: NotificationService,
    private websocketService: WebsocketService,
    private echoService: EchoService,
    private datepipe: DatePipe,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
    this.tmppuser();
    this.tmptotal();
    this.initEchoNotifications();
    this.startLabNotifications();

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
  totalpass: number = 0;
  totalpassbelum: number = 0;
  totalpasssudah: number = 0;
  tampilpas: any;
  ktglrad() {
    this.tmptotal();
  }
  tmptotal() {
    this.authService
      .pasienrm(this.kdcabang, "1", "", "2", this.tglpx, this.tglpxs)
      .subscribe(
        (data) => {
          this.totalpass = data.length;
          this.tampilpas = data;
        },
        (Error) => {
          console.log(Error);
        },
      );

    this.authService
      .pasienrm(this.kdcabang, "0", "", "1", this.tglpx, this.tglpxs)
      .subscribe(
        (data) => {
          console.log("pasien blm", data.length);
          this.totalpassbelum = data.length;
        },
        (Error) => {
          console.log(Error);
        },
      );

    this.authService
      .pasienrm(this.kdcabang, "1", "", "1", this.tglpx, this.tglpxs)
      .subscribe(
        (data) => {
          console.log("pasien sudah", data.length);
          this.totalpasssudah = data.length;
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
          /*
          this.websocketService
            .callQueueForCabang(this.kdcabang, {
              prefix: kodeantrian,
              number: a,
              pasien: pasien.toLowerCase(),
              poli: nampoli,
              channel: this.kdcabang,
            })
            .subscribe();
          */

          this.notificationService
            .pushNotification(this.kdcabang, NOTIFICATION_CHANNELS.ANTRIAN, {
              antrian: {
                name: pasien.toLowerCase(),
                antrian: `${kodeantrian}${a}`,
                poli: nampoli,
              },
            })
            .subscribe(
              () => {},
              (err) => console.warn("pushNotification failed", err),
            );
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

  onSortChange(): void {
    if (this.sortValue) {
      const [orderby, order] = this.sortValue.split(":");
      this.authService
        .pasienrm(
          this.kdcabang,
          "1",
          "",
          "2",
          this.tglpx,
          this.tglpxs,
          orderby,
          order,
        )
        .subscribe(
          (data) => {
            this.tampilpas = data;
          },
          (Error) => {
            console.log(Error);
          },
        );
    } else {
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
  }

  onFilterPoli(): void {
    if (this.filterPoli) {
      this.authService
        .pasienrm(
          this.kdcabang,
          "1",
          "",
          "2",
          this.tglpx,
          this.tglpxs,
          "",
          "",
          this.filterPoli,
        )
        .subscribe(
          (data) => {
            this.tampilpas = data;
          },
          (Error) => {
            console.log(Error);
          },
        );
    } else {
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
  }

  tmppuser() {
    this.authService.poliByStatussakit(this.kdcabang).subscribe(
      (data) => {
        this.tklinik = data;
        console.log(this.tklinik);
      },
      (Error) => {
        console.log(Error);
      },
    );
  }

  private notifcenter(kddokter) {
    let audio1 = new Audio("https://knm.clenicapp.com/clenic/sound/notify.wav");
    let audio2 = new Audio();

    if (kddokter === "Laborat") {
      this.toastr.success("Permintaan Laborat Baru");
      audio2.src = "https://knm.clenicapp.com/clenic/sound/permintaan-lab.wav";
    }

    if (kddokter === "Hasil Laborat") {
      this.toastr.success("Hasil Laborat Baru");
      audio2.src = "https://knm.clenicapp.com/clenic/sound/hasil-lab.wav";
    }

    audio1.onended = () => {
      try {
        audio2.currentTime = 0;
        audio2.play().catch((e) => console.warn("audio2 play failed", e));
      } catch (e) {
        console.warn("audio2 play error", e);
      }
    };

    audio1.play().catch((e) => console.warn("audio1 play failed", e));
  }

  private requestPermission() {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  }

  private initEchoNotifications() {
    this.requestPermission();
    try {
      this.echoService.init({
        broadcaster: "reverb",
        key: "tal3xzzkbakc0vjnidjhasdasd",
        wsHost: "websocket.clenicapp.com",
        wsPort: 80,
        wssPort: 443,
        forceTLS: true,
        enabledTransports: ["ws", "wss"],
      });

      // Subscribe to dedicated lab channels instead of a generic notification
      // so we can avoid branching on payload titles.
      this.echoUnsub = [] as any[];

      const subLab = this.echoService.subscribe(
        `${this.kdcabang}.${NOTIFICATION_CHANNELS.PERMINTAAN_LAB}`,
        "NotificationSent",
        (payload: any) => {
          try {
            this.notifcenter("Laborat");
          } catch (e) {
            console.warn("Error handling laborat event", e);
          }
        },
      );
      this.echoUnsub.push(subLab);

      const subHasil = this.echoService.subscribe(
        `${this.kdcabang}.${NOTIFICATION_CHANNELS.HASIL_LAB}`,
        "NotificationSent",
        (payload: any) => {
          try {
            this.notifcenter("Hasil Laborat");
          } catch (e) {
            console.warn("Error handling hasil-laborat event", e);
          }
        },
      );
      this.echoUnsub.push(subHasil);
      console.log("EchoService initialized for kasirlab");
    } catch (err) {
      console.warn("Failed to init local EchoService", err);
    }
  }

  private startLabNotifications(): void {
    this.requestPermission();
    try {
      const dataRaw = localStorage.getItem("userDatacl");
      if (!dataRaw) return;
      const data = JSON.parse(dataRaw);
      const cabang = data?.userData?.kdcabang || this.kdcabang;

      this.notificationService
        .start(cabang, NOTIFICATION_CHANNELS.PERMINTAAN_LAB, {
          audio: "https://knm.clenicapp.com/clenic/sound/permintaan-lab.wav",
          title: "Permintaan Laborat",
          body: "Permintaan Laborat Baru.",
          repeat: false,
        })
        .subscribe((count: number) => {
          try {
            this.permintaanLabCount = count;
          } catch (e) {
            console.warn("Error handling permintaan-lab notification", e);
          }
        });

      this.notificationService
        .start(cabang, NOTIFICATION_CHANNELS.HASIL_LAB, {
          audio: "https://knm.clenicapp.com/clenic/sound/hasil-lab.wav",
          title: "Hasil Laborat",
          body: "Hasil Laborat Baru.",
          repeat: false,
        })
        .subscribe((count: number) => {
          try {
            this.hasilLabCount = count;
          } catch (e) {
            console.warn("Error handling hasil-lab notification", e);
          }
        });
    } catch (e) {
      console.warn("Failed to start lab notifications", e);
    }
  }

  ngOnDestroy() {
    try {
      if (this.echoUnsub) {
        if (Array.isArray(this.echoUnsub)) {
          this.echoUnsub.forEach((u: any) => {
            try {
              if (typeof u === "function") {
                u();
              } else if (u && u.unsubscribe) {
                u.unsubscribe();
              }
            } catch (e) {
              console.warn("Error unsubscribing", e);
            }
          });
        } else {
          if (typeof this.echoUnsub === "function") {
            this.echoUnsub();
          } else if (this.echoUnsub.unsubscribe) {
            this.echoUnsub.unsubscribe();
          }
        }
      }
    } catch (e) {
      console.warn("Error during ngOnDestroy cleanup", e);
    }

    try {
      const dataRaw = localStorage.getItem("userDatacl");
      const data = dataRaw ? JSON.parse(dataRaw) : null;
      const cabang = data?.userData?.kdcabang || this.kdcabang;
      this.notificationService.stop(
        cabang,
        NOTIFICATION_CHANNELS.PERMINTAAN_LAB,
      );
      this.notificationService.stop(cabang, NOTIFICATION_CHANNELS.HASIL_LAB);
    } catch (e) {
      console.warn("Failed to stop lab notifications", e);
    }
  }
}
