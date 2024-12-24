import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import Swal from 'sweetalert2'
import { ApiserviceService } from '../../../apiservice.service'
import { ActivatedRoute } from '@angular/router'
import { AncService } from '../../satusehat-anc/services/anc.service'
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { ImunisasiService } from '../services/imunisasi.service'

@Component({
  selector: 'app-tulis-skrining-ptm',
  templateUrl: './tulis-skrining-ptm.component.html',
  styleUrls: ['./tulis-skrining-ptm.component.sass']
})

export class TulisSkriningPtmComponent implements OnInit {
  // property
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  notransaksi: string = this.route.snapshot.paramMap.get('notrans')
  useCaseId: string
  cabangData: any
  idpasien: any
  dateNow = new Date().toISOString()

  faArrowLeft = faArrowLeft
  faSave = faSave
  isDisabledFormAnc: boolean = true
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  patientData: any = {
    noantrian: '-',
    norm: '-',
    pasien: '-',
    umur: '-',
    tgllahir: '-',
    jeniskelamin: '-',
    nampoli: '-',
    costumer: '-',
    namdokter: '-',
    alamat: '-'
  }
  formObservation: FormGroup
  
  constructor(
    private api: ApiserviceService,
    private imunisasiService: ImunisasiService,
    private ancService: AncService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.formObservation = this.fb.group({
      status_pregnant_code: ['LA15173-0'],
      status_pregnant_display: ['not pregnant'],
      status_sekolah_code: ['OV000320'],
      status_sekolah_display: ['tidak sekolah']
    })
  }

  // methods
  ngOnInit() {
    this.docreateKunjunganImunisasi()
  }

  showLoading() {
    Swal.fire('Mohon tunggu!')
    Swal.showLoading()
    this.stopLoading(5000)
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => { Swal.close() }, timing)
  }

  simpan() {
    this.doSubmitObservasi() 
  }

  async docreateKunjunganImunisasi() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let response: any = await this.imunisasiService.createKunjunganImunisasi({
      data: {
        rmno: this.notransaksi,
        orgId: this.cabangData.kodeorg,
        patientId: this.idpasien,
        patientName: this.patientData.pasien,
        practitionerId: this.patientData.idhis,
        practitionerName: this.patientData.namdokter,
        locationId: this.patientData.locationid,
        satusehatId: this.patientData.idsatusehat
      }
    })
    this.useCaseId = response.data.use_case_id
    this.getDataPatient()
  }

  async doSubmitObservasi(){
    var data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let observations = {
      observations : [
        {
          pregnancy_observation: {
            category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "survey",
              display: "Survey"
            },
            question_answers: [
              {
                question:  {
                  system: "http://loinc.org",
                  code: "82810-3",
                  display: "Pregnancy status"
                },
                answer: {
                  system: "http://loinc.org",
                  code: this.formObservation.value.status_pregnant_code,
                  display: this.formObservation.value.status_pregnant_display
                }
              }
            ]
          }
        },
        {
          education_observation: {
            category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "social-history",
              display: "Social History"
            },
            question_answers: [
              {
                question: {
                  system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                  code: "OC000135",
                  display: "Status sekolah"
                },
                answer: {
                  system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                  code: this.formObservation.value.status_sekolah_code,
                  display: this.formObservation.value.status_sekolah_display
                }
              }
            ]
          }
        }
      ]
    }

    this.showLoading()
    let response1: any = await this.imunisasiService.observationImunisasi({ data: { ...data, ...observations } })
    
    if (response1.statusCode != '00') {
      Swal.fire(response1.statusMsg.split(': ')[0], response1.statusMsg.split(': ')[1], 'error')
    }
    
    else if(
      response1.statusCode == '00'
    ) {
      Swal.fire(response1.statusMsg.split(': ')[0], response1.statusMsg.split(': ')[1], 'success')
    }
  }

  async setIdPasien() {
    if (!this.patientData.idpasien) {
      let idpasien = await this.getPasienSatuSehat()
      if (!idpasien) {
        Swal.fire('Data Pasien Tidak ditemukan di SatuSehat')
      } else {
        this.idpasien = idpasien
        this.isDisabledFormAnc = false
      }
    } else {
      this.idpasien = this.patientData.idpasien
      this.isDisabledFormAnc = false
    }

    return this.idpasien
  }

  async getDataPatient() {
    let response: any = await this.ancService.getDataPatient({
      patientId: this.idpasien,
      rmno: this.notransaksi,
      usecase_id: this.useCaseId,
      type: "IMUNISASI",
      status: "active"
    })

    let patient = response.data
    if (patient) {
      if (patient?.observations) {
        this.formObservation.patchValue({
          status_pregnant_code: patient?.observations[0]?.pregnancy_observation?.question_answers[0]?.answer.code,
          status_pregnant_display: patient?.observations[0]?.pregnancy_observation?.question_answers[0]?.answer.display,
          status_sekolah_code: patient?.observations[1]?.education_observation?.question_answers[0]?.answer.code,
          status_sekolah_display: patient?.observations[1]?.education_observation?.question_answers[0]?.answer.display,
        })
      }
    }
    this.stopLoading()
  }

  getPasien() {
    return new Promise((resolve) => {
      this.api.datapasien(this.userData.kdcabang, this.notransaksi)
        .subscribe((data) => {
          data.forEach(e => {
            resolve(e)
          })
        })
    })
  }

  getPasienSatuSehat() {
    return new Promise((resolve) => {
      this.api.getpasien(
        this.patientData.nopengenal,
        this.headers
      ).subscribe((data) => {
        if (data.entry.length !== 0) {
          resolve(data.entry[0].resource.id)
        }
      })
    })
  }

  getCabang() {
    return new Promise((resolve) => {
      this.api.cabangper(this.userData.kdklinik)
        .subscribe((data) => {
          data.forEach(e => {
            resolve(e)
          })
        })
    })
  }

  removeNullValues(obj: Object) {
    if (typeof obj !== 'object' || obj === null) return obj; // Jika bukan object, kembalikan nilai asli

    // Iterasi pada setiap properti
    for (const key in obj) {
        if (obj[key] === null) {
            delete obj[key]; // Hapus properti jika nilainya null
        } else if (typeof obj[key] === 'object') {
            obj[key] = this.removeNullValues(obj[key]); // Rekursif untuk objek bersarang
        }
    }

    return obj;
  }
}
