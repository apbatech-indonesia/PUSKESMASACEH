import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniPendengaran {
  leftEar: DiagnosaPendengaran
  rightEar: DiagnosaPendengaran
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
                code: this.rightEar.code,
                display: this.rightEar.display
              },
              bodySite: {
                system: "http://snomed.info/sct",
                code: "25577004",
                display: "Right ear structure"
              },
              resultBoolean: false,
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "164854000",
                display: "Electrocardiogram normal"
              }
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
                code: this.leftEar.code,
                display: this.leftEar.display
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
            }
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow
        }
      ]
    }
  }
}

class DiagnosaPendengaran { 
  code: any = "OC000150"
  display: any = "Suspek tuli kongenital"
}
