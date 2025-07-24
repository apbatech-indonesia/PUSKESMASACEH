import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKanker {
  getdata() {
    return {
      observations: [
        {
          name: "kongenital_right_ear",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "exam",
            display: "Exam"
          },
          data: [
            {
              code: {
                system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                code: "OC000150",
                display: "Suspek tuli kongenital "
              },

              bodySite: {
                system: "http://snomed.info/sct",
                code: "25577004",
                display: "Right ear structure"
              },
              resultBoolean: false,
              result: {
                value: 71,
                unit: "kg",
                system: "http://unitsofmeasure.org",
                code: "kg"
              },
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "164854000",
                display: "Electrocardiogram normal"
              }
          ],
          effectiveDateTime: "2024-04-24T00:23:30+00:00",
          issued: "2024-04-24T00:23:30+00:00"
        }
      ]
    }
  }
}


