import { Component, OnInit, TemplateRef, Type } from "@angular/core";
import { NgbAccordionConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
import { ModalWrapperComponent } from "./components/modal-wrapper/modal-wrapper.component";
import { FormGiziComponent } from "./form/form-gizi/form-gizi.component";
import { FormGiziPriaComponent } from "./form/form-gizi-pria/form-gizi-pria.component";
import { FormGiziWanitaComponent } from "./form/form-gizi-wanita/form-gizi-wanita.component";
import { FormDemografiWanitaComponent } from "./form/form-demografi-wanita/form-demografi-wanita.component";
import { FormDemografiPriaComponent } from "./form/form-demografi-pria/form-demografi-pria.component";
import { FormHatiComponent } from "./form/form-hati/form-hati.component";
import { FormLeherRahimComponent } from "./form/form-leher-rahim/form-leher-rahim.component";
import { FormKesehatanJiwaComponent } from "./form/form-kesehatan-jiwa/form-kesehatan-jiwa.component";
import { FormAktivitasFisikComponent } from "./form/form-aktivitas-fisik/form-aktivitas-fisik.component";
import { FormPerilakuMerokokComponent } from "./form/form-perilaku-merokok/form-perilaku-merokok.component";
import { FormTekananGulaComponent } from "./form/form-tekanan-gula/form-tekanan-gula.component";
import { FormTuberkulosisComponent } from "./form/form-tuberkulosis/form-tuberkulosis.component";
import { FormTekananDarahComponent } from "./form/form-tekanan-darah/form-tekanan-darah.component";
import { FormPpokPumaComponent } from "./form/form-ppok-puma/form-ppok-puma.component";
import { FormSputumTbcComponent } from "./form/form-sputum-tbc/form-sputum-tbc.component";
import { FormSirosisHatiComponent } from "./form/form-sirosis-hati/form-sirosis-hati.component";
import { FormFungsiGinjalComponent } from "./form/form-fungsi-ginjal/form-fungsi-ginjal.component";
import { FormGulaDarahLanjutanGdpComponent } from "./form/form-gula-darah-lanjutan-gdp/form-gula-darah-lanjutan-gdp.component";
import { FormGulaDarahLanjutanHba1cComponent } from "./form/form-gula-darah-lanjutan-hba1c/form-gula-darah-lanjutan-hba1c.component";
import { FormHepatitisComponent } from "./form/form-hepatitis/form-hepatitis.component";
import { FormProfilLipidComponent } from "./form/form-profil-lipid/form-profil-lipid.component";
import { FormRisikoJantungStrokeComponent } from "./form/form-risiko-jantung-stroke/form-risiko-jantung-stroke.component";
import { FormRapidTestCapinComponent } from "./form/form-rapid-test-capin/form-rapid-test-capin.component";
import { FormMataTelingaComponent } from "./form/form-mata-telinga/form-mata-telinga.component";
import { FormKariesGigiHilangComponent } from "./form/form-karies-gigi-hilang/form-karies-gigi-hilang.component";
import { FormPeriodontalComponent } from "./form/form-periodontal/form-periodontal.component";
import { FormAbnormalitasJantungComponent } from "./form/form-abnormalitas-jantung/form-abnormalitas-jantung.component";
import { FormHasilEkgComponent } from "./form/form-hasil-ekg/form-hasil-ekg.component";
import { FormKankerPayudaraComponent } from "./form/form-kanker-payudara/form-kanker-payudara.component";
import { FormHpvDnaComponent } from "./form/form-hpv-dna/form-hpv-dna.component";
import { FormIvaComponent } from "./form/form-iva/form-iva.component";
import { FormTekananGulaDarahComponent } from "./form/form-tekanan-gula-darah/form-tekanan-gula-darah.component";
import { FormKankerUsusComponent } from "./form/form-kanker-usus/form-kanker-usus.component";
import { FormSkriningGulaDarahComponent } from "./form/form-skrining-gula-darah/form-skrining-gula-darah.component";
import { FormFotoThoraxComponent } from "./form/form-foto-thorax/form-foto-thorax.component";
import { ApiserviceService } from "src/app/apiservice.service";
import Swal from "sweetalert2";
import { HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";
import { ToastrService } from "ngx-toastr";
import { PkgService } from "./pkg.service";

@Component({
  selector: "app-pkg",
  templateUrl: "./pkg.component.html",
  styleUrls: ["./pkg.component.css"],
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
export class pkgComponent implements OnInit {
  DELAY = 10;
  closeResultModal: string;
  modalTitle: any;
  modalContent: TemplateRef<any>;

  daftarPemeriksaanMandiri = [
    {
      nama: "Demografi Dewasa Laki-Laki",
      form: FormDemografiPriaComponent,
      status: "Belum Diperiksa",
    },
    {
      nama: "Demografi Dewasa Perempuan",
      form: FormDemografiWanitaComponent,
      status: "Belum Diperiksa",
    },
    { nama: "Hati", form: FormHatiComponent, status: "Belum Diperiksa" },
    {
      nama: "Kanker UsusKangker Usus (> 40tahun)",
      form: FormKankerUsusComponent,
      status: "Belum Diperiksa",
    },
    {
      nama: "Kanker Leher Rahim",
      form: FormLeherRahimComponent,
      status: "Belum Diperiksa",
    },
    {
      nama: "Kesehatan Jiwa",
      form: FormKesehatanJiwaComponent,
      status: "Belum Diperiksa",
    },
    {
      nama: "Tingkat Aktivitas Fisik",
      form: FormAktivitasFisikComponent,
      status: "Belum Diperiksa",
    },
    {
      nama: "Perilaku Merokok",
      form: FormPerilakuMerokokComponent,
      status: "Belum Diperiksa",
    },
    {
      nama: "Tekanan Darah & Gula Darah",
      form: FormTekananGulaDarahComponent,
      status: "Belum Diperiksa",
    },
    {
      nama: "Tuberkulosis",
      form: FormTuberkulosisComponent,
      status: "Belum Diperiksa",
    },
  ];

  daftarLayanan = [
    {
      nama: "Skrining Gizi, Tekanan Darah, dan Gula Darah Perempuan ≥ 40 tahun",
      childs: [
        {
          nama: "Gizi (BB - TB - Lingkar Perut)",
          form: FormGiziComponent,
          fields: FormGiziComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Pemeriksaan Tekanan Darah",
          form: FormTekananDarahComponent,
          fields: FormTekananDarahComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Skrining Gula Darah",
          form: FormSkriningGulaDarahComponent,
          fields: FormSkriningGulaDarahComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
    {
      nama: "Pemeriksaan PPOK (Skrining PUMA)",
      childs: [
        {
          nama: "Pemeriksaan PPOK (Skrining PUMA)",
          form: FormPpokPumaComponent,
          fields: FormPpokPumaComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
    {
      nama: "Pemeriksaan Tuberkulosis",
      childs: [
        {
          nama: "Pemeriksaan Sputum - Tuberkulosis",
          form: FormSputumTbcComponent,
          fields: FormSputumTbcComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Tindak Lanjut Tuberkulosis - Foto Thorax",
          form: FormFotoThoraxComponent,
          fields: FormFotoThoraxComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
    {
      nama: "Skrining Laboratorium ≥ 40 tahun Fungsi Ginjal, Hati, Profil Lipid",
      childs: [
        {
          nama: "Pemeriksaan Fibrosis / Sirosis Hati",
          form: FormSirosisHatiComponent,
          fields: FormSirosisHatiComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Pemeriksaan Fungsi Ginjal (hanya untuk risiko HT DM)",
          form: FormFungsiGinjalComponent,
          fields: FormFungsiGinjalComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Pemeriksaan Gula Darah Lanjutan (GDP & GD 2 PP)",
          form: FormGulaDarahLanjutanGdpComponent,
          fields: FormGulaDarahLanjutanGdpComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Pemeriksaan Gula Darah Lanjutan (HbA1C)",
          form: FormGulaDarahLanjutanHba1cComponent,
          fields: FormGulaDarahLanjutanHba1cComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Pemeriksaan Hepatitis",
          form: FormHepatitisComponent,
          fields: FormHepatitisComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Profil Lipid (hanya untuk penyandang HT dan/atau DM)",
          form: FormProfilLipidComponent,
          fields: FormProfilLipidComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
    {
      nama: "Prediksi Risiko Jantung dan Stroke",
      childs: [
        {
          nama: "Prediksi Risiko Jantung dan Stroke",
          form: FormRisikoJantungStrokeComponent,
          fields: FormRisikoJantungStrokeComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
    {
      nama: "Pemeriksaan Rapid Test Calon Pengantin",
      childs: [
        {
          nama: "Pemeriksaan Rapid Test Calon Pengantin",
          form: FormRapidTestCapinComponent,
          fields: FormRapidTestCapinComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
    {
      nama: "Skrining Telinga dan Mata ≥ 40 tahun",
      childs: [
        {
          nama: "Skrining Mata dan Telinga ≥ 40 tahun",
          form: FormMataTelingaComponent,
          fields: FormMataTelingaComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
    {
      nama: "Skrining Gigi - Dewasa ≥ 25 tahun",
      childs: [
        {
          nama: "Skrining Karies dan Gigi Hilang",
          form: FormKariesGigiHilangComponent,
          fields: FormKariesGigiHilangComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        }
      ],
    },
    {
      nama: "Skrining Jantung (Pemeriksaan EKG - hanya penyandang Hipertensi)",
      childs: [
        {
          nama: "Detail Abnormalitas - Skrining Jantung",
          form: FormAbnormalitasJantungComponent,
          fields: FormAbnormalitasJantungComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Hasil Pemeriksaan - Skrining Jantung",
          form: FormHasilEkgComponent,
          fields: FormHasilEkgComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
    {
      nama: "Skrining Kanker Payudara",
      childs: [
        {
          nama: "Skrining Kanker Payudara",
          form: FormKankerPayudaraComponent,
          fields: FormKankerPayudaraComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
    {
      nama: "Skrining Kanker Leher Rahim",
      childs: [
        {
          nama: "Hasil Pemeriksaan HPV - DNA",
          form: FormHpvDnaComponent,
          fields: FormHpvDnaComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Hasil Pemeriksaan Inspeksius dan IVA",
          form: FormIvaComponent,
          fields: FormIvaComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
  ];

  patientData: any;
  cabangData: any;
  idpasien: any;
  isDisabledForm: boolean;
  userData: any = JSON.parse(localStorage.getItem("userDatacl")).userData;
  useCaseId: any;
  encounterId: any;
  headers = new HttpHeaders({
    "kd-cabang": this.userData.kdcabang,
  });
  notransaksi: string = this.route.snapshot.paramMap.get("notrans");
  isLoading: boolean;
  golonganDarah: string;

  get jumlahPemeriksaanNakes(): number {
    return 0;
  }

  get jumlahSelesai(): number {
    return this.daftarPemeriksaanMandiri.filter(
      (item) => item.status === "Sudah Diperiksa"
    ).length;
  }

  constructor(
    private modalService: NgbModal,
    private api: ApiserviceService,
    private PkgService: PkgService,
    private toast: ToastrService,
    private ancService: AncService,
    private route: ActivatedRoute
  ) {}

  openDynamicModal(component: Type<any>, data: any) {
    const modalRef = this.modalService.open(ModalWrapperComponent, {
      size: "xl",
    });

    modalRef.componentInstance.componentToRender = component;
    modalRef.componentInstance.data = {
      useCaseId: this.useCaseId,
      encounterId: this.encounterId,
      idpasien: this.idpasien,
      notransaksi: this.notransaksi,
      satusehatId: this.patientData.idsatusehat,
    };
  }

  ngOnInit() {
    this.doCreateKunjungan();
  }

  async doCreateKunjungan() {
    this.showLoading();
    this.patientData = await this.getPasien();
    this.cabangData = await this.getCabang();

    if (!this.patientData.idpasien) {
      let idpasien = await this.getPasienSatuSehat();
      if (!idpasien) {
        Swal.fire("Data Pasien Tidak ditemukan di SatuSehat");
      } else {
        this.idpasien = idpasien;
        this.isDisabledForm = false;
      }
    } else {
      this.idpasien = this.patientData.idpasien;
      this.isDisabledForm = false;
    }

    let response: any = await this.PkgService.createKunjungan({
      data: {
        rmno: this.notransaksi,
        orgId: this.cabangData.kodeorg,
        patientId: this.idpasien,
        patientName: this.patientData.pasien,
        practitionerId: this.patientData.idhis,
        practitionerName: this.patientData.namdokter,
        locationId: this.patientData.locationid,
        requestCode: "PKG-REG",
        locationName: "PKG",
        satusehatId: this.patientData.idsatusehat,
      },
    });
    this.useCaseId = response.data.use_case_id;
    this.encounterId = response.data.encounter_id;
    this.getDataPatient();
  }

  async getDataPatient() {
    let response: any = await this.ancService.getDataPatient({
      patientId: this.idpasien,
      rmno: this.notransaksi,
      usecase_id: this.useCaseId,
      type: "PKG-REG",
      status: "active",
    });

    this.perbaruiStatusLayanan(
      this.daftarLayanan,
      response?.data?.observations
    );

    this.stopLoading();
  }

  perbaruiStatusLayanan(daftarLayanan: any, dataObservasi: any) {
    daftarLayanan.forEach((layanan: any) => {
      layanan.childs.forEach((child: any) => {
        child.fields.forEach((field: any) => {
          const ditemukan = dataObservasi.some(
            (observasi: any) => observasi.name === field
          );

          if (ditemukan) {
            child.status = "Sudah Diperiksa";
            child.dipilih = true;
          }
        });
      });
    });
  }

  getPasienSatuSehat() {
    return new Promise((resolve) => {
      this.api
        .getpasien(this.patientData.nopengenal, this.headers)
        .subscribe((data) => {
          if (data.entry.length !== 0) {
            resolve(data.entry[0].resource.id);
          }
        });
    });
  }

  getPasien() {
    return new Promise((resolve) => {
      this.api
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
      this.api.cabangper(this.userData.kdklinik).subscribe((data) => {
        data.forEach((e) => {
          resolve(e);
        });
      });
    });
  }

  showLoading() {
    // Swal.fire("Mohon tunggu!");
    // Swal.showLoading();
    this.isLoading = true;
    this.stopLoading(3000);
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => {
      this.isLoading = false;
      Swal.close();
    }, timing);
  }
}
