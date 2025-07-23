import { Component, OnInit } from "@angular/core";
import { DashboardPkgService } from "../dashboard-pkg-service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-data-pendaftaran",
  templateUrl: "./data-pendaftaran.component.html",
  styleUrls: ["./data-pendaftaran.component.css"],
})
export class DataPendaftaranComponent implements OnInit {
  tabs = ["Pendaftaran", "Kehadiran", "Layanan"];
  selectedTab = "Pendaftaran";

  provinsiList = [
    "Jawa Barat",
    "DKI Jakarta",
    "Bali",
    "Jawa Timur",
    "Yogyakarta",
  ];
  kabupatenList = [
    "Bandung",
    "Jakarta Selatan",
    "Denpasar",
    "Surabaya",
    "Yogyakarta",
  ];
  kecamatanList = [
    "Cicendo",
    "Kebayoran Baru",
    "Denpasar Selatan",
    "Gubeng",
    "Maguwoharjo",
  ];

  selectedProvinsi = "";
  selectedKabupaten = "";
  selectedKecamatan = "";
  selectedKelurahan = "";

  totalLaki = 0;
  totalPerempuan = 0;

  trendSeries = [
    {
      name: "Pendaftar",
      data: [0],
    },
  ];
  trendDates = [];
  trendStartDate = "";
  trendEndDate = "";

  totalPemeriksaan = 0;
  pemeriksaanList = [
    {
      nama: "Skrining Talasemia dan GDS",
      deskripsi: "Jumlah peserta umur 2 tahun",
      jumlah: 0,
    },
    {
      nama: "Skrining Anemia",
      deskripsi: "Jumlah peserta remaja umur 7 - 18 tahun",
      jumlah: 0,
    },
    {
      nama: "Skrining HPV DNA dan Kanker Payudara",
      deskripsi: "Jumlah peserta wanita umur 30 - 69 tahun",
      jumlah: 0,
    },
  ];

  anakRemajaCategories = [
    { name: "Bayi Baru Lahir < 1 tahun", value: 0, color: "#00c3f9" },
    { name: "Anak 1 - 6 tahun", value: 0, color: "#345da7" },
    { name: "SD 7 - 12 tahun", value: 0, color: "#0d128b" },
    { name: "SMP 13 - 15 tahun", value: 0, color: "#30cbb8" },
    { name: "SMA 16 - 18 tahun", value: 0, color: "#29a259" },
  ];

  dewasaCategories = [
    { name: "Dewasa 19 - 29 tahun", value: 0, color: "#ff5959" },
    { name: "Dewasa 30 - 39 tahun", value: 0, color: "#cd1818" },
    { name: "Dewasa 40 - 59 tahun", value: 0, color: "#f6de07" },
    { name: "Lansia >= tahun", value: 0, color: "#e7a422" },
  ];

  progressData = [
    { width: 15, color: "#00c3f9" },
    { width: 15, color: "#345da7" },
    { width: 15, color: "#0d128b" },
    { width: 15, color: "#30cbb8" },
    { width: 15, color: "#29a259" },
    { width: 15, color: "#ff5959" },
    { width: 15, color: "#cd1818" },
    { width: 15, color: "#f6de07" },
    { width: 15, color: "#e7a422" },
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
      anak: 0,
      anakPerempuan: 0,
      anakLakiLaki: 0,
    },
  ];
  showChartComponent: boolean;
  kelurahanList: any;

  constructor(
    private dashboardPkgService: DashboardPkgService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.showChartComponent = true;
    }, 300);
    this.fetchData();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  onFilterChange() {
    this.fetchData();
  }

  openDetailModal(content: any) {
    this.modalService.open(content, { size: "lg" });
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

  async fetchDaerahList() {
    setTimeout(() => {
      console.log(this.selectedProvinsi);
    }, 1000);
    try {
      const daerahResponse: any = await this.dashboardPkgService
        .getDaerahList({
          status: "pendaftaran",
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

  async fetchTotalByGender() {
    try {
      const dataResponse: any = await this.dashboardPkgService
        .getTotalByGender({
          status: "pendaftaran",
          provinsi: this.selectedProvinsi,
          kota: this.selectedKabupaten,
          kecamatan: this.selectedKecamatan,
          kelurahan: this.selectedKelurahan,
        })
        .toPromise();

      this.totalLaki = dataResponse?.data?.totalLaki || [];
      this.totalPerempuan = dataResponse?.data?.totalPerempuan || [];
    } catch (error) {
      console.error("Error fetching package list:", error);
    }
  }

  async fetchPemeriksaanList() {
    try {
      const dataResponse: any = await this.dashboardPkgService
        .getPemeriksaanList({
          status: "layanan",
          provinsi: this.selectedProvinsi,
          kota: this.selectedKabupaten,
          kecamatan: this.selectedKecamatan,
          kelurahan: this.selectedKelurahan,
        })
        .toPromise();

      this.totalPemeriksaan = dataResponse?.data?.totalPemeriksaan;
      this.pemeriksaanList = dataResponse?.data?.pemeriksaanList || [];
    } catch (error) {
      console.error("Error fetching package list:", error);
    }
  }

  async fetchTrend() {
    try {
      const dataResponse: any = await this.dashboardPkgService
        .getTrend({
          status: "pendaftaran",
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
        })
        .toPromise();

      this.anakRemajaCategories = dataResponse?.data?.anakRemajaCategories;
      this.dewasaCategories = dataResponse?.data?.dewasaCategories;
      this.progressData = dataResponse?.data?.progressData;
    } catch (error) {
      console.error("Error fetching package list:", error);
    }
  }

  async fetchData() {
    // Jalankan paralel supaya lebih cepat
    await Promise.all([
      this.fetchPkgList(),
      this.fetchDaerahList(),
      this.fetchTotalByGender(),
      this.fetchTrend(),
      this.fetchPemeriksaanList(),
      this.fetchKetegoriSummary(),
    ]);
  }
}
