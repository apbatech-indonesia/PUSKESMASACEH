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
  isDisabledFormPnc: boolean = true;
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
  async ngOnInit() {
    await this.fiCreateKunjunganPnc();
    await this.cariHistory();

  }
  // NOTE: TAB
  async openTab(tab: string) {
    this.activeTab = tab;
    switch (tab)
    {
      case "form-related-person":
        await this.cariHistory();
        break;
      case "observasi-data-persalinan":
        this.carilistObservasiPersalinan();
        this.carilistKategoriObservasi();
        await this.cariHistory();
        break;
      case "observasi-pelayanan-nifas":
        this.carilistObservasiPelayananNifas();
        this.carilistKategoriObservasi();
        this.getSatuanUnit();
        await this.cariHistory();
        break;
      case "observasi-pelayanan-nifas-pendarahan":
        this.carilistObservasiPelayananNifasPendarahan();
        this.carilistKategoriObservasi();
        this.getSatuanUnit();
        await this.cariHistory();
        break;
      case "observasi-pemeriksaan-hasil-lab":
        this.carilistObservasiPemeriksaanLab();
        this.carilistKategoriObservasi();
        await this.cariHistory();
        break;
      case "condition-pelayanan-nifas":
        this.carilistConditionPelayananNifas();
        this.carilistKategoriCondition();
        this.carilistClinicalCondition();
        await this.cariHistory();
        break;
      case "diagnosa-condition":
        this.carilistConditionDiagnosis();
        this.carilistKategoriCondition();
        this.carilistClinicalCondition();
        await this.cariHistory();
        break;
      case "condition-leave-fasyankes":
        this.carilistConditionLeaveFasyankes();
        this.carilistKategoriCondition();
        this.carilistClinicalCondition();
        await this.cariHistory();
        break;
      case "procedure-konseling-pelayanan-nifas":
        this.carilistProcedureKonselingNifas();
        this.carilistKategoriProcedure();
        await this.cariHistory();
        break;
      case "procedure-tindakan":
        this.carilistProcedureTindakan();
        this.carilistKategoriProcedure();
        await this.cariHistory();
        break;
      case "request-pemeriksaan-hasil-lab":
        this.carilistRequestPemeriksaanLab();
        this.carilistKategoriServiceRequest();
        await this.cariHistory();
        break;
      case "specimen-pemeriksaan-hasil-lab":
        this.carilistSpecimenPemeriksaanLab();
        this.carilistTypeSpeciment();
        this.carilistServiceRequest();
        break;
      case "laporan-diagnosa-lab":
        this.carilistLaporanDiagnosaLab();
        this.carilistCategoryDiagnosaLab();
        this.carilistSpecimen();
        this.carilistObservation();
        break;
      case "rencana-tindak-lanjut":
        this.carilistCategoryCarePlant();
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
      case "observasi-pelayanan-nifas":
        this.doSubmitObservasiPelayananNifas();
        break;
      case "observasi-pelayanan-nifas-pendarahan":
        this.doSubmitObservasiPelayananNifasPendarahan();
        break;
      case "observasi-pemeriksaan-hasil-lab":
        this.doSubmitObservasiPemeriksaanHasilLab();
        break;
      case "condition-pelayanan-nifas":
        this.doSubmitConditionPelayananNifas();
        break;
      case "diagnosa-condition":
        this.doSubmitConditionDiagnosis();
        break;
      case "condition-leave-fasyankes":
        this.doSubmitConditionLeaveFasyankes();
        break;
      case "procedure-konseling-pelayanan-nifas":
        this.doSubmitProcedureKonselingPelayananNifas();
        break;
      case "procedure-tindakan":
        this.doSubmitProcedureTindakan();
        break;
      case "request-pemeriksaan-hasil-lab":
        this.doSubmitPermintaanPemeriksaanLab();
        break;
      case "specimen-pemeriksaan-hasil-lab":
        this.doSubmitSpecimenPemeriksaanLab();
        break;
      case "laporan-diagnosa-lab":
        this.doSubmitLaporanDiagnosaLab();
        break;
      case "rencana-tindak-lanjut":
        this.doSubmitRencanaTindakLanjut();
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
    }
  }
  async carilistObservasiPelayananNifas() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=|=",
      key_value: `tanda-vital|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listObservasiPelayananNifas = [...response.data];

    } catch (error)
    {
    }
  }
  async carilistObservasiPelayananNifasPendarahan() {
    let payloadTemuanKlinis = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=|=",
      key_value: `temuan-klinis|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    let payloadPemeriksaan = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=|=",
      key_value: `pemeriksaan|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let responseTemuanKlinis: any = await this.PncService.getDataTerminologi(payloadTemuanKlinis);
      let responsePemeriksaan: any = await this.PncService.getDataTerminologi(payloadPemeriksaan);
      this.listObservasiPelayananNifasPendarahan = [
        ...responseTemuanKlinis.data,
        ...responsePemeriksaan.data,
      ];
    } catch (error)
    {
    }
  }
  async carilistConditionPelayananNifas() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `observation-result|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };

    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listConditionPelayananNifas = [
        ...response.data,
      ];
    } catch (error)
    {
    }
  }
  async carilistConditionDiagnosis() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=",
      key_value: `kondisi-kehamilan|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };

    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listConditionDiagnosis = [
        ...response.data,
      ];
    } catch (error)
    {
    }
  }
  async carilistConditionLeaveFasyankes() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=",
      key_value: `kondisi-pulang|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };

    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listConditionLeaveFasyankes = [
        ...response.data,
      ];
    } catch (error)
    {
    }
  }
  async carilistProcedureKonselingNifas() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=",
      key_value: `edukasi-kesehatan|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };

    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listProcedureKonselingNifas = [
        ...response.data,
      ];
    } catch (error)
    {
    }
  }
  async carilistProcedureTindakan() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `procedure|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };

    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listProcedureTindakan = [
        ...response.data,
      ];
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
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listKategoriObservasi = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistKategoriCondition() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `condition-category|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listKategoriCondition = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistKategoriProcedure() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `procedure-category|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listKategoriProcedure = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistKategoriServiceRequest() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `service-request|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listKategoriServiceRequest = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistTypeSpeciment() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `specimen-type|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listTipeSpecimen = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistCategoryDiagnosaLab() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `diagnostic-report-category|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listCategoryDiagnosaLab = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistServiceRequest() {
    let payload = {
      usecase_id: this.useCaseId,
      patientId: this.idpasien,
      type: "pnc",
      status: "active"
    };
    try
    {
      let response: any = await this.PncService.getUseCaseResponse(payload);
      this.listServiceRequest = response.service_request_responses;

      if (this.listServiceRequest.length < 1)
      {
        Swal.fire("Error", "Data permintaan pemeriksaan lab tidak ditemukan", "error");
        this.openTab("request-pemeriksaan-hasil-lab");
        return;
      }

    } catch (error)
    {
    }
  }
  async carilistSpecimen() {
    let payload = {
      usecase_id: this.useCaseId,
      patientId: this.idpasien,
      type: "pnc",
      status: "active"
    };
    try
    {
      let response: any = await this.PncService.getUseCaseResponse(payload);

      this.listSpecimens = response.specimen_responses;


      if (this.listSpecimens.length < 1)
      {
        Swal.fire("Error", "Data Specimen belum di isi", "error");
        this.openTab("specimen-pemeriksaan-hasil-lab");
        return;
      }

    } catch (error)
    {
    }
  }

  isCategorySelected(itemServiceRequest: any, categoryServiceRequest: any): boolean {
    return itemServiceRequest.selectedCategories?.some(cat => cat.terminology_id === categoryServiceRequest.terminology_id) ?? false;
  }

  async cariHistory() {
    let payload = {
      usecase_id: this.useCaseId,
      patientId: this.idpasien,
      type: "pnc",
      status: "active"
    };

    try
    {
      let response: any = await this.PncService.getUseCaseResponse(payload);
      this.listHistory = response;
      console.log(this.listHistory);

      // 🔥 Handle tab aktif default value
      switch (this.activeTab)
      {
        case "form-related-person":
          break;
        case "observasi-data-persalinan":
          this.handleObservasiPersalinan();
          break;
        case "observasi-pelayanan-nifas":
          this.handleObservasiPelayananNifas();
          break;
        case "observasi-pelayanan-nifas-pendarahan":
          this.handleObservasiPelayananNifasPendarahan();
          break;
        case "observasi-pemeriksaan-hasil-lab":
          this.handleObservasiPemeriksaanHasilLab();
          break;
        case "condition-pelayanan-nifas":
          this.handleConditionPelayananNifas();
          break;
        case "diagnosa-condition":
          this.handleConditionDiagnosa();
          break;
        case "condition-leave-fasyankes":
          this.handleConditionLeaveFasyankes();
          break;
        case "procedure-konseling-pelayanan-nifas":
          this.handleProcedureKonselingPelayananNifas();
          break;
        case "procedure-tindakan":
          this.handleProcedureTindakan();
          break;
        case "request-pemeriksaan-hasil-lab":
          this.handleRequestPemeriksaanHasilLab();
          break;
        default:
          break;
      }
    } catch (error)
    {
    }
  }
  handleRequestPemeriksaanHasilLab() {
    console.log("🔥 handleRequestPemeriksaanHasilLab() called");

    if (!this.listHistory?.data?.serviceRequests || !Array.isArray(this.listHistory.data.serviceRequests))
    {
      console.warn("⚠️ Data serviceRequests tidak ditemukan atau bukan array!", this.listHistory?.data?.serviceRequests);
      return;
    }

    this.listRequestPemeriksaanLab = this.listRequestPemeriksaanLab.map(itemServiceRequest => {
      let terminologyName = itemServiceRequest.terminology_name.trim().toLowerCase().replace(/\s+/g, " ");

      // 🔥 Cari SEMUA service request yang cocok (bukan cuma satu)
      let matchedServiceRequests = this.listHistory.data.serviceRequests.filter(req => {
        let reqName = req.name.trim().toLowerCase().replace(/\s+/g, " ");
        return reqName === terminologyName;
      });

      if (matchedServiceRequests.length > 0)
      {
        console.log("🎯 Match ditemukan:", matchedServiceRequests);

        let allMatchedCategories: any[] = [];

        matchedServiceRequests.forEach(matchedServiceRequest => {
          console.log("🔎 Struktur kategori pada matchedServiceRequest:", matchedServiceRequest.category);

          if (!matchedServiceRequest.category || !Array.isArray(matchedServiceRequest.category))
          {
            console.warn(`⚠️ matchedServiceRequest.category undefined atau bukan array untuk ${matchedServiceRequest.name}`, matchedServiceRequest.category);
          }

          let matchedCategories = (matchedServiceRequest.category || []).flatMap(cat => {
            let categoryText = cat.text?.trim().toLowerCase().replace(/\s+/g, " ");

            if (!categoryText && cat.coding)
            {
              categoryText = cat.coding[0]?.display?.trim().toLowerCase().replace(/\s+/g, " ");
            }

            console.log(`   🏷️ Checking kategori: ${categoryText}`);

            return this.listKategoriServiceRequest.find(kat =>
              kat.terminology_name.trim().toLowerCase().replace(/\s+/g, " ") === categoryText
            ) || [];
          }).filter(cat => cat !== undefined);

          console.log("✅ matchedCategories:", matchedCategories);

          allMatchedCategories.push(...matchedCategories);
        });

        // 🔥 Pastikan kategori tidak duplikat
        allMatchedCategories = [...new Map(allMatchedCategories.map(item => [item.terminology_id, item])).values()];

        // 🔥 Set data ke UI dengan deskripsi dari reasonCode[0].text (ambil dari service request pertama)
        let newItem = {
          ...itemServiceRequest,
          identifier: matchedServiceRequests[0].identifier || "N/A", // Kalau gak ada, kasih default "N/A"
          deskripsi: matchedServiceRequests[0].reasonCode?.[0]?.text || "",
          selectedCategories: allMatchedCategories
        };

        console.log("📝 Data yang di-set ke UI:", newItem);
        return newItem;
      }

      console.warn(`⚠️ Tidak ada match ditemukan untuk ${terminologyName}`);
      return itemServiceRequest;
    });

    console.log("✅ Data listRequestPemeriksaanLab setelah mapping:", this.listRequestPemeriksaanLab);
  }







  handleProcedureTindakan() {
    if (!this.listHistory?.data?.procedures || !Array.isArray(this.listHistory.data.procedures))
    {
      return;
    }

    this.listProcedureTindakan = this.listProcedureTindakan.map(itemProcedure => {
      let terminologyName = itemProcedure.terminology_name.trim().toLowerCase().replace(/\s+/g, " ");

      // 🔥 Cari procedure yang cocok berdasarkan name
      let matchedProcedure = this.listHistory.data.procedures.find(proc =>
        proc.name.trim().toLowerCase().replace(/\s+/g, " ") === terminologyName
      );

      if (matchedProcedure)
      {

        // 🔥 Ambil kategori yang cocok
        let matchedCategory = this.listKategoriProcedure.find(cat =>
          cat.terminology_name.trim().toLowerCase().replace(/\s+/g, " ") ===
          matchedProcedure.category?.display?.trim().toLowerCase().replace(/\s+/g, " ")
        );

        // 🔥 Set data ke UI
        let newItem = {
          ...itemProcedure,
          periodeMulai: matchedProcedure.performedPeriod?.start || "",  // Ambil start date
          periodeBerakhir: matchedProcedure.performedPeriod?.end || "", // Ambil end date
          selectedCategory: matchedCategory || undefined                // Cocokkan kategori
        };

        return newItem;
      }
      return itemProcedure;
    });
  }

  handleProcedureKonselingPelayananNifas() {
    if (!this.listHistory?.data?.procedures || !Array.isArray(this.listHistory.data.procedures))
    {
      return;
    }

    this.listProcedureKonselingNifas = this.listProcedureKonselingNifas.map(itemProcedure => {
      let terminologyName = itemProcedure.terminology_name.trim().toLowerCase().replace(/\s+/g, " ");

      // 🔥 Cari procedure yang cocok berdasarkan name
      let matchedProcedure = this.listHistory.data.procedures.find(proc =>
        proc.name.trim().toLowerCase().replace(/\s+/g, " ") === terminologyName
      );

      if (matchedProcedure)
      {

        // 🔥 Ambil kategori yang cocok
        let matchedCategory = this.listKategoriProcedure.find(cat =>
          cat.terminology_name.trim().toLowerCase().replace(/\s+/g, " ") === matchedProcedure.category?.display?.trim().toLowerCase().replace(/\s+/g, " ")
        );

        // 🔥 Set data ke UI
        let newItem = {
          ...itemProcedure,
          periodeMulai: matchedProcedure.performedPeriod?.start || "",  // Ambil start date
          periodeBerakhir: matchedProcedure.performedPeriod?.end || "", // Ambil end date
          selectedCategory: matchedCategory || undefined                // Cocokkan kategori
        };

        return newItem;
      }

      return itemProcedure;
    });
  }
  handleConditionLeaveFasyankes() {
    if (!this.listHistory?.data?.conditions || !Array.isArray(this.listHistory.data.conditions))
    {
      return;
    }

    // 🔥 Cari kondisi yang mengandung "Patient's condition"
    let matchedCondition = this.listHistory.data.conditions.find(cond =>
      cond.name.trim().toLowerCase().includes("patient?s condition") // Bisa juga pakai regex kalau perlu
    );

    if (matchedCondition)
    {

      // 🔥 Ambil SEMUA notes dari matchedCondition
      let allNotes = (matchedCondition.note || []).map(n => n.text).filter(v => v !== undefined);

      // 🔥 Ambil kategori yang cocok
      let matchedCategory = this.listKategoriCondition.find(cat =>
        cat.terminology_name.trim().toLowerCase() === matchedCondition.category?.display?.trim().toLowerCase()
      );

      // 🔥 Ambil kondisi klinis yang cocok
      let matchedClinicalStatus = this.listCondtionClinical.find(status =>
        status.terminology_name.trim().toLowerCase() === matchedCondition.clinicalStatus?.display?.trim().toLowerCase()
      );

      // 🔥 Setel `selectedCondition` sesuai hasil pencarian
      this.selectedCondition = this.listConditionLeaveFasyankes.find(item =>
        item.terminology_name.trim().toLowerCase() === matchedCondition.name.trim().toLowerCase()
      ) || undefined;

      if (this.selectedCondition)
      {
        this.selectedCondition.inputString = allNotes.length > 0 ? allNotes.join(", ") : "";
        this.selectedCondition.selectedCategory = matchedCategory || undefined;
        this.selectedCondition.clinicalStatus = matchedClinicalStatus || undefined;
      }
    } else
    {
      this.selectedCondition = undefined;
    }
  }

  handleConditionDiagnosa() {
    if (!this.listHistory?.data?.conditions || !Array.isArray(this.listHistory.data.conditions))
    {
      return;
    }
    this.listConditionDiagnosis = this.listConditionDiagnosis.map(itemConditionDiagnosis => {
      let terminologyName = itemConditionDiagnosis.terminology_name.trim().toLowerCase();
      // 🔥 Cari SEMUA kondisi yang cocok
      let matchedConditions = this.listHistory.data.conditions.filter(cond =>
        cond.name.trim().toLowerCase() === terminologyName
      );
      if (matchedConditions.length > 0)
      {
        // 🔥 Ambil SEMUA notes dari matchedConditions
        let allNotes = matchedConditions.flatMap(cond =>
          (cond.note || []).map(n => n.text).filter(v => v !== undefined)
        );
        // 🔥 Ambil kategori yang cocok
        let matchedCategories = matchedConditions.flatMap(cond => {
          let matchedCat = this.listKategoriCondition.find(cat =>
            cat.terminology_name.trim().toLowerCase() === cond.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });
        // 🔥 Ambil kondisi klinis yang cocok
        let matchedClinicalStatuses = matchedConditions.flatMap(cond => {
          let matchedStatus = this.listCondtionClinical.find(status =>
            status.terminology_name.trim().toLowerCase() === cond.clinicalStatus?.display?.trim().toLowerCase()
          );
          return matchedStatus ? [matchedStatus] : [];
        });
        let newItem = {
          ...itemConditionDiagnosis,
          inputString: allNotes.length > 0 ? allNotes.join(", ") : "", // 🔥 Gabung semua notes jadi satu string
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,
          clinicalStatus: matchedClinicalStatuses.length > 0 ? matchedClinicalStatuses[0] : undefined
        };
        return newItem;
      }

      return itemConditionDiagnosis;
    });
  }
  handleConditionPelayananNifas() {
    if (!this.listHistory?.data?.conditions || !Array.isArray(this.listHistory.data.conditions)) return;

    this.listConditionPelayananNifas = this.listConditionPelayananNifas.map(itemConditionPelayananNifas => {
      let terminologyName = itemConditionPelayananNifas.terminology_name.trim().toLowerCase();

      // 🔥 Cari SEMUA kondisi yang cocok
      let matchedConditions = this.listHistory.data.conditions.filter(cond =>
        cond.name.trim().toLowerCase() === terminologyName
      );

      if (matchedConditions.length > 0)
      {
        // 🔥 Ambil SEMUA notes dari matchedConditions
        let allNotes = matchedConditions.flatMap(cond =>
          (cond.note || []).map(n => n.text).filter(v => v !== undefined)
        );

        // 🔥 Ambil kategori yang cocok
        let matchedCategories = matchedConditions.flatMap(cond => {
          let matchedCat = this.listKategoriCondition.find(cat =>
            cat.terminology_name.trim().toLowerCase() === cond.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });

        // 🔥 Ambil kondisi klinis yang cocok
        let matchedClinicalStatuses = matchedConditions.flatMap(cond => {
          let matchedStatus = this.listCondtionClinical.find(status =>
            status.terminology_name.trim().toLowerCase() === cond.clinicalStatus?.display?.trim().toLowerCase()
          );
          return matchedStatus ? [matchedStatus] : [];
        });

        return {
          ...itemConditionPelayananNifas,
          inputString: allNotes.length > 0 ? allNotes.join(", ") : "", // 🔥 Gabung semua notes jadi satu string
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,
          clinicalStatus: matchedClinicalStatuses.length > 0 ? matchedClinicalStatuses[0] : undefined
        };
      }

      return itemConditionPelayananNifas;
    });
  }
  handleObservasiPemeriksaanHasilLab() {
    if (!this.listHistory?.data?.observations) return;

    this.listObservasiPemeriksaanLab = this.listObservasiPemeriksaanLab.map(itemPemeriksaanLab => {
      let terminologyName = itemPemeriksaanLab.terminology_name.trim().toLowerCase();

      // 🔥 Cari observasi yang cocok berdasarkan terminology_name
      let matchedObservations = this.listHistory.data.observations.filter(obs =>
        obs.name.trim().toLowerCase() === terminologyName
      );

      if (matchedObservations.length > 0)
      {
        // 🔥 Ambil kategori yang cocok
        let matchedCategories = matchedObservations.flatMap(obs => {
          let matchedCat = this.listKategoriObservasi.find(cat =>
            cat.terminology_name.trim().toLowerCase() === obs.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });

        return {
          ...itemPemeriksaanLab,
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,
        };
      }

      return itemPemeriksaanLab;
    });
  }
  handleObservasiPelayananNifasPendarahan() {
    if (!this.listHistory?.data?.observations) return;

    this.listObservasiPelayananNifasPendarahan = this.listObservasiPelayananNifasPendarahan.map(itemPelayananNifasPendarahan => {
      let terminologyName = itemPelayananNifasPendarahan.terminology_name.trim().toLowerCase();

      // 🔥 Cari SEMUA observasi yang cocok
      let matchedObservations = this.listHistory.data.observations.filter(obs =>
        obs.name.trim().toLowerCase() === terminologyName
      );

      if (matchedObservations.length > 0)
      {
        // 🔥 Ambil SEMUA value dari result.value
        let allValues = matchedObservations.flatMap(obs =>
          (obs.data || []).map(d => d.result?.value).filter(v => v !== undefined)
        );

        // 🔥 Ambil unit dari result.unit
        let matchedUnits = matchedObservations.flatMap(obs =>
          (obs.data || []).map(d => d.result?.unit).filter(v => v !== undefined)
        );

        // 🔥 Ambil kategori yang cocok
        let matchedCategories = matchedObservations.flatMap(obs => {
          let matchedCat = this.listKategoriObservasi.find(cat =>
            cat.terminology_name.trim().toLowerCase() === obs.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });

        // 🔥 Ambil keterangan dari notes / description
        let matchedDescriptions = matchedObservations.flatMap(obs =>
          (obs.data || []).map(d => d.result?.notes || obs.description).filter(v => v !== undefined)
        );

        // 🔥 Cocokin unit dengan `listSatuanUnit`
        let selectedUnit = this.listSatuanUnit.find(unit =>
          unit.unit_code?.trim().toLowerCase() === matchedUnits[0]?.trim().toLowerCase()
        );

        return {
          ...itemPelayananNifasPendarahan,
          userInput: allValues.length > 0 ? allValues[0] : null, // Ambil yang pertama kalau ada
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,
          unit: selectedUnit ? selectedUnit.unit_code : undefined,
          inputString: matchedDescriptions.length > 0 ? matchedDescriptions[0] : ""
        };
      }

      return itemPelayananNifasPendarahan;
    });
  }
  handleObservasiPelayananNifas() {
    if (!this.listHistory?.data?.observations) return;

    this.listObservasiPelayananNifas = this.listObservasiPelayananNifas.map(itemPelayananNifas => {
      let terminologyName = itemPelayananNifas.terminology_name.trim().toLowerCase();

      // 🔥 Cari SEMUA observasi yang cocok
      let matchedObservations = this.listHistory.data.observations.filter(obs =>
        obs.name.trim().toLowerCase() === terminologyName
      );

      if (matchedObservations.length > 0)
      {
        // 🔥 Ambil SEMUA value dari result.value
        let allValues = matchedObservations.flatMap(obs =>
          (obs.data || []).map(d => d.result?.value).filter(v => v !== undefined)
        );

        // 🔥 Ambil unit dari result.unit
        let matchedUnits = matchedObservations.flatMap(obs =>
          (obs.data || []).map(d => d.result?.unit).filter(v => v !== undefined)
        );

        // 🔥 Ambil kategori yang cocok
        let matchedCategories = matchedObservations.flatMap(obs => {
          let matchedCat = this.listKategoriObservasi.find(cat =>
            cat.terminology_name.trim().toLowerCase() === obs.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });

        // 🔥 Cocokin unit dengan `listSatuanUnit`
        let selectedUnit = this.listSatuanUnit.find(unit =>
          unit.unit_code?.trim().toLowerCase() === matchedUnits[0]?.trim().toLowerCase()
        );

        return {
          ...itemPelayananNifas,
          userInput: allValues.length > 0 ? allValues[0] : null, // Ambil yang pertama kalau ada
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,
          unit: selectedUnit ? selectedUnit.unit_code : undefined
        };
      }

      return itemPelayananNifas;
    });
  }
  handleObservasiPersalinan() {
    if (!this.listHistory?.data?.observations) return;

    this.listObservasiPersalinan = this.listObservasiPersalinan.map(itemPersalinan => {
      let terminologyName = itemPersalinan.terminology_name.trim().toLowerCase();

      // 🔥 Cari SEMUA observasi yang cocok
      let matchedObservations = this.listHistory.data.observations.filter(obs =>
        obs.name.trim().toLowerCase() === terminologyName
      );


      if (matchedObservations.length > 0)
      {
        // 🔥 Ambil SEMUA valueInteger yang ada di semua data
        let allValues = matchedObservations.flatMap(obs =>
          (obs.data || []).map(d => d.valueInteger).filter(v => v !== undefined)
        );


        // 🔥 Ambil kategori yang cocok
        let matchedCategories = matchedObservations.flatMap(obs => {
          let matchedCat = this.listKategoriObservasi.find(cat =>
            cat.terminology_name.trim().toLowerCase() === obs.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });

        return {
          ...itemPersalinan,
          userInput: allValues.length > 0 ? allValues[0] : null, // Ambil yang pertama kalau ada
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,

        };
      }

      return itemPersalinan;
    });

  }
  async carilistObservation() {
    let payload = {
      usecase_id: this.useCaseId,
      patientId: this.idpasien,
      type: "pnc",
      status: "active"
    };
    try
    {
      let response: any = await this.PncService.getUseCaseResponse(payload);
      this.listObservationLab = response.observation_responses;
      if (this.listObservationLab.length < 1)
      {
        Swal.fire("Error", "Data Observasi belum di isi", "error");
        this.openTab("observasi-pemeriksaan-hasil-lab");
        return;
      }

    } catch (error)
    {
    }
  }
  async carilistClinicalCondition() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `condition-clinical|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listCondtionClinical = [...response.data];

    } catch (error)
    {
    }
  }
  async carilistRequestPemeriksaanLab() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=",
      key_value: `temuan-klinis|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listRequestPemeriksaanLab = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistSpecimenPemeriksaanLab() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `specimen-collection|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listSpecimenPemeriksaanLab = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistLaporanDiagnosaLab() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=",
      key_value: `temuan-klinis|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listLaporanDiagnosaLab = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistCategoryCarePlant() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "=|=",
      key_value: `careplan-category|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.PncService.getDataTerminologi(payload);
      this.listCarePlantCategory = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistObservasiPemeriksaanLab() {
    let payloadTemuanKlinis = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=|=",
      key_value: `temuan-klinis|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    let payloadObsRes = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=|=",
      key_value: `observation-result|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let responseTemuanKlinis: any = await this.PncService.getDataTerminologi(payloadTemuanKlinis);
      let responsePemeriksaan: any = await this.PncService.getDataTerminologi(payloadObsRes);
      this.listObservasiPemeriksaanLab = [
        ...responseTemuanKlinis.data,
        ...responsePemeriksaan.data,
      ];
    } catch (error)
    {
    }
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
      let response: any = await this.PncService.getDataSatuanUnit(payload);
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
      let response: any = await this.PncService.craeteObservationPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitObservasiPelayananNifas() {
    const dataPelayanan = this.listObservasiPelayananNifas;

    const systolicItem = dataPelayanan.find(item =>
      item.userInput && item.terminology_name.toLowerCase().includes("systolic")
    );
    const diastolicItem = dataPelayanan.find(item =>
      item.userInput && item.terminology_name.toLowerCase().includes("diastolic")
    );

    if ((systolicItem && !diastolicItem) || (diastolicItem && !systolicItem))
    {
      Swal.fire("Error", "Jika mengisi Systolic, maka Diastolic juga wajib diisi (dan sebaliknya).", 'error');
      return;
    }


    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        observations: dataPelayanan
          .filter(item => item.userInput !== undefined && item.userInput !== null && item.userInput !== "") // Hanya ambil item yang punya userInput
          .map(item => {
            return {
              name: item.terminology_name,
              category: {
                system: item.selectedCategory ? item.selectedCategory.system :
                  (item.selectedCategory.source ? item.selectedCategory.source.source_url : ''),
                code: item.selectedCategory ? item.selectedCategory.terminology_code : "observation",
                display: item.selectedCategory ? item.selectedCategory.terminology_name : "Observation"
              },
              data: [
                {
                  code: {
                    system: item.source ? item.source.source_url : "http://loinc.org",
                    code: item.terminology_code,
                    display: item.terminology_name
                  },
                  result: {
                    value: item.userInput,
                    unit: item.unit,
                    system: "http://unitsofmeasure.org",
                    code: item.unit
                  },
                  resultBoolean: {},
                  valueCodeableConcept: {
                    system: "http://snomed.info/sct",
                    code: "102514002",
                    display: "Well female adult"
                  }
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
  async doSubmitObservasiPelayananNifasPendarahan() {
    const dataPelayananPendarahan = this.listObservasiPelayananNifasPendarahan;
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        observations: dataPelayananPendarahan
          .filter(item => item.userInput !== undefined && item.userInput !== null && item.userInput !== "")
          .map(item => {
            return {
              name: item.terminology_name,
              category: {
                system: item.selectedCategory ? item.selectedCategory.system :
                  (item.selectedCategory.source ? item.selectedCategory.source.source_url : ''),
                code: item.selectedCategory ? item.selectedCategory.terminology_code : "observation",
                display: item.selectedCategory ? item.selectedCategory.terminology_name : "Observation"
              },
              data: [
                {
                  code: {
                    system: item.system ? item.system : (item.source ? item.source.source_url : ""),
                    code: item.terminology_code,
                    display: item.terminology_name
                  },
                  result: {
                    value: item.userInput,
                    unit: item.unit,
                    system: "http://unitsofmeasure.org",
                    code: item.unit
                  },
                  resultBoolean: {},
                  valueCodeableConcept: {},
                  valueInteger: item.userInput,
                  valueString: item.inputString
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
  async doSubmitConditionPelayananNifas() {
    const dataConditionPelayananNifas = this.listConditionPelayananNifas;

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        conditions: dataConditionPelayananNifas
          .filter(item => item.inputString !== undefined && item.inputString !== null && item.inputString !== "")
          .map(item => {
            return {
              name: item.terminology_name,
              category: {
                system: item.selectedCategory ? item.selectedCategory.system :
                  (item.selectedCategory.source ? item.selectedCategory.source.source_url : ''),
                code: item.selectedCategory ? item.selectedCategory.terminology_code : "observation",
                display: item.selectedCategory ? item.selectedCategory.terminology_name : "Observation"
              },
              clinicalStatus: {
                system: item.clinicalStatus ? item.clinicalStatus.system :
                  (item.clinicalStatus.source ? item.clinicalStatus.source.source_url : ''),
                code: item.clinicalStatus ? item.clinicalStatus.terminology_code : "observation",
                display: item.clinicalStatus ? item.clinicalStatus.terminology_name : "Observation"
              },
              data: [
                {
                  system: item.system ? item.system : (item.source ? item.source.source_url : ""),
                  code: item.terminology_code,
                  display: item.terminology_name
                }
              ],
              note: [
                {
                  text: item.inputString
                }
              ],
              recordedDate: this.dateNow
            };
          })
      }
    };
    try
    {
      let response: any = await this.PncService.craeteConditionPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitConditionDiagnosis() {
    const dataConditionDiagnosis = this.listConditionDiagnosis;

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        conditions: dataConditionDiagnosis
          .filter(item => item.inputString !== undefined && item.inputString !== null && item.inputString !== "")
          .map(item => {
            return {
              name: item.terminology_name,
              category: {
                system: item.selectedCategory ? item.selectedCategory.system :
                  (item.selectedCategory.source ? item.selectedCategory.source.source_url : ''),
                code: item.selectedCategory ? item.selectedCategory.terminology_code : "observation",
                display: item.selectedCategory ? item.selectedCategory.terminology_name : "Observation"
              },
              clinicalStatus: {
                system: item.clinicalStatus ? item.clinicalStatus.system :
                  (item.clinicalStatus.source ? item.clinicalStatus.source.source_url : ''),
                code: item.clinicalStatus ? item.clinicalStatus.terminology_code : "observation",
                display: item.clinicalStatus ? item.clinicalStatus.terminology_name : "Observation"
              },
              data: [
                {
                  system: item.system ? item.system : (item.source ? item.source.source_url : ""),
                  code: item.terminology_code,
                  display: item.terminology_name
                }
              ],
              note: [
                {
                  text: item.inputString
                }
              ],
              recordedDate: this.dateNow
            };
          })
      }
    };
    try
    {
      let response: any = await this.PncService.craeteConditionPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitConditionLeaveFasyankes() {
    const dataConditionLeaveFasyankes = this.listConditionLeaveFasyankes;

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        conditions: dataConditionLeaveFasyankes
          .filter(item => item.inputString !== undefined && item.inputString !== null && item.inputString !== "")
          .map(item => {
            return {
              name: item.terminology_name,
              category: {
                system: item.selectedCategory ? item.selectedCategory.system :
                  (item.selectedCategory.source ? item.selectedCategory.source.source_url : ''),
                code: item.selectedCategory ? item.selectedCategory.terminology_code : "",
                display: item.selectedCategory ? item.selectedCategory.terminology_name : ""
              },
              clinicalStatus: {
                system: item.clinicalStatus ? item.clinicalStatus.system :
                  (item.clinicalStatus.source ? item.clinicalStatus.source.source_url : ''),
                code: item.clinicalStatus ? item.clinicalStatus.terminology_code : "",
                display: item.clinicalStatus ? item.clinicalStatus.terminology_name : ""
              },
              data: [
                {
                  system: item.system ? item.system : (item.source ? item.source.source_url : ""),
                  code: item.terminology_code,
                  display: item.terminology_name
                }
              ],
              note: [
                {
                  text: item.inputString
                }
              ],
              recordedDate: this.dateNow
            };
          })
      }
    };
    try
    {
      let response: any = await this.PncService.craeteConditionPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitProcedureKonselingPelayananNifas() {
    const dataProcedureKonselingPelayananNifas = this.listProcedureKonselingNifas;

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        procedures: dataProcedureKonselingPelayananNifas
          .filter(item =>
            item.periodeMulai !== undefined && item.periodeMulai !== null && item.periodeMulai !== "" &&
            item.periodeBerakhir !== undefined && item.periodeBerakhir !== null && item.periodeBerakhir !== ""
          )
          .map(item => {
            return {
              name: item.terminology_name,
              category: {
                system: item.selectedCategory ? item.selectedCategory.system :
                  (item.selectedCategory.source ? item.selectedCategory.source.source_url : ''),
                code: item.selectedCategory ? item.selectedCategory.terminology_code : "",
                display: item.selectedCategory ? item.selectedCategory.terminology_name : ""
              },
              data: [
                {
                  system: item.system ? item.system : (item.source ? item.source.source_url : ""),
                  code: item.terminology_code,
                  display: item.terminology_name
                }
              ],
              "performedPeriod": {
                start: item.periodeMulai,
                end: item.periodeBerakhir
              },
              performedDateTime: this.dateNow
            };
          })
      }
    };

    try
    {
      let response: any = await this.PncService.craeteProceduresPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitProcedureTindakan() {
    const dataProcedureTindakan = this.listProcedureTindakan;

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        procedures: dataProcedureTindakan
          .filter(item =>
            item.periodeMulai !== undefined && item.periodeMulai !== null && item.periodeMulai !== "" &&
            item.periodeBerakhir !== undefined && item.periodeBerakhir !== null && item.periodeBerakhir !== ""
          )
          .map(item => {
            return {
              name: item.terminology_name,
              category: {
                system: item.selectedCategory ? item.selectedCategory.system :
                  (item.selectedCategory.source ? item.selectedCategory.source.source_url : ''),
                code: item.selectedCategory ? item.selectedCategory.terminology_code : "",
                display: item.selectedCategory ? item.selectedCategory.terminology_name : ""
              },
              data: [
                {
                  system: item.system ? item.system : (item.source ? item.source.source_url : ""),
                  code: item.terminology_code,
                  display: item.terminology_name
                }
              ],
              "performedPeriod": {
                start: item.periodeMulai,
                end: item.periodeBerakhir
              },
              performedDateTime: this.dateNow
            };
          })
      }
    };

    try
    {
      let response: any = await this.PncService.craeteProceduresPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitPermintaanPemeriksaanLab() {
    const dataPermintaanPemeriksaanLab = this.listRequestPemeriksaanLab;
    const serviceRequest = dataPermintaanPemeriksaanLab
      .flatMap(item =>
        (item.selectedCategory || []).map(category => ({
          name: item.terminology_name,
          category: [
            {
              coding: [
                {
                  system: category.system || "",
                  code: category.terminology_code,
                  display: category.terminology_name
                }
              ]
            }
          ],
          patientInstruction: "",
          status: "active",
          intent: "original-order",
          priority: "routine",
          occurrenceDateTime: this.dateNow,
          authoredOn: this.dateNow,
          encounter: {
            reference: `Encounter/${this.encounter_id}`,
            display: `Kunjungan ${this.patientData.pasien} pada ${this.dateNow}`
          },
          data: [
            {
              system: item.system || "http://loinc.org",
              code: item.terminology_code,
              display: item.terminology_name
            },
            {
              text: `Pemeriksaan ${item.terminology_name}`
            }
          ],
          reason: [],
          reasonCode: [
            {
              text: item.deskripsi || "Tidak ada deskripsi"
            }
          ]
        }))
      );

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        serviceRequests: serviceRequest
      }
    };
    try
    {
      let response: any = await this.PncService.craeteServiceRequestPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitSpecimenPemeriksaanLab() {
    const dataSpecimen = this.listSpecimenPemeriksaanLab;
    const specimens = dataSpecimen
      .filter(item => item.selectedServiceRequest && item.selectedType) // Filter data yang lengkap
      .map(item => ({
        name: item.terminology_name.replace(/\s+/g, '_'), // Ubah spasi jadi underscore
        status: "available",
        type: {
          system: item.selectedType.system || "http://snomed.info/sct",
          code: item.selectedType.terminology_code,
          display: item.selectedType.terminology_name
        },
        collection: {
          method: {
            system: item.system || "http://snomed.info/sct",
            code: item.terminology_code,
            display: item.terminology_name
          },
          collectedDateTime: this.dateNow
        },
        receivedTime: this.dateNow,
        request: [
          {
            reference: "ServiceRequest/" + item.selectedServiceRequest.response_id
          }
        ]
      }));

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        specimens: specimens
      }
    };


    try
    {
      let response: any = await this.PncService.craeteSpecimenPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitLaporanDiagnosaLab() {
    const diagnosticReports = this.listLaporanDiagnosaLab
      .filter(item => item.selectedSpecimen && item.selectedCategory && item.selectedObservation) // Filter data yang valid
      .map(item => ({
        name: item.terminology_name.replace(/\s+/g, "_"), // Convert nama ke format underscore
        status: "final",
        category: {
          system: "http://terminology.hl7.org/CodeSystem/v2-0074",
          code: item.selectedCategory.terminology_code,
          display: item.selectedCategory.terminology_name
        },
        data: [
          {
            code: {
              system: "http://loinc.org",
              code: item.terminology_code,
              display: item.terminology_name
            },
            result: {
              reference: `Observation/${item.selectedObservation.response_id}`
            }
          }
        ],
        effectiveDateTime: item.selectedSpecimen.response_data.collection.collectedDateTime,
        specimen: [
          {
            reference: `Specimen/${item.selectedSpecimen.response_id}`
          }
        ],
        basedOn: [
          {
            reference: item.selectedSpecimen.response_data.request[0].reference
          }
        ],
        conclusionCode: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "260347006",
                display: "+"
              }
            ]
          }
        ]
      }));

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        diagnosticReports: diagnosticReports
      }
    };

    try
    {
      let response: any = await this.PncService.craeteDiagnosticReportPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitRencanaTindakLanjut() {

    const dataCarePlan = this.listCarePlantCategory;

    // Filter hanya yang punya inputString
    const filteredCarePlans = dataCarePlan
      .filter(item => item.inputString)
      .map(item => ({
        name: item.terminology_name.toLowerCase().replace(/\s+/g, '_'), // Format nama jadi snake_case
        status: "active",
        intent: "plan",
        title: item.terminology_name,
        category: {
          system: item.system ? item.system : (item.source ? item.source.source_url : ""),
          code: item.terminology_code,
          display: item.terminology_name
        },
        description: item.inputString,
        created: this.dateNow
      }));

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        carePlans: filteredCarePlans
      }
    };

    try
    {
      let response: any = await this.PncService.craeteCarePlantPnc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitObservasiPemeriksaanHasilLab() {
    const dataPemeriksaanHasilLab = this.listObservasiPemeriksaanLab;
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        observations: dataPemeriksaanHasilLab
          .filter(item => item.selectedCategory)
          .map(item => {
            return {
              name: item.terminology_name,
              category: {
                system: item.selectedCategory ? item.selectedCategory.system :
                  (item.selectedCategory.source ? item.selectedCategory.source.source_url : ''),
                code: item.selectedCategory ? item.selectedCategory.terminology_code : "observation",
                display: item.selectedCategory ? item.selectedCategory.terminology_name : "Observation"
              },
              data: [
                {
                  code: {
                    system: item.system ? item.system : (item.source ? item.source.source_url : "http://loinc.org"),
                    code: item.terminology_code,
                    display: item.terminology_name
                  },
                  result: {},
                  resultBoolean: {},
                  valueCodeableConcept: {
                    system: "http://snomed.info/sct",
                    code: "260347006",
                    display: "+"
                  }
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
