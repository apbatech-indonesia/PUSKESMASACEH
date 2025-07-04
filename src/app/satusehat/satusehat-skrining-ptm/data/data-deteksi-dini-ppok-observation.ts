import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiPpokObservation {
  isSmoking: any = false
  smokingStatus: SmokingStatus
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      observations: [
        {
          name: "ptm_tobacco_smoking_status",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "social-history",
            display: "Social History"
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "72166-2",
                display: "Tobacco smoking status"
              },
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: this.smokingStatus.code,
                display: this.smokingStatus.display
              },
              resultBoolean: this.isSmoking == 'true'
            }
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow
        }
      ]
    }
  }
}

class SmokingStatus {
  code: any
  display: any
}
