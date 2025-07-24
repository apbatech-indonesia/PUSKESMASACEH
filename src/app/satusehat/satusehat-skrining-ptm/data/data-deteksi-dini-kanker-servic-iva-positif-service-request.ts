import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicIvaPositifServiceRequest {
  code: any = 'Z13.9'
  display: any = 'Special screening examination, unspecified'
  patientInstruction: any
  dateNow = new Date().toISOString()

  getdata() {
    return {
      serviceRequests: [
        {
          name: "iva_positif_service_request",
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
          patientInstruction: this.patientInstruction,
          encounter: {
            reference: "Encounter/{{Encounter_id}}",
            display: this.patientInstruction
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
              code: this.code,
              display: this.display
            },
            {
              text: this.patientInstruction
            }
          ]
        }
      ]
    }
  }
}

