import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormBalitaSakitService {
  private baseUrl = "https://emr.clenicapp.com/api"; // sesuaikan prefix route API-mu

  constructor(private http: HttpClient) {}

  /**
   * Create
   * @param slugCabang nama cabang sebagai slug (mis: 'JKT', 'BDG')
   * @param payloadData data payload yang akan dikirim (object JSON payload)
   * @returns Observable hasil API
   */
  create(slugCabang: string, payloadData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${slugCabang}/form-mtbs`,
      payloadData
    );
  }

  /**
   * Update
   * @param slugCabang nama cabang
   * @param id ID record yang akan diupdate
   * @param payloadData data payload yang akan diupdate
   * @returns Observable hasil API
   */
  update(slugCabang: string, id: number, payloadData: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${slugCabang}/form-mtbs/${id}`,
      payloadData
    );
  }

  /**
   * Read / Show data
   * @param slugCabang nama cabang
   * @param norm no rekam medis
   * @param notransaksi no transaksi
   * @returns Observable hasil API (akan mengembalikan payload terdecode JSON)
   */
  getByNormAndTransaksi(
    slugCabang: string,
    norm: string,
    notransaksi: string
  ): Observable<any> {
    const params = new HttpParams()
      .set("norm", norm)
      .set("notransaksi", notransaksi);

    return this.http.get(`${this.baseUrl}/${slugCabang}/form-mtbs`, { params });
  }

  downloadPdf(
    slugCabang: string,
    norm: string,
    notransaksi: string
  ): Observable<Blob> {
    const url = `${this.baseUrl}/${slugCabang}/form-mtbs/generate-pdf`;
    const params = new HttpParams()
      .set("norm", norm)
      .set("notransaksi", notransaksi);

    return this.http.get(url, { responseType: "blob", params: params });
  }
}
