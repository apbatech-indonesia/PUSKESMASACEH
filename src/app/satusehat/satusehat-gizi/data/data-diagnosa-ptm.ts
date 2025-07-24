import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDiagnosaPtm {
  // questioner 
  diagnosaHipertensiCode: any
  diagnosaHipertensiDisplay: any
  diagnosaPresbyopiaCode: any
  diagnosaPresbyopiaDisplay: any
  diagnosaCervixCode: any
  diagnosaCervixDisplay: any
  diagnosaDiabetesCode: any
  diagnosaDiabetesDisplay: any
  diagnosaJantungCode: any
  diagnosaJantungDisplay: any
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      conditions: [
        {
          hipertensi_condition: {
            clinical_status: {
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active"
            },
            category: {
              system: "http://terminology.hl7.org/CodeSystem/condition-category",
              code: "encounter-diagnosis",
              display: "Encounter Diagnosis"
            },
            condition_item: {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.diagnosaHipertensiCode,
              display: this.diagnosaHipertensiDisplay
            },
            onset_date_time: this.dateNow,
            recorded_date: this.dateNow
          }
        },
        {
          presbyopia_condition: {
            clinical_status: {
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active"
            },
            category: {
              system: "http://terminology.hl7.org/CodeSystem/condition-category",
              code: "encounter-diagnosis",
              display: "Encounter Diagnosis"
            },
            condition_item: {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.diagnosaPresbyopiaCode,
              display: this.diagnosaPresbyopiaDisplay},
            onset_date_time: this.dateNow,
            recorded_date: this.dateNow
          }
        },
        {
          cervix_condition: {
            clinical_status: {
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active"
            },
            category: {
              system: "http://terminology.hl7.org/CodeSystem/condition-category",
              code: "encounter-diagnosis",
              display: "Encounter Diagnosis"
            },
            condition_item: {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.diagnosaCervixCode,
              display: this.diagnosaCervixDisplay},
            onset_date_time: this.dateNow,
            recorded_date: this.dateNow
          }
        },
        {
          diabetes_condition: {
            clinical_status: {
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active"
            },
            category: {
              system: "http://terminology.hl7.org/CodeSystem/condition-category",
              code: "encounter-diagnosis",
              display: "Encounter Diagnosis"
            },
            condition_item: {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.diagnosaDiabetesCode,
              display: this.diagnosaDiabetesDisplay},
            onset_date_time: this.dateNow,
            recorded_date: this.dateNow
          }
        },
        {
          resiko_jantung_condition: {
            clinical_status: {
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active"
            },
            category: {
              system: "http://terminology.hl7.org/CodeSystem/condition-category",
              code: "encounter-diagnosis",
              display: "Encounter Diagnosis"
            },
            condition_item: {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.diagnosaJantungCode,
              display: this.diagnosaJantungDisplay},
            onset_date_time: this.dateNow,
            recorded_date: this.dateNow
          }]
    }
  }
}

