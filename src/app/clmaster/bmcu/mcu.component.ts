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

enum MCU_CLICK_EVENT {
  ADD,
  EDIT,
  DELETE,
  DETAIL,
}

interface Pasien {
  notransaksi: string;
  nokunjungan: string;
  norm: string;
  tglpriksa: string;
  pasien: string;
  nampoli: string;
  kdprov: string;
  kodemcu: string;
}

interface MCU {
  kdMCU: number;
  noKunjungan: string;
  kdProvider: string;
  tglPelayanan: string;
  tekananDarahSistole: number;
  tekananDarahDiastole: number;
  radiologiFoto: string;
  darahRutinHemo: number;
  darahRutinLeu: number;
  darahRutinErit: number;
  darahRutinLaju: number;
  darahRutinHema: number;
  darahRutinTrom: number;
  lemakDarahHDL: number;
  lemakDarahLDL: number;
  lemakDarahChol: number;
  lemakDarahTrigli: number;
  gulaDarahSewaktu: number;
  gulaDarahPuasa: number;
  gulaDarahPostPrandial: number;
  gulaDarahHbA1c: number;
  fungsiHatiSGOT: number;
  fungsiHatiSGPT: number;
  fungsiHatiGamma: number;
  fungsiHatiProtKual: number;
  fungsiHatiAlbumin: number;
  fungsiGinjalCrea: number;
  fungsiGinjalUreum: number;
  fungsiGinjalAsam: number;
  fungsiJantungABI: number;
  fungsiJantungEKG: number;
  fungsiJantungEcho: number;
  funduskopi: any;
  pemeriksaanLain: any;
  keterangan: any;
}

@Component({
  selector: "app-berita",
  templateUrl: "./mcu.component.html",
  styleUrls: ["./mcu.component.css"],
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
export class mcuComponent implements OnInit {
  kodeForm: FormGroup;
  viewDataForm: FormGroup;

  duration: any = 20000;
  panelOpenState: boolean = false;

  codeOfMCU: string = "";
  dateOfKunjungan: string = "";
  addDialogTitle: string = "MCU";
  addDialogContent: string =
    "Isi form didalam masing masing langkah dengan data yang benar";
  dialogButtonLabel: string = "";
  dialogAction: string = "";

  selectedMCU: MCU = null;
  searchKeyword: string = "";
  searchTglPeriksa: string = new Date().toISOString().split("T")[0];
  selectedNoTransaksi: string = "";
  selectedNoKunjungan: string = "";

  failedMsg: string = "Mohon maaf proses gagal!";
  successMsg: string = "Selamat proses berhasil dijalankan!";

  isDetailDialogShow: boolean = false;
  isShowedForm: boolean = false;

  pipe = new DatePipe("en-US");
  currentDate: any;

  currentClickEvent: MCU_CLICK_EVENT = MCU_CLICK_EVENT.ADD;

  listOfPasien: object[] = [];
  listOfMCU: MCU[] = [];
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
    this.viewDataForm = this.fb.group({
      codeOfMCU: ["", Validators?.nullValidator],
      codeOfProvider: ["", Validators?.nullValidator],
      numberOfKunjungan: ["", Validators?.nullValidator],
      dateOfKunjungan: ["", Validators?.nullValidator],
      numberOfSistole: ["", Validators.nullValidator],
      numberOfDiastole: ["", Validators.nullValidator],
      numberOfHemo: ["", Validators.nullValidator],
      numberOfLeu: ["", Validators.nullValidator],
      numberOfErit: ["", Validators.nullValidator],
      numberOfLaju: ["", Validators.nullValidator],
      numberOfHema: ["", Validators.nullValidator],
      numberOfTrom: ["", Validators.nullValidator],
      numberOfHDL: ["", Validators.nullValidator],
      numberOfLDL: ["", Validators.nullValidator],
      numberOfChol: ["", Validators.nullValidator],
      numberOfTrigli: ["", Validators.nullValidator],
      numberOfGDSewaktu: ["", Validators.nullValidator],
      numberOfGDPuasa: ["", Validators.nullValidator],
      numberOfGDPrandial: ["", Validators.nullValidator],
      numberOfGDHba1c: ["", Validators.nullValidator],
      numberOfFHSGOT: ["", Validators.nullValidator],
      numberOfFHSGPT: ["", Validators.nullValidator],
      numberOfFHGamma: ["", Validators.nullValidator],
      numberOfFHProtKual: ["", Validators.nullValidator],
      numberOfFHAlbumin: ["", Validators.nullValidator],
      numberOfFGCrea: ["", Validators.nullValidator],
      numberOfFGUreum: ["", Validators.nullValidator],
      numberOfFGAsam: ["", Validators.nullValidator],
      numberOfFJABI: ["", Validators.nullValidator],
      numberOfFJEKG: ["", Validators.nullValidator],
      numberOfFJEcho: ["", Validators.nullValidator],
      valueOfRadiologiFoto: ["", Validators.nullValidator],
      valueOfFunduskopi: ["", Validators.nullValidator],
      valueOfPemeriksaLainnya: ["", Validators.nullValidator],
      valueOfKeterangan: ["", Validators.nullValidator],
    });

    this.kodeForm = this.fb.group({
      codeOfMCU: ["", [Validators.required]],
      codeOfProvider: ["", [Validators.required]],
      numberOfKunjungan: ["", [Validators.required]],
      dateOfPelayanan: ["", [Validators.required]],
      numberOfSistole: ["", [Validators.required]],
      numberOfDiastole: ["", [Validators.required]],
      numberOfHemo: ["", [Validators.required]],
      numberOfLeu: ["", [Validators.required]],
      numberOfErit: ["", [Validators.required]],
      numberOfLaju: ["", [Validators.required]],
      numberOfHema: ["", [Validators.required]],
      numberOfTrom: ["", [Validators.required]],
      numberOfHDL: ["", [Validators.required]],
      numberOfLDL: ["", [Validators.required]],
      numberOfChol: ["", [Validators.required]],
      numberOfTrigli: ["", [Validators.required]],
      numberOfGDSewaktu: ["", [Validators.required]],
      numberOfGDPuasa: ["", [Validators.required]],
      numberOfGDPrandial: ["", [Validators.required]],
      numberOfGDHba1c: ["", [Validators.required]],
      numberOfFHSGOT: ["", [Validators.required]],
      numberOfFHSGPT: ["", [Validators.required]],
      numberOfFHGamma: ["", [Validators.required]],
      numberOfFHProtKual: ["", [Validators.required]],
      numberOfFHAlbumin: ["", [Validators.required]],
      numberOfFGCrea: ["", [Validators.required]],
      numberOfFGUreum: ["", [Validators.required]],
      numberOfFGAsam: ["", [Validators.required]],
      numberOfFJABI: ["", [Validators.required]],
      numberOfFJEKG: ["", [Validators.required]],
      numberOfFJEcho: ["", [Validators.required]],
      valueOfRadiologiFoto: ["", [Validators.required]],
      valueOfFunduskopi: ["", [Validators.required]],
      valueOfPemeriksaLainnya: ["", [Validators.required]],
      valueOfKeterangan: ["", [Validators.required]],
    });

    this.getAllPasien();
  }

  showAddDialog(pasien: Pasien) {
    this.addDialogTitle = "Mendaftar MCU";
    this.addDialogContent = "isi form dibawah dengan data yang benar";
    this.dialogButtonLabel = "Tambah";
    this.dialogAction = "add";
    this.isShowedForm = true;

    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        this.kodeForm.patchValue({
          codeOfMCU: pasien.kodemcu ?? "",
          codeOfProvider: pasien.kdprov ?? "-",
          numberOfKunjungan: pasien.nokunjungan ?? "-",
          dateOfPelayanan:
            this.pipe.transform(pasien.tglpriksa, "dd-MM-yyyy") ?? "-",
          numberOfSistole: "0",
          numberOfDiastole: "0",
          numberOfHemo: "0",
          numberOfLeu: "0",
          numberOfErit: "0",
          numberOfLaju: "0",
          numberOfHema: "0",
          numberOfTrom: "0",
          numberOfHDL: "0",
          numberOfLDL: "0",
          numberOfChol: "0",
          numberOfTrigli: "0",
          numberOfGDSewaktu: "0",
          numberOfGDPuasa: "0",
          numberOfGDPrandial: "0",
          numberOfGDHba1c: "0",
          numberOfFHSGOT: "0",
          numberOfFHSGPT: "0",
          numberOfFHGamma: "0",
          numberOfFHProtKual: "0",
          numberOfFHAlbumin: "0",
          numberOfFGCrea: "0",
          numberOfFGUreum: "0",
          numberOfFGAsam: "0",
          numberOfFJABI: "0",
          numberOfFJEKG: "0",
          numberOfFJEcho: "0",
          valueOfRadiologiFoto: "0",
          valueOfFunduskopi: "0",
          valueOfPemeriksaLainnya: "0",
          valueOfKeterangan: "0",
        });
      },
    }).then(
      () => {},
      (dismiss) => {
        location.reload();
      }
    );
  }

  showEditDialog(pasien: Pasien) {
    this.addDialogTitle = "Perbaharui Data MCU";
    this.addDialogContent = "Perbaharui form dibawah dengan data yang benar";
    this.dialogButtonLabel = "Perbaharui";
    this.dialogAction = "edit";
    this.isShowedForm = true;

    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        this.authService.getBpjsMCU(pasien.nokunjungan).subscribe(
          (data: any) => {
            if (!data.success) {
              this.failedMsg = "data mcu tidak ditemukan";
              this.toastr.error(this.failedMsg, "Error");
            } else {
              this.addDialogTitle = "Edit MCU";
              let listMcu = data.data.list;
              listMcu.map((item) => {
                this.kodeForm.patchValue({
                  codeOfMCU: item.kdMCU,
                  codeOfProvider: item.kdProvider,
                  numberOfKunjungan: item.noKunjungan,
                  dateOfPelayanan: item.tglPelayanan,
                  numberOfSistole: item.tekananDarahSistole,
                  numberOfDiastole: item.tekananDarahDiastole,
                  numberOfHemo: item.darahRutinHemo,
                  numberOfLeu: item.darahRutinLeu,
                  numberOfErit: item.darahRutinErit,
                  numberOfLaju: item.darahRutinLaju,
                  numberOfHema: item.darahRutinHema,
                  numberOfTrom: item.darahRutinTrom,
                  numberOfHDL: item.lemakDarahHDL,
                  numberOfLDL: item.lemakDarahLDL,
                  numberOfChol: item.lemakDarahChol,
                  numberOfTrigli: item.lemakDarahTrigli,
                  numberOfGDSewaktu: item.gulaDarahSewaktu,
                  numberOfGDPuasa: item.gulaDarahPuasa,
                  numberOfGDPrandial: item.gulaDarahPostPrandial,
                  numberOfGDHba1c: item.gulaDarahHbA1c,
                  numberOfFHSGOT: item.fungsiHatiSGOT,
                  numberOfFHSGPT: item.fungsiHatiSGPT,
                  numberOfFHGamma: item.fungsiHatiGamma,
                  numberOfFHProtKual: item.fungsiHatiProtKual,
                  numberOfFHAlbumin: item.fungsiHatiAlbumin,
                  numberOfFGCrea: item.fungsiGinjalCrea,
                  numberOfFGUreum: item.fungsiGinjalUreum,
                  numberOfFGAsam: item.fungsiGinjalAsam,
                  numberOfFJABI: item.fungsiJantungABI,
                  numberOfFJEKG: item.fungsiJantungEKG,
                  numberOfFJEcho: item.fungsiJantungEcho,
                  valueOfRadiologiFoto: item.radiologiFoto,
                  valueOfFunduskopi: item.funduskopi,
                  valueOfPemeriksaLainnya: item.pemeriksaanLain,
                  valueOfKeterangan: item.keterangan,
                });
              });
            }
          },
          (error) => {
            this.failedMsg = error.error.err ?? "Gagal mendapatkan data mcu";
            this.toastr.error(this.failedMsg, "Error", {
              timeOut: 2000,
            });
          }
        );
      },
    }).then(
      () => {},
      (dismiss) => {
        location.reload();
      }
    );
  }

  showDetailDialog(pasien: any) {
    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        this.authService.getBpjsMCU(pasien.nokunjungan).subscribe(
          (data: any) => {
            if (!data.success) {
              this.listOfMCU = [];
              this.failedMsg = data["message"];
            } else {
              let dataRes = data.data.list;
              dataRes.map((item) => {
                this.viewDataForm.patchValue({
                  codeOfMCU: item.kdMCU,
                  codeOfProvider: item.kdProvider,
                  numberOfKunjungan: item.noKunjungan,
                  dateOfKunjungan: item.tglPelayanan,
                  numberOfSistole: item.tekananDarahSistole,
                  numberOfDiastole: item.tekananDarahDiastole,
                  numberOfHemo: item.darahRutinHemo,
                  numberOfLeu: item.darahRutinLeu,
                  numberOfErit: item.darahRutinErit,
                  numberOfLaju: item.darahRutinLaju,
                  numberOfHema: item.darahRutinHema,
                  numberOfTrom: item.darahRutinTrom,
                  numberOfHDL: item.lemakDarahHDL,
                  numberOfLDL: item.lemakDarahLDL,
                  numberOfChol: item.lemakDarahChol,
                  numberOfTrigli: item.lemakDarahTrigli,
                  numberOfGDSewaktu: item.gulaDarahSewaktu,
                  numberOfGDPuasa: item.gulaDarahPuasa,
                  numberOfGDPrandial: item.gulaDarahPostPrandial,
                  numberOfGDHba1c: item.gulaDarahHbA1c,
                  numberOfFHSGOT: item.fungsiHatiSGOT,
                  numberOfFHSGPT: item.fungsiHatiSGPT,
                  numberOfFHGamma: item.fungsiHatiGamma,
                  numberOfFHProtKual: item.fungsiHatiProtKual,
                  numberOfFHAlbumin: item.fungsiHatiAlbumin,
                  numberOfFGCrea: item.fungsiGinjalCrea,
                  numberOfFGUreum: item.fungsiGinjalUreum,
                  numberOfFGAsam: item.fungsiGinjalAsam,
                  numberOfFJABI: item.fungsiJantungABI,
                  numberOfFJEKG: item.fungsiJantungEKG,
                  numberOfFJEcho: item.fungsiJantungEcho,
                  valueOfRadiologiFoto: item.radiologiFoto,
                  valueOfFunduskopi: item.funduskopi,
                  valueOfPemeriksaLainnya: item.pemeriksaanLain,
                  valueOfKeterangan: item.keterangan,
                });
              });
              let detailDialog: HTMLDialogElement | null =
                document.getElementById("detailDialog") as HTMLDialogElement;
              if (detailDialog) {
                detailDialog.showModal();
                document
                  .querySelectorAll("#close")
                  .forEach((button: Element) => {
                    button.addEventListener("click", (e: MouseEvent) => {
                      Swal.close();
                      detailDialog.close();
                    });
                  });
              }
            }
          },
          (error: any) => {
            this.listOfMCU = [];
            this.failedMsg = error.error.err ?? null;
            this.toastr.error(this.failedMsg, "Error");
          }
        );
      },
    });
  }

  doSaveMcu(action: string) {
    console.log(action);
    Swal.fire({
      title: "Apakah anda yakin ingin mengirim data?",
      showCancelButton: true,
      confirmButtonText: "Ya, yakin",
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#91a7d0",
      customClass: {
        container: "my-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Mohon tunggu!");
        Swal.showLoading();

        let kode = this.kodeForm;

        let bodyReq = {
          kdMCU: kode.value.codeOfMCU,
          kdProvider: kode.value.codeOfProvider,
          noKunjungan: kode.value.numberOfKunjungan,
          tglPelayanan: kode.value.dateOfPelayanan,
          tekananDarahSistole: kode.value.numberOfSistole,
          tekananDarahDiastole: kode.value.numberOfDiastole,
          darahRutinHemo: kode.value.numberOfHemo,
          darahRutinLeu: kode.value.numberOfLeu,
          darahRutinErit: kode.value.numberOfErit,
          darahRutinLaju: kode.value.numberOfLaju,
          darahRutinHema: kode.value.numberOfHema,
          darahRutinTrom: kode.value.numberOfTrom,
          lemakDarahHDL: kode.value.numberOfHDL,
          lemakDarahLDL: kode.value.numberOfLDL,
          lemakDarahChol: kode.value.numberOfChol,
          lemakDarahTrigli: kode.value.numberOfTrigli,
          gulaDarahSewaktu: kode.value.numberOfGDSewaktu,
          gulaDarahPuasa: kode.value.numberOfGDPuasa,
          gulaDarahPostPrandial: kode.value.numberOfGDPrandial,
          gulaDarahHbA1c: kode.value.numberOfGDHba1c,
          fungsiHatiSGOT: kode.value.numberOfFHSGOT,
          fungsiHatiSGPT: kode.value.numberOfFHSGPT,
          fungsiHatiGamma: kode.value.numberOfFHGamma,
          fungsiHatiProtKual: kode.value.numberOfFHProtKual,
          fungsiHatiAlbumin: kode.value.numberOfFHAlbumin,
          fungsiGinjalCrea: kode.value.numberOfFGCrea,
          fungsiGinjalUreum: kode.value.numberOfFGUreum,
          fungsiGinjalAsam: kode.value.numberOfFGAsam,
          fungsiJantungABI: kode.value.numberOfFJABI,
          fungsiJantungEKG: kode.value.numberOfFJEKG,
          fungsiJantungEcho: kode.value.numberOfFJEcho,
          radiologiFoto: kode.value.valueOfRadiologiFoto,
          funduskopi: kode.value.valueOfFunduskopi,
          pemeriksaanLain: kode.value.valueOfPemeriksaLainnya,
          keterangan: kode.value.valueOfKeterangan,
        };

        console.log(bodyReq);

        if (action === "edit") {
          console.log("asdasdasd");
          this.authService.updateBpjsMCU(bodyReq).subscribe(
            (data: any) => {
              Swal.close();
              if (data.success) {
                const msg =
                  data.message && data.message != ""
                    ? data.message
                    : "Berhasil Menyimpan Data";
                this.toastr.success(msg, "Sukses", {
                  timeOut: 2000,
                });

                this.isShowedForm = false;
                this.getAllPasien();
              }
            },
            (error) => {
              Swal.close();
              const msg =
                error.error.err && error.error.err != ""
                  ? error.error.err
                  : "Gagal Menyimpan Data";
              this.toastr.error(msg, "Error", {
                timeOut: 2000,
              });
            }
          );
        } else {
          this.authService.addBpjsMCU(bodyReq).subscribe(
            (data: any) => {
              Swal.close();
              if (data.success) {
                const msg =
                  data.message && data.message != ""
                    ? data.message
                    : "Berhasil Menyimpan Data";
                this.toastr.success(msg, "Sukses", {
                  timeOut: 2000,
                });

                this.isShowedForm = false;
                this.getAllPasien();
              }
            },
            (error) => {
              Swal.close();
              const msg =
                error.error.err && error.error.err != ""
                  ? error.error.err
                  : "Gagal Menyimpan Data";
              this.toastr.error(msg, "Error", {
                timeOut: 2000,
              });
            }
          );
        }
      }
    });
  }

  getAllPasien() {
    Swal.fire("Mohon tunggu!");
    Swal.showLoading();

    this.authService
      .getBpjsMCUAllPasien(this.searchKeyword, this.searchTglPeriksa)
      .subscribe(
        (data: any) => {
          Swal.close();
          if (!data.success) {
            this.listOfPasien = [];
            this.failedMsg = data["message"];
          } else {
            let dataRes = data.data;
            this.listOfPasien = [];

            let convertedArray = dataRes.map((item) => {
              return {
                ...item,
              };
            });
            this.listOfPasien = convertedArray;
          }
        },
        (err) => {
          Swal.close();
        }
      );
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
        this.getAllMCU(noKunjungan);
        Swal.showLoading();
      },
    }).then(
      () => {},
      (dismiss) => {
        location.reload();
      }
    );
  }

  getAllMCU(noKunjungan: string = "") {
    this.authService.getBpjsMCU(noKunjungan).subscribe(
      (data: any) => {
        if (!data.success) {
          this.listOfMCU = [];
          this.failedMsg = data["message"];
        } else {
          let dataRes = data.data.list;
          this.listOfMCU = [];
          let convertedArray = dataRes.map((item) => {
            return {
              kdMCU: item.kdMCU,
              noKunjungan: item.noKunjungan,
              kdProvider: item.kdProvider,
              tglPelayanan: item.tglPelayanan,
              tekananDarahSistole: item.tekananDarahSistole,
              tekananDarahDiastole: item.tekananDarahDiastole,
              radiologiFoto: item.radiologiFoto,
              darahRutinHemo: item.darahRutinHemo,
              darahRutinLeu: item.darahRutinLeu,
              darahRutinErit: item.darahRutinErit,
              darahRutinLaju: item.darahRutinLaju,
              darahRutinHema: item.darahRutinHema,
              darahRutinTrom: item.darahRutinTrom,
              lemakDarahHDL: item.lemakDarahHDL,
              lemakDarahLDL: item.lemakDarahLDL,
              lemakDarahChol: item.lemakDarahChol,
              lemakDarahTrigli: item.lemakDarahTrigli,
              gulaDarahSewaktu: item.gulaDarahSewaktu,
              gulaDarahPuasa: item.gulaDarahPuasa,
              gulaDarahPostPrandial: item.gulaDarahPostPrandial,
              gulaDarahHbA1c: item.gulaDarahHbA1c,
              fungsiHatiSGOT: item.fungsiHatiSGOT,
              fungsiHatiSGPT: item.fungsiHatiSGPT,
              fungsiHatiGamma: item.fungsiHatiGamma,
              fungsiHatiProtKual: item.fungsiHatiProtKual,
              fungsiHatiAlbumin: item.fungsiHatiAlbumin,
              fungsiGinjalCrea: item.fungsiGinjalCrea,
              fungsiGinjalUreum: item.fungsiGinjalUreum,
              fungsiGinjalAsam: item.fungsiGinjalAsam,
              fungsiJantungABI: item.fungsiJantungABI,
              fungsiJantungEKG: item.fungsiJantungEKG,
              fungsiJantungEcho: item.fungsiJantungEcho,
              funduskopi: item.funduskopi,
              pemeriksaanLain: item.pemeriksaanLain,
              keterangan: item.keterangan,
            };
          });
          this.listOfMCU = convertedArray;
        }

        setTimeout(function () {
          console.log("Test : " + JSON.stringify(this.listOfMCU[0]));
        }, 2000);
        let pasienDialog: HTMLDialogElement | null = document.getElementById(
          "pasienDialog"
        ) as HTMLDialogElement;
        pasienDialog.showModal();
      },
      (error: any) => {
        this.listOfMCU = [];
        this.failedMsg = error.error.err ?? null;
        this.toastr.error(this.failedMsg, "Error");
      }
    );
  }

  onSearchMCU() {
    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        this.authService
          .getBpjsMCUAllPasien(this.searchKeyword, this.searchTglPeriksa)
          .subscribe(
            (data: any) => {
              this.listOfPasien = [];
              if (!data.success) {
                this.failedMsg = data["message"];
              } else {
                let dataRes = data.data;
                let convertedArray = dataRes.map((item) => {
                  return {
                    ...item,
                  };
                });
                this.listOfPasien = convertedArray;
              }
            },
            (error: any) => {
              this.listOfPasien = [];
              this.failedMsg = error.error.err ?? null;
              this.toastr.error(this.failedMsg, "Error");
            }
          );
      },
    }).then(
      () => {},
      (dismiss) => {}
    );
  }

  showDeleteDialog(kodeMCU: string = "", noKunjungan: string = "") {
    let dialog: HTMLDialogElement | null = document.getElementById(
      "dialog"
    ) as HTMLDialogElement;
    dialog.close();
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data mcu ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, yakin",
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#91a7d0",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Mohon tunggu!");
        Swal.showLoading();
        this.authService.deleteBpjsMCU(kodeMCU, noKunjungan).subscribe(
          (data: any) => {
            Swal.close();
            if (data.success) {
              const msg =
                data.message && data.message != ""
                  ? data.message
                  : "Berhasil Menghapus Data Mcu";
              this.toastr.success(msg, "Sukses", {
                timeOut: 2000,
              });

              this.getAllPasien();
            }
          },
          (err) => {
            Swal.close();
            const msg =
              err.error.err && err.error.err != ""
                ? err.error.err
                : "Gagal Menghapus Data Mcu";
            this.toastr.error(msg, "Error", {
              timeOut: 2000,
            });
          }
        );
      }
    });
  }

  doHideForm() {
    this.isShowedForm = false;
    this.getAllPasien();
  }
}
