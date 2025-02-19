import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicHpvServiceRequest {
  code: any = 'Z12.4'
  display: any = 'Special screening examination for neoplasm of cervix'
  dateNow = new Date().toISOString()

  getdata() {
    return {
      serviceRequests: [
        {
          name: "Human_papilloma_virus_DNA_servRequest",
          category: [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "108252007",
                  display: "Laboratory procedure"
                }
              ]
            }
          ],
          patientInstruction: "",
          encounter: {
            reference: "Encounter/{{Encounter_id}}",
            display: `Permintaan Pemeriksaan Panel Skrining Kanker Cervix ${this.dateNow}`
          },
          status: "active",
          intent: "original-order",
          priority: "routine",
          occurrenceDateTime: this.dateNow,
          authoredOn: this.dateNow,
          data: [
            {
              system: "http://loinc.org",
              code: "44550-2",
              display: "Human papilloma virus DNA [Presence] in Cervix by Probe"
            },
            {
              text: `Permintaan Pemeriksaan Panel Skrining Kanker Cervix ${this.dateNow}`
            }
          ],
          reason: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.code,
              display: this.display,
            },
            {
              text: "Deteksi Dini Kanker Serviks"
            }
          ]
        }
      ]
    }
  }
}
