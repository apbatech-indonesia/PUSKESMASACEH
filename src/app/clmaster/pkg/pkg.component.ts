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
  closeResultModal: string;
  modalTitle: any;
  modalContent: TemplateRef<any>;

  daftarPemeriksaan = [
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
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Gizi (BB - TB - Lingkar Perut)",
          dipilih: true,
          form: FormGiziComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Pemeriksaan Tekanan Darah",
          dipilih: true,
          form: FormTekananDarahComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Skrining Gula Darah",
          dipilih: true,
          form: FormSkriningGulaDarahComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
    {
      nama: "Pemeriksaan PPOK (Skrining PUMA)",
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Pemeriksaan PPOK (Skrining PUMA)",
          dipilih: true,
          form: FormPpokPumaComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
    {
      nama: "Pemeriksaan Tuberkulosis",
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Pemeriksaan Sputum - Tuberkulosis",
          dipilih: true,
          form: FormSputumTbcComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Tindak Lanjut Tuberkulosis - Foto Thorax",
          dipilih: true,
          form: FormFotoThoraxComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
    {
      nama: "Skrining Laboratorium ≥ 40 tahun Fungsi Ginjal, Hati, Profil Lipid",
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Pemeriksaan Fibrosis / Sirosis Hati",
          dipilih: true,
          form: FormSirosisHatiComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Pemeriksaan Fungsi Ginjal (hanya untuk risiko HT DM)",
          dipilih: true,
          form: FormFungsiGinjalComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Pemeriksaan Gula Darah Lanjutan (GDP & GD 2 PP)",
          dipilih: true,
          form: FormGulaDarahLanjutanGdpComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Pemeriksaan Gula Darah Lanjutan (HbA1C)",
          dipilih: true,
          form: FormGulaDarahLanjutanHba1cComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Pemeriksaan Hepatitis",
          dipilih: true,
          form: FormHepatitisComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Profil Lipid (hanya untuk penyandang HT dan/atau DM)",
          dipilih: true,
          form: FormProfilLipidComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
    {
      nama: "Prediksi Risiko Jantung dan Stroke",
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Prediksi Risiko Jantung dan Stroke",
          dipilih: true,
          form: FormRisikoJantungStrokeComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
    {
      nama: "Pemeriksaan Rapid Test Calon Pengantin",
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Pemeriksaan Rapid Test Calon Pengantin",
          dipilih: true,
          form: FormRapidTestCapinComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
    {
      nama: "Skrining Telinga dan Mata ≥ 40 tahun",
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Skrining Mata dan Telinga ≥ 40 tahun",
          dipilih: true,
          form: FormMataTelingaComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
    {
      nama: "Skrining Gigi - Dewasa ≥ 25 tahun",
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Skrining Karies dan Gigi Hilang",
          dipilih: true,
          form: FormKariesGigiHilangComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Skrining Penyakit Periodontal",
          dipilih: true,
          form: FormPeriodontalComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
    {
      nama: "Skrining Jantung (Pemeriksaan EKG - hanya penyandang Hipertensi)",
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Detail Abnormalitas - Skrining Jantung",
          dipilih: true,
          form: FormAbnormalitasJantungComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Hasil Pemeriksaan - Skrining Jantung",
          dipilih: true,
          form: FormHasilEkgComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
    {
      nama: "Skrining Kanker Payudara",
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Skrining Kanker Payudara",
          dipilih: true,
          form: FormKankerPayudaraComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
    {
      nama: "Skrining Kanker Leher Rahim",
      dipilih: true,
      form: "",
      status: "Belum Diperiksa",
      childs: [
        {
          nama: "Hasil Pemeriksaan HPV - DNA",
          dipilih: true,
          form: FormHpvDnaComponent,
          status: "Belum Diperiksa",
        },
        {
          nama: "Hasil Pemeriksaan Inspeksius dan IVA",
          dipilih: true,
          form: FormIvaComponent,
          status: "Belum Diperiksa",
        },
      ],
    },
  ];

  get jumlahPemeriksaanNakes(): number {
    return this.daftarLayanan.filter(
      (item) => item.status === "Sudah Diperiksa"
    ).length;
  }

  get jumlahSelesai(): number {
    return this.daftarPemeriksaan.filter(
      (item) => item.status === "Sudah Diperiksa"
    ).length;
  }

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  openDynamicModal(component: Type<any>, data: any) {
    const modalRef = this.modalService.open(ModalWrapperComponent, {
      size: "xl",
    });

    modalRef.componentInstance.title = "Form Pemeriksaan";
    modalRef.componentInstance.componentToRender = component;
    modalRef.componentInstance.data = { pasienId: 123 };
  }
}
