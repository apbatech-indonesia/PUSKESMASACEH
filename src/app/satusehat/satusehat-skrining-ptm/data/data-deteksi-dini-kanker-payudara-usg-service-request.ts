import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerPayudaraUsgServiceRequest {
  dateNow = new Date().toISOString()
  
  getdata() {
    return {
      serviceRequests: [
        {
          name: "US_Breast_serviceRequest",
          category: [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "363679005",
                  display: "Imaging"
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
              system: "http://loinc.org",
              code: "24601-7",
              display: "US Breast"
            },
            {
              text: "Panel Skrining Kolesterol Total PTM"
            }
          ],
          reason: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: "Z12.3",
              display: "Special screening examination for neoplasm of breast"
            },
            {
              text: "Deteksi Dini Kanker Payudara"
            }
          ]
        },
        {
          name: "US_Breast_create_MWL_serviceRequest",

          category: [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "363679005",
                  display: "Imaging"
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
              system: "http://loinc.org",
              code: "24601-7",
              display: "US Breast"
            },
            {
              text: "Panel Skrining Kolesterol Total PTM"
            }
          ],
          orderDetail: [
            {
              coding: [
                {
                  system: "http://dicom.nema.org/resources/ontology/DCM",
                  code: "US"
                }
              ],
              text: "Modality Code: US"
            },
            {
              coding: [
                {
                  system: "http://sys-ids.kemkes.go.id/ae-title",
                  display: "CT0001"
                }
              ]
            }
          ],
          reason: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: "Z12.3",
              display: "Special screening examination for neoplasm of breast"
            },
            {
              text: "Deteksi Dini Kanker Payudara"
            }
          ]
        }

      ]
    }
  }
}
