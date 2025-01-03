import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class SkriningPTMService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  constructor(public http: HttpClient) { }

  createKunjunganSkriningPtm(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/createKunjungan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  updateRiwayat(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/updateRiwayat', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  faktorResiko(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/faktorResiko', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  deteksiDiniObesitas(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/deteksiDini/obesitas', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  deteksiDiniHipertensi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/deteksiDini/hipertensi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  deteksiDiniMata(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/deteksiDini/mata', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  diagnosa(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/diagnosa', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  procedure(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/proceduresCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  tindakLanjut(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/tindakLanjut', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  kondisiKeluar(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/tindakLanjut', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  updateKunjungan(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/updateKunjungan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
}
