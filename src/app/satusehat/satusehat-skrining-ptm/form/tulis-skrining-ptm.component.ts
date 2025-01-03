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
    this.doSubmitRiwayat()
    this.doSubmitFaktorResiko()
    this.doSubmitDeteksiDiniObesitas()
    this.doSubmitDeteksiDiniHipertensi()
    this.doSubmitDeteksiDiniMata()
    this.doSubmitDiagnosa()
    this.doSubmitProcedure()

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
    let payload = {
      data: {
        ...this.data,
        ...this.faktorResiko.getdata()
      }
    }

    console.log(await this.skriningPTMService.faktorResiko(payload))
  }

  async doSubmitDeteksiDiniObesitas() {
    let payload = {
      data: {
        ...this.data,
        ...this.deteksiDiniObesitas.getdata()
      }
    }

    console.log(await this.skriningPTMService.deteksiDiniObesitas(payload))
  }

  async doSubmitDeteksiDiniHipertensi() {
    let payload = {
      data: {
        ...this.data,
        ...this.deteksiDiniHipertensi.getdata()
      }
    }

    console.log(await this.skriningPTMService.deteksiDiniHipertensi(payload))
  }
  
  async doSubmitDeteksiDiniMata() {
    let payload = {
      data: {
        ...this.data,
        ...this.deteksiDiniMata.getdata()
      }
    }

    console.log(await this.skriningPTMService.deteksiDiniMata(payload))
  }
  
  async doSubmitDiagnosa() {
    let payload = {
      data: {
        ...this.data,
        ...this.diagnosaPtm.getdata()
      }
    }

    console.log(await this.skriningPTMService.diagnosa(payload))
  }
  
  async doSubmitProcedure() {
    let payload = {
      data: {
        ...this.data,
        ...this.tindakanPtm.getdata()
      }
    }

    console.log(await this.skriningPTMService.procedure(payload))
  }
  
  async doSubmitTindakLanjut() {
    let payload = {
      data: {
        ...this.data,
        ...this.tindakLanjutPtm.getdata()
      }
    }

    console.log(await this.skriningPTMService.tindakLanjut(payload))
  }
  
  async doSubmitKondisiKeluarFaskes() {
    let payload = {
      data: {
        ...this.data,
        ...this.kondisiKeluarFaskes.getdata()
      }
    }

    console.log(await this.skriningPTMService.kondisiKeluar(payload))
  }
  
  async doSubmitUpdateDataKunjungan() {
    let payload = {
      data: {
        ...this.data,
        ...this.updateKunjungan.getdata()
      }
    }

    console.log(await this.skriningPTMService.updateKunjungan(payload))
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
    const riwayat = patient.conditions.reduce((acc, current) => {
      const key = Object.keys(current)[0];
      acc[key] = current[key].condition_item;
      return acc;
    }, {});

    this.riwayat.ptmCode = riwayat.ptm_sekarang.code
    this.riwayat.ptmDisplay = riwayat.ptm_sekarang.display
    this.riwayat.ptmDuluCode = riwayat.ptm_dulu.code
    this.riwayat.ptmDuluDisplay = riwayat.ptm_dulu.display
    this.riwayat.ptmKeluargaCode = riwayat.ptm_keluarga.code
    this.riwayat.ptmKeluargaDisplay = riwayat.ptm_keluarga.display

    let questioner = patient.QuestionnaireResponse[0].ptm_question.item[0].item.map((item) => {
      let answer = item.answer[0];
      if (answer.valueBoolean !== undefined) {
        answer = answer.valueBoolean;
      } else if (answer.valueInteger !== undefined) {
        answer = answer.valueInteger;
      } else if (answer.valueQuantity && answer.valueQuantity.value !== undefined) {
        answer = answer.valueQuantity.value;
      } else if (answer.valueCoding && answer.valueCoding.display !== undefined) {
        answer = answer.valueCoding.display;
      } else if (answer.valueReference && answer.valueReference.reference !== undefined) {
        answer = answer.valueReference.reference;
      }
    
      return {
        linkId: item.linkId,
        text: item.text,
        answer
      };
    });
    
    this.faktorResiko.kodeMeroko = '8392000'
    this.faktorResiko.displayMeroko = 'Non-smoker'
    this.faktorResiko.meroko = questioner[0].answer
    this.faktorResiko.jumlahRoko = questioner[1].answer
    this.faktorResiko.lamaMeroko = questioner[2].answer
    this.faktorResiko.terpaparAsapRoko = questioner[4].answer
    this.faktorResiko.gulaMakanan = questioner[5].answer
    this.faktorResiko.garamMakanan = questioner[6].answer
    this.faktorResiko.minyakMakanan = questioner[7].answer
    this.faktorResiko.sayurBuahMakanan = questioner[8].answer
    this.faktorResiko.aktivitasFisik = questioner[9].answer
    this.faktorResiko.konsumsiAlkohol = questioner[10].answer
  }

  findBylinkId(data: any, displayValue: any) {
    return data.find(item => item.linkId === displayValue).answer;
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
