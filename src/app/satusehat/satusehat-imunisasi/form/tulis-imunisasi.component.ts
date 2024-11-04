import { HttpHeaders } from '@angular/common/http'
import { Component, NgModule, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import Swal from 'sweetalert2'
import { ApiserviceService } from '../../../apiservice.service'
import { ActivatedRoute } from '@angular/router'
import { AncService } from '../../satusehat-anc/services/anc.service'
import { faCog, faSave } from '@fortawesome/free-solid-svg-icons'
import { ImunisasiService } from '../services/imunisasi.service'

@Component({
  selector: 'app-tulis-imunisasi',
  templateUrl: './tulis-imunisasi.component.html',
  styleUrls: ['./tulis-imunisasi.component.sass']
})

export class TulisImunisasiComponent implements OnInit {
  // property
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  notransaksi: string = this.route.snapshot.paramMap.get('notrans')
  activeTab: string = 'form-observasi-imunisasi'
  useCaseId: string
  cabangData: any
  idpasien: any

  provinceList: any = []

  faCog = faCog
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
  observationAntropometri: FormGroup
  formDiagnosa: FormGroup
  formTindakan: FormGroup
  formUpdateKunjungan: FormGroup
  

  constructor(
    private api: ApiserviceService,
    private imunisasiService: ImunisasiService,
    private ancService: AncService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.observationAntropometri = this.fb.group({
      berat_badan: [''],
      tinggi_badan: [''],
      lingkar_lengan_atas: [''],
      lingkar_kepala: ['']
    })

    this.formDiagnosa = this.fb.group({
      primary_code: [''],
      primary_note: [''],
      secondary_code: [''],
      secondary_note: ['']
    })

    this.formTindakan = this.fb.group({
      xray_note: [''],
      terapetik_note: [''],
      counselling_note: ['']
    })

    this.formUpdateKunjungan = this.fb.group({
      start_period: [''],
      end_period: [''],
      disposition_code: [''],
      hospitalization_text: ['']
    })
  }

  // methods
  ngOnInit() {
    this.docreateKunjunganImunisasi()
  }

  openTab(tab: string) {
    this.activeTab = tab
  }

  showLoading() {
    Swal.fire('Mohon tunggu!')
    Swal.showLoading()
  }

  stopLoading() {
    setTimeout(() => { Swal.close() }, 1000)
  }

  simpan() {
    switch (this.activeTab) {
      case 'form-observasi-imunisasi':
        this.doSubmitObservasi() 
      break

      case 'form-diagnosa':
        this.doSubmitDiagnosa() 
      break

      case 'form-tindakan':
        this.doSubmitTindakan() 
      break
    }
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

  async doSubmitDiagnosa() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        diagnosa: {
          ...this.formDiagnosa.value
        }
      }
    }
    let response: any = await this.imunisasiService.diagnosaImunisasi(data)
    let msg = response.statusMsg.split(': ')
    if(response.statusCode == '00') {
      Swal.fire(msg[0], msg[1], 'success')
    } else {
      Swal.fire(msg[0], msg[1], 'error')
    }
  }

  async doSubmitTindakan() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        tindakan: {
          ...this.formTindakan.value
        }
      }
    }
    let response: any = await this.imunisasiService.tindakanImunisasi(data)
    let msg = response.statusMsg.split(': ')
    if(response.statusCode == '00') {
      Swal.fire(msg[0], msg[1], 'success')
    } else {
      Swal.fire(msg[0], msg[1], 'error')
    }
  }

  async doSubmitObservasi() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        observation: {
          ...this.observationAntropometri.value
        }
      }
    }

    let response1: any = await this.imunisasiService.observationImunisasi(data)
    if (response1.statusCode != '00') {
      Swal.fire(`keluhanUtamaMTBS : ${response1.statusMsg.split(': ')[0]}`, response1.statusMsg.split(': ')[1], 'error')
    }
    
    else if (
      response1.statusCode == '00'
    ) {
      Swal.fire(response1.statusMsg.split(': ')[0], response1.statusMsg.split(': ')[1], 'success')
    }
    else {
      this.stopLoading()
    }
    this.getDataPatient()
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
      type: "MTBS",
      status: "active"
    })

    let patient = response.data
    if (patient) {
      this.observationAntropometri.patchValue(patient.observation)
      this.formDiagnosa.patchValue(patient.diagnosa)
      this.formTindakan.patchValue(patient.tindakan)
      this.formUpdateKunjungan.patchValue(patient.update_data)
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
}
