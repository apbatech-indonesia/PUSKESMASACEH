import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicHpvSpecimen {
  dateNow = new Date().toISOString()
  
  getdata() {
    return {
      specimens: [
        {
          name: "cervical_swab__specimen",
          status: "available",
          type: {
            system: "http://snomed.info/sct",
            code: "258524009",
            display: "Cervical swab"

          },
          collection: {
            method: {
              system: "http://snomed.info/sct",
              code: "129323009",
              display: "Scraping - action"
            },
            collectedDateTime: this.dateNow

          },
          recordedDate: this.dateNow
        }
      ]
    }
  }
}
