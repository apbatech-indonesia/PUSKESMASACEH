import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
let emrUrl = "https://emr.clenicapp.com/api/";

@Injectable({
  providedIn: "root",
})
export class DashboardDinkesService {
  constructor(public http: HttpClient) {}

  getAvaiableYears(slugCity: any) {
    return this.http
      .get(emrUrl + `${slugCity}/dashboard-dinkes/avaiable-years`)
      .toPromise();
  }

  getTotalKunjungan(
    slugCity: any,
    startDate: string | null = null,
    endDate: string | null = null
  ) {
    const url = new URL(
      `${emrUrl}${slugCity}/dashboard-dinkes/total-kunjungan`
    );

    if (startDate) url.searchParams.append("start_date", startDate);
    if (endDate) url.searchParams.append("end_date", endDate);

    return this.http.get(url.toString()).toPromise();
  }

  getTotalBpjs(
    slugCity: any,
    startDate: string | null = null,
    endDate: string | null = null
  ) {
    const url = new URL(`${emrUrl}${slugCity}/dashboard-dinkes/total-bpjs`);

    if (startDate) url.searchParams.append("start_date", startDate);
    if (endDate) url.searchParams.append("end_date", endDate);

    return this.http.get(url.toString()).toPromise();
  }

  getPasienBaruLama(
    slugCity: any,
    startDate: string | null = null,
    endDate: string | null = null
  ) {
    const url = new URL(
      `${emrUrl}${slugCity}/dashboard-dinkes/pasien-baru-lama`
    );

    if (startDate) url.searchParams.append("start_date", startDate);
    if (endDate) url.searchParams.append("end_date", endDate);

    return this.http.get(url.toString()).toPromise();
  }

  getTopTenObat(slugCity: any) {
    return this.http
      .get(emrUrl + `${slugCity}/dashboard-dinkes/top-ten-obat`)
      .toPromise();
  }

  getTopTenPenyakit(slugCity: any) {
    return this.http
      .get(emrUrl + `${slugCity}/dashboard-dinkes/top-ten-penyakit`)
      .toPromise();
  }

  getKunjunganPoliPerBulan(slugCity: any, bulan?: any, tahun?: any) {
    const today = new Date();
    bulan = bulan ?? today.getMonth() + 1;
    tahun = tahun ?? today.getFullYear();

    return this.http
      .get(
        emrUrl +
          `${slugCity}/dashboard-dinkes/kunjungan-poli/bulan/${bulan}/tahun/${tahun}`
      )
      .toPromise();
  }

  getKunjunganPKM(
    slugCity: any,
    startDate: string | null = null,
    endDate: string | null = null
  ) {
    const url = new URL(`${emrUrl}${slugCity}/dashboard-dinkes/kunjungan-pkm`);

    if (startDate) url.searchParams.append("start_date", startDate);
    if (endDate) url.searchParams.append("end_date", endDate);

    return this.http.get(url.toString()).toPromise();
  }
}
