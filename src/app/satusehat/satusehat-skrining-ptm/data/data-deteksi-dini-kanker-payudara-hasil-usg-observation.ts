import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerPayudaraHasilUsgObservation {
  dateNow = new Date().toISOString()
  
  getdata() {
    return {
      observations: [
        {
          name: "us_breast_observation",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "imaging",
            display: "Imaging"
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "24601-7",
                display: "US Breast"
              },
              bodySite: {},
              resultBoolean: false,
              result: {},
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "290084006",
                display: "Breast normal"
              }
            }
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow
        }
      ]
    }
  }
}
