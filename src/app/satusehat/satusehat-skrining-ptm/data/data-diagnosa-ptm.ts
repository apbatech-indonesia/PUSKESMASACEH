import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDiagnosaPtm {
  // questioner 
  diagnosaHipertensi: Condition
  diagnosaPresbyopia: Condition
  diagnosaCervix: Condition
  diagnosaDiabetes: Condition
  diagnosaJantung: Condition
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      conditions: [
        {
          name: "Essential_Hypertension",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/condition-category",
            code: "encounter-diagnosis",
            display: "Encounter Diagnosis"
          },
          clinicalStatus: {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active"
          },
          recordedDate: this.dateNow,
          data: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.diagnosaHipertensi.code,
              display: this.diagnosaHipertensi.display
            }
          ]
        },
        {
          name: "Presbyopia",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/condition-category",
            code: "encounter-diagnosis",
            display: "Encounter Diagnosis"
          },
          clinicalStatus: {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active"
          },
          recordedDate: this.dateNow,
          data: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.diagnosaPresbyopia.code,
              display: this.diagnosaPresbyopia.display
            }
          ]
        },
        {
          name: "cervix_condition",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/condition-category",
            code: "encounter-diagnosis",
            display: "Encounter Diagnosis"
          },
          clinicalStatus: {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active"
          },
          recordedDate: this.dateNow,
          data: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.diagnosaCervix.code,
              display: this.diagnosaCervix.display
            }
          ]
        },
        {
          name: "Diabetes_mellitus_conditio",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/condition-category",
            code: "encounter-diagnosis",
            display: "Encounter Diagnosis"
          },
          clinicalStatus: {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active"
          },
          recordedDate: this.dateNow,
          data: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.diagnosaDiabetes.code,
              display: this.diagnosaDiabetes.display
            }
          ]
        },
        {
          name: "cardiovascular_disorders_condition",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/condition-category",
            code: "encounter-diagnosis",
            display: "Encounter Diagnosis"
          },
          clinicalStatus: {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active"
          },
          recordedDate: this.dateNow,
          data: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.diagnosaJantung.code,
              display: this.diagnosaJantung.display
            }
          ]
        }
      ]
    }
  }
}

export class Condition {
  code: any = ''
  display: any = ''
}
