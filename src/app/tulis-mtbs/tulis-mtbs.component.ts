import { HttpHeaders } from '@angular/common/http'
import { Component, NgModule, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import Swal from 'sweetalert2'
import { ApiserviceService } from '../apiservice.service'
import { ActivatedRoute } from '@angular/router'
import { MtbsService } from '../services/SatusehatServices/mtbs/mtbs.service'
import { AncService } from '../services/SatusehatServices/anc/anc.service'
import { faCog, faSave } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-tulis-mtbs',
  templateUrl: './tulis-mtbs.component.html',
  styleUrls: ['./tulis-mtbs.component.sass']
})

export class TulisMtbsComponent implements OnInit {
  // property
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  notransaksi: string = this.route.snapshot.paramMap.get('notrans')
  activeTab: string = 'form-orangtua'
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
  formIbuAyah: FormGroup
  formKeluhan: FormGroup
  observationAntropometri: FormGroup
  formObservationTandaVital: FormGroup
  formObservationUmum: FormGroup
  formObservationBatuk: FormGroup
  formObservationDiare: FormGroup
  formObservationSukarBernafas: FormGroup
  formObservationDengue: FormGroup
  formObservationMasalahTelinga: FormGroup
  formDiagnosa: FormGroup
  formImunisasi: FormGroup
  formTindakan: FormGroup
  formTindakLanjut: FormGroup
  formMeninggalkanFaskes: FormGroup
  formUpdateKunjungan: FormGroup
  

  constructor(
    private api: ApiserviceService,
    private mtbsService: MtbsService,
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
    this.formIbuAyah = this.fb.group({
      nama_ibu: [''],
      nik_ibu: [''],
      tl_ibu: [''],
      hp_ibu: [''],
      kota_ibu: [''],
      alamat_jalan_ibu: [''],
      postal_code_ibu : [''],
      province_id_ibu: [''],
      city_id_ibu: [''],
      district_id_ibu: [''],
      village_id_ibu: [''],
      rt_ibu: [''],
      rw_ibu: [''],
      nama_ayah: [''],
      nik_ayah : [''],
      tl_ayah: [''],
      hp_ayah: [''],
      kota_ayah: [''],
      alamat_jalan_ayah: [''],
      postal_code_ayah : [''],
      province_id_ayah: [''],
      city_id_ayah: [''],
      district_id_ayah: [''],
      village_id_ayah: [''],
      rt_ayah: [''],
      rw_ayah: ['']
    })

    this.formKeluhan = this.fb.group({
      condition_code: [''],
      condition_note: ['']
    })
    
    this.formObservationTandaVital = this.fb.group({
      sistolik: [''],
      diastolik: [''],
      suhu_tubuh: [''],
      denyut_jantung: [''],
      tingkat_kesadaran: [''],
      pernapasan: ['']
    })

    this.formObservationUmum = this.fb.group({
      condition_code: [''],
      condition_name: [''],
      condition_note: [''],
      durasi: [''],
      unit: ['']
    })

    this.formObservationBatuk = this.fb.group({
      condition_code: [''],
      condition_name: [''],
      condition_note: [''],
      durasi: [''],
      unit: ['']
    })

    this.formObservationDiare = this.fb.group({
      condition_code: [''],
      condition_name: [''],
      condition_note: [''],
      durasi: [''],
      unit: ['']
    })

    this.formObservationSukarBernafas = this.fb.group({
      condition_code: [''],
      condition_name: [''],
      condition_note: [''],
      durasi: [''],
      unit: ['']
    })

    this.formObservationDengue = this.fb.group({
      condition_code: [''],
      condition_name: [''],
      condition_note: [''],
      durasi: [''],
      unit: ['']
    })

    this.formObservationMasalahTelinga = this.fb.group({
      condition_code: [''],
      condition_name: [''],
      condition_note: [''],
      durasi: [''],
      unit: [''],
      klasifikasi: ['']
    })
    
    this.formDiagnosa = this.fb.group({
      primary_code: [''],
      primary_note: [''],
      secondary_code: [''],
      secondary_note: ['']
    })

    this.formImunisasi = this.fb.group({
      vaccine_code: [''],
      vaccine_note: [''],
      reason_code: [''],
      reason_note: ['']
    })

    this.formTindakan = this.fb.group({
      xray_note: [''],
      terapetik_note: [''],
      counselling_note: ['']
    })

    this.formTindakLanjut = this.fb.group({
      instruksi: ['']
    })

    this.formMeninggalkanFaskes = this.fb.group({
      diagnostic_code: [''],
      diagnostic_name: [''],
      pasien_meninggal: [''],
      waktu_meninggal: ['']
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
    this.docreateKunjunganMTBS()
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
      case 'form-orangtua':
        this.doSubmitRelatedPerson() 
      break
      case 'form-observasi-mtbs':
        this.doSubmitObservasi() 
      break
      case 'form-diagnosa':
        this.doSubmitDiagnosa() 
      break
      
      case 'form-imunisasi':
        this.doSubmitImunisasi() 
      break
      
      case 'form-tindakan':
        this.doSubmitTindakan() 
      break
      
      case 'form-tindak-lanjut':
        this.doSubmitTindakLanjut() 
      break
      
      case 'form-meninggalkan-faskes':
        this.doSubmitKondisiMeninggalkanFaskes() 
      break
      
    }
  }

  async docreateKunjunganMTBS() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let response: any = await this.mtbsService.createKunjunganMTBS({
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
    let response: any = await this.mtbsService.diagnosaMTBS(data)
    let msg = response.statusMsg.split(': ')
    if(response.statusCode == '00') {
      Swal.fire(msg[0], msg[1], 'success')
    } else {
      Swal.fire(msg[0], msg[1], 'error')
    }
  }

  async doSubmitImunisasi() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        imunisasi: [
          {
            ...this.formImunisasi.value
          }
        ]
      }
    }
    let response: any = await this.mtbsService.imunisasiMTBS(data)
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
    let response: any = await this.mtbsService.tindakanMTBS(data)
    let msg = response.statusMsg.split(': ')
    if(response.statusCode == '00') {
      Swal.fire(msg[0], msg[1], 'success')
    } else {
      Swal.fire(msg[0], msg[1], 'error')
    }
  }

  async doSubmitTindakLanjut() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        tindak_lanjut: {
          ...this.formTindakLanjut.value
        }
      }
    }
    let response: any = await this.mtbsService.tindakLanjutMTBS(data)
    let msg = response.statusMsg.split(': ')
    if(response.statusCode == '00') {
      Swal.fire(msg[0], msg[1], 'success')
    } else {
      Swal.fire(msg[0], msg[1], 'error')
    }
  }

  async doSubmitKondisiMeninggalkanFaskes() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        meninggalkan_faskes: {
          ...this.formMeninggalkanFaskes.value
        },
        update_data: {
          ...this.formUpdateKunjungan.value
        }
      }
    }

    let response1: any = await this.mtbsService.meninggalkanFaskesMTBS(data)
    let response2: any = await this.mtbsService.updateKunjunganMTBS(data)

    if (response1.statusCode != '00') {
      Swal.fire(`meninggalkanFaskesMTBS : ${response1.statusMsg.split(': ')[0]}`, response1.statusCode[1], 'error')
    } 
    else if (response2.statusCode != '00') {
      Swal.fire(`updateKunjunganMTBS : ${response2.statusMsg.split(': ')[0]}`, response2.statusCode[1], 'error')
    }
    else if (
      response1.statusCode == '00' &&
      response2.statusCode == '00'
    ) {
      Swal.fire(response1.statusCode[0], response1.statusCode[1], 'success')
    } else {
      this.stopLoading()
    }
  }

  async doSubmitRelatedPerson(){
    var data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        related_person: {
          ...this.formIbuAyah.value
        }
      }
    }

    this.showLoading()
    let response: any = await this.mtbsService.createRelatedPersonMTBS(data)
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
        keluhan: {     
          ...this.formKeluhan.value
        },
        observation: {
          ...this.observationAntropometri.value
        },
        observation_tanda_vital: {     
          ...this.formObservationTandaVital.value
        },
        observation_umum: [{
          ...this.formObservationUmum.value
        }],
        observation_batuk: {
          ...this.formObservationBatuk.value
        },
        observation_diare: {
          ...this.formObservationDiare.value
        },
        observation_sukar_bernafas: {
          ...this.formObservationSukarBernafas.value
        },
        observation_dengue: {
          ...this.formObservationDengue.value
        },
        observation_masalah_telinga: {
          ...this.formObservationMasalahTelinga.value
        }
      }
    }

    let response1: any = await this.mtbsService.keluhanUtamaMTBS(data)
    let response2: any = await this.mtbsService.observationAntropometri(data)
    let response3: any = await this.mtbsService.observationTandaVitalMTBS(data)
    let response4: any = await this.mtbsService.observationMTBS(data)
    
    if (response1.statusCode != '00') {
      Swal.fire(`keluhanUtamaMTBS : ${response1.statusMsg.split(': ')[0]}`, response1.statusMsg.split(': ')[1], 'error')
    }
    else if (response2.statusCode != '00') {
      Swal.fire(`observationAntropometri : ${response2.statusMsg.split(': ')[0]}`, response2.statusMsg.split(': ')[1], 'error')
    }
    else if (response3.statusCode != '00') {
      Swal.fire(`observationTandaVitalMTBS : ${response3.statusMsg.split(': ')[0]}`, response3.statusMsg.split(': ')[1], 'error')
    }
    else if (response4.statusCode != '00') {
      Swal.fire(`observationMTBS : ${response4.statusMsg.split(': ')[0]}`, response4.statusMsg.split(': ')[1], 'error')
    }
    else if (
      response1.statusCode == '00' &&
      response2.statusCode == '00' &&
      response3.statusCode == '00' &&
      response4.statusCode == '00'
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
      this.formIbuAyah.patchValue(patient.related_person)
      this.formKeluhan.patchValue(patient.keluhan)
      this.observationAntropometri.patchValue(patient.observation)
      this.formObservationUmum.patchValue(patient.observation_umum ? patient.observation_umum[0] : '')
      this.formObservationBatuk.patchValue(patient.observation_batuk)
      this.formObservationDiare.patchValue(patient.observation_diare)
      this.formObservationSukarBernafas.patchValue(patient.observation_sukar_bernafas)
      this.formObservationDengue.patchValue(patient.observation_dengue)
      this.formObservationMasalahTelinga.patchValue(patient.observation_masalah_telinga)
      this.formObservationTandaVital.patchValue(patient.observation_tanda_vital)
      this.formDiagnosa.patchValue(patient.diagnosa)
      this.formImunisasi.patchValue(patient.imunisasi ? patient.imunisasi[0] : '')
      this.formTindakan.patchValue(patient.tindakan)
      this.formTindakLanjut.patchValue(patient.tindak_lanjut)
      this.formMeninggalkanFaskes.patchValue({
        ...patient.meninggalkan_faskes,
        waktu_meninggal: patient.meninggalkan_faskes && patient.meninggalkan_faskes.waktu_meninggal ? patient.meninggalkan_faskes.waktu_meninggal.split('T')[0] : ''
      })
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
