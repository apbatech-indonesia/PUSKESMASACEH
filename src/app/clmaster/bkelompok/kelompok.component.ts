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

import Swal from "sweetalert2";
import { ApiserviceService } from "src/app/apiservice.service";
import { ToastrService } from "ngx-toastr";
import { MatStepper } from "@angular/material/stepper";
import { ErrorHandler } from "./error.handler";

interface pattern {
  name: string;
  code: string;
}

@Component({
  selector: "app-berita",
  templateUrl: "./kelompok.component.html",
  styleUrls: ["./kelompok.component.css"],
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
export class kelompokComponent implements OnInit {
  addKegiatan: FormGroup;
  addPesertaForm: FormGroup;
  chooseClubScreen: FormGroup;
  formAddKegiatanScreen: FormGroup;

  isLinear: boolean = true;
  isProccessFailed: boolean = false;
  isShowConfirmDialog: boolean = false;
  isClubSelected: boolean = false;
  isShowFormKegiatan: boolean = false;

  deleteType: string = "kegiatan";
  addType: string = "kegiatan";
  currentDate: string = "15-11-2016";
  addDate: any;

  selectedEduId: string = null;
  currentEduID: string = null;
  currentCardNumber: string = null;
  pipe = new DatePipe("en-US");
  selected: string = null;
  date: any = null;
  selectedClub: string = "";
  selectedClubID: string = "";
  successMsg: string = "";
  errorMsg: string = "";
  searchKeyword: string = "";
  searchTglKegiatan: string = this.pipe.transform(Date.now(), "yyyy-MM-dd");
  searchPesertaKeyword: string = "";
  errors: any = {};

  selectedKegiatan: any;

  // CONTENT RIGHT
  listOfKegiatan: object[] = [];
  listOfClub: object[] = [];
  listOfPesertaKegiatan: object[] = [];
  listOfClubDD: object[] = [];
  listOfKegiatanDD: pattern[] = [];
  // listOfKegiatan: { eduID: string, namaKelompok: string, namaKegiatan: string, deskripsiKegiatan: string, biaya: string }[] = [];

  selectClubForm = this.fb.group({
    currentClub: ["", Validators.required],
  });

  addKegiatanForm = this.fb.group({
    clubID: ["", [Validators.nullValidator]],
    selectedKegiatan: ["", Validators.required],
    materi: ["", Validators.required],
    pembicara: ["", Validators.required],
    tglKegiatan: ["", Validators.required],
    lokasi: ["", Validators.required],
    biaya: [
      "",
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[0-9]\d*$/),
      ],
    ],
    keterangan: ["", Validators.nullValidator],
  });

  constructor(
    private errorHandler: ErrorHandler,
    public fb: FormBuilder,
    private config: PrimeNGConfig,
    private authService: ApiserviceService,
    public toastr: ToastrService
  ) {
    this.onLoadDataDropdownKegiatan();
  }

  ngOnInit(): void {
    this.selectedEduId = null;
    this.selectedKegiatan = null;
    this.errorHandler.handleErrors(this.addKegiatanForm, this.errors);
    this.addKegiatan = new FormGroup({
      keterangan: new FormControl("", Validators.required),
    });

    this.formAddKegiatanScreen = new FormGroup({});
    this.chooseClubScreen = new FormGroup({});

    this.currentDate = this.pipe.transform(Date.now(), "yyyy-MM-dd");
    this.addDate = this.currentDate;
    // this.showCalendarDialog()
    this.getKegiatan(this.searchTglKegiatan);
    this.addPesertaForm = new FormGroup({
      eduId: new FormControl("", [Validators.nullValidator]),
      noKartu: new FormControl({ value: "", disabled: false, updateOn: blur }, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
    });
  }

  onChange(keyword: string = "") {
    let clubCode = this.selectClubForm.value.currentClub;
    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        let key = keyword !== "" ? keyword : clubCode;
        this.authService.getAllBpjsClub(key).subscribe((data: any) => {
          if (!data.success) {
            this.isProccessFailed = true;
          } else {
            this.isClubSelected = true;

            let dataRes = data.data.list;
            this.listOfClub = [];

            let convertedArray = dataRes.map((item) => {
              return {
                clubId: item.clubId,
                namaKelompok: item.nama,
                namaKetua: item.ketua_nama,
                alamat: item.alamat,
                tanggalMulai: item.tglMulai,
                tanggalAkhir: item.tglAkhir,
              };
            });
            this.listOfClub = convertedArray;
          }
        });
      },
    }).then(
      () => {},
      (dismiss) => {
        location.reload();
      }
    );
  }

  selectClubItem(stepper: MatStepper, clubID: any) {
    this.selectedClubID = clubID["clubId"];
    stepper.next();
  }

  showCalendarDialog() {
    let calendarDialog: HTMLDialogElement | null = document.getElementById(
      "calendarDialog"
    ) as HTMLDialogElement;
    if (calendarDialog) {
      // Call the showModal() method on the dialog element
      calendarDialog.showModal();
    } else {
      console.error("Dialog element not found.");
    }
  }

  chooseDate() {
    let calendarDialog: HTMLDialogElement | null = document.getElementById(
      "calendarDialog"
    ) as HTMLDialogElement;
    if (calendarDialog) {
      // Call the showModal() method on the dialog element
      calendarDialog.close();
      this.currentDate =
        this.date !== null
          ? this.pipe.transform(this.date, "dd-MM-yyyy")
          : this.pipe.transform(Date.now(), "dd-MM-yyyy");
      this.loadData(this.currentDate);
    } else {
      console.error("Dialog element not found.");
    }
  }

  showConfirmDialog(
    delType: string = "test",
    eduID: string = "-",
    cardNumber: string = "-"
  ): void {
    this.deleteType = delType;
    this.currentEduID = eduID;
    this.currentCardNumber = cardNumber;

    let confirmDialog: HTMLDialogElement | null = document.getElementById(
      "confirmDialog"
    ) as HTMLDialogElement;

    // Check if the dialog element exists
    if (confirmDialog) {
      // Call the showModal() method on the dialog element
      confirmDialog.showModal();
    } else {
      console.error("Dialog element not found.");
    }
  }

  loadData(date: string) {
    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        this.onLoadDataKegiatan(date);
      },
    }).then(
      () => {},
      (dismiss) => {
        document.querySelector(".data-header").scrollIntoView();
      }
    );
  }

  selectItem(kegiatan: any) {
    this.currentEduID = kegiatan.eduId;
    this.selectedEduId = kegiatan.eduId;
    this.selectedKegiatan = kegiatan;

    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        this.listOfPesertaKegiatan = [];
        this.currentEduID = kegiatan.eduId;
        this.onLoadDataPesertaKegiatan(kegiatan.eduId);
        Swal.showLoading();
      },
    }).then(
      () => {},
      (dismiss) => {
        document.querySelector(".data-header").scrollIntoView();
      }
    );
    this.selectedEduId = kegiatan.eduId;
  }

  onLoadDataKegiatan(date: string): any {
    this.authService
      .getAllBpjsKegiatan(this.pipe.transform(date, "dd-MM-yyyy"))
      .subscribe(
        (data: any) => {
          if (!data.success) {
            this.isProccessFailed = true;
          } else {
            let dataRes = data.data.list;

            this.listOfKegiatan = [];

            if (dataRes != undefined) {
              let convertedArray = dataRes.map((item) => {
                return {
                  ...item,
                };
              });
              this.listOfKegiatan = convertedArray;
            } else {
              console.log("undinfed");
              this.listOfKegiatan = null;
            }
          }
        },
        (error: any) => {
          this.toastr.error(error.error.err, "Error");
        }
      );
  }

  onLoadDataDropdownKegiatan() {
    this.authService.getAllBpjsKegiatanDropdown().subscribe(
      (data: any) => {
        if (!data.success) {
          this.isProccessFailed = true;
        } else {
          let dataResKelompok = data.data.kelompok;
          let dataResKegiatan = data.data.kegiatan;

          let arrayKelompok = dataResKelompok.map((item) => {
            return {
              code: item.kode,
              name: item.nama,
            };
          });
          let arrayKegiatan = dataResKegiatan.map((item) => {
            return {
              code: item.kode,
              name: item.nama,
            };
          });

          this.listOfKegiatanDD = arrayKelompok;
          this.listOfClubDD = arrayKegiatan;
        }
      },
      (error: any) => {
        this.toastr.error(error.error.err, "Error");
      }
    );
  }

  onLoadDataPesertaKegiatan(eduID: string): any {
    this.authService.getAllBpjsPesertaKegiatan(eduID).subscribe(
      (data: any) => {
        if (!data.success) {
          this.isProccessFailed = true;
        } else {
          let dataRes = data.data.list;

          let convertedArray = dataRes.map((item) => {
            return {
              eduId: item.eduId ?? "-",
              noKartu: item.peserta.noKartu ?? "-",
              nama: item.peserta.nama ?? "-",
              jenisKelamin: item.peserta.sex ?? "-",
              tglLahir: item.peserta.tglLahir ?? "-",
              namaKelas: item.peserta.jnsKelas.nama ?? "-",
              namaJenisPeserta: item.peserta.jnsPeserta.nama ?? "-",
              noHP: item.peserta.noHP ?? "-",
              noKTP: item.peserta.noKTP ?? "-",
              pstprol: item.peserta.pstProl ?? "-",
              pstprb: item.peserta.pstPrb ?? "-",
              namaAsuransi: item.peserta.asuransi.nmAsuransi ?? "-",
              golDarah: item.peserta.golDarah ?? "-",
            };
          });
          this.listOfPesertaKegiatan = convertedArray;
        }
      },
      (error: any) => {
        this.toastr.error(error.error.err, "Error");
      }
    );
  }

  onSearchClubID() {
    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        this.onLoadDataKegiatan(this.searchKeyword);
        Swal.showLoading();
      },
    }).then(
      () => {},
      (dismiss) => {
        document.querySelector(".data-header").scrollIntoView();
      }
    );
  }

  onSearchPeserta() {
    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        this.onLoadDataPesertaKegiatan(this.searchPesertaKeyword);
        Swal.showLoading();
      },
    }).then(
      () => {},
      (dismiss) => {
        document.querySelector(".data-header").scrollIntoView();
      }
    );
  }

  showSavingDialog(savingType: string = "kegiatan") {
    this.addType = savingType;
    let confirmDialog: HTMLDialogElement | null = document.getElementById(
      "confirmSaveDialog"
    ) as HTMLDialogElement;
    let addPesertaDialog: HTMLDialogElement | null = document.getElementById(
      "dialogPeserta"
    ) as HTMLDialogElement;

    if (addPesertaDialog) addPesertaDialog.close();
    if (confirmDialog) confirmDialog.showModal();
  }

  doSavePeserta() {
    let dialog: HTMLDialogElement | null = document.getElementById(
      "dialogPeserta"
    ) as HTMLDialogElement;
    dialog.close();
    Swal.fire({
      title: "Apakah anda yakin ingin mengirim data?",
      showCancelButton: true,
      confirmButtonText: "Ya, yakin",
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#91a7d0",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Mohon tunggu!");
        Swal.showLoading();

        let formValue = this.addPesertaForm;
        if (formValue.invalid) {
          this.toastr.error("invalid validation", "Error", {
            timeOut: 2000,
          });
          Swal.close();
          return;
        }

        let bodyReq = {
          eduId: formValue.value.eduId,
          noKartu: formValue.value.noKartu,
        };

        this.authService.addBpjsPesertaKegiatan(bodyReq).subscribe(
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

              this.onLoadDataPesertaKegiatan(bodyReq.eduId);
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
    });
  }

  doSaveKegiatan() {
    Swal.fire({
      title: "Apakah anda yakin ingin mengirim data?",
      showCancelButton: true,
      confirmButtonText: "Ya, yakin",
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#91a7d0",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Mohon tunggu!");
        Swal.showLoading();

        let formValue = this.addKegiatanForm;

        if (formValue.invalid) {
          this.toastr.error("invalid validation", "Error", {
            timeOut: 2000,
          });
          Swal.close();
          return;
        }

        let bodyReq = {
          eduId: null,
          clubId: this.selectedClubID.toString(),
          tglPelayanan: this.pipe.transform(
            formValue.value.tglKegiatan,
            "dd-MM-yyyy"
          ),
          kdKegiatan: formValue.value.selectedKegiatan,
          kdKelompok: this.selectClubForm.value.currentClub,
          materi: formValue.value.materi,
          pembicara: formValue.value.pembicara,
          lokasi: formValue.value.lokasi,
          keterangan: formValue.value.keterangan,
          biaya: formValue.value.biaya.toString(),
        };

        this.authService.addBpjsKegiatan(bodyReq).subscribe(
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

              this.onLoadDataKegiatan(this.searchTglKegiatan);
              this.back();
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
    });
  }

  showDialogPeserta(kegiatan: any) {
    let dialogPeserta: HTMLDialogElement | null = document.getElementById(
      "dialogPeserta"
    ) as HTMLDialogElement;

    this.addPesertaForm.patchValue({
      eduId: kegiatan.eduId,
      noKartu: "",
    });

    // Check if the dialog element exists
    if (dialogPeserta) {
      dialogPeserta.showModal();
    }
  }

  onSubmitPeserta() {
    let formValue = this.addPesertaForm;
    let bodyReq = {
      eduId: formValue.get("eduID").value,
      noKartu: formValue.get("noKartu").value,
    };
    this.authService.addBpjsPesertaKegiatan(bodyReq).subscribe((data: any) => {
      if (!data.success) {
        // this.isProccessFailed = true
      } else {
        let dialogPeserta: HTMLDialogElement | null = document.getElementById(
          "dialogPeserta"
        ) as HTMLDialogElement;
        let successDialog: HTMLDialogElement | null = document.getElementById(
          "successDialog"
        ) as HTMLDialogElement;
        // Check if the dialog element exists
        if (dialogPeserta) dialogPeserta.close();
        this.successMsg = data["message"];
        successDialog.showModal();
      }
      (error: any) => {
        this.toastr.error(error.error.err, "Error");
      };
    });
  }

  onDeleteKegiatan(eduID: string): any {
    let successDialog: HTMLDialogElement | null = document.getElementById(
      "successDialog"
    ) as HTMLDialogElement;
    let failedDialog: HTMLDialogElement | null = document.getElementById(
      "failedDialog"
    ) as HTMLDialogElement;

    // Check if the dialog element exists

    this.authService.deleteBpjsKegiatan(eduID).subscribe(
      (data: any) => {
        if (!data.success) {
          this.isProccessFailed = true;
          if (failedDialog) {
            // Call the showModal() method on the dialog element
            failedDialog.showModal();
          } else {
            console.error("Dialog element not found.");
          }
        } else {
          this.isProccessFailed = false;
          if (successDialog) {
            // Call the showModal() method on the dialog element
            successDialog.showModal();
          } else {
            console.error("Dialog element not found.");
          }
          this.onLoadDataKegiatan(this.currentDate);
          location.reload;
        }
      },
      (error: any) => {
        this.toastr.error(error.error.err, "Error");
      }
    );
  }

  onDeletePesertaKegiatan(eduID: string, noKartu: string): any {
    let successDialog: HTMLDialogElement | null = document.getElementById(
      "successDialog"
    ) as HTMLDialogElement;
    let failedDialog: HTMLDialogElement | null = document.getElementById(
      "failedDialog"
    ) as HTMLDialogElement;

    // Check if the dialog element exists

    this.authService.deleteBpjsPesertaKegiatan(eduID, noKartu).subscribe(
      (data: any) => {
        if (!data.success) {
          this.isProccessFailed = true;
          if (failedDialog) {
            // Call the showModal() method on the dialog element
            failedDialog.showModal();
          } else {
            console.error("Dialog element not found.");
          }
        } else {
          this.isProccessFailed = false;
          if (successDialog) {
            // Call the showModal() method on the dialog element
            successDialog.showModal();
          } else {
            console.error("Dialog element not found.");
          }
          this.onLoadDataPesertaKegiatan(eduID);
          location.reload;
        }
      },
      (error: any) => {
        this.toastr.error(error.error.err, "Error");
      }
    );
  }

  deleteKegiatanDialog(kegiatan: any) {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, yakin",
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#91a7d0",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Mohon tunggu!");
        Swal.showLoading();
        this.authService.deleteBpjsKegiatan(kegiatan.eduId).subscribe(
          (data: any) => {
            Swal.close();
            if (data.success) {
              const msg =
                data.message && data.message != ""
                  ? data.message
                  : "Berhasil Menghapus Data";
              this.toastr.success(msg, "Sukses", {
                timeOut: 2000,
              });

              this.onLoadDataKegiatan(this.searchTglKegiatan);
            }
          },
          (err) => {
            Swal.close();
            const msg =
              err.error.err && err.error.err != ""
                ? err.error.err
                : "Gagal Menghapus Data";
            this.toastr.error(msg, "Error", {
              timeOut: 2000,
            });
          }
        );
      }
    });
  }

  deletePesertaDialog(peserta: any) {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus data ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, yakin",
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#91a7d0",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Mohon tunggu!");
        Swal.showLoading();
        this.authService
          .deleteBpjsPesertaKegiatan(peserta.eduId, peserta.noKartu)
          .subscribe(
            (data: any) => {
              Swal.close();
              if (data.success) {
                const msg =
                  data.message && data.message != ""
                    ? data.message
                    : "Berhasil Menghapus Data";
                this.toastr.success(msg, "Sukses", {
                  timeOut: 2000,
                });

                this.onLoadDataPesertaKegiatan(peserta.eduId);
              }
            },
            (err) => {
              Swal.close();
              const msg =
                err.error.err && err.error.err != ""
                  ? err.error.err
                  : "Gagal Menghapus Data";
              this.toastr.error(msg, "Error", {
                timeOut: 2000,
              });
            }
          );
      }
    });
  }

  getKegiatan(date: string) {
    Swal.fire("Mohon tunggu");
    Swal.showLoading();
    this.authService
      .getAllBpjsKegiatan(this.pipe.transform(date, "dd-MM-yyyy"))
      .subscribe(
        (data: any) => {
          this.listOfKegiatan = [];
          if (!data.success) {
            this.errorMsg = data["message"];
          } else {
            Swal.close();
            let dataRes = data.data.list;
            let convertedArray = dataRes.map((item) => {
              return {
                ...item,
              };
            });
            this.listOfKegiatan = convertedArray;
          }
        },
        (error: any) => {
          Swal.close();
          this.listOfKegiatan = [];
          this.errorMsg = error.error.err ?? null;
          this.toastr.error(this.errorMsg, "Error");
        }
      );
  }

  onSearchKegiatan() {
    Swal.fire({
      title: "Mohon Tunggu!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        this.getKegiatan(this.searchTglKegiatan);
      },
    }).then(
      () => {},
      (dismiss) => {}
    );
  }

  showFormKegiatan() {
    this.isShowFormKegiatan = true;
  }

  back() {
    this.selectedEduId = null;
    this.selectedClubID = null;
    this.isShowFormKegiatan = false;

    this.addKegiatanForm.patchValue({
      tglKegiatan: "",
      selectedKegiatan: "",
      materi: "",
      pembicara: "",
      lokasi: "",
      keterangan: "",
      biaya: "",
    });
  }
}
