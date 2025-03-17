import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { DashboardDinkesService } from "./dashboard-dinkes.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dashboard-dinkes",
  templateUrl: "./dashboard-dinkes.component.html",
  styleUrls: ["./dashboard-dinkes.component.css"],
  providers: [DatePipe],
})
export class DashboardDinkesComponent implements OnInit {
  // Lokasi Dinkes
  dinkesloc: string | null;

  // Filter Tanggal
  startDate: string;
  endDate: string;
  startDateTotalKunjungan: string;
  endDateTotalKunjungan: string;

  // Total Data Kunjungan
  totalall = 0;
  totalumum = 0;
  totalpenjualan = 0;
  totalasuransi = 0;
  totalKunjungan = 0;
  pasienBaru = 0;
  pasienLama = 0;
  totalBpjs = 0;
  totalNonBpjs = this.totalKunjungan - this.totalBpjs;

  // Informasi Pengguna
  userDetails: any;
  nama: string;
  akses: string;
  kdklinik: string;
  kdcabang: string;
  username: string;

  // Filter Tahun & Bulan yang Dipilih
  selectedBulan = new Date().getMonth() + 1;
  selectedTahun = new Date().getFullYear();

  // Kategori dan Label
  poliCategories = ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"];
  bpjsLabels = ["Non BPJS", "BPJS"];
  bulanCategories: string[] = [];

  // Data Kunjungan PKM
  kunjunganPkmSeries = Array(3).fill({ name: "PKM", data: Array(12).fill(0) });

  // Data Top Obat & Penyakit
  topObat = Array(5).fill({ nama_obat: "-", jumlah_penggunaan: 0 });
  topPenyakit = Array(5).fill({ namapenyakit: "-", jumlah: 0 });

  // Data Kunjungan Poli
  kunjunganPoliSeries = Array(4).fill({
    name: "Poli",
    data: Array(4).fill(0),
    color: "#3b82f6",
  });

  // List Bulan & Tahun
  bulanList = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  tahunList = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DashboardDinkesService,
    private toast: ToastrService
  ) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data?.userData || {};
    ({
      nama: this.nama,
      hakakses: this.akses,
      kdklinik: this.kdklinik,
      kdcabang: this.kdcabang,
      username: this.username,
    } = this.userDetails);
  }

  ngOnInit() {
    this.dinkesloc = this.route.snapshot.paramMap.get("dinkesloc");
    this.cekAkses();
    this.fetchData();
  }

  async fetchData() {
    try {
      const [
        tahunList,
        totalKunjungan,
        totalBpjs,
        totalPasienBaruLama,
        topTenObat,
        topTenPenyakit,
        kunjunganPoliPerBulan,
        kunjunganPKM,
      ]: any = await Promise.all([
        this.service.getAvaiableYears(this.dinkesloc),
        this.service.getTotalKunjungan(this.dinkesloc),
        this.service.getTotalBpjs(this.dinkesloc),
        this.service.getPasienBaruLama(this.dinkesloc),
        this.service.getTopTenObat(this.dinkesloc),
        this.service.getTopTenPenyakit(this.dinkesloc),
        this.service.getKunjunganPoliPerBulan(this.dinkesloc),
        this.service.getKunjunganPKM(this.dinkesloc),
      ]);

      this.totalBpjs = totalBpjs.data;
      this.totalKunjungan = totalKunjungan.data;
      this.totalNonBpjs = this.totalKunjungan - this.totalBpjs;
      this.pasienLama = totalPasienBaruLama.data.pasien_lama;
      this.pasienBaru = totalPasienBaruLama.data.pasien_baru;
      this.topObat = topTenObat.data;
      this.topPenyakit = topTenPenyakit.data;
      this.kunjunganPoliSeries = kunjunganPoliPerBulan.data;
      this.tahunList = tahunList.data;
      this.kunjunganPkmSeries = kunjunganPKM.data.records;
      this.bulanCategories = kunjunganPKM.data.dates;
    } catch (error) {
      this.toast.error("Gagal mengambil data. Silakan coba lagi.");
    }
  }

  async filterKunjunganPoli() {
    try {
      const response: any = await this.service.getKunjunganPoliPerBulan(
        this.dinkesloc,
        this.selectedBulan,
        this.selectedTahun
      );
      this.kunjunganPoliSeries = response.data;
    } catch (error) {
      this.toast.error("Gagal memfilter data Poli.");
    }
  }

  async filterTotalKunjungan() {
    if (!this.startDateTotalKunjungan || !this.endDateTotalKunjungan) {
      return this.toast.warning("Harap pilih tanggal mulai dan tanggal akhir.");
    }

    const start = new Date(this.startDateTotalKunjungan);
    const end = new Date(this.endDateTotalKunjungan);
    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays < 1 || diffDays > 30) {
      return this.toast.error("Rentang tanggal harus antara 1 hingga 30 hari.");
    }

    try {
      const [totalKunjungan, totalPasienBaruLama, totalBpjs]: any =
        await Promise.all([
          this.service.getTotalKunjungan(
            this.dinkesloc,
            this.startDateTotalKunjungan,
            this.endDateTotalKunjungan
          ),
          this.service.getPasienBaruLama(
            this.dinkesloc,
            this.startDateTotalKunjungan,
            this.endDateTotalKunjungan
          ),
          this.service.getTotalBpjs(
            this.dinkesloc,
            this.startDateTotalKunjungan,
            this.endDateTotalKunjungan
          ),
        ]);

      this.totalBpjs = totalBpjs.data;
      this.totalKunjungan = totalKunjungan.data;
      this.totalNonBpjs = this.totalKunjungan - this.totalBpjs;
      this.pasienLama = totalPasienBaruLama.data.pasien_lama;
      this.pasienBaru = totalPasienBaruLama.data.pasien_baru;
    } catch (error) {
      this.toast.error("Gagal mengambil data PKM.");
    }
  }

  async filterKunjunganPKM() {
    if (!this.startDate || !this.endDate) {
      return this.toast.warning("Harap pilih tanggal mulai dan tanggal akhir.");
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays < 1 || diffDays > 30) {
      return this.toast.error("Rentang tanggal harus antara 1 hingga 30 hari.");
    }

    try {
      const response: any = await this.service.getKunjunganPKM(
        this.dinkesloc,
        this.startDate,
        this.endDate
      );
      this.kunjunganPkmSeries = response.data.records;
      this.bulanCategories = response.data.dates;
    } catch (error) {
      this.toast.error("Gagal mengambil data PKM.");
    }
  }

  cekAkses() {
    if (this.akses !== this.formatWilayah(this.dinkesloc)) {
      this.router.navigate(["/dashboards"]);
    }
  }

  private formatWilayah(slug) {
    const formatted = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return `Dinkes ${formatted}`;
  }
}
