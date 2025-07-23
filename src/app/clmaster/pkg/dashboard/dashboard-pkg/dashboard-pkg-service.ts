import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardPkgService {
  private apiUrl = "https://emr.clenicapp.com/api/tabaro/dashboard-pkg";

  constructor(private http: HttpClient) {}

  /**
   * Fetch package list with optional filters
   * @param filters Object of filter parameters
   */
  getPkgList(
    filters: {
      status?: string;
      provinsi?: string;
      kota?: string;
      kecamatan?: string;
      kelurahan?: string;
      jenis_kelamin?: string;
      umur?: string;
    } = {}
  ): Observable<any> {
    let params = new HttpParams();

    // Loop through filters and add to params if not null/undefined
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof typeof filters];
      if (value !== undefined && value !== null) {
        params = params.set(key, value);
      }
    });

    return this.http.get<any>(`${this.apiUrl}/summary`, { params });
  }

  getDaerahList(
    filters: {
      status?: string;
      provinsi?: string;
      kota?: string;
      kecamatan?: string;
      kelurahan?: string;
    } = {}
  ): Observable<any> {
    let params = new HttpParams();
    if (filters.status) params = params.set("status", filters.status);
    if (filters.provinsi) params = params.set("provinsi", filters.provinsi);
    if (filters.kota) params = params.set("kota", filters.kota);
    if (filters.kecamatan) params = params.set("kecamatan", filters.kecamatan);
    if (filters.kelurahan) params = params.set("kelurahan", filters.kelurahan);

    return this.http.get(`${this.apiUrl}/master-daerah`, { params });
  }

  getTotalByGender(
    filters: {
      status?: string;
      provinsi?: string;
      kota?: string;
      kecamatan?: string;
      kelurahan?: string;
      jenis_kelamin?: string;
      umur?: string;
    } = {}
  ): Observable<any> {
    let params = new HttpParams();
    if (filters.status) params = params.set("status", filters.status);
    if (filters.provinsi) params = params.set("provinsi", filters.provinsi);
    if (filters.kota) params = params.set("kota", filters.kota);
    if (filters.kecamatan) params = params.set("kecamatan", filters.kecamatan);
    if (filters.kelurahan) params = params.set("kelurahan", filters.kelurahan);

    return this.http.get(`${this.apiUrl}/total-by-gender`, { params });
  }

  getTrend(
    filters: {
      status?: string;
      provinsi?: string;
      kota?: string;
      kecamatan?: string;
      kelurahan?: string;
      startDate?: string;
      endDate?: string;
    } = {}
  ): Observable<any> {
    let params = new HttpParams();
    if (filters.status) params = params.set("status", filters.status);
    if (filters.provinsi) params = params.set("provinsi", filters.provinsi);
    if (filters.kota) params = params.set("kota", filters.kota);
    if (filters.kecamatan) params = params.set("kecamatan", filters.kecamatan);
    if (filters.kelurahan) params = params.set("kelurahan", filters.kelurahan);
    if (filters.startDate) params = params.set("start_date", filters.startDate);
    if (filters.endDate) params = params.set("end_date", filters.endDate);

    return this.http.get(`${this.apiUrl}/trend`, { params });
  }

  getPemeriksaanList(
    filters: {
      status?: string;
      provinsi?: string;
      kota?: string;
      kecamatan?: string;
      kelurahan?: string;
    } = {}
  ): Observable<any> {
    let params = new HttpParams();
    if (filters.status) params = params.set("status", filters.status);
    if (filters.provinsi) params = params.set("provinsi", filters.provinsi);
    if (filters.kota) params = params.set("kota", filters.kota);
    if (filters.kecamatan) params = params.set("kecamatan", filters.kecamatan);
    if (filters.kelurahan) params = params.set("kelurahan", filters.kelurahan);

    return this.http.get(`${this.apiUrl}/pemeriksaan-list`, { params });
  }

  getKetegoriSummary(
    filters: {
      status?: string;
      provinsi?: string;
      kota?: string;
      kecamatan?: string;
      kelurahan?: string;
      startDate?: string;
      endDate?: string;
    } = {}
  ): Observable<any> {
    let params = new HttpParams();
    if (filters.status) params = params.set("status", filters.status);
    if (filters.provinsi) params = params.set("provinsi", filters.provinsi);
    if (filters.kota) params = params.set("kota", filters.kota);
    if (filters.kecamatan) params = params.set("kecamatan", filters.kecamatan);
    if (filters.kelurahan) params = params.set("kelurahan", filters.kelurahan);
    if (filters.startDate) params = params.set("start_date", filters.startDate);
    if (filters.endDate) params = params.set("end_date", filters.endDate);

    return this.http.get(`${this.apiUrl}/kategori-summary`, { params });
  }

  getKehadiranSummary(
    filters: {
      provinsi?: string;
      kota?: string;
      kecamatan?: string;
      kelurahan?: string;
    } = {}
  ): Observable<any> {
    let params = new HttpParams();
    if (filters.provinsi) params = params.set("provinsi", filters.provinsi);
    if (filters.kota) params = params.set("kota", filters.kota);
    if (filters.kecamatan) params = params.set("kecamatan", filters.kecamatan);
    if (filters.kelurahan) params = params.set("kelurahan", filters.kelurahan);

    return this.http.get(`${this.apiUrl}/hadir-janji-summary`, { params });
  }

  createDashboardPkg(payload: {
    norm: string;
    notransaksi: string;
    layanan: string;
    status: string;
    jenis_kelamin?: string;
    umur?: number;
    provinsi?: string;
    kota?: string;
    kecamatan?: string;
    kelurahan?: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}
