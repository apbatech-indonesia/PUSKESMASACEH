import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class skriningService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  constructor(public http: HttpClient) { }

  getCluster() {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'cluster/getGroup', null, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  getSkrinigById(data:any) {
    let urlMock = 'https://16f3fc19dc1c4661884e009029ca3207.api.mockbin.io/'
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'screening/search', data, { headers: this.headers }).subscribe((data) => {
      // this.http.post(urlMock, data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
}