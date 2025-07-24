import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicObservation {
  result: any
  dateNow = new Date().toISOString()

  getdata() {
    return {
      observations: [
        {
          name: "inspection_of_vagina_observation",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "exam",
            display: "Exam"
          },
          data: [
            {
              code: {
                system: "http://snomed.info/sct",
                code: "451024007",
                display: "Inspection of vagina using vaginal speculum"
              },

              bodySite: {},
              resultBoolean: false,
              result: {
                value: 123.456,
                unit: "mg/dL",
                system: "http://unitsofmeasure.org",
                code: "mg/dL"
              },
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "395100000",
                display: this.result
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






