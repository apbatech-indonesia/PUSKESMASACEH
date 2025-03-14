import { HttpHeaders } from "@angular/common/http";
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import Swal from "sweetalert2";
import { ApiserviceService } from "../../../apiservice.service";
import { ActivatedRoute } from "@angular/router";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { PncService } from "../services/satusehat-pnc.service";
import { DataRiwayat } from "../data/data-riwayat";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-tulis-satusehat-pnc",
  templateUrl: "./tulis-satusehat-pnc.component.html",
  styleUrls: ["./tulis-satusehat-pnc.component.sass"],
})
export class TulisSatuSehatPncComponent implements OnInit {
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

  listObservasiPersalinan: any;
  listKategoriObservasi: any;
  isDisabledFormPnc: boolean = true;
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
    private PncService: PncService,
    private route: ActivatedRoute,
    public riwayat: DataRiwayat,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }


  async fiCreateKunjunganPnc() {
    this.showLoading();
    this.patientData = await this.getPasien();
    this.cabangData = await this.getCabang();
    await this.setIdPasien();

    let response: any = await this.PncService.createKunjunganPnc({
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
  ngOnInit() {
    this.fiCreateKunjunganPnc()
  }
  // NOTE: NOW TODO
  openTab(tab: string) {
    this.activeTab = tab;
    switch (tab)
    {
      case "form-related-person":
        break;
      case "observasi-data-persalinan":
        this.carilistObservasiPersalinan();
        this.carilistKategoriObservasi();
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
      case "observasi-data-persalinan":
        this.doSubmitObservasiPataPersalinan();
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
        this.isDisabledFormPnc = false;
      }
    } else
    {
      this.idpasien = this.patientData.idpasien;
      this.isDisabledFormPnc = false;
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
  async carilistObservasiPersalinan() {
    let payload = {
      terminology_id: "",
      key_name: `category|satusehat_category|is_active|source_id`,
      key_operator: "=|=|=|=",
      key_value: `observation|riwayat-kehamilan|1|3`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listObservasiPersalinan = [...response.data];
    } catch (error)
    {
      console.error("Error fetching data:", error);
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
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listKategoriObservasi = [...response.data];
    } catch (error)
    {
      console.error("Error fetching data:", error);
    }
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
      let listSatuanUnitGet: any = await this.PncService.getDataSatuanUnit(payload);
      this.listSatuanUnit = [...listSatuanUnitGet.data];
    } catch (error) { }
  }
  removeNullValues(obj: Object) {
    if (typeof obj !== "object" || obj === null) return obj; // Jika bukan object, kembalikan nilai asli

    // Iterasi pada setiap properti
    for (const key in obj)
    {
      if (obj[key] === null)
      {
        delete obj[key]; // Hapus properti jika nilainya null
      } else if (typeof obj[key] === "object")
      {
        obj[key] = this.removeNullValues(obj[key]); // Rekursif untuk objek bersarang
      }
    }

    return obj;
  }

  async doSubmitRelatedPerson() {
    // Pastikan selectedRelatesPerson valid
    if (!this.selectedRelatesPerson)
    {
      Swal.fire("Error", "Jenis Relasi Perlu di pilih", "error");
      return;
    }
    console.log(this.relatedPersonData);
    const relationPrefix = this.selectedRelatesPerson;

    // Bentuk payload
    const related_person = {
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
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        related_person: related_person,
      },
    };
    try
    {
      let response: any = await this.PncService.craeteRelatedPersonPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }

  async doSubmitObservasiPataPersalinan() {
    const itemDataObservasiPersalinan = this.listObservasiPersalinan;
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        observations: itemDataObservasiPersalinan
          .filter(item => item.userInput !== undefined && item.userInput !== null && item.userInput !== "") // Hanya ambil item yang punya userInput
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
      let response: any = await this.PncService.craeteObservationPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }



}
