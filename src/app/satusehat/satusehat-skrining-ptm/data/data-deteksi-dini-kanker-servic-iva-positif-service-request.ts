import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicIvaPositifServiceRequest {
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
                  code: "277132007",
                  display: "Therapeutic Procedure"
                }
              ]
            }
          ],
          patientInstruction: "",
          encounter: {
            reference: "Encounter/{{Encounter_id}}",
            display: ""
          },
          status: "active",
          intent: "original-order",
          priority: "routine",
          occurrenceDateTime: this.dateNow,
          authoredOn: this.dateNow,
          data: [
            {
              system: "http://snomed.info/sct",
              code: "26782000",
              display: "Cryotherapy"
            },
            {
              text: "Panel Skrining Kolesterol Total PTM"
            }
          ],
          reason: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: "Z13.9",
              display: "Special screening examination, unspecified"
            },
            {
              text: ""
            }
          ]
        }
      ]
    }
  }
}
