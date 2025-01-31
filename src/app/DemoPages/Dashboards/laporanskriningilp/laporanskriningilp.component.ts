import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { laporanskriningilpService } from './laporanskriningilp.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface DataScreening {
  registered?: number;
  screened?: number;
  unscreened?: number;
  total?: number;
}

interface ApiResponse {
  data: {
    data_screenings: {
      total_branch: DataScreening;
      [year: string]: DataScreening;
    };
  }[];
}

interface YearData {
  [key: string]: DataScreening;
}

@Component({
  selector: 'app-laporanskriningilp',
  templateUrl: './laporanskriningilp.component.html',
  styleUrls: ['./laporanskriningilp.component.css']
})
export class laporanskriningilpComponent implements OnInit {
  faSearch = faSearch;
  branchId = "076";

  jumlahPasienTerdaftar: number = 0;
  jumlahPasienTerskrining: number = 0;
  jumlahPasienBelumSkrining: number = 0;

  grapikTahunanTotalSkrining: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  grapikBerdasarkanDaerah: number[] = [100, 96, 6, 22, 11, 51, 17, 38, 68, 66, 19, 42, 62, 37, 73];

  listOfClasters: string[] = ["Klaster 2", "Klaster 3", "Klaster 4"];
  listOfClasterLabels: string[] = ["Klaster 2", "Klaster 3", "Klaster 4"];
  listOfSubClastersId: string[] = ["Ibu Hamil, Bersalin, Nifas", "Balita dan Anak Persekolahan"];
  listOfYears: string[] = [];
  listOfMonths: string[] = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  listOfDistricts: string[] = [
    'Lambaro', 'Lampenerut', 'Jantho', 'Krueng Raya', 'Seulimeum', 'Indrapuri',
    'Sibreh', 'Cot Irie', 'Montasik', 'Ingin Jaya', 'Kuta Baro', 'Lhoong',
    'Lhoknga', 'Darussalam', 'Mesjid Raya'
  ];
  listOfColors = [
    "bg-pb-green-custom",
    "bg-pb-brown-custom",
    "bg-pb-bluesky-custom",
    "bg-pb-yellow-custom"
  ]
  listOfColors2 = [
    "bg-pb-blue-custom",
    "bg-pb-orange-custom"
  ]

  currentYear: string = new Date().getFullYear().toString();

  filterSubDistrict: string = "Jantho";
  filterClaster: string = "Klaster 2";
  filterSubClaster: string = "Ibu Hamil, Bersalin, Nifas";
  filterYear: string = this.currentYear;
  filterMonth: string = "Januari";

  filterYearTotalSkrining: string = this.currentYear;

  filterSubDistrictKlaster: string = "Jantho";
  filterMonthKlaster: string = "Januari";
  filterYearKlaster: string = this.currentYear;

  filterSubDistrictKategoriSkrining: string = "Jantho";
  filterClasterKategoriSkrining: string = "Klaster 2";
  filterMonthKategoriSkrining: string = "Januari";
  filterYearKategoriSkrining: string = this.currentYear;

  filterClasterKategoriSkriningDaerah: string = "Klaster 2";
  filterMonthKategoriSkriningDaerah: string = "Januari";
  filterYearKategoriSkriningDaerah: string = this.currentYear;

  filterSubDistrictBySkrining: string = "Jantho";
  filterSubClasterBySkrining: any = "Ibu Hamil, Bersalin, Nifas";
  filterMonthBySkrining: string = "Januari";
  filterYearBySkrining: string = this.currentYear;
  listOfCategoryScreening: object[];
  listOfPercentageClaster: number[] = [0, 0, 0];
  listOfPatientByScreening: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  listOfSubClasterName: any;
  listOfAllSkrining: any;

  constructor(
    private api: laporanskriningilpService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getTotalPasien();
    this.getTotalPasienSkrining();
    this.getPatientByClusterGroup();
    this.getTotalPasienByCategorySkrining();
    this.getAllSubClaster();
    this.getTotalPatientByScreening();
  }

  openModal(content) {
    this.modalService.open(content, { size: 'xl', ariaLabelledBy: 'modal' }).result.then((result) => {
      console.log('test')
    });
  }

  async getTotalPasien() {
    try {
      const data = { branchId: this.branchId };
      const response = await this.api.getPatientStatus(data) as ApiResponse;

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      const dataScreenings = response.data[0].data_screenings;
      const totalBranch = dataScreenings.total_branch;

      if (!totalBranch) {
        throw new Error("Data total_branch tidak ditemukan");
      }

      this.updatePatientCounts(totalBranch);
      this.listOfYears = this.extractYears(dataScreenings);
    } catch (error) {
      console.error("Error saat mengambil total pasien:", error);
    }
  }

  async getTotalPasienSkrining() {
    try {
      if (!this.filterYearTotalSkrining) {
        throw new Error("Tahun filter tidak tersedia");
      }

      const data = { year: this.filterYearTotalSkrining, branchId: this.branchId };
      const response: any = await this.api.getPatientStatus(data);

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      const yearData = response.data[0].data_screenings[this.filterYearTotalSkrining];

      if (!yearData) {
        throw new Error(`Data untuk tahun ${this.filterYearTotalSkrining} tidak ditemukan`);
      }

      this.grapikTahunanTotalSkrining = this.extractScreenedValues(yearData);
    } catch (error) {
      console.error("Error saat mengambil total pasien skrining:", error);
    }
  }

  async getPatientByClusterGroup() {
    try {
      if (!this.filterYearKategoriSkrining) {
        throw new Error("Tahun filter tidak tersedia");
      }

      const data = {
        year: this.filterYearKlaster,
        month: String(this.listOfMonths.indexOf(this.filterMonthKlaster) + 1).padStart(2, '0'),
        // locationId: "5e7aa695-0b35-47ba-bc6b-28c680b99590"
      }
      const response: any = await this.api.getPatientByClusterGroup(data);

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      this.listOfPercentageClaster = response.data.map(item => item.percentage)
      this.listOfClasters = response.data.map(item => item.group.split(' -')[0] || "Unknown")
      this.listOfClasterLabels = response.data.map(item => {
        const group = item.group.split(' -')[0] || "Unknown"
        return `${group} (${item.total_patients} Pasien)`
      })
    } catch (error) {
      console.error("Error saat mengambil total pasien skrining:", error);
    }
  }

  async getTotalPasienByCategorySkrining() {
    try {
      if (!this.filterYearKategoriSkrining) {
        throw new Error("Tahun filter tidak tersedia");
      }

      const data = {
        year: this.filterYearKategoriSkrining,
        month: String(this.listOfMonths.indexOf(this.filterMonthKategoriSkrining) + 1).padStart(2, '0'),
        // locationId: "5e7aa695-0b35-47ba-bc6b-28c680b99590",
        clusterGroup: this.filterClasterKategoriSkrining
      }
      const response: any = await this.api.getPatientByCluster(data);

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      this.listOfCategoryScreening = response.data[0].clusters
    } catch (error) {
      console.error("Error saat mengambil total pasien skrining:", error);
    }
  }

  async getAllSubClaster() {
    try {
      const data = {}
      const response: any = await this.api.getPatientByCluster(data);

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      this.listOfSubClastersId = response.data.map(item => item.clusters).flat().map(item => item.cluster_id)
      this.listOfSubClasterName = response.data.map(item => item.clusters).flat().map(item => item.cluster_name)
      this.listOfAllSkrining = response.data

      console.log(this.listOfAllSkrining)
    } catch (error) {
      console.error("Error saat mengambil total pasien skrining:", error);
    }
  }

  async getTotalPatientByScreening() {
    try {
      if (!this.filterYearBySkrining) {
        throw new Error("Tahun filter tidak tersedia");
      }

      const data = {
        year: this.filterYearBySkrining,
        month: String(this.listOfMonths.indexOf(this.filterMonthBySkrining) + 1).padStart(2, '0'),
        // locationId: "5e7aa695-0b35-47ba-bc6b-28c680b99590",
        clusterId: this.listOfSubClastersId[this.listOfSubClasterName?.indexOf(this.filterSubClasterBySkrining)] ?? 1
      }
      const response: any = await this.api.getPatientByScreening(data);

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      this.listOfPatientByScreening = response.data
    } catch (error) {
      console.error("Error saat mengambil total pasien skrining:", error);
    }
  }

  private updatePatientCounts(totalBranch: DataScreening) {
    this.jumlahPasienTerdaftar = totalBranch.registered ?? 0;
    this.jumlahPasienTerskrining = totalBranch.screened ?? 0;
    this.jumlahPasienBelumSkrining = totalBranch.unscreened ?? 0;
  }

  private extractYears(dataScreenings: YearData): string[] {
    return Object.keys(dataScreenings).filter(key => key !== 'total_branch');
  }

  private extractScreenedValues(data: YearData): number[] {
    let filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      if (key !== 'total') {
        acc[key] = value;
      }
      return acc;
    }, []);

    filteredData = Object.values(filteredData)
      .map(item => item.screened ?? 0);

    return filteredData
  }
}
