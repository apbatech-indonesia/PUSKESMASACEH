import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root", // Singleton Service: data tersimpan & konsisten di semua komponen
})
export class CpptService {
  // Variabel tempat menyimpan hasil API
  td: string[] = [];
  tdd: string[] = [];
  hr: string[] = [];
  suhu: string[] = [];
  rr: string[] = [];
  spo: string[] = [];
  tb: string[] = [];
  bb: string[] = [];
  lingkarperut: string[] = [];
  lingkarkepala: string[] = [];
  lingkarlenganatas: string[] = [];
  lingkarbetis: string[] = [];

  constructor(private http: HttpClient) {}

  // Fungsi untuk hit API (cukup dipanggil 1x saja)
  fetchRecentValues(slug: any) {
    let apiUrl = `https://emr.clenicapp.com/api/${slug}/cppt/recent-values`;
    this.http.get<any>(apiUrl).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.td = res.data.td || [];
          this.tdd = res.data.tdd || [];
          this.hr = res.data.hr || [];
          this.suhu = res.data.suhu || [];
          this.rr = res.data.rr || [];
          this.spo = res.data.spo || [];
          this.tb = res.data.tb || [];
          this.bb = res.data.bb || [];
          this.lingkarperut = res.data.lingkarperut || [];
          this.lingkarkepala = res.data.lingkarkepala || [];
          this.lingkarlenganatas = res.data.lingkarlenganatas || [];
          this.lingkarbetis = res.data.lingkarbetis || [];
        }
      },
      error: (err) => console.error("Gagal mengambil recent values:", err),
    });
  }
}
