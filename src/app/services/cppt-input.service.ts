import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-cppt-input",
  template: "",
})
export class CpptInputService implements OnInit {
  td: number | null = null;
  tdd: number | null = null;

  showtd = false;
  showtdd = false;

  // Array penyimpan data dari API
  recentTd: string[] = [];
  recentTdd: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRecentValues();
  }

  // API dipanggil CUMA 1 KALI di sini
  fetchRecentValues() {
    this.http
      .get<any>("https://emr.clenicapp.com/api/tabaro/cppt/recent-values")
      .subscribe({
        next: (res) => {
          if (res && res.data) {
            this.recentTd = res.data.td || [];
            this.recentTdd = res.data.tdd || [];
          }
        },
        error: (err) => console.error("Gagal mengambil recent values", err),
      });
  }
}
