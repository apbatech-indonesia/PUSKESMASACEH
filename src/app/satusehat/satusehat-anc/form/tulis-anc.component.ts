import { Component, OnInit } from '@angular/core'
import { ApiserviceService } from '../../../apiservice.service'
import { ActivatedRoute } from '@angular/router'
import { faCog, faSave } from '@fortawesome/free-solid-svg-icons'
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import Swal from 'sweetalert2'
import { HttpHeaders } from '@angular/common/http'
import { AncService } from '../services/anc.service'

@Component({
  selector: 'app-tulis-anc',
  templateUrl: './tulis-anc.component.html',
  styleUrls: ['./tulis-anc.component.sass']
})
export class TulisAncComponent implements OnInit {
  // property
  notransaksi: string = this.route.snapshot.paramMap.get('notrans')
  activeTab: string = 'form-anc'
  useCaseId: string
  cabangData: any
  idpasien: any
  faCog = faCog
  faSave = faSave
  isDisabledFormAnc: boolean = true
  
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
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
  formObstetri: FormGroup
  formKunjungan: FormGroup
  formPemeriksaanIbu: FormGroup
  formPemeriksaanFisik: FormGroup
  formPemeriksaanJanin: FormGroup
  formPemantauan: FormGroup
  formRiwayatPenyakitDanResiko: FormGroup
  formQuestionnaireLainnya: FormGroup
  formTindakan: FormGroup
  formDiagnosa: FormGroup
  formKonseling: FormGroup
  formHasilLab: FormGroup
  formHasilRadiologi: FormGroup
  formMeninggalkanFaskes: FormGroup
  formTindakLanjut: FormGroup


  constructor(
    private api: ApiserviceService,
    private ancService: AncService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.formObstetri = this.fb.group({
      gravida: [''],
      paritas: [''],
      abortus: [''],
      tanggal_hpht: [''],
      hari_perkiraan_lahir: [''],
      berat_badan_sebelum_hamil: [''],
      tinggi_badan: [''],
      imt_sebelum_hamil: [''],
      target_kenaikan_berat_badan: [''],
      jarak_kehamilan: [''],
      status_imunisasi_tt: ['']
    })

    this.formKunjungan = this.fb.group({
      usia_kehamilan: [''],
      trimester: ['']
    })

    this.formPemeriksaanIbu = this.fb.group({
      berat_badan: [''],
      lingkar_lengan_atas: [''],
      tinggi_fundus: [''],
      tekanan_darah_sistolik: [''],
      tekanan_darah_diastolik: [''],
      nadi: [''],
      suhu: [''],
      pernapasan: [''],
      golongan_darah: [''],
      rhesus: [''],
      pemberian_makanan_tambahan: ['']
    })

    this.formPemeriksaanFisik = this.fb.group({
      konjungtiva: [''],
      sklera: [''],
      leher: [''],
      gigi_dan_mulut: [''],
      tht: [''],
      dada_jantung: [''],
      dada_paru: [''],
      perut: [''],
      tungkai: ['']
    })

    this.formPemeriksaanJanin = this.fb.group({
      denyut_jantung_janin: [''],
      kepala_terhadap: [''],
      taksiran_berat_janin: [''],
      presentasi: [''],
      jumlah_janin: ['']
    })

    this.formPemantauan = this.fb.group({
      terlalu_muda_usia_melahirkan: [false],
      terlalu_rapat_jarak_kehamilan: [false],
      terlalu_tua_usia: [false],
      terlalu_sering_melahirkan: [false],
    })

    this.formRiwayatPenyakitDanResiko = this.fb.group({
      riwayat_penyakit: [''],
      pernah_merokok: [false],
      konsumsi_alkohol: [false],
    })

    this.formQuestionnaireLainnya = this.fb.group({
      disabilitas: [false],
      kelas_ibu_hamil: [false]
    })

    this.formTindakan = this.fb.group({
      usg_start_date: [''],
      usg_end_date: [''],
      diagnostic_code: [''],
      diagnostic_name: ['']
    })
    
    this.formDiagnosa = this.fb.group({
      diagnostic_code: [''],
      diagnostic_name: ['']
    })

    this.formKonseling = this.fb.group({
      diberikankonseling: [''],
      temaKonseling: [''],
    })

    this.formHasilLab = this.fb.group({
      pemeriksaan_sputum_bta: [''],
      bta: [''],
      pemeriksaan_darah: [''],
      hemoglobin: [''],
      hiv: [''],
      rpr: [''],
      vdrl: [''],
      hepatitisb: [''],
      pemeriksaan_urin: [''],
      gula_darah: [''],
      protein_urine: ['']
    })

    this.formHasilRadiologi = this.fb.group({
      gsDiameter: [''],
      crl: [''],
      djj: [''],
      usiaKehamilan: [''],
      hpl: [''],
      letakJanin: [''],
      bpd: [''],
      hc: [''],
      ac: [''],
      fl: [''],
      beratJanin: ['']
    })

    this.formMeninggalkanFaskes = this.fb.group({
      diagnostic_code: [''],
      diagnostic_name: [''],
      pasien_meninggal: [false],
      waktu_kematian: [''],
    })

    this.formTindakLanjut = this.fb.group({
      ket_rujukan: [''],
      ket_kontrol: [''],
      instruksi_rujukan: [''],
      instruksi_kontrol: ['']
    })
  }

  // methods
  ngOnInit() {
    this.doPendaftaranAnc()
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
      case 'form-anc': this.doSubmitObstetri(); break;
      case 'data-tindakan': this.doSubmitTindakan(); break;
      case 'data-konseling': this.doSubmitKonseling(); break;
      case 'laboratorium': this.doSubmitLab(); break;
      case 'radiologi': this.doSubmitRadiologi(); break;
      case 'diagnosa': this.doSubmitDiagnosa(); break;
      case 'meninggalkan-faskes': this.doSubmitMeninggalkanFaskes(); break;
      case 'tindak-lanjut': this.doSubmitTindakLanjut(); break;
    }
  }

  async doSubmitObstetri(){
    var data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        status_obstetri: {
          ...this.formObstetri.value
        },
        data_kunjungan_kehamilan: {
          ...this.formKunjungan.value
        },
        pemeriksaan_ibu: {
          ...this.formPemeriksaanIbu.value
        },
        pemeriksaan_fisik: {
          ...this.formPemeriksaanFisik.value
        },
        pemeriksaan_janin: {
          ...this.formPemeriksaanJanin.value
        },
        pemantauan_pendampingan: {
          ...this.formPemantauan.value
        },
        riwayat_penyakit_dan_resiko: {
          ...this.formRiwayatPenyakitDanResiko.value
        },
        lainnya: {
          ...this.formQuestionnaireLainnya.value
        }
      }
    }

    this.showLoading()
    let response1: any = await this.ancService.updateStatusObstetri(data)
    let response2: any = await this.ancService.updateKunjunganKehamilan(data)
    let response3: any = await this.ancService.updatePelayananKehamilan(data)
    if (response1.statusCode != '00') {
      Swal.fire(response1.statusMsg.split(': ')[0], response1.statusMsg.split(': ')[1], 'error')
    } 
    else if(response2.statusCode != '00') {
      Swal.fire(response2.statusMsg.split(': ')[0], response2.statusMsg.split(': ')[1], 'error')
    } 
    else if(response3.statusCode != '00') {
      Swal.fire(response3.statusMsg.split(': ')[0], response3.statusMsg.split(': ')[1], 'error')
    } 
    else if(
      response1.statusCode == '00' &&
      response2.statusCode == '00' &&
      response3.statusCode == '00'
    ) {
      Swal.fire(response1.statusMsg.split(': ')[0], response1.statusMsg.split(': ')[1], 'success')
    } 
  }

  async doSubmitTindakan(){
    var data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        tindakan: {
          ...this.formTindakan.value
        }
      }
    }

    data.data.tindakan.usg_start_date = new Date(data.data.tindakan.usg_start_date).toISOString()
    data.data.tindakan.usg_end_date = new Date(data.data.tindakan.usg_end_date).toISOString()

    this.showLoading()
    let response: any = await this.ancService.updateTindakanKehamilan(data)
    if(response.statusCode == '00') {
      Swal.fire(response.statusMsg.split(': ')[0], response.statusMsg.split(': ')[1], 'success')
    } else {
      Swal.fire(response.statusMsg.split(': ')[0], response.statusMsg.split(': ')[1], 'error')
    }
  }

  async doSubmitKonseling(){
    var data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        konseling: {
          ...this.formKonseling.value
        }
      }
    }

    this.showLoading()
    let response: any = await this.ancService.updateKonseling(data)
    if(response.statusCode == '00') {
      Swal.fire(response.statusMsg.split(': ')[0], response.statusMsg.split(': ')[1], 'success')
    } else {
      Swal.fire(response.statusMsg.split(': ')[0], response.statusMsg.split(': ')[1], 'error')
    }
  }

  async doSubmitDiagnosa() {
    var data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        diagnosis_final: {
          ...this.formDiagnosa.value
        }
      }
    }

    this.showLoading()
    let response: any = await this.ancService.diagnosisFinal(data)
    if(response.statusCode == '00') {
      Swal.fire(response.statusMsg.split(': ')[0], response.statusMsg.split(': ')[1], 'success')
    } else {
      Swal.fire(response.statusMsg.split(': ')[0], response.statusMsg.split(': ')[1], 'error')
    }
  }

  async doSubmitMeninggalkanFaskes(){
    var data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        meninggalkan_faskes: {
          ...this.formMeninggalkanFaskes.value
        }
      }
    }

    this.showLoading()
    let response: any = await this.ancService.meninggalkanFaskes(data)
    if(response.statusCode == '00') {
      Swal.fire(response.statusMsg.split(': ')[0], response.statusMsg.split(': ')[1], 'success')
    } else {
      Swal.fire(response.statusMsg.split(': ')[0], response.statusMsg.split(': ')[1], 'error')
    }
  }

  async doSubmitTindakLanjut() {
    var data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        tindak_lanjut: {
          ...this.formTindakLanjut.value
        }
      }
    }

    this.showLoading()

    let response1: any = await this.ancService.tindakLanjutEncounter(data)
    let response2: any = await this.ancService.tindakLanjutCreate(data)
    if (response1.statusCode != '00') {
      Swal.fire(`tindakLanjutEncounter : ${response1.statusMsg.split(': ')[0]}`, response1.statusMsg.split(': ')[1], 'error')
    }
    else if (response2.statusCode != '00') {
      Swal.fire(`tindakLanjutCreate : ${response2.statusMsg.split(': ')[0]}`, response2.statusMsg.split(': ')[1], 'error')
    }
    else if(response1.statusCode == '00') {
      Swal.fire(response1.statusMsg.split(': ')[0], response1.statusMsg.split(': ')[1], 'success')
    } 
    else {
      this.stopLoading()
    }
  }

  async doSubmitLab() {
    var data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        pemeriksaan_penunjang_lab: {
          ...this.formHasilLab.value
        }
      }
    }

    this.showLoading()

    let response1: any = await this.ancService.createLaboratorium(data)
    let response2: any = await this.ancService.observationLaboratorium(data)
    let response3: any = await this.ancService.diagLaboratorium(data)
    if (response1.statusCode != '00') {
      Swal.fire(response1.statusMsg.split(': ')[0], response1.statusMsg.split(': ')[1], 'error')
    }
    else if (response2.statusCode != '00') {
      Swal.fire(response2.statusMsg.split(': ')[0], response2.statusMsg.split(': ')[1], 'error')
    }
    else if (response3.statusCode != '00') {
      Swal.fire(response3.statusMsg.split(': ')[0], response3.statusMsg.split(': ')[1], 'error')
    }
    else if(
      response1.statusCode == '00' &&
      response2.statusCode == '00' &&
      response3.statusCode == '00'
    ) {
      Swal.fire(response1.statusMsg.split(': ')[0], response1.statusMsg.split(': ')[1], 'success')
    }
    else {
      this.stopLoading()
    }
  }

  async doSubmitRadiologi() {
    var data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        pemeriksaan_penunjang_radiologi: {
          ...this.formHasilRadiologi.value
        }
      }
    }

    this.showLoading()

    let response1: any = await this.ancService.createRadiologi(data)
    let response2: any = await this.ancService.observationRadiologi(data)
    let response3: any = await this.ancService.diagnosisReportRadiologi(data)
    
    if (response1.statusCode != '00') {
      Swal.fire(`createRadiologi : ${response1.statusMsg.split(': ')[0]}`, response1.statusMsg.split(': ')[1], 'error')
    }
    else if (response2.statusCode != '00') {
      Swal.fire(`observationRadiologi : ${response2.statusMsg.split(': ')[0]}`, response2.statusMsg.split(': ')[1], 'error')
    }
    else if (response3.statusCode != '00') {
      Swal.fire(`diagnosisReportRadiologi : ${response3.statusMsg.split(': ')[0]}`, response3.statusMsg.split(': ')[1], 'error')
    }
    else if(
      response1.statusCode == '00' &&
      response2.statusCode == '00' &&
      response3.statusCode == '00'
    ) {
      Swal.fire(response1.statusMsg.split(': ')[0], response1.statusMsg.split(': ')[1], 'success')
    }
    else {
      this.stopLoading()
    }
  }

  async doPendaftaranAnc() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let response: any = await this.ancService.createAnc({
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
      type: "ANC",
      status: "active"
    })

    let patient = response.data
    if (patient) {
      this.formObstetri.patchValue(patient.status_obstetri)
      this.formKunjungan.patchValue(patient.data_kunjungan_kehamilan)
      this.formPemeriksaanIbu.patchValue(patient.pemeriksaan_ibu)
      this.formPemeriksaanFisik.patchValue(patient.pemeriksaan_fisik)
      this.formPemeriksaanJanin.patchValue(patient.pemeriksaan_janin)
      this.formPemantauan.patchValue(patient.pemantauan_pendampingan)
      this.formRiwayatPenyakitDanResiko.patchValue(patient.riwayat_penyakit_dan_resiko)
      this.formQuestionnaireLainnya.patchValue(patient.lainnya)
      this.formTindakan.patchValue({
        ...patient.tindakan,
        usg_start_date: patient.tindakan ? patient.tindakan.usg_start_date.split('T')[0] : '',
        usg_end_date: patient.tindakan ? patient.tindakan.usg_end_date.split('T')[0] : ''
      })
      this.formKonseling.patchValue(patient.konseling)
      this.formHasilLab.patchValue(patient.pemeriksaan_penunjang_lab)
      this.formHasilRadiologi.patchValue(patient.pemeriksaan_penunjang_radiologi)
      this.formDiagnosa.patchValue(patient.diagnosis_final)
      this.formMeninggalkanFaskes.patchValue(patient.meninggalkan_faskes)
      this.formTindakLanjut.patchValue(patient.tindak_lanjut)
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
