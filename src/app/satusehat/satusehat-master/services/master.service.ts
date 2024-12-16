import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  constructor(public http: HttpClient) { }

  getProvince(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'master/province', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  getCity(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'master/cities', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  getDistrict(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'master/district', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  getSubDistrict(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'master/subDistrict', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  getKfa(data: any) {
    data = new URLSearchParams(data);
    return new Promise((resolve) => {
      this.http.get(satusehatUrl + `master/getKfa?${data.toString()}`, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  getKfaByCode(id: any) {
    return this.http.get(satusehatUrl + `master/getKfa/${id}`, { headers: this.headers }).toPromise()
  }
}
