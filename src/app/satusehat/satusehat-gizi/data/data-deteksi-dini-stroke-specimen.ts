import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiStrokeSpecimen {
  getdata() {
    return {
      specimens: [
        {
          name: "blood_specimen",
          status: "available",
          type: {
            system: "http://snomed.info/sct",
            code: "119297000",
            display: "Blood specimen"

          },
          collection: {
            method: {
              system: "http://snomed.info/sct",
              code: "82078001",
              display: "Collection of blood specimen for laboratory"
            },
            collectedDateTime: "2024-04-24T02:32:15+00:00"
          }]
    }
  }
}

