import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Condition,
  ConditionRequestData,
} from "src/app/satusehat/satusehat-gigi/data/models/condition-create.model";
import {
  BodySite,
  Codeable,
  Interpretation,
  Observation,
  ObservationRequestData,
  Result,
  ValueQuantity,
} from "src/app/satusehat/satusehat-gigi/data/models/observation-create.model";
let satusehatUrl = "https://besatusehat.clenicapp.com/api/";

@Injectable({
  providedIn: "root",
})
export class PkgService {
  DELAY = 10;

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

  async doSubmitObservation(data: {
    encounterId;
    useCaseId;
    satusehatId;
    name: string;
    category: Codeable;
    code: Codeable;
    result?: Result;
    resultBoolean?: boolean;
    valueInteger?: number;
    valueQuantity?: ValueQuantity;
    valueCodeableConcept?: Codeable;
    interpretation?: Interpretation;
    bodySite?: BodySite;
  }) {
    let request = new ObservationRequestData(
      data.encounterId,
      data.useCaseId,
      data.satusehatId,
      [
        new Observation({
          observationName: data.name,
          category: data.category,
          code: data.code,
          valueCodeableConcept: data.valueCodeableConcept,
          valueQuantity: data.valueQuantity,
          result: data.result,
          resultBoolean: data.resultBoolean,
          valueInteger: data.valueInteger,
          interpretation: data.interpretation,
          bodySite: data.bodySite,
        }),
      ]
    );

    return this.createObservation(request);
  }

  private async doSubmitCondition(data: {
    encounterId;
    useCaseId;
    idsatusehat;
    conditionName;
    conditionCode;
    conditionDisplay;
    categoryCode;
    categoryDisplay;
  }) {
    let request = new ConditionRequestData(
      data.encounterId,
      data.useCaseId,
      data.idsatusehat,
      [
        new Condition(
          data.conditionName,
          data.conditionCode,
          data.conditionDisplay,
          data.categoryCode,
          data.categoryDisplay
        ),
      ]
    );

    return this.createCondition(request);
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async runWithDelay(promises) {
    const results = [];
    for (const promiseFunc of promises) {
      const result = await promiseFunc(); // jalankan promise
      results.push(result);
      await this.delay(this.DELAY); // delay sebelum lanjut ke promise berikutnya
    }
    return results;
  }
}
