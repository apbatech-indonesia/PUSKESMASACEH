import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataDeteksiDiniDiabetesSpecimen {
  status: any = "";
  dateNow: any = new Date().toISOString();

  getdata() {
    return {
      specimens: [
        {
          name: "blood_specimen_diabetes",
          status: this.status,
          type: {
            system: "http://snomed.info/sct",
            code: "119297000",
            display: "Blood specimen",
          },
          collection: {
            method: {
              system: "http://snomed.info/sct",
              code: "82078001",
              display: "Collection of blood specimen for laboratory",
            },
            collectedDateTime: this.dateNow,
          },
        },
      ],
    };
  }
}
