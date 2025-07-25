import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class MtbmService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  constructor(public http: HttpClient) { }

  createKunjunganMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/createKunjungan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  createRelatedPersonMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/createRelatedPerson', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  keluhanUtamaMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/keluhanUtama', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationAntropometriMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/observationAntropometri', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationTandaVitalMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/observationTandaVital', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/observationMTBM', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationAsiMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/observationAsi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationAirMinumMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/observationAirMinum', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationVitaminKMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/observationVitaminK', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  diagnosaMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/diagnosa', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  imunisasiMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/imunisasi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  tindakanMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/tindakan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  tindakLanjutMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/tindakLanjut', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  meninggalkanFaskesMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/meninggalkanFaskes', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  updateKunjunganMTBM(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'mtbm/updateKunjungan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
}
