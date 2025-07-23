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
import { ApiserviceService } from "src/app/apiservice.service";
import Swal from "sweetalert2";
import { HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";
import { ToastrService } from "ngx-toastr";
import { PkgService } from "./pkg.service";
import { SkriningMandiriTuberkulosisBayiComponent } from "./form/skrining-mandiri-tumbuh-kembang-tuberkulosis-bayi/skrining-mandiri-tumbuh-kembang-tuberkulosis.component";
import { SkriningGiziPertumbuhanComponent } from "./form/skrining-gizi-pertumbuhan/skrining-gizi-pertumbuhan.component";
import { SkriningTumbuhKembangPerkembanganComponent } from "./form/skrining-perkembangan/skrining-tumbuh-kembang-perkembangan.component";
import { SkriningGigiKariesComponent } from "./form/skrining-gigi-karies/skrining-gigi-karies.component";
import { SkriningTumbuhKembangMataTelinga } from "./form/skrining-tumbuh-kembang-mata-telinga/skrining-tumbuh-kembang-mata-telinga.component";
import { SkriningTuberkulosisComponent } from "./form/skrining-tuberkulosis/skrining-tuberkulosis.component";
import { DashboardPkgService } from "./dashboard/dashboard-pkg/dashboard-pkg-service";
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
      nama: "Skrining Tuberkulosis (Balita umur 1 tahun)",
      form: SkriningMandiriTuberkulosisBayiComponent,
      fields: SkriningMandiriTuberkulosisBayiComponent.fields,
      ceklistUsia: {
        "18-29": true,
        "30-39": true,
        "40-59": true,
        ">=60": true,
      },
      status: "Belum Diperiksa",
    },
    // {
    //   nama: "Demografi Dewasa Laki-Laki",
    //   form: FormDemografiPriaComponent,
    //   status: "Belum Diperiksa",
    // },
    // {
    //   nama: "Demografi Dewasa Perempuan",
    //   form: FormDemografiWanitaComponent,
    //   status: "Belum Diperiksa",
    // },
    // { nama: "Hati", form: FormHatiComponent, status: "Belum Diperiksa" },
    // {
    //   nama: "Kanker UsusKangker Usus (> 40tahun)",
    //   form: FormKankerUsusComponent,
    //   status: "Belum Diperiksa",
    // },
    // {
    //   nama: "Kanker Leher Rahim",
    //   form: FormLeherRahimComponent,
    //   status: "Belum Diperiksa",
    // },
    // {
    //   nama: "Kesehatan Jiwa",
    //   form: FormKesehatanJiwaComponent,
    //   status: "Belum Diperiksa",
    // },
    // {
    //   nama: "Tingkat Aktivitas Fisik",
    //   form: FormAktivitasFisikComponent,
    //   status: "Belum Diperiksa",
    // },
    // {
    //   nama: "Perilaku Merokok",
    //   form: FormPerilakuMerokokComponent,
    //   status: "Belum Diperiksa",
    // },
    // {
    //   nama: "Tekanan Darah & Gula Darah",
    //   form: FormTekananGulaDarahComponent,
    //   status: "Belum Diperiksa",
    // },
    // {
    //   nama: "Tuberkulosis",
    //   form: FormTuberkulosisComponent,
    //   status: "Belum Diperiksa",
    // },
  ];

  daftarLayanan = [
    {
      nama: "Skrining Pertumbuhan, Perkembangan, Gigi, Tuberkulosis, Mata dan Telinga (Balita umur 1 tahun)",
      jenisKelamin: "P",
      ceklistUsia: {
        "0-1": true,
        "18-29": false,
        "30-39": false,
        "40-59": false,
        ">=60": false,
      },
      childs: [
        {
          nama: "Skrining Pertumbuhan",
          form: SkriningGiziPertumbuhanComponent,
          fields: SkriningGiziPertumbuhanComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Skrining Perkembangan",
          form: SkriningTumbuhKembangPerkembanganComponent,
          fields: SkriningTumbuhKembangPerkembanganComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Skrining Mata dan Telinga",
          form: SkriningTumbuhKembangMataTelinga,
          fields: SkriningTumbuhKembangMataTelinga.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Skrining Gigi",
          form: SkriningGigiKariesComponent,
          fields: SkriningGigiKariesComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
        {
          nama: "Skrining Tuberkulosis",
          form: SkriningTuberkulosisComponent,
          fields: SkriningTuberkulosisComponent.fields,
          status: "Belum Diperiksa",
          dipilih: false,
        },
      ],
    },
    // {
    //   nama: "Skrining Pertumbuhan, Perkembangan, Gigi, Tuberkulosis, Mata dan Telinga (Balita umur 2 tahun)",
    //   jenisKelamin: "P",
    //   ceklistUsia: {
    //     "0-1": true,
    //     "18-29": false,
    //     "30-39": false,
    //     "40-59": false,
    //     ">=60": false,
    //   },
    //   childs: [
    //     {
    //       nama: "Skrining Pertumbuhan",
    //       form: SkriningGiziPertumbuhanComponent,
    //       fields: SkriningGiziPertumbuhanComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Skrining Perkembangan",
    //       form: SkriningTumbuhKembangPerkembanganComponent,
    //       fields: SkriningTumbuhKembangPerkembanganComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Skrining Mata dan Telinga",
    //       form: SkriningTumbuhKembangMataTelinga,
    //       fields: SkriningTumbuhKembangMataTelinga.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Skrining Gigi",
    //       form: SkriningGigiKariesComponent,
    //       fields: SkriningGigiKariesComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Skrining Tuberkulosis",
    //       form: SkriningTuberkulosisComponent,
    //       fields: SkriningTuberkulosisComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Skrining Gula Darah",
    //       form: SkriningTuberkulosisComponent,
    //       fields: SkriningTuberkulosisComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Skrining Talasemia (Rapid Test Hemoglobin)",
    //       form: SkriningTuberkulosisComponent,
    //       fields: SkriningTuberkulosisComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Skrining Lanjutan Talasemia",
    //       form: SkriningTuberkulosisComponent,
    //       fields: SkriningTuberkulosisComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Skrining Gizi, Tekanan Darah, dan Gula Darah Perempuan ≥ 40 tahun",
    //   jenisKelamin: "P",
    //   ceklistUsia: {
    //     "18-29": true,
    //     "30-39": true,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Gizi (BB - TB - Lingkar Perut)",
    //       form: FormGiziComponent,
    //       fields: FormGiziComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Pemeriksaan Tekanan Darah",
    //       form: FormTekananDarahComponent,
    //       fields: FormTekananDarahComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Skrining Gula Darah",
    //       form: FormSkriningGulaDarahComponent,
    //       fields: FormSkriningGulaDarahComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Pemeriksaan PPOK (Skrining PUMA)",
    //   jenisKelamin: "L/P",
    //   ceklistUsia: {
    //     "18-29": true,
    //     "30-39": true,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Pemeriksaan PPOK (Skrining PUMA)",
    //       form: FormPpokPumaComponent,
    //       fields: FormPpokPumaComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Pemeriksaan Tuberkulosis",
    //   jenisKelamin: "L/P",
    //   ceklistUsia: {
    //     "18-29": true,
    //     "30-39": true,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Pemeriksaan Sputum - Tuberkulosis",
    //       form: FormSputumTbcComponent,
    //       fields: FormSputumTbcComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Tindak Lanjut Tuberkulosis - Foto Thorax",
    //       form: FormFotoThoraxComponent,
    //       fields: FormFotoThoraxComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Skrining Laboratorium ≥ 40 tahun Fungsi Ginjal, Hati, Profil Lipid",
    //   jenisKelamin: "L/P",
    //   ceklistUsia: {
    //     "18-29": false,
    //     "30-39": false,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Pemeriksaan Fibrosis / Sirosis Hati",
    //       form: FormSirosisHatiComponent,
    //       fields: FormSirosisHatiComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Pemeriksaan Fungsi Ginjal (hanya untuk risiko HT DM)",
    //       form: FormFungsiGinjalComponent,
    //       fields: FormFungsiGinjalComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Pemeriksaan Gula Darah Lanjutan (GDP & GD 2 PP)",
    //       form: FormGulaDarahLanjutanGdpComponent,
    //       fields: FormGulaDarahLanjutanGdpComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Pemeriksaan Gula Darah Lanjutan (HbA1C)",
    //       form: FormGulaDarahLanjutanHba1cComponent,
    //       fields: FormGulaDarahLanjutanHba1cComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Pemeriksaan Hepatitis",
    //       form: FormHepatitisComponent,
    //       fields: FormHepatitisComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Profil Lipid (hanya untuk penyandang HT dan/atau DM)",
    //       form: FormProfilLipidComponent,
    //       fields: FormProfilLipidComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Prediksi Risiko Jantung dan Stroke",
    //   jenisKelamin: "L/P",
    //   ceklistUsia: {
    //     "18-29": false,
    //     "30-39": false,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Prediksi Risiko Jantung dan Stroke",
    //       form: FormRisikoJantungStrokeComponent,
    //       fields: FormRisikoJantungStrokeComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Pemeriksaan Rapid Test Calon Pengantin",
    //   jenisKelamin: "L/P",
    //   ceklistUsia: {
    //     "18-29": true,
    //     "30-39": true,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Pemeriksaan Rapid Test Calon Pengantin",
    //       form: FormRapidTestCapinComponent,
    //       fields: FormRapidTestCapinComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Skrining Telinga dan Mata ≥ 40 tahun",
    //   jenisKelamin: "L/P",
    //   ceklistUsia: {
    //     "18-29": false,
    //     "30-39": false,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Skrining Mata dan Telinga ≥ 40 tahun",
    //       form: FormMataTelingaComponent,
    //       fields: FormMataTelingaComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Skrining Gigi - Dewasa ≥ 25 tahun",
    //   jenisKelamin: "L/P",
    //   ceklistUsia: {
    //     "18-29": true,
    //     "30-39": true,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Skrining Karies dan Gigi Hilang",
    //       form: FormKariesGigiHilangComponent,
    //       fields: FormKariesGigiHilangComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Skrining Jantung (Pemeriksaan EKG - hanya penyandang Hipertensi)",
    //   jenisKelamin: "L/P",
    //   ceklistUsia: {
    //     "18-29": false,
    //     "30-39": false,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Detail Abnormalitas - Skrining Jantung",
    //       form: FormAbnormalitasJantungComponent,
    //       fields: FormAbnormalitasJantungComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Hasil Pemeriksaan - Skrining Jantung",
    //       form: FormHasilEkgComponent,
    //       fields: FormHasilEkgComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Skrining Kanker Payudara",
    //   jenisKelamin: "P",
    //   ceklistUsia: {
    //     "18-29": false,
    //     "30-39": true,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Skrining Kanker Payudara",
    //       form: FormKankerPayudaraComponent,
    //       fields: FormKankerPayudaraComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
    // {
    //   nama: "Skrining Kanker Leher Rahim",
    //   jenisKelamin: "P",
    //   ceklistUsia: {
    //     "18-29": false,
    //     "30-39": true,
    //     "40-59": true,
    //     ">=60": true,
    //   },
    //   childs: [
    //     {
    //       nama: "Hasil Pemeriksaan HPV - DNA",
    //       form: FormHpvDnaComponent,
    //       fields: FormHpvDnaComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //     {
    //       nama: "Hasil Pemeriksaan Inspeksius dan IVA",
    //       form: FormIvaComponent,
    //       fields: FormIvaComponent.fields,
    //       status: "Belum Diperiksa",
    //       dipilih: false,
    //     },
    //   ],
    // },
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
  norm: string = this.route.snapshot.paramMap.get("norm");
  isLoading: boolean;
  golonganDarah: string;
  rentangUsia = "";
  usiaPasienFilterLayanan: number = 0;
  jenisKelaminFilterLayanan: any;

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
    private dashboardPkgService: DashboardPkgService,
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

  getRentangUsia(usia: number): string {
    if (usia >= 18 && usia <= 29) return "18-29";
    if (usia >= 30 && usia <= 39) return "30-39";
    if (usia >= 40 && usia <= 59) return "40-59";
    if (usia >= 60) return ">=60";
    return "";
  }

  filterDaftarLayanan() {
    // this.daftarLayanan = this.daftarLayanan.filter((layanan: any) => {
    //   const cocokUsia = layanan.ceklistUsia[this.rentangUsia];
    //   const cocokJK =
    //     layanan.jenisKelamin === "L/P" ||
    //     layanan.jenisKelamin === this.jenisKelaminFilterLayanan;
    //   return cocokUsia && cocokJK;
    // });
  }

  async doCreateKunjungan() {
    this.showLoading();
    this.patientData = await this.getPasien();
    console.log(this.patientData);
    this.cabangData = await this.getCabang();

    this.usiaPasienFilterLayanan = this.hitungUsia(
      this.patientData.tgllahir
    ).tahun;
    this.jenisKelaminFilterLayanan = this.patientData.jeniskelamin;
    this.rentangUsia = this.getRentangUsia(this.usiaPasienFilterLayanan);
    this.filterDaftarLayanan();

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

    this.dashboardPkgService
      .createDashboardPkg({
        norm: this.norm,
        notransaksi: this.notransaksi,
        layanan: "Kehadiran Pkg",
        status: "kehadiran",
      })
      .toPromise();

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

    this.perbaruiStatusLayanan(response?.data?.observations);

    this.stopLoading();
  }

  hitungUsia(tglLahirStr: string): {
    tahun: number;
    bulan: number;
    hari: number;
  } {
    const tglLahir = new Date(tglLahirStr);
    const hariIni = new Date();

    // Cek apakah tglLahir adalah tanggal yang valid
    if (isNaN(tglLahir.getTime())) {
      return { tahun: 0, bulan: 0, hari: 0 };
    }

    let tahun = hariIni.getFullYear() - tglLahir.getFullYear();
    let bulan = hariIni.getMonth() - tglLahir.getMonth();
    let hari = hariIni.getDate() - tglLahir.getDate();

    if (hari < 0) {
      bulan--;
      hari += new Date(hariIni.getFullYear(), hariIni.getMonth(), 0).getDate();
    }

    if (bulan < 0) {
      tahun--;
      bulan += 12;
    }

    return { tahun, bulan, hari };
  }

  perbaruiStatusLayanan(dataObservasi: any) {
    if (!Array.isArray(dataObservasi)) {
      return;
    }

    this.daftarPemeriksaanMandiri.forEach((layanan: any) => {
      layanan.fields.forEach((field: any) => {
        const ditemukan = dataObservasi.some(
          (observasi: any) => observasi.name === field
        );

        if (ditemukan) {
          layanan.status = "Sudah Diperiksa";
        }
      });
    });

    this.daftarLayanan.forEach((layanan: any) => {
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
