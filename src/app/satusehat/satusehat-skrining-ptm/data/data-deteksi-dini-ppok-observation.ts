import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiPpokObservation {
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
              result: {
                system: "http://snomed.info/sct",
                code: "8392000",
                display: "Non-smoker"
              }
            }
          ],
          effectiveDateTime: "2024-04-24T00:23:30+00:00",
          issued: "2024-04-24T00:23:30+00:00"
        }
      ]
    }
  }
}
