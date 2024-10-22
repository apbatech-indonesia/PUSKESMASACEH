import { HttpHeaders } from '@angular/common/http'
import { Component, NgModule, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { faCog, faSave } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { ApiserviceService } from '../apiservice.service'
import { ActivatedRoute } from '@angular/router'
import { MtbmService } from '../services/SatusehatServices/mtbm/mtbm.service'
import { AncService } from '../services/SatusehatServices/anc/anc.service'

@Component({
  selector: 'app-tulis-mtbm',
  templateUrl: './tulis-mtbm.component.html',
  styleUrls: ['./tulis-mtbm.component.sass']
})

export class TulisMtbmComponent implements OnInit {
  // property
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  notransaksi: string = this.route.snapshot.paramMap.get('notrans')
  activeTab: string = 'form-ibu-ayah'
  useCaseId: string
  searchTindakanText: string
  searchTindakanBy: string = '1'
  searchDiagnosaText: string
  searchDiagnosaTextSecondary: string
  searchDiagnosaBy: string = '1'
  searchDiagnosaBy2: string = '1'
  tindakanList: any = []
  diagnosaList: any = []
  diagnosaListSecondary: any = []
  cabangData: any
  idpasien: any

  selectedProvinceIbu: any = ''
  selectedCityIbu: any = ''
  selectedDistrictIbu: any = ''
  selectedSubDistrictIbu: any = ''

  selectedProvinceAyah: any = ''
  selectedCityAyah: any = ''
  selectedDistrictAyah: any = ''
  selectedSubDistrictAyah: any = ''

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
  formObservation: FormGroup
  formObservationTandaVital: FormGroup
  formObservationInfeksi: FormGroup
  formObservationIkterus: FormGroup
  formObservationDiare: FormGroup
  formObservationHIV: FormGroup
  formObservationAsi: FormGroup
  formObservationMinuman: FormGroup
  formPemeriksaanStatusVitK: FormGroup
  formDiagnosa: FormGroup
  formImunisasi: FormGroup
  formTindakan: FormGroup
  formTindakLanjut: FormGroup
  formMeninggalkanFaskes: FormGroup
  formUpdateKunjungan: FormGroup

  constructor(
    private api: ApiserviceService,
    private mtbmService: MtbmService,
    private ancService: AncService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
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
    
    this.formObservation = this.fb.group({
      berat_badan: [''],
      tinggi_badan: [''],
      lingkar_lengan_atas: [''],
      lingkar_kepala: ['']
    })
    
    this.formObservationTandaVital = this.fb.group({
      sistolik: [''],
      diastolik: [''],
      suhu_tubuh: [''],
      denyut_jantung: [''],
      tingkat_kesadaran: [''],
      pernapasan: ['']
    })
    
    this.formObservationInfeksi = this.fb.group({
      laju_pernapasan: [''],
      saturasi_tangan_kanan: [''],
      saturasi_kaki_kiri: [''],
      perbedaan_saturasi: [''],
      tanda_infeksi: [''],
      klasifikasi_infeksi: ['']
    })
    
    this.formObservationIkterus = this.fb.group({
      kondisi: [''],
      umur_terkena: [''],
      ikterus: [''],
      klasifikasi_ikterus: ['']
    })
    
    this.formObservationDiare = this.fb.group({
      kondisi: [''],
      tanda_diare: [''],
      klasifikasi_diare: ['']
    })
    
    this.formObservationHIV = this.fb.group({
      riwayat_hiv_ibu: [''],
      serologis_hiv_ibu: [''],
      riwayat_hiv_anak: [''],
      tes_virologis: [''],
      tes_serologis: [''],
      dapat_asi: [''],
      periksa_hiv: [''],
      pemberian_profilaksis: [''],
      klasifikasi_hiv: ['']
    })
    
    this.formObservationAsi = this.fb.group({
      diberi_asi: [''],
      dalam_sehari: [''],
      selain_asi: [''],
      bb_menurut_umur: ['']
    })
    
    this.formObservationMinuman = this.fb.group({
      merk_susu: [''],
      dalam_sehari: [''],
      jumlah_yg_diberikan: [''],
      cara_memberikan_sdh_benar: ['']
    })
    
    this.formPemeriksaanStatusVitK = this.fb.group({
      procedure_code: [''],
      procedure_name: [''],
      observation_code: [''],
      observation_name: ['']
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
    this.doCreateKunjunganMtbm()
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
      case 'form-ibu-ayah': 
        this.doSubmitRelatedPerson() 
      break
      case 'form-observasi-mtbm':
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

  async doSubmitRelatedPerson(){
    var data = {
      data: {
        rmno: this.patientData.norm,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        related_person: {
          ...this.formIbuAyah.value,
          province_id_ibu: this.selectedProvinceIbu,
          city_id_ibu: this.selectedCityIbu,
          district_id_ibu: this.selectedDistrictIbu,
          village_id_ibu: this.selectedSubDistrictIbu,
          province_id_ayah: this.selectedProvinceAyah,
          city_id_ayah: this.selectedCityAyah,
          district_id_ayah: this.selectedDistrictAyah,
          village_id_ayah: this.selectedSubDistrictAyah
        }
      }
    }

    this.showLoading()
    let response: any = await this.mtbmService.createRelatedPersonMTBM(data)
    let msg = response.statusMsg.split(': ')
    if(response.statusCode == '00') {
      Swal.fire(msg[0], msg[1], 'success')
    } else {
      Swal.fire(msg[0], msg[1], 'error')
    }
  }

  async doCreateKunjunganMtbm() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let response: any = await this.mtbmService.createKunjunganMTBM({
      data: {
          rmno: this.patientData.norm,
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
        rmno: this.patientData.norm,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        diagnosa: {
          ...this.formDiagnosa.value
        }
      }
    }
    let response: any = await this.mtbmService.diagnosaMTBM(data)
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
        rmno: this.patientData.norm,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        imunisasi: [
          {
            ...this.formImunisasi.value
          }
        ]
      }
    }
    let response: any = await this.mtbmService.imunisasiMTBM(data)
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
        rmno: this.patientData.norm,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        tindakan: {
          ...this.formTindakan.value
        }
      }
    }
    let response: any = await this.mtbmService.tindakanMTBM(data)
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
        rmno: this.patientData.norm,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        tindak_lanjut: {
          ...this.formTindakLanjut.value
        }
      }
    }
    let response: any = await this.mtbmService.tindakLanjutMTBM(data)
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
        rmno: this.patientData.norm,
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
    let response: any = await this.mtbmService.meninggalkanFaskesMTBM(data)
    let responseUpdate: any = await this.mtbmService.updateKunjunganMTBM(data)
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
        rmno: this.patientData.norm,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        keluhan: {     
          ...this.formKeluhan.value
        },
        observation: {
          ...this.formObservation.value
        },
        observation_tanda_vital: {     
          ...this.formObservationTandaVital.value
        },
        observation_infeksi: {     
          ...this.formObservationInfeksi.value
        },
        observation_ikterus: {     
          ...this.formObservationIkterus.value
        },
        observation_diare: {     
          ...this.formObservationDiare.value  
        },
        observation_hiv: {     
          ...this.formObservationHIV.value
        },
        observation_asi: {     
          ...this.formObservationAsi.value
        },
        observation_minuman: {
          ...this.formObservationMinuman.value
        },
        pemeriksaan_status_vit_k: {
          ...this.formPemeriksaanStatusVitK.value
        }
      }
    }
    this.mtbmService.keluhanUtamaMTBM(data)
    this.mtbmService.observationOnlyMTBM(data)
    this.mtbmService.observationTandaVitalMTBM(data)
    this.mtbmService.observationMTBM(data)
    this.mtbmService.observationAsiMTBM(data)
    this.mtbmService.diagnosaAsiMTBM(data)
    let response: any = await this.mtbmService.observationVitaminKMTBM(data)
    let msg = response.statusMsg.split(': ')
    if(response.statusCode == '00') {
      Swal.fire(msg[0], msg[1], 'success')
    } else {
      Swal.fire(msg[0], msg[1], 'error')
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
      rmno: this.patientData.norm,
      usecase_id: this.useCaseId,
      type: "MTBM",
      status: "active"
    })

    let patient = response.data
    if (patient) {
      this.formIbuAyah.patchValue(patient.related_person)
      this.formKeluhan.patchValue(patient.keluhan)
      this.formObservation.patchValue(patient.observation)
      this.formObservationTandaVital.patchValue(patient.observation_tanda_vital)
      this.formObservationInfeksi.patchValue(patient.observation_infeksi)
      this.formObservationIkterus.patchValue(patient.observation_ikterus)
      this.formObservationDiare.patchValue(patient.observation_diare)
      this.formObservationHIV.patchValue(patient.observation_hiv)
      this.formObservationAsi.patchValue(patient.observation_asi)
      this.formObservationMinuman.patchValue(patient.observation_minuman)
      this.formPemeriksaanStatusVitK.patchValue(patient.pemeriksaan_status_vit_k)
      this.formDiagnosa.patchValue(patient.diagnosa)
      this.formImunisasi.patchValue(patient.imunisasi ? patient.imunisasi[0] : '')
      this.formTindakan.patchValue(patient.tindakan)
      this.formTindakLanjut.patchValue(patient.tindak_lanjut)
      this.formMeninggalkanFaskes.patchValue({
        ...patient.meninggalkan_faskes,
        waktu_meninggal: patient.meninggalkan_faskes && patient.meninggalkan_faskes.waktu_meninggal ? patient.meninggalkan_faskes.waktu_meninggal.split('T')[0] : ''
      })
      this.formUpdateKunjungan.patchValue(patient.update_data)

      if(patient.related_person) {
        this.selectedProvinceIbu = patient.related_person.province_id_ibu
        this.selectedCityIbu = patient.related_person.city_id_ibu
        this.selectedDistrictIbu = patient.related_person.district_id_ibu
        this.selectedSubDistrictIbu = patient.related_person.village_id_ibu
        this.selectedProvinceAyah = patient.related_person.province_id_ayah
        this.selectedCityAyah = patient.related_person.city_id_ayah
        this.selectedDistrictAyah = patient.related_person.district_id_ayah
        this.selectedSubDistrictAyah = patient.related_person.village_id_ayah
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

  cariTindakan() {
    this.api.caritindakan(this.searchTindakanText, this.searchTindakanBy).subscribe((data) => {
      this.tindakanList = data
    })
  }

  cariDiagnosa() {
    this.api.caridiagnosa(this.searchDiagnosaText, this.searchDiagnosaBy).subscribe((data) => {
      this.diagnosaList = data
    })
  }

  cariDiagnosaSecondary() {
    this.api.caridiagnosa(this.searchDiagnosaTextSecondary, this.searchDiagnosaBy).subscribe((data) => {
      this.diagnosaListSecondary = data
    })
  }
  
  pilihDiagnosa(data, form: FormGroup) {
    this.diagnosaList = []
    this.searchDiagnosaText = ""

    form.patchValue({
      diagnostic_code: data.kddiagnosa,
      diagnostic_name: data.diagnosa
    })
  }

  pilihDiagnosaSecondary(data, form: FormGroup, params = ['condition_code', 'condition_note']) {
    this.diagnosaList = []
    this.searchDiagnosaText = ""

    let template = `{
      "${params[0]}": "${data.kddiagnosa}",
      "${params[1]}": "${data.diagnosa}"
    }`;
    
    form.patchValue(JSON.parse(template))
  }

  pilihCondition(data, form: FormGroup, params = ['condition_code', 'condition_note']) {
    this.diagnosaList = []
    this.searchDiagnosaText = ""

    let template = `{
      "${params[0]}": "${data.kddiagnosa}",
      "${params[1]}": "${data.diagnosa}"
    }`;
    
    form.patchValue(JSON.parse(template))
  }
}
