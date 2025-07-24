import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerKolorektalPemeriksaanDarahDiagnosticReport {
  display: any
  dateNow = new Date().toISOString()

  getdata() {
    return {
      diagnosticReports: [
        {
          name: "Hemoglobin.gastrointestinal_diagnosticReport",
          status: "final",
          category: {},
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "14563-1",
                display: "Hemoglobin.gastrointestinal [Presence] in Stool --1st specimen"
              },
              result: {
                reference: "Observation/{{Observation_USGMammae}}"
              }
          }
          ],
          effectiveDateTime: this.dateNow,
          specimen: [
            {
              reference: "Specimen/{{Specimen_DarSam}}"
            }
          ],
          result: [
            {
              reference: "Observation/{{Observation_DarahSamar}}"
            }
          ],
          basedOn: [
            {
              reference: "ServiceRequest/{{ServiceRequest_DarSam}}"
            }
          ],
          conclusionCode: [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "167667006",
                  display: this.display
                }
              ]
            }
          ]
        }
      ]
    }
  }
}






