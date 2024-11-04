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

  createRelatedPersonImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/createRelatedPerson', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  keluhanUtamaImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/keluhanUtama', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationAntropometri(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/observationAntropometri', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationTandaVitalImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/observationTandaVital', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/observationimunisasi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationAsiImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/observationAsi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  diagnosaAsiImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/diagnosaAsi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationVitaminKImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/observationVitaminK', data, { headers: this.headers }).subscribe((data) => {
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

  imunisasiImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/imunisasi', data, { headers: this.headers }).subscribe((data) => {
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

  tindakLanjutImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/tindakLanjut', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  meninggalkanFaskesImunisasi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'imunisasi/meninggalkanFaskes', data, { headers: this.headers }).subscribe((data) => {
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

}
