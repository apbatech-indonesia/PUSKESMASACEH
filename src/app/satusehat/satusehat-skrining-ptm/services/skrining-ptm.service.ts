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
      this.http.post(satusehatUrl + 'skrining/conditionsCreate', data, { headers: this.headers }).subscribe((data) => {
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

  observationsCreate(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/observationsCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  conditionsCreate(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/conditionsCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  proceduresCreate(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/proceduresCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  serviceRequestsCreate(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/serviceRequestsCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  specimensCreate(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/specimensCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  diagnosticReportsCreate(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/diagnosticReportsCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  questionnaireResponsesCreate(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/questionnaireResponsesCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  tindakLanjut(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/serviceRequestsCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  encountersUpdate(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'skrining/encountersUpdate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

}
