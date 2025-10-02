import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  Type,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiserviceService } from "src/app/apiservice.service";
import Swal from "sweetalert2";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { faCog, fas } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import {
  NgSelectModule,
  NgOption,
  NgSelectComponent,
} from "@ng-select/ng-select";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { Router } from "@angular/router";
import { shareReplay } from "rxjs/operators";

import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { perminobatComponent } from "../perminobat/perminobat.component";
import {
  NgSignaturePadOptions,
  SignaturePadComponent,
} from "@almothafar/angular-signature-pad";
import { G } from "@angular/cdk/keycodes";
import { SampleService } from "src/app/services";
import { TreeNode } from "primeng/api";
import { DatePipe } from "@angular/common";
import { AppComponent } from "../../app.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ChatService } from "../../chat.service";
import { FarmasijualService } from "../kasirfarmasijual/farmasijual.service";
import { ItemsList } from "@ng-select/ng-select/lib/items-list";

@Component({
  selector: "app-tuliserm",
  templateUrl: "./tuliserm.component.html",
  styleUrls: ["./tuliserm.component.css"],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class tulisermComponent implements OnInit {
  @ViewChild("selectxx") selectxx: NgSelectComponent;
  @ViewChild("myButton") myButton: ElementRef;
  @ViewChild("usx") input: ElementRef<HTMLInputElement>;

  @ViewChild("signature")
  public signaturePad: SignaturePadComponent;

  @ViewChild("rangeInput") rangeInput: ElementRef;
  @ViewChild("mojiDiv") mojiDiv: ElementRef;

  private signaturePadOptions: NgSignaturePadOptions = {
    // passed through to szimek/signature_pad constructor
    minWidth: 1,
    canvasWidth: 500,
    canvasHeight: 300,
    penColor: "rgb(255, 3, 3)",

    backgroundColor: "rgb(252, 252, 252)",
  };

  toggleMobileSidebar: any;
  faStar = faStar;
  faPlus = faPlus;
  faCog = faCog;
  faAngleDown = faAngleDown;
  faSearch = faSearch;
  faTags = faTags;
  faCalendarAlt = faCalendarAlt;

  heading = "Master Customer";
  subheading: any;
  icon = "pe-7s-diamond icon-gradient bg-warm-flame";

  options: FormGroup;
  public userDetails: any;
  nama: any;
  akses: any;

  kdklinik: any;
  cabangarr: any;

  cariuser: any;
  closeResult: string;

  kdparent = "";
  coa = "";
  kdcabang: any;
  username: any;
  tglp: String = new Date().toISOString();
  currentJustify = "start";
  currentJustify2 = "center";
  currentJustify3 = "start";

  currentOrientation = "horizontal";

  // @ViewChild('NgSelectComponentx') ngSelectComponent: NgSelectComponent;

  htmlContent = "";

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "25rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    uploadUrl: "no",
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    toolbarHiddenButtons: [
      [
        "textColor",
        "backgroundColor",
        "customClasses",
        "link",
        "unlink",
        "insertImage",
        "insertVideo",
        "insertHorizontalRule",
        "removeFormat",
        "toggleEditorMode",
        "strikeThrough",
        "subscript",
        "superscript",
      ],
    ],
  };

  //KAJIAN AWAL
  unitPelayanan: string = "";
  tanggal: any;
  jam: string = "";
  nomorRekamMedis: string = "";
  nomorTransaksi: string = "";
  namaPasien: string = "";
  tanggalLahir: string = "";
  alamatPasien: string = "";
  bpjsNik: string = "";
  keluhanUtama: string = "";
  keluhanTambahan: string = "";
  penyakitSekarang: string = "";
  penyakitDahulu: string = "";
  penyakitKeluarga: string = "";
  alergiPasien: string = "";
  terapiBerjalan: string = "";
  obatSeringDigunakan: string = "";
  obatKonsumsi: string = "";
  keadaanUmum: string = "";
  kondisiE: string = "";
  kondisiM: string = "";
  kondisiV: string = "";
  nilaiTD: string = "";
  nilaiNadi: string = "";
  nilaiNafas: string = "";
  nilaiSuhu: string = "";
  nilaiBB: string = "";
  nilaiTB: string = "";
  nilaiIMT: string = "";
  nilaiKepala: string = "";
  nilaiThorax: string = "";
  nilaiAbdomen: string = "";
  nilaiEksternalitas: string = "";
  nilaiLainnya: string = "";
  aktivitasHarian: string = "";
  statusLokalis: string = "";
  statusMental: string = "";
  statusResponEmosi: string = "";
  statusBahasa: string = "";
  statusHubunganPasien: string = "";
  statusKetaatanIbadah: string = "";
  statusAsupanMakanan: string = "";
  skorAsupanMakanan: any = 0;
  skalaJatuh: any = 0;
  penyakitBeresikoMalnutrisi: string = "";
  statusCaraBerjalan: string = "";
  statusDudukMenopang: string = "";
  statusResiko: string = "";
  jumlahPenurunan: string = "";

  listKeadaanUmum: string[] = ["Baik", "Sedang", "Lemah"];
  listAktivitasHarian: string[] = ["Mandiri", "Dengan Bantuan"];
  listStatusMental: string[] = [
    "Orientasi Baik",
    "Disorientasi",
    "Gelisah",
    "Tidak Respon",
  ];
  listResponEmosi: string[] = [
    "Tenang",
    "Takut",
    "Tegang",
    "Marah",
    "Sedih",
    "Gelisah",
  ];
  listOpsi: string[] = ["Ya", "Tidak"];
  listOpsiSifat: string[] = ["Baik", "Tidak Baik"];
  listBahasa: string[] = ["Indonesia", "Aceh", "Lainnya"];
  listOpsiPenurunanBB: string[] = [
    "Tidak ada penurunan BB",
    "Tidak yakin/tidak tahu/baju terasa longgar",
    "Ya, BB turun",
  ];
  statusPenurunanBB: string = this.listOpsiPenurunanBB[0];
  listSubOpsiPenurunanBB: string[] = [
    "1 - 5 Kg",
    "6 - 10 Kg",
    "11 - 15 Kg",
    "> 15 Kg",
  ];
  listResiko: string[] = [
    "Tidak beresiko, bila tidak ditemukan 1  2",
    "Resiko rendah, bila ditemukan salah satu 1 / 2",
    "Resiko tinggi, bila ditemukan 1 & 2",
  ];
  mojis = ["😄", "🙂", "🙂", "🙂", "😐", "😐", "😐", "😩", "😩", "😩", "🤢"];
  listStatusMentalSelected: string[] = [];
  listResponEmosiSelected: string[] = [];
  listBahasaSelected: string[] = [];

  catatandiet: string = "";

  satusehatheaders: any;
  kduser: any;
  norm: string;
  kdpoli: string;
  tglpriksa: "";
  kddokter: string;
  kdkostumerd: "";
  notransaksi: "";
  pasien: "";
  tgllahir: "";
  noantrian: "";
  nampoli: "";
  namdokter: "";
  namacus: "";
  costumer: "";
  alamat: string = "";
  alergi: string = "00";

  kdtarif: "";
  notrans: string;
  kelas: string;
  showdata: boolean;
  //   kelas:string;
  umur: string;
  subjek: string = "";
  td: any = "";
  bb: any = "";
  nadi: any = "";
  suhu: any = "";
  rr: any = "";
  spo: any = "";
  pf: string;
  plan: string;
  plankon: string;
  kondisiKeluarga: string;

  hostName: string;
  URLINVOICE: string;
  ststarif: any;
  form: FormGroup;
  form1: FormGroup;
  form2: FormGroup;
  selectedFile: TreeNode;
  files1: TreeNode[];
  files2: TreeNode[];
  files3: TreeNode[];
  selectedFile1: TreeNode;

  myDate: any;
  mydaterujuk: any;
  myDatelab: any;
  myDaterad: any;
  myDatekon: any;
  myDatedaf = new Date();
  kddoktersatusehat: string = "";
  locationid: string = "";
  users = [
    "Hipertensi",
    "DM",
    "Asma",
    "TBC",
    "PPOK",
    "Stroke",
    "Jantung",
    "Penyakit Ginjal",
    "Penyakit Liver",
    "Keganasan",
    // { name: 'Hipertensi' },
    // { name: 'DM' },
    // { name: 'Asma' },
    // { name: 'TBC' },
    // { name: 'PPOK' },
    // { name: 'Stroke' },
    // {  name: 'Jantung' },
    // { name: 'Penyakit Ginjal' },
    // { name: 'Penyakit Liver' },
    // { name: 'Keganasan' },
  ];

  rwtp: any = "";

  selectedUserIds: number[];
  password: any;
  riwayatdahulu: any = "";
  riwayatkeluarga: any = "";
  kdtkp: any = "";
  jeniskun: any = "";
  isPeriksaPkg: any = false;
  selectedCppt: any = "";
  editdokter: boolean = false;
  test2: any = "2";
  namaorangtua: any;
  catatanpasien: any;

  constructor(
    public FarmasijualService: FarmasijualService,
    public chatService: ChatService,
    private appComponent: AppComponent,
    public hots: SampleService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer
  ) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.password = this.userDetails.pass;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
    this.username = this.userDetails.username;
    this.kduser = this.userDetails.kduser;
    localStorage.setItem("username", this.username);
    localStorage.setItem("kdcabang", this.kdcabang);

    console.log("Kode Cabang : " + this.kdcabang);

    this.form = fb.group({
      gender: ["", Validators.required],
    });

    this.form1 = fb.group({
      gender: ["", Validators.required],
    });

    this.form2 = fb.group({
      gender: ["", Validators.required],
    });

    this.satusehatheaders = new HttpHeaders({
      "kd-cabang": this.kdcabang,
    });

    this.hak();
  }

  tesrprp() {
    this.simpanambil();
  }
  skalanyeri: any;

  cities3 = [
    { id: 1, name: "Tidak Ada Nyeri", avatar: "./assets/images/nyeri/0.png" },
    { id: 2, name: "Nyeri Ringan", avatar: "./assets/images/nyeri/2.png" },
    {
      id: 3,
      name: "Nyeri Ringan Sedang",
      avatar: "./assets/images/nyeri/4.png",
    },
    { id: 4, name: "Nyeri Sedang", avatar: "./assets/images/nyeri/6.png" },
    { id: 5, name: "Nyeri Hebat", avatar: "./assets/images/nyeri/8.png" },
    {
      id: 6,
      name: "Nyeri Sangat Hebat",
      avatar: "./assets/images/nyeri/10.png",
    },
  ];

  onCaraBerjalanChange(caraBerjalan: string): void {
    this.statusCaraBerjalan = caraBerjalan;
    console.log(this.statusCaraBerjalan);
  }

  onDudukMenopangChange(dudukMenopang: string): void {
    this.statusDudukMenopang = dudukMenopang;
    console.log(this.statusDudukMenopang);
  }

  onResikoChange(resiko: string): void {
    if (resiko.includes("Tidak beresiko")) {
      this.statusResiko = "resiko_nihil";
    } else if (resiko.includes("Resiko rendah")) {
      this.statusResiko = "resiko_rendah";
    } else {
      this.statusResiko = "resiko_tinggi";
    }

    console.log(this.statusResiko);
  }

  // onConfirmationFormBeforeReset() {
  //   Swal.fire({
  //     title: "Apakah anda yakin?",
  //     text: "Form akan dikosongkan kembali",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Ya, Reset!"
  //   }).then((result) => {

  //   })
  // }

  res: any;
  onConfirmationDataBeforeSaving(name: string) {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Pastikan data yang kamu masukan sudah benar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Simpan!",
      cancelButtonText: "Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Mohon Tunggu!",
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 2000,
          didOpen: () => {
            Swal.showLoading();
            this.res = this.onSavingData();
          },
        }).then(
          () => {},
          (dismiss) => {
            this.onResetForm();
          }
        );
      }
    });
  }

  onConfirmationDataBeforeUpdating() {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Pastikan data yang kamu masukan sudah benar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Perbaharui!",
      cancelButtonText: "Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Mohon Tunggu!",
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 2000,
          didOpen: () => {
            Swal.showLoading();
            this.onUpdatingData();
          },
        }).then(
          () => {},
          (dismiss) => {
            location.reload();
          }
        );
      }
    });
  }

  listData: object[] = [];
  allData: any;
  onLoadAllData(): any {
    Swal.fire({
      title: "Mohon Tunggu",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        this.allData = this.onLoadData();
      },
    }).then();
  }

  detailDataKajian: any = null;
  test(noRm: string, noTransaksi: string) {
    Swal.fire({
      title: "Mohon Tunggu",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        this.onReqDetailDataKajian(noRm, noTransaksi);
      },
    }).then();
  }

  onLoadData(): any {
    console.log("Data detail : " + this.detailDataKajian);
    this.authService.getAllDataKajianAwal(this.norm).subscribe(
      (data: any) => {
        if (!data.success) {
          Swal.fire({
            title: "Gagal!",
            text: data.err,
            icon: "error",
          });
        } else {
          this.listData = [];
          console.log(this.username);
          let convertedArray = data.data.map((item) => {
            return {
              no_rm: item.no_rm,
              no_tran: item.no_transaksi,
              nama_pasien: item.nama_pasien,
              nama_poli: item.unit_pelayanan,
              keluhan: item.keluhan_utama,
            };
          });
          this.listData = convertedArray;
          console.log("Test" + convertedArray);
        }
      },
      (error: any) => {
        this.toastr.error(error.error.message, "Error");
      }
    );
  }

  onReqDetailDataKajian(noRm: string, noTransaksi: string): void {
    this.authService.getDetailDataKajianAwal(noRm, noTransaksi).subscribe(
      (data: any) => {
        if (!data.success) {
          Swal.fire({
            title: "Gagal!",
            text: data.err,
            icon: "error",
          });
        } else {
          console.log("penurunan pertama kali : " + data.data.jumlah_penurunan);
          let dataRes = data.data;

          this.onPenurunanBBChange(dataRes.penurunan_berat_badan);
          this.onAsupanMakananChange(dataRes.kurang_asupan_makanan);

          if (
            dataRes.penurunan_berat_badan === this.listOpsiPenurunanBB[2] &&
            dataRes.jumlah_penurunan !== null
          ) {
            this.onSubPenurunanBBChange(dataRes.jumlah_penurunan);
          }

          this.detailDataKajian = dataRes;
          this.unitPelayanan = dataRes.unit_pelayanan;
          this.tanggal = dataRes.tanggal_kunjungan;
          this.jam = dataRes.waktu_kunjungan;
          this.nomorRekamMedis = dataRes.no_rm;
          this.nomorTransaksi = dataRes.no_transaksi;
          this.namaPasien = dataRes.nama_pasien;
          this.alamat = this.alamat;
          this.tanggalLahir = this.tgllahir;
          this.bpjsNik = dataRes.no_asuransi + "/" + dataRes.no_pengenal;
          this.keluhanUtama = dataRes.keluhan_utama;
          this.keluhanTambahan = dataRes.keluhan_tambahan;
          this.penyakitSekarang = dataRes.riwayat_penyakit_sekarang;
          this.penyakitDahulu = dataRes.riwayat_penyakit_dahulu;
          this.penyakitKeluarga = dataRes.riwayat_penyakit_keluarga;
          this.alergi = dataRes.riwayat_alergi;
          this.terapiBerjalan = dataRes.tindakan_terapi_pernah_dijalani;
          this.obatSeringDigunakan = dataRes.obat_yang_sering_digunakan;
          this.obatKonsumsi = dataRes.obat_yang_sedang_dikonsumsi;
          this.obatSeringDigunakan = dataRes.obat_yang_sering_digunakan;
          this.keadaanUmum = dataRes.keadaan_umum;
          this.kondisiE = dataRes.kesadaran_pengelihatan;
          this.kondisiM = dataRes.kesadaran_motorik;
          this.kondisiV = dataRes.kesadaran_verbal;
          this.nilaiTD = dataRes.tekanan_darah;
          this.nilaiNadi = dataRes.nadi;
          this.nilaiNafas = dataRes.frekuensi_nafas;
          this.nilaiSuhu = dataRes.suhu;
          this.nilaiBB = dataRes.berat_badan;
          this.nilaiTB = dataRes.tinggi_badan;
          this.nilaiIMT = dataRes.index_masa_tubuh;
          this.nilaiKepala = dataRes.kepala_leher;
          this.nilaiThorax = dataRes.thorax;
          this.nilaiAbdomen = dataRes.abdomen;
          this.nilaiEksternalitas = dataRes.extremitas;
          this.nilaiLainnya = "-";
          this.statusResponEmosi = dataRes.respon_emosi;
          this.statusMental = dataRes.status_mental;
          this.statusHubunganPasien = dataRes.hubungan_keluarga;
          this.statusKetaatanIbadah = dataRes.ketaatan_ibadah;
          this.statusBahasa = dataRes.bahasa;
          this.statusPenurunanBB = dataRes.penurunan_berat_badan;
          this.statusAsupanMakanan = dataRes.kurang_asupan_makanan;
          this.statusCaraBerjalan = dataRes.resiko_jatuh_berjalan;
          this.statusDudukMenopang = dataRes.resiko_jatuh_duduk;
          this.statusResiko = dataRes.resiko_jatuh;
          this.penyakitBeresikoMalnutrisi = dataRes.penyakit_malnutrisi;
          this.skalaJatuh = dataRes.skala_nyeri;
          this.statusLokalis = dataRes.lokalis;
          this.aktivitasHarian = dataRes.fungsional_aktivitas;
          this.jumlahPenurunan = dataRes.jumlah_penurunan;
          this.skorTotal = dataRes.total_score_gizi;
        }
      },
      (error: any) => {
        this.toastr.error(error.error.message, "Error");
      }
    );
  }

  onResetForm(): any {
    console.error("Reset form executed");
    this.detailDataKajian = null;
    this.unitPelayanan = this.nampoli;
    this.tanggal = this.myDate;

    // this.tanggal = this.pipe.transform(this.myDate, 'yyyy-MM-dd')
    this.alamat = this.alamat;
    this.tanggalLahir = this.tgllahir;
    this.bpjsNik = this.noasuransi;
    this.keluhanUtama = "";
    this.keluhanTambahan = "";
    this.penyakitSekarang = "";
    this.penyakitDahulu = "";
    this.penyakitKeluarga = "";
    this.alergi = "";
    this.terapiBerjalan = "";
    this.obatSeringDigunakan = "";
    this.obatKonsumsi = "";
    this.obatSeringDigunakan = "";
    this.keadaanUmum = "";
    this.kondisiE = "";
    this.kondisiM = "";
    this.kondisiV = "";
    this.nilaiTD = "";
    this.nilaiNadi = "";
    this.nilaiNafas = "";
    this.nilaiSuhu = "";
    this.nilaiBB = "";
    this.nilaiTB = "";
    this.nilaiIMT = "";
    this.nilaiKepala = "";
    this.nilaiThorax = "";
    this.nilaiAbdomen = "";
    this.nilaiEksternalitas = "";
    this.nilaiLainnya = "";
    this.statusLokalis = "";
    this.aktivitasHarian = "";
    this.statusMental = "";
    this.statusResponEmosi = "";
    this.statusHubunganPasien = "";
    this.statusKetaatanIbadah = "";
    this.statusBahasa = "";
    this.statusPenurunanBB = "";
    this.statusAsupanMakanan = "";
    this.skorTotal = "0";
    this.skorPertanyaan1 = "0";
    this.skorAsupanMakanan = "0";
    this.skalaJatuh = "0";
    this.statusCaraBerjalan = "";
    this.statusDudukMenopang = "";
    this.statusResiko = "";
    this.statusResponEmosi = "";
    this.statusMental = "";
    this.statusHubunganPasien = "";
    this.statusKetaatanIbadah = "";
    this.statusBahasa = "";
    this.statusPenurunanBB = "";
    this.statusAsupanMakanan = "";
    this.statusCaraBerjalan = "";
    this.statusDudukMenopang = "";
    this.statusResiko = "";
    this.penyakitBeresikoMalnutrisi = "";
    this.statusLokalis = "";
    this.aktivitasHarian = "";
    this.jumlahPenurunan = "";
  }

  onSavingData(): any {
    if (this.statusPenurunanBB != "ada") {
      this.skorPertanyaan1 = 0;
    }

    let body = {
      no_rm: this.norm,
      no_transaksi: this.notrans,
      username: this.username,

      unit_pelayanan: this.unitPelayanan,
      tanggal: this.tanggal,
      jam: this.jam,
      keluhan_utama: this.keluhanUtama,
      keluhan_tambahan: this.keluhanTambahan,

      riwayat_penyakit_sekarang: this.penyakitSekarang,
      riwayat_penyakit_dahulu: this.penyakitDahulu,
      riwayat_penyakit_keluarga: this.penyakitKeluarga,
      riwayat_alergi: this.alergi,

      tindakan_terapi_pernah_dijalani: this.terapiBerjalan,
      obat_yang_sering_digunakan: this.obatSeringDigunakan,
      obat_yang_sedang_dikonsumsi: this.obatKonsumsi,
      keadaan_umum: this.keadaanUmum,

      kesadaran_pengelihatan: this.kondisiE,
      kesadaran_motorik: this.kondisiM,
      kesadaran_verbal: this.kondisiV,

      tekanan_darah: this.nilaiTD,
      nadi: this.nilaiNadi,
      frekuensi_nafas: this.nilaiNafas,
      suhu: this.nilaiSuhu,
      berat_badan: this.nilaiBB,
      tinggi_badan: this.nilaiTB,
      index_masa_tubuh: this.nilaiTB,

      kepala_leher: this.nilaiKepala,
      thorax: this.nilaiThorax,
      abdomen: this.nilaiAbdomen,
      extremitas: this.nilaiEksternalitas,
      lokalis: this.statusLokalis,
      fungsional_aktivitas: this.aktivitasHarian,
      status_mental: this.statusMental,
      respon_emosi: this.statusResponEmosi,
      hubungan_keluarga: this.statusHubunganPasien,
      ketaatan_ibadah: this.statusKetaatanIbadah,
      bahasa: this.statusBahasa,

      penurunan_berat_badan: this.statusPenurunanBB,
      jumlah_penurunan: this.jumlahPenurunan,

      kurang_asupan_makanan: this.statusAsupanMakanan,
      total_score_gizi: this.skorTotal,
      penyakit_malnutrisi: this.penyakitBeresikoMalnutrisi,
      skala_nyeri: this.skalaJatuh,
      resiko_jatuh_berjalan: this.statusCaraBerjalan,
      resiko_jatuh_duduk: this.statusDudukMenopang,
      resiko_jatuh: this.statusResiko,
    };

    this.authService.simpanDataKajianAwal(body).subscribe(
      (data: any) => {
        console.log(data);
        if (data.status != "error") {
          // this.toastr.success('Data Berhasil Disimpan', 'Sukses', {
          //   timeOut: 2000
          // });
          Swal.fire({
            title: "Berhasil!",
            text: "Data berhasil disimpan",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
          return data;
        } else {
          Swal.fire({
            title: "Gagal!",
            text: data.err,
            icon: "error",
          });
          // this.toastr.error(data.err, 'Error')
        }
        return null;
      },
      (error: any) => {
        this.toastr.error(error.error.message, "Error");
      }
    );

    console.log(this.unitPelayanan);
    console.log(this.tanggal);
    console.log(this.jam);
    console.log(this.nomorRekamMedis);
    console.log(this.namaPasien);
    console.log(this.tanggalLahir);
    console.log(this.alamat);
    console.log(this.bpjsNik);

    console.log(this.keluhanUtama);
    console.log(this.keluhanTambahan);
    console.log(this.penyakitSekarang);
    console.log(this.penyakitDahulu);
    console.log(this.penyakitKeluarga);
    console.log(this.alergi);
    console.log(this.terapiBerjalan);
    console.log(this.obatSeringDigunakan);
    console.log(this.obatKonsumsi);

    console.log(this.keadaanUmum);
    console.log(this.kondisiE);
    console.log(this.kondisiM);
    console.log(this.kondisiV);
    console.log(this.nilaiTD);
    console.log(this.nilaiNadi);
    console.log(this.nilaiNafas);
    console.log(this.nilaiSuhu);
    console.log(this.nilaiBB);
    console.log(this.nilaiTB);
    console.log(this.nilaiIMT);

    console.log(this.nilaiKepala);
    console.log(this.nilaiThorax);
    console.log(this.nilaiAbdomen);
    console.log(this.nilaiEksternalitas);
    console.log(this.nilaiLainnya);

    console.log(this.aktivitasHarian);
    console.log(this.statusMental);
    console.log(this.statusResponEmosi);
    console.log(this.statusHubunganPasien);
    console.log(this.statusKetaatanIbadah);
    console.log(this.statusBahasa);

    console.log(this.skorPertanyaan1);
    console.log(this.skorAsupanMakanan);
    console.log(this.skorTotal);

    console.log(this.skalaJatuh);
    console.log(this.penyakitBeresikoMalnutrisi);
    console.log(this.statusCaraBerjalan);
    console.log(this.statusDudukMenopang);
    console.log(this.statusResiko);
  }

  onUpdatingData(): any {
    if (this.statusPenurunanBB != "ada") {
      this.skorPertanyaan1 = 0;
    }

    console.log(" No Trans : " + this.notrans);
    let body = {
      no_rm: this.norm,
      no_transaksi: this.notrans,
      username: this.username,

      unit_pelayanan: this.unitPelayanan,
      tanggal: this.tanggal,
      jam: this.jam,
      keluhan_utama: this.keluhanUtama,
      keluhan_tambahan: this.keluhanTambahan,

      riwayat_penyakit_sekarang: this.penyakitSekarang,
      riwayat_penyakit_dahulu: this.penyakitDahulu,
      riwayat_penyakit_keluarga: this.penyakitKeluarga,
      riwayat_alergi: this.alergi,

      tindakan_terapi_pernah_dijalani: this.terapiBerjalan,
      obat_yang_sering_digunakan: this.obatSeringDigunakan,
      obat_yang_sedang_dikonsumsi: this.obatKonsumsi,
      keadaan_umum: this.keadaanUmum,

      kesadaran_pengelihatan: this.kondisiE,
      kesadaran_motorik: this.kondisiM,
      kesadaran_verbal: this.kondisiV,

      tekanan_darah: this.nilaiTD,
      nadi: this.nilaiNadi,
      frekuensi_nafas: this.nilaiNafas,
      suhu: this.nilaiSuhu,
      berat_badan: this.nilaiBB,
      tinggi_badan: this.nilaiTB,
      index_masa_tubuh: this.nilaiTB,

      kepala_leher: this.nilaiKepala,
      thorax: this.nilaiThorax,
      abdomen: this.nilaiAbdomen,
      extremitas: this.nilaiEksternalitas,
      lokalis: this.statusLokalis,
      fungsional_aktivitas: this.aktivitasHarian,
      status_mental: this.statusMental,
      respon_emosi: this.statusResponEmosi,
      hubungan_keluarga: this.statusHubunganPasien,
      ketaatan_ibadah: this.statusKetaatanIbadah,
      bahasa: this.statusBahasa,

      penurunan_berat_badan: this.statusPenurunanBB,
      jumlah_penurunan: this.jumlahPenurunan,

      kurang_asupan_makanan: this.statusAsupanMakanan,
      total_score_gizi: this.skorTotal,
      penyakit_malnutrisi: this.penyakitBeresikoMalnutrisi,
      skala_nyeri: this.skalaJatuh,
      resiko_jatuh_berjalan: this.statusCaraBerjalan,
      resiko_jatuh_duduk: this.statusDudukMenopang,
      resiko_jatuh: this.statusResiko,
    };
    this.authService.perbaharuiDataKajianAwal(body).subscribe(
      (data: any) => {
        console.log(data);
        if (data.status != "error") {
          // this.toastr.success('Data Berhasil Disimpan', 'Sukses', {
          //   timeOut: 2000
          // });
          Swal.fire({
            title: "Berhasil!",
            text: "Data berhasil diperbaharui",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
          return data;
        } else {
          Swal.fire({
            title: "Gagal!",
            text: data.err,
            icon: "error",
          });
          // this.toastr.error(data.err, 'Error')
        }
        return null;
      },
      (error: any) => {
        this.toastr.error(error.error.message, "Error");
      }
    );
  }

  skorPertanyaan1: any = 0;
  subPertanyaan1: any = "";

  skorTotal: any = this.skorPertanyaan1 + this.skorAsupanMakanan;
  onPenurunanBBChange(test: string = ""): void {
    console.log(test);
    this.statusPenurunanBB = test;
    this.skorPertanyaan1 = test.includes("Tidak yakin") ? 2 : 0;
    this.skorTotal = this.skorPertanyaan1 + this.skorAsupanMakanan;

    console.log("Jawaban terpilih : " + this.statusPenurunanBB);
    console.log("Skor pertanyaan 1 : " + this.skorPertanyaan1);
    console.log("total skor : " + this.skorTotal);
  }

  onSubPenurunanBBChange(subPenurunanBBSelected: string): void {
    console.log(subPenurunanBBSelected);
    this.jumlahPenurunan = subPenurunanBBSelected;

    if (subPenurunanBBSelected.includes("1 - 5")) {
      this.skorPertanyaan1 = 1;
    } else if (subPenurunanBBSelected.includes("6 - 10")) {
      this.skorPertanyaan1 = 2;
    } else if (subPenurunanBBSelected.includes("11 - 15")) {
      this.skorPertanyaan1 = 3;
    } else if (subPenurunanBBSelected.includes(">")) {
      this.skorPertanyaan1 = 4;
    } else {
      this.skorPertanyaan1 = 0;
    }

    console.log("skor pertanyaan 1 : " + this.skorPertanyaan1);
    this.skorTotal = this.skorPertanyaan1 + this.skorAsupanMakanan;
  }

  onAsupanMakananChange(value: string): void {
    if (value.includes("Ya")) {
      this.skorAsupanMakanan = 1;
    } else {
      this.skorAsupanMakanan = 0;
    }

    this.skorTotal = this.skorPertanyaan1 + this.skorAsupanMakanan;
  }

  onRangeChange(event: any) {
    let rangeValue = event.target.value;
    console.log("Range value : " + rangeValue);
    this.mojiDiv.nativeElement.textContent = this.mojis[rangeValue];
    this.skalaJatuh = rangeValue;
  }

  onMalnutritionRiskChange(value: string): void {
    this.penyakitBeresikoMalnutrisi = value;
  }

  addCustomUser = (term) => term;

  simpancektgl() {
    console.log(this.pipe.transform(this.myDate, "dd-MM-yyyy"));
  }
  file = new FormControl("");
  file_data: any = "";
  fileChange(event) {
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {
      const file = fileList[0];
      //get file information such as name, size and type
      console.log("finfo", file.name, file.size, file.type);
      //max file size is 4 mb
      if (file.size / 1048576 <= 4) {
        let formData = new FormData();
        let info = { id: 2, name: "raja" };
        formData.append("file", file, file.name);
        formData.append("id", "2");
        formData.append("tz", new Date().toISOString());
        formData.append("update", "2");
        formData.append("info", JSON.stringify(info));
        this.file_data = formData;

        console.log(formData);
      } else {
        this.toastr.error(
          "Berkas Foto Terlalu Besar Harus Di Bawah 4mb",
          "Eror"
        );

        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }
  upload() {
    console.log(this.file_data);
  }
  imageSrc: any = "";
  imageSrcx: any = "";
  imageSrcxx: any = "";
  status: boolean = false;
  showkkk: boolean = true;

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    const filex = fileList[0];

    if (filex.size / 1048576 <= 4) {
      this.status = false;
      const file = event.target.files[0];

      this.status = event.target.files.length > 0 ? true : false;
      if (this.status == true) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.showkkk = false;

          this.imageSrc = reader.result;
        };
      }
    } else {
      this.toastr.error("Berkas Foto Terlalu Besar Harus Di Bawah 4mb", "Eror");
    }
  }
  showkkkx: boolean = true;
  showkkkxx: boolean = true;
  showuploadd: boolean;
  showuploaddd: boolean;
  kuplab() {
    this.showuploadd = true;
    this.monitoringshowcontent = false;
  }
  kuprad() {
    this.showuploaddd = true;
    this.monitoringshowcontentx = false;
  }
  onFileChangex(event: any) {
    const fileList: FileList = event.target.files;
    const filex = fileList[0];

    if (filex.size / 1048576 <= 4) {
      this.status = false;
      const file = event.target.files[0];

      this.status = event.target.files.length > 0 ? true : false;
      if (this.status == true) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.showkkkx = false;

          this.imageSrcx = reader.result;
        };
      }
    } else {
      this.toastr.error("Berkas Foto Terlalu Besar Harus Di Bawah 4mb", "Eror");
    }
  }
  keteranganakhirxx: string = "";

  onFileChangexx(event: any) {
    const fileList: FileList = event.target.files;
    const filex = fileList[0];

    if (filex.size / 1048576 <= 4) {
      this.status = false;
      const file = event.target.files[0];

      this.status = event.target.files.length > 0 ? true : false;
      if (this.status == true) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.showkkkxx = false;

          this.imageSrcxx = reader.result;
        };
      }
    } else {
      this.toastr.error("Berkas Foto Terlalu Besar Harus Di Bawah 4mb", "Eror");
    }
  }
  submit() {
    console.log(this.imageSrc);
    //   this.http.post('http://localhost/phpapi/imageupload.php', {'image':this.imageSrc})
    //     .subscribe(res => {
    //       console.log(res);
    //       alert('Uploaded Successfully.');
    //     })
    // }
  }

  rj: number;
  far: number;
  lab: number;
  rad: number;
  emr: number;
  pcare: number;
  uploadh: number;

  hak() {
    this.authService.hakakses(this.kdcabang).subscribe(
      (data) => {
        for (let x of data) {
          this.rj = x.rj;
          this.far = x.farmasi;
          this.lab = x.lab;
          this.rad = x.rad;
          this.emr = x.emr;
          this.pcare = x.pcare;
          this.uploadh = x.upload;
          // this.kdprovider = x.kdprovider
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tpulang: any;

  statuspulangt() {
    var status;

    if (this.kdtkp === "10") {
      status = false;
    } else {
      status = true;
    }
    this.authService.statuspulang(status).subscribe((data) => {
      this.tpulang = data.response.list;
    });
  }
  showingmb: boolean = true;

  ksad() {
    this.signaturePad.clear();
  }
  uploadx() {
    this.showingmb = false;
  }
  pipe = new DatePipe("en-US");
  today: Date = new Date();
  dariklik: any;

  dataKajianAwal: any;
  ngOnInit() {
    this.onResetForm();
    this.onPenurunanBBChange();

    this.myDate = this.pipe.transform(Date.now(), "yyyy-MM-dd");
    this.myDatekon = this.pipe.transform(Date.now(), "yyyy-MM-dd");
    this.mydaterujuk = this.pipe.transform(Date.now(), "yyyy-MM-dd");
    this.myDatelab = this.pipe.transform(Date.now(), "yyyy-MM-dd");
    this.myDaterad = this.pipe.transform(Date.now(), "yyyy-MM-dd");

    this.hostName = this.hots.getHostname();

    this.URLINVOICE = "https://" + this.hostName + "/";

    this.kddokter = this.route.snapshot.paramMap.get("kddokter");
    this.dariklik = this.route.snapshot.paramMap.get("dariklik");
    this.notrans = this.route.snapshot.paramMap.get("notrans");
    this.norm = this.route.snapshot.paramMap.get("norm");

    this.nomorRekamMedis = this.norm;
    console.log(this.norm);

    //     this.username = localStorage.getItem('username');
    // this.no_rm = localStorage.getItem('noRM');
    // this.no_transaksi = localStorage.getItem('noTransaksi');
    localStorage.setItem("noRM", this.norm);
    localStorage.setItem("noTransaksi", this.notrans);

    setTimeout(() => {
      localStorage.setItem(
        "noclenic",
        JSON.stringify({
          notrans: this.notrans,
          kddokter: this.kddokter,
        })
      );
    }, 0);

    this.talergibpjs();
    this.tampildata();
    this.tampildaigtindakinput();
    this.tmpcppt();
    this.tmprjkn();
    this.tmptrans();
    this.tmpkonsul();
    this.tmpku();

    this.authService.cabangper(this.kdklinik).subscribe(
      (data) => {
        for (let x of data) {
          this.slug = x.slug;
          this.kdorg = x.kodeorg;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    // this.talergibpjs()

    setTimeout(() => {
      this.authService
        .listintruksilab(
          this.kdcabang,
          this.notrans,
          "LABORAT",
          this.notrans + this.kddokter
        )
        .subscribe(
          (data) => {
            this.tlistlab = data;
            if (data.length) {
              this.tlistlabshow = true;
            } else {
              this.tlistlabshow = false;
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
    }, 100);

    setTimeout(() => {
      this.authService
        .listintruksilab(
          this.kdcabang,
          this.notrans,
          "RADIOLOGI",
          this.notrans + this.kddokter
        )
        .subscribe(
          (data) => {
            this.tlistrad = data;
            if (data.length) {
              this.tlistradshow = true;
            } else {
              this.tlistradshow = false;
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
    }, 150);

    setTimeout(() => {
      this.authService
        .obatnonracik(this.kdcabang, this.notrans, this.notrans + this.kddokter)
        .subscribe(
          (data) => {
            if (data.length) {
              this.terapiObat = Array.prototype.map
                .call(data, (s) => s.nama)
                .toString();
              this.tlistobatn = data;
            } else {
              this.terapiObat = "obat tidak ada";
            }
          },
          (Error) => {
            console.log(Error);
          }
        );

      this.authService
        .obatracik(
          this.kdcabang,
          this.notrans,
          this.notrans + this.kddokter,
          this.nomorracik
        )
        .subscribe(
          (data) => {
            this.tlistobatr = data;
          },
          (Error) => {
            console.log(Error);
          }
        );

      this.authService
        .tmpbhp(this.kdcabang, this.notrans, this.notrans + this.kddokter)
        .subscribe(
          (data) => {
            if (data.length) {
              this.bmhp = Array.prototype.map
                .call(data, (s) => s.nama)
                .toString();
              this.tlistbhpr = data;
            } else {
              this.bmhp = "bmhp tidak";
            }
          },
          (Error) => {
            console.log(Error);
          }
        );

      //   this.authService.alergi(this.norm,this.kdcabang)
      //   .subscribe(
      //     data => {

      //       if(data){
      //         this.talergi = data;
      //         this.talergishow = true;
      //         this.tjmlhalergi = data.length

      //       }else{
      // this.talergishow = false;

      //       }

      //   },
      //     Error => {

      //      console.log(Error)
      //     }
      //   )
    }, 250);

    setTimeout(() => {
      this.klikrw();
      this.klikrwo();
      this.statuspulangt();
    }, 500);
  }

  slug: any;
  kdorg: any;

  talergibpjs() {
    this.authService.alergis("01").subscribe(
      (data) => {
        this.ttalergi = data.response.list;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.alergis("02").subscribe(
      (data) => {
        this.talergiudara = data.response.list;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.alergis("03").subscribe(
      (data) => {
        this.talergiobat = data.response.list;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.getprognosa().subscribe(
      (data) => {
        this.tprognosa = data.response.list;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tprognosa: any;

  ttalergi: any;
  talergiudara: any;
  talergiobat: any;
  tjmlhalergi: any;

  talergi: any;
  talergishow: boolean;

  tlistobatn: any;
  tlistobatr: any;
  dash: any;
  igdorrj: any;

  noasuransi: string = "";
  kdpolibpjs: string = "";
  kddokterbpjs: string = "";
  tgldaftar: any;
  tb: any = "";
  spcare: any = "";
  nokunjungan: any = "";
  skunjungan: any;
  tombollihatcetakpcare: boolean;
  tandapengenal: any = "";
  nopengenal: any = "";
  kdprovider: any = "";
  hp: any = "";
  kdkostumer: any;
  jeniskelamin: any;
  idsatusehat: any = "";
  idpasien: any = "";
  noantrianbpjs: any = "";
  pstProl: any = "";
  pstPrb: any = "";

  tampildata() {
    this.authService.datapasien(this.kdcabang, this.notrans).subscribe(
      (data) => {
        for (let x of data) {
          this.norm = x.norm;
          this.kdpoli = x.kdpoli;
          this.tglpriksa = x.tglpriksa;
          this.kdkostumerd = x.kdkostumerd;
          this.kdkostumer = x.kdkostumer;
          this.notransaksi = x.notransaksi;
          this.pasien = x.pasien;
          this.tgllahir = x.tgllahir;
          this.noantrian = x.noantrian;
          this.nampoli = x.nampoli;
          this.namdokter = x.namdokter;

          this.unitPelayanan = x.nampoli;
          this.namaPasien = x.pasien;
          this.alamatPasien = x.alamat;

          this.namacus = x.nama;
          this.costumer = x.costumer;
          this.alamat = x.alamat;
          this.kdtarif = x.kdtarif;
          this.kelas = x.kelas;
          this.umur = x.umur;
          this.dash = x.dash;
          this.ststarif = x.sts;
          this.igdorrj = x.sts;
          this.noasuransi = x.noasuransi;
          this.kdpolibpjs = x.kdpolibpjs;
          this.kddokterbpjs = x.kddokterbpjs;
          this.tgldaftar = x.tgldaftar;
          this.spcare = x.spcare;
          this.nokunjungan = x.nokunjungan;
          this.skunjungan = x.skunjungan;
          this.stspulang = x.jeniskunjungan;
          this.tandapengenal = x.tandapengenal;
          this.nopengenal = x.nopengenal;
          this.kdprovider = x.kdprovider;
          this.hp = x.hp;
          this.jeniskelamin = x.jeniskelamin;
          this.idsatusehat = x.idsatusehat;
          this.idpasien = x.idpasien;
          this.kdtkp = x.kdtkp;
          this.noantrianbpjs = x.noantrianbpjs;
          this.kddoktersatusehat = x.idhis;
          this.locationid = x.locationid;
          this.namaorangtua = x.namaorangtua;
          this.catatanpasien = x.catatanpasien;
          this.isPeriksaPkg = x.isPeriksaPkg == "Y";

          this.authService.tmpbpjs(this.noasuransi, "noka").subscribe(
            (data) => {
              if (data) {
                console.log(data.metaData.code);
                if (data.metaData.code == 200) {
                  this.kdprovider = data.response.kdProviderPst.kdProvider;
                  this.pstProl = data.response.pstProl;
                  this.pstPrb = data.response.pstPrb;

                  // Check and send pstProl data if it exists
                  if (this.pstProl && this.pstProl !== "") {
                    const prolPayload = {
                      norm: this.norm,
                      notransaksi: this.notransaksi,
                      type: "pstProl",
                      data: this.pstProl,
                    };
                    this.authService
                      .storeProlanisPrb(this.slug, prolPayload)
                      .subscribe(
                        (response) => {
                          console.log(
                            "pstProl data sent successfully:",
                            response
                          );
                        },
                        (error) => {
                          console.error("Error sending pstProl data:", error);
                        }
                      );
                  }

                  // Check and send pstPrb data if it exists
                  if (this.pstPrb && this.pstPrb !== "") {
                    const prbPayload = {
                      norm: this.norm,
                      notransaksi: this.notransaksi,
                      type: "pstPrb",
                      data: this.pstPrb,
                    };
                    this.authService
                      .storeProlanisPrb(this.slug, prbPayload)
                      .subscribe(
                        (response) => {
                          console.log(
                            "pstPrb data sent successfully:",
                            response
                          );
                        },
                        (error) => {
                          console.error("Error sending pstPrb data:", error);
                        }
                      );
                  }
                } else if (data.metaData.code == 204) {
                  // this.showloading = false;
                } else {
                  // this.toastr.error(data.response.message, 'Eror');
                  // this.showloading = false;
                }
              } else {
                this.toastr.error("Gagal Memuat Data BPJS", "Eror");
                this.showloading = false;
              }
            },
            (Error) => {
              console.log(Error);
            }
          );

          // if(x.ri === 'No'){
          //   this.kdtkp = '10';

          // }else{
          // this.kdtkp = '20';

          // }

          if (x.status === "1") {
            this.jeniskun = "true";
          } else {
            this.jeniskun = "false";
          }

          if (this.skunjungan === "1") {
            this.tombollihatcetakpcare = true;
          } else {
            this.tombollihatcetakpcare = false;
          }
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService
      .cekpasienlamadanbaru(this.norm, this.kdcabang)
      .subscribe((data) => {
        if (data.length) {
          this.statuspas = "PASIEN LAMA";
        } else {
          this.statuspas = "PASIEN LAMA";
        }
      });

    //       alert(this.dash)

    // setTimeout(() => {
    //   if(this.dash == 'BPJS'){

    //     this.showicarefarme = true;
    //     this.icare()

    //   }else{
    // this.showicarefarme = false;

    //   }
    // }, 500);
  }
  keluaricare() {
    this.showicarefarme = false;
  }
  showicarefarme: boolean;

  statuspas: any;

  tmpcpptt: any;
  showdatacppt: boolean;
  gmburl: string;
  hr: any = "";
  lingkarkepala: any = "";
  lingkarlenganatas: any = "";
  lingkarbetis: any = "";
  tdd: any = "";
  ksehatxl() {
    this.toastr.error("Form terkunci Karena Belum Langganan", "Eror");
  }
  tmpcppt() {
    this.authService.tampilcppt(this.kdcabang, this.notrans).subscribe(
      (data) => {
        // this.tmpcpptt = data;
        console.log(`data cppt ${data}`);
        if (data.length) {
          this.showdatacppt = true;
          for (let x of data) {
            this.subjek = x.subjek;
            this.td = x.td;
            this.bb = x.bb;
            this.nadi = x.nadi;
            this.suhu = x.suhu;
            this.rr = x.rr;
            this.spo = x.spo;
            this.pf = x.pf;
            this.plan = x.planing;
            this.gmburl = x.url;
            this.alergi = x.alergi;
            this.tdd = x.tdd;
            this.hr = x.hr;
            (this.rwtp = [x.rwytp]), (this.tb = x.tb);
            this.subjekp = x.subjekp;
            this.plankon = x.rencanatindakan;
            this.myDatekon = x.tglkontrol;
            this.skalanyeri = x.skalanyeri;
            this.imt = x.imt;
            this.riwayatdahulu = x.riwayatdahulu;
            this.riwayatkeluarga = x.riwayatkeluarga;
            this.lingkarkepala = x.lingkarkepala;
            this.lingkarlenganatas = x.lingkarlenganatas;
            this.lingkarbetis = x.lingkarbetis;
            (this.stspulang = x.stspulang),
              (this.alergiudara = x.alergiudara),
              (this.alergiobat = x.alergiobat),
              (this.catatandiet = x.catatandiet),
              (this.kdprognosa = x.kdprognosa),
              (this.terapinonobat = x.terapinonobat);
            this.lingkarperut = x.lp;
          }
        } else {
          this.lingkarperut = 0;
          this.stspulang = "3";
          this.alergi = "00";
          this.kdprognosa = "01";
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tlab: any;
  trad: any;

  krad() {
    this.monitoringshowcontent = false;
    this.monitoringshowcontentx = false;
    this.monitoringshowcontentrj = false;
    this.monitoringshowsakit = false;

    this.authService.riwayatradiologi(this.kdcabang, this.norm).subscribe(
      (data) => {
        this.trad = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  klab() {
    this.monitoringshowcontent = false;
    this.monitoringshowcontentx = false;
    this.monitoringshowcontentrj = false;
    this.monitoringshowsakit = false;

    this.authService.riwayatlaborat(this.kdcabang, this.norm).subscribe(
      (data) => {
        this.tlab = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  monitoringurl: SafeResourceUrl;
  monitoringurlemr: SafeResourceUrl;

  monitoringurlx: SafeResourceUrl;
  monitoringurlrj: SafeResourceUrl;
  monitoringshowcontent: boolean;
  monitoringshowcontentrj: boolean;
  monitoringshowcontentx: boolean;
  monitoringurlemrshow: boolean;
  monitoringshowsakit: boolean;
  monitoringurlsakit: SafeResourceUrl;

  ip: string = "https://demo.clenicapp.com/";

  lihatrad(notrans, kdcabang, kdproduk, status, nmfile) {
    this.monitoringshowcontentx = true;
    this.showuploaddd = false;

    if (status === "1") {
      this.monitoringurlx = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.URLINVOICE +
          "clenic/report/hasilrad.php?notransaksi=" +
          notrans +
          "&kdcabang=" +
          kdcabang +
          "&kdproduk=" +
          kdproduk
      );
    } else {
      this.monitoringurlx = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.URLINVOICE +
          "clenic/report/hasilradu.php?notransaksi=" +
          notrans +
          "&kdcabang=" +
          kdcabang +
          "&kdproduk=" +
          nmfile
      );
    }
  }
  thasillab: any = [];

  lihatlab(notrans, kdcabang, status, nmfile) {
    this.showuploadd = false;
    console.log(notrans);

    if (status === "1") {
      this.monitoringshowcontent = false;

      this.authService.tamplatelab(this.kdcabang, notrans, "L").subscribe(
        (data) => {
          this.thasillab = data;
        },
        (Error) => {
          console.log(Error);
        }
      );

      // this.monitoringurl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.URLINVOICE+'clenic/report/hasillab.php?notransaksi='+notrans+'&kdcabang='+kdcabang);
    } else {
      console.log("s");
      this.monitoringurl = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.URLINVOICE +
          "clenic/report/hasillabu.php?notransaksi=" +
          notrans +
          "&kdcabang=" +
          kdcabang +
          "&x=" +
          nmfile
      );
      this.monitoringshowcontent = true;
    }
  }

  lihatresume(notrans, norm, kdcabang) {
    this.monitoringshowcontentrj = true;

    this.monitoringurlrj = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.URLINVOICE +
        "clenic/report/resumerj.php?notrans=" +
        notrans +
        "&norm=" +
        norm +
        "&kdcabang=" +
        kdcabang
    );
  }

  lihatemr() {
    this.monitoringurlemrshow = true;

    this.monitoringurlemr = this.domSanitizer.bypassSecurityTrustResourceUrl(
      "https://fronttemprs.clenic.id/#/masuk/002000001/002000001/Wirahman/Wirahman Usman/Super Admin/002/12345"
    );
  }

  lihathd() {
    // this.monitoringshowcontenthd = true

    // this.monitoringurlhd = this.domSanitizer.bypassSecurityTrustResourceUrl('https://fronttemprs.clenic.id/#/masuk/002000001/002000001/Wirahman/Wirahman Usman/Super Admin/002/12345');

    var redirectWindow = window.open(
      "https://emrefamedika.clenicapp.com/frontend/#/masuk/" +
        this.notransaksi +
        "/" +
        this.norm +
        "/" +
        this.username +
        "/" +
        this.nama +
        "/" +
        this.akses +
        "/" +
        this.kdcabang +
        "/" +
        this.password,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes"
    );
    redirectWindow.location;

    // var redirectWindow = window.open('https://fronttemprs.clenic.id/#/masuk/'+this.notransaksi+'/'+this.norm+'/Wirahman/tes/Manajemen/002/12345', '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
    // redirectWindow.location;
  }

  monitoringshowcontenthd: boolean;
  monitoringurlhd: any;
  ktest() {}

  ksakit() {
    this.monitoringshowsakit = true;
    this.monitoringurlsakit = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.URLINVOICE +
        "clenic/report/suratsakit.php?nosurat=" +
        this.notrans +
        "&norm=" +
        this.norm +
        "&kdcabang=" +
        this.kdcabang +
        "&kddokter=" +
        this.kddokter
    );
  }
  ksehat() {
    this.monitoringshowsakit = true;
    this.monitoringurlsakit = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.URLINVOICE +
        "clenic/report/suratsehat.php?nosurat=" +
        this.notrans +
        "&norm=" +
        this.norm +
        "&kdcabang=" +
        this.kdcabang +
        "&kddokter=" +
        this.kddokter
    );
  }

  ksehatx() {
    var redirectWindow = window.open(
      "http://localhost:8011/ermkopi/partograf/popup/?notrans=RBI-22-06-136&norm=22019574",
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  diagnosa: string;
  kddiagnosa: string;
  tindakan: string;
  kdtindakan: string;

  diagnos: any;

  dignosshow: boolean;
  iddiagnosa: any = "";
  idnamadiagnosa: any = "";

  pilihdiag(kddiagnosa, diagnosa, tacc) {
    // alerttacc

    console.log(tacc);

    if (tacc == true) {
      console.log("a");
      this.alerttacc = "1";
    } else {
      console.log("ab");
      this.alerttacc = "2";
    }
    setTimeout(() => {
      let body = {
        notrans: this.notransaksi,
        diagnosa: diagnosa,
        kddiagnosa: kddiagnosa,
        kdpoli: this.kdpoli,
        kddokter: this.kddokter,
        norm: this.norm,
        status: "diagnosa",
        stssimpan: "1",
        kdcabang: this.kdcabang,
        alerttacc: this.alerttacc,
      };

      console.log(body);

      this.authService.simpandiagtindak(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });

          setTimeout(() => {
            this.tampildaigtindakinput();
          }, 400);

          this.dignosshow = false;
          this.kddiagnosa = "";
          this.diagnosa = "";
          this.kddiagnosabpjs = kddiagnosa;
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
    }, 0);

    const headers = new HttpHeaders({
      "kd-cabang": this.kdcabang,
    });
    let body = {
      data: {
        encounterId: this.idsatusehat,
        patientId: this.idpasien,
        patientNama: this.pasien,
        code: kddiagnosa,
        codeDisplay: diagnosa,
      },
    };

    this.authService.simpadiagnosass(body, headers).subscribe((response) => {
      let body = {
        stssimpan: "3",
        notransaksi: this.notransaksi,
        iddiagnosa: response.id,
      };
      this.iddiagnosa = response.id;

      this.authService.simpantoken(body).subscribe((response) => {
        this.toastr.success("Berhasil", "-", {
          timeOut: 2000,
        });
      });

      // if(response.resourceType === 'Encounter'){

      //   let bodyx={
      //     "stssimpan":'2',
      //     "token":response.id,
      //     "notransaksi":notransaksi,
      //     "norm":norm,
      //     "idpasien":idpasien
      //   }
      //   this.authService.simpantoken(bodyx)
      //   .subscribe(response => {

      //     if(response.length){

      //       this.toastr.success('Berhasil Kirim ');
      //     }

      //   }
      //   )
      // }else{

      //   console.log(response.issue[0])

      //   this.toastr.error(response.issue[0].diagnostics);
      // }
    });
  }
  tindakanicd: string = "";

  pilihtindak(kddiagnosa, diagnosa) {
    setTimeout(() => {
      let body = {
        notrans: this.notransaksi,
        diagnosa: diagnosa,
        kddiagnosa: kddiagnosa,
        kdpoli: this.kdpoli,
        kddokter: this.kddokter,
        norm: this.norm,
        status: "tindakan",
        stssimpan: "1",
        kdcabang: this.kdcabang,
      };

      console.log(body);

      this.authService.simpandiagtindak(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });

          setTimeout(() => {
            this.tampildaigtindakinput();
          }, 200);

          this.tindaksshow = false;
          this.tindaksshowicd = false;
          this.kdtindakan = "";
          this.tindakan = "";
          this.tindakanicd = "";

          if (this.idsatusehat) {
            const date = new Date();
            this.authService.procedure(
              {
                data: {
                  patientId: this.idpasien,
                  practitionerId: this.kddoktersatusehat,
                  encounterId: this.idsatusehat,
                  patientName: this.pasien,
                  encounterDescription: `kunjungan pasien ${this.pasien}`,
                  performedStartDate: date.toISOString(),
                  performedEndDate: date.toISOString(),
                  practitionerName: this.namdokter,
                  icd9Code: kddiagnosa,
                  icd9Display: diagnosa,
                  note: `kunjungan pasien ${this.pasien}`,
                },
              },
              this.satusehatheaders
            );
          }
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
    }, 0);
  }
  senditx() {
    setTimeout(() => {
      let body = {
        notrans: this.notransaksi,
        diagnosa: this.tindakanicd,
        kddiagnosa: this.kdtindakan,
        kdpoli: this.kdpoli,
        kddokter: this.kddokter,
        norm: this.norm,
        status: "tindakan",
        stssimpan: "1",
        kdcabang: this.kdcabang,
      };

      console.log(body);

      this.authService.simpandiagtindak(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });

          setTimeout(() => {
            this.tampildaigtindakinput();
          }, 200);

          this.tindaksshow = false;
          this.kdtindakan = "";
          this.tindakanicd = "";
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
    }, 0);
  }
  klikobatrd(notransaksi, norm, kdpoli) {
    this.authService.rwtobatd(this.kdcabang, this.norm, notransaksi).subscribe(
      (data) => {
        this.tobatad = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tobata: any;
  tobatad: any;
  jumlahobat: any = 0;
  listrwtkunjungan: any;

  getriwayatkunjungan() {
    this.showloadingper = true;

    this.authService.getriwayatkunjungan(this.noasuransi).subscribe(
      (data) => {
        if (data.metaData.code == 200) {
          this.showloadingper = false;

          this.listrwtkunjungan = data.response.list;
        } else {
          this.listrwtkunjungan = [];
          this.toastr.error(data.metaData.message);
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  klikrwo() {
    this.authService.rwtobat(this.kdcabang, this.norm).subscribe(
      (data) => {
        this.tobata = data;
        this.jumlahobat = data.length;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tdiag: any;
  ttindak: any;
  showmunculdiagjudul: boolean;
  alerttacc: any;

  tampildaigtindakinput() {
    this.authService
      .diagnosatmp(this.kdcabang, this.notrans, "diagnosa")
      .subscribe(
        (data) => {
          var xyz: number = 0;

          if (data.length) {
            for (let x of data) {
              this.iddiagnosa = x.iddiagnosa;
              this.idnamadiagnosa = x.diagnosa;
              console.log(x.diag);

              if (x.diag === null) {
                this.alerttacc = "0";
              } else {
                this.alerttacc = "1";
              }
            }

            this.tdiag = data;
            this.showmunculdiagjudul = true;
          } else {
            this.showmunculdiagjudul = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService
      .diagnosatmp(this.kdcabang, this.notrans, "tindakan")
      .subscribe(
        (data) => {
          if (data.length) {
            this.ttindak = data;
            this.ttindakshow = true;
          } else {
            this.ttindakshow = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  ttindakshow: boolean;

  sendit(a) {
    console.log(a);

    this.toastr.error("harus pakai icd tidak boleh free text");
    // setTimeout(() => {
    //   let body = {
    //     "notrans":this.notransaksi,"diagnosa":this.diagnosa,"kddiagnosa":this.kddiagnosa,"kdpoli":this.kdpoli,"kddokter":this.kddokter,
    //     "norm":this.norm,"status":'diagnosa',"stssimpan":'1',"kdcabang":this.kdcabang
    //   }

    //     console.log(body)

    //   this.authService.simpandiagtindak(body)
    //   .subscribe(response => {

    //     if(response ){
    //       this.toastr.success(''+response, 'Sukses', {
    //         timeOut: 2000,
    //       });

    // setTimeout(() => {
    //   this.tampildaigtindakinput()

    // }, 200);

    //       this.dignosshow = false;
    //       this.kddiagnosa ='';
    //       this.diagnosa='';

    //      }else{
    //       this.toastr.error('Simpan  Gagal', 'Eror');

    //      }

    //   })

    // }, 0);
  }

  diagnose: any;

  caridiagedit(a) {
    if (this.form1.value.gender === "Kode") {
      if (a.target.value === "") {
      } else {
        this.authService.caridiagnosa(a.target.value, "3").subscribe((data) => {
          this.diagnose = data;
        });
      }
    } else if (this.form1.value.gender === "Diagnosa") {
      if (a.target.value === "") {
      } else {
        this.authService.caridiagnosa(a.target.value, "2").subscribe((data) => {
          this.diagnose = data;
        });
      }
    } else {
      if (a.target.value === "") {
      } else {
        this.authService.caridiagnosa(a.target.value, "2").subscribe((data) => {
          this.diagnose = data;
        });
      }
    }

    // this.authService.caridiagnosa(a.target.value,'2')
    // .subscribe(data => {
    //   this.diagnose = data;

    // })
  }
  caridiag(a) {
    // console.log(this.form.value.gender)
    if (a.target.value === "") {
      this.dignosshow = false;
    } else {
      this.authService.caridiagnosaa(a.target.value).subscribe((data) => {
        if (data.metaData.code == 200) {
          this.diagnose = data.response.list;
          this.dignosshow = true;
        } else {
          this.dignosshow = false;
        }
      });
    }

    // if(this.form.value.gender === 'Kode'){

    //   if(a.target.value === ''){
    //     this.dignosshow = false;

    //   }else{
    //     this.dignosshow = true;

    //     this.authService.caridiagnosa(a.target.value,'3')
    //     .subscribe(data => {
    //       this.diagnos = data;

    //     })
    //   }
    // }else if(this.form.value.gender === 'Diagnosa'){

    //   if(a.target.value === ''){
    //     this.dignosshow = false;

    //   }else{
    //     this.dignosshow = true;

    //     this.authService.caridiagnosa(a.target.value,'2')
    //     .subscribe(data => {
    //       this.diagnos = data;

    //     })
    //   }

    // }else{
    //   if(a.target.value === ''){
    //     this.dignosshow = false;

    //   }else{
    //     this.dignosshow = true;

    //     this.authService.caridiagnosa(a.target.value,'2')
    //     .subscribe(data => {
    //       this.diagnos = data;

    //     })
    //   }

    // }
  }

  tindak: any;
  tindaksshow: boolean;
  tindaktarif: any;

  caritindakan(a) {
    console.log(a.target.value);
    if (a.target.value === "") {
      this.tindaksshow = false;
    } else {
      this.tindaksshow = true;
      if (this.ststarif === "igd") {
        this.ststarif = "IGD";
      } else {
        this.ststarif = "RJ";
      }
      this.authService
        .listtarif(this.kdcabang, this.ststarif, a.target.value, this.kdtarif)
        .subscribe(
          (data) => {
            this.tindaktarif = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
      // this.authService.caritindakan(a.target.value,'2')
      // .subscribe(data => {
      //   this.tindak = data;

      // })
    }
  }
  tindaksshowicd: boolean;

  caritindakanicd(a) {
    if (a.target.value === "") {
      this.tindaksshowicd = false;
    } else {
      this.tindaksshowicd = true;

      if (this.form2.value.gender === "Kode") {
        this.authService.caritindakan(a.target.value, "3").subscribe((data) => {
          this.tindak = data;
        });
      } else {
        this.authService.caritindakan(a.target.value, "2").subscribe((data) => {
          this.tindak = data;
        });
      }
    }
  }

  hapusdiag(notrans, no, diagnosa) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus",
        text: "Hapus  " + diagnosa,

        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          setTimeout(() => {
            let body = {
              notrans: notrans,
              no: no,
              diagnosa: this.diagnosa,
              kddiagnosa: this.kddiagnosa,
              kdpoli: this.kdpoli,
              kddokter: this.kddokter,
              norm: this.norm,
              status: "diagnosa",
              stssimpan: "2",
              kdcabang: this.kdcabang,
            };

            this.authService.simpandiagtindak(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.tampildaigtindakinput();
                }, 200);
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          }, 0);

          // swalWithBootstrapButtons.fire(
          //   'Berhasil Hapus User',
          //   'User Telah Terhapus Dari Database.',
          //   'success'
          // );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  tsubjek: any;
  showtsubjek: boolean;

  carisubjek(a) {
    if (a.length >= 10) {
      console.log("tutupnet");
      this.showtsubjek = false;
    } else {
      if (a === "") {
        this.showtsubjek = false;
      } else {
        this.showtsubjek = true;
        this.authService
          .tamplateos(this.kdcabang, this.kduser, "1", a)
          .subscribe(
            (data) => {
              this.tsubjek = data;
            },
            (Error) => {
              console.log(Error);
            }
          );
      }

      console.log("bukanet");
    }
  }

  pilihsub(details) {
    this.subjek = details;
    this.showtsubjek = false;
  }

  pilihpf(details) {
    this.pf = details;
    this.showtpf = false;
  }

  showtpf: boolean;
  tpf: any;

  caripf(a) {
    if (a.length >= 10) {
      console.log("tutupnet");
      this.showtpf = false;
    } else {
      if (a === "") {
        this.showtpf = false;
      } else {
        this.showtpf = true;
        this.authService
          .tamplateos(this.kdcabang, this.kduser, "2", a)
          .subscribe(
            (data) => {
              this.tpf = data;
            },
            (Error) => {
              console.log(Error);
            }
          );
      }

      console.log("bukanet");
    }
  }

  gigi: any;
  progress: boolean | number = false;

  startLoading() {
    this.progress = 0; // starts spinner

    setTimeout(() => {
      this.progress = 0.5; // sets progress bar to 50%

      setTimeout(() => {
        this.progress = 1; // sets progress bar to 100%

        setTimeout(() => {
          this.progress = false; // stops spinner
        }, 200);
      }, 500);
    }, 400);
  }
  showloading: boolean;
  lingkarperut: any = 0;
  kirimpcaredaftar() {
    if (this.akses === "Perawat") {
      // let body={"data":{
      //   "tanggalperiksa": this.tglpriksa,
      //     "kodepoli": this.kdpolibpjs,
      //     "nomorkartu": this.noasuransi,
      //     "status": 2 ,
      //     "waktu":this.myDatedaf.getTime()
      //   }}

      //     this.authService.panggil(body)
      //     .subscribe(response => {

      //       if(response.metadata.code == 200){

      //         this.toastr.success(response.metadata.message, 'Sukses', {
      //           timeOut: 2000,
      //         });

      //       }else{
      //         this.toastr.error(response.metadata.message, 'Error');

      //       }

      //     })

      setTimeout(() => {
        let body = {
          data: {
            kdProviderPeserta: this.kdprovider,
            tglDaftar: this.tglpriksa,
            noKartu: this.noasuransi,
            kdPoli: this.kdpolibpjs,
            keluhan: this.subjekp,
            kunjSakit: this.jeniskun,
            sistole: parseInt(this.td),
            diastole: parseInt(this.tdd),
            beratBadan: parseInt(this.bb),
            tinggiBadan: parseInt(this.tb),
            respRate: parseInt(this.spo),
            lingkarPerut: this.lingkarperut,
            heartRate: parseInt(this.hr),
            rujukBalik: 0,
            kdTkp: this.kdtkp,
          },
        };

        this.authService.simpanpcaredaftar(body).subscribe((response) => {
          if (response) {
            if (response.metaData.code == 201) {
              this.toastr.success("Berhasil Kirim PCare", "-", {
                timeOut: 2000,
              });

              this.showloading = false;

              let body = {
                notransaksi: this.notransaksi,
                stssimpan: "1",
                noantrian: response.response.message,
                kdtkp: this.kdtkp,
                jeniskun: this.jeniskun,
              };

              this.authService.updatepcare(body).subscribe((response) => {});

              this.modalService.dismissAll();
            } else if (response.metaData.code == 412) {
              this.toastr.error(
                response.response.field + response.response.message,
                "Eror"
              );

              this.showloading = false;
            } else {
              this.toastr.error(response.metaData.message, "Eror");

              this.showloading = false;
            }
          } else {
            this.toastr.error("Simpan  Gagal", "Eror");

            this.showloading = false;
          }
        });
      }, 500);
    }
  }
  simpan() {
    console.log("obat" + this.terapiObat);
    console.log("nonobat" + this.terapinonobat);
    console.log("bmhp" + this.bmhp);
    console.log("obatst" + this.stspulang);

    // ------
    if (this.bb === "") {
      // this.bb = 0
      this.toastr.error("bb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.td === "") {
      // this.td = 0
      this.toastr.error("Sistole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tdd === "") {
      // this.tdd = 0
      this.toastr.error("diastole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tb === "") {
      // this.tb = 0
      this.toastr.error("Tb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.rr === "") {
      // this.rr = 0
      this.toastr.error("rr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.hr === "") {
      // this.hr = 0
      this.toastr.error("hr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.suhu === "") {
      this.toastr.error("Suhu harus di isi", "Eror");

      return;
    }
    if (this.alergi === "") {
      this.toastr.error("alergi makanan harus di isi", "Eror");

      return;
    }

    // this.kirimpcaredaftar()

    if (this.pcare == 1) {
      if (this.dash === "BPJS") {
        this.diagnosaambilpcareall();
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Simpan CPPT",
            text: "Apakah Anda Akan Menyimpan Dan Mengirim Resume Ke PCare",

            showCancelButton: true,
            confirmButtonText: "Ya,Kirim",
            cancelButtonText: "Tidak,Hanya Simpan",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.value) {
              if (this.akses === "Perawat") {
                setTimeout(() => {
                  let body = {
                    data: {
                      kdProviderPeserta: this.kdprovider,
                      tglDaftar: this.tglpriksa,
                      noKartu: this.noasuransi,
                      kdPoli: this.kdpolibpjs,
                      keluhan: this.subjekp,
                      kunjSakit: this.jeniskun,
                      sistole: parseInt(this.td),
                      diastole: parseInt(this.tdd),
                      beratBadan: parseInt(this.bb),
                      tinggiBadan: parseInt(this.tb),
                      respRate: parseInt(this.spo),
                      lingkarPerut: this.lingkarperut,
                      heartRate: parseInt(this.hr),
                      rujukBalik: 0,
                      kdTkp: this.kdtkp,
                    },
                  };

                  this.authService
                    .simpanpcaredaftar(body)
                    .subscribe((response) => {
                      if (response) {
                        if (response.metaData.code == 201) {
                          this.toastr.success("Berhasil Kirim PCare", "-", {
                            timeOut: 2000,
                          });

                          this.showloading = false;

                          this.simpanambil();

                          let body = {
                            notransaksi: this.notransaksi,
                            stssimpan: "1",
                            noantrian: response.response.message,
                            kdtkp: this.kdtkp,
                            jeniskun: this.jeniskun,
                          };

                          this.authService
                            .updatepcare(body)
                            .subscribe((response) => {});

                          this.modalService.dismissAll();
                        } else if (response.metaData.code == 412) {
                          this.toastr.error(
                            "Gagal simpan : " +
                              response.response.field +
                              response.response.message,
                            "Eror"
                          );

                          this.showloading = false;
                        } else {
                          this.toastr.error(response.metaData.message, "Eror");

                          this.showloading = false;
                        }
                      } else {
                        this.toastr.error("Simpan  Gagal", "Eror");

                        this.showloading = false;
                      }
                    });
                }, 500);
              } else {
                if (this.subjek === "") {
                  this.toastr.error(
                    "Keluhan harus di isi agar terkirim ke pcare",
                    "Eror"
                  );

                  return;
                }

                if (this.terapinonobat === "") {
                  this.toastr.error(
                    "terapi non obat tidak boleh kosong atau isi - apabila tidak ada",
                    "Eror"
                  );
                  return;
                }
                // if(this.terapiObat === ''){
                //   this.toastr.error('terapi obat tidak boleh kosong atau isi - apabila tidak ada', 'Eror');
                //   return
                // }

                if (this.kdprognosa === "") {
                  this.toastr.error("kd Prognosa harus di pilih", "Eror");

                  return;
                }

                if (this.skunjungan === "1") {
                  // alert("adasxxxxooo")

                  console.log("update");

                  if (this.stspulang === "4") {
                    // this.kirimpcarerujukedit()
                    // alert("asdasd4");

                    if (this.tiperujuk === "01") {
                      this.kirimpcarerujukedit();
                      // alert("asdasd5");
                      // this.simpanambil()
                    } else {
                      // alert("asdasd6");
                      this.kirimpcarerujukkhususedit();
                      // this.simpanambil()
                    }
                  } else {
                    this.kirimpcareedit();
                    // this.simpanambil()
                  }
                } else {
                  console.log("kirimbaru");
                  // alert("asdasdxxxx");

                  if (this.stspulang === "4") {
                    console.log("rujuk");
                    // this.kirimpcarerujuk()

                    if (this.tiperujuk === "01") {
                      console.log("rujuksp");

                      this.kirimpcarerujuk();
                      // this.simpanambil()
                    } else {
                      console.log("rujukkhusu");
                      this.kirimpcarerujukkhusus();
                      // this.simpanambil()
                    }
                  } else {
                    console.log("nonrujuk");

                    this.kirimpcare();
                    // this.simpanambil()
                  }
                }
              }
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              this.simpanambil();

              // swalWithBootstrapButtons.fire(
              //   'Cancelled',
              //   'Your imaginary file is safe :)',
              //   'error'
              // );
            }
          });

        // akhir

        // let body={
        //   "tanggalperiksa": this.tglpriksa,
        //     "kodepoli": this.kdpolibpjs,
        //     "nomorkartu": this.noasuransi,
        //     "status": 1 }

        // this.authService.updateantrian(body)
        // .subscribe(response => {

        //   if(response.data.code == 200){

        //     this.toastr.success(response.data.message, 'Sukses', {
        //       timeOut: 2000,
        //     });

        //   }else{
        //     this.toastr.error(response.data.message, 'Error');

        //   }

        // })

        this.simpanambil();
      } else {
        this.simpanambil();
      }
    } else {
      this.simpanambil();
    }
  }

  subjekp: string = "";
  simpanss() {
    const headers = new HttpHeaders({
      "kd-cabang": this.kdcabang,
    });
    let body = {
      data: {
        diagnosis: [
          {
            conditionId: this.iddiagnosa,
            conditionDisplay: this.idnamadiagnosa,
            rank: 1,
          },
        ],
      },
    };

    if (this.idsatusehat) {
      this.authService
        .simpaakhirss(body, headers, this.idsatusehat)
        .subscribe((response) => {
          console.log(response);
        });

      this.simpanSatusehat();
    }
  }

  async simpanSatusehat() {
    const date = new Date();

    // observation
    let observationResponse: any = await this.authService.observation(
      {
        data: {
          patientId: this.idpasien,
          practitionerId: this.kddoktersatusehat,
          encounterId: this.idsatusehat,
          encounterDescription: this.subjekp,
          effectiveDateTime: date.toISOString(),
          issuedDate: date.toISOString(),
          heartRate: this.hr,
          responsiveness: this.kesadaran,
          bodyTemperature: this.suhu,
          respiratoryRate: this.rr,
          systolic: this.td,
          diastolic: this.tdd,
          hemoglobinSaturationOxygen: this.spo,
          bodyHeight: this.tb,
          bodyWeight: this.bb,
          bodyMassIndex: this.imt,
        },
      },
      this.satusehatheaders
    );

    // rencana tindak lanjut
    this.authService.carePlan(
      {
        data: {
          careplanUUID: `${this.generateUUID()}`,
          title: `rencana tindak lanjut pasien ${this.pasien}`,
          description: `rencana tindak lanjut pasien ${this.pasien}`,
          patientName: this.pasien,
          encounterId: this.idsatusehat,
          patientId: this.idpasien,
          practitionerId: this.kddoktersatusehat,
          practitionerName: this.namdokter,
          date: new Date(this.myDatekon).toISOString(),
        },
      },
      this.satusehatheaders
    );

    // resume diet
    this.authService.composition(
      {
        data: {
          orgId: this.kdorg,
          patientId: this.idpasien,
          patientName: this.pasien,
          encounterId: this.idsatusehat,
          encounterDescription: this.subjek,
          practitionerId: this.kddoktersatusehat,
          practitionerName: this.namdokter,
          date: date.toISOString(),
          tittle: `diet untuk pasien ${this.pasien}`,
          tambahan: `diet untuk pasien ${this.pasien}`,
          system: "http://loinc.org",
          code: "42344-2",
          display: this.catatandiet || "Discharge diet (narrative)",
        },
      },
      this.satusehatheaders
    );

    // alergi
    this.authService.allergyIntolerance(
      {
        data: {
          orgId: this.kdorg,
          patientId: this.idpasien,
          patientName: this.pasien,
          encounterId: this.idsatusehat,
          encounterDescription: this.subjek,
          practitionerId: this.kddoktersatusehat,
          practitionerName: this.namdokter,
          recordedDate: date.toISOString(),
          description: `alergi makanan : ${this.alergi}`,
        },
      },
      this.satusehatheaders
    );
    this.authService.allergyIntolerance(
      {
        data: {
          orgId: this.kdorg,
          patientId: this.idpasien,
          patientName: this.pasien,
          encounterId: this.idsatusehat,
          encounterDescription: this.subjek,
          practitionerId: this.kddoktersatusehat,
          practitionerName: this.namdokter,
          recordedDate: date.toISOString(),
          description: `alergi udara : ${this.alergiudara}`,
        },
      },
      this.satusehatheaders
    );
    this.authService.allergyIntolerance(
      {
        data: {
          orgId: this.kdorg,
          patientId: this.idpasien,
          patientName: this.pasien,
          encounterId: this.idsatusehat,
          encounterDescription: this.subjek,
          practitionerId: this.kddoktersatusehat,
          practitionerName: this.namdokter,
          recordedDate: date.toISOString(),
          description: `alergi obat : ${this.alergiobat}`,
        },
      },
      this.satusehatheaders
    );

    // Service Request
    let serviceRequest: any = await this.authService.serviceRequest(
      {
        data: {
          orgId: this.kdorg,
          keteranganTindakLanjut: `rencana tindak lanjut pasien ${this.pasien}`,
          patientId: this.idpasien,
          patientName: this.pasien,
          encounterId: this.idsatusehat,
          encounterDescription: `rencana tindak lanjut pasien ${this.pasien}`,
          occurrenceDateTime: date.toISOString(),
          authoredOnDate: date.toISOString(),
          requesterPractitionerId: this.kddoktersatusehat,
          requesterPractitionerName: this.namdokter,
          performerPractitionerId: this.kddoktersatusehat,
          performerPractitionerName: this.namdokter,
          diagnosaKode: "C76.2",
          diagnosaDisplay: "Abdomen",
          alasanTindakLanjut: `rencana tindak lanjut pasien ${this.pasien}`,
          locationId: this.locationid,
          locationName: "pkm",
          instruksi: `rencana tindak lanjut pasien ${this.pasien}`,
        },
      },
      this.satusehatheaders
    );

    // Diagnostic Report
    let diagnosticReport: any = await this.authService.diagnosticReport(
      {
        data: {
          orgId: this.kdorg,
          serviceRequestId: serviceRequest.id,
          patientId: this.idpasien,
          patientName: this.pasien,
          encounterId: this.idsatusehat,
          encounterDescription: this.subjek,
          effectiveDate: date.toISOString(),
          issuedDate: date.toISOString(),
          practitionerId: this.kddoktersatusehat,
          observationId: observationResponse.id,
        },
      },
      this.satusehatheaders
    );

    // Questionnaire Response
    await this.authService.questionnaireResponse(
      {
        data: {
          patientId: this.idpasien,
          patientName: this.pasien,
          encounterId: this.idsatusehat,
          practitionerId: this.kddoktersatusehat,
          dateNow: date.toISOString(),
          statusKeluarga: this.kondisiKeluarga,
        },
      },
      this.satusehatheaders
    );

    // clinical impression
    this.authService.clinicalImpression(
      {
        data: {
          orgId: this.kdorg,
          patientId: this.idpasien,
          patientName: this.pasien,
          encounterId: this.idsatusehat,
          encounterDescription: this.subjek,
          practitionerId: this.kddoktersatusehat,
          practitionerName: this.namdokter,
          recordedDate: date.toISOString(),
          description: `alergi obat : ${this.alergiobat}`,
          effectiveDate: date.toISOString(),
          date: date.toISOString(),
          conditionId: "877b68e2-186c-499e-b788-d27cc244fe88",
          diagnosticReportId: diagnosticReport.id,
          observationId: observationResponse.id,
          summary: this.subjek,
        },
      },
      this.satusehatheaders
    );
  }
  getSelectedOptionText(event: Event, model: any) {
    let selectElementText =
      event.target["options"][event.target["options"].selectedIndex].text;
    eval(`this.${model} = '${selectElementText}'`);
    eval(`console.log(this.${model})`);
  }
  simpanambil() {
    this.progress = 0; // starts spinner

    var dari: any;

    if (this.dariklik === "dokter") {
      dari = "0";
    } else {
      dari = "1";
    }

    let body = {
      alergi: this.alergi,
      dari: dari,
      subjekp: this.subjekp,
      kdcabang: this.kdcabang,
      kduser: this.kduser,
      notrans: this.notrans,
      norm: this.norm,
      kdpoli: this.kdpoli,
      kddokter: this.kddokter,
      stssimpan: "1",
      subjek: this.subjek,
      td: this.td,
      bb: this.bb,
      nadi: this.nadi,
      suhu: this.suhu,
      rr: this.rr,
      spo: this.spo,
      pf: this.pf,
      planing: this.plan,
      tdd: this.tdd,
      hr: this.hr,
      rwytp: this.rwtp,
      gigi: this.gigi,
      tb: this.tb,
      lingkarkepala: this.lingkarkepala,
      lingkarlenganatas: this.lingkarlenganatas,
      lingkarbetis: this.lingkarbetis,
      hakakses: this.akses,
      tglkontrol: this.myDatekon,
      rencanatindakan: this.plankon,
      stspulang: this.stspulang,
      skalanyeri: this.skalanyeri,
      imt: this.imt,
      riwayatdahulu: this.riwayatdahulu,
      riwayatkeluarga: this.riwayatkeluarga,
      alergiudara: this.alergiudara,
      alergiobat: this.alergiobat,
      terapiObat: this.terapiObat,
      terapinonobat: this.terapinonobat,
      lingkarperut: this.lingkarperut,
      kdprognosa: this.kdprognosa,
      bmhp: this.bmhp,
      catatandiet: this.catatandiet,
    };

    console.log(body);

    setTimeout(() => {
      this.progress = 0.5; // sets progress bar to 50%

      this.authService.simpancppt(body).subscribe((response) => {
        setTimeout(() => {
          this.progress = 1; // sets progress bar to 100%

          if (response) {
            this.toastr.success("Sukses", "Sukses", {
              timeOut: 2000,
            });

            setTimeout(() => {
              this.progress = false; // stops spinner
            }, 200);

            console.log(response);

            if ((response.metadata.messagexx = 1)) {
              this.authService
                .obatnonracik(
                  this.kdcabang,
                  this.notrans,
                  this.notrans + this.kddokter
                )
                .subscribe(
                  (data) => {
                    if (data.length) {
                      this.terapiObat = Array.prototype.map
                        .call(data, (s) => s.nama)
                        .toString();
                      this.chatService.sendMessage([
                        {
                          antrian: "0",
                          kddokter: "Farmasi",
                          namadokter: "Farmasi",
                          kdantrian: "A",
                          kdcabang: this.kdcabang,
                        },
                      ]);
                    } else {
                      this.terapiObat = "tidak ada obat";
                    }
                  },
                  (Error) => {
                    console.log(Error);
                  }
                );
            }
          } else {
            this.toastr.error("Simpan  Gagal", "Eror");
          }
        }, 500);
      });
    }, 400);

    this.simpankeadaaanfisik();
    this.simpanss();
  }

  terapinonobat: string = "tidak ada";
  terapiObat: string = "tidak ada";
  bmhp: string = "tidak ada";
  kirimpcare() {
    if (this.bb === "") {
      this.bb = 0;
      this.toastr.error("bb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.td === "") {
      this.td = 0;
      this.toastr.error("Sistole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tdd === "") {
      this.tdd = 0;
      this.toastr.error("diastole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tb === "") {
      this.tb = 0;
      this.toastr.error("Tb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.rr === "") {
      this.rr = 0;
      this.toastr.error("rr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.hr === "") {
      this.hr = 0;
      this.toastr.error("hr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.subjek === "") {
      this.toastr.error("Keluhan harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kddiagnosabpjs === "") {
      this.toastr.error("Diagnosa harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kdprognosa === "") {
      this.toastr.error("kd Prognosa harus di pilih", "Eror");

      return;
    }

    if (this.suhu === "") {
      this.toastr.error("Suhu harus di isi", "Eror");

      return;
    }
    if (this.alergi === "") {
      this.toastr.error("alergi makanan harus di isi", "Eror");

      return;
    }

    if (this.stspulang === "") {
      this.toastr.error("Status Pulang harus diisi", "Eror");

      return;
    }
    let body = {
      data: {
        noKunjungan: null,
        noKartu: this.noasuransi,
        tglDaftar: this.tgldaftar,
        kdPoli: this.kdpolibpjs,
        keluhan: this.subjek,
        kdSadar: this.kesadaran,

        sistole: parseInt(this.td),
        diastole: parseInt(this.tdd),
        beratBadan: parseInt(this.bb),
        tinggiBadan: parseInt(this.tb),
        respRate: parseInt(this.rr),
        heartRate: parseInt(this.hr),
        lingkarPerut: parseInt(this.lingkarperut),

        kdStatusPulang: this.stspulang,
        tglPulang: this.pipe.transform(this.myDate, "dd-MM-yyyy"),
        kdDokter: this.kddokterbpjs,
        kdDiag1: this.kddiagnosabpjs,
        kdDiag2: this.kddiagnosabpjs2,
        kdDiag3: this.kddiagnosabpjs3,
        kdPoliRujukInternal: this.kdpolibpjsinternal,

        rujukLanjut: {
          tglEstRujuk: null,
          kdppk: null,
          subSpesialis: null,
          khusus: {
            kdKhusus: null,
            kdSubSpesialis: null,
            catatan: null,
          },
        },
        kdTacc: this.kdtacc,
        alasanTacc: this.alasantacc,
        anamnesa: this.subjek,
        alergiMakan: this.alergi,
        alergiUdara: this.alergiudara,
        alergiObat: this.alergiobat,
        kdPrognosa: this.kdprognosa,
        terapiObat: this.terapiObat,
        terapiNonObat: this.terapinonobat,
        bmhp: this.bmhp,
        suhu: parseInt(this.suhu),
      },
    };

    console.log(body);

    this.authService
      .addkunjungan(body)
      .pipe(shareReplay(1))
      .subscribe((response) => {
        if (response.metaData.code == 412) {
          for (let x of response.response) {
            this.toastr.error(x.field + " " + x.message, "Eror");
          }
        } else if (response.metaData.code == 201) {
          for (let y of response.response) {
            let body = {
              notransaksi: this.notransaksi,
              stssimpan: "2",
              nokunjungan: y.message,
              kdpoli: this.kdpoli,
              kddokter: this.kddokter,
              jeniskunjungan: this.stspulang,
              username: this.username,
            };

            this.authService.updatepcare(body).subscribe((response) => {
              if (response) {
                this.toastr.success(
                  "",
                  "Berhasil Kirim Kunjungan" + this.stspulang,
                  {
                    timeOut: 2000,
                  }
                );
              }
            });
          }

          setTimeout(() => {
            // this.tombollihatcetakpcare=true
            this.tampildata();
          }, 200);

          setTimeout(() => {
            this.authService
              .listobatkirimpcare(this.kdcabang, this.notrans)
              .subscribe((data) => {
                for (let x of data) {
                  let bodyx = {
                    data: {
                      kdObatSK: 0,
                      noKunjungan: this.nokunjungan,
                      racikan: false,
                      kdRacikan: null,
                      obatDPHO: true,
                      kdObat: x.kdobatbpjs,
                      signa1: x.frekuensi,
                      signa2: x.jmlpakai,
                      jmlObat: x.qty,
                      jmlPermintaan: x.frekuensi,
                      nmObatNonDPHO: "Obat klinik",
                    },
                  };

                  console.log(bodyx);

                  this.authService
                    .simpanobatbpjs(bodyx)
                    .subscribe((response) => {
                      console.log(response);
                      console.log(response.response[0].message);
                      console.log(response.response[1].message);

                      if (response.metaData.code == 201) {
                        let bodyeditfarmasi = {
                          stssimpan: "1",
                          notransaksi: this.notransaksi,
                          kdObatSK: response.response[0].message,
                          kdRacikan: response.response[1].message,
                          kdpruduk: x.kdobat,
                        };

                        this.authService
                          .editobatsk(bodyeditfarmasi)
                          .subscribe((response) => {
                            console.log(response);
                          });
                      } else {
                      }
                    });
                }
              });
          }, 1500);

          this.simpanambil();
        } else {
          this.toastr.error(response.metaData.message, "Eror");
        }
      });
  }

  kirimpcarerujuk() {
    if (this.bb === "") {
      this.bb = 0;
      this.toastr.error("bb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.td === "") {
      this.td = 0;
      this.toastr.error("Sistole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tdd === "") {
      this.tdd = 0;
      this.toastr.error("diastole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tb === "") {
      this.tb = 0;
      this.toastr.error("Tb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.rr === "") {
      this.rr = 0;
      this.toastr.error("rr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.hr === "") {
      this.hr = 0;
      this.toastr.error("hr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.subjek === "") {
      this.toastr.error("Keluhan harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kddiagnosabpjs === "") {
      this.toastr.error("Diagnosa harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kodeppk === "") {
      this.toastr.error("anda belum memilih faskes rujukan", "Eror");

      return;
    }
    if (this.kdprognosa === "") {
      this.toastr.error("kd Prognosa harus di pilih", "Eror");

      return;
    }

    if (this.suhu === "") {
      this.toastr.error("Suhu harus di isi", "Eror");

      return;
    }
    if (this.alergi === "") {
      this.toastr.error("alergi makanan harus di isi", "Eror");

      return;
    }
    if (this.stspulang === "") {
      this.toastr.error("Status Pulang harus diisi", "Eror");

      return;
    }
    let body = {
      data: {
        noKunjungan: null,
        noKartu: this.noasuransi,
        tglDaftar: this.tgldaftar,
        kdPoli: this.kdpolibpjs,
        keluhan: this.subjek,
        kdSadar: this.kesadaran,

        sistole: parseInt(this.td),
        diastole: parseInt(this.tdd),
        beratBadan: parseInt(this.bb),
        tinggiBadan: parseInt(this.tb),
        respRate: parseInt(this.rr),
        heartRate: parseInt(this.hr),
        lingkarPerut: parseInt(this.lingkarperut),

        kdStatusPulang: this.stspulang,
        tglPulang: this.pipe.transform(this.myDate, "dd-MM-yyyy"),
        kdDokter: this.kddokterbpjs,
        kdDiag1: this.kddiagnosabpjs,
        kdDiag2: this.kddiagnosabpjs2,
        kdDiag3: this.kddiagnosabpjs3,
        kdPoliRujukInternal: null,
        rujukLanjut: {
          kdppk: this.kodeppk,
          tglEstRujuk: this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy"),
          subSpesialis: {
            kdSubSpesialis1: this.sspesialis,
            kdSarana: this.nsarana,
          },
          khusus: null,
        },
        kdTacc: this.kdtacc,
        alasanTacc: this.alasantacc,
        anamnesa: this.subjek,
        alergiMakan: this.alergi,
        alergiUdara: this.alergiudara,
        alergiObat: this.alergiobat,
        kdPrognosa: this.kdprognosa,
        terapiObat: this.terapiObat,
        terapiNonObat: this.terapinonobat,
        bmhp: this.bmhp,
        suhu: parseInt(this.suhu),
      },
    };

    console.log(body);

    this.authService
      .addkunjungan(body)
      .pipe(shareReplay(1))
      .subscribe(
        (response) => {
          if (response.metaData.code == 412) {
            for (let x of response.response) {
              this.toastr.error(x.field + " " + x.message, "Eror");
            }
          } else if (response.metaData.code == 201) {
            for (let y of response.response) {
              let body = {
                notransaksi: this.notransaksi,
                stssimpan: "2",
                nokunjungan: y.message,
                kdpoli: this.kdpoli,
                kddokter: this.kddokter,
                jeniskunjungan: this.stspulang,
                username: this.username,
              };

              this.authService.updatepcare(body).subscribe((response) => {
                if (response) {
                  this.toastr.success(
                    "",
                    "Berhasil Kirim Kunjungan" + this.stspulang,
                    {
                      timeOut: 2000,
                    }
                  );
                }
              });
            }

            setTimeout(() => {
              this.tampildata();
            }, 200);

            //       setTimeout(() => {
            //         this.authService.listobatkirimpcare(this.kdcabang,this.notrans)
            //         .subscribe(
            //           data => {

            //             for(let x of data){

            //               let bodyx =  { "data": {

            //                 "kdObatSK": 0,
            //                 "noKunjungan": this.nokunjungan,
            //                 "racikan": false,
            //                 "kdRacikan": null,
            //                 "obatDPHO": true,
            //                 "kdObat": x.kdobatbpjs,
            //                 "signa1":  x.frekuensi,
            //                 "signa2":  x.jmlpakai,
            //                 "jmlObat":   x.qty,
            //                 "jmlPermintaan": x.frekuensi,
            //                 "nmObatNonDPHO": "Obat klinik"

            //                 }}

            // console.log(bodyx);

            // this.authService.simpanobatbpjs(bodyx)
            // .subscribe(response => {

            //   if(response.metaData.code == 201){

            //     let bodyeditfarmasi={
            //       "stssimpan":'1',
            //       "notransaksi":this.notransaksi,
            //       "kdObatSK":response.response[0].message,
            //       "kdRacikan":response.response[1].message,
            //       "kdpruduk":x.kdobat
            //     }

            //     this.authService.editobatsk(bodyeditfarmasi)
            //     .subscribe(response => {

            //       console.log(response)

            //     })

            //   }else{

            //   }

            // })

            //             }

            //           })

            //       }, 1500);

            // this.simpanambil()
          } else {
            this.toastr.error(response.metaData.message, "Eror");
          }
        },
        (error) => {
          this.toastr.error(error.error.message, "Gagal");
        }
      );
  }

  kirimpcarerujukedit() {
    if (this.bb === "") {
      this.bb = 0;
      this.toastr.error("bb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.td === "") {
      this.td = 0;
      this.toastr.error("Sistole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tdd === "") {
      this.tdd = 0;
      this.toastr.error("diastole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tb === "") {
      this.tb = 0;
      this.toastr.error("Tb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.rr === "") {
      this.rr = 0;
      this.toastr.error("rr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.hr === "") {
      this.hr = 0;
      this.toastr.error("hr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.subjek === "") {
      this.toastr.error("Keluhan harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kddiagnosabpjs === "") {
      this.toastr.error("Diagnosa harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kodeppk === "") {
      this.toastr.error("anda belum memilih faskes rujukan", "Eror");

      return;
    }

    if (this.kdprognosa === "") {
      this.toastr.error("kd Prognosa harus di pilih", "Eror");

      return;
    }

    if (this.suhu === "") {
      this.toastr.error("Suhu harus di isi", "Eror");

      return;
    }
    if (this.alergi === "") {
      this.toastr.error("alergi makanan harus di isi", "Eror");

      return;
    }

    if (this.stspulang === "") {
      this.toastr.error("Status Pulang harus diisi", "Eror");

      return;
    }

    let body = {
      data: {
        noKunjungan: this.nokunjungan,
        noKartu: this.noasuransi,

        keluhan: this.subjek,
        kdSadar: this.kesadaran,

        sistole: parseInt(this.td),
        diastole: parseInt(this.tdd),
        beratBadan: parseInt(this.bb),
        tinggiBadan: parseInt(this.tb),
        respRate: parseInt(this.rr),
        heartRate: parseInt(this.hr),
        lingkarPerut: parseInt(this.lingkarperut),

        kdStatusPulang: this.stspulang,
        tglPulang: this.pipe.transform(this.myDate, "dd-MM-yyyy"),
        kdDokter: this.kddokterbpjs,
        kdDiag1: this.kddiagnosabpjs,
        kdDiag2: this.kddiagnosabpjs2,
        kdDiag3: this.kddiagnosabpjs3,
        kdPoliRujukInternal: null,

        rujukLanjut: {
          kdppk: this.kodeppk,
          tglEstRujuk: this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy"),
          subSpesialis: {
            kdSubSpesialis1: this.sspesialis,
            kdSarana: null,
          },
          khusus: null,
        },
        kdTacc: this.kdtacc,
        alasanTacc: this.alasantacc,
        anamnesa: this.subjek,
        alergiMakan: this.alergi,
        alergiUdara: this.alergiudara,
        alergiObat: this.alergiobat,
        kdPrognosa: this.kdprognosa,
        terapiObat: this.terapiObat,
        terapiNonObat: this.terapinonobat,
        bmhp: this.bmhp,
        suhu: parseInt(this.suhu),
      },
    };

    console.log(body);

    this.authService.editkunjungan(body).subscribe((response) => {
      if (response.metaData.code == 412) {
        for (let x of response.response) {
          this.toastr.error(x.field + " " + x.message, "Eror");
        }
      } else if (response.metaData.code == 200) {
        let body = {
          notransaksi: this.notransaksi,
          stssimpan: "2",
          nokunjungan: this.nokunjungan,
          kdpoli: this.kdpoli,
          kddokter: this.kddokter,
          jeniskunjungan: this.stspulang,
          username: this.username,
        };

        this.authService.updatepcare(body).subscribe((response) => {
          if (response) {
            this.toastr.success(
              "",
              "Berhasil Kirim Kunjungan" + this.stspulang,
              {
                timeOut: 2000,
              }
            );
          }
        });

        setTimeout(() => {
          this.tampildata();
        }, 200);

        setTimeout(() => {
          this.authService
            .listobatkirimpcare(this.kdcabang, this.notrans)
            .subscribe((data) => {
              for (let x of data) {
                let bodyx = {
                  data: {
                    kdObatSK: 0,
                    noKunjungan: this.nokunjungan,
                    racikan: false,
                    kdRacikan: null,
                    obatDPHO: true,
                    kdObat: x.kdobatbpjs,
                    signa1: x.frekuensi,
                    signa2: x.jmlpakai,
                    jmlObat: x.qty,
                    jmlPermintaan: x.frekuensi,
                    nmObatNonDPHO: "Obat klinik",
                  },
                };

                console.log(bodyx);

                this.authService.simpanobatbpjs(bodyx).subscribe((response) => {
                  if (response.metaData.code == 201) {
                    let bodyeditfarmasi = {
                      stssimpan: "1",
                      notransaksi: this.notransaksi,
                      kdObatSK: response.response[0].message,
                      kdRacikan: response.response[1].message,
                      kdpruduk: x.kdobat,
                    };

                    this.authService
                      .editobatsk(bodyeditfarmasi)
                      .subscribe((response) => {
                        console.log(response);
                      });
                  } else {
                  }
                });
              }
            });
        }, 1500);
        this.simpanambil();
      } else {
        this.toastr.error(response.metaData.message, "Eror");
      }
    });
  }

  kirimpcareedit() {
    if (this.bb === "") {
      this.bb = 0;
      this.toastr.error("bb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.td === "") {
      this.td = 0;
      this.toastr.error("Sistole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tdd === "") {
      this.tdd = 0;
      this.toastr.error("diastole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tb === "") {
      this.tb = 0;
      this.toastr.error("Tb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.rr === "") {
      this.rr = 0;
      this.toastr.error("rr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.hr === "") {
      this.hr = 0;
      this.toastr.error("hr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.subjek === "") {
      this.toastr.error("Keluhan harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kddiagnosabpjs === "") {
      this.toastr.error("Diagnosa harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kdprognosa === "") {
      this.toastr.error("kd Prognosa harus di pilih", "Eror");

      return;
    }

    if (this.suhu === "") {
      this.toastr.error("Suhu harus di isi", "Eror");

      return;
    }
    if (this.alergi === "") {
      this.toastr.error("alergi makanan harus di isi", "Eror");

      return;
    }

    if (this.stspulang === "") {
      this.toastr.error("Status Pulang harus diisi", "Eror");

      return;
    }
    let body = {
      data: {
        noKunjungan: this.nokunjungan,
        noKartu: this.noasuransi,

        keluhan: this.subjek,
        kdSadar: this.kesadaran,

        sistole: parseInt(this.td),
        diastole: parseInt(this.tdd),
        beratBadan: parseInt(this.bb),
        tinggiBadan: parseInt(this.tb),
        respRate: parseInt(this.rr),
        heartRate: parseInt(this.hr),
        lingkarPerut: parseInt(this.lingkarperut),

        kdStatusPulang: this.stspulang,
        tglPulang: this.pipe.transform(this.myDate, "dd-MM-yyyy"),
        kdDokter: this.kddokterbpjs,
        kdDiag1: this.kddiagnosabpjs,
        kdDiag2: this.kddiagnosabpjs2,
        kdDiag3: this.kddiagnosabpjs3,
        kdPoliRujukInternal: this.kdpolibpjsinternal,

        rujukLanjut: {
          tglEstRujuk: null,
          kdppk: null,
          subSpesialis: null,
          khusus: {
            kdKhusus: null,
            kdSubSpesialis: null,
            catatan: null,
          },
        },
        kdTacc: this.kdtacc,
        alasanTacc: this.alasantacc,
        anamnesa: this.subjek,
        alergiMakan: this.alergi,
        alergiUdara: this.alergiudara,
        alergiObat: this.alergiobat,
        kdPrognosa: this.kdprognosa,
        terapiObat: this.terapiObat,
        terapiNonObat: this.terapinonobat,
        bmhp: this.bmhp,
        suhu: parseInt(this.suhu),
      },
    };

    this.authService
      .editkunjungan(body)
      .pipe(shareReplay(1))
      .subscribe((response) => {
        if (response.metaData.code == 412) {
          for (let x of response.response) {
            this.toastr.error(x.field + " " + x.message, "Eror");
          }
        } else if (response.metaData.code == 200) {
          let body = {
            notransaksi: this.notransaksi,
            stssimpan: "2",
            nokunjungan: this.nokunjungan,
            kdpoli: this.kdpoli,
            kddokter: this.kddokter,
            jeniskunjungan: this.stspulang,
            username: this.username,
          };

          this.authService.updatepcare(body).subscribe((response) => {
            if (response) {
              this.toastr.success(
                "",
                "Berhasil Kirim Kunjungan" + this.stspulang,
                {
                  timeOut: 2000,
                }
              );
            }
          });

          setTimeout(() => {
            this.tampildata();
          }, 200);

          setTimeout(() => {
            this.authService
              .listobatkirimpcare(this.kdcabang, this.notrans)
              .subscribe((data) => {
                for (let x of data) {
                  let bodyx = {
                    data: {
                      kdObatSK: 0,
                      noKunjungan: this.nokunjungan,
                      racikan: false,
                      kdRacikan: null,
                      obatDPHO: true,
                      kdObat: x.kdobatbpjs,
                      signa1: x.frekuensi,
                      signa2: x.jmlpakai,
                      jmlObat: x.qty,
                      jmlPermintaan: x.frekuensi,
                      nmObatNonDPHO: "Obat klinik",
                    },
                  };

                  console.log(bodyx);

                  this.authService
                    .simpanobatbpjs(bodyx)
                    .subscribe((response) => {
                      if (response.metaData.code == 201) {
                        let bodyeditfarmasi = {
                          stssimpan: "1",
                          notransaksi: this.notransaksi,
                          kdObatSK: response.response[0].message,
                          kdRacikan: response.response[1].message,
                          kdpruduk: x.kdobat,
                        };

                        this.authService
                          .editobatsk(bodyeditfarmasi)
                          .subscribe((response) => {
                            console.log(response);
                          });
                      } else {
                      }
                    });
                }
              });
          }, 1500);
          this.simpanambil();
        } else {
          this.toastr.error(response.metaData.message, "Eror");
        }
      });
  }
  kirimpcarerujukkhusus() {
    if (this.bb === "") {
      this.bb = 0;
      this.toastr.error("bb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.td === "") {
      this.td = 0;
      this.toastr.error("Sistole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tdd === "") {
      this.tdd = 0;
      this.toastr.error("diastole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tb === "") {
      this.tb = 0;
      this.toastr.error("Tb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.rr === "") {
      this.rr = 0;
      this.toastr.error("rr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.hr === "") {
      this.hr = 0;
      this.toastr.error("hr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.subjek === "") {
      this.toastr.error("Keluhan harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kddiagnosabpjs === "") {
      this.toastr.error("Diagnosa harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kodeppk === "") {
      this.toastr.error("anda belum memilih faskes rujukan", "Eror");

      return;
    }

    if (this.kdprognosa === "") {
      this.toastr.error("kd Prognosa harus di pilih", "Eror");

      return;
    }

    if (this.suhu === "") {
      this.toastr.error("Suhu harus di isi", "Eror");

      return;
    }
    if (this.alergi === "") {
      this.toastr.error("alergi makanan harus di isi", "Eror");

      return;
    }

    if (this.stspulang === "") {
      this.toastr.error("Status Pulang harus diisi", "Eror");

      return;
    }

    if (this.khususap === "THA") {
      let body = {
        data: {
          noKunjungan: null,
          noKartu: this.noasuransi,
          tglDaftar: this.tgldaftar,
          kdPoli: this.kdpolibpjs,
          keluhan: this.subjek,
          kdSadar: this.kesadaran,

          sistole: parseInt(this.td),
          diastole: parseInt(this.tdd),
          beratBadan: parseInt(this.bb),
          tinggiBadan: parseInt(this.tb),
          respRate: parseInt(this.rr),
          heartRate: parseInt(this.hr),
          lingkarPerut: parseInt(this.lingkarperut),

          kdStatusPulang: this.stspulang,
          tglPulang: this.pipe.transform(this.myDate, "dd-MM-yyyy"),
          kdDokter: this.kddokterbpjs,
          kdDiag1: this.kddiagnosabpjs,
          kdDiag2: this.kddiagnosabpjs2,
          kdDiag3: this.kddiagnosabpjs3,
          kdPoliRujukInternal: null,

          rujukLanjut: {
            tglEstRujuk: this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy"),
            kdppk: this.kodeppk,
            subSpesialis: {
              kdSubSpesialis1: this.sspesialis,
              kdSarana: null,
            },
            khusus: this.khususap,
          },
          kdTacc: this.kdtacc,
          alasanTacc: this.alasantacc,
          anamnesa: this.subjek,
          alergiMakan: this.alergi,
          alergiUdara: this.alergiudara,
          alergiObat: this.alergiobat,
          kdPrognosa: this.kdprognosa,
          terapiObat: this.terapiObat,
          terapiNonObat: this.terapinonobat,
          bmhp: this.bmhp,
          suhu: parseInt(this.suhu),
        },
      };

      this.authService.addkunjungan(body).subscribe((response) => {
        if (response.metaData.code == 412) {
          for (let x of response.response) {
            this.toastr.error(x.field + " " + x.message, "Eror");
          }
        } else if (response.metaData.code == 201) {
          for (let y of response.response) {
            let body = {
              notransaksi: this.notransaksi,
              stssimpan: "2",
              nokunjungan: y.message,
              kdpoli: this.kdpoli,
              kddokter: this.kddokter,
              jeniskunjungan: this.stspulang,
              username: this.username,
            };

            this.authService.updatepcare(body).subscribe((response) => {
              if (response) {
                this.toastr.success(
                  "",
                  "Berhasil Kirim Kunjungan" + this.stspulang,
                  {
                    timeOut: 2000,
                  }
                );
              }
            });
          }

          setTimeout(() => {
            this.tampildata();
          }, 200);

          setTimeout(() => {
            this.authService
              .listobatkirimpcare(this.kdcabang, this.notrans)
              .subscribe((data) => {
                for (let x of data) {
                  let bodyx = {
                    data: {
                      kdObatSK: 0,
                      noKunjungan: this.nokunjungan,
                      racikan: false,
                      kdRacikan: null,
                      obatDPHO: true,
                      kdObat: x.kdobatbpjs,
                      signa1: x.frekuensi,
                      signa2: x.jmlpakai,
                      jmlObat: x.qty,
                      jmlPermintaan: x.frekuensi,
                      nmObatNonDPHO: "Obat klinik",
                    },
                  };

                  console.log(bodyx);

                  this.authService
                    .simpanobatbpjs(bodyx)
                    .subscribe((response) => {
                      if (response.metaData.code == 201) {
                        let bodyeditfarmasi = {
                          stssimpan: "1",
                          notransaksi: this.notransaksi,
                          kdObatSK: response.response[0].message,
                          kdRacikan: response.response[1].message,
                          kdpruduk: x.kdobat,
                        };

                        this.authService
                          .editobatsk(bodyeditfarmasi)
                          .subscribe((response) => {
                            console.log(response);
                          });
                      } else {
                      }
                    });
                }
              });
          }, 1500);
          this.simpanambil();
        } else {
          this.toastr.error(response.metaData.message, "Eror");
        }
      });
    } else if (this.khususap === "HEM") {
      let body = {
        data: {
          noKunjungan: null,
          noKartu: this.noasuransi,
          tglDaftar: this.tgldaftar,
          kdPoli: this.kdpolibpjs,
          keluhan: this.subjek,
          kdSadar: this.kesadaran,

          sistole: parseInt(this.td),
          diastole: parseInt(this.tdd),
          beratBadan: parseInt(this.bb),
          tinggiBadan: parseInt(this.tb),
          respRate: parseInt(this.rr),
          heartRate: parseInt(this.hr),
          lingkarPerut: parseInt(this.lingkarperut),

          kdStatusPulang: this.stspulang,
          tglPulang: this.pipe.transform(this.myDate, "dd-MM-yyyy"),
          kdDokter: this.kddokterbpjs,
          kdDiag1: this.kddiagnosabpjs,
          kdDiag2: this.kddiagnosabpjs2,
          kdDiag3: this.kddiagnosabpjs3,
          kdPoliRujukInternal: null,

          rujukLanjut: {
            tglEstRujuk: this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy"),
            kdppk: this.kodeppk,
            subSpesialis: {
              kdSubSpesialis1: this.sspesialis,
              kdSarana: null,
            },
            khusus: this.khususap,
          },
          kdTacc: this.kdtacc,
          alasanTacc: this.alasantacc,
          anamnesa: this.subjek,
          alergiMakan: this.alergi,
          alergiUdara: this.alergiudara,
          alergiObat: this.alergiobat,
          kdPrognosa: this.kdprognosa,
          terapiObat: this.terapiObat,
          terapiNonObat: this.terapinonobat,
          bmhp: this.bmhp,
          suhu: parseInt(this.suhu),
        },
      };

      this.authService.addkunjungan(body).subscribe((response) => {
        if (response.metaData.code == 412) {
          for (let x of response.response) {
            this.toastr.error(x.field + " " + x.message, "Eror");
          }
        } else if (response.metaData.code == 201) {
          for (let y of response.response) {
            let body = {
              notransaksi: this.notransaksi,
              stssimpan: "2",
              nokunjungan: y.message,
              kdpoli: this.kdpoli,
              kddokter: this.kddokter,
              jeniskunjungan: this.stspulang,
              username: this.username,
            };

            this.authService.updatepcare(body).subscribe((response) => {
              if (response) {
                this.toastr.success(
                  "",
                  "Berhasil Kirim Kunjungan" + this.stspulang,
                  {
                    timeOut: 2000,
                  }
                );
              }
            });
          }

          setTimeout(() => {
            this.tampildata();
          }, 200);

          setTimeout(() => {
            this.authService
              .listobatkirimpcare(this.kdcabang, this.notrans)
              .subscribe((data) => {
                for (let x of data) {
                  let bodyx = {
                    data: {
                      kdObatSK: 0,
                      noKunjungan: this.nokunjungan,
                      racikan: false,
                      kdRacikan: null,
                      obatDPHO: true,
                      kdObat: x.kdobatbpjs,
                      signa1: x.frekuensi,
                      signa2: x.jmlpakai,
                      jmlObat: x.qty,
                      jmlPermintaan: x.frekuensi,
                      nmObatNonDPHO: "Obat klinik",
                    },
                  };

                  console.log(bodyx);

                  this.authService
                    .simpanobatbpjs(bodyx)
                    .subscribe((response) => {
                      if (response.metaData.code == 201) {
                        let bodyeditfarmasi = {
                          stssimpan: "1",
                          notransaksi: this.notransaksi,
                          kdObatSK: response.response[0].message,
                          kdRacikan: response.response[1].message,
                          kdpruduk: x.kdobat,
                        };

                        this.authService
                          .editobatsk(bodyeditfarmasi)
                          .subscribe((response) => {
                            console.log(response);
                          });
                      } else {
                      }
                    });
                }
              });
          }, 1500);
          this.simpanambil();
        } else {
          this.toastr.error(response.metaData.message, "Eror");
        }
      });
    } else {
      let body = {
        data: {
          noKunjungan: null,
          noKartu: this.noasuransi,
          tglDaftar: this.tgldaftar,
          kdPoli: this.kdpolibpjs,
          keluhan: this.subjek,
          kdSadar: this.kesadaran,

          sistole: parseInt(this.td),
          diastole: parseInt(this.tdd),
          beratBadan: parseInt(this.bb),
          tinggiBadan: parseInt(this.tb),
          respRate: parseInt(this.rr),
          heartRate: parseInt(this.hr),
          lingkarPerut: parseInt(this.lingkarperut),

          kdStatusPulang: this.stspulang,
          tglPulang: this.pipe.transform(this.myDate, "dd-MM-yyyy"),
          kdDokter: this.kddokterbpjs,
          kdDiag1: this.kddiagnosabpjs,
          kdDiag2: this.kddiagnosabpjs2,
          kdDiag3: this.kddiagnosabpjs3,
          kdPoliRujukInternal: null,

          rujukLanjut: {
            tglEstRujuk: this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy"),
            kdppk: this.kodeppk,
            subSpesialis: this.sspesialis,
            khusus: {
              kdKhusus: this.khususap,
              kdSubSpesialis: this.sspesialis,
              catatan:
                "Salam sejawat berikut kami rujuk lanjut kami untuk pengobatan lebih optimal",
            },
          },
          kdTacc: this.kdtacc,
          alasanTacc: this.alasantacc,
          anamnesa: this.subjek,
          alergiMakan: this.alergi,
          alergiUdara: this.alergiudara,
          alergiObat: this.alergiobat,
          kdPrognosa: this.kdprognosa,
          terapiObat: this.terapiObat,
          terapiNonObat: this.terapinonobat,
          bmhp: this.bmhp,
          suhu: parseInt(this.suhu),
        },
      };

      this.authService.addkunjungan(body).subscribe((response) => {
        if (response.metaData.code == 412) {
          for (let x of response.response) {
            this.toastr.error(x.field + " " + x.message, "Eror");
          }
        } else if (response.metaData.code == 201) {
          for (let y of response.response) {
            let body = {
              notransaksi: this.notransaksi,
              stssimpan: "2",
              nokunjungan: y.message,
              kdpoli: this.kdpoli,
              kddokter: this.kddokter,
              jeniskunjungan: this.stspulang,
              username: this.username,
            };

            this.authService.updatepcare(body).subscribe((response) => {
              if (response) {
                this.toastr.success(
                  "",
                  "Berhasil Kirim Kunjungan" + this.stspulang,
                  {
                    timeOut: 2000,
                  }
                );
              }
            });
          }

          setTimeout(() => {
            this.tampildata();
          }, 200);

          setTimeout(() => {
            this.authService
              .listobatkirimpcare(this.kdcabang, this.notrans)
              .subscribe((data) => {
                for (let x of data) {
                  let bodyx = {
                    data: {
                      kdObatSK: 0,
                      noKunjungan: this.nokunjungan,
                      racikan: false,
                      kdRacikan: null,
                      obatDPHO: true,
                      kdObat: x.kdobatbpjs,
                      signa1: x.frekuensi,
                      signa2: x.jmlpakai,
                      jmlObat: x.qty,
                      jmlPermintaan: x.frekuensi,
                      nmObatNonDPHO: "Obat klinik",
                    },
                  };

                  console.log(bodyx);

                  this.authService
                    .simpanobatbpjs(bodyx)
                    .subscribe((response) => {
                      if (response.metaData.code == 201) {
                        let bodyeditfarmasi = {
                          stssimpan: "1",
                          notransaksi: this.notransaksi,
                          kdObatSK: response.response[0].message,
                          kdRacikan: response.response[1].message,
                          kdpruduk: x.kdobat,
                        };

                        this.authService
                          .editobatsk(bodyeditfarmasi)
                          .subscribe((response) => {
                            console.log(response);
                          });
                      } else {
                      }
                    });
                }
              });
          }, 1500);
          this.simpanambil();
        } else {
          this.toastr.error(response.metaData.message, "Eror");
        }
      });
    }
  }

  kirimpcarerujukkhususedit() {
    if (this.bb === "") {
      this.bb = 0;
      this.toastr.error("bb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.td === "") {
      this.td = 0;
      this.toastr.error("Sistole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tdd === "") {
      this.tdd = 0;
      this.toastr.error("diastole harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.tb === "") {
      this.tb = 0;
      this.toastr.error("Tb harus di isi agar terkirim ke pcare", "Eror");
      return;
    }
    if (this.rr === "") {
      this.rr = 0;
      this.toastr.error("rr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.hr === "") {
      this.hr = 0;
      this.toastr.error("hr harus di isi agar terkirim ke pcare", "Eror");
      return;
    }

    if (this.subjek === "") {
      this.toastr.error("Keluhan harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kddiagnosabpjs === "") {
      this.toastr.error("Diagnosa harus di isi agar terkirim ke pcare", "Eror");

      return;
    }

    if (this.kodeppk === "") {
      this.toastr.error("anda belum memilih faskes rujukan", "Eror");

      return;
    }

    if (this.kdprognosa === "") {
      this.toastr.error("kd Prognosa harus di pilih", "Eror");

      return;
    }

    if (this.suhu === "") {
      this.toastr.error("Suhu harus di isi", "Eror");

      return;
    }
    if (this.alergi === "") {
      this.toastr.error("alergi makanan harus di isi", "Eror");

      return;
    }

    if (this.stspulang === "") {
      this.toastr.error("Status Pulang harus diisi", "Eror");

      return;
    }

    if (this.khususap === "THA") {
      let body = {
        data: {
          noKunjungan: this.nokunjungan,
          noKartu: this.noasuransi,

          keluhan: this.subjek,
          kdSadar: this.kesadaran,

          sistole: parseInt(this.td),
          diastole: parseInt(this.tdd),
          beratBadan: parseInt(this.bb),
          tinggiBadan: parseInt(this.tb),
          respRate: parseInt(this.rr),
          heartRate: parseInt(this.hr),
          lingkarPerut: parseInt(this.lingkarperut),

          kdStatusPulang: this.stspulang,
          tglPulang: this.pipe.transform(this.myDate, "dd-MM-yyyy"),
          kdDokter: this.kddokterbpjs,
          kdDiag1: this.kddiagnosabpjs,
          kdDiag2: this.kddiagnosabpjs2,
          kdDiag3: this.kddiagnosabpjs3,
          kdPoliRujukInternal: null,

          rujukLanjut: {
            tglEstRujuk: this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy"),
            kdppk: this.kodeppk,
            subSpesialis: {
              kdSubSpesialis1: this.sspesialis,
              kdSarana: null,
            },
            khusus: this.khususap,
            // "subSpesialis": this.sspesialis,
            // "khusus": {
            // "kdKhusus": this.khususap,
            // "kdSubSpesialis": this.sspesialis,
            // "catatan": "Salam sejawat berikut kami rujuk lanjut kami untuk pengobatan lebih optimal"
            // }
          },
          kdTacc: this.kdtacc,
          alasanTacc: this.alasantacc,
          anamnesa: this.subjek,
          alergiMakan: this.alergi,
          alergiUdara: this.alergiudara,
          alergiObat: this.alergiobat,
          kdPrognosa: this.kdprognosa,
          terapiObat: this.terapiObat,
          terapiNonObat: this.terapinonobat,
          bmhp: this.bmhp,
          suhu: parseInt(this.suhu),
        },
      };

      this.authService.editkunjungan(body).subscribe((response) => {
        if (response.metaData.code == 412) {
          for (let x of response.response) {
            this.toastr.error(x.field + " " + x.message, "Eror");
          }
        } else if (response.metaData.code == 200) {
          let body = {
            notransaksi: this.notransaksi,
            stssimpan: "2",
            nokunjungan: this.nokunjungan,
            kdpoli: this.kdpoli,
            kddokter: this.kddokter,
            jeniskunjungan: this.stspulang,
            username: this.username,
          };

          this.authService.updatepcare(body).subscribe((response) => {
            if (response) {
              this.toastr.success(
                "",
                "Berhasil Kirim Kunjungan" + this.stspulang,
                {
                  timeOut: 2000,
                }
              );
            }
          });

          setTimeout(() => {
            this.tampildata();
          }, 200);

          setTimeout(() => {
            this.authService
              .listobatkirimpcare(this.kdcabang, this.notrans)
              .subscribe((data) => {
                for (let x of data) {
                  let bodyx = {
                    data: {
                      kdObatSK: 0,
                      noKunjungan: this.nokunjungan,
                      racikan: false,
                      kdRacikan: null,
                      obatDPHO: true,
                      kdObat: x.kdobatbpjs,
                      signa1: x.frekuensi,
                      signa2: x.jmlpakai,
                      jmlObat: x.qty,
                      jmlPermintaan: x.frekuensi,
                      nmObatNonDPHO: "Obat klinik",
                    },
                  };

                  console.log(bodyx);

                  this.authService
                    .simpanobatbpjs(bodyx)
                    .subscribe((response) => {
                      if (response.metaData.code == 201) {
                        let bodyeditfarmasi = {
                          stssimpan: "1",
                          notransaksi: this.notransaksi,
                          kdObatSK: response.response[0].message,
                          kdRacikan: response.response[1].message,
                          kdpruduk: x.kdobat,
                        };

                        this.authService
                          .editobatsk(bodyeditfarmasi)
                          .subscribe((response) => {
                            console.log(response);
                          });
                      } else {
                      }
                    });
                }
              });
          }, 1500);
          this.simpanambil();
        } else {
          this.toastr.error(response.metaData.message, "Eror");
        }
      });
    } else if (this.khususap === "HEM") {
      let body = {
        data: {
          noKunjungan: this.nokunjungan,
          noKartu: this.noasuransi,

          keluhan: this.subjek,
          kdSadar: this.kesadaran,

          sistole: parseInt(this.td),
          diastole: parseInt(this.tdd),
          beratBadan: parseInt(this.bb),
          tinggiBadan: parseInt(this.tb),
          respRate: parseInt(this.rr),
          heartRate: parseInt(this.hr),
          lingkarPerut: parseInt(this.lingkarperut),

          kdStatusPulang: this.stspulang,
          tglPulang: this.pipe.transform(this.myDate, "dd-MM-yyyy"),
          kdDokter: this.kddokterbpjs,
          kdDiag1: this.kddiagnosabpjs,
          kdDiag2: this.kddiagnosabpjs2,
          kdDiag3: this.kddiagnosabpjs3,
          kdPoliRujukInternal: null,

          rujukLanjut: {
            tglEstRujuk: this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy"),
            kdppk: this.kodeppk,
            subSpesialis: {
              kdSubSpesialis1: this.sspesialis,
              kdSarana: null,
            },
            khusus: this.khususap,
            // "subSpesialis": this.sspesialis,
            // "khusus": {
            // "kdKhusus": this.khususap,
            // "kdSubSpesialis": this.sspesialis,
            // "catatan": "Salam sejawat berikut kami rujuk lanjut kami untuk pengobatan lebih optimal"
            // }
          },
          kdTacc: this.kdtacc,
          alasanTacc: this.alasantacc,
          anamnesa: this.subjek,
          alergiMakan: this.alergi,
          alergiUdara: this.alergiudara,
          alergiObat: this.alergiobat,
          kdPrognosa: this.kdprognosa,
          terapiObat: this.terapiObat,
          terapiNonObat: this.terapinonobat,
          bmhp: this.bmhp,
          suhu: parseInt(this.suhu),
        },
      };

      this.authService.editkunjungan(body).subscribe((response) => {
        if (response.metaData.code == 412) {
          for (let x of response.response) {
            this.toastr.error(x.field + " " + x.message, "Eror");
          }
        } else if (response.metaData.code == 200) {
          let body = {
            notransaksi: this.notransaksi,
            stssimpan: "2",
            nokunjungan: this.nokunjungan,
            kdpoli: this.kdpoli,
            kddokter: this.kddokter,
            jeniskunjungan: this.stspulang,
            username: this.username,
          };

          this.authService.updatepcare(body).subscribe((response) => {
            if (response) {
              this.toastr.success(
                "",
                "Berhasil Kirim Kunjungan" + this.stspulang,
                {
                  timeOut: 2000,
                }
              );
            }
          });

          setTimeout(() => {
            this.tampildata();
          }, 200);

          setTimeout(() => {
            this.authService
              .listobatkirimpcare(this.kdcabang, this.notrans)
              .subscribe((data) => {
                for (let x of data) {
                  let bodyx = {
                    data: {
                      kdObatSK: 0,
                      noKunjungan: this.nokunjungan,
                      racikan: false,
                      kdRacikan: null,
                      obatDPHO: true,
                      kdObat: x.kdobatbpjs,
                      signa1: x.frekuensi,
                      signa2: x.jmlpakai,
                      jmlObat: x.qty,
                      jmlPermintaan: x.frekuensi,
                      nmObatNonDPHO: "Obat klinik",
                    },
                  };

                  console.log(bodyx);

                  this.authService
                    .simpanobatbpjs(bodyx)
                    .subscribe((response) => {
                      if (response.metaData.code == 201) {
                        let bodyeditfarmasi = {
                          stssimpan: "1",
                          notransaksi: this.notransaksi,
                          kdObatSK: response.response[0].message,
                          kdRacikan: response.response[1].message,
                          kdpruduk: x.kdobat,
                        };

                        this.authService
                          .editobatsk(bodyeditfarmasi)
                          .subscribe((response) => {
                            console.log(response);
                          });
                      } else {
                      }
                    });
                }
              });
          }, 1500);
          this.simpanambil();
        } else {
          this.toastr.error(response.metaData.message, "Eror");
        }
      });
    } else {
      let body = {
        data: {
          noKunjungan: this.nokunjungan,
          noKartu: this.noasuransi,

          keluhan: this.subjek,
          kdSadar: this.kesadaran,

          sistole: parseInt(this.td),
          diastole: parseInt(this.tdd),
          beratBadan: parseInt(this.bb),
          tinggiBadan: parseInt(this.tb),
          respRate: parseInt(this.rr),
          heartRate: parseInt(this.hr),
          lingkarPerut: parseInt(this.lingkarperut),

          kdStatusPulang: this.stspulang,
          tglPulang: this.pipe.transform(this.myDate, "dd-MM-yyyy"),
          kdDokter: this.kddokterbpjs,
          kdDiag1: this.kddiagnosabpjs,
          kdDiag2: this.kddiagnosabpjs2,
          kdDiag3: this.kddiagnosabpjs3,
          kdPoliRujukInternal: null,

          rujukLanjut: {
            tglEstRujuk: this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy"),
            kdppk: this.kodeppk,
            subSpesialis: this.sspesialis,
            khusus: {
              kdKhusus: this.khususap,
              kdSubSpesialis: this.sspesialis,
              catatan:
                "Salam sejawat berikut kami rujuk lanjut kami untuk pengobatan lebih optimal",
            },
          },
          kdTacc: this.kdtacc,
          alasanTacc: this.alasantacc,
          anamnesa: this.subjek,
          alergiMakan: this.alergi,
          alergiUdara: this.alergiudara,
          alergiObat: this.alergiobat,
          kdPrognosa: this.kdprognosa,
          terapiObat: this.terapiObat,
          terapiNonObat: this.terapinonobat,
          bmhp: this.bmhp,
          suhu: parseInt(this.suhu),
        },
      };

      this.authService.editkunjungan(body).subscribe((response) => {
        if (response.metaData.code == 412) {
          for (let x of response.response) {
            this.toastr.error(x.field + " " + x.message, "Eror");
          }
        } else if (response.metaData.code == 200) {
          let body = {
            notransaksi: this.notransaksi,
            stssimpan: "2",
            nokunjungan: this.nokunjungan,
            kdpoli: this.kdpoli,
            kddokter: this.kddokter,
            jeniskunjungan: this.stspulang,
            username: this.username,
          };

          this.authService.updatepcare(body).subscribe((response) => {
            if (response) {
              this.toastr.success(
                "",
                "Berhasil Kirim Kunjungan" + this.stspulang,
                {
                  timeOut: 2000,
                }
              );
            }
          });

          setTimeout(() => {
            this.tampildata();
          }, 200);

          setTimeout(() => {
            this.authService
              .listobatkirimpcare(this.kdcabang, this.notrans)
              .subscribe((data) => {
                for (let x of data) {
                  let bodyx = {
                    data: {
                      kdObatSK: 0,
                      noKunjungan: this.nokunjungan,
                      racikan: false,
                      kdRacikan: null,
                      obatDPHO: true,
                      kdObat: x.kdobatbpjs,
                      signa1: x.frekuensi,
                      signa2: x.jmlpakai,
                      jmlObat: x.qty,
                      jmlPermintaan: x.frekuensi,
                      nmObatNonDPHO: "Obat klinik",
                    },
                  };

                  console.log(bodyx);

                  this.authService
                    .simpanobatbpjs(bodyx)
                    .subscribe((response) => {
                      if (response.metaData.code == 201) {
                        let bodyeditfarmasi = {
                          stssimpan: "1",
                          notransaksi: this.notransaksi,
                          kdObatSK: response.response[0].message,
                          kdRacikan: response.response[1].message,
                          kdpruduk: x.kdobat,
                        };

                        this.authService
                          .editobatsk(bodyeditfarmasi)
                          .subscribe((response) => {
                            console.log(response);
                          });
                      } else {
                      }
                    });
                }
              });
          }, 1500);
          this.simpanambil();
        } else {
          this.toastr.error(response.metaData.message, "Eror");
        }
      });
    }
  }
  modalsubjek: boolean;
  modalpf: boolean;
  modalplan: boolean;
  modaldiag: boolean;
  modaltindak: boolean;
  modalterapi: boolean;

  tsubjkerw: any;
  tdiagnosa: any;

  openLargex(content, a) {
    if (a === "s") {
      this.modalsubjek = true;
      this.modalpf = false;
      this.modalplan = false;
      this.modaldiag = false;
      this.modaltindak = false;
      this.modalterapi = false;

      this.authService
        .tampilcpptlist(this.kdcabang, this.norm, this.kddokter, this.kdpoli)
        .subscribe(
          (data) => {
            this.tsubjkerw = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else if (a === "pf") {
      this.modalpf = true;
      this.modalsubjek = false;
      this.modalplan = false;
      this.modaldiag = false;
      this.modaltindak = false;
      this.modalterapi = false;

      this.authService
        .tampilcpptlist(this.kdcabang, this.norm, this.kddokter, this.kdpoli)
        .subscribe(
          (data) => {
            this.tsubjkerw = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else if (a === "plan") {
      this.modalplan = true;
      this.modaldiag = false;
      this.modalpf = false;
      this.modalsubjek = false;
      this.modaltindak = false;
      this.modalterapi = false;

      this.authService
        .tampilcpptlist(this.kdcabang, this.norm, this.kddokter, this.kdpoli)
        .subscribe(
          (data) => {
            this.tsubjkerw = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else if (a === "diag") {
      this.modaldiag = true;
      this.modalplan = false;

      this.modalpf = false;
      this.modalsubjek = false;
      this.modaltindak = false;
      this.modalterapi = false;

      this.authService
        .diagnosacopy(this.kdcabang, this.norm, "diagnosa", this.kdpoli)
        .subscribe(
          (data) => {
            this.tdiagnosa = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else if (a === "tindak") {
      this.modaltindak = true;
      this.modaldiag = false;
      this.modalplan = false;

      this.modalpf = false;
      this.modalsubjek = false;
      this.modalterapi = false;

      this.authService
        .diagnosacopy(this.kdcabang, this.norm, "tindakan", this.kdpoli)
        .subscribe(
          (data) => {
            this.tdiagnosa = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else if (a === "terapi") {
      this.modaltindak = false;
      this.modaldiag = false;
      this.modalplan = false;

      this.modalpf = false;
      this.modalsubjek = false;
      this.modalterapi = true;
      this.authService.riwayatobat(this.kdcabang, this.norm).subscribe(
        (data) => {
          this.tterapi = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else {
    }

    this.modalService.open(content, {});
  }

  tterapi: any;

  copysubjek(a) {
    this.subjek = a;
    this.modalService.dismissAll();
  }
  copypf(a) {
    this.pf = a;
    this.modalService.dismissAll();
  }
  copyplan(a) {
    this.plan = a;
    this.modalService.dismissAll();
  }

  copydiag(a) {
    let body = {
      notrans: a,
      notransx: this.notrans,
      kdpoli: this.kdpoli,
      kdcabang: this.kdcabang,
      status: "diagnosa",
      stssimpan: "1",
    };
    this.authService.copydiagnosa(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        setTimeout(() => {
          this.tampildaigtindakinput();
        }, 200);
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }
  pilihdiagedit(a, b) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Edit Diagnosa",
        text:
          "Apakah anda yakin bahwa diagnosa " +
          this.diagfree +
          " tersebut cocok dengan kode diagnosa  " +
          a,

        showCancelButton: true,
        confirmButtonText: "Iya Yakin",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            notrans: this.notrans,
            kdcabang: this.kdcabang,
            kode: a,
            diagfree: this.diagfree,
            norm: this.norm,
            no: this.diagnourut,
            stssimpan: "1",
          };

          this.authService.editfreetextdiag(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              this.authService
                .diagnosatmp(this.kdcabang, this.notrans, "diagnosa")
                .subscribe(
                  (data) => {
                    if (data.length) {
                      this.tdiag = data;

                      for (let x of data) {
                        console.log(x.diag);
                      }
                      this.showmunculdiagjudul = true;
                    } else {
                      this.showmunculdiagjudul = false;
                    }
                  },
                  (Error) => {
                    console.log(Error);
                  }
                );

              setTimeout(() => {
                this.modalService.dismissAll();
              }, 200);
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  copytindak(a) {
    let body = {
      notrans: a,
      notransx: this.notrans,
      kdpoli: this.kdpoli,
      kdcabang: this.kdcabang,
      status: "tindakan",
      stssimpan: "1",
    };

    this.authService.copydiagnosa(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.tampildaigtindakinput();
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }
  tahu() {
    // this.toastr.error('SETELAH MENULIS DIAGNOSA FREE TEXT SILAHKAN ENTER PADA KEYBOARD AGAR TERSIMPAN', 'Eror');
  }

  jumlahrwt: any = 0;

  triwayatcppt: any;
  klikrw() {
    this.authService
      .tampilcpptlist(this.kdcabang, this.norm, this.kddokter, this.kdpoli)
      .subscribe(
        (data) => {
          this.triwayatcppt = data;
          this.jumlahrwt = data.length;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  ttarif: any;

  tmptarif() {
    this.authService
      .listtarif(this.kdcabang, "LAB", "", this.kdtarif)
      .subscribe(
        (data) => {
          this.ttarif = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  tmptarifrad() {
    this.authService
      .listtarif(this.kdcabang, "RAD", "", this.kdtarif)
      .subscribe(
        (data) => {
          this.ttarifrad = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  caritarif(a) {
    this.authService
      .listtarif(this.kdcabang, "LAB", a.target.value, this.kdtarif)
      .subscribe(
        (data) => {
          this.ttarif = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  ttarifrad: any;

  caritarifrad(a) {
    this.authService
      .listtarif(this.kdcabang, "RAD", a.target.value, this.kdtarif)
      .subscribe(
        (data) => {
          this.ttarifrad = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  tlistlab: any;
  keteranganakhirrad: string = "";

  tlistlabshow: boolean;

  tmplistintruksilab() {
    this.authService
      .listintruksilab(
        this.kdcabang,
        this.notrans,
        "LABORAT",
        this.notrans + this.kddokter
      )
      .subscribe(
        (data) => {
          this.tlistlab = data;

          if (data.length) {
            this.tlistlabshow = true;
          } else {
            this.tlistlabshow = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService
      .keteranganklinis(
        this.kdcabang,
        this.notrans,
        "LABORAT",
        this.notrans + this.kddokter
      )
      .subscribe(
        (data) => {
          for (let x of data) {
            this.keteranganakhir = x.keterangan;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  tlistrad: any;
  tlistradshow: boolean;

  tmplistintruksirad() {
    this.authService
      .listintruksilab(
        this.kdcabang,
        this.notrans,
        "RADIOLOGI",
        this.notrans + this.kddokter
      )
      .subscribe(
        (data) => {
          this.tlistrad = data;

          if (data.length) {
            this.tlistradshow = true;
          } else {
            this.tlistradshow = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService
      .keteranganklinis(
        this.kdcabang,
        this.notrans,
        "RADIOLOGI",
        this.notrans + this.kddokter
      )
      .subscribe(
        (data) => {
          for (let x of data) {
            this.keteranganakhirrad = x.keterangan;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  perminbat(content5) {
    this.showtamplate = false;
    this.modalService.open(content5, {
      size: "xl",
    });
  }
  diagfree: any;
  diagnourut: any;

  opendiagedit(contentdiag, diagfree, no) {
    this.diagnourut = no;

    this.diagfree = diagfree;
    this.modalService.open(contentdiag, {
      size: "xl",
    });
  }

  perminbatc() {
    // this.router.navigate(['master/perminobat',''])
    // this.modalService.open(perminobatComponent, {
    //   size: 'xl'
    // });

    this.modalService.open(perminobatComponent, { size: "xl" }).result.then(
      (result) => {},
      (reason) => {
        this.tmpnonr();
      }
    );
  }
  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
  nodeSelectx(event) {
    if (event.node.harga == 0) {
      this.toastr.error("Silahkan pilih Pemeriksaan", "Eror");
    } else {
      let body = {
        kduser: this.username,
        norm: this.norm,
        dari: "RADIOLOGI",
        kdkostumerd: this.kdkostumerd,
        kdproduk: event.node.key,
        produk: event.node.label,
        kdpoli: "rad",
        qty: "1",
        harga: event.node.harga,
        debet: event.node.harga,
        kdcppt: this.notrans + this.kddokter,
        kridit: 0,
        jenistransaksi: "DB",
        tarifasli: event.node.harga,
        nofaktur: this.notrans,
        kdcabang: this.kdcabang,
        kddokter: this.kddokter,
        stssimpan: "1",
        tglminta: this.myDatelab,
      };

      this.authService.simpanrxtunjangerm(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });

          this.tmplistintruksirad();
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
    }
  }
  nodeSelect(event) {
    if (event.node.harga == 0) {
      this.toastr.error("Silahkan pilih Pemeriksaan", "Eror");
    } else {
      let body = {
        kduser: this.username,
        norm: this.norm,
        dari: "LABORAT",
        kdkostumerd: this.kdkostumerd,
        kdproduk: event.node.key,
        produk: event.node.label,
        kdpoli: "lab",
        qty: "1",
        harga: event.node.harga,
        debet: event.node.harga,
        kdcppt: this.notrans + this.kddokter,
        kridit: 0,
        jenistransaksi: "DB",
        tarifasli: event.node.harga,
        nofaktur: this.notrans,
        kdcabang: this.kdcabang,
        kddokter: this.kddokter,
        stssimpan: "1",
        tglminta: this.myDatelab,
      };

      this.authService.simpanrxtunjangerm(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });

          this.tmplistintruksilab();
        } else {
          this.toastr.error("Simpan  Gagal", "Eror");
        }
      });
    }

    // this.toastr.success(event.node.key, 'Sukses', {
    //   timeOut: 2000,
    // });

    // this.toastr.success(event.node.label, 'Sukses', {
    //   timeOut: 2000,
    // });

    // this.toastr.success(event.node.harga, 'Sukses', {
    //   timeOut: 2000,
    // });
    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'Node Selected',
    //   detail: event.node.id,
    // });
  }

  nodeUnselect(event) {
    // this.toastr.success(event.node.key, 'Un Sukses', {
    //   timeOut: 2000,
    // });
    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'Node Unselected',
    //   detail: event.node.label,
    // });
  }

  perminlab(content6) {
    // this.tmptarif()

    this.authService
      .listtariftreelabrad(this.kdcabang, "LAB", this.kdtarif)
      .subscribe(
        (data) => {
          this.files1 = data;
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.tmplistintruksilab();
    this.modalService.open(content6, {
      size: "lg",
    });
  }
  carilink(contentrj) {
    if (this.ststarif === "igd") {
      this.ststarif = "IGD";
    } else {
      this.ststarif = "RJ";
    }

    this.authService
      .listtariftree(this.kdcabang, this.ststarif, this.kdtarif)
      .subscribe(
        (data) => {
          this.files3 = data;
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.modalService.open(contentrj, {
      size: "lg",
    });
  }
  ttarifrj: any;

  nodeSelectrj(a) {
    this.authService
      .tarifdetail(this.kdcabang, "2", "", a.node.key, this.ststarif)
      .subscribe(
        (data) => {
          this.ttarifrj = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  perminrad(content2) {
    // this.tmptarifrad()

    this.authService
      .listtariftreelabrad(this.kdcabang, "RAD", this.kdtarif)
      .subscribe(
        (data) => {
          this.files2 = data;
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.tmplistintruksirad();
    this.modalService.open(content2, {
      size: "lg",
    });
  }

  tambahtarifrad(kdtarif, nama, harga) {
    let body = {
      kduser: this.username,
      norm: this.norm,
      dari: "RADIOLOGI",
      kdkostumerd: this.kdkostumerd,
      kdproduk: kdtarif,
      produk: nama,
      kdpoli: "rad",
      qty: "1",
      harga: harga,
      debet: harga,
      kdcppt: this.notrans + this.kddokter,
      kridit: 0,
      jenistransaksi: "DB",
      tarifasli: harga,
      nofaktur: this.notrans,
      kdcabang: this.kdcabang,
      kddokter: this.kddokter,
      stssimpan: "1",
      tglminta: this.myDatelab,
      ri: "0",
    };

    this.authService.simpanrxtunjangerm(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.tmplistintruksirad();
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  hapustarif(kdpruduk, kdpoli, notransaksi, nomor, kdcppt, nama, nofaktur) {
    this.authService
      .verifhapus(
        this.kdcabang,
        this.notrans,
        "LABORAT",
        this.notrans + this.kddokter,
        this.kddokter,
        kdpoli,
        kdpruduk
      )
      .subscribe(
        (data) => {
          if (data.length) {
            let body = {
              kduser: this.username,
              norm: this.norm,
              dari: "LABORAT",
              kdkostumerd: this.kdkostumerd,
              kdproduk: kdpruduk,
              produk: nama,
              kdpoli: kdpoli,
              qty: "1",
              harga: 0,
              debet: 0,
              kdcppt: kdcppt,
              kridit: 0,
              jenistransaksi: "DB",
              tarifasli: 0,
              nofaktur: notransaksi,
              nofakturhap: nofaktur,
              nomorx: nomor,
              kdcabang: this.kdcabang,
              kddokter: this.kddokter,
              stssimpan: "2",
            };

            this.authService.simpanrxtunjangerm(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                this.tmplistintruksilab();
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          } else {
            this.toastr.error(
              "Tidak Bisa Di Hapus Karena Sudah Di Kunci",
              "Eror"
            );
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  hapustarifrad(kdpruduk, kdpoli, notransaksi, nomor, kdcppt, nama) {
    this.authService
      .verifhapus(
        this.kdcabang,
        this.notrans,
        "RADIOLOGI",
        this.notrans + this.kddokter,
        this.kddokter,
        kdpoli,
        kdpruduk
      )
      .subscribe(
        (data) => {
          if (data.length) {
            let body = {
              kduser: this.username,
              norm: this.norm,
              dari: "RADIOLOGI",
              kdkostumerd: this.kdkostumerd,
              kdproduk: kdpruduk,
              produk: nama,
              kdpoli: kdpoli,
              qty: "1",
              harga: 0,
              debet: 0,
              kdcppt: kdcppt,
              kridit: 0,
              jenistransaksi: "DB",
              tarifasli: 0,
              nofaktur: notransaksi,
              nomorx: nomor,
              kdcabang: this.kdcabang,
              kddokter: this.kddokter,
              stssimpan: "2",
            };

            this.authService.simpanrxtunjangerm(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                this.tmplistintruksirad();
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          } else {
            this.toastr.error(
              "Tidak Bisa Di Hapus Karena Sudah Di Kunci",
              "Eror"
            );
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  verifikasirad() {
    let body = {
      kduser: this.username,
      norm: this.norm,
      dari: "RADIOLOGI",
      kdkostumerd: this.kdkostumerd,
      kdproduk: "",
      produk: "",
      kdpoli: this.kdpoli,
      qty: "1",
      harga: 0,
      debet: 0,
      kdcppt: this.notrans + this.kddokter,
      kridit: 0,
      jenistransaksi: "DB",
      tarifasli: 0,
      nofaktur: this.notrans,
      nomorx: "",
      keterangan: this.keteranganakhirrad,
      kdcabang: this.kdcabang,
      kddokter: this.kddokter,
      stssimpan: "3",
      kdklinik: this.kdklinik,
      sts: "rad",
    };

    this.authService.simpanrxtunjangerm(body).subscribe((response) => {
      if (response) {
        this.toastr.success(
          "Sukses Terkirim Ke Penunjang" + response,
          "Sukses",
          {
            timeOut: 2000,
          }
        );

        this.tmplistintruksirad();

        this.modalService.dismissAll();
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  keteranganakhir: string = "";
  verifikasi() {
    let body = {
      kduser: this.username,
      norm: this.norm,
      dari: "LABORAT",
      kdkostumerd: this.kdkostumerd,
      kdproduk: "",
      produk: "",
      kdpoli: this.kdpoli,
      qty: "1",
      harga: 0,
      debet: 0,
      kdcppt: this.notrans + this.kddokter,
      kridit: 0,
      jenistransaksi: "DB",
      tarifasli: 0,
      nofaktur: this.notrans,
      nomorx: "",
      keterangan: this.keteranganakhir,
      kdcabang: this.kdcabang,
      kddokter: this.kddokter,
      stssimpan: "3",
      kdklinik: this.kdklinik,
      sts: "lab",
    };

    this.authService.simpanrxtunjangerm(body).subscribe((response) => {
      if (response) {
        this.toastr.success(
          "Sukses Terkirim Ke Penunjang" + response,
          "Sukses",
          {
            timeOut: 2000,
          }
        );

        this.tmplistintruksilab();
        this.doNotifPermintaanLab();

        this.modalService.dismissAll();
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy';

  cetakresume() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/resumerj.php?notrans=" +
        this.notrans +
        "&kdcabang=" +
        this.kdcabang +
        "&norm=" +
        this.norm,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  tobat: any;

  cariobat(a) {
    this.authService.obaterm(this.kdcabang, "2", a.target.value).subscribe(
      (data) => {
        this.tobat = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  doNotifPermintaanLab() {
    this.chatService.sendMessage([
      {
        antrian: "0",
        kddokter: "Laborat",
        namadokter: "Laborat",
        kdantrian: "L",
        kdcabang: this.kdcabang,
      },
    ]);
  }

  doNotifHasilLab() {
    this.chatService.sendMessage([
      {
        antrian: "0",
        kddokter: "Hasil Laborat",
        namadokter: "Hasil Laborat",
        kdantrian: "L",
        kdcabang: this.kdcabang,
      },
    ]);
  }

  nmobat: any;
  aturan: string = " ";
  qtyk: number;
  keterangan: string;
  tess() {
    alert("sd");
  }

  tessx() {
    this.myButton.nativeElement.focus();
  }
  onKeyUpa(a) {
    this.selectxx.handleClearClick();
  }

  tambahobat() {
    // this.aturan ='';
    // this.qtyk=0;
    // this.keterangan=''

    // this.selectxx.handleClearClick()

    let body = {
      nmobat: this.nmobat,
      aturan: this.aturan,
      qtyk: this.qtyk,
      keterangan: this.keterangan,
      notrans: this.notrans,
      norm: this.norm,
      kddokter: this.kddokter,
      kdpoli: this.kdpoli,
      kdobat: this.nmobat,
      statuso: "Non Racik",
      dari: "Obat",
      kduser: this.username,
      kdcabang: this.kdcabang,
      kdcppt: this.notrans + this.kddokter,
      stssimpan: "1",
      kdkostumerd: this.kdkostumerd,
    };

    console.log(body);

    this.authService.simpanrxobaterm(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });
        this.nmobat = "";

        // this.ngSelectComponent.handleClearClick()

        this.aturan = "";
        this.qtyk = 0;
        this.keterangan = "";

        setTimeout(() => {
          this.tmpnonr();
        }, 200);
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  nomorracik: number;
  klikr() {
    this.simno = false;
    this.simnor = true;
    this.authService
      .nomorracik(this.kdcabang, this.notrans, this.norm)
      .subscribe(
        (data) => {
          this.nomorracik = data;

          console.log(this.nomorracik);
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  kapasitas: number;
  satuanstnd: number;
  jmlracik(a) {
    this.authService.obatbyid(this.kdcabang, this.nmobatx).subscribe(
      (data) => {
        this.kapasitas = Array.prototype.map
          .call(data, (s) => s.zakaktif)
          .toString();

        this.satuanstnd = Array.prototype.map
          .call(data, (s) => s.standartd)
          .toString();
      },
      (Error) => {
        console.log(Error);
      }
    );

    setTimeout(() => {
      // console.log(this.kapasitas,this.satuanstnd)

      var hnx: number;
      var hny: number;
      hnx = this.kapasitas / a.target.value;

      // console.log(Math.round(hnx))

      hny = Math.round(hnx) * this.satuanstnd;

      // console.log(Math.ceil(hny/this.kapasitas))

      var qty: number;
      var s: any;

      qty = hny / this.kapasitas;

      console.log(qty.toFixed(2));
      s = qty.toFixed(1);

      this.qtykx = s;

      // console.log(hny/this.kapasitas)
    }, 200);
  }

  tobatx: any;

  nmobatx: any;

  aturanx: string = " ";
  qtykx: number;
  keteranganx: string;

  cariobatx(a) {
    this.authService.obaterm(this.kdcabang, "2", a.target.value).subscribe(
      (data) => {
        this.tobatx = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tambahobatr() {
    let body = {
      nmobat: this.nmobatx,
      aturan: "-",
      qtyk: this.qtykx,
      keterangan: this.keteranganx,
      noracik: this.nomorracik,
      notrans: this.notrans,
      norm: this.norm,
      kddokter: this.kddokter,
      kdpoli: this.kdpoli,
      kdobat: this.nmobatx,
      statuso: "Racik",
      dari: "Obat",
      kduser: this.username,
      kdcabang: this.kdcabang,
      kdcppt: this.notrans + this.kddokter,
      stssimpan: "2",
      kdkostumerd: this.kdkostumerd,
    };

    console.log(body);

    this.authService.simpanrxobaterm(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        // this.namaracikm='';
        // this.aturanm ='';
        // this.qtykm=0;
        // this.keteranganm=''

        this.nmobatx = "";

        this.qtykx = 0;
        this.keteranganx = "";

        setTimeout(() => {
          this.tmpnonr();
        }, 250);
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  namaracikm: string = "";
  metode: any;
  aturanm: string = "";
  qtykm: number;
  keteranganm: string = "";

  verifracik() {
    let body = {
      nmobat: this.namaracikm,
      aturan: this.aturanm,
      qtyk: this.qtykm,
      keterangan: this.keteranganm,
      noracik: this.nomorracik,
      notrans: this.notrans,
      norm: this.norm,
      kddokter: this.kddokter,
      metode: this.metode,
      kdpoli: this.kdpoli,
      kdobat: this.namaracikm,
      statuso: "MRacik",
      dari: "MObat",
      kduser: this.username,
      kdcabang: this.kdcabang,
      kdcppt: this.notrans + this.kddokter,
      stssimpan: "3",
      kdkostumerd: this.kdkostumerd,
    };

    console.log(body);

    this.authService.simpanrxobaterm(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.namaracikm = "";
        this.aturanm = "";
        this.qtykm = 0;
        this.keteranganm = "";

        setTimeout(() => {
          this.tmpnonr();
        }, 250);
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }
  simno: boolean = true;
  simnor: boolean = false;

  kliknonr() {
    this.simno = true;
    this.simnor = false;
  }
  tlistobatnshow: boolean;
  tlistobatrshow: boolean;

  tmpnonr() {
    this.authService
      .obatnonracik(this.kdcabang, this.notrans, this.notrans + this.kddokter)
      .subscribe(
        (data) => {
          this.tlistobatn = data;

          this.terapiObat = Array.prototype.map
            .call(data, (s) => s.nama)
            .toString();
          if (data.length) {
            this.tlistobatnshow = true;
          } else {
            this.tlistobatnshow = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService
      .obatracik(
        this.kdcabang,
        this.notrans,
        this.notrans + this.kddokter,
        this.nomorracik
      )
      .subscribe(
        (data) => {
          this.tlistobatr = data;

          if (data.length) {
            this.tlistobatrshow = true;
          } else {
            this.tlistobatrshow = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService
      .tmpbhp(this.kdcabang, this.notrans, this.notrans + this.kddokter)
      .subscribe(
        (data) => {
          this.bmhp = Array.prototype.map.call(data, (s) => s.nama).toString();
          this.tlistbhpr = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  tlistbhpr: any;

  hapusobat(
    notransaksi,
    kdpoli,
    kdpruduk,
    statuso,
    dari,
    kunci,
    no,
    kdcppt,
    nama
  ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus",
        text: "Hapus  " + nama,

        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          if (kunci === "1") {
            this.toastr.error(
              "Data telah di verifikasi tidak bisa di hapus",
              "Eror"
            );
          } else {
            let body = {
              notransaksi: notransaksi,
              kdpoli: kdpoli,
              kdpruduk: kdpruduk,
              statuso: statuso,
              dari: dari,
              kunci: kunci,
              no: no,
              kdcppt: kdcppt,
              kdcabang: this.kdcabang,
              stssimpan: "1",
            };
            this.authService.hapusobatnon(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.tmpnonr();
                }, 200);
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  hapusobatt(a) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus",
        text: "Hapus  ",

        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            notransaksi: this.notrans,
            kdpoli: this.kdpoli,
            kdpruduk: "",
            kd: a,
            statuso: "MRacik",
            dari: "MObat",
            kunci: "0",
            no: "",
            kdcppt: this.notrans + this.kddokter,
            kdcabang: this.kdcabang,
            stssimpan: "2",
          };
          this.authService.hapusobatnon(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  profileForm = this.fb.group({
    qtyk: ["", Validators.required],
  });

  kobat() {}
  testimasi: any;
  totalestimasi: number = 0;

  kestimasi() {
    this.authService.estimasibiaya(this.kdcabang, this.notrans).subscribe(
      (data) => {
        this.testimasi = data;

        var xyz = 0;

        for (let product of data) {
          for (let x of product.detail) {
            var y = parseInt(x.harga);

            xyz += y;
          }
        }

        this.totalestimasi = xyz + parseInt(this.totalrjes);
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  trujukr: any;

  riwayatrj() {
    this.authService.riwayatrujuk(this.noasuransi).subscribe(
      (data) => {
        this.trujukr = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  copyterapi(notransaksi, nama) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Copy",
        text: "Copy Terapi Tanggal  " + nama,

        showCancelButton: true,
        confirmButtonText: "Copy",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            notrans: notransaksi,
            notransaksi: this.notrans,
            kdkostumerd: this.kdkostumerd,
            norm: this.norm,
            kddokter: this.kddokter,
            kdpoli: this.kdpoli,
            kduser: this.kduser,
            kdcppt: this.notrans + this.kddokter,
            stssimpan: "1",
            kdcabang: this.kdcabang,
            kdtamplate: this.nomorracik,
          };

          this.authService.copyterapi(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  ttamplate: any;
  showtamplate: boolean = false;

  caritamplate(a) {
    if (a.target.value.length) {
      this.authService
        .hasiltamplateobat(this.kdcabang, this.kduser, a.target.value)
        .subscribe(
          (data) => {
            if (data.length) {
              this.showtamplate = true;
              this.ttamplate = data;
            } else {
              this.showtamplate = false;
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else {
      this.showtamplate = false;
    }
  }
  caritam: string = "";

  pilihobattam(kdtamplated, nama, status) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Copy",
        text: "Copy Terapi Tamplate  " + nama,

        showCancelButton: true,
        confirmButtonText: "Copy",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          if (status === "Racik") {
            let body = {
              kdkostumerd: this.kdkostumerd,
              norm: this.norm,
              kdpoli: this.kdpoli,
              kddokter: this.kddokter,
              kduser: this.kduser,
              kdcppt: this.notrans + this.kddokter,
              stssimpan: "2",
              kdcabang: this.kdcabang,
              notransaksi: this.notrans,
              status: status,
              kdtamplated: kdtamplated,
            };

            this.authService.copyterapitamplate(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.tmpnonr();
                }, 200);

                this.showtamplate = false;
                this.caritam = "";
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          } else if (status === "Umum") {
            let body = {
              kdkostumerd: this.kdkostumerd,
              norm: this.norm,
              kdpoli: this.kdpoli,
              kddokter: this.kddokter,
              kduser: this.kduser,
              kdcppt: this.notrans + this.kddokter,
              stssimpan: "1",
              kdcabang: this.kdcabang,
              notransaksi: this.notrans,
              status: status,
              kdtamplated: kdtamplated,
            };

            this.authService.copyterapitamplate(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.tmpnonr();
                }, 200);

                this.showtamplate = false;
                this.caritam = "";
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          } else {
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  aturannonracik(aturan, norm, kdpoli, kddokter, notransaksi, kdpruduk, no) {
    Swal.fire({
      title: "Masukan Aturan Terbaru",
      input: "text",
      inputValue: aturan,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            aturan: value,
            no: no,
            norm: norm,
            kdpoli: kdpoli,
            kddokter: kddokter,
            kduser: this.kduser,
            kdcppt: notransaksi + kddokter,
            stssimpan: "1",
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            kdpruduk: kdpruduk,
          };

          this.authService.editaturan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  qtynonracik(
    aturan,
    norm,
    kdpoli,
    kddokter,
    notransaksi,
    kdpruduk,
    qty,
    harga,
    no
  ) {
    Swal.fire({
      title: "Masukan Qty Terbaru",
      input: "number",
      inputValue: qty,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Qty Belum disi'
          );
        } else {
          let body = {
            qty: value,
            no: no,
            norm: norm,
            kdpoli: kdpoli,
            kddokter: kddokter,
            kduser: this.kduser,
            kdcppt: notransaksi + kddokter,
            stssimpan: "3",
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            kdpruduk: kdpruduk,
            harga: harga,
          };

          this.authService.editaturan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  qtyracik(
    aturan,
    norm,
    kdpoli,
    kddokter,
    notransaksi,
    kdpruduk,
    qty,
    harga,
    no
  ) {
    Swal.fire({
      title: "Masukan Qty Terbaru",
      input: "number",
      inputValue: qty,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Qty Belum disi'
          );
        } else {
          let body = {
            qty: value,
            no: no,
            norm: norm,
            kdpoli: kdpoli,
            kddokter: kddokter,
            kduser: this.kduser,
            kdcppt: notransaksi + kddokter,
            stssimpan: "4",
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            kdpruduk: kdpruduk,
            harga: harga,
          };

          console.log(body);

          this.authService.editaturan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  keteranganracik(
    aturan,
    norm,
    kdpoli,
    kddokter,
    notransaksi,
    kdpruduk,
    qty,
    harga,
    no
  ) {
    Swal.fire({
      title: "Masukan Keterangan Terbaru",
      input: "text",
      inputValue: aturan,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Qty Belum disi'
          );
        } else {
          let body = {
            keterangan: value,
            no: no,
            norm: norm,
            kdpoli: kdpoli,
            kddokter: kddokter,
            kduser: this.kduser,
            kdcppt: notransaksi + kddokter,
            stssimpan: "5",
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            kdpruduk: kdpruduk,
            harga: harga,
          };

          console.log(body);

          this.authService.editaturan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  ketnonracik(aturan, norm, kdpoli, kddokter, notransaksi, kdpruduk, no) {
    Swal.fire({
      title: "Masukan Keterangan Terbaru",
      input: "text",
      inputValue: aturan,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            keterangan: value,
            no: no,
            norm: norm,
            kdpoli: kdpoli,
            kddokter: kddokter,
            kduser: this.kduser,
            kdcppt: notransaksi + kddokter,
            stssimpan: "2",
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            kdpruduk: kdpruduk,
          };

          this.authService.editaturan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  aturanracikm(
    kdtamplated,
    namaracik,
    metode,
    aturan,
    qty,
    keterangan,
    notransaksi,
    kdpoli
  ) {
    Swal.fire({
      title: "Masukan Aturan Terbaru",
      input: "text",
      inputValue: aturan,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            kdtamplated: kdtamplated,
            namaracik: namaracik,
            metode: metode,
            aturan: value,
            qty: qty,
            keterangan: keterangan,
            notransaksi: notransaksi,
            kdcabang: this.kdcabang,
            stssimpan: "1",
            kdpoli: kdpoli,
            kduser: this.kduser,
          };

          this.authService.editaturanm(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  qtyracikm(
    kdtamplated,
    namaracik,
    metode,
    aturan,
    qty,
    keterangan,
    notransaksi,
    kdpoli
  ) {
    Swal.fire({
      title: "Masukan Qty Terbaru",
      input: "number",
      inputValue: qty,
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            kdtamplated: kdtamplated,
            namaracik: namaracik,
            metode: metode,
            aturan: aturan,
            qty: value,
            keterangan: keterangan,
            notransaksi: notransaksi,
            kdcabang: this.kdcabang,
            stssimpan: "2",
            kdpoli: kdpoli,
            kduser: this.kduser,
          };

          this.authService.editaturanm(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  keteranganracikm(
    kdtamplated,
    namaracik,
    metode,
    aturan,
    qty,
    keterangan,
    notransaksi,
    kdpoli
  ) {
    Swal.fire({
      title: "Masukan keterangan Terbaru",
      input: "text",
      inputValue: keterangan,

      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            kdtamplated: kdtamplated,
            namaracik: namaracik,
            metode: metode,
            aturan: aturan,
            qty: qty,
            keterangan: value,
            notransaksi: notransaksi,
            kdcabang: this.kdcabang,
            stssimpan: "3",
            kdpoli: kdpoli,
            kduser: this.kduser,
          };

          this.authService.editaturanm(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }

  metoderacik(
    kdtamplated,
    namaracik,
    metode,
    aturan,
    qty,
    keterangan,
    notransaksi,
    kdpoli
  ) {
    Swal.fire({
      title: "Masukan keterangan Terbaru",
      input: "select",
      inputValue: metode,
      inputOptions: {
        Puyer: "Puyer",
        Salep: "Salep",
        Sirup: "Sirup",
        Kapsul: "Kapsul",
      },

      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Aturan Belum disi'
          );
        } else {
          let body = {
            kdtamplated: kdtamplated,
            namaracik: namaracik,
            metode: value,
            aturan: aturan,
            qty: qty,
            keterangan: value,
            notransaksi: notransaksi,
            kdcabang: this.kdcabang,
            stssimpan: "4",
            kdpoli: kdpoli,
            kduser: this.kduser,
          };

          this.authService.editaturanm(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpnonr();
              }, 200);

              this.showtamplate = false;
              this.caritam = "";
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        }
      },
    });
  }
  background: string;
  home(a) {
    this.showingmb = true;
    this.authService.master(a).subscribe(
      (data) => {
        this.background = data;

        // console.log(this.background)
        this.signaturePad.fromDataURL(this.background);
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  public signatureImage: string;
  simpang() {
    this.signatureImage = this.signaturePad.toDataURL();

    this.authService
      .simpangmb(this.kdcabang, this.notransaksi, this.signatureImage)
      .then((data) => {
        if (data) {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });
        } else {
          this.toastr.error("Simpan User Gagal", "Eror");
        }
      });
  }

  simpangu() {
    // this.signatureImage = this.signaturePad.toDataURL();

    this.authService
      .simpangmbu(this.kdcabang, this.notransaksi, this.imageSrc)
      .then((data) => {
        if (data) {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });
        } else {
          this.toastr.error("Simpan User Gagal", "Eror");
        }
      });
  }
  keteranganakhirx: any = "";
  imt: any = "";

  simpanlab() {
    this.authService
      .simpanuploadlab(
        this.kdcabang,
        this.notransaksi,
        this.imageSrcx,
        this.norm,
        this.keteranganakhirx
      )
      .then((data) => {
        if (data) {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });
          setTimeout(() => {
            this.authService.riwayatlaborat(this.kdcabang, this.norm).subscribe(
              (data) => {
                this.tlab = data;
              },
              (Error) => {
                console.log(Error);
              }
            );
          }, 200);
        } else {
          this.toastr.error("Simpan User Gagal", "Eror");
        }
      });
  }

  simpanrad() {
    this.authService
      .simpanuploadrad(
        this.kdcabang,
        this.notransaksi,
        this.imageSrcxx,
        this.norm,
        this.keteranganakhirxx
      )
      .then((data) => {
        if (data) {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });
          setTimeout(() => {
            this.authService
              .riwayatradiologi(this.kdcabang, this.norm)
              .subscribe(
                (data) => {
                  this.trad = data;
                },
                (Error) => {
                  console.log(Error);
                }
              );
          }, 200);
        } else {
          this.toastr.error("Simpan User Gagal", "Eror");
        }
      });
  }

  // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy';

  //   cetakresume(){
  //     var redirectWindow = window.open(this.URLINVOICE+'clenic/report/resumerj.php?notrans='+this.notrans+'&kdcabang='+this.kdcabang+'&norm='+this.norm, '_blank','location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes');
  //     redirectWindow.location;
  //  }

  showhr: boolean;
  chr(a) {
    if (a.target.value.length <= 0) {
      this.showhr = false;
      this.verifikasiangka = 0;
    } else if (a.target.value < 30) {
      this.showhr = true;
      // this.hr='';
      this.verifikasiangka = 1;
    } else if (a.target.value > 160) {
      // this.hr=''
      this.showhr = true;
      this.verifikasiangka = 1;
    } else {
      this.showhr = false;
      this.verifikasiangka = 0;
    }
  }

  showbb: boolean;
  showtb: boolean;
  showlp: boolean;
  verifikasiangka: number = 0;

  cll(a) {
    if (a.target.value.length <= 0) {
      this.showlp = false;
      this.verifikasiangka = 0;
    } else if (a.target.value < 25) {
      this.showlp = true;

      this.verifikasiangka = 1;
    } else if (a.target.value > 300) {
      this.showlp = true;
      // this.lingkarperut =0;
      this.verifikasiangka = 1;
    } else {
      this.showlp = false;
      this.verifikasiangka = 0;
    }
  }
  ctb(a) {
    if (a.target.value.length <= 0) {
      this.showtb = false;
      this.verifikasiangka = 0;
    } else if (a.target.value < 30) {
      this.showtb = true;
      // this.tb ='';
      this.verifikasiangka = 1;
    } else if (a.target.value > 250) {
      this.showtb = true;
      // this.tb ='';
      this.verifikasiangka = 1;
    } else {
      this.showtb = false;
      this.verifikasiangka = 0;
    }
  }
  cbb(a) {
    if (a.target.value.length <= 0) {
      this.showbb = false;
      this.verifikasiangka = 0;
    } else if (a.target.value < 2) {
      this.showbb = true;
      //  this.bb ='';
      this.verifikasiangka = 1;
    } else if (a.target.value > 300) {
      this.showbb = true;
      //  this.bb ='';
      this.verifikasiangka = 1;
    } else {
      this.showbb = false;
      this.verifikasiangka = 0;
    }
    var tb: number = parseFloat(this.tb); // Tinggi dalam cm
    var berat: number = parseFloat(a.target.value); // Berat badan dalam kg

    if (isNaN(tb) || isNaN(berat) || tb <= 0 || berat <= 0) {
      this.imt = "0.0";
      return;
    }

    var tinggiMeter: number = tb / 100; // Konversi tinggi ke meter
    var imtValue: number = berat / (tinggiMeter * tinggiMeter); // Rumus IMT

    this.imt = imtValue.toFixed(1); // Format hasil ke 1 desimal
  }

  shownadi: boolean;

  cnadi(a) {
    if (a.target.value.length <= 0) {
      this.shownadi = false;
      this.verifikasiangka = 0;
    } else if (a.target.value <= 60) {
      this.shownadi = true;
      this.verifikasiangka = 1;
    } else if (a.target.value >= 160) {
      this.shownadi = true;
      this.verifikasiangka = 1;
    } else {
      this.shownadi = false;
      this.verifikasiangka = 0;
    }
  }
  showsuhu: boolean;

  csuhu(a) {
    if (a.target.value.length <= 0) {
      this.showsuhu = false;
      this.verifikasiangka = 1;
    } else if (a.target.value < 25) {
      this.showsuhu = true;
      this.verifikasiangka = 0;
      //  this.suhu='';
    } else if (a.target.value > 45) {
      this.showsuhu = true;
      this.verifikasiangka = 0;
      //  this.suhu='';
    } else {
      this.showsuhu = false;
      this.verifikasiangka = 1;
    }
  }
  showrr: boolean;

  crr(a) {
    if (a.target.value.length <= 0) {
      this.showrr = false;
      this.verifikasiangka = 0;
    } else if (a.target.value < 5) {
      this.showrr = true;
      this.verifikasiangka = 1;
      //  this.rr ='';
    } else if (a.target.value > 70) {
      this.showrr = true;
      this.verifikasiangka = 1;
      //  this.rr ='';
    } else {
      this.showrr = false;
      this.verifikasiangka = 0;
    }
  }

  showpp: boolean;

  cpp(a) {
    if (a.target.value.length <= 0) {
      this.showpp = false;
      this.verifikasiangka = 0;
    } else if (a.target.value < 95) {
      this.showpp = true;
      this.verifikasiangka = 1;
    } else if (a.target.value > 100) {
      this.showpp = true;
      this.verifikasiangka = 1;
    } else {
      this.showpp = false;
      this.verifikasiangka = 0;
    }
  }

  showtd: boolean;

  ctd(a) {
    if (a.target.value.length <= 0) {
      this.showtd = false;
      this.verifikasiangka = 0;
    } else if (a.target.value < 40) {
      this.showtd = true;
      this.verifikasiangka = 1;
      //  this.td=''
      //  this.toastr.error("Tidak boleh kurang dari 40")
    } else if (a.target.value > 250) {
      this.verifikasiangka = 1;
      // this.toastr.error("Tidak boleh lebih dari 250")
      this.showtd = true;
      //  this.td=''
    } else {
      this.showtd = false;
      this.verifikasiangka = 0;
    }
  }
  showtdd: boolean;

  ctdd(a) {
    if (a.target.value.length <= 0) {
      this.showtdd = false;
      this.verifikasiangka = 0;
    } else if (a.target.value < 30) {
      this.showtdd = true;
      this.verifikasiangka = 1;
      //  this.tdd ='';
    } else if (a.target.value > 180) {
      this.showtdd = true;
      this.verifikasiangka = 1;
      //  this.tdd ='';
    } else {
      this.showtdd = false;
      this.verifikasiangka = 0;
    }
  }

  krujuk(content) {
    this.modalService.open(content, {
      size: "lg",
    });
  }

  rujukanuntuk: any;
  keteranganrujuk: string = "";
  instansi: string = "";
  catatan: string = "";
  catatankon: string = "";

  trujuk: any;

  tmprjkn() {
    this.authService.tampilrujukan(this.kdcabang, this.notrans).subscribe(
      (data) => {
        this.trujuk = data;

        for (let x of data) {
          this.rujukanuntuk = x.rujukanuntuk;
          this.keteranganrujuk = x.keteranganrujuk;
          this.instansi = x.instansi;
          this.catatan = x.catatan;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  simpanrujuk() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Simpan",
        text: "Yakin Simpan",

        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            rujukanuntuk: this.rujukanuntuk,
            keteranganrujuk: this.keteranganrujuk,
            instansi: this.instansi,
            catatan: this.catatan,
            stssimpan: "1",
            notrans: this.notransaksi,
            kdcabang: this.kdcabang,
            norm: this.norm,
          };

          this.authService.simpanrujukan(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.authService
                  .tampilrujukan(this.kdcabang, this.notrans)
                  .subscribe(
                    (data) => {
                      this.trujuk = data;
                    },
                    (Error) => {
                      console.log(Error);
                    }
                  );
              }, 200);
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  }

  odon() {
    // var redirectWindow = window.open(this.URLINVOICE+'clenic/report/odo/odontogram.php?kdcabang='+this.kdcabang+'&norm='+this.norm+'&notrans='+this.notransaksi+'&kddokter='+this.kddokter, '_blank','location=no,toolbar=no,height='+screen.height+',width='+screen.width+',scrollbars=yes,status=yes');
    // redirectWindow.location;

    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/odo/odo/odontogram.php?kdcabang=" +
        this.kdcabang +
        "&norm=" +
        this.norm +
        "&notrans=" +
        this.notransaksi +
        "&kddokter=" +
        this.kddokter,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  kdtarifigd: any;
  namaigd: any;
  hargaigd: any;
  tdokter: any;
  tperawat: any;

  tambahtarif(
    kdtarif,
    nama,
    harga,
    contentdokter,
    contentperawat,
    kdTindakanSK
  ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Tambah Tarif",
        text: "Menambah Tarif " + nama,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          if (this.igdorrj === "igd") {
            this.kdtarifigd = kdtarif;
            this.namaigd = nama;
            this.hargaigd = harga;

            this.authService.dokter(this.kdcabang).subscribe(
              (data) => {
                if (data.length) {
                  this.tdokter = data;
                  this.modalService.open(contentdokter, {
                    size: "lg",
                  });
                } else {
                }
              },
              (Error) => {
                console.log(Error);
              }
            );
          } else {
            this.authService.listkomponen(this.kdcabang, kdtarif).subscribe(
              (data) => {
                if (data.length) {
                  this.kdtarifigd = kdtarif;
                  this.namaigd = nama;
                  this.hargaigd = harga;

                  this.authService.perawat(this.kdcabang).subscribe(
                    (data) => {
                      if (data.length) {
                        this.tperawat = data;
                        this.modalService.open(contentperawat, {
                          size: "lg",
                        });
                      } else {
                      }
                    },
                    (Error) => {
                      console.log(Error);
                    }
                  );
                } else {
                  var kdTindakanin = "";
                  let bodytindakaan = {
                    data: {
                      kdTindakanSK: 0,
                      noKunjungan: this.nokunjungan,
                      kdTindakan: kdTindakanSK,
                      biaya: harga,
                      keterangan: null,
                      hasil: harga,
                    },
                  };

                  this.authService
                    .addtindakan(bodytindakaan)
                    .subscribe((response) => {
                      if (response.metaData.code == 201) {
                        kdTindakanin = response.response.message;

                        let body = {
                          user: this.username,
                          notransaksi: this.notransaksi,
                          kdproduk: kdtarif,
                          produk: nama,
                          kdpoli: this.kdpoli,
                          qty: "1",
                          harga: harga,
                          debet: harga,
                          kridit: 0,
                          jenistransaksi: "DB",
                          tarifasli: harga,
                          disc: 0,
                          nofaktur: this.notransaksi,
                          kdcabang: this.kdcabang,
                          kdklinik: this.kdklinik,
                          kddokter: this.kddokter,
                          stssimpan: "1",
                          kdperawat: "0",
                          ri: "0",
                          kdTindakanSK: response.response.message,
                        };

                        this.authService
                          .simpantrxrj(body)
                          .subscribe((response) => {
                            if (response) {
                              this.toastr.success("" + response, "Sukses", {
                                timeOut: 2000,
                              });

                              setTimeout(() => {
                                this.tmptrans();
                              }, 200);
                            } else {
                              this.toastr.error("Simpan  Gagal", "Eror");
                            }
                          });
                      } else {
                        kdTindakanin = "";
                        this.toastr.error(
                          "BPJS : " +
                            response.metaData.message +
                            "  " +
                            response.response[0].field +
                            response.response[0].message,
                          "Sukses",
                          {
                            timeOut: 2000,
                          }
                        );
                      }
                    });
                }
              },
              (Error) => {
                console.log(Error);
              }
            );
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  tambahtariflab(kdtarif, nama, harga) {
    let body = {
      kduser: this.username,
      norm: this.norm,
      dari: "LABORAT",
      kdkostumerd: this.kdkostumerd,
      kdproduk: kdtarif,
      produk: nama,
      kdpoli: "lab",
      qty: "1",
      harga: harga,
      debet: harga,
      kdcppt: this.notrans + this.kddokter,
      kridit: 0,
      jenistransaksi: "DB",
      tarifasli: harga,
      nofaktur: this.notrans,
      kdcabang: this.kdcabang,
      kddokter: this.kddokter,
      stssimpan: "1",
      tglminta: this.myDatelab,
    };

    this.authService.simpanrxtunjangerm(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.tmplistintruksilab();
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }

  pilihdokter(kddokter, namdokter) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Tambah Jasa Dokter",
        text: "Menambah Jasa Dokter Ke " + namdokter,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            user: this.username,
            notransaksi: this.notransaksi,
            kdproduk: this.kdtarifigd,
            produk: this.namaigd,
            kdpoli: this.kdpoli,
            qty: "1",
            harga: this.hargaigd,
            debet: this.hargaigd,
            kridit: 0,
            jenistransaksi: "DB",
            tarifasli: this.hargaigd,
            disc: 0,
            nofaktur: this.notransaksi,
            kdcabang: this.kdcabang,
            kdklinik: this.kdklinik,
            kddokter: kddokter,
            stssimpan: "1",
            kdperawat: "0",
            ri: "0",
          };

          this.authService.simpantrxrj(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmptrans();
              }, 200);

              this.modalService.dismissAll();
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  pilihperawat(kdperawat, namdokter) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Tambah Jasa Perawat",
        text: "Menambah Jasa Perawat Ke " + namdokter,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            user: this.username,
            notransaksi: this.notransaksi,
            kdproduk: this.kdtarifigd,
            produk: this.namaigd,
            kdpoli: this.kdpoli,
            qty: "1",
            harga: this.hargaigd,
            debet: this.hargaigd,
            kridit: 0,
            jenistransaksi: "DB",
            tarifasli: this.hargaigd,
            disc: 0,
            nofaktur: this.notransaksi,
            kdcabang: this.kdcabang,
            kdklinik: this.kdklinik,
            kddokter: this.kddokter,
            stssimpan: "1",
            kdperawat: kdperawat,
            ri: "0",
          };

          this.authService.simpantrxrj(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmptrans();
              }, 200);

              this.modalService.dismissAll();
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  ttindakx: any;
  ttindakxshow: boolean;
  totalrjes: any;

  tmptrans() {
    this.tindaksshow = false;
    this.tindakan = "";
    this.authService.listtrxcppt(this.kdcabang, this.notrans).subscribe(
      (data) => {
        var xyz: number = 0;
        if (data.length) {
          this.ttindakx = data;
          this.ttindakxshow = true;

          for (let x of data) {
            xyz += x.debet;
          }
          this.totalrjes = xyz;
        } else {
          this.ttindakxshow = false;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  ttmpkonsulin: any;
  showkonsulrj: boolean;

  ttmpkonsulina: any;
  showkonsulrja: boolean;
  tmpkonsul() {
    this.authService
      .listkonsultasirj("1", this.kdcabang, this.notrans)
      .subscribe(
        (data) => {
          this.ttmpkonsulin = data;

          if (data.length) {
            this.showkonsulrj = true;
          } else {
            this.showkonsulrj = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService
      .listkonsultasirj("2", this.kdcabang, this.notrans)
      .subscribe(
        (data) => {
          this.ttmpkonsulina = data;

          if (data.length) {
            this.showkonsulrja = true;
          } else {
            this.showkonsulrja = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  hapusproduk(
    nomor,
    kdproduk,
    produk,
    notransaksi,
    harga,
    nofaktur,
    kridita,
    kdpoli,
    kdTindakanSK
  ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus",
        text: "Hapus Tarif " + produk,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.authService
            .deletetindakan(this.nokunjungan, kdTindakanSK)
            .subscribe((response) => {
              if (response.metaData.code == 200) {
                this.toastr.success(
                  "BPJS : " + response.metaData.message,
                  "Sukses",
                  {
                    timeOut: 2000,
                  }
                );
                let body = {
                  user: this.username,
                  netto: 0,
                  notransaksi: notransaksi,
                  kdproduk: kdproduk,
                  produk: produk,
                  kdpoli: kdpoli,
                  qty: "1",
                  harga: harga,
                  debet: harga,
                  kridit: 0,
                  jenistransaksi: "DB",
                  tarifasli: harga,
                  disc: 0,
                  nofaktur: nofaktur,
                  kdcabang: this.kdcabang,
                  kdklinik: this.kdklinik,
                  kddokter: this.kddokter,
                  nomorx: nomor,
                  stssimpan: "2",
                  ri: "0",
                };

                this.authService.simpantrxrj(body).subscribe((response) => {
                  if (response) {
                    this.toastr.success("" + response, "Sukses", {
                      timeOut: 2000,
                    });
                    setTimeout(() => {
                      this.tmptrans();
                    }, 200);
                  } else {
                    this.toastr.error("Simpan  Gagal", "Eror");
                  }
                });
              } else {
                this.toastr.success(
                  "BPJS : " + response.response[0].message,
                  "Sukses",
                  {
                    timeOut: 2000,
                  }
                );
              }
            });

          // swalWithBootstrapButtons.fire(
          //   'Berhasil Hapus User',
          //   'User Telah Terhapus Dari Database.',
          //   'success'
          // );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  kdlabshow: any;
  kdlabshowc: boolean;
  nmlabshow: any;

  listpol: any;
  listtot: number;
  min: any;
  max: any;

  showgrafik(a, b, c, d) {
    this.authService.trackhasillab(this.kdcabang, this.norm, a).subscribe(
      (data) => {
        if (data.length) {
          this.listpol = data.map(function (e) {
            return e.tgl;
          });
          this.listtot = data.map(function (e) {
            return parseInt(e.hasil);
          });

          this.kdlabshow = a;
          this.nmlabshow = b;
          this.min = c;
          this.max = d;

          this.kdlabshowc = true;
        } else {
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  showgrafikx(a) {
    this.kdlabshow = "";
    this.kdlabshowc = false;
  }

  showrujuk: boolean;
  kddiagnosabpjs: any;
  kddiagnosabpjs2: any = null;
  kddiagnosabpjs3: any = null;

  diagnosaambilpcareall() {
    this.authService.diagnosaambilpcare(this.notrans, this.kdcabang).subscribe(
      (data) => {
        if (data.length) {
          // for (let x of data )
          // {
          //   this.kddiagnosabpjs = x.kddiagnosa

          // }

          this.kddiagnosabpjs = data[0].kddiag1;
          this.kddiagnosabpjs2 = data[0].kddiag2;
          this.kddiagnosabpjs3 = data[0].kddiag3;

          console.log(
            this.kddiagnosabpjs,
            this.kddiagnosabpjs2,
            this.kddiagnosabpjs3
          );
        } else {
          this.kddiagnosabpjs = "";
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  pilihstatuspulang(a, contentkonsultasi) {
    // this.authService.diagnosaambilpcare(this.notrans,this.kdcabang)
    // .subscribe(
    //   data => {

    //     if(data.length){
    //       for (let x of data )
    //       {

    //         this.kddiagnosabpjs = x.kddiagnosa

    //       }

    //     }else{

    //       this.kddiagnosabpjs = ''
    //     }

    // },
    //   Error => {

    //    console.log(Error)
    //   }
    // )

    if (a === "4") {
      this.showrujuk = true;
      this.tampildaigtindakinput();
    } else if (a === "6") {
      this.showrujuk = false;
      this.perminkon(contentkonsultasi);
    } else {
      this.showrujuk = false;
    }
  }

  tiperujuk: string = "";
  stspulang: any = "3";
  kesadaran: string = "01";
  spesialis: string = "";
  sspesialis: string = "";
  sarana: string = "";
  nsarana: string = "";
  showloadingper: boolean;
  showloadingpers: boolean;
  tspesialis: any;
  showrujuknon: boolean;
  showrujuknonkusus: boolean;
  tkhusus: any;
  khususap: string = "";

  pilihtiperujuk(a) {
    if (a === "01") {
      this.showrujuknon = true;
      this.showrujuknonkusus = false;
      this.showloadingper = true;
      this.showthahem = false;

      this.authService.spesialispcare().subscribe(
        (data) => {
          if (data) {
            this.showloadingper = false;
            this.tspesialis = data.response.list;
          } else {
            this.showloadingper = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else {
      this.showrujuknon = false;
      this.showrujuknonkusus = true;
      this.showloadingper = true;
      this.showthahem = false;

      this.authService.refkhusus().subscribe(
        (data) => {
          if (data) {
            this.tkhusus = data.response.list;
            this.showloadingper = false;
          } else {
            this.showloadingper = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    }
  }
  tspesialissub: any;

  pilihsubsp(a) {
    this.showloadingpers = true;
    this.authService.subspesialis(a).subscribe(
      (data) => {
        if (data) {
          this.showloadingpers = false;
          this.tspesialissub = data.response.list;
        } else {
          this.showloadingpers = false;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  showloadingperss: boolean;
  tsarana: any;

  ksarana(a) {
    if (a === "02") {
      this.showloadingperss = true;
      this.authService.sarana().subscribe(
        (data) => {
          if (data) {
            this.showloadingperss = false;
            this.tsarana = data.response.list;
          } else {
            this.showloadingperss = false;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else {
      this.tsarana = "";
    }
  }
  showfaskes: boolean;
  tfaskesbpjs: any;
  tmcu: any;

  hasilmcu() {
    this.authService.getBpjsMCU(this.nokunjungan).subscribe(
      (data: any) => {
        if ((data.success = true)) {
          this.tmcu = data.data.list;
        } else {
          this.toastr.error(data.message);
        }
      },
      (error) => {}
    );
  }

  klistfaskes(content) {
    if (this.alerttacc === "1") {
      if (this.alasantacc === "") {
        this.toastr.error(
          "diagnosa ini ketika di rujuk harus menggunakan TACC , silahkan pilih tacc dan alasanya terlebih dahulu"
        );
        return;
      } else {
        this.showfaskes = true;

        this.authService
          .getfaskessp(
            this.sspesialis,
            this.nsarana,
            this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy")
          )
          .subscribe(
            (data) => {
              if (data) {
                if (data.metaData.code == 401) {
                  this.showfaskes = false;
                  this.toastr.error(data.metaData.message, "Eror");
                } else {
                  this.showfaskes = false;

                  this.tfaskesbpjs = data.response.list;

                  this.modalService.open(content, {
                    size: "lg",
                  });
                }
              } else {
                this.showfaskes = false;
              }
            },
            (Error) => {
              console.log(Error);
            }
          );
      }
    } else {
      this.showfaskes = true;

      this.authService
        .getfaskessp(
          this.sspesialis,
          this.nsarana,
          this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy")
        )
        .subscribe(
          (data) => {
            if (data) {
              if (data.metaData.code == 401) {
                this.showfaskes = false;
                this.toastr.error(data.metaData.message, "Eror");
              } else {
                this.showfaskes = false;

                this.tfaskesbpjs = data.response.list;

                this.modalService.open(content, {
                  size: "lg",
                });
              }
            } else {
              this.showfaskes = false;
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
    }

    // if(this.tdiag[0].diag === null && this.alasantacc !='1' ){

    //   console.log('b');

    //   this.showfaskes = true;

    //   this.authService.getfaskessp(this.sspesialis,this.sarana,this.pipe.transform(this.mydaterujuk, 'dd-MM-yyyy'))
    //   .subscribe(
    //     data => {

    //       if(data){

    //         if(data.metaData.code == 401  ){
    //           this.showfaskes = false;
    //           this.toastr.error(data.metaData.message, 'Eror');

    //         }else{
    //           this.showfaskes = false;

    //           this.tfaskesbpjs = data.response.list

    //            this.modalService.open(content, {
    //              size: 'lg'
    //            });

    //         }

    //       }else{
    // this.showfaskes = false;

    //       }

    //   },
    //     Error => {

    //      console.log(Error)
    //     }
    //   )

    // }else{

    //   console.log('a');
    //   const swalWithBootstrapButtons = Swal.mixin({
    //     customClass: {
    //       confirmButton: 'btn btn-danger',
    //       cancelButton: 'btn btn-success'
    //     },
    //     buttonsStyling: false
    //   });

    //   swalWithBootstrapButtons.fire({
    //     title: 'Warning TACC',
    //     text: 'Apakah anda yakin akan rujuk tanpa TACC ',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Ya,Yakin',
    //     cancelButtonText: 'Batal',
    //     reverseButtons: true
    //   }).then((result) => {
    //     if (result.value) {

    //       this.showfaskes = true;

    //       this.authService.getfaskessp(this.sspesialis,this.sarana,this.pipe.transform(this.mydaterujuk, 'dd-MM-yyyy'))
    //       .subscribe(
    //         data => {

    //           if(data){

    //             if(data.metaData.code == 401  ){
    //               this.showfaskes = false;
    //               this.toastr.error(data.metaData.message, 'Eror');

    //             }else{
    //               this.showfaskes = false;

    //               this.tfaskesbpjs = data.response.list

    //                this.modalService.open(content, {
    //                  size: 'lg'
    //                });

    //             }

    //           }else{
    //     this.showfaskes = false;

    //           }

    //       },
    //         Error => {

    //          console.log(Error)
    //         }
    //       )

    //     } else if (
    //       /* Read more about handling dismissals below */
    //       result.dismiss === Swal.DismissReason.cancel
    //     ) {
    //       // swalWithBootstrapButtons.fire(
    //       //   'Cancelled',
    //       //   'Your imaginary file is safe :)',
    //       //   'error'
    //       // );
    //     }
    //   });

    // }
  }
  klistfaskesx(content) {
    if (this.thanon == 0) {
      console.log("ambiligd");

      //   this.showfaskes = true;

      this.authService
        .refrujukankusus(
          "1",
          this.khususap,
          this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy"),
          this.sspesialis,
          this.noasuransi
        )
        .subscribe(
          (data) => {
            if (data) {
              if (data.metaData.code == 401) {
                this.toastr.error(data.metaData.message, "Eror");
              } else if (data.metaData.code == 204) {
                this.toastr.error(data.metaData.message, "Eror");
              } else {
                // this.toastr.success(data.metaData.message, "");
                this.showfaskes = false;

                this.tfaskesbpjs = data.response.list;

                this.modalService.open(content, {
                  size: "lg",
                });
              }
            } else {
              this.showfaskes = false;
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else {
      console.log("noigd");

      this.authService
        .refrujukankusus(
          "2",
          this.khususap,
          this.pipe.transform(this.mydaterujuk, "dd-MM-yyyy"),
          this.sspesialis,
          this.noasuransi
        )
        .subscribe(
          (data) => {
            if (data) {
              if (data.metaData.code == 401) {
                this.showfaskes = false;
                this.toastr.error(data.metaData.message, "Eror");
              } else if (data.metaData.code == 204) {
                this.toastr.error(data.metaData.message, "Eror");
              } else {
                this.showfaskes = false;
                // this.toastr.success(data.metaData.message, "");
                this.tfaskesbpjs = data.response.list;

                this.modalService.open(content, {
                  size: "lg",
                });
              }
            } else {
              this.showfaskes = false;

              this.toastr.error(data.metaData.message, "Eror");
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
    }
  }
  jadwalpraktek: any;
  pilihfaskes(a, b, c) {
    this.kodeppk = a;
    this.namafaskes = b;
    this.jadwalpraktek = c;
    this.modalService.dismissAll();
  }
  kodeppk: string = "";
  namafaskes: string = "";
  showthahem: boolean;
  thanon: number;

  pilihrefkusus(a) {
    console.log(a);
    if (a === "THA") {
      this.thanon = 1;

      this.showthahem = true;
      this.authService.spesialispcare().subscribe(
        (data) => {
          if (data) {
            this.tspesialis = data.response.list;
          } else {
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else if (a === "HEM") {
      this.thanon = 1;

      this.showthahem = true;
      this.authService.spesialispcare().subscribe(
        (data) => {
          if (data) {
            this.tspesialis = data.response.list;
          } else {
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else {
      this.thanon = 0;

      this.showthahem = false;
    }
  }

  produkdise: any;
  tkomp: any;
  totaljasakom: number;
  totaldiscnom: number;

  tmpkomp(a, b, c) {
    this.authService.listkomponentrx(this.kdcabang, a, b, c).subscribe(
      (data) => {
        this.tkomp = data;

        var xyz: number = 0;
        var xyzx: number = 0;

        for (let product of data) {
          var y = parseInt(product.jasa);
          xyz += y;

          var x = parseInt(product.nominal);
          xyzx += x;
        }

        this.totaljasakom = xyz;
        this.totaldiscnom = xyzx;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  diskonprodukp(
    content,
    nomor,
    kdproduk,
    produk,
    notransaksi,
    harga,
    nofaktur
  ) {
    this.tmpkomp(notransaksi, kdproduk, nomor);

    this.produkdise = produk;

    this.modalService.open(content).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  discpp(nomor, kdproduk, notrans, kdkomponen, nofaktur) {
    console.log(nomor, kdproduk, notrans, kdkomponen);

    Swal.fire({
      title: "Masukan Presentase diskon %",
      input: "number",
      customClass: {
        validationMessage: "my-validation-message",
      },
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Qty Belum di isi'
          );
        } else {
          if (value > 100) {
            this.toastr.error("Tidak Boleh 100%", "Eror");
          } else {
            let body = {
              user: this.username,
              notransaksi: notrans,
              kdproduk: kdproduk,
              produk: "",
              kdpoli: this.kdpoli,
              qty: value,
              harga: "",
              debet: "",
              kridit: 0,
              jenistransaksi: "DB",
              tarifasli: "",
              disc: value,
              nofaktur: nofaktur,
              kdkomponen: kdkomponen,
              kdcabang: this.kdcabang,
              kdklinik: this.kdklinik,
              kddokter: this.kddokter,
              nomorx: nomor,
              stssimpan: "5",
              ri: "0",
            };

            this.authService.simpantrxrj(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.tmpkomp(notrans, kdproduk, nomor);

                  this.tmptrans();
                }, 200);
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          }
        }
      },
    });
  }

  tpolitunjang: any;
  politunjang: any;

  perminkon(content) {
    this.authService.poli(this.kdcabang).subscribe(
      (data) => {
        if (data) {
          this.tpolitunjang = data;

          this.modalService.open(content).result.then(
            (result) => {},
            (reason) => {}
          );
        } else {
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tdoktunjang: any;
  doktunjang: any;
  kdpolibpjsinternal: any = null;
  pilihklinik(a) {
    this.authService.dokterperpolix(this.kdcabang, a).subscribe(
      (data) => {
        this.tdoktunjang = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.polibyid(this.kdcabang, a).subscribe(
      (data) => {
        this.kdpolibpjsinternal = data[0].kdpolibpjs;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  pilihdokterr(a) {
    this.authService
      .cekjadwal(a, this.politunjang, this.tglp)
      .subscribe((data) => {
        if (data.length) {
          this.jadwal = data[0].jadwal;
          console.log(this.jadwal);
        } else {
        }
      });
  }
  tkunjungan: any;
  nmPst: any;
  nokaPst: any;
  noRujukan: any;
  tglKunjungan: any;
  tglEstRujuk: any;
  tglAkhirRujuk: any;
  nmPPK: any;
  kdPPK: any;

  nmPoli: any;
  kdPoli: any;

  kdDiag: any;
  nmDiag: any;

  nmPPKa: any;
  kdPPKa: any;
  nmDokter: any;
  kdDati: any;
  nmDati: any;
  nmKR: any;
  pisa: any;
  ketPisa: any;

  cekkunjungan(content) {
    this.authService.listpcare(this.nokunjungan).subscribe(
      (data) => {
        if (data.metaData.code == "200") {
          this.tkunjungan = data.response;

          this.nmPst = data.response.nmPst;
          this.nokaPst = data.response.nokaPst;
          this.noRujukan = data.response.noRujukan;

          this.tglKunjungan = data.response.tglKunjungan;
          this.tglEstRujuk = data.response.tglEstRujuk;
          this.tglAkhirRujuk = data.response.tglAkhirRujuk;

          this.nmPPK = data.response.ppkRujuk.nmPPK;
          this.kdPPK = data.response.ppkRujuk.kdPPK;
          this.nmPoli = data.response.poli.nmPoli;
          this.kdPoli = data.response.poli.kdPoli;
          this.kdDiag = data.response.diag1.kdDiag;
          this.nmDiag = data.response.diag1.nmDiag;

          this.nmPPKa = data.response.ppk.nmPPK;
          this.kdPPKa = data.response.ppk.kdPPK;
          this.nmDokter = data.response.dokter.nmDokter;

          this.kdDati = data.response.ppk.kc.dati.kdDati;
          this.nmDati = data.response.ppk.kc.dati.nmDati;
          this.nmKR = data.response.ppk.kc.kdKR.nmKR;
          this.pisa = data.response.pisa;
          this.ketPisa = data.response.ketPisa;
          this.jadwalpraktek = data.response.jadwal;
          setTimeout(() => {
            this.modalService.open(content, {
              size: "lg",
            });
          }, 300);
        } else {
          this.toastr.error(data.metaData.message, "Eror");
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  cetaklembarrj() {
    let body = {
      nmPst: this.nmPst,
      nokaPst: this.nokaPst,
      noRujukan: this.noRujukan,
      tglKunjungan: this.tglKunjungan,
      tglEstRujuk: this.tglEstRujuk,
      tglAkhirRujuk: this.tglAkhirRujuk,
      nmPPK: this.nmPPK,
      kdPPK: this.kdPPK,
      nmPoli: this.nmPoli,
      kdPoli: this.kdPoli,
      kdDiag: this.kdDiag,
      nmDiag: this.nmDiag,
      nmPPKa: this.nmPPKa,
      kdPPKa: this.kdPPKa,
      nmDokter: this.nmDokter,
      kdDati: this.kdDati,
      nmDati: this.nmDati,
      nmKR: this.nmKR,
      kduser: this.kduser,
      stssimpan: "1",
      pisa: this.pisa,
      ketpisa: this.ketPisa,
      notransaksi: this.notransaksi,
      jadwal: this.jadwalpraktek,
    };

    console.log(body);

    this.authService.simpanlembarrj(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        if (this.kdPPK == null) {
          var redirectWindow = window.open(
            this.URLINVOICE +
              "clenic/pcare/cetakkunjungan.php?nokunjungan=" +
              this.noRujukan,
            "_blank",
            "location=no,toolbar=no,height=" +
              screen.height +
              ",width=" +
              screen.width +
              ",scrollbars=yes,status=yes"
          );
          redirectWindow.location;
        } else {
          var redirectWindow = window.open(
            this.URLINVOICE +
              "clenic/pcare/cetakrujukan.php?nokunjungan=" +
              this.noRujukan,
            "_blank",
            "location=no,toolbar=no,height=" +
              screen.height +
              ",width=" +
              screen.width +
              ",scrollbars=yes,status=yes"
          );
          redirectWindow.location;
        }
      } else {
        this.toastr.error("Simpan  Gagal", "Eror");
      }
    });
  }
  cetakrwjkunjunganb(a, b) {
    this.authService.listpcare(a).subscribe(
      (data) => {
        if (data.metaData.code == "200") {
          this.tkunjungan = data.response;

          this.nmPst = data.response.nmPst;
          this.nokaPst = data.response.nokaPst;
          this.noRujukan = data.response.noRujukan;

          this.tglKunjungan = data.response.tglKunjungan;
          this.tglEstRujuk = data.response.tglEstRujuk;
          this.tglAkhirRujuk = data.response.tglAkhirRujuk;

          this.nmPPK = data.response.ppkRujuk.nmPPK;
          this.kdPPK = data.response.ppkRujuk.kdPPK;
          this.nmPoli = data.response.poli.nmPoli;
          this.kdPoli = data.response.poli.kdPoli;
          this.kdDiag = data.response.diag1.kdDiag;
          this.nmDiag = data.response.diag1.nmDiag;

          this.nmPPKa = data.response.ppk.nmPPK;
          this.kdPPKa = data.response.ppk.kdPPK;
          this.nmDokter = data.response.dokter.nmDokter;

          this.kdDati = data.response.ppk.kc.dati.kdDati;
          this.nmDati = data.response.ppk.kc.dati.nmDati;
          this.nmKR = data.response.ppk.kc.kdKR.nmKR;
          this.pisa = data.response.pisa;
          this.ketPisa = data.response.ketPisa;
          this.jadwalpraktek = data.response.jadwal;

          let body = {
            nmPst: this.nmPst,
            nokaPst: this.nokaPst,
            noRujukan: this.noRujukan,
            tglKunjungan: this.tglKunjungan,
            tglEstRujuk: this.tglEstRujuk,
            tglAkhirRujuk: this.tglAkhirRujuk,
            nmPPK: this.nmPPK,
            kdPPK: this.kdPPK,
            nmPoli: this.nmPoli,
            kdPoli: this.kdPoli,
            kdDiag: this.kdDiag,
            nmDiag: this.nmDiag,
            nmPPKa: this.nmPPKa,
            kdPPKa: this.kdPPKa,
            nmDokter: this.nmDokter,
            kdDati: this.kdDati,
            nmDati: this.nmDati,
            nmKR: this.nmKR,
            kduser: this.kduser,
            stssimpan: "1",
            pisa: this.pisa,
            ketpisa: this.ketPisa,
            notransaksi: this.notransaksi,
            jadwal: this.jadwalpraktek,
          };

          console.log(body);

          this.authService.simpanlembarrj(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              if (b === "4") {
                var redirectWindow = window.open(
                  this.URLINVOICE +
                    "clenic/pcare/cetakrujukan.php?nokunjungan=" +
                    a,
                  "_blank",
                  "location=no,toolbar=no,height=" +
                    screen.height +
                    ",width=" +
                    screen.width +
                    ",scrollbars=yes,status=yes"
                );
                redirectWindow.location;
              } else {
                var redirectWindow = window.open(
                  this.URLINVOICE +
                    "clenic/pcare/cetakkunjungan.php?nokunjungan=" +
                    a,
                  "_blank",
                  "location=no,toolbar=no,height=" +
                    screen.height +
                    ",width=" +
                    screen.width +
                    ",scrollbars=yes,status=yes"
                );
                redirectWindow.location;
              }
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else {
          this.toastr.error(data.response[0].message, "Eror");
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  hapuskunjungan(a, b) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Batal Rujukan/Kunjungan",
        text: "Apakah Anda Yakin Batal Kunjungan",

        showCancelButton: true,

        cancelButtonText: "Batal",
        confirmButtonText: "Hapus",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.authService.listpcare(a).subscribe(
            (data) => {
              if (data.metaData.code == "200") {
                this.authService.deletekunjungan(a).subscribe(
                  (data) => {
                    console.log(data);

                    if (data.metaData.code == 200) {
                      this.toastr.success(data.metaData.message, "Eror");
                      this.getriwayatkunjungan();
                    } else {
                      this.toastr.error(data.response[0].message, "Sukses", {
                        timeOut: 2000,
                      });
                    }
                  },
                  (Error) => {
                    console.log(Error);
                  }
                );
              } else {
                this.toastr.error(data.response[0].message, "Eror");
              }
            },
            (Error) => {
              console.log(Error);
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }
  cetakrwrj(a) {
    var redirectWindow = window.open(
      this.URLINVOICE + "clenic/pcare/cetakrujukan.php?nokunjungan=" + a,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  hapusrujukan1() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Batal Kunjungan",
        text: "Apakah Anda Yakin Batal Kunjungan",

        showCancelButton: true,

        cancelButtonText: "Batal",
        confirmButtonText: "Hapus",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          // this.kirimpcareedit()

          this.authService.deletekunjungan(this.noRujukan).subscribe(
            (data) => {
              if (data.metaData.code === 200) {
                let body = {
                  notransaksi: this.notransaksi,
                  stssimpan: "3",
                  kdpoli: this.kdpoli,
                  nokaPst: this.noasuransi,
                  noRujukan: this.noRujukan,
                  username: this.username,
                };

                this.authService.updatepcare(body).subscribe((response) => {
                  if (response) {
                    this.toastr.success("", "Sukses", {
                      timeOut: 2000,
                    });

                    this.tampildata();

                    this.modalService.dismissAll();
                  }
                });
              } else {
                this.toastr.error(data.metaData.message, "", {
                  timeOut: 2000,
                });
              }
            },
            (Error) => {
              console.log(Error);
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }
  hapusrujukan() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Batal Rujuk",
        text: "Apakah Anda Yakin Batal Rujuk Berganti ke Berobat Jalan",

        showCancelButton: true,

        cancelButtonText: "Batal",
        confirmButtonText: "Ganti",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.kirimpcareedit();

          // this.authService.deletekunjungan(this.noRujukan)
          // .subscribe(
          //   data => {

          // },
          //   Error => {

          //    console.log(Error)
          //   }
          // )

          let body = {
            notransaksi: this.notransaksi,
            stssimpan: "3",
            kdpoli: this.kdpoli,
            nokaPst: this.noasuransi,
            noRujukan: this.noRujukan,
          };

          this.authService.updatepcare(body).subscribe((response) => {
            if (response) {
              this.toastr.success("", "Sukses", {
                timeOut: 2000,
              });

              this.tampildata();

              this.modalService.dismissAll();
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // );
        }
      });
  }

  notransresponse: any;
  jadwal: any;

  simpankonsul() {
    this.authService
      .verifdaftar(this.norm, this.kdcabang, this.politunjang, this.myDate)
      .subscribe(
        (data) => {
          if (data.length) {
            this.toastr.error("Anda Sudah Terdaftar di Poli yang sama", "Eror");
          } else {
            let body = {
              norm: this.norm,
              pasien: this.pasien,
              indetitas: this.tandapengenal,
              noindetitas: this.nopengenal,
              kduser: this.username,
              hp: this.hp,
              kdpoli: this.politunjang,
              kddokter: this.doktunjang,
              kelas: "1",
              tgldaftar: this.myDate,
              kostumer: this.kdkostumer,
              kdkostumer: this.kdkostumerd,
              noasuransi: this.noasuransi,
              kdcabang: this.kdcabang,
              kdklinik: this.kdklinik,
              stssimpan: "1",
              kdprovider: this.kdprovider,
            };

            this.authService.simpandaftarrj(body).subscribe((response) => {
              if (response) {
                this.toastr.success("Berhasil" + response, "Sukses", {
                  timeOut: 2000,
                });

                this.notransresponse = response;

                this.authService
                  .pasienantrian(this.kdcabang, "2", response, "", "")
                  .subscribe(
                    (data) => {
                      setTimeout(() => {
                        let bodyAddFktp = {
                          nomorkartu: data[0].noasuransi,
                          nik: data[0].nopengenal,
                          nohp: "082176678897",
                          kodepoli: this.kdpolibpjsinternal,
                          namapoli: data[0].nampoli,
                          norm: data[0].norm,
                          tanggalperiksa: data[0].tglpriksa,
                          kodedokter: parseInt(data[0].kddokterbpjs),
                          namadokter: data[0].namdokter,
                          jampraktek: this.jadwal,
                          nomorantrean:
                            data[0].kodeantrian + "-" + data[0].noantrian,
                          angkaantrean: parseInt(data[0].noantrian),
                          keterangan: "daftar",
                        };

                        console.log(bodyAddFktp);
                        this.authService
                          .addBpjsAntrian(bodyAddFktp, this.slug)
                          .subscribe((response) => {
                            if (response.data.code == 200) {
                              this.toastr.success(
                                response.data.message,
                                "Sukses",
                                {
                                  timeOut: 2000,
                                }
                              );

                              setTimeout(() => {
                                let bodyeditfarmasiterkirim = {
                                  stssimpan: "3",
                                  notransaksi: this.notransresponse,
                                };

                                this.authService
                                  .editobatsk(bodyeditfarmasiterkirim)
                                  .subscribe((response) => {
                                    console.log(response);
                                  });
                              }, 0);
                            } else {
                              this.toastr.error(response.data.message, "");
                            }
                          });
                      }, 0);
                    },
                    (Error) => {
                      console.log(Error);
                    }
                  );

                let body = {
                  kdcabang: this.kdcabang,
                  isi: this.catatankon,
                  notransasal: this.notrans,
                  notrans: response,
                  kddokterasal: this.kddokter,
                  kddokter: this.doktunjang,
                  stssimpan: "1",
                };

                this.authService.simpankonsulrj(body).subscribe((response) => {
                  this.catatankon = "";
                  this.doktunjang = "";
                  this.politunjang = "";

                  this.tmpkonsul();

                  this.modalService.dismissAll();
                });

                this.authService
                  .updateCppt(this.slug, {
                    norm: this.norm,
                    notrans: this.notransresponse,
                    kdcabang: this.kdcabang,
                    kduser: this.kduser,
                    kdpoli: this.politunjang,
                    kddokter: this.doktunjang,
                    hr: this.hr,
                    nadi: this.nadi,
                    suhu: this.suhu,
                    rr: this.rr,
                    spo: this.spo,
                    lp: this.lingkarperut,
                    td: this.td,
                    tdd: this.tdd,
                    tb: this.tb,
                    bb: this.bb,
                    imt: this.imt,
                    skalanyeri: this.skalanyeri,
                    lingkarkepala: this.lingkarkepala,
                    lingkarlenganatas: this.lingkarlenganatas,
                    lingkarbetis: this.lingkarbetis,
                    subjek: this.subjek,
                    subjekp: this.subjekp,
                  })
                  .subscribe();

                this.simpan();
              } else {
                this.toastr.error("Simpan  Gagal", "Eror");
              }
            });
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  batalpriksa(notransaksi, norm, kddokter, kdpoli) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus Transaksi?",
        text: "Yakin Akan Batal Priksa",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            kdcabang: this.kdcabang,
            notransaksi: notransaksi,
            norm: norm,
            kddokter: kddokter,
            kdpoli: kdpoli,
            kduser: this.username,
            stssimpan: "1",
          };

          this.authService.hapustrx(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "-", {
                timeOut: 2000,
              });

              let body = {
                kdcabang: this.kdcabang,
                isi: this.catatankon,
                notransasal: this.notrans,
                notrans: notransaksi,
                kddokterasal: this.kddokter,
                kddokter: this.doktunjang,
                stssimpan: "2",
              };

              this.authService.simpankonsulrj(body).subscribe((response) => {
                this.tmpkonsul();
              });
            } else {
              this.toastr.error("Simpan  Gagal", "Eror");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  }

  cetaklabview() {
    var redirectWindow = window.open(
      this.URLINVOICE + "clenic/report/hasillabview.php?norm=" + this.norm,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  pfkulitinspeksi: any = "Normal: kulit tidak ada ikterik/pucat/sianosis.";
  pfkulitpalpasi: any = "Normal: lembab, turgor baik/elastic, tidak ada edema";

  pfkukuinspeksi: any =
    "Normal: bersih, bentuk normaltidak ada tanda-tanda jari tabuh (clubbing finger), tidak ikterik/sianosis";
  pfkukupalpasi: any = "Normal: aliran darah kuku akan kembali < 3 detik.";

  myValue = false;

  changeValueEvent() {
    console.log("myValue:", this.myValue);
  }

  myvaluekuku = false;

  changeValueEventkuku() {
    console.log("myValue:", this.myvaluekuku);
  }

  myvaluekepala = false;
  pfkepalainspeksi: any =
    "Normal: simetris, bersih, tidak ada lesi, tidak menunjukkan tanda-tanda kekurangan gizi(rambut jagung dan kering";
  pfkepalapalpasi: any =
    " Normal: tidak ada penonjolan /pembengkakan, rambut lebat dan kuat/tidak rapuh";
  kkepala() {
    console.log("myValue:", this.myvaluekepala);
  }

  myvaluewajah = false;
  pfwajahinspeksi: any =
    "Normal: warna sama dengan bagian tubuh lain,  tidak pucat/ikterik, simetris.";
  pfwajahpalpasi: any = "Normal: tidak ada nyeri tekan dan edema";

  kwajah() {
    this.myvaluewajah;
  }
  myvaluemata = false;
  pfmatainspeksi: any =
    "Normal: simetris mata kika, simetris bola mata kika, warna konjungtiva pink, dan sclera berwarna putih.";

  kmata() {
    this.myvaluemata;
  }
  myvaluetelinga = false;
  pftelingainspeksi =
    "Normal: bentuk dan posisi simetris kika, integritas kulit bagus, warna sama dengan kulit lain, tidak ada tanda-tanda infeksi, dan alat bantu dengar.";
  pftelingapalpasi = "Normal: tidak ada nyeri tekan.";
  ktelinga() {
    this.myvaluetelinga;
  }
  myvaluehidung = false;
  pfhidunginspeksi =
    "Normal: simetris kika, warna sama dengan warna kulit lain, tidak ada lesi, tidak ada sumbatan, perdarahan dan tanda-tanda infeksi.";
  pfhidungapalpasi = "Normal: tidak ada bengkak dan nyeri tekan.";
  khidung() {
    this.myvaluehidung;
  }
  myvaluemulut = false;
  pfmulutinspeksi =
    "Normal: warna mukosa mulut dan bibir pink, lembab, tidak ada lesi dan stomatitis";
  pfmulutapalpasi =
    "Normal: gigi lengkap, tidak ada tanda-tanda gigi berlobang atau kerusakan gigi, tidak ada perdarahan atau radang gusi, lidah simetris, warna pink, langit2 utuh dan tidak ada tanda infeksi";

  kmulut() {
    this.myvaluemulut;
  }
  myvalueleher = false;

  pfleherinspeksi =
    " Normal: warna sama dengan kulit lain, integritas kulit baik, bentuk simetris, tidak ada pembesaran kelenjer gondok";
  pfleheria = "Normal: arteri karotis terdengar.";
  pfleherial =
    "Normal: tidak teraba pembesaran kel.gondok,tidak ada nyeri tidak ada pembesaran kel.limfe, tidak ada nyeri.";

  kleher() {
    this.myvalueleher;
  }
  myvaluedada = false;
  kdada() {
    this.myvaluedada;
  }
  myvalueperut = false;
  kperut() {
    this.myvalueperut;
  }

  myvalueatas = false;
  katas() {
    this.myvalueatas;
  }

  keterangangambar: any = "";

  tmpku() {
    this.authService.tampilku(this.notrans).subscribe((data) => {
      for (let x of data) {
        console.log(x.kulit);

        if (x.kulit == 1) {
          this.myValue = true;
        }
        if (x.kuku == 1) {
          this.myvaluekuku = true;
        }

        if (x.kepala == 1) {
          this.myvaluekepala = x.kepala;
        }

        if (x.wajah == 1) {
          this.myvaluewajah = x.wajah;
        }
        if (x.mata == 1) {
          this.myvaluemata = x.mata;
        }
        if (x.telinga == 1) {
          this.myvaluetelinga = x.telinga;
        }
        if (x.hidung == 1) {
          this.myvaluehidung = x.hidung;
        }

        if (x.mulut == 1) {
          this.myvaluemulut = x.mulut;
        }
        if (x.leher == 1) {
          this.myvalueleher = x.leher;
        }
        if (x.dada == 1) {
          this.myvaluedada = x.dada;
        }

        if (x.abdomen == 1) {
          this.myvalueperut = x.abdomen;
        }

        if (x.ekstermis == 1) {
          this.myvalueatas = x.ekstermis;
        }

        this.keterangangambar = x.keterangan;
      }
    });
  }
  simpankeadaaanfisik() {
    let body = {
      kulit: this.myValue,
      kuku: this.myvaluekuku,
      kepala: this.myvaluekepala,
      wajah: this.myvaluewajah,
      mata: this.myvaluemata,
      telinga: this.myvaluetelinga,
      hidung: this.myvaluehidung,
      mulut: this.myvaluemulut,
      leher: this.myvalueleher,
      dada: this.myvaluedada,
      abdomen: this.myvalueperut,
      ekstermis: this.myvalueatas,
      keterangan: this.keterangangambar,
      notransaksi: this.notransaksi,
      norm: this.norm,
    };

    this.authService.simpanku(body).subscribe((response) => {});
  }
  halaman: any;
  halamanrm: boolean;

  lihatbid(a) {
    this.halamanrm = true;

    this.halaman = a;
  }
  showcppt() {
    //  this.halamanrm = true;
  }

  kdtacc: any = "-1";
  alasantacc: any = "";
  labels: any[];
  showsatu: boolean;
  showdua: boolean;
  showtiga: boolean;
  showempat: boolean;
  kddiagb: any = "";
  namadiagb: any = "";

  pilihtacc(a) {
    if (a === "-1") {
      console.log("tnpa");
      this.alasantacc = "";
      this.showsatu = false;
      this.showdua = false;
      this.showtiga = false;
      this.showempat = false;
    } else if (a === "1") {
      this.showsatu = true;
      this.showdua = false;
      this.showtiga = false;
      this.showempat = false;
    } else if (a === "2") {
      this.showsatu = false;
      this.showdua = true;
      this.showtiga = false;
      this.showempat = false;
    } else if (a === "3") {
      this.showsatu = false;
      this.showdua = false;
      this.showtiga = true;
      this.showempat = false;

      this.authService.cekdiag(this.notransaksi).subscribe(
        (data) => {
          for (let x of data) {
            this.kddiagb = x.kddiagnosa;
            this.namadiagb = x.diagnosa;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );

      this.alasantacc = this.kddiagb + " - " + this.namadiagb;
    } else if (a === "4") {
      this.showsatu = false;
      this.showdua = false;
      this.showtiga = false;
      this.showempat = true;
    }
  }
  alergiudara: string = "00";
  alergiobat: string = "00";
  kdprognosa: string = "01";
  monitoringshowcontenticare: boolean;
  icareurl: SafeResourceUrl;

  icare() {
    // this.toastr.error('nik atau nomor kartu tidak valid', 'Eror');

    let body = {
      data: {
        param: this.noasuransi,
        kddokter: this.kddokter,
      },
    };
    this.authService.icare(body).subscribe((response) => {
      // console.log(response.response.url)

      if (response.metaData.code == 200) {
        this.monitoringshowcontenticare = true;
        this.icareurl = this.domSanitizer.bypassSecurityTrustResourceUrl(
          response.response.url
        );
      } else if (response.metaData.code === 401) {
        this.toastr.error(response.metaData.message, "Eror");
      } else if (response.metaData.code === 412) {
        this.toastr.error(response.metaData.message, "Eror");
      } else {
        this.toastr.error(response.metaData.message, "Eror");
      }
    });
  }

  hapustransaksi() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    Swal.fire({
      title: "Batalkan Pendaftaran",
      text: "Alasan mengapa pendaftaran ingin dibatalkan?",
      input: "textarea",
      inputPlaceholder: "Alasan anda",
      confirmButtonText: "Ya, Batal Daftar",
      showDenyButton: true,
      denyButtonText: "Tidak",
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage("Wajib Diisi");
        } else {
          if (this.dash === "BPJS") {
            let bodyFktp = {
              tanggalperiksa: this.tglpriksa,
              kodepoli: this.kdpolibpjs,
              nomorkartu: this.noasuransi,
              alasan: "--",
            };
            this.authService
              .cancelBpjsAntrian(bodyFktp, this.slug)
              .subscribe((data) => {
                if (data.data.code == 200) {
                  this.toastr.success(data.data.message, "Sukses", {
                    timeOut: 2000,
                  });

                  this.authService
                    .deletekunjungan(this.nokunjungan)
                    .subscribe((data) => {
                      console.log(data);

                      if (data.metaData.code == 200) {
                        let body = {
                          kdcabang: this.kdcabang,
                          notransaksi: this.notrans,
                          norm: this.norm,
                          kddokter: this.kddokter,
                          kdpoli: this.kdpoli,
                          kduser: this.username,
                          stssimpan: "1",
                        };

                        this.authService
                          .hapustrx(body)
                          .subscribe((response) => {});

                        this.toastr.success(data.response, "Sukses", {
                          timeOut: 2000,
                        });
                      } else {
                        this.authService
                          .deletependaftaranpcarev(
                            this.noasuransi,
                            this.tglpriksa,
                            this.noantrianbpjs,
                            this.kdpolibpjs
                          )
                          .subscribe((data) => {
                            if (data.metaData.code == 200) {
                            } else {
                            }
                          });

                        let body = {
                          kdcabang: this.kdcabang,
                          notransaksi: this.notrans,
                          norm: this.norm,
                          kddokter: this.kddokter,
                          kdpoli: this.kdpoli,
                          kduser: this.username,
                          stssimpan: "1",
                        };

                        this.authService
                          .hapustrx(body)
                          .subscribe((response) => {});

                        this.toastr.success(data.response, "Sukses", {
                          timeOut: 2000,
                        });
                      }
                    });
                } else {
                  this.authService
                    .deletekunjungan(this.nokunjungan)
                    .subscribe((data) => {
                      console.log(data);

                      if (data.metaData.code == 200) {
                        let body = {
                          kdcabang: this.kdcabang,
                          notransaksi: this.notrans,
                          norm: this.norm,
                          kddokter: this.kddokter,
                          kdpoli: this.kdpoli,
                          kduser: this.username,
                          stssimpan: "1",
                        };

                        this.authService
                          .hapustrx(body)
                          .subscribe((response) => {});

                        this.toastr.success(data.response, "Sukses", {
                          timeOut: 2000,
                        });
                      } else {
                        this.authService
                          .deletependaftaranpcarev(
                            this.noasuransi,
                            this.tglpriksa,
                            this.noantrianbpjs,
                            this.kdpolibpjs
                          )
                          .subscribe((data) => {
                            if (data.metaData.code == 200) {
                            } else {
                            }
                          });

                        let body = {
                          kdcabang: this.kdcabang,
                          notransaksi: this.notrans,
                          norm: this.norm,
                          kddokter: this.kddokter,
                          kdpoli: this.kdpoli,
                          kduser: this.username,
                          stssimpan: "1",
                        };

                        this.authService
                          .hapustrx(body)
                          .subscribe((response) => {});

                        this.toastr.success(data.response, "Sukses", {
                          timeOut: 2000,
                        });
                      }
                    });
                  this.toastr.error(data.data.message, "Error");
                }
              });
          } else {
            let body = {
              kdcabang: this.kdcabang,
              notransaksi: this.notrans,
              norm: this.norm,
              kddokter: this.kddokter,
              kdpoli: this.kdpoli,
              kduser: this.username,
              stssimpan: "1",
            };

            this.authService.hapustrx(body).subscribe((response) => {
              // this.tantrian = []
            });
          }

          // this.authService.deletekunjungan(this.nokunjungan).subscribe(
          //   (data) => {
          //     console.log(data);

          //     if (data.metaData.code == 200) {

          //       let bodyFktp = {
          //         tanggalperiksa: this.tglpriksa,
          //         kodepoli: this.kdpolibpjs,
          //         nomorkartu: this.noasuransi,
          //         alasan: "--",
          //       };
          //       this.authService
          //         .cancelBpjsAntrian(bodyFktp, this.slug)
          //         .subscribe((data) => {
          //           if (data.data.code == 200) {
          //             this.toastr.success(data.data.message, "Sukses", {
          //               timeOut: 2000,
          //             });
          //           } else {
          //             this.toastr.error(data.data.message, "Error");
          //           }
          //         });
          //     } else {
          //       let body = {
          //         kdcabang: this.kdcabang,
          //         notransaksi: this.notrans,
          //         norm: this.norm,
          //         kddokter: this.kddokter,
          //         kdpoli: this.kdpoli,
          //         kduser: this.username,
          //         stssimpan: "1",
          //       };

          //       this.authService.hapustrx(body).subscribe((response) => {
          //         // this.tantrian = []
          //       });

          //       this.toastr.success(data.response, "Sukses", {
          //         timeOut: 2000,
          //       });

          //       let bodyFktp = {
          //         tanggalperiksa: this.tglpriksa,
          //         kodepoli: this.kdpolibpjs,
          //         nomorkartu: this.noasuransi,
          //         alasan: "ss",
          //       };
          //       this.authService
          //         .cancelBpjsAntrian(bodyFktp, this.slug)
          //         .subscribe((data) => {
          //           if (data.data.code == 200) {
          //             this.toastr.success(data.data.message, "Sukses", {
          //               timeOut: 2000,
          //             });
          //           } else {
          //             this.toastr.error(data.data.message, "Error");
          //           }
          //         });

          //       // this.toastr.error(data.response[0].message, 'Sukses', {
          //       //   timeOut: 2000,
          //       // });
          //     }
          //   },
          //   (Error) => {
          //     console.log(Error);
          //   }
          // );
        }
      },
    });
  }

  generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  cetakriwayat() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/cetakriwayatedit.php?notrans=" +
        this.notrans +
        "&kdcabang=" +
        this.kdcabang +
        "&norm=" +
        this.norm,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  gantidokter(kddokter, notransaksi) {
    let payload = {
      kddokter: kddokter,
      notransaksi: notransaksi,
    };
    this.authService.updateDokter(this.slug, payload).subscribe((data: any) => {
      console.log(data);
      if (data.message) {
        this.toastr.success(data.message, "Sukses", {
          timeOut: 2000,
        });
      } else {
        this.toastr.error("Gagal Mengupdate", "Error");
      }
    });
  }

  togleEditDokter() {
    this.editdokter = !this.editdokter;
  }
}
