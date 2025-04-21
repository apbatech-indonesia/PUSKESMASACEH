import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
let satusehatUrl = "https://besatusehat.clenicapp.com/api/";

@Injectable({
  providedIn: "root",
})
export class PkgService {
  userData: any = JSON.parse(localStorage.getItem("userDatacl")).userData;
  headers = new HttpHeaders({
    "kd-cabang": this.userData.kdcabang,
  });

  constructor(public http: HttpClient) {}

  createKunjungan(data: any) {
    return new Promise((resolve) => {
      this.http
        .post(satusehatUrl + "resource/Encounter/register", data, {
          headers: this.headers,
        })
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  createRelatedPerson(data: any) {
    return new Promise((resolve) => {
      this.http
        .post(satusehatUrl + "resource/RelatedPerson/create", data, {
          headers: this.headers,
        })
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  createAllergyIntolerance(data: any) {
    return new Promise((resolve) => {
      this.http
        .post(satusehatUrl + "resource/allergyIntolerances/create", data, {
          headers: this.headers,
        })
        .subscribe((response) => resolve(response));
    });
  }

  createSpecimen(data: any) {
    return new Promise((resolve) => {
      this.http
        .post(satusehatUrl + "resource/Specimens/create", data, {
          headers: this.headers,
        })
        .subscribe((response) => resolve(response));
    });
  }

  createObservation(data: any) {
    return new Promise((resolve) => {
      this.http
        .post(satusehatUrl + "resource/Observation/create", data, {
          headers: this.headers,
        })
        .subscribe((response) => resolve(response));
    });
  }

  createProcedure(data: any) {
    return new Promise((resolve) => {
      this.http
        .post(satusehatUrl + "resource/procedures/create", data, {
          headers: this.headers,
        })
        .subscribe((response) => resolve(response));
    });
  }

  createCondition(data: any) {
    return new Promise((resolve) => {
      this.http
        .post(satusehatUrl + "resource/Condition/create", data, {
          headers: this.headers,
        })
        .subscribe((response) => resolve(response));
    });
  }

  createServiceRequest(data: any) {
    return new Promise((resolve) => {
      this.http
        .post(satusehatUrl + "resource/ServiceRequest/create", data, {
          headers: this.headers,
        })
        .subscribe((response) => resolve(response));
    });
  }
}
