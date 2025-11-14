import { Component, Input, OnInit } from "@angular/core";
import { finalize } from "rxjs/operators";
// GANTI NAMA SERVICE: Sesuaikan dengan nama service Anda untuk form ini
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiserviceService } from "src/app/apiservice.service";
import { FormAssessmentResikojatuh } from "./form-assessment-resiko-jatuh.service";

@Component({
  selector: "app-form-assessment-resiko-jatuh",
  templateUrl: "./form-assessment-resiko-jatuh.component.html",
  styleUrls: ["./form-assessment-resiko-jatuh.component.sass"],
})
export class FormAssessmentResikoJatuhComponent implements OnInit {
  // 1. STRUKTUR PAYLOAD DISESUAIKAN DENGAN FORM
  payload: any = {
    // Section 1: Pengkajian
    pengkajian_tidak_seimbang: false, // 1.a
    pengkajian_alat_bantu: false, // 1.b
    pengkajian_menopang_duduk: false, // 'b.' (poin kedua)

    // Section 3: Tindakan (menyimpan data input)
    tindakan_tidak_berisiko: {
      dilakukan: null, // 'Ya'/'Tidak'
      petugas: "",
    },
    tindakan_risiko_rendah: {
      // Form Anda menyebut "Risiko rendah" di section 3
      dilakukan: null,
      petugas: "",
    },
    tindakan_risiko_tinggi_pita: {
      // Aksi 1 untuk risiko tinggi
      dilakukan: null,
      petugas: "",
    },
    tindakan_risiko_tinggi_edukasi: {
      // Aksi 2 untuk risiko tinggi
      dilakukan: null,
      petugas: "",
    },
  };

  // Variabel internal
  isLoading = false;
  isEdit = false;
  id: number;

  norm = this.route.snapshot.paramMap.get("norm");
  notransaksi = this.route.snapshot.paramMap.get("notrans");
  user = JSON.parse(localStorage.getItem("userDatacl"));

  @Input() kdCabang: string = "";
  @Input() slugCabang: string = "";
  loadingDownload: boolean;
  namaPemeriksaList$: any;

  // 2. FORM SLUG DISESUAIKAN
  formSlug: string = "emr_asesmen_risiko_jatuh"; // <-- GANTI DARI 'emr_balita_sakit'

  constructor(
    private toastr: ToastrService,
    // 3. NAMA SERVICE DISESUAIKAN
    private formResikoJatuhService: FormAssessmentResikojatuh, // <-- GANTI DARI 'FormBalitaSakitService'
    private apiservice: ApiserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // --- Penambahan: Logika Kalkulasi (Section 2) ---
  // Ini adalah helper untuk menentukan Kriteria A (gaya berjalan)
  get kriteriaA(): boolean {
    return (
      this.payload.pengkajian_tidak_seimbang ||
      this.payload.pengkajian_alat_bantu
    );
  }

  // Ini adalah helper untuk menentukan Kriteria B (menopang duduk)
  get kriteriaB(): boolean {
    return this.payload.pengkajian_menopang_duduk;
  }

  // Ini adalah helper untuk menghitung HASIL (Section 2)
  // Anda bisa gunakan 'hasilRisiko' di file .html Anda untuk menampilkan
  // bagian Tindakan (Section 3) yang relevan
  get hasilRisiko(): "tidak_berisiko" | "risiko_sedang" | "risiko_tinggi" {
    const a = this.kriteriaA;
    const b = this.kriteriaB;

    if (a && b) {
      return "risiko_tinggi"; // Ditemukan A & B
    }
    if (!a && !b) {
      return "tidak_berisiko"; // Tidak ditemukan A & B
    }
    // Jika salah satu (tapi tidak keduanya)
    return "risiko_sedang"; // Ditemukan salah satu dari A atau B
  }
  // --- Akhir Penambahan Logika Kalkulasi ---

  loadData(): void {
    this.isLoading = true; // Set true di awal
    this.namaPemeriksaList$ = this.apiservice.tampiluser(this.kdCabang);

    this.formResikoJatuhService // <-- GANTI NAMA SERVICE
      .getByNormAndTransaksi(
        this.slugCabang,
        this.norm,
        this.notransaksi,
        this.formSlug
      )
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          if (res && res.payload) {
            this.id = res.id;
            // Menggunakan Object.assign untuk menimpa default payload
            // dengan data yang ada, sambil menjaga properti yang belum ada
            this.payload = Object.assign({}, this.payload, res.payload);
            this.isEdit = true;
          } else {
            // Jika tidak ada data, this.payload akan berisi struktur default
            this.isEdit = false;
          }
        },
        error: (err) => {
          console.error("Gagal load data:", err);
          this.isLoading = false;
          // this.toastr.error("Gagal memuat data", "Error");
        },
      });
  }

  submit(): void {
    const data = {
      kdcabang: this.kdCabang,
      norm: this.norm,
      notransaksi: this.notransaksi,
      payload: this.payload,
      slug: this.formSlug,
    };

    if (this.isEdit) {
      this.updateData(data);
    } else {
      this.createData(data);
    }
  }

  createData(data: any): void {
    this.isLoading = true;

    this.formResikoJatuhService // <-- GANTI NAMA SERVICE
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

    this.formResikoJatuhService // <-- GANTI NAMA SERVICE
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

  downloadPdf() {
    this.loadingDownload = true;
    this.formResikoJatuhService // <-- GANTI NAMA SERVICE
      .downloadPdf(this.slugCabang, this.norm, this.notransaksi, this.formSlug)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          // 4. NAMA FILE DOWNLOAD DISESUAIKAN
          a.download = `ASESMEN_RISIKO_JATUH_${this.norm}_${this.notransaksi}.pdf`; // <-- GANTI NAMA FILE
          a.click();
          window.URL.revokeObjectURL(url);
          this.loadingDownload = false;
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("Gagal download PDF", "Error");
          this.loadingDownload = false;
        },
      });
  }
}
