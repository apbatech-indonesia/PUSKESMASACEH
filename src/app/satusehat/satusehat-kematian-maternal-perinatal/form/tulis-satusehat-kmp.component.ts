import { HttpHeaders } from "@angular/common/http";
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import Swal from "sweetalert2";
import { ApiserviceService } from "../../../apiservice.service";
import { ActivatedRoute } from "@angular/router";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { KmpService } from "../services/satusehat-kmp.service";
import { DataRiwayat } from "../data/data-riwayat";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-tulis-satusehat-kmp",
  templateUrl: "./tulis-satusehat-kmp.component.html",
  styleUrls: ["./tulis-satusehat-kmp.component.sass"],
})
export class TulisSatuSehatKmpComponent implements OnInit {
  activeTab: string = "form-related-person";
  userData: any = JSON.parse(localStorage.getItem("userDatacl")).userData;
  notransaksi: string = this.route.snapshot.paramMap.get("notrans");
  relatedPersonResponse: any;
  encounter_id: string;
  useCaseId: string;
  cabangData: any;
  idpasien: any;
  dateNow = new Date().toISOString();
  faArrowLeft = faArrowLeft;
  faSave = faSave;
  listSatuanUnit: any;
  listHistory: any;

  listObservasiKehamilan: any;
  listObservasiIbuPascaPersalinan: any;
  listKategoriObservasi: any;
  listKategoriProcedure: any;
  listKategoriCondition: any;
  listCondtionClinical: any;
  listObservasiKeadaanBayi: any;
  listObservasiFisikBayi: any;
  listProcedureMenyusui: any;
  listProcedureTindakanIbu: any;
  listProcedureTindakanBayi: any;
  listDiagnosaConditionIbu: any;
  listDiagnosaConditionBayi: any;
  listConditionLeaveFasyankesIbu: any;
  listConditionLeaveFasyankesBayi: any;
  selectedCondition: any;
  isDisabledFormKmp: boolean = true;
  selectedPemeriksaanLab: { [key: string]: string } = {};
  headers = new HttpHeaders({
    "kd-cabang": this.userData.kdcabang,
  });

  data: any;

  patientData: any = {
    noantrian: "-",
    norm: "-",
    pasien: "-",
    umur: "-",
    tgllahir: "-",
    jeniskelamin: "-",
    nampoli: "-",
    costumer: "-",
    namdokter: "-",
    alamat: "-",
  };
  selectedRelatesPerson: string = '';
  relationLabel: string = '';

  // Model untuk data form
  relatedPersonData: any = {
    nama_relasi: '',
    nik_relasi: '',
    tl_relasi: '',
    hp_relasi: '',
    alamat_jalan_relasi: '',
    province_id_relasi: null,
    city_id_relasi: null,
    district_id_relasi: null,
    village_id_relasi: null,
    rt_relasi: '',
    rw_relasi: '',
    postal_code_relasi: '',
  };

  onChangeRelatesPerson() {
    // Reset semua input
    this.relatedPersonData = {
      nama_relasi: '',
      nik_relasi: '',
      tl_relasi: '',
      hp_relasi: '',
      alamat_jalan_relasi: '',
      province_id_relasi: null,
      city_id_relasi: null,
      district_id_relasi: null,
      village_id_relasi: null,
      rt_relasi: '',
      rw_relasi: '',
      postal_code_relasi: '',
    };

    // Update label sesuai pilihan
    this.relationLabel = this.getRelationLabel();

    // Cek apakah listHistory ada data terkait relasi yang dipilih
    if (this.listHistory?.data?.related_person)
    {
      const keyPrefix = this.selectedRelatesPerson; // 'ibu', 'ayah', dll.
      const relatedData = this.listHistory.data.related_person;

      // Cek apakah ada key dengan prefix relasi yang dipilih
      if (relatedData[`nama_${keyPrefix}`])
      {
        this.relatedPersonData = {
          nama_relasi: relatedData[`nama_${keyPrefix}`] || '',
          nik_relasi: relatedData[`nik_${keyPrefix}`] || '',
          tl_relasi: relatedData[`tl_${keyPrefix}`] || '',
          hp_relasi: relatedData[`hp_${keyPrefix}`] || '',
          alamat_jalan_relasi: relatedData[`alamat_jalan_${keyPrefix}`] || '',
          province_id_relasi: relatedData[`province_id_${keyPrefix}`] || null,
          city_id_relasi: relatedData[`city_id_${keyPrefix}`] || null,
          district_id_relasi: relatedData[`district_id_${keyPrefix}`] || null,
          village_id_relasi: relatedData[`village_id_${keyPrefix}`] || null,
          rt_relasi: relatedData[`rt_${keyPrefix}`] || '',
          rw_relasi: relatedData[`rw_${keyPrefix}`] || '',
          postal_code_relasi: relatedData[`postal_code_${keyPrefix}`] || '',
        };
      }
    }
  }

  getRelationLabel() {
    switch (this.selectedRelatesPerson)
    {
      case 'ibu': return 'Ibu';
      case 'ayah': return 'Ayah';
      case 'kakak': return 'Kakak';
      case 'saudara': return 'Saudara';
      default: return '';
    }
  }

  umurPasien = parseInt(this.patientData.umur.split(" ")[0], 10);

  bayiOrNot = this.patientData.umur < 2 ? true : false;

  @Output() selectedItem = new EventEmitter();
  @Output() deletedItem = new EventEmitter();
  @Input() searchKeluhanUtamaText: string;

  formatDateTime(dateTime: string): string {
    if (!dateTime) return "";
    return `${dateTime}:00+00:00`; // Tambah detik dan zona waktu
  }


  constructor(
    private api: ApiserviceService,
    private KmpService: KmpService,
    private route: ActivatedRoute,
    public riwayat: DataRiwayat,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }


  async CreateKunjunganKmp() {
    this.showLoading();
    this.patientData = await this.getPasien();
    this.cabangData = await this.getCabang();
    await this.setIdPasien();

    let response: any = await this.KmpService.createKunjunganKmp({
      data: {
        rmno: this.notransaksi,
        orgId: this.cabangData.kodeorg,
        patientId: this.idpasien,
        patientName: this.patientData.pasien,
        practitionerId: this.patientData.idhis,
        practitionerName: this.patientData.namdokter,
        locationId: this.patientData.locationid,
        satusehatId: this.patientData.idsatusehat,
        locationName: this.cabangData.nama,
      },
    });
    this.useCaseId = response.data.use_case_id;
    this.encounter_id = response.data.encounter_id;
  }


  // NOTE: on page reload
  async ngOnInit() {
    await this.CreateKunjunganKmp();
    await this.cariHistory();
  }
  // NOTE: TAB
  async openTab(tab: string) {
    this.activeTab = tab;
    switch (tab)
    {
      case "form-related-person":
        break;

      default:
        break;
    }
  }

  private _activeTab: string = "form-related-person";

  showLoading() {
    Swal.fire("Mohon tunggu!");
    Swal.showLoading();
    this.stopLoading(3000);
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => {
      Swal.close();
    }, timing);
  }

  // NOTE: Trigger simpan semua form
  simpan() {
    this.showLoading();
    switch (this.activeTab)
    {
      case "form-related-person":
        this.doSubmitRelatedPerson();
        break;
      default:
        Swal.fire("Error", "Form tidak ditemukan", "error");
        break;
    }
  }
  // NOTE: Get Master Data
  async setIdPasien() {
    if (!this.patientData.idpasien)
    {
      let idpasien = await this.getPasienSatuSehat();
      if (!idpasien)
      {
        Swal.fire("Data Pasien Tidak ditemukan di SatuSehat");
      } else
      {
        this.idpasien = idpasien;
        this.isDisabledFormKmp = false;
      }
    } else
    {
      this.idpasien = this.patientData.idpasien;
      this.isDisabledFormKmp = false;
    }

    return this.idpasien;
  }
  getPasien() {
    return new Promise((resolve) => {
      this.api.datapasien(this.userData.kdcabang, this.notransaksi).subscribe((data) => {
        data.forEach((e) => {
          resolve(e);
        });
      });
    });
  }

  getPasienSatuSehat() {
    return new Promise((resolve) => {
      this.api.getpasien(this.patientData.nopengenal, this.headers).subscribe((data) => {
        if (data.entry.length !== 0)
        {
          resolve(data.entry[0].resource.id);
        }
      });
    });
  }

  getCabang() {
    return new Promise((resolve) => {
      this.api.cabangper(this.userData.kdklinik).subscribe((data) => {
        data.forEach((e) => {
          resolve(e);
        });
      });
    });
  }

  isCategorySelected(itemServiceRequest: any, categoryServiceRequest: any): boolean {
    return itemServiceRequest.selectedCategories?.some(cat => cat.terminology_id === categoryServiceRequest.terminology_id) ?? false;
  }

  async cariHistory() {
    let payload = {
      usecase_id: this.useCaseId,
      patientId: this.idpasien,
      type: "kmp",
      status: "active"
    };

    try
    {
      let response: any = await this.KmpService.getUseCaseResponse(payload);
      this.listHistory = response;

      //  Handle tab aktif default value
      switch (this.activeTab)
      {
        case "form-related-person":
          break;
        default:
          break;
      }
    } catch (error)
    {
    }
  }


  // NOTE: handle data history


  // NOTE: partial func
  trackByIndex(index: number, item: any) {
    return index;
  }

  // Tambahin util buat convert waktu
  toDatetimeLocalFormat(datetime: string): string {
    const date = new Date(datetime);
    return date.toISOString().slice(0, 16);
  }


  async getSatuanUnit() {
    let payload = {
      unit_code: "",
      key_name: "unit_name",
      key_operator: "like",
      key_value: "",
      max_row: 50,
      order_by: "unit_code",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.KmpService.getDataSatuanUnit(payload);
      this.listSatuanUnit = [...response.data];
    } catch (error) { }
  }

  removeNullValues(obj: Object) {
    if (typeof obj !== "object" || obj === null) return obj; // Jika bukan object, kembalikan nilai asli

    for (const key in obj)
    {
      if (obj[key] === null)
      {
        delete obj[key];
      } else if (typeof obj[key] === "object")
      {
        obj[key] = this.removeNullValues(obj[key]); // Rekursif untuk objek bersarang
      }
    }

    return obj;
  }

  // NOTE: send func
  async doSubmitRelatedPerson() {
    if (!this.selectedRelatesPerson)
    {
      Swal.fire("Error", "Jenis Relasi Perlu dipilih", "error");
      return;
    }

    const relationPrefix = this.selectedRelatesPerson;
    let existingData = this.listHistory?.data?.related_person || {}; // Ambil data lama kalau ada

    // Buat objek baru yang hanya berisi data dengan prefix yang dipilih
    const newRelatedPersonData = {
      [`nama_${relationPrefix}`]: this.relatedPersonData.nama_relasi,
      [`nik_${relationPrefix}`]: this.relatedPersonData.nik_relasi,
      [`tl_${relationPrefix}`]: this.relatedPersonData.tl_relasi,
      [`hp_${relationPrefix}`]: this.relatedPersonData.hp_relasi,
      [`alamat_jalan_${relationPrefix}`]: this.relatedPersonData.alamat_jalan_relasi,
      [`postal_code_${relationPrefix}`]: this.relatedPersonData.postal_code_relasi,
      [`province_id_${relationPrefix}`]: this.relatedPersonData.province_id_relasi,
      [`city_id_${relationPrefix}`]: this.relatedPersonData.city_id_relasi,
      [`district_id_${relationPrefix}`]: this.relatedPersonData.district_id_relasi,
      [`village_id_${relationPrefix}`]: this.relatedPersonData.village_id_relasi,
      [`rt_${relationPrefix}`]: this.relatedPersonData.rt_relasi,
      [`rw_${relationPrefix}`]: this.relatedPersonData.rw_relasi,
    };

    // Hapus semua data lama dengan prefix yang sama
    Object.keys(existingData).forEach(key => {
      if (key.startsWith(`${relationPrefix}_`))
      {
        delete existingData[key];
      }
    });

    // Gabungkan data lama dengan data baru
    const updatedRelatedPerson = { ...existingData, ...newRelatedPersonData };

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        related_person: updatedRelatedPerson,
      },
    };

    try
    {
      let response: any = await this.KmpService.createRelatedPersonKmp(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
}
