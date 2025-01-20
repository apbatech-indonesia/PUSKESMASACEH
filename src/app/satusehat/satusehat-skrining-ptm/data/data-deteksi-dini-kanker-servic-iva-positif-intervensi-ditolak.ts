import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicIvaPositifIntervensiDitolak {
  dateNow = new Date().toISOString()

  getdata() {
    return {
      procedures: [
        {
          name: "acid_reaction_procedure",
          status: "not-done",
          category: {
            system: "http://snomed.info/sct",
            code: "277132007",
            display: "Therapeutic procedure"
          },
          performedDateTime: this.dateNow,
          data: [
            {
              system: "http://snomed.info/sct",
              code: "26782000",
              display: "Cryotherapy"
            }
          ],
          reason: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: "C53.9",
              display: "Malignant neoplasm: Cervix uteri, unspecified"
            }
          ]

        }
      ]
    }
  }
}
