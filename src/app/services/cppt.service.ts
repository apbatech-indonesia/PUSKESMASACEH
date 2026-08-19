import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root", // Singleton Service: data tersimpan & konsisten di semua komponen
})
export class CpptService {
  // Variabel tempat menyimpan hasil API
  recentTd: string[] = [];
  recentTdd: string[] = [];

  constructor(private http: HttpClient) {}

  // Fungsi untuk hit API (cukup dipanggil 1x saja)
  fetchRecentValues(slug: any) {
    let apiUrl = `https://emr.clenicapp.com/api/${slug}/cppt/recent-values`;
    this.http.get<any>(apiUrl).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.recentTd = res.data.td || [];
          this.recentTdd = res.data.tdd || [];
        }
      },
      error: (err) => console.error("Gagal mengambil recent values:", err),
    });
  }
}
