import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataTindakLanjutPtm {
  // questioner
  conditionCode: any = '161501007'
  conditionDisplay: any = 'History of hypertension'
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      tindak_lanjut: [
        {
          clinicalStatus: [
            {
              code: "active",
              display: "Active"
            }
          ],
          category: [
            {
              code: "problem-list-item",
              display: "Problem List Item"
            }
          ],
          code: [
            {
              code: this.conditionCode,
              display: this.conditionDisplay
            }
          ]
        }
      ]
    }
  }
}
