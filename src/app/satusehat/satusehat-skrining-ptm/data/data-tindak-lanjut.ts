import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataTindakLanjutPtm {
  patientInstruction: any
  conditionCode: any
  conditionDisplay: any
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      serviceRequests: [
        {
          name: "control_routine",
          category: [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "306098008",
                  display: "Self-referral"
                }
              ]
            },
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "11429006",
                  display: "Consultation"
                }
              ]
            }
          ],
          patientInstruction: this.patientInstruction,
          status: "active",
          intent: "original-order",
          priority: "routine",
          occurrenceDateTime: this.dateNow,
          authoredOn: this.dateNow,
          data: [
            {
              system: "http://snomed.info/sct",
              code: "185389009",
              display: "Follow-up visit"
            },
            {
              text: this.patientInstruction
            }
          ],
          reason: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.conditionCode,
              display: this.conditionDisplay
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
