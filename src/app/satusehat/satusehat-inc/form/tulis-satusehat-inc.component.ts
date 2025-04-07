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
  selectedCondition: any;
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
      case "observasi-ibu-pasca-persalinan":
        this.carilistObservasiIbuPascaPersalinan();
        this.carilistKategoriObservasi();
        this.getSatuanUnit();
        await this.cariHistory();
        break;
      case "observasi-keadaan-bayi":
        this.carilistObservasiKeadaanBayi();
        this.carilistKategoriObservasi();
        await this.cariHistory();
        break;
      case "observasi-fisik-bayi":
        this.carilistObservasiFisikBayi();
        this.carilistKategoriObservasi();
        this.getSatuanUnit();
        await this.cariHistory();
        break;
      case "prosedur-menyusui":
        this.carilistProcedureMenyusui();
        this.carilistKategoriProcedure();
        await this.cariHistory();
        break;
      case "prosedur-tindakan-ibu":
        this.carilistProcedureTindakanIbu();
        this.carilistKategoriProcedure();
        await this.cariHistory();
        break;
      case "prosedur-tindakan-bayi":
        this.carilistProcedureTindakanBayi();
        this.carilistKategoriProcedure();
        await this.cariHistory();
        break;
      case "diagnosa-kondisi-ibu":
        this.carilistDiagnosaConditionIbu();
        this.carilistKategoriCondition();
        this.carilistClinicalCondition();
        await this.cariHistory();
        break;
      case "diagnosa-kondisi-bayi":
        this.carilistDiagnosaConditionBayi();
        this.carilistKategoriCondition();
        this.carilistClinicalCondition();
        await this.cariHistory();
        break;
      case "kondisi-meninggalkan-fasyanker-ibu":
        this.carilistConditionLeaveFasyankesIbu();
        this.carilistKategoriCondition();
        this.carilistClinicalCondition();
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
      case "observasi-ibu-pasca-persalinan":
        this.doSubmitObservasiPascaPersalinan();
        break;
      case "observasi-keadaan-bayi":
        this.doSubmitObservasiKeadaanBayi();
        break;
      case "observasi-fisik-bayi":
        this.doSubmitObservasiFisikBayi();
        break;
      case "prosedur-menyusui":
        this.doSubmitProcedureMenyusui();
        break;
      case "prosedur-tindakan-ibu":
        this.doSubmitProcedureTindakanIbu();
        break;
      case "prosedur-tindakan-bayi":
        this.doSubmitProcedureTindakanBayi();
        break;
      case "diagnosa-kondisi-ibu":
        this.doSubmitDiagnosaKondisiIbu();
        break;
      case "diagnosa-kondisi-bayi":
        this.doSubmitDiagnosaKondisiBayi();
        break;
      case "kondisi-meninggalkan-fasyanker-ibu":
        this.doSubmitConditionLeaveFasyankesIbu();
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
        case "observasi-ibu-pasca-persalinan":
          this.handleObservasiIbuPascaMelahirkan();
          break;
        case "observasi-keadaan-bayi":
          this.handleObservasiKeadaanBayi();
          break;
        case "observasi-fisik-bayi":
          this.handleObservasiFisikBayi();
          break;
        case "prosedur-menyusui":
          this.handleProcedureMenyusui();
          break;
        case "prosedur-tindakan-ibu":
          this.handleProcedureTindakanIbu();
          break;
        case "prosedur-tindakan-bayi":
          this.handleProcedureTindakanBayi();
          break;
        case "diagnosa-kondisi-ibu":
          this.handleDiagnosaCondtionIbu();
          break;
        case "diagnosa-kondisi-bayi":
          this.handleDiagnosaCondtionBayi();
          break;
        case "kondisi-meninggalkan-fasyanker-ibu":
          this.handleConditionLeaveFasyankesIbu();
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
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listKategoriProcedure = [...response.data];
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
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listKategoriCondition = [...response.data];
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
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listCondtionClinical = [...response.data];

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
  async carilistObservasiIbuPascaPersalinan() {
    let payload = {
      terminology_id: "",
      key_name: `category|satusehat_category|is_active`,
      key_operator: "=|=|=",
      key_value: `observation|pasca-persalinan|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listObservasiIbuPascaPersalinan = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistObservasiKeadaanBayi() {
    let payload = {
      terminology_id: "",
      key_name: `category|satusehat_category|is_active|source_id`,
      key_operator: "=|=|=|=",
      key_value: `observation|kondisi-bayi|1|3`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listObservasiKeadaanBayi = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistObservasiFisikBayi() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=",
      key_value: `data-antropometri-bayi|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listObservasiFisikBayi = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistProcedureMenyusui() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=",
      key_value: `prosedur-menyusui|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listProcedureMenyusui = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistProcedureTindakanIbu() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=",
      key_value: `prosedur-melahirkan|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listProcedureTindakanIbu = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistProcedureTindakanBayi() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|is_active`,
      key_operator: "=|=",
      key_value: `prosedur-melahirkan|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listProcedureTindakanBayi = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistDiagnosaConditionIbu() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|category|is_active`,
      key_operator: "=|=|=",
      key_value: `kondisi-kehamilan|condition-code|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listDiagnosaConditionIbu = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistDiagnosaConditionBayi() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|category|is_active`,
      key_operator: "=|=|=",
      key_value: `kondisi-bayi|condition-code|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listDiagnosaConditionBayi = [...response.data];
    } catch (error)
    {
    }
  }
  async carilistConditionLeaveFasyankesIbu() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category|category|is_active`,
      key_operator: "=|=|=",
      key_value: `kondisi-pulang|condition-code|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
    };
    try
    {
      let response: any = await this.IncService.getDataTerminologi(payload);
      this.listConditionLeaveFasyankesIbu = [...response.data];
    } catch (error)
    {
    }
  }


  // NOTE: handle data history
  handleConditionLeaveFasyankesIbu() {
    if (!this.listHistory?.data?.conditions || !Array.isArray(this.listHistory.data.conditions))
    {
      return;
    }

    //  Cari kondisi yang mengandung "Patient's condition"
    let matchedCondition = this.listHistory.data.conditions.find(cond =>
      cond.name.trim().toLowerCase().includes("patient?s condition") // Bisa juga pakai regex kalau perlu
    );

    if (matchedCondition)
    {

      //  Ambil SEMUA notes dari matchedCondition
      let allNotes = (matchedCondition.note || []).map(n => n.text).filter(v => v !== undefined);

      //  Ambil kategori yang cocok
      let matchedCategory = this.listKategoriCondition.find(cat =>
        cat.terminology_name.trim().toLowerCase() === matchedCondition.category?.display?.trim().toLowerCase()
      );

      //  Ambil kondisi klinis yang cocok
      let matchedClinicalStatus = this.listCondtionClinical.find(status =>
        status.terminology_name.trim().toLowerCase() === matchedCondition.clinicalStatus?.display?.trim().toLowerCase()
      );

      //  Setel `selectedCondition` sesuai hasil pencarian
      this.selectedCondition = this.listConditionLeaveFasyankesIbu.find(item =>
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
  handleDiagnosaCondtionBayi() {
    if (!this.listHistory?.data?.conditions || !Array.isArray(this.listHistory.data.conditions))
    {
      return;
    }
    this.listDiagnosaConditionBayi = this.listDiagnosaConditionBayi.map(itemDiagnosaConditionIbu => {
      let terminologyName = itemDiagnosaConditionIbu.terminology_name.trim().toLowerCase();
      //  Cari SEMUA kondisi yang cocok
      let matchedConditions = this.listHistory.data.conditions.filter(cond =>
        cond.name.trim().toLowerCase() === terminologyName
      );
      if (matchedConditions.length > 0)
      {
        //  Ambil SEMUA notes dari matchedConditions
        let allNotes = matchedConditions.flatMap(cond =>
          (cond.note || []).map(n => n.text).filter(v => v !== undefined)
        );
        //  Ambil kategori yang cocok
        let matchedCategories = matchedConditions.flatMap(cond => {
          let matchedCat = this.listKategoriCondition.find(cat =>
            cat.terminology_name.trim().toLowerCase() === cond.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });
        //  Ambil kondisi klinis yang cocok
        let matchedClinicalStatuses = matchedConditions.flatMap(cond => {
          let matchedStatus = this.listCondtionClinical.find(status =>
            status.terminology_name.trim().toLowerCase() === cond.clinicalStatus?.display?.trim().toLowerCase()
          );
          return matchedStatus ? [matchedStatus] : [];
        });
        let newItem = {
          ...itemDiagnosaConditionIbu,
          inputString: allNotes.length > 0 ? allNotes.join(", ") : "", //  Gabung semua notes jadi satu string
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,
          clinicalStatus: matchedClinicalStatuses.length > 0 ? matchedClinicalStatuses[0] : undefined
        };
        return newItem;
      }

      return itemDiagnosaConditionIbu;
    });
  }
  handleDiagnosaCondtionIbu() {
    if (!this.listHistory?.data?.conditions || !Array.isArray(this.listHistory.data.conditions))
    {
      return;
    }
    this.listDiagnosaConditionIbu = this.listDiagnosaConditionIbu.map(itemDiagnosaConditionIbu => {
      let terminologyName = itemDiagnosaConditionIbu.terminology_name.trim().toLowerCase();
      //  Cari SEMUA kondisi yang cocok
      let matchedConditions = this.listHistory.data.conditions.filter(cond =>
        cond.name.trim().toLowerCase() === terminologyName
      );
      if (matchedConditions.length > 0)
      {
        //  Ambil SEMUA notes dari matchedConditions
        let allNotes = matchedConditions.flatMap(cond =>
          (cond.note || []).map(n => n.text).filter(v => v !== undefined)
        );
        //  Ambil kategori yang cocok
        let matchedCategories = matchedConditions.flatMap(cond => {
          let matchedCat = this.listKategoriCondition.find(cat =>
            cat.terminology_name.trim().toLowerCase() === cond.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });
        //  Ambil kondisi klinis yang cocok
        let matchedClinicalStatuses = matchedConditions.flatMap(cond => {
          let matchedStatus = this.listCondtionClinical.find(status =>
            status.terminology_name.trim().toLowerCase() === cond.clinicalStatus?.display?.trim().toLowerCase()
          );
          return matchedStatus ? [matchedStatus] : [];
        });
        let newItem = {
          ...itemDiagnosaConditionIbu,
          inputString: allNotes.length > 0 ? allNotes.join(", ") : "", //  Gabung semua notes jadi satu string
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,
          clinicalStatus: matchedClinicalStatuses.length > 0 ? matchedClinicalStatuses[0] : undefined
        };
        return newItem;
      }

      return itemDiagnosaConditionIbu;
    });
  }
  handleProcedureMenyusui() {
    if (!this.listHistory?.data?.procedures || !Array.isArray(this.listHistory.data.procedures))
    {

      return;
    }

    this.listProcedureMenyusui = this.listProcedureMenyusui.map(itemProcedure => {
      let terminologyName = itemProcedure.terminology_name.trim().toLowerCase().replace(/\s+/g, " ");

      //  Cari procedure yang cocok berdasarkan name
      let matchedProcedure = this.listHistory.data.procedures.find(proc =>
        proc.name.trim().toLowerCase().replace(/\s+/g, " ") === terminologyName
      );

      if (matchedProcedure)
      {

        //  Ambil kategori yang cocok
        let matchedCategory = this.listKategoriProcedure.find(cat =>
          cat.terminology_name.trim().toLowerCase().replace(/\s+/g, " ") === matchedProcedure.category?.display?.trim().toLowerCase().replace(/\s+/g, " ")
        );

        //  Set data ke UI
        let newItem = {
          ...itemProcedure,
          keterangan: matchedProcedure.data[1].text || "",
          selectedCategory: matchedCategory || undefined,                // Cocokkan kategori
          tanggal_waktu_dilakakukan: matchedProcedure.performedDateTime ? this.toDatetimeLocalFormat(matchedProcedure.performedDateTime) : ""
        };

        return newItem;
      }

      return itemProcedure;
    });
  }
  handleProcedureTindakanBayi() {
    if (!this.listHistory?.data?.procedures || !Array.isArray(this.listHistory.data.procedures))
    {
      return;
    }

    console.log(this.listProcedureTindakanBayi);
    console.log(this.listHistory.data.procedures);

    this.listProcedureTindakanBayi = this.listProcedureTindakanBayi.map(itemProcedure => {
      let terminologyName = itemProcedure.terminology_name.trim().toLowerCase().replace(/\s+/g, " ");

      //  Cari procedure yang cocok berdasarkan name
      let matchedProcedure = this.listHistory.data.procedures.find(proc =>
        proc.name.trim().toLowerCase().replace(/\s+/g, " ") === terminologyName
      );

      if (matchedProcedure)
      {
        console.log(matchedProcedure);

        //  Ambil kategori yang cocok
        let matchedCategory = this.listKategoriProcedure.find(cat =>
          cat.terminology_name.trim().toLowerCase().replace(/\s+/g, " ") === matchedProcedure.category?.display?.trim().toLowerCase().replace(/\s+/g, " ")
        );
        //  Set data ke UI
        let newItem = {
          ...itemProcedure,
          selectedCategory: matchedCategory || undefined,
          tanggal_waktu_dilakakukan: matchedProcedure.performedDateTime ? this.toDatetimeLocalFormat(matchedProcedure.performedDateTime) : "",
          keterangan: matchedProcedure.note[0].text || "",
          waktu_mulai_dilakukan: matchedProcedure.performedPeriod.start ? this.toDatetimeLocalFormat(matchedProcedure.performedPeriod.start) : "",
          waktu_berakhir_dilakukan: matchedProcedure.performedPeriod.end ? this.toDatetimeLocalFormat(matchedProcedure.performedPeriod.end) : "",
        };

        return newItem;
      }

      return itemProcedure;
    });
  }
  handleProcedureTindakanIbu() {
    if (!this.listHistory?.data?.procedures || !Array.isArray(this.listHistory.data.procedures))
    {

      return;
    }

    this.listProcedureTindakanIbu = this.listProcedureTindakanIbu.map(itemProcedure => {
      let terminologyName = itemProcedure.terminology_name.trim().toLowerCase().replace(/\s+/g, " ");

      //  Cari procedure yang cocok berdasarkan name
      let matchedProcedure = this.listHistory.data.procedures.find(proc =>
        proc.name.trim().toLowerCase().replace(/\s+/g, " ") === terminologyName
      );

      if (matchedProcedure)
      {

        //  Ambil kategori yang cocok
        let matchedCategory = this.listKategoriProcedure.find(cat =>
          cat.terminology_name.trim().toLowerCase().replace(/\s+/g, " ") === matchedProcedure.category?.display?.trim().toLowerCase().replace(/\s+/g, " ")
        );

        //  Set data ke UI
        let newItem = {
          ...itemProcedure,
          selectedCategory: matchedCategory || undefined,                // Cocokkan kategori
          tanggal_waktu_dilakakukan: matchedProcedure.performedDateTime ? this.toDatetimeLocalFormat(matchedProcedure.performedDateTime) : ""
        };

        return newItem;
      }

      return itemProcedure;
    });
  }
  handleObservasiFisikBayi() {
    if (!this.listHistory?.data?.observations) return;
    this.listObservasiFisikBayi = this.listObservasiFisikBayi.map(itemFisikBayi => {
      let terminologyName = itemFisikBayi.terminology_name.trim().toLowerCase();

      //  Cari SEMUA observasi yang cocok
      let matchedObservations = this.listHistory.data.observations.filter(obs =>
        obs.name.trim().toLowerCase() === terminologyName
      );


      if (matchedObservations.length > 0)
      {
        //  Ambil SEMUA valueInteger yang ada di semua data
        let allValues = matchedObservations.flatMap(obs => {
          return (obs.data || []).map(d => {
            return d.result.value;
          }).filter(v => v !== undefined);
        });


        //  Ambil kategori yang cocok
        let matchedCategories = matchedObservations.flatMap(obs => {
          let matchedCat = this.listKategoriObservasi.find(cat =>
            cat.terminology_name.trim().toLowerCase() === obs.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });

        return {
          ...itemFisikBayi,
          userInput: allValues.length > 0 ? allValues[0] : null, // Ambil yang pertama kalau ada
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,
        };
      }


      return itemFisikBayi;
    });

  }
  handleObservasiKeadaanBayi() {
    if (!this.listHistory?.data?.observations) return;

    this.listObservasiKeadaanBayi = this.listObservasiKeadaanBayi.map(itemPersalinan => {
      let terminologyName = itemPersalinan.terminology_name.trim().toLowerCase();

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
          ...itemPersalinan,
          userInput: allValues.length > 0 ? allValues[0] : null, // Ambil yang pertama kalau ada
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : undefined,

        };
      }

      return itemPersalinan;
    });

  }
  handleObservasiIbuPascaMelahirkan() {
    if (!this.listHistory?.data?.observations) return;

    this.listObservasiIbuPascaPersalinan = this.listObservasiIbuPascaPersalinan.map(itemPascaMelahirkan => {
      let terminologyName = itemPascaMelahirkan.terminology_name.trim().toLowerCase();

      //  Cari SEMUA observasi yang cocok
      let matchedObservations = this.listHistory.data.observations.filter(obs =>
        obs.name.trim().toLowerCase() === terminologyName
      );

      if (matchedObservations.length > 0)
      {
        //  Ambil SEMUA value dari result.value
        let allValues = matchedObservations.flatMap(obs =>
          (obs.data || []).map(d => d.result?.value).filter(v => v !== undefined)
        );

        //  Ambil unit dari result.unit
        let matchedUnits = matchedObservations.flatMap(obs =>
          (obs.data || []).map(d => d.result?.unit).filter(v => v !== undefined)
        );

        //  Ambil kategori yang cocok
        let matchedCategories = matchedObservations.flatMap(obs => {
          let matchedCat = this.listKategoriObservasi.find(cat =>
            cat.terminology_name.trim().toLowerCase() === obs.category?.display?.trim().toLowerCase()
          );
          return matchedCat ? [matchedCat] : [];
        });

        //  Cocokin unit dengan `listSatuanUnit`
        let selectedUnit = this.listSatuanUnit.find(unit =>
          unit.unit_code?.trim().toLowerCase() === matchedUnits[0]?.trim().toLowerCase()
        );

        return {
          ...itemPascaMelahirkan,
          userInput: allValues.length > 0 ? allValues[0] : "", // Ambil yang pertama kalau ada
          selectedCategory: matchedCategories.length > 0 ? matchedCategories[0] : "",
          unit: selectedUnit ? selectedUnit.unit_code : ""
        };
      }

      return itemPascaMelahirkan;
    });
  }
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
      let response: any = await this.IncService.getDataSatuanUnit(payload);
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
  async doSubmitObservasiPascaPersalinan() {
    const dataPelayanan = this.listObservasiIbuPascaPersalinan;

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
      let response: any = await this.IncService.craeteObservationInc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitObservasiKeadaanBayi() {
    const itemDataObservasiKeadaanBayi = this.listObservasiKeadaanBayi;
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        observations: itemDataObservasiKeadaanBayi
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
                  valueCodeableConcept: {
                    system: item.system,
                    code: item.terminology_code,
                    display: item.terminology_name
                  },
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
  async doSubmitObservasiFisikBayi() {
    const itemDataObservasiFisikBayi = this.listObservasiFisikBayi;
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        observations: itemDataObservasiFisikBayi
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
                    system: item.system ? item.system : item.source?.source_url ? item.source.source_url : "http://loinc.org",
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
                  valueCodeableConcept: {}
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
  async doSubmitProcedureMenyusui() {
    const dataProcedureMenyusui = this.listProcedureMenyusui;

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        procedures: dataProcedureMenyusui
          .filter(item =>
            item.tanggal_waktu_dilakakukan !== undefined && item.tanggal_waktu_dilakakukan !== null && item.tanggal_waktu_dilakakukan !== "" &&
            item.keterangan !== undefined && item.keterangan !== null && item.keterangan !== ""
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
                },
                {
                  text: item.keterangan
                }
              ],
              performedDateTime: new Date(item.tanggal_waktu_dilakakukan).toISOString().replace('Z', '+00:00')
            };
          })
      }
    };


    try
    {
      let response: any = await this.IncService.craeteProceduresInc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitProcedureTindakanIbu() {
    const dataProcedureTindakanIbu = this.listProcedureTindakanIbu;

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        procedures: dataProcedureTindakanIbu
          .filter(item =>
            item.tanggal_waktu_dilakakukan !== undefined && item.tanggal_waktu_dilakakukan !== null && item.tanggal_waktu_dilakakukan !== ""
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
              performedDateTime: new Date(item.tanggal_waktu_dilakakukan).toISOString().replace('Z', '+00:00')
            };
          })
      }
    };


    try
    {
      let response: any = await this.IncService.craeteProceduresInc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitProcedureTindakanBayi() {
    const dataProcedureTindakanBayi = this.listProcedureTindakanBayi;

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        procedures: dataProcedureTindakanBayi
          .filter(item =>
            item.tanggal_waktu_dilakakukan !== undefined && item.tanggal_waktu_dilakakukan !== null && item.tanggal_waktu_dilakakukan !== ""
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
              performedPeriod: {
                start: new Date(item.waktu_mulai_dilakukan).toISOString().replace('Z', '+00:00'),
                end: new Date(item.waktu_berakhir_dilakukan).toISOString().replace('Z', '+00:00')
              },
              note: [
                {
                  text: item.keterangan
                }
              ],
              performedDateTime: new Date(item.tanggal_waktu_dilakakukan).toISOString().replace('Z', '+00:00')
            };
          })
      }
    };


    try
    {
      let response: any = await this.IncService.craeteProceduresInc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitDiagnosaKondisiIbu() {
    const dataDiagnosisCondtionIbu = this.listDiagnosaConditionIbu;
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        conditions: dataDiagnosisCondtionIbu
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
      let response: any = await this.IncService.craeteConditionInc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitDiagnosaKondisiBayi() {
    const dataDiagnosisCondtionBayi = this.listDiagnosaConditionBayi;
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        conditions: dataDiagnosisCondtionBayi
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
      let response: any = await this.IncService.craeteConditionInc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
  async doSubmitConditionLeaveFasyankesIbu() {
    const dataConditionLeaveFasyankesIbu = this.listConditionLeaveFasyankesIbu;

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        rmno: this.notransaksi,
        conditions: dataConditionLeaveFasyankesIbu
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
      let response: any = await this.IncService.craeteConditionInc(payload);
      let msg = response.statusMsg.split(": ");
      Swal.fire("Success", msg.join(", "), "success");
    } catch (err)
    {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim data", "error");
    }
  }
}
