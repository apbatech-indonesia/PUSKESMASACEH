import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
let apiurl = localStorage.getItem("baseUrl");
let apiurx = localStorage.getItem("baseUrx");
@Injectable({
  providedIn: "root",
})
export class FarmasijualService {
  constructor(public http: HttpClient) {}

  ceknokunjungan(notransasal): Observable<any> {
    return this.http.get(
      apiurx + "master/ceknokunjungan.php?notransaksi=" + notransasal
    );
  }
  simpanobatbpjs(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/obat.php", data);
  }
  simpanbeliakhir(data: any): Observable<any> {
    return this.http.post(apiurx + "transaksi/simpanbeliakhir.php", data);
  }
  cekkunjunganobat(a): Observable<any> {
    return this.http.get(
      apiurx + "pcare/cekkunjunganobat.php?nokunjungan=" + a
    );
  }
  deleteobat(a, b): Observable<any> {
    return this.http.get(
      apiurx + "pcare/deleteobat.php?nokunjungan=" + a + "&kodeObatSK=" + b
    );
  }

  listtarif(a): Observable<any> {
    return this.http.get(apiurx + "pcare/listtarif.php?kdTkp=" + a);
  }

  cekdokter(): Observable<any> {
    return this.http.get(apiurx + "pcare/cekdokter.php");
  }
  cekpoli(): Observable<any> {
    return this.http.get(apiurx + "pcare/getpoli.php");
  }

  cektindakankunjungan(a): Observable<any> {
    return this.http.get(
      apiurx + "pcare/cektindakankunjungan.php?nokunjungan=" + a
    );
  }

  addtindakan(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/addtindakan.php", data);
  }
  addantrean(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/addantrean.php", data);
  }
  panggil(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/panggil.php", data);
  }

  batal(data: any): Observable<any> {
    return this.http.post(apiurx + "pcare/batal.php", data);
  }
  deletetindakan(a: any, b): Observable<any> {
    return this.http.get(
      apiurx + "pcare/deletetindakan.php?nokunjungan=" + a + "&kdtindakan=" + b
    );
  }
  getriwayatkunjungan(a): Observable<any> {
    return this.http.get(apiurx + "pcare/getriwayatkunjungan.php?nokartu=" + a);
  }

  listobatkirimpcare(a, b): Observable<any> {
    return this.http.get(
      apiurx +
        "transaksi/listobatkirimpcare.php?kdcabang=" +
        a +
        "&notrans=" +
        b
    );
  }
  ceksatusehat(a): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/ceksatusehat.php?notransaksi=" + a
    );
  }
  cekjadwal(a, b): Observable<any> {
    return this.http.get(
      apiurx + "transaksi/cekjadwal.php?kddokter=" + a + "&kodepoliasli=" + b
    );
  }
}
