import { Component, OnInit } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { laporanskriningilpService } from "./laporanskriningilp.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiserviceService } from "src/app/apiservice.service";
import { MasterService } from "src/app/satusehat/satusehat-master/services/master.service";

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
  selector: "app-laporanskriningilp",
  templateUrl: "./laporanskriningilp.component.html",
  styleUrls: ["./laporanskriningilp.component.css"],
})
export class laporanskriningilpComponent implements OnInit {
  faSearch = faSearch;
  userData: any = JSON.parse(localStorage.getItem("userDatacl")).userData;
  branchId = this.userData.kdcabang;

  jumlahPasienTerdaftar: number = 0;
  jumlahPasienTerskrining: number = 0;
  jumlahPasienBelumSkrining: number = 0;

  grapikTahunanTotalSkrining: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  grapikBerdasarkanDaerah: number[] = [
    100, 96, 6, 22, 11, 51, 17, 38, 68, 66, 19, 42, 62, 37, 73,
  ];

  listOfClasters: string[] = ["Klaster 2", "Klaster 3", "Klaster 4"];
  listOfClasterLabels: string[] = ["Klaster 2", "Klaster 3", "Klaster 4"];
  listOfSubClastersId: string[] = [
    "Ibu Hamil, Bersalin, Nifas",
    "Balita dan Anak Persekolahan",
  ];
  listOfYears: string[] = [];
  listOfMonths: string[] = [
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
  listOfSubDistricts: string[] = [];
  listOfSubDistrictsId: string[] = [];
  listOfColors = {
    color1: [
      "bg-pb-green-custom",
      "bg-pb-brown-custom",
      "bg-pb-bluesky-custom",
      "bg-pb-yellow-custom",
    ],
    color2: ["bg-pb-blue-custom", "bg-pb-orange-custom"],
  };

  currentYear: string = new Date().getFullYear().toString();

  SEMUALOKASI = "Semua Lokasi";
  SEMUABULAN = "Semua Bulan";
  SEMUAKLASTER = "Semua Klaster";
  SEMUASKRINING = "Semua Skrining";
  SEMUATAHUN = "Semua Tahun";

  filterYearTotalSkrining: string = this.currentYear;

  filterSubDistrictKlaster: string = this.SEMUALOKASI;
  filterMonthKlaster: string = this.SEMUABULAN;
  filterYearKlaster: string = this.currentYear;

  filterSubDistrictKategoriSkrining: string = this.SEMUALOKASI;
  filterClasterKategoriSkrining: string = this.SEMUAKLASTER;
  filterMonthKategoriSkrining: string = this.SEMUABULAN;
  filterYearKategoriSkrining: string = this.currentYear;

  filterClasterKategoriSkriningDaerah: string = this.SEMUAKLASTER;
  filterMonthKategoriSkriningDaerah: string = this.SEMUABULAN;
  filterYearKategoriSkriningDaerah: string = this.currentYear;

  filterSubDistrictBySkrining: string = this.SEMUALOKASI;
  filterSubClasterBySkrining: any = this.SEMUASKRINING;
  filterMonthBySkrining: string = this.SEMUABULAN;
  filterYearBySkrining: string = this.currentYear;

  listOfCategoryScreening: object[];
  listOfPercentageClaster: number[] = [0, 0, 0];
  listOfPatientByScreening: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  listOfSubClasterName: any;
  listOfAllSkrining: any;

  mappedProvince: any;
  mappedKota: any;
  mappedKecamatan: any;
  mappedKelurahan: any;

  constructor(
    private api: laporanskriningilpService,
    private apiService: ApiserviceService,
    private masterService: MasterService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getTotalPasien();
    this.getTotalPasienSkrining();
    this.getPatientByClusterGroup();
    this.getTotalPasienByCategorySkrining();
    this.getPatientByVillage();
    this.getAllSubClaster();
    this.getTotalPatientByScreening();

    // this.doMappingWilayah();
  }

  openModal(content) {
    this.modalService
      .open(content, { size: "xl", ariaLabelledBy: "modal" })
      .result.then((result) => {
        console.log("test");
      });
  }

  async getTotalPasien() {
    try {
      const payload = { branchId: this.branchId };
      const response = (await this.api.getPatientStatus(
        payload
      )) as ApiResponse;

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

      const payload: any = {
        branchId: this.branchId,
        year: this.filterYearTotalSkrining,
      };

      const response: any = await this.api.getPatientStatus(payload);

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      const yearData =
        response.data[0].data_screenings[this.filterYearTotalSkrining];

      if (!yearData) {
        throw new Error(
          `Data untuk tahun ${this.filterYearTotalSkrining} tidak ditemukan`
        );
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
      const payload: any = {
        branchId: this.branchId,
        year: this.filterYearKlaster,
      };

      if (this.filterMonthKlaster != this.SEMUABULAN) {
        payload.month = String(
          this.listOfMonths.indexOf(this.filterMonthKlaster) + 1
        ).padStart(2, "0");
      }

      if (this.filterSubDistrictKlaster != this.SEMUALOKASI) {
        payload.villageId =
          this.listOfSubDistrictsId[
            this.listOfSubDistricts.indexOf(this.filterSubDistrictKlaster)
          ];
      }
      const response: any = await this.api.getPatientByClusterGroup(payload);

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      this.listOfPercentageClaster = response.data.map(
        (item) => item.percentage
      );
      this.listOfClasters = response.data.map(
        (item) => item.group.split(" -")[0] || "Unknown"
      );
      this.listOfClasterLabels = response.data.map((item) => {
        const group = item.group.split(" -")[0] || "Unknown";
        return `${group} (${item.total_patients} Pasien)`;
      });
    } catch (error) {
      console.error("Error saat mengambil total pasien skrining:", error);
    }
  }

  async getTotalPasienByCategorySkrining() {
    try {
      if (!this.filterYearKategoriSkrining) {
        throw new Error("Tahun filter tidak tersedia");
      }

      const payload: any = {
        branchId: this.branchId,
        year: this.filterYearKategoriSkrining,
      };

      if (this.filterClasterKategoriSkrining !== this.SEMUAKLASTER) {
        payload.clusterGroup = this.filterClasterKategoriSkrining;
      }

      if (this.filterMonthKategoriSkrining !== this.SEMUABULAN) {
        payload.month = String(
          this.listOfMonths.indexOf(this.filterMonthKategoriSkrining) + 1
        ).padStart(2, "0");
      }

      if (this.filterSubDistrictKategoriSkrining != this.SEMUALOKASI) {
        payload.villageId =
          this.listOfSubDistrictsId[
            this.listOfSubDistricts.indexOf(
              this.filterSubDistrictKategoriSkrining
            )
          ];
      }
      const response: any = await this.api.getPatientByCluster(payload);

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      this.listOfCategoryScreening = response.data[0].clusters;
    } catch (error) {
      console.error("Error saat mengambil total pasien skrining:", error);
    }
  }

  async getAllSubClaster() {
    try {
      const payload = {};
      const response: any = await this.api.getPatientByCluster(payload);

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      this.listOfSubClastersId = response.data
        .map((item) => item.clusters)
        .flat()
        .map((item) => item.cluster_id);
      this.listOfSubClasterName = response.data
        .map((item) => item.clusters)
        .flat()
        .map((item) => item.cluster_name);
      this.listOfAllSkrining = response.data;
    } catch (error) {
      console.error("Error saat mengambil total pasien skrining:", error);
    }
  }

  async getPatientByVillage() {
    try {
      const payload: any = {
        branchId: this.branchId,
        year: this.filterYearKategoriSkriningDaerah,
      };

      if (this.filterMonthKategoriSkriningDaerah !== this.SEMUABULAN) {
        payload.month = String(
          this.listOfMonths.indexOf(this.filterMonthKategoriSkriningDaerah) + 1
        ).padStart(2, "0");
      }
      if (this.filterClasterKategoriSkriningDaerah !== this.SEMUAKLASTER) {
        payload.clusterGroup = this.filterClasterKategoriSkriningDaerah;
      }

      const response: any = await this.api.getPatientByVillage(payload);

      if (!response?.data?.length) {
        this.listOfSubDistrictsId = [];
        this.listOfSubDistricts = [];
        this.grapikBerdasarkanDaerah = [];
        throw new Error("Data tidak tersedia");
      }

      this.listOfSubDistrictsId = response.data.map((item) => item.village_id);
      this.listOfSubDistricts = response.data.map((item) => item.village_name);
      this.grapikBerdasarkanDaerah = response.data.map(
        (item) => item.total_patients
      );
    } catch (error) {
      console.error("Error saat mengambil total pasien skrining:", error);
    }
  }

  async getTotalPatientByScreening() {
    try {
      if (!this.filterYearBySkrining) {
        throw new Error("Tahun filter tidak tersedia");
      }

      const payload: any = {
        branchId: this.branchId,
        year: this.filterYearBySkrining,
      };

      if (this.filterMonthBySkrining !== this.SEMUABULAN) {
        payload.month = String(
          this.listOfMonths.indexOf(this.filterMonthBySkrining) + 1
        ).padStart(2, "0");
      }

      if (this.filterSubClasterBySkrining !== this.SEMUASKRINING) {
        payload.clusterId =
          this.listOfSubClastersId[
            this.listOfSubClasterName?.indexOf(this.filterSubClasterBySkrining)
          ] ?? 1;
      }

      if (this.filterSubDistrictBySkrining !== this.SEMUALOKASI) {
        payload.villageId =
          this.listOfSubDistrictsId[
            this.listOfSubDistricts.indexOf(this.filterSubDistrictBySkrining)
          ];
      }

      const response: any = await this.api.getPatientByScreening(payload);

      if (!response?.data?.length) {
        throw new Error("Data tidak tersedia");
      }

      this.listOfPatientByScreening = response.data;
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
    return Object.keys(dataScreenings).filter((key) => key !== "total_branch");
  }

  private extractScreenedValues(data: YearData): number[] {
    let filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      if (key !== "total") {
        acc[key] = value;
      }
      return acc;
    }, []);

    filteredData = Object.values(filteredData).map(
      (item) => item.screened ?? 0
    );

    return filteredData;
  }

  async mappingProvinsi() {
    try {
      const province: any = await this.masterService.getProvince({});
      if (!province?.data?.length)
        throw new Error("Data provinsi tidak ditemukan");

      this.mappedProvince = (
        await Promise.all(
          province.data.map(async (item) => {
            try {
              let provinsi: any = await this.apiService
                .propinsi(item.name)
                .toPromise();
              provinsi = provinsi?.[0] || null;

              return provinsi
                ? {
                    prov_name: item.name,
                    prov_satusehat: item.code,
                    prov_id: provinsi.prov_id,
                  }
                : null;
            } catch (err) {
              console.warn(`Gagal memproses provinsi: ${item.name}`, err);
              return null;
            }
          })
        )
      ).filter(Boolean); // Menghapus nilai `null` atau `undefined`

      // console.log("Mapped Province:", this.mappedProvince);
    } catch (error) {
      console.error("Terjadi kesalahan saat mapping provinsi:", error);
    }
  }

  async mappingKota() {
    try {
      if (!this.mappedProvince?.length)
        throw new Error("Mapped province tidak tersedia");

      this.mappedKota = await Promise.all(
        this.mappedProvince.map(async (item) => {
          try {
            const response: any = await this.masterService.getCity({
              province_codes: item.prov_satusehat,
            });

            return response?.data?.length
              ? {
                  prov_id: item.prov_id,
                  prov_name: item.prov_name,
                  city: response.data,
                }
              : null;
          } catch (err) {
            console.warn(
              `Gagal mengambil data kabupaten untuk ${item.prov_name}`,
              err
            );
            return null;
          }
        })
      );

      this.mappedKota = this.mappedKota.filter(Boolean).flatMap((province) =>
        province.city.map((city) => ({
          code: city.code,
          parent_code: city.parent_code,
          bps_code: city.bps_code,
          name: city.name.replace(/^Kota |^Kab\. /, ""),
          prov_id: province.prov_id,
        }))
      );

      this.mappedKota = await Promise.all(
        this.mappedKota
          .filter((item) => {
            const listKecamatan = ["Aceh Besar", "Aceh Barat"];
            return listKecamatan.includes(item.name);
          })
          .map(async (item) => {
            const response: any = await this.apiService
              .kabupaten(item.prov_id, item.name)
              .toPromise();
            return { ...item, city_id: response[0]?.city_id };
          })
      );

      // console.log("Mapped kota:", this.mappedKota);
    } catch (error) {
      console.error("Terjadi kesalahan saat mapping kabupaten:", error);
    }
  }

  async mappingKecamatan() {
    try {
      if (!this.mappedKota?.length)
        throw new Error("Mapped city tidak tersedia");

      this.mappedKecamatan = await Promise.all(
        this.mappedKota.map(async (city) => {
          await this.delay(1000);
          try {
            const response: any = await this.masterService.getDistrict({
              city_codes: city.code,
            });

            return response?.data?.length
              ? response.data.map((district) => ({
                  district_code: district.code,
                  city_code: city.code,
                  name: district.name.replace(/^Kec\. /, ""),
                  prov_id: city.prov_id,
                  city_id: city.city_id,
                }))
              : null;
          } catch (err) {
            console.warn(
              `Gagal mengambil data kecamatan untuk ${city.name}`,
              err
            );
            return null;
          }
        })
      );

      // Filter data null dan flat menjadi array satu dimensi
      this.mappedKecamatan = this.mappedKecamatan.filter(Boolean).flat();

      // Tambahkan city_id ke setiap kecamatan dari API lain
      this.mappedKecamatan = await Promise.all(
        this.mappedKecamatan.map(async (item) => {
          try {
            const response: any = await this.apiService
              .kecamatan(item.city_id, item.name)
              .toPromise();
            return { ...item, district_id: response[0]?.dis_id };
          } catch (error) {
            console.warn(
              `Gagal mengambil district_id untuk ${item.name}`,
              error
            );
            return { ...item, district_id: null };
          }
        })
      );
      this.mappedKecamatan = this.mappedKecamatan.filter(
        (item) => item.district_id != undefined
      );

      // console.log("Mapped District:", this.mappedKecamatan);
    } catch (error) {
      console.error("Terjadi kesalahan saat mapping kecamatan:", error);
    }
  }

  async mappingKelurahan() {
    try {
      if (!this.mappedKecamatan?.length)
        throw new Error("Mapped city tidak tersedia");

      this.mappedKelurahan = await Promise.all(
        this.mappedKecamatan.map(async (item) => {
          try {
            const response: any = await this.masterService.getSubDistrict({
              district_codes: item.district_code,
            });

            return response?.data?.length
              ? {
                  district_id: item.district_id,
                  district_name: item.name,
                  subdistricts: response.data,
                }
              : null;
          } catch (err) {
            console.warn(
              `Gagal mengambil data kecamatan untuk ${item.name}`,
              err
            );
            return null;
          }
        })
      );

      this.mappedKelurahan = this.mappedKelurahan
        .filter(Boolean)
        .flatMap((district) =>
          district.subdistricts.map((subdistrict) => ({
            code: subdistrict.code,
            parent_code: subdistrict.parent_code,
            name: subdistrict.name,
            district_id: district.district_id,
          }))
        );

      this.mappedKelurahan = await Promise.all(
        this.mappedKelurahan.map(async (item) => {
          try {
            const response: any = await this.apiService
              .keluarahan(item.district_id, item.name)
              .toPromise();
            return { ...item, subdistrict_id: response[0]?.subdis_id };
          } catch (err) {
            console.warn(
              `Gagal mengambil ID kecamatan untuk ${item.name}`,
              err
            );
            return { ...item, subdistrict_id: null };
          }
        })
      );
      this.mappedKelurahan = this.mappedKelurahan.filter(
        (item) => item.subdistrict_id != undefined
      );

      console.log("Mapped Subdistrict:", this.mappedKelurahan);
    } catch (error) {
      console.error("Terjadi kesalahan saat mapping subdistrict:", error);
    }
  }

  async delay(ms: number) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(resolve, ms);
      } catch (error) {
        reject(new Error(`Delay failed: ${error.message}`));
      }
    });
  }

  async doMappingWilayah() {
    let loading = "";
    let interval = setInterval(function () {
      loading += ".";
      console.log("Loading ." + loading);
    }, 1000);

    await this.mappingProvinsi();
    await this.mappingKota();
    await this.mappingKecamatan();
    await this.mappingKelurahan();

    let query = this.mappedKelurahan.map((item) => {
      return `UPDATE keluarahan SET satusehat_code = '${item.code}' WHERE subdis_id = '${item.subdistrict_id}';`;
    });
    console.log(query);
    clearInterval(interval);
  }
}
