import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiPpokProcedure {
  getdata() {
    return {
      procedures: [
        {
          name: "ptm_spirometry_procedure",
          category: {
            system: "http://snomed.info/sct",
            code: "103693007",
            display: "Diagnostic procedure"
          },
          performedDateTime: "2024-04-24T01:42:50+00:00",
          data: [
            {
              system: "http://snomed.info/sct",
              code: "127783003",
              display: "Spirometry"
            }
          ]
        }
      ]
    }
  }
}
