import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataDeteksiDiniObesitas {
  // questioner
  beratBadan: any;
  tinggiBadan: any;
  indexMasaTubuh: any;
  lingkarPinggang: any;
  dateNow: any = new Date().toISOString();

  getdata() {
    return {
      observations: [
        {
          name: "body_weight",
          category: {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs",
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "29463-7",
                display: "Body weight",
              },
              result: {
                value: this.beratBadan,
                unit: "kg",
                system: "http://unitsofmeasure.org",
                code: "kg",
              },
            },
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow,
        },
        {
          name: "body_height",
          category: {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs",
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "8302-2",
                display: "Body height",
              },
              result: {
                value: this.tinggiBadan,
                unit: "cm",
                system: "http://unitsofmeasure.org",
                code: "cm",
              },
            },
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow,
        },
        {
          name: "bmi",
          category: {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "exam",
            display: "Exam",
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "39156-5",
                display: "Body mass index (BMI) [Ratio]",
              },
              result: {
                value: "{{IMT_calc}}",
                unit: "kg/m^2",
                system: "http://unitsofmeasure.org",
                code: "kg/m2",
              },
            },
          ],
          derivedFrom: [
            {
              reference: "Observation/{{Observation_TB}}",
              display: "Body Height",
            },
            {
              reference: "Observation/{{Observation_BB}}",
              display: "Body Weight",
            },
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow,
          interpretation: {
            system: "http://snomed.info/sct",
            code: "248342006",
            display: "Underweight",
          },
        },
        {
          name: "waist_circumference",
          category: {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "exam",
            display: "Exam",
          },
          data: [
            {
              code: {
                system: "http://snomed.info/sct",
                code: "276361009",
                display: "Waist circumference",
              },
              result: {
                value: this.lingkarPinggang,
                unit: "cm",
                system: "http://unitsofmeasure.org",
                code: "cm",
              },
            },
          ],
          derivedFrom: [
            {
              reference: "Observation/{{Observation_TB}}",
              display: "Body Height",
            },
            {
              reference: "Observation/{{Observation_BB}}",
              display: "Body Weight",
            },
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow,
          interpretation: {
            system:
              "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
            code: "N",
            display: "Normal",
          },
        },
      ],
    };
  }
}
