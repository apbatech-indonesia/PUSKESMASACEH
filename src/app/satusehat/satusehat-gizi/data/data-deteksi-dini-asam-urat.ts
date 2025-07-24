import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniAsamUrat {
  // questioner 
  visusKiri: any
  visusKanan: any
  numeratorMataKanan: any
  denominatorMataKanan: any
  numeratorMataKiri: any
  denominatorMataKiri: any

  getdata() {
    return {
      observations: [
        {
          name: "kanker_vagina",
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
              result: {},
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "395100000",
                display: "No evidence of cancer found"
              }
          ],
          effectiveDateTime: "2024-04-24T00:23:30+00:00",
          issued: "2024-04-24T00:23:30+00:00"
        }
      ]
    }
  }
}


