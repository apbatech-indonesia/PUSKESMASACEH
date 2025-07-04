import { Component, OnInit } from "@angular/core";
import { DashboardPkgService } from "../dashboard-pkg-service";

@Component({
  selector: "app-data-layanan",
  templateUrl: "./data-layanan.component.html",
  styleUrls: ["./data-layanan.component.css"],
})
export class DataLayananComponent implements OnInit {
  // Dropdown
  selectedProvinsi = "";
  selectedKabupaten = "";
  selectedKecamatan = "";
  selectedKelurahan = "";

  provinsiList = [];
  kabupatenList = [];
  kecamatanList = [];
  kelurahanList = [];

  // Pie Chart Data
  hadirCount = 0;
  janjiTemuCount = 0;

  // Line Chart Data
  trendDates = ["21/03", "22/03", "23/03", "24/03", "25/03", "26/03"];
  trendSeries = [200, 150, 250, 180, 220, 170];
  trendStartDate: string = "";
  trendEndDate: string = "";

  // Pemeriksaan Khusus
  pemeriksaanList = [
    {
      title: "Tekanan Darah",
      total: 200,
      keterangan: "80,43% dari 620.766 peserta usia ≥ 18 tahun",
      items: [
        { label: "Normal", value: 100, percent: 33.33, color: "#28a745" },
        {
          label: "Pre Hipertensi",
          value: 100,
          percent: 33.33,
          color: "#ffc107",
        },
        { label: "Hipertensi", value: 100, percent: 33.33, color: "#dc3545" },
      ],
    },
    {
      title: "Indeks Massa Tubuh",
      total: 200,
      keterangan: "78,9% dari 638.209 peserta usia ≥ 18 tahun",
      items: [
        { label: "Normal", value: 100, percent: 25, color: "#28a745" },
        { label: "Gemuk", value: 100, percent: 25, color: "#ffc107" },
        { label: "Kurang", value: 100, percent: 25, color: "#17a2b8" },
        { label: "Obesitas", value: 100, percent: 25, color: "#dc3545" },
      ],
    },
    {
      title: "Lingkar Perut",
      total: 200,
      keterangan: "80,43% dari 620.766 peserta usia ≥ 18 tahun",
      items: [
        { label: "Normal", value: 100, percent: 50, color: "#28a745" },
        {
          label: "Obesitas Central",
          value: 100,
          percent: 50,
          color: "#dc3545",
        },
      ],
    },
    {
      title: "Aktivitas Fisik",
      total: 200,
      keterangan: "78,9% dari 638.209 peserta usia ≥ 18 tahun",
      items: [
        { label: "Cukup", value: 100, percent: 50, color: "#28a745" },
        { label: "Kurang", value: 100, percent: 50, color: "#dc3545" },
      ],
    },
    {
      title: "Merokok",
      total: 200,
      keterangan: "78,9% dari 638.209 peserta usia ≥ 18 tahun",
      items: [
        { label: "Tidak Merokok", value: 100, percent: 50, color: "#28a745" },
        { label: "Merokok", value: 100, percent: 50, color: "#dc3545" },
      ],
    },
  ];
  showChartComponent: boolean;

  constructor(private dashboardPkgService: DashboardPkgService) {}

  ngOnInit() {
    setTimeout(() => {
      this.showChartComponent = true;
    }, 300); // atau 500 ms kalau masih belum stabil
    this.fetchData();
  }

  async fetchDaerahList() {
    try {
      const daerahResponse: any = await this.dashboardPkgService
        .getDaerahList({
          status: "layanan",
          provinsi: this.selectedProvinsi,
          kota: this.selectedKabupaten,
          kecamatan: this.selectedKecamatan,
          kelurahan: this.selectedKelurahan,
        })
        .toPromise();

      const masterDaerah = daerahResponse?.data || {};
      this.provinsiList = masterDaerah.provinsiList || [];
      this.kabupatenList = masterDaerah.kabupatenList || [];
      this.kecamatanList = masterDaerah.kecamatanList || [];
      this.kelurahanList = masterDaerah.kelurahanList || [];
    } catch (error) {
      console.error("Error fetching daerah list:", error);
      this.provinsiList = [];
      this.kabupatenList = [];
      this.kecamatanList = [];
      this.kelurahanList = [];
    }
  }

  async fetchKehadiranSummary() {
    try {
      const daerahResponse: any = await this.dashboardPkgService
        .getKehadiranSummary({
          provinsi: this.selectedProvinsi,
          kota: this.selectedKabupaten,
          kecamatan: this.selectedKecamatan,
          kelurahan: this.selectedKelurahan,
        })
        .toPromise();

      this.hadirCount = daerahResponse?.data?.hadirCount;
      this.janjiTemuCount = daerahResponse?.data?.janjiTemuCount;
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  }

  async fetchTrend() {
    try {
      const dataResponse: any = await this.dashboardPkgService
        .getTrend({
          status: "layanan",
          provinsi: this.selectedProvinsi,
          kota: this.selectedKabupaten,
          kecamatan: this.selectedKecamatan,
          kelurahan: this.selectedKelurahan,
          startDate: this.trendStartDate,
          endDate: this.trendEndDate,
        })
        .toPromise();

      this.trendSeries = dataResponse?.trendSeries;
      this.trendDates = dataResponse?.trendDates;
    } catch (error) {
      console.error("Error fetching package list:", error);
    }
  }

  async fetchData() {
    await Promise.all([
      this.fetchDaerahList(),
      this.fetchKehadiranSummary(),
      this.fetchTrend(),
    ]);
  }

  onFilterChange() {
    this.fetchData();
  }
}
