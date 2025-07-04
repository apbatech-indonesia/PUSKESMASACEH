import { Component, Input, OnInit } from "@angular/core";
import { finalize } from "rxjs/operators";
import { FormBalitaSakitService } from "./fom-balita-sakit.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-form-balita-sakit",
  templateUrl: "./form-balita-sakit.component.html",
  styleUrls: ["./form-balita-sakit.component.sass"],
})
export class FormBalitaSakitComponent implements OnInit {
  payload = {
    kajianawal: {
      daerah_endemis_malaria: "",
      nama_ibu: "",
      rdt_malaria: "",
      kunjungan: "",
      kunjungan_ulang_ke: "",
    },
    saga: {
      klasifikasi: "",
      tindakan: "",
      tidak_bisa_minum: false,
      muntah_semua: false,
      pernah_kejang: false,
      kejang: false,
      tidak_interaksi_tidak_sadar: false,
      gelisah_rewel: false,
      pandangan_kosong: false,
      menangis_melengking: false,
      tarikan_dada: false,
      stridor: false,
      napas_cuping_hidung: false,
      posisi_nyaman_menolak_berbaring: false,
      pucat: false,
      sianosis: false,
      kutis_marmorata: false,
    },
    batuk_sukar_bernapas: {
      status: false,
      lama_batuk: "",
      napas_per_menit: "",
      tarikan_dada: false,
      wheezing: false,
      saturasi_oksigen: "",
      klasifikasi: "",
      tindakan: "",
    },
    diare: {
      status: false,
      lama_diare: "3",
      darah_tinja: false,
      keadaan_umum_letargis_tidak_sadar: false,
      keadaan_umum_rewel_mudah_marah: false,
      mata_cekung: false,
      pemberian_minum_tidak_bisa_minum: false,
      pemberian_minum_haus_minum_lahap: false,
      cubit_kulit: "",
      klasifikasi: "",
      tindakan: "",
    },
    demam: {
      status: false,
      daerah_endemis: "",
      lama_demam: "4",
      demam_setiap_hari: "",
      riwayat_malaria: "",
      riwayat_campak: "",
      kaku_kuduk: "",
      penyebab_lain: "",
      tanda_campak: "",
      hasil_rdt: "",
      hasil_mikroskopis: "",
      klasifikasi_demam: "",
      tindakan_demam: "",
    },
    pemeriksaan_campak: {
      gejala_luka_mulut: false,
      gejala_nanah_mata: false,
      gejala_kekeruhan_kornea: false,
      detail_luka_mulut: "",
      gejala: "",
      syok: false,
      tambahan: "",
      tanda_lain: "",
      pembesaran_hepar: false,
      uji_tourniquet: "",
      hemoglobin: "",
      hematokrit: "",
      leukosit: "",
      trombosit: "",
      ns1: "",
      klasifikasi: "",
      tindakan: "",
    },
    demam_lebih_dua_hari: {
      demam_tinggi: "",
      badan_dingin: "",
      lemas_gelisah: "",
      mual: "",
      muntah: "",
      nyeri_perut: "",
      perdarahan: "",
      ruam: "",
      nyeri_badan: "",
      bak_lebih_6jam: "",
      kaki_tangan_pucat: "",
      crt_lebih_2detik: "",
      dingin: "",
      nadi_lemah: "",
      nadi_cepat: "",
      nyeri_tekan_perut: "",
      akumulasi_cairan: "",
      perdarahan_kulit: "",
      ikterik: "",
      letargi_gelisah: "",
      sesak_napas: "",
      pembesaran_hepar: "",
      uji_tourniquet: false,
      hemoglobin: "",
      hematokrit: "",
      leukosit: "",
      trombosit: "",
      ns1: "",
      klasifikasi: "",
      tindakan: "",
    },
    masalah_telinga: {
      masalah_telinga: "",
      nyeri_telinga: false,
      rasa_penuh_telinga: false,
      cairan_keluar_telinga: false,
      durasi_cairan_telinga: "",
      lihat_cairan_keluar: false,
      pembengkakan_belakang_telinga: false,
      klasifikasi: "",
      tindakan: "",
    },
    status_gizi: {
      bb_kurang_4kg: "",
      edema_bilateral: "",
      bb_pb_tb: "",
      lila: "",
      anoreksia: "",
      dehidrasi_berat: "",
      komplikasi_medis: "",
      demam_tinggi: "",
      pneumonia_berat: "",
      anemia_berat: "",
      terlalu_lemah_menyusu: "",
      bb_turun_tidak_naik: "",
      letargi_penurunan_kesadaran: "",
      klasifikasi: "",
      tindakan: "",
    },
    stunting: {
      umur_stunting: "",
      pb_tb_u: "",
      klasifikasi: "",
      tindakan: "",
    },
    lingkar_kepala: {
      lk_u: "",
      klasifikasi: "",
      tindakan: "",
    },
    anemia: {
      hb: "",
      kepucatan: "",
      klasifikasi: "",
      tindakan: "",
    },
    hiv: {
      pernah_tes_hiv: false,
      status_hiv_ibu: "",
      status_virologi_anak: "",
      status_serologi_anak: "",
      asi_saat_tes: false,
      asi_saat_ini: false,
      arv_profilaksis: false,
      klasifikasi: "",
      tindakan: "",
    },
    imunisasi: {
      diberikan_hari_ini: "",
      hb0: false,
      bcg: false,
      opv0: false,
      opv1: false,
      opv2: false,
      opv3ipv: false,
      rv1: false,
      rv2: false,
      rv3: false,
      dpt1: false,
      dpt2: false,
      dpt3: false,
      pcv1: false,
      pcv2: false,
      pcv3: false,
      campakRubella: false,
      je: false,
      dptLanjutan: false,
      campakRubellaLanjutan: false,
      keterangan_imunisasi: "",
      klasifikasi: "",
      tindakan: "",
    },
    vitamin_a: {
      butuh_vitamin_a: false,
      diberikan_vitamin_a: false,
      catatan_vitamin_a: "",
      klasifikasi: "",
      tindakan: "",
    },
    keluhan_lain: {
      tindakan: "",
      klasifikasi: "",
    },
    pola_makan: {
      menyusui: false,
      frekuensi_menyusui: "",
      menyusui_malam: false,
      makanan_lain: false,
      jenis_makanan_lain: "",
      frekuensi_makanan_lain: "",
      alat_minum: "",
      jumlah_makanan: "",
      makanan_tersendiri: false,
      pemberi_makan: "",
      perubahan_makan: false,
      detail_perubahan_makan: "",
      tindakan: "",
      klasifikasi: "",
    },
    follow_up: {
      kunjungan_ulang_hari: "",
      nasihat_kapan_kembali: "",
      nama_pemeriksa: "",
      tindakan: "",
      klasifikasi: "",
    },
  };
  showDetailLukaMulut: boolean = false;

  isLoading = false;
  isEdit = false;
  id: number;

  norm = this.route.snapshot.paramMap.get("notrans");
  notransaksi = this.route.snapshot.paramMap.get("norm");

  @Input() kdCabang: string = "";
  @Input() slugCabang: string = "";

  constructor(
    private toastr: ToastrService,
    private formBalitaSakitService: FormBalitaSakitService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = false;

    this.formBalitaSakitService
      .getByNormAndTransaksi(this.slugCabang, this.norm, this.notransaksi)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          if (res && res.payload) {
            this.id = res.id;
            this.payload = res.payload;
            this.isEdit = true;
            console.log("Data loaded:", res);
          }
        },
        error: (err) => {
          console.error("Gagal load data:", err);
          // TODO: Tambahkan toastr jika ingin
        },
      });
  }

  submit(): void {
    const data = {
      kdcabang: this.kdCabang,
      norm: this.norm,
      notransaksi: this.notransaksi,
      payload: this.payload,
    };

    if (this.isEdit) {
      this.updateData(data);
    } else {
      this.createData(data);
    }
  }

  createData(data: any): void {
    this.isLoading = true;

    this.formBalitaSakitService
      .create(this.slugCabang, data)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.id = res.id;
          this.isEdit = true;
          this.toastr.success("Data berhasil disimpan", "Berhasil");
        },
        error: (err) => {
          console.error("Gagal menyimpan data:", err);
          this.toastr.error("Gagal menyimpan data", "Error");
        },
      });
  }

  updateData(data: any): void {
    if (!this.id) {
      this.toastr.warning("ID tidak ditemukan untuk update", "Perhatian");
      return;
    }

    this.isLoading = true;

    this.formBalitaSakitService
      .update(this.slugCabang, this.id, data)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.toastr.success("Data berhasil diperbarui", "Berhasil");
        },
        error: (err) => {
          console.error("Gagal mengupdate data:", err);
          this.toastr.error("Gagal mengupdate data", "Error");
        },
      });
  }
}
