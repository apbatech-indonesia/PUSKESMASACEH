import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataTindakanPtm {
  // questioner 
  procedureCode: any
  procedureDisplay: any
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      procedures: [
        {
          name: "therapeutic_procedure",
          category: {
            system: "http://snomed.info/sct",
            code: "277132007",
            display: "Therapeutic procedure"
          },
          status: {
            system: "http://terminology.hl7.org/CodeSystem/procedure-status",
            code: "completed",
            display: "Completed"
          },
          performedDateTime: "2024-04-24T03:57:05+00:00",
          data: [
            {
              system: "http://hl7.org/fhir/sid/icd-9-cm",
              code: this.procedureCode,
              display: this.procedureDisplay,
            }
          ]
        }
      ]
    }
  }
}
