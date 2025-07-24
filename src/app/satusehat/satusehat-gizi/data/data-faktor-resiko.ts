import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataFaktorResiko {
  // questioner 
  kodeMeroko: any
  displayMeroko: any
  jumlahRoko: any
  lamaMeroko: any
  meroko: any = false
  terpaparAsapRoko: any
  gulaMakanan: any
  garamMakanan: any
  minyakMakanan: any
  sayurBuahMakanan: any
  aktivitasFisik: any
  konsumsiAlkohol: any

  getdata() {
    return {
      observations: [
        {
          smoking_observation: {
            category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "social-history",
              display: "Social History"
            },
            question_answers: [
              {
                question: {
                  system: "http://loinc.org",
                  code: "72166-2",
                  display: "Tobacco smoking status"
                },
                answer: {
                  system: "http://snomed.info/sct",
                  code: "8392000",
                  display: "Non-smoker"
                }]
          }],
      QuestionnaireResponse: [
        {
          ptm_question: {
            questionnaire: "https://fhir.kemkes.go.id/Questionnaire/Q0013",
            status: "completed",
            item: [
              {
                linkId: "1",
                text: "Layanan bagi usia dewasa (18 - 59 thn): Skrining PTM",
                item: [
                  {
                    linkId: "1.1",
                    text: "Apakah peserta pernah merokok?",
                    answer: [
                      {
                        valueBoolean: this.meroko
                      }
                    ]
                  },
                  {
                    linkId: "1.2",
                    text: "Berapa rata-rata jumlah batang rokok per hari",
                    answer: [
                      {
                        valueInteger: this.jumlahRoko
                      }
                    ]
                  },
                  {
                    linkId: "1.3",
                    text: "Lama merokok dalam tahun",
                    answer: [
                      {
                        valueQuantity: {
                          value: this.lamaMeroko,
                          unit: "years",
                          system: "http://unitsofmeasure.org",
                          code: "a"
                        }]
                  },
                  {
                    linkId: "1.4",
                    text: "Status merokok",
                    answer: [
                      {
                        valueReference: {
                          reference: "Observation/{{Observation_statusMerokok}}"
                        }]
                  },
                  {
                    linkId: "1.5",
                    text: "Apakah peserta terpapar asap rokok orang lain dalam waktu 1 bulan terakhir?",
                    answer: [
                      {
                        valueCoding: {
                          system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          code: "QRI000015",
                          display: this.terpaparAsapRoko
                        }]
                  },
                  {
                    linkId: "1.6",
                    text: "Apakah peserta menambahkan gula pada makanan/minuman peserta > 4 sendok makan dalam sehari?",
                    answer: [
                      {
                        valueCoding: {
                          system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          code: "QRI000016",
                          display: this.gulaMakanan
                        }]
                  },
                  {
                    linkId: "1.7",
                    text: "Apakah peserta menggunakan garam pada makanan peserta > 1 sendok teh dalam sehari?",
                    answer: [
                      {
                        valueCoding: {
                          system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          code: "QRI000014",
                          display: this.garamMakanan
                        }]
                  },
                  {
                    linkId: "1.8",
                    text: "Apakah peserta konsumsi makanan yang diolah dengan minyak > 5 sendok makan dalam sehari?",
                    answer: [
                      {
                        valueCoding: {
                          system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          code: "QRI000015",
                          display: this.minyakMakanan
                        }]
                  },
                  {
                    linkId: "1.9",
                    text: "Apakah peserta makan sayur dan atau buah kurang dari 5 porsi sehari?",
                    answer: [
                      {
                        valueCoding: {
                          system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          code: "QRI000026",
                          display: this.sayurBuahMakanan
                        }]
                  },
                  {
                    linkId: "1.10",
                    text: "Apakah peserta melakukan aktivitas fisik kurang dari minimal 30 menit/ hari atau minimal 150 menit/minggu?",
                    answer: [
                      {
                        valueCoding: {
                          system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          code: "QRI000016",
                          display: this.aktivitasFisik
                        }]
                  },
                  {
                    linkId: "1.11",
                    text: "Apakah peserta konsumsi alkohol dalam waktu 1 bulan terakhir?",
                    answer: [
                      {
                        valueCoding: {
                          system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                          code: "QRI000014",
                          display: this.konsumsiAlkohol
                        }]
                  }
                ]
              }
            ]
          }]
    }
  }
}

