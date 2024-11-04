import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class MtbsService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  constructor(public http: HttpClient) { }

  createKunjunganMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/createKunjungan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  createRelatedPersonMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/createRelatedPerson', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  keluhanUtamaMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/keluhanUtama', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationAntropometri(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/observationAntropometri', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationTandaVitalMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/observationTandaVital', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/observationMTBS', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationAsiMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/observationAsi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  diagnosaAsiMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/diagnosaAsi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationVitaminKMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/observationVitaminK', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  diagnosaMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/diagnosa', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  imunisasiMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/imunisasi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  tindakanMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/tindakan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  tindakLanjutMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/tindakLanjut', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  meninggalkanFaskesMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/meninggalkanFaskes', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  updateKunjunganMTBS(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbs/updateKunjungan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
}
