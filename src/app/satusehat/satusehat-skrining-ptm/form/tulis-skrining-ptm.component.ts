import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import Swal from 'sweetalert2'
import { ApiserviceService } from '../../../apiservice.service'
import { ActivatedRoute } from '@angular/router'
import { AncService } from '../../satusehat-anc/services/anc.service'
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { SkriningPTMService } from '../services/skrining-ptm.service'
import { DataFaktorResiko } from '../data/data-faktor-resiko'
import { DataRiwayat } from '../data/data-riwayat'
import { DataDeteksiDiniObesitas } from '../data/data-deteksi-dini-obesitas'
import { DataDeteksiDiniHipertensi } from '../data/data-deteksi-dini-hipertensi'
import { DataDeteksiDiniMata } from '../data/data-deteksi-dini-mata'
import { DataDiagnosaPtm } from '../data/data-diagnosa-ptm'
import { DataTindakanPtm } from '../data/data-tindakan-ptm'
import { DataTindakLanjutPtm } from '../data/data-tindak-lanjut'
import { DataKondisiKeluarFaskes } from '../data/data-kondisi-keluar-faskes'
import { DataUpdateKunjungan } from '../data/data-update-kunjungan'
import { DataDeteksiDiniPendengaran } from '../data/data-deteksi-dini-pendengaran'
import { DataDeteksiPpokObservation } from '../data/data-deteksi-dini-ppok-observation'
import { DataDeteksiDiniDiabetesObservation } from '../data/data-deteksi-dini-diabetes-observation'
import { DataDeteksiDiniDiabetesServiceRequest } from '../data/data-deteksi-dini-diabetes-service-request'
import { DataDeteksiDiniDiabetesSpecimen } from '../data/data-deteksi-dini-diabetes-specimen'
import { DataDeteksiDiniDiabetesReport } from '../data/data-deteksi-dini-diabetes-report'
import { DataDeteksiStrokeObservation } from '../data/data-deteksi-dini-stroke-observation'
import { DataDeteksiStrokeServiceRequest } from '../data/data-deteksi-dini-stroke-service-request'
import { DataDeteksiStrokeSpecimen } from '../data/data-deteksi-dini-stroke-specimen'
import { DataDeteksiStrokeReport } from '../data/data-deteksi-dini-stroke-report'
import { DataDeteksiPpokCondition, Condition } from '../data/data-deteksi-dini-ppok-condition'
import { DataDeteksiPpokProcedure, Procedure } from '../data/data-deteksi-dini-ppok-procedure'
import { DataDeteksiDiniKankerJantungQuestionnareResponse } from '../data/data-deteksi-dini-kanker-jantung-questionnare-response'
import { DataDeteksiDiniKankerKolorektalPemeriksaanDarahDiagnosticReport } from '../data/data-deteksi-dini-kanker-kolorektal-pemeriksaan-darah-diagnostic-report'
import { DataDeteksiDiniKankerKolorektalPemeriksaanDarahObservations } from '../data/data-deteksi-dini-kanker-kolorektal-pemeriksaan-darah-observations'
import { DataDeteksiDiniKankerKolorektalPemeriksaanDarahServiceRequest } from '../data/data-deteksi-dini-kanker-kolorektal-pemeriksaan-darah-service-request'
import { DataDeteksiDiniKankerKolorektalPemeriksaanDarahSpecimen } from '../data/data-deteksi-dini-kanker-kolorektal-pemeriksaan-darah-specimen'
import { DataDeteksiDiniKankerKolorektalQuestionnareResponse } from '../data/data-deteksi-dini-kanker-kolorektal-questionnare-response'
import { DataDeteksiDiniKankerPayudaraHasilUsgDiagnosticReport } from '../data/data-deteksi-dini-kanker-payudara-hasil-usg-diagnostic-report'
import { DataDeteksiDiniKankerPayudaraHasilUsgObservation } from '../data/data-deteksi-dini-kanker-payudara-hasil-usg-observation'
import { DataDeteksiDiniKankerPayudaraSadanisObservation } from '../data/data-deteksi-dini-kanker-payudara-sadanis-observation'
import { DataDeteksiDiniKankerPayudaraUsgServiceRequest } from '../data/data-deteksi-dini-kanker-payudara-usg-service-request'
import { DataDeteksiDiniKankerServicHpvObservation } from '../data/data-deteksi-dini-kanker-servic-hpv-observation'
import { DataDeteksiDiniKankerServicProcedure } from '../data/data-deteksi-dini-kanker-servic-procedure'
import { DataDeteksiDiniKankerServicObservation } from '../data/data-deteksi-dini-kanker-servic-observation'
import { DataDeteksiDiniKankerServicIvaProcedure } from '../data/data-deteksi-dini-kanker-servic-iva-procedure'
import { DataDeteksiDiniKankerServicIvaPositifServiceRequest } from '../data/data-deteksi-dini-kanker-servic-iva-positif-service-request'
import { DataDeteksiDiniKankerServicIvaPositifPatientRreferral } from '../data/data-deteksi-dini-kanker-servic-iva-positif-patient-referral'
import { DataDeteksiDiniKankerServicIvaPositifIntervensiDitolak } from '../data/data-deteksi-dini-kanker-servic-iva-positif-intervensi-ditolak'
import { DataDeteksiDiniKankerServicIvaObservation } from '../data/data-deteksi-dini-kanker-servic-iva-observation'
import { DataDeteksiDiniKankerServicHpvDiagnosticReport } from '../data/data-deteksi-dini-kanker-servic-hpv-diagnostic-report'
import { DataDeteksiDiniKankerServicHpvServiceRequest } from '../data/data-deteksi-dini-kanker-servic-hpv-service-request'
import { DataDeteksiDiniKankerServicHpvSpecimen } from '../data/data-deteksi-dini-kanker-servic-hpv-specimen'
import { DataDeteksiDiniJantung } from '../data/data-deteksi-dini-jantung'

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
  activeTab: any = 'form-skrining-ptm'

  data: any

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

  constructor(
    private api: ApiserviceService,
    private skriningPTMService: SkriningPTMService,
    private ancService: AncService,
    private route: ActivatedRoute,
    public riwayat: DataRiwayat,
    public faktorResiko: DataFaktorResiko,
    public deteksiDiniObesitas: DataDeteksiDiniObesitas,
    public deteksiDiniHipertensi: DataDeteksiDiniHipertensi,
    public deteksiDiniMata: DataDeteksiDiniMata,
    public deteksiDiniPendengaran: DataDeteksiDiniPendengaran,
    public deteksiDiniObservationPPOK: DataDeteksiPpokObservation,
    public deteksiDiniConditionPPOK: DataDeteksiPpokCondition,
    public deteksiDiniProcedurePPOK: DataDeteksiPpokProcedure,
    public deteksiDiniKankerJantungQuestionnareResponse: DataDeteksiDiniKankerJantungQuestionnareResponse,
    public deteksiDiniKankerKolorektalPemeriksaanDarahDiagnosticReport: DataDeteksiDiniKankerKolorektalPemeriksaanDarahDiagnosticReport,
    public deteksiDiniKankerKolorektalPemeriksaanDarahObservations: DataDeteksiDiniKankerKolorektalPemeriksaanDarahObservations,
    public deteksiDiniKankerKolorektalPemeriksaanDarahServiceRequest: DataDeteksiDiniKankerKolorektalPemeriksaanDarahServiceRequest,
    public deteksiDiniKankerKolorektalPemeriksaanDarahSpecimen: DataDeteksiDiniKankerKolorektalPemeriksaanDarahSpecimen,
    public deteksiDiniKankerKolorektalQuestionnareResponse: DataDeteksiDiniKankerKolorektalQuestionnareResponse,
    public deteksiDiniKankerPayudaraHasilUsgDiagnosticReport: DataDeteksiDiniKankerPayudaraHasilUsgDiagnosticReport,
    public deteksiDiniKankerPayudaraHasilUsgObservation: DataDeteksiDiniKankerPayudaraHasilUsgObservation,
    public deteksiDiniKankerPayudaraSadanisObservation: DataDeteksiDiniKankerPayudaraSadanisObservation,
    public deteksiDiniKankerPayudaraUsgServiceRequest: DataDeteksiDiniKankerPayudaraUsgServiceRequest,
    public deteksiDiniKankerServicHpvObservation: DataDeteksiDiniKankerServicHpvObservation,
    public deteksiDiniKankerServicHpvDiagnosticReport: DataDeteksiDiniKankerServicHpvDiagnosticReport,
    public deteksiDiniKankerServicHpvServiceRequest: DataDeteksiDiniKankerServicHpvServiceRequest,
    public deteksiDiniKankerServicHpvSpecimen: DataDeteksiDiniKankerServicHpvSpecimen,
    public deteksiDiniKankerServicIvaObservation: DataDeteksiDiniKankerServicIvaObservation,
    public deteksiDiniKankerServicIvaPositifIntervensiDitolak: DataDeteksiDiniKankerServicIvaPositifIntervensiDitolak,
    public deteksiDiniKankerServicIvaPositifPatientReferral: DataDeteksiDiniKankerServicIvaPositifPatientRreferral,
    public deteksiDiniKankerServicIvaPositifServiceRequest: DataDeteksiDiniKankerServicIvaPositifServiceRequest,
    public deteksiDiniKankerServicIvaProcedure: DataDeteksiDiniKankerServicIvaProcedure,
    public deteksiDiniKankerServicObservation: DataDeteksiDiniKankerServicObservation,
    public deteksiDiniKankerServicProcedure: DataDeteksiDiniKankerServicProcedure,
    public deteksiDiniDiabetesObservation: DataDeteksiDiniDiabetesObservation,
    public deteksiDiniDiabetesServiceRequest: DataDeteksiDiniDiabetesServiceRequest,
    public deteksiDiniDiabetesSpecimen: DataDeteksiDiniDiabetesSpecimen,
    public deteksiDiniDiabetesReport: DataDeteksiDiniDiabetesReport,
    public deteksiDiniStrokeObservation: DataDeteksiStrokeObservation,
    public deteksiDiniStrokeServiceRequest: DataDeteksiStrokeServiceRequest,
    public deteksiDiniStrokeSpecimen: DataDeteksiStrokeSpecimen,
    public deteksiDiniStrokeReport: DataDeteksiStrokeReport,
    public deteksiDiniJantung: DataDeteksiDiniJantung,
    public diagnosaPtm: DataDiagnosaPtm,
    public tindakanPtm: DataTindakanPtm,
    public tindakLanjutPtm: DataTindakLanjutPtm,
    public kondisiKeluarFaskes: DataKondisiKeluarFaskes,
    public updateKunjungan: DataUpdateKunjungan,
  ) { }

  // methods
  ngOnInit() {
    this.docreateKunjunganSkriningPTM()
  }

  openTab(tab: string) {
    this.activeTab = tab
  }

  test(data: any) {
    console.log(data.getdata())
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
    this.showLoading()

    switch (this.activeTab) {
      case 'form-skrining-ptm':
        this.doSubmitRiwayat()
        this.doSubmitFaktorResiko()
        break

      case 'deteksi-dini-obesitas':
        this.doSubmitDeteksiDiniObesitas()
        break

      case 'deteksi-dini-hipertensi':
        this.doSubmitDeteksiDiniHipertensi()
        break

      case 'deteksi-dini-mata':
        this.doSubmitDeteksiDiniMata()
        break

      case 'deteksi-dini-pendengaran':
        this.doSubmitDeteksiDiniPendengaran()
        break

      case 'deteksi-dini-ppok':
        this.doSubmitDeteksiDiniPPOK()
        break

      case 'deteksi-dini-kanker':
        this.doSubmitDeteksiDiniKanker()
        break

      case 'deteksi-dini-diabetes':
        this.doSubmitDeteksiDiniDiabetes()
        break

      case 'deteksi-dini-stroke':
        this.doSubmitDeteksiDiniStroke()
        break

      case 'deteksi-dini-jantung':
        this.doSubmitDeteksiDiniJantung()
        break

      case 'diagnosa':
        this.doSubmitDiagnosa()
        break

      case 'tindakan':
        this.doSubmitProcedure()
        break

      case 'tindak-lanjut':
        this.doSubmitTindakLanjut()
        break

      case 'kondisi-keluar-faskes':
        this.doSubmitKondisiKeluarFaskes()
        this.doSubmitUpdateDataKunjungan()
        break
    }

    // this.doSubmitTindakLanjut()
    // this.doSubmitKondisiKeluarFaskes()
    // this.doSubmitUpdateDataKunjungan()
  }

  async doSubmitRiwayat() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.riwayat.getdata()
      }
    }

    console.log(await this.skriningPTMService.updateRiwayat(payload))
  }

  async doSubmitFaktorResiko() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.faktorResiko.getdata()
      }
    }

    console.log(await this.skriningPTMService.faktorResiko(payload))
  }

  async doSubmitDeteksiDiniObesitas() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.deteksiDiniObesitas.getdata()
      }
    }

    console.log(await this.skriningPTMService.deteksiDiniObesitas(payload))
  }

  async doSubmitDeteksiDiniHipertensi() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.deteksiDiniHipertensi.getdata()
      }
    }

    console.log(await this.skriningPTMService.observationsCreate(payload))
  }

  async doSubmitDeteksiDiniMata() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.deteksiDiniMata.getdata()
      }
    }

    console.log(await this.skriningPTMService.observationsCreate(payload))
  }

  async doSubmitDeteksiDiniPendengaran() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.deteksiDiniPendengaran.getdata()
      }
    }

    console.log(await this.skriningPTMService.observationsCreate(payload))
  }

  async doSubmitDeteksiDiniPPOK() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payloadObservation = {
      data: {
        ...this.data,
        ...this.deteksiDiniObservationPPOK.getdata()
      }
    }

    let payloadCondition = {
      data: {
        ...this.data,
        ...this.deteksiDiniConditionPPOK.getdata()
      }
    }

    let payloadProcedure = {
      data: {
        ...this.data,
        ...this.deteksiDiniProcedurePPOK.getdata()
      }
    }

    console.log(await this.skriningPTMService.observationsCreate(payloadObservation))
    console.log(await this.skriningPTMService.conditionsCreate(payloadCondition))
    console.log(await this.skriningPTMService.proceduresCreate(payloadProcedure))
  }

  async doSubmitDeteksiDiniKanker() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    if (this.deteksiDiniKankerServicObservation.result) {
      // servic
      let payloadServicProcedure = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicProcedure.getdata()
        }
      }
      let payloadServicObservation = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicObservation.getdata()
        }
      }
      console.log(await this.skriningPTMService.proceduresCreate(payloadServicProcedure))
      console.log(await this.skriningPTMService.observationsCreate(payloadServicObservation))
    }

    if (this.deteksiDiniKankerServicIvaObservation.result) {
      // iva
      let payloadServicIvaProcedure = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicIvaProcedure.getdata()
        }
      }
      let payloadServicIvaObservation = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicIvaObservation.getdata()
        }
      }
      console.log(await this.skriningPTMService.proceduresCreate(payloadServicIvaProcedure))
      console.log(await this.skriningPTMService.observationsCreate(payloadServicIvaObservation))
    }

    // hpv
    if (this.deteksiDiniKankerServicHpvServiceRequest.code) {
      let payloadHpvServiceRequest = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicHpvServiceRequest.getdata()
        }
      }
      let payloadHpvSpecimen = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicHpvSpecimen.getdata()
        }
      }
      let payloadHpvObservation = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicHpvObservation.getdata()
        }
      }
      let payloadHpvDiagnosticReport = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicHpvDiagnosticReport.getdata()
        }
      }
      console.log(await this.skriningPTMService.serviceRequestsCreate(payloadHpvServiceRequest))
      console.log(await this.skriningPTMService.specimensCreate(payloadHpvSpecimen))
      console.log(await this.skriningPTMService.observationsCreate(payloadHpvObservation))
      console.log(await this.skriningPTMService.diagnosticReportsCreate(payloadHpvDiagnosticReport))
    }

    // iva positif
    if (
      this.deteksiDiniKankerServicIvaPositifServiceRequest.code &&
      this.deteksiDiniKankerServicIvaPositifIntervensiDitolak.code &&
      this.deteksiDiniKankerServicIvaPositifPatientReferral.patientInstruction
    ) {
      let payloadServicIvaPositifServiceRequest = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicIvaPositifServiceRequest.getdata()
        }
      }
      let payloadServicIvaPositifProcedure = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicIvaPositifIntervensiDitolak.getdata()
        }
      }
      let payloadDeteksiDiniKankerServicIvaPositifPatientReferral = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerServicIvaPositifPatientReferral.getdata()
        }
      }
      console.log(await this.skriningPTMService.serviceRequestsCreate(payloadServicIvaPositifServiceRequest))
      console.log(await this.skriningPTMService.serviceRequestsCreate(payloadDeteksiDiniKankerServicIvaPositifPatientReferral))
      console.log(await this.skriningPTMService.proceduresCreate(payloadServicIvaPositifProcedure))
    }

    // kanker payudara
    if (
      this.deteksiDiniKankerPayudaraSadanisObservation.display
    ) {
      let payloadDeteksiDiniKankerPayudaraSadanisObservation = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerPayudaraSadanisObservation.getdata()
        }
      }
      
      let payloadDeteksiDiniKankerPayudaraHasilUsgObservation = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerPayudaraHasilUsgObservation.getdata()
        }
      }

      let payloadDeteksiDiniKankerPayudaraUsgServiceRequest = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerPayudaraUsgServiceRequest.getdata()
        }
      }

      let payloadDeteksiDiniKankerPayudaraHasilUsgDiagnosticReport = {
        data: {
          ...this.data,
          ...this.deteksiDiniKankerPayudaraHasilUsgDiagnosticReport.getdata()
        }
      }
      
      console.log(await this.skriningPTMService.observationsCreate(payloadDeteksiDiniKankerPayudaraSadanisObservation))
      console.log(await this.skriningPTMService.serviceRequestsCreate(payloadDeteksiDiniKankerPayudaraUsgServiceRequest))
      console.log(await this.skriningPTMService.observationsCreate(payloadDeteksiDiniKankerPayudaraHasilUsgObservation))
      console.log(await this.skriningPTMService.diagnosticReportsCreate(payloadDeteksiDiniKankerPayudaraHasilUsgDiagnosticReport))
    }
  }

  async doSubmitDeteksiDiniDiabetes() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payloadServiceRequest = {
      data: {
        ...this.data,
        ...this.deteksiDiniDiabetesServiceRequest.getdata()
      }
    }

    let payloadSpecimen = {
      data: {
        ...this.data,
        ...this.deteksiDiniDiabetesSpecimen.getdata()
      }
    }

    let payloadObservation = {
      data: {
        ...this.data,
        ...this.deteksiDiniDiabetesObservation.getdata()
      }
    }

    let payloadDiagnosticReport = {
      data: {
        ...this.data,
        ...this.deteksiDiniDiabetesReport.getdata()
      }
    }

    console.log(await this.skriningPTMService.serviceRequestsCreate(payloadServiceRequest))
    console.log(await this.skriningPTMService.specimensCreate(payloadSpecimen))
    console.log(await this.skriningPTMService.observationsCreate(payloadObservation))
    console.log(await this.skriningPTMService.diagnosticReportsCreate(payloadDiagnosticReport))
  }

  async doSubmitDeteksiDiniStroke() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payloadServiceRequest = {
      data: {
        ...this.data,
        ...this.deteksiDiniStrokeServiceRequest.getdata()
      }
    }

    let payloadSpecimen = {
      data: {
        ...this.data,
        ...this.deteksiDiniStrokeSpecimen.getdata()
      }
    }

    let payloadObservation = {
      data: {
        ...this.data,
        ...this.deteksiDiniStrokeObservation.getdata()
      }
    }

    let payloadDiagnosticReport = {
      data: {
        ...this.data,
        ...this.deteksiDiniStrokeReport.getdata()
      }
    }

    console.log(await this.skriningPTMService.serviceRequestsCreate(payloadServiceRequest))
    console.log(await this.skriningPTMService.specimensCreate(payloadSpecimen))
    console.log(await this.skriningPTMService.observationsCreate(payloadObservation))
    console.log(await this.skriningPTMService.diagnosticReportsCreate(payloadDiagnosticReport))
  }

  async doSubmitDeteksiDiniJantung() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.deteksiDiniJantung.getdata()
      }
    }

    console.log(await this.skriningPTMService.observationsCreate(payload))
  }

  async doSubmitDiagnosa() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.diagnosaPtm.getdata()
      }
    }

    console.log(await this.skriningPTMService.conditionsCreate(payload))
  }

  async doSubmitProcedure() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.tindakanPtm.getdata()
      }
    }

    console.log(await this.skriningPTMService.proceduresCreate(payload))
  }

  async doSubmitTindakLanjut() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.tindakLanjutPtm.getdata()
      }
    }

    console.log(await this.skriningPTMService.serviceRequestsCreate(payload))
  }

  async doSubmitKondisiKeluarFaskes() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.kondisiKeluarFaskes.getdata()
      }
    }

    console.log(await this.skriningPTMService.conditionsCreate(payload))
  }

  async doSubmitUpdateDataKunjungan() {
    this.data = {
      rmno: this.notransaksi,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat
    }

    let payload = {
      data: {
        ...this.data,
        ...this.updateKunjungan.getdata()
      }
    }

    console.log(await this.skriningPTMService.encountersUpdate(payload))
  }

  async docreateKunjunganSkriningPTM() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let response: any = await this.skriningPTMService.createKunjunganSkriningPtm({
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
      type: "SKRINING",
      status: "active"
    })

    this.setData(response.data)

    this.stopLoading()
  }

  setData(patient: any) {
    if (patient?.QuestionnaireResponse && patient?.QuestionnaireResponse.length > 0) {
      let questioner = patient?.QuestionnaireResponse[0]?.ptm_question?.item[0]?.item?.map((item) => {
        let answer = item.answer[0]
        if (answer.valueBoolean !== undefined) {
          answer = answer.valueBoolean
        } else if (answer.valueInteger !== undefined) {
          answer = answer.valueInteger
        } else if (answer.valueQuantity && answer.valueQuantity.value !== undefined) {
          answer = answer.valueQuantity.value
        } else if (answer.valueCoding && answer.valueCoding.display !== undefined) {
          answer = answer.valueCoding.display
        } else if (answer.valueReference && answer.valueReference.reference !== undefined) {
          answer = answer.valueReference.reference
        }

        return {
          linkId: item.linkId,
          text: item.text,
          answer
        }
      })

      this.faktorResiko.kodeMeroko = '8392000'
      this.faktorResiko.displayMeroko = 'Non-smoker'
      this.faktorResiko.meroko = questioner[0]?.answer || ''
      this.faktorResiko.jumlahRoko = questioner[1]?.answer || ''
      this.faktorResiko.lamaMeroko = questioner[2]?.answer || ''
      this.faktorResiko.terpaparAsapRoko = questioner[4]?.answer || ''
      this.faktorResiko.gulaMakanan = questioner[5]?.answer || ''
      this.faktorResiko.garamMakanan = questioner[6]?.answer || ''
      this.faktorResiko.minyakMakanan = questioner[7]?.answer || ''
      this.faktorResiko.sayurBuahMakanan = questioner[8]?.answer || ''
      this.faktorResiko.aktivitasFisik = questioner[9]?.answer || ''
      this.faktorResiko.konsumsiAlkohol = questioner[10]?.answer || ''
    }

    let observations: any = patient?.observations?.reduce((acc, item) => {
      acc[item.name] = item.data[0];
      return acc;
    }, {});

    let conditions: any = patient?.conditions?.reduce((acc, item) => {
      acc[item.name] = item.data[0];
      return acc;
    }, {});

    let procedures: any = patient?.procedures?.reduce((acc, item) => {
      acc[item.name] = item.data[0];
      return acc;
    }, {});

    let specimens: any = patient?.specimens?.reduce((acc, item) => {
      acc[item.name] = item.status;
      return acc;
    }, {});

    let serviceRequests: any = patient?.serviceRequests?.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    this.riwayat.ptmSekarang = conditions?.ptm_sekarang || Condition
    this.riwayat.ptmDulu = conditions?.ptm_dulu || Condition
    this.riwayat.ptmKeluarga = conditions?.ptm_keluarga || Condition
    this.diagnosaPtm.diagnosaHipertensi = conditions?.Essential_Hypertension || ''
    this.diagnosaPtm.diagnosaPresbyopia = conditions?.Presbyopia || ''
    this.diagnosaPtm.diagnosaCervix = conditions?.cervix_condition || ''
    this.diagnosaPtm.diagnosaDiabetes = conditions?.Diabetes_mellitus_conditio || ''
    this.diagnosaPtm.diagnosaJantung = conditions?.cardiovascular_disorders_condition || ''
    this.tindakanPtm.code = procedures?.therapeutic_procedure?.code || ''
    this.tindakanPtm.display = procedures?.therapeutic_procedure?.display || ''
    this.deteksiDiniObesitas.tinggiBadan = observations?.body_height?.result?.value || ''
    this.deteksiDiniObesitas.beratBadan = observations?.body_weight?.result?.value || ''
    this.deteksiDiniObesitas.indexMasaTubuh = observations?.bmi?.result?.value || ''
    this.deteksiDiniObesitas.lingkarPinggang = observations?.waist_circumference?.result?.value || ''
    this.deteksiDiniMata.visusKanan = observations?.visus_mata_kanan_observation?.result?.value || ''
    this.deteksiDiniMata.visusKiri = observations?.visus_mata_kiri_observation?.result?.value || ''
    this.deteksiDiniMata.numeratorMataKanan = observations?.visus_mata_kanan_observation?.valueRatio?.numerator?.value || ''
    this.deteksiDiniMata.denominatorMataKanan = observations?.visus_mata_kanan_observation?.valueRatio?.denominator?.value || ''
    this.deteksiDiniMata.numeratorMataKiri = observations?.visus_mata_kiri_observation?.valueRatio?.numerator?.value || ''
    this.deteksiDiniMata.denominatorMataKiri = observations?.visus_mata_kiri_observation?.valueRatio?.denominator?.value || ''
    this.deteksiDiniHipertensi.sistole = observations?.sistolik_observation?.result?.value || ''
    this.deteksiDiniHipertensi.diastole = observations?.diastolik_observation?.result?.value || ''
    this.deteksiDiniPendengaran.leftEar = observations?.kongenital_left_ear?.code || Condition
    this.deteksiDiniPendengaran.rightEar = observations?.kongenital_right_ear?.code || Condition
    this.deteksiDiniObservationPPOK.isSmoking = observations?.ptm_tobacco_smoking_status?.resultBoolean?.toString() || 'false'
    this.deteksiDiniObservationPPOK.smokingStatus = observations?.ptm_tobacco_smoking_status?.valueCodeableConcept || ''
    this.deteksiDiniConditionPPOK.condition = conditions?.stable_condition || Condition
    this.deteksiDiniProcedurePPOK.procedure = procedures?.ptm_spirometry_procedure || Procedure
    this.deteksiDiniDiabetesServiceRequest.patientInstruction = serviceRequests?.glucose_service_request?.patientInstruction || ''
    this.deteksiDiniDiabetesSpecimen.status = specimens?.blood_specimen_diabetes || ''
    this.deteksiDiniStrokeServiceRequest.patientInstruction = serviceRequests?.cholesterol_service_request?.patientInstruction || ''
    this.deteksiDiniStrokeSpecimen.status = specimens?.blood_specimen_stroke || ''
    this.tindakLanjutPtm.patientInstruction = serviceRequests?.control_routine?.patientInstruction || ''
    this.tindakLanjutPtm.conditionCode = serviceRequests?.control_routine?.reason[0]?.code || ''
    this.tindakLanjutPtm.conditionDisplay = serviceRequests?.control_routine?.reason[0]?.display || ''
    this.kondisiKeluarFaskes.conditionCode = conditions?.end_condition?.code || ''
    this.kondisiKeluarFaskes.conditionDisplay = conditions?.end_condition?.display || ''

    this.deteksiDiniKankerServicObservation.result = observations?.inspection_of_vagina_observation?.valueCodeableConcept?.display
    this.deteksiDiniKankerServicProcedure.code = procedures?.Inspection_of_vagina?.code
    this.deteksiDiniKankerServicProcedure.display = procedures?.Inspection_of_vagina?.display

    this.deteksiDiniKankerServicIvaObservation.result = observations?.IVA_observation?.valueCodeableConcept?.display
    this.deteksiDiniKankerServicIvaProcedure.code = procedures?.acid_reaction_procedure?.code
    this.deteksiDiniKankerServicIvaProcedure.display = procedures?.acid_reaction_procedure?.display

    this.deteksiDiniJantung.result = observations?.EKG?.valueCodeableConcept?.display
  }

  findBylinkId(data: any, displayValue: any) {
    return data.find(item => item.linkId === displayValue).answer
  }

  findByName(data: any, displayValue: any) {
    return data.find(item => item.name === displayValue) || {}
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
