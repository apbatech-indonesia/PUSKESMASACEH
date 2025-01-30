import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { laporanskriningilpService } from './laporanskriningilp.service';

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
  branchId = "091";
  totalklaster2: number = 0;
  totalklaster3: number = 0;
  totalklaster4: number = 0;
  percentagesuccess: number = 0;
  percentagefailed: number = 0;

  jumlahPasienTerdaftar: number = 0;
  jumlahPasienTerskrining: number = 0;
  jumlahPasienBelumSkrining: number = 0;

  grapikTahunanTotalSkrining: number[] = [1, 22, 3, 4, 52, 6, 7, 82, 9, 101, 112, 122];
  grapikBerdasarkanDaerah: number[] = [100, 96, 6, 22, 11, 51, 17, 38, 68, 66, 19, 42, 62, 37, 73];

  listOfClasters: string[] = ["Klaster 2", "Klaster 3", "Klaster 4"];
  listOfSubClasters: string[] = ["Ibu Hamil, Bersalin, Nifas", "Balita dan Anak Persekolahan"];
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

  filterSubDistrict: string = "Jantho";
  filterClaster: string = "Klaster 2";
  filterSubClaster: string = "Ibu Hamil, Bersalin, Nifas";
  filterYear: string = "2024";
  filterMonth: string = "Januari";

  filterYearTotalSkrining: string = new Date().getFullYear().toString();

  filterSubDistrictKlaster: string = "Jantho";
  filterMonthKlaster: string = "Januari";
  filterYearKlaster: string = "2024";

  filterSubDistrictKategoriSkrining: string = "Jantho";
  filterClasterKategoriSkrining: string = "Klaster 2";
  filterMonthKategoriSkrining: string = "Januari";
  filterYearKategoriSkrining: string = "2024";

  filterClasterKategoriSkriningDaerah: string = "Klaster 2";
  filterMonthKategoriSkriningDaerah: string = "Januari";
  filterYearKategoriSkriningDaerah: string = "2024";

  filterSubDistrictBySkrining: string = "Jantho";
  filterSubClasterBySkrining: string = "Ibu Hamil, Bersalin, Nifas";
  filterMonthBySkrining: string = "Januari";
  filterYearBySkrining: string = "2024";

  constructor(private api: laporanskriningilpService) { }

  ngOnInit() {
    this.getTotalPasien();
    this.getTotalPasienSkrining();
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
