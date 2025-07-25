import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiserviceService } from "src/app/apiservice.service";
import Swal from "sweetalert2";
import { NgbPanelChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import {
  NgbModal,
  ModalDismissReasons,
  NgbAccordionConfig,
} from "@ng-bootstrap/ng-bootstrap";

import { ActivatedRoute, Router } from "@angular/router";

import { skriningService } from "./skrining.service";

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
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-skrining",
  templateUrl: "./skrining.component.html",
  styleUrls: ["./skrining.component.css"],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    NgbAccordionConfig,
  ],
})
export class skriningComponent implements OnInit {
  @Input() norm: string;
  @Input() idpasien: string;
  @Input() notrans: string;

  userData: any = JSON.parse(localStorage.getItem("userDatacl")).userData;
  notransaksi: string = this.route.snapshot.paramMap.get("notrans");

  data_sdq = {
    total_kesulitan: 0,
    masalah_emosional: { listIndex: [2, 7, 12, 15, 23], skor: 0 },
    masalah_perilaku: { listIndex: [4, 6, 11, 17, 21], skor: 0 },
    hiperaktivitas: { listIndex: [1, 9, 14, 20, 24], skor: 0 },
    masalah_teman_sebaya: { listIndex: [5, 10, 13, 18, 22], skor: 0 },
    perilaku_pro_sosial: { listIndex: [0, 3, 8, 16, 19], skor: 0 },
  };

  heading = "Skrining";
  subheading: any;
  options: FormGroup;
  public userDetails: any;
  nama: any;
  akses: any;
  kdklinik: any;
  kdcabang: any;

  // this InputVar is a reference to our input.

  InputVar: ElementRef;
  closeResultModal: string;
  no_transaksi: string;
  no_rm: string;
  arrCluster: any = [];
  clusterId: number;
  arrSkrining: any = [];
  questions: any = [];
  titleModal: string;
  subTitleModal: string;
  subTitleNumber: string;

  patientData: any = {
    noantrian: "-",
    norm: "-",
    pasien: "-",
    umur: "-",
    tgllahir: "-",
    jeniskelamin: "-",
    nampoli: "-",
    costumer: "-",
    namdokter: "-",
    alamat: "-",
  };
  cabangData: any;
  useCaseId: any;
  screeningPatientId: null;
  screeningPatientData: any = {};
  idScreening: any;
  closeResultModalRiwayat: string;
  cekCategories: boolean = false;
  listPenurutanKognitif: any;
  dataHistory: any = [];
  closeResultModalDetailRiwayat: string;
  questionsDetail: any = [];
  cekCategoriesDetail: boolean = false;
  listPenurutanKognitifDetail: any;
  titleModalRiwayat: string;
  subTitleModalRiwayat: string;
  isShowSdqCalculator: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private serviceUrl: skriningService,
    private fb: FormBuilder,
    private NgbAccordionConfig: NgbAccordionConfig
  ) {
    NgbAccordionConfig.closeOthers = true;
    NgbAccordionConfig.type = "test";
    NgbAccordionConfig.animation = true;
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
  }

  ngOnInit() {
    this.getData();
    this.initPage();
    // this.ambilGroup();
  }

  showLoading() {
    Swal.fire("Mohon tunggu!");
    Swal.showLoading();
    this.stopLoading(5000);
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => {
      Swal.close();
    }, timing);
  }

  getData() {
    let body = {
      transactionNo: this.notrans,
      screeningId: "",
    };
    this.serviceUrl.getData(body).subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          this.screeningPatientId = data.data.screening_patient.id;
          this.screeningPatientData = data.data;
          this.ambilGroup();
        } else {
          this.screeningPatientId = null;
          this.screeningPatientData = {};
          this.ambilGroup();
        }
      },
      (error: any) => {
        if (error.error.statusCode === 404) {
          this.screeningPatientId = null;
          this.screeningPatientData = {};
          this.ambilGroup();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Gagal memuat data. Silakan coba lagi.",
          });
        }
      }
    );
  }

  getPasien() {
    return new Promise((resolve) => {
      this.authService
        .datapasien(this.userData.kdcabang, this.notransaksi)
        .subscribe((data) => {
          data.forEach((e) => {
            resolve(e);
          });
        });
    });
  }

  getCabang() {
    return new Promise((resolve) => {
      this.authService.cabangper(this.userData.kdklinik).subscribe((data) => {
        data.forEach((e) => {
          resolve(e);
        });
      });
    });
  }

  async initPage() {
    // this.showLoading()
    this.patientData = await this.getPasien();
    this.cabangData = await this.getCabang();
  }

  async ambilGroup() {
    try {
      let response: any = await this.serviceUrl.getGroup({
        // "rmno": "02-047-02",
        // "transactionNo": "12345"
        rmno: this.norm,
        transactionNo: this.notransaksi,
      });
      this.arrCluster = response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Gagal memuat data. Silakan coba lagi.",
      });
    }
  }

  async getScreeningById(idCluster) {
    this.arrSkrining = [];
    this.clusterId = idCluster;
    // const body = {
    //   "show_child" : "yes",
    //   "key_name":"cluster_id",
    //   "key_operator":"=",
    //   "key_value":this.clusterId,
    //   "max_row": 50,
    //   "order_by": "id",
    //   "order_type": "Asc"
    // }
    const body = {
      clusterId: this.clusterId,
      transactionNo: this.notransaksi,
    };
    // const body = {
    //   "clusterId" : 1,
    //   "transactionNo" : "12345"
    // }
    try {
      let response: any = await this.serviceUrl.getSkrinigById(body);
      this.arrSkrining = response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Gagal memuat data. Silakan coba lagi.",
      });
    }
  }

  openModal(content, data, cluster, subCluster, number) {
    this.titleModal = `${cluster} - ${subCluster}`;
    this.subTitleNumber = `${number}. `;
    this.subTitleModal = data.name;

    let mapQuestion = data.questionnaires.map((parent) => {
      return {
        ...parent,
        options: parent.options.map((child) => {
          let isChecked;
          if (parent.type == "reference") {
            isChecked = (parent.answered || []).includes(
              child.option_value.valueReference
            );
          }
          return {
            ...child,
            isChecked: isChecked,
          };
        }),
      };
    });

    mapQuestion = mapQuestion.filter((item, index, self) => {
      return (
        item.category !== "Penurutan Kognitif" ||
        index === self.findIndex((t) => t.category === "Penurutan Kognitif")
      );
    });

    this.listPenurutanKognitif = data.questionnaires
      .filter((item) => item.category == "Penurutan Kognitif")
      .map((item) => item.text);
    this.questions = mapQuestion;
    this.cekCategories = this.questions.some((q) => q.category);
    this.idScreening = data.id;

    this.doSdqCalculation(mapQuestion);

    this.modalService
      .open(content, { size: "xl", ariaLabelledBy: "modal" })
      .result.then(
        (result) => {
          this.closeResultModal = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResultModal = `Dismissed ${this.getDismissReasonModal(
            reason
          )}`;
        }
      );
  }

  private getDismissReasonModal(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  change() {}

  onCheckedCQuestions(value, index) {
    this.questions.forEach((item, idx) => {
      if (idx === index) {
        let arrAnswer = [];
        if (!item.answer) {
          arrAnswer.push(value);
        } else if (item.answer.lenght === 0) {
          arrAnswer.push(value);
        } else {
          arrAnswer = item.answer;
          const indexItem = item.answer.indexOf(value);
          if (indexItem !== -1) {
            arrAnswer.splice(indexItem, 1);
          } else {
            arrAnswer.push(value);
          }
        }
        item.answer = arrAnswer;
      }
    });
  }

  cekKelurahan() {
    if (!this.patientData?.kdkelurahan) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Pasien Belum Melengkapi Data Alamat",
      });
    } else {
      const slug = this.cabangData?.slug ?? "";
      const body = {
        villageId: this.patientData.kdkelurahan,
      };
      this.serviceUrl.getDataKelurahan(body, slug).subscribe(
        (data: any) => {
          console.log("kelurahan");
          console.log(data);
          if (data.data.subdistrict_id) {
            let dataKelurahan = data.data.subdistrict_id;
            this.registerAndSave(dataKelurahan);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Data Kelurahan Belum Di Mapping dengan Satu Sehat",
            });
          }
        },
        (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Terjadi Kesalahan Saat Mengunjungi Data Kelurahan",
          });
        }
      );
    }
  }

  registerAndSave(dataKelurahan) {
    const bodyReg = {
      data: {
        rmno: this.norm,
        orgId: this.cabangData.kodeorg,
        transactionNo: this.notransaksi,
        branchId: this.cabangData.kdcabang,
        villageId: dataKelurahan,
        patientId: this.idpasien,
        clusterId: this.clusterId,
        patientName: this.patientData.pasien,
        locationId: this.patientData.locationid,
        locationName: this.patientData.locationid,
        visitDate: this.patientData.tglpriksa,
        screening_ids: [],
      },
    };
    this.serviceUrl.register(bodyReg).subscribe(
      (data: any) => {
        if (data.statusCode == "00") {
          this.screeningPatientId = data.data.screening_patient_id;
          this.screeningPatientData = data.data;
          this.toastr.success("Berhasil Mendaftar Skrining", "Sukses", {
            timeOut: 3000,
          });
          setTimeout(() => {
            this.saveDataScreening();
          }, 500);
        } else if (data.statusCode == "02") {
          const errVilage = data?.data || {}; // Pastikan data.data ada
          const message =
            "data.villageId" in errVilage
              ? "Pasien tidak memiliki data Kelurahan"
              : "Data Pasien Belum Lengkap, Silakan Periksa Kembali.";
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Data Pasien Belum Lengkap, Silakan Periksa Kembali.",
          });
        }
      },
      (error: any) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Gagal menyimpan data. Silakan coba lagi.",
        });
      }
    );
  }

  simpan() {
    if (this.screeningPatientId === null) {
      this.cekKelurahan();
    } else {
      this.saveDataScreening();
    }
  }

  doSdqCalculation(data1: any) {
    const sdqTitle =
      "Skrining Instrument Strength and Difficulties Questionnaire (SDQ) Usia lebih dari atau sama dengan";

    this.isShowSdqCalculator =
      this.subTitleModal?.includes(sdqTitle) ||
      this.subTitleModalRiwayat?.includes(sdqTitle);

    if (this.isShowSdqCalculator) {
      this.data_sdq.masalah_emosional.skor = this.calculateScore(
        this.data_sdq.masalah_emosional,
        data1
      );
      this.data_sdq.masalah_perilaku.skor = this.calculateScore(
        this.data_sdq.masalah_perilaku,
        data1
      );
      this.data_sdq.hiperaktivitas.skor = this.calculateScore(
        this.data_sdq.hiperaktivitas,
        data1
      );
      this.data_sdq.masalah_teman_sebaya.skor = this.calculateScore(
        this.data_sdq.masalah_teman_sebaya,
        data1
      );
      this.data_sdq.perilaku_pro_sosial.skor = this.calculateScore(
        this.data_sdq.perilaku_pro_sosial,
        data1
      );

      this.data_sdq.total_kesulitan =
        this.data_sdq.masalah_emosional.skor +
        this.data_sdq.masalah_perilaku.skor +
        this.data_sdq.hiperaktivitas.skor +
        this.data_sdq.masalah_teman_sebaya.skor;
    }
  }

  private calculateScore(category, data) {
    return data
      .map((item) => {
        let result = 0;
        if (
          item.answered === "selalu_benar" ||
          item.answer === "selalu_benar"
        ) {
          result = 2;
        } else if (
          item.answered === "agak_benar" ||
          item.answer === "agak_benar"
        ) {
          result = 1;
        } else {
          result = 0;
        }
        return result;
      })
      .filter((_, index) => category.listIndex.includes(index))
      .reduce((acc, current) => acc + current, 0);
  }

  saveDataScreening() {
    const mapQuesioner = this.questions.map((item) => {
      let finalAnswer;
      if (item.type == "reference") {
        const ftrChecked = item.options
          .filter((child) => child.isChecked === true)
          .map((child) => child.option_value.valueReference);

        finalAnswer = ftrChecked;
      } else {
        finalAnswer = item.answered;
      }
      return {
        id: item.id,
        type: item.type,
        answer: finalAnswer,
      };
    });
    const body = {
      screening_patient: {
        id: this.screeningPatientId,
        cluster_id: this.clusterId,
      },
      screening_data: [
        {
          screening_id: this.idScreening,
          questionnaires: mapQuesioner,
        },
      ],
    };

    this.serviceUrl.saveScreening(body).subscribe(
      (data: any) => {
        if (data.statusCode == "200") {
          // Swal.fire({
          //   position: "center",
          //   icon: "success",
          //   title: "<small>Data Skrining Berhasil Di Simpan</small>",
          //   showConfirmButton: false,
          //   timer: 3000,
          // });
          this.toastr.success("Data Skrining Berhasil Di Simpan", "Sukses", {
            timeOut: 3000,
          });
          document.getElementById("closeModal").click();
          this.ambilGroup();
          setTimeout(() => {
            this.getScreeningById(this.clusterId);
          }, 300);
        } else if (data.statusCode == "03") {
          Swal.fire({
            icon: "error",
            title: "Error!",
            html: `
              Harap Melakukan Skrining di:<br>
              <strong>${
                this.screeningPatientData?.screening_patient?.cluster.group ??
                ""
              }</strong><br>
              ${
                this.screeningPatientData?.screening_patient?.cluster.name ?? ""
              }`,
          });
        } else {
        }
      },
      (error: any) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.error.statusMsg,
        });
      }
    );
  }

  openModalRiwayat(content, skriId) {
    this.getDataHistory(skriId);
    this.modalService
      .open(content, { size: "xl", ariaLabelledBy: "modal-riwayat" })
      .result.then(
        (result) => {
          this.closeResultModalRiwayat = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResultModalRiwayat = `Dismissed ${this.getDismissReasonModalRiwayat(
            reason
          )}`;
        }
      );
  }

  private getDismissReasonModalRiwayat(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  getDataHistory(skrinId) {
    const body = {
      rmno: this.norm,
      screeningId: skrinId,
      transactionNo: "",
    };
    this.serviceUrl.getDataHistory(body).subscribe(
      (data: any) => {
        const filteredData = data.data.filter(
          (item) => item.screening_data && item.screening_data.length > 0
        );
        this.dataHistory = filteredData;
      },
      (error: any) => {
        console.log(error.error.statusMsg);
      }
    );
  }

  openModalDetailRiwayat(
    content,
    questionnaires,
    screening_name,
    group,
    cluster
  ) {
    this.titleModalRiwayat = `${group} - ${cluster}`;
    this.subTitleModalRiwayat = `${screening_name}`;

    let mapQuestion = questionnaires.map((parent) => {
      return {
        ...parent,
        options: parent.options.map((child) => {
          let isChecked;
          if (parent.type == "reference") {
            isChecked = (parent.answer || []).includes(
              child.option_value.valueReference
            );
          }
          return {
            ...child,
            isChecked: isChecked,
          };
        }),
      };
    });

    mapQuestion = mapQuestion.filter((item, index, self) => {
      return (
        item.category !== "Penurutan Kognitif" ||
        index === self.findIndex((t) => t.category === "Penurutan Kognitif")
      );
    });

    this.listPenurutanKognitifDetail = questionnaires
      .filter((item) => item.category == "Penurutan Kognitif")
      .map((item) => item.text);
    this.questionsDetail = mapQuestion;
    this.cekCategoriesDetail = this.questions.some((q) => q.category);
    this.doSdqCalculation(mapQuestion);

    this.modalService
      .open(content, { size: "xl", ariaLabelledBy: "modal-riwayat" })
      .result.then(
        (result) => {
          this.closeResultModalDetailRiwayat = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResultModalDetailRiwayat = `Dismissed ${this.getDismissReasonModalDetailRiwayat(
            reason
          )}`;
        }
      );
  }

  private getDismissReasonModalDetailRiwayat(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
