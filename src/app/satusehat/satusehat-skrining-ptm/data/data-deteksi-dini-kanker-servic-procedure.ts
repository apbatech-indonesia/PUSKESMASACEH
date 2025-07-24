import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicProcedure {
  code: any
  display: any
  dateNow = new Date().toISOString()
  
  getdata() {
    return {
      procedures: [
        {
          name: "Inspection_of_vagina",
          category: {
            system: "http://snomed.info/sct",
            code: "103693007",
            display: "Diagnostic procedure"
          },
          performedDateTime: this.dateNow,
          data: [
            {
              system: "http://snomed.info/sct",
              code: this.code,
              display: this.display
            }
          ]
        }
      ]
    }
  }
}

