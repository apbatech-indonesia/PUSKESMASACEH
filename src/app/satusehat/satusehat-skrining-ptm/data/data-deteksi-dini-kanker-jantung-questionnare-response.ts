import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerJantungQuestionnareResponse {
  pernah_menderita_kanker: any
  keluarga_menderita_kanker: any
  riwayat_merokok: any
  riwayat_tempat_kerja_karsinogenik: any
  lingkungan_tinggal_berpotensi: any
  lingkungan_rumah_tidak_sehat: any
  penyakit_paru_kronik: any
  hasil_kuesioner: any
  dateNow = new Date().toISOString()

  getdata() {
    return {
      questionnaireResponses: [
        {
          name: "Kuesioner_Kanker_Paru",
          status: "completed",
          authored: this.dateNow,
          item: [
            {
              linkId: "1",
              text: "Kuesioner Kanker Paru",
              item: [
                {
                  linkId: "1.1",
                  text: "Apakah pernah didiagnosis/menderita kanker",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000032",
                        display: this.pernah_menderita_kanker
                      }
                    }
                  ]
                },
                {
                  linkId: "1.2",
                  text: "Apakah ada keluarga (ayah/ibu/saudara kandung) didiagnosis/menderita kanker sebelumnya",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://snomed.info/sct",
                        code: "429011007",
                        display: this.keluarga_menderita_kanker
                      }
                    }
                  ]
                },
                {
                  linkId: "1.3",
                  text: "Riwayat merokok/paparan asap rokok",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000022",
                        display: this.riwayat_merokok
                      }
                    }
                  ]
                },
                {
                  linkId: "1.4",
                  text: "Riwayat tempat kerja mengandung zat karsinogenik (Pertambangan/pabrik/bengkel/garmen/bangunan/laboratorium/sopir/galangan kapal, dll)",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000017",
                        display: this.riwayat_tempat_kerja_karsinogenik
                      }
                    }
                  ]
                },
                {
                  linkId: "1.5",
                  text: "Lingkungan tempat tinggal berpotensi tinggi (lingkungan dekat pabrik/pertambangan/buangan sampah, dll)",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000024",
                        display: this.lingkungan_tinggal_berpotensi
                      }
                    }
                  ]
                },
                {
                  linkId: "1.6",
                  text: "Lingkungan dalam rumah yang tidak sehat (ventilasi buruk/atap dari asbes/lantai tanah, dapur tungku, dll)",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000027",
                        display: this.lingkungan_rumah_tidak_sehat
                      }
                    }
                  ]
                },
                {
                  linkId: "1.7",
                  text: "Pernah didiagnosis penyakit paru kronik",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://snomed.info/sct",
                        code: "160258000",
                        display: this.penyakit_paru_kronik
                      }
                    }
                  ]
                },
                {
                  linkId: "1.8",
                  text: "Hasil Kuesioner",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://snomed.info/sct",
                        code: "723505004",
                        display: this.hasil_kuesioner
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
