import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniPendengaran {
  // questioner 
  dateNow: any = new Date().toISOString()

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
                display: "Suspek tuli kongenital"
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
          effectiveDateTime: this.dateNow,
          issued: this.dateNow
        },
        {
          name: "kongenital_left_ear",
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
                display: "Suspek tuli kongenital"
              },
              bodySite: {
                system: "http://snomed.info/sct",
                code: "89644007",
                display: "Left ear structure"
              },
              resultBoolean: false,
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "164854000",
                display: "Electrocardiogram normal"
              }
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow
        }
      ]
    }
  }
}


