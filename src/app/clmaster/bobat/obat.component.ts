import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgModule,
} from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";

import { DatePipe } from "@angular/common";
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgForm,
  FormControl,
} from "@angular/forms";

import { ApiserviceService } from "src/app/apiservice.service";
import { ToastrService } from "ngx-toastr";

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import Swal from "sweetalert2";

enum OBAT_CLICK_EVENT {
  GET,
  ADD,
  EDIT,
  DELETE,
  DETAIL,
}

interface DetailObat {
  kdObat: string;
  nmObat: string;
  sedia: number;
}

interface Obat {
  kdObatSK: number;
  kdRacikan: string;
  obat: DetailObat;
  signa1: number;
  signa2: number;
  jmlObat: number;
  jmlHari: number;
  kekuatan: number;
  jmlPermintaan: number;
  jmlObatRacikan: number;
}

@Component({
  selector: "app-berita",
  templateUrl: "./obat.component.html",
  styleUrls: ["./obat.component.css"],
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
export class obatComponent implements OnInit {
  addObatForm: FormGroup;

  duration: any = 20000;
  panelOpenState: boolean = false;

  codeOfMCU: string = "";
  dateOfKunjungan: string = "";

  addDialogTitle: string = "Tambah Obat";
  addDialogContent: string = "Isi form berikut dengan data yang benar";
  addDialogButtonLabel: string = "Tambah";
  addDialogNegativeLabel: string = "Tidak Yakin";
  addDialogPositiveLabel: string = "Yakin";

  confirmDialogTitle: string = "Apakah Yakin?";
  confirmDialogContent: string = "Pastikan data yang dimasukkan sudah benar";
  confirmDialogButtonLabel: string = "Tambah";
  confirmDialogNegativeButtonLabel: string = "Tidak Yakin";
  confirmDialogPositiveButtonLabel: string = "Yakin";

  // selectedMCU: MCU = null
  selectedNoTransaksi: string = "";
  selectedNoKunjungan: string = "";

  failedMsg: string = "Mohon maaf proses gagal!";
  successMsg: string = "Selamat proses berhasil dijalankan!";

  isDetailDialogShow: boolean = false;

  pipe = new DatePipe("en-US");
  currentDate: any;

  currentClickEvent: OBAT_CLICK_EVENT = OBAT_CLICK_EVENT.ADD;

  listOfPasien: object[] = [];
  listOfObat: Obat[] = [];
  testDataArray: string[] = [];

  constructor(
    private fb: FormBuilder,
    private config: PrimeNGConfig,
    private authService: ApiserviceService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentDate = this.pipe.transform(Date.now(), "yyyy-MM-dd");
    this.dateOfKunjungan = this.currentDate;
    this.addObatForm = this.fb.group({
      valueOfTindakanSK: ["", Validators.required],
      valueOfTindakan: ["", Validators.required],
      valueOfKunjungan: ["", Validators.required],
      valueOfKeterangan: ["", Validators.required],
      amountOfBiaya: ["", Validators.required],
      amountOfhasil: ["", Validators.required],
    });

    this.getAllDataPasien();
  }

  clickEvent(event: OBAT_CLICK_EVENT) {
    switch (event) {
      case OBAT_CLICK_EVENT.GET: {
        this.getAllObatByNoKunjungan(this.selectedNoKunjungan);
        break;
      }
      case OBAT_CLICK_EVENT.ADD: {
        this.onSubmitData();
        break;
      }
      case OBAT_CLICK_EVENT.EDIT: {
        break;
      }
      case OBAT_CLICK_EVENT.DELETE: {
        this.onDeleteItem();
        break;
      }
      default: {
        break;
      }
    }
  }

  showAddDialog() {
    let addDialog: HTMLDialogElement | null = document.getElementById(
      "addDialog"
    ) as HTMLDialogElement;
    let confirmDialog: HTMLDialogElement | null = document.getElementById(
      "confirmDialog"
    ) as HTMLDialogElement;
    if (addDialog) {
      addDialog.showModal();
      document.querySelectorAll("#save").forEach((button: Element) => {
        button.addEventListener("click", (e: MouseEvent) => {
          addDialog.close();
          if (confirmDialog) {
            confirmDialog.showModal();
            document.querySelectorAll("#sure").forEach((button: Element) => {
              button.addEventListener("click", (e: MouseEvent) => {
                confirmDialog.close();
                Swal.fire({
                  title: "Mohon Tunggu!",
                  allowEscapeKey: false,
                  allowOutsideClick: false,
                  timer: 2000,
                  didOpen: () => {
                    addDialog.close();
                    this.clickEvent(OBAT_CLICK_EVENT.ADD);
                    Swal.showLoading();
                  },
                }).then(
                  () => {},
                  (dismiss) => {
                    location.reload();
                  }
                );
              });
            });

            document.querySelectorAll("#notSure").forEach((button: Element) => {
              button.addEventListener("click", (e: MouseEvent) => {
                confirmDialog.close();
                if (addDialog) addDialog.showModal();
              });
            });
          }
        });
      });
    }
  }

  showingConfirmDialog() {
    let confirmDialog: HTMLDialogElement | null = document.getElementById(
      "confirmDialog"
    ) as HTMLDialogElement;
    let addDialog: HTMLDialogElement | null = document.getElementById(
      "addDialog"
    ) as HTMLDialogElement;
    if (confirmDialog) {
      confirmDialog.showModal();
      document.querySelectorAll("#sure").forEach((button: Element) => {
        button.addEventListener("click", (e: MouseEvent) => {
          confirmDialog.close();
          Swal.fire({
            title: "Mohon Tunggu!",
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 2000,
            didOpen: () => {
              addDialog.close();
              this.clickEvent(OBAT_CLICK_EVENT.ADD);
              Swal.showLoading();
            },
          }).then(
            () => {},
            (dismiss) => {
              location.reload();
            }
          );
        });
      });

      document.querySelectorAll("#notSure").forEach((button: Element) => {
        button.addEventListener("click", (e: MouseEvent) => {
          confirmDialog.close();
          if (addDialog) addDialog.showModal();
        });
      });
    }
  }

  getAllDataPasien() {
    let pasienDialog: HTMLDialogElement | null = document.getElementById(
      "pasienDialog"
    ) as HTMLDialogElement;
    let successDialog: HTMLDialogElement | null = document.getElementById(
      "successDialog"
    ) as HTMLDialogElement;
    let failedDialog: HTMLDialogElement | null = document.getElementById(
      "failedDialog"
    ) as HTMLDialogElement;
    this.authService.getBpjsMCUAllPasien().subscribe((data: any) => {
      if (!data.success) {
        this.failedMsg = data["message"];
        if (failedDialog) {
          failedDialog.showModal();
          document.querySelectorAll("#close").forEach((button: Element) => {
            button.addEventListener("click", (e: MouseEvent) => {
              failedDialog.close();
            });
          });
        }
      } else {
        let dataRes = data.data;
        this.listOfPasien = [];

        let convertedArray = dataRes.map((item) => {
          return {
            noTransaksi: item.notransaksi,
            noKunjungan: item.nokunjungan,
            noRM: item.norm,
            pasien: item.pasien,
            namaPoli: item.nampoli,
            tglPeriksa: item.tglpriksa,
          };
        });
        this.listOfPasien = convertedArray;
        if (pasienDialog) pasienDialog.showModal();
      }
    });
  }

  selectedPasien(noTransaksi: string = "", noKunjungan: string = "") {
    let pasienDialog: HTMLDialogElement | null = document.getElementById(
      "pasienDialog"
    ) as HTMLDialogElement;
    this.selectedNoTransaksi = noTransaksi;
    this.selectedNoKunjungan = noKunjungan;
    if (pasienDialog) pasienDialog.close();
    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        this.getAllObatByNoKunjungan(noKunjungan);
        Swal.showLoading();
      },
    }).then(
      () => {},
      (dismiss) => {
        location.reload();
      }
    );
  }

  getAllObatByNoKunjungan(noKunjungan: string = "") {
    this.authService.getBpjsAllObat(noKunjungan).subscribe((data: any) => {
      if (!data.success) {
        this.failedMsg = data["message"];
      } else {
        let dataRes = data.data.list;
        this.listOfObat = [];
        let mapResep = dataRes.map((parent) => ({
          ...parent,
          obat: parent.obat,
        }));
        this.listOfObat = mapResep;
        console.log("Test : " + JSON.stringify(this.listOfObat));
      }
    });
  }

  onSubmitData() {
    let addMCUDialog: HTMLDialogElement | null = document.getElementById(
      "dialog"
    ) as HTMLDialogElement;
    let successDialog: HTMLDialogElement | null = document.getElementById(
      "successDialog"
    ) as HTMLDialogElement;
    let failedDialog: HTMLDialogElement | null = document.getElementById(
      "failedDialog"
    ) as HTMLDialogElement;

    if (this.addObatForm.invalid) return;

    let form = this.addObatForm.value;
    let bodyReq = {
      kdTindakanSK: form.valueOfTindakanSK,
      noKunjungan: form.valueOfKunjungan,
      kdTindakan: form.valueOfTindakan,
      biaya: form.amountOfbiaya,
      keterangan: form.valueOfKeterangan,
      hasil: form.amountOfHasil,
    };

    this.authService.addBpjsObat(bodyReq).subscribe(
      (data: any) => {
        if (!data.success) {
          this.failedMsg = data["message"];
          let failedDialog: HTMLDialogElement | null = document.getElementById(
            "failedDialog"
          ) as HTMLDialogElement;
          if (failedDialog) {
            failedDialog.showModal();
            document.querySelectorAll("#close").forEach((button: Element) => {
              button.addEventListener("click", (e: MouseEvent) => {
                successDialog.close();
                this.clickEvent(OBAT_CLICK_EVENT.GET);
              });
            });
          }
        } else {
          this.successMsg = data["message"];
          if (addMCUDialog) addMCUDialog.close();
          if (successDialog) {
            successDialog.showModal();
            document.querySelectorAll("#close").forEach((button: Element) => {
              button.addEventListener("click", (e: MouseEvent) => {
                successDialog.close();
                this.clickEvent(OBAT_CLICK_EVENT.GET);
              });
            });
          }
        }
      },
      (error: any) => {
        this.toastr.error(error.error.message, "Error");
      }
    );
  }

  onDeleteItem(kodeObat: string = "", noKunjungan: string = "") {
    this.authService
      .deleteBpjsObat(kodeObat, noKunjungan)
      .subscribe((data: any) => {
        if (!data.success) {
          let failedDialog: HTMLDialogElement | null = document.getElementById(
            "failedDialog"
          ) as HTMLDialogElement;
          if (failedDialog) {
            failedDialog.showModal();
            document.querySelectorAll("#close").forEach((button: Element) => {
              button.addEventListener("click", (e: MouseEvent) => {
                successDialog.close();
                this.clickEvent(OBAT_CLICK_EVENT.GET);
              });
            });
          }
        }
        this.successMsg = data.message;
        let successDialog: HTMLDialogElement | null = document.getElementById(
          "successDialog"
        ) as HTMLDialogElement;
        if (successDialog) {
          successDialog.showModal();
          document.querySelectorAll("#close").forEach((button: Element) => {
            button.addEventListener("click", (e: MouseEvent) => {
              successDialog.close();
              this.clickEvent(OBAT_CLICK_EVENT.GET);
            });
          });
        }
      });
  }

  onDeleteClicked() {
    this.clickEvent(OBAT_CLICK_EVENT.DELETE);
  }
}
