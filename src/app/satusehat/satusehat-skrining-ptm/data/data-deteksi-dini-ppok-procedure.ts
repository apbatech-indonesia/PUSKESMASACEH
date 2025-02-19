import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiPpokProcedure {
  procedure: Procedure
  dateNow: any = new Date().toISOString()

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
          performedDateTime: this.dateNow,
          data: [
            {
              system: "http://snomed.info/sct",
              code: this.procedure.code,
              display: this.procedure.display
            }
          ]
        }
      ]
    }
  }
}

export class Procedure {
  code: any
  display: any
}
