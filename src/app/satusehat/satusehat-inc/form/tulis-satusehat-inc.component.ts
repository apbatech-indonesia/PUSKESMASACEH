import { HttpHeaders } from "@angular/common/http";
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import Swal from "sweetalert2";
import { ApiserviceService } from "../../../apiservice.service";
import { ActivatedRoute } from "@angular/router";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { IncService } from "../services/satusehat-inc.service";
import { DataRiwayat } from "../data/data-riwayat";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-tulis-satusehat-inc",
  templateUrl: "./tulis-satusehat-inc.component.html",
  styleUrls: ["./tulis-satusehat-inc.component.sass"],
})
export class TulisSatuSehatIncComponent implements OnInit {
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

  listObservasiKehamilan: any;
  listKategoriObservasi: any;
  listKategoriCondition: any;
  selectedCondition: any;
  listKategoriProcedure: any;
  listKategoriServiceRequest: any;
  listTipeSpecimen: any;
  listCategoryDiagnosaLab: any;
  listServiceRequest: any;
  listSpecimens: any;
  listHistory: any;
  listObservationLab: any;
  listCondtionClinical: any;
  listRequestPemeriksaanLab: any;
  listSpecimenPemeriksaanLab: any;
  listLaporanDiagnosaLab: any;
  listCarePlantCategory: any;
  listConditionPelayananNifas: any;
  listConditionDiagnosis: any;
  listConditionLeaveFasyankes: any;
  listProcedureKonselingNifas: any;
  listProcedureTindakan: any;
  listObservasiPelayananNifas: any;
  listObservasiPelayananNifasPendarahan: any;
  listObservasiPemeriksaanLab: any;
  isDisabledFormInc: boolean = true;
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
    private IncService: IncService,
    private route: ActivatedRoute,
    public riwayat: DataRiwayat,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }


  async CreateKunjunganInc() {
    this.showLoading();
    this.patientData = await this.getPasien();
    this.cabangData = await this.getCabang();
    await this.setIdPasien();

    let response: any = await this.IncService.createKunjunganInc({
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
    await this.CreateKunjunganInc();
    await this.cariHistory();
  }
  // NOTE: TAB
  async openTab(tab: string) {
    this.activeTab = tab;
    switch (tab)
    {
      case "form-related-person":
        break;
      case "form-observasi-kehamilan":
        this.carilistObservasiKehamilan();
        this.carilistKategoriObservasi();
        await this.cariHistory();
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
      case "form-observasi-kehamilan":
        this.doSubmitObservasiKehamilan();
        break;
      default:
        Swal.fire("Error", "Form tidak ditemukan", "error");
        break;
    }
  }

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
        this.isDisabledFormInc = false;
      }
    } else
    {
      this.idpasien = this.patientData.idpasien;
      this.isDisabledFormInc = false;
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
      type: "inc",
      status: "active"
    };

    try
    {
      let response: any = await this.IncService.getUseCaseResponse(payload);
      this.listHistory = response;

      //  Handle tab aktif default value
      switch (this.activeTab)
      {
        case "form-related-person":
          break;
        case "form-observasi-kehamilan":
          this.handleObservasiKehamilan();
          break;
        default:
          break;
      }
    } catch (error)
    {
    }
  }
  async carilistKategoriObservasi() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `observation-category|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listKategoriObservasi = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistObservasiKehamilan() {
    let payload = {
      terminology_id: "",
      key_name: `category|satusehat_category|is_active`,
      key_operator: "=|=|=",
      key_value: `observation|riwayat-kehamilan|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listObservasiKehamilan = [...response.data];
    } catch (error)
    {
    }
  }
  // NOTE: handle data history
  handleObservasiKehamilan() {
    if (!this.listHistory?.data?.observations) return;

    this.listObservasiKehamilan = this.listObservasiKehamilan.map(itemKehamilan => {
      let terminologyName = itemKehamilan.terminology_name.trim().toLowerCase();

      //  Cari SEMUA observasi yang cocok
      let matchedObservations = this.listHistory.data.observations.filter(obs =>
        obs.name.trim().toLowerCase() === terminologyName
      );


      if (matchedObservations.length > 0)
      {
        //  Ambil SEMUA valueInteger yang ada di semua data
        let allValues = matchedObservations.flatMap(obs =>
          (obs.data || []).map(d => d.valueInteger).filter(v => v !== undefined)
        );
        //  Ambil kategori yang cocok
        let matchedCategories = matchedObservations.flatMap(obs => {
          let matchedCat = this.listKategoriObservasi.find(cat =>
            cat.terminology_name.trim().toLowerCase() === obs.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });

        return {
          ...itemKehamilan,
          userInput: allValues.length > 0 ? allValues[0] : null, // Ambil yang pertama kalau ada
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,
        };
      }

      return itemKehamilan;
    });

  }

  // NOTE: partial func
  trackByIndex(index: number, item: any) {
    return index;
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
      let response: any = await this.IncService.getDataSatuanUnit(payload);
      this.listSatuanUnit = [...response.data];
    } catch (error) { }
  }
  toggleInputPermintaanPemeriksaanLab(id: string, categoryServiceRequest: any, terminologyId: string) {
    const itemServiceRequest = this.listRequestPemeriksaanLab.find(item => item.terminology_id === terminologyId);

    if (itemServiceRequest)
    {
      if (!itemServiceRequest.selectedCategory)
      {
        itemServiceRequest.selectedCategory = [];
      }

      const index = itemServiceRequest.selectedCategory.findIndex(item => item.terminology_id === categoryServiceRequest.terminology_id);

      if (index !== -1)
      {
        itemServiceRequest.selectedCategory.splice(index, 1);
      } else
      {
        itemServiceRequest.selectedCategory.push(categoryServiceRequest);
      }
    }
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
      let response: any = await this.IncService.createRelatedPersonInc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitObservasiKehamilan() {
    const itemDataObservasiKehamilan = this.listObservasiKehamilan;
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        observations: itemDataObservasiKehamilan
          .filter(item => item.userInput !== undefined && item.userInput !== null && item.userInput !== "")
          .map(item => {
            return {
              name: item.terminology_name,
              category: {
                system: item.selectedCategory ? item.selectedCategory.system : (item.selectedCategory.source ? item.selectedCategory.source.source_url : ''),
                code: item.selectedCategory ? item.selectedCategory.terminology_code : "observation",
                display: item.selectedCategory ? item.selectedCategory.terminology_name : "Observation"
              },
              data: [
                {
                  code: {
                    system: item.system,
                    code: item.terminology_code,
                    display: item.terminology_name
                  },
                  result: {},
                  resultBoolean: {},
                  valueCodeableConcept: {},
                  valueInteger: item.userInput
                }
              ],
              effectiveDateTime: this.dateNow,
              issued: this.dateNow
            };
          })
      }
    };

    try
    {
      let response: any = await this.IncService.craeteObservationInc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
}
