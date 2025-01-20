import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicHpvDiagnosticReport {
  dateNow = new Date().toISOString()

  getdata() {
    return {
      diagnosticReports: [
        {
          name: "Human_papilloma_virus_DNA[Presence]_report",
          status: "final",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/v2-0074",
            code: "MB",
            display: "Microbiology"
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "44550-2",
                display: "Human papilloma virus DNA [Presence] in Cervix by Probe"
              },
              result: {
                reference: "Observation/{{Observation_HPVDNA}}"
              }
            }
          ],
          effectiveDateTime: this.dateNow,
          specimen: [
            {
              reference: "Specimen/{{Specimen_HPV}}"
            }
          ],
          basedOn: [
            {
              reference: "ServiceRequest/{{ServiceRequest_HPV}}"
            }
          ],
          conclusionCode:
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
            code: "N",
            display: "Normal"
          }
        }
      ]
    }
  }
}
