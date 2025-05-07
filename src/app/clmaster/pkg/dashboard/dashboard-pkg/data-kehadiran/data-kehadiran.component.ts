import { Component, OnInit } from "@angular/core";
import { DashboardPkgService } from "../dashboard-pkg-service";

@Component({
  selector: "app-data-kehadiran",
  templateUrl: "./data-kehadiran.component.html",
  styleUrls: ["./data-kehadiran.component.css"],
})
export class DataKehadiranComponent implements OnInit {
  selectedProvinsi: string = "";
  selectedKabupaten: string = "";
  selectedKecamatan: string = "";
  selectedKelurahan: string = "";

  provinsiList: string[] = [""];
  kabupatenList: string[] = [""];
  kecamatanList: string[] = [""];
  kelurahanList: string[] = [""];

  hadirCount: number = 0;
  janjiTemuCount: number = 0;

  trendSeries: number[] = [0]; // Contoh data
  trendDates: string[] = [""];
  trendStartDate: string = "";
  trendEndDate: string = "";

  periodeKehadiranAwal: string = "";
  periodeKehadiranAkhir: string = "";

  anakRemajaCategories = [
    { name: "Anak Balita", value: 45, color: "#007bff" },
    { name: "Anak Usia Sekolah", value: 30, color: "#6610f2" },
  ];

  dewasaCategories = [
    { name: "Dewasa Muda", value: 60, color: "#28a745" },
    { name: "Lansia", value: 25, color: "#fd7e14" },
  ];

  tableData = [
    {
      provinsi: "-",
      kabupaten: "-",
      kecamatan: "-",
      kelurahan: "-",
      totalPendaftar: 0,
      totalBayi: 0,
      bayiPerempuan: 0,
      bayiLakiLaki: 0,
      totalAnak: 0,
      anakPerempuan: 0,
      anakLakiLaki: 0,
    },
  ];
  showChartComponent: boolean;

  constructor(private dashboardPkgService: DashboardPkgService) {}

  ngOnInit() {
    setTimeout(() => {
      this.showChartComponent = true;
    }, 300);

    this.fetchData();
  }

  onFilterChange(): void {
    this.fetchData();
  }

  async fetchData() {
    await Promise.all([
      this.fetchDaerahList(),
      this.fetchKehadiranSummary(),
      this.fetchTrend(),
      this.fetchKetegoriSummary(),
      this.fetchPkgList(),
    ]);
  }

  async fetchDaerahList() {
    try {
      const daerahResponse: any = await this.dashboardPkgService
        .getDaerahList({
          status: "kehadiran",
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
          status: "kehadiran",
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

  async fetchKetegoriSummary() {
    try {
      const dataResponse: any = await this.dashboardPkgService
        .getKetegoriSummary({
          status: "layanan",
          provinsi: this.selectedProvinsi,
          kota: this.selectedKabupaten,
          kecamatan: this.selectedKecamatan,
          kelurahan: this.selectedKelurahan,
          startDate: this.periodeKehadiranAwal,
          endDate: this.periodeKehadiranAkhir,
        })
        .toPromise();

      this.anakRemajaCategories = dataResponse?.data?.anakRemajaCategories;
      this.dewasaCategories = dataResponse?.data?.dewasaCategories;
    } catch (error) {
      console.error("Error fetching package list:", error);
    }
  }

  async fetchPkgList() {
    try {
      const dataResponse: any = await this.dashboardPkgService
        .getPkgList({
          status: "pendaftaran",
          provinsi: this.selectedProvinsi,
          kota: this.selectedKabupaten,
          kecamatan: this.selectedKecamatan,
          kelurahan: this.selectedKelurahan,
        })
        .toPromise();

      this.tableData = dataResponse?.data || [];
    } catch (error) {
      console.error("Error fetching package list:", error);
      this.tableData = [];
    }
  }
}
