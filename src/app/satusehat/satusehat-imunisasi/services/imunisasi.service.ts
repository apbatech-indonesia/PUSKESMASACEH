import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class ImunisasiService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  constructor(public http: HttpClient) { }

  createKunjunganImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/createKunjungan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/observation', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  reportImunisasiImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/reportImunisasi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  diagnosaImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/diagnosa', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  tindakanImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/tindakan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  updateKunjunganImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/updateKunjungan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  getMasterImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'terminologi/search', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
}
