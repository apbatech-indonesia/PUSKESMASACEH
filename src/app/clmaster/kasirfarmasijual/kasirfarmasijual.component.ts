// ...import dan deklarasi class yang sudah ada, hapus duplikasi ini...
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ApiserviceService } from "src/app/apiservice.service";
import Swal from "sweetalert2";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

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
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { McoaComponent } from "../mcoa/mcoa.component";
import { MobatComponent } from "../mobat/mobat.component";
import { isThursday } from "date-fns";
import { mutasifarmasiComponent } from "../mutasifarmasi/mutasifarmasi.component";
import { SampleService } from "src/app/services";
import { io } from "socket.io-client";
import { GlobalComponent } from "src/app/clmaster/Globals/global.component";
import { FarmasijualService } from "./farmasijual.service";

@Component({
  selector: "app-kasirfarmasijual",
  templateUrl: "./kasirfarmasijual.component.html",
  styles: [],

  providers: [
    DatePipe,
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
export class kasirfarmasijualComponent implements OnInit {
  kajianId: string = "";
  ketidaktepatan_seleksi_obat_ket: string = "";
  dosis_kurang_ket: string = "";
  dosis_lebih_ket: string = "";
  duplikasi_ket: string = "";
  obat_tanpa_indikasi_ket: string = "";
  indikasi_tidak_diobati_ket: string = "";
  interaksi_obat_ket: string = "";
  reaksi_obat_merugikan_ket: string = "";
  gagal_menerima_obat_ket: string = "";
  // Deklarasi variabel untuk payload simpankajian baru
  norm: string = "";
  nama_pasien: string = "Ada";
  alamat_pasien: string = "Ada";
  umur: number | string = "";
  berat_badan: string = "Tidak";
  jenis_kelamin: string = "Ada";
  nama_dokter: string = "Ada";
  nomor_sip: string = "";
  alamat_dokter: string = "Tidak";
  paraf_dokter: string = "";
  tempat_tanggal_resep: string = "Tidak";
  nama_obat: string = "Ada";
  bentuk_sediaan: string = "Ada";
  kekuatan_sediaan: string = "";
  jumlah_obat: string = "Ada";
  stabilitas: string = "";
  aturan_penggunaan: string = "";
  ketidaktepatan_seleksi_obat: string = "Tidak";
  dosis_kurang: string = "Tidak";
  dosis_lebih: string = "Tidak";
  duplikasi: string = "Tidak";
  obat_tanpa_indikasi: string = "Tidak";
  indikasi_tidak_diobati: string = "Tidak";
  interaksi_obat: string = "Tidak";
  reaksi_obat_merugikan: string = "Tidak";
  gagal_menerima_obat: string = "Tidak";
  analisa: string = "";
  konseling: string = "";
  toggleMobileSidebar: any;
  faStar = faStar;
  faPlus = faPlus;
  faAngleDown = faAngleDown;
  faSearch = faSearch;
  faTags = faTags;
  faCalendarAlt = faCalendarAlt;

  heading = "Master Customer";
  subheading: any;
  icon = "pe-7s-diamond icon-gradient bg-warm-flame";

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
  tglp = "2013-12-12";
  tglpx = "2013-12-12";
  tglpxx = "2013-12-12";
  tglpxinput = "2013-12-12";
  tgldari = "2013-12-12";
  tglsampai = "2013-12-12";
  currentJustify = "start";
  currentJustify2 = "center";
  currentJustify3 = "start";

  currentOrientation = "horizontal";

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
  FormGroup: FormGroup;
  TotalRow: number;
  myDate = new Date();
  title = "autocomplete";

  options = ["Sam", "Varun", "Jasmine"];

  filteredOptions;

  formGroup: FormGroup;
  // @ViewChild('TextInput3') inputSearch3: TextInput;
  @ViewChild("myinput") df: ElementRef;
  @ViewChild("select") select: NgSelectComponent;

  @ViewChild("myinputqty") myinputqty: ElementRef;
  @ViewChild("myinputdisc") myinputdisc: ElementRef;
  @ViewChild("myinputtot") myinputtot: ElementRef;
  @ViewChild("myinputbatch") myinputbatch: ElementRef;
  @ViewChild("fokuspasien") fokuspasien: ElementRef;

  tomboledit: boolean = true;
  tombolhapus: boolean = true;
  tombolbatal: boolean = true;
  tombolmobat: boolean = true;
  tombolcetak: boolean = true;
  tombolsimpan: boolean = true;
  tomboltambah: boolean = true;
  showtransaksi: boolean = true;
  showlunas: boolean = false;
  hostName: string;
  URLINVOICE: string;
  private socketx: any;
  private baseUrl = GlobalComponent.urlsocketv;
  slug: any;
  nama_pasien_ket: any;
  umur_pasien: string = "Ada";
  umur_pasien_ket: string;
  berat_badan_ket: string = "Konfirmasi Dokter";
  jenis_kelamin_ket: string;
  nama_dokter_ket: string;
  alamat_dokter_ket: string = "Konfirmasi Dokter";
  nomor_sip_ket: string;
  tempat_tanggal_resep_ket: string = "Konfirmasi Dokter";
  paraf_dokter_ket: string;
  nama_obat_ket: string;
  bentuk_sediaan_ket: string;
  kekuatan_sediaan_ket: string;
  jumlah_obat_ket: string;
  stabilitas_ket: string;
  alamat_pasien_ket: string;
  nomor_ijin: string = "Tidak";
  nomor_ijin_ket: string = "Konfirmasi Dokter";
  tanda_tangan_dokter: string = "Ada";
  tanda_tangan_dokter_ket: string;
  kekuatan_sediaan_obat: string = "Ada";
  kekuatan_sediaan_obat_ket: string;
  stabilitas_dan_inkompabilitas: string = "Tidak";
  stabilitas_dan_inkompabilitas_ket: string;
  aturan_dan_cara_penggunaan_obat: string = "Ada";
  aturan_dan_cara_penggunaan_obat_ket: string;

  constructor(
    public hots: SampleService,
    public FarmasijualService: FarmasijualService,
    public router: Router,
    private datepipe: DatePipe,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private fb: FormBuilder
  ) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
    this.username = this.userDetails.username;

    this.tglpx = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglpxx = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglpxinput = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglp = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tgldari = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglsampai = this.datepipe.transform(this.myDate, "yyyy-MM-dd");

    console.log(this.akses);

    this.socketx = io("https://socketpkm.apbatech.com/");
  }

  // Method untuk tombol Kajian Resep
  kresep(content: any) {
    // Contoh: buka modal kajian resep, atau logika lain sesuai kebutuhan
    this.modalService.open(content, { size: "lg" });
  }

  tambahmodal(a) {
    this.tombolsimpan = true;
    this.tombolhapus = true;
    this.tombolcetak = true;
    this.showlunas = false;
    this.statuslunas = 0;

    this.tombolbatal = false;
    this.tglpx = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglpxx = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.keterangan = "";

    this.ttsatuan = "";
    this.hna = "";
    this.qty = "";
    this.disc = "";
    this.discrp = "";
    this.total = 0;
    this.notransaksi = "";
    this.pasien = "";
    this.nofaktur = "";
    this.norm = "";
    this.dokter = "";
    this.kddokter = "";
    this.kdkostumer = "";
    this.kostumer = "";
    this.kdpoli = "";
    this.poli = "";
    this.noresep = "";
    this.keterangan = "";
    this.stssimpan = "2";
    this.statuscaripas = "1";
    this.showobt = false;
    this.fokuspasien.nativeElement.focus();

    setTimeout(() => {
      this.trjual();
    }, 100);

    this.admresep = 0;
    this.tuslahresep = 0;

    setTimeout(() => {
      this.ttlsisaterbayar = this.netto - this.ttlterbayar;
    }, 300);

    this.enterpasien(a);
  }
  tobat: any;
  nmobat: any;
  cariobat(a) {
    this.authService
      .cobatjual(this.kdcabang, this.kdgudang, a.target.value)
      .subscribe(
        (data) => {
          this.tobat = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  // date:any;
  // myFunction(){
  //   this.date=new Date();
  //   let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');

  //  }

  profileForm = this.fb.group({
    jbayari: ["", Validators.required],
  });
  thasillab: any;
  // ngAfterViewInit() {
  //   this.myInputField.nativeElement.focus();
  //   }

  onKeyUpa(a) {
    // console.log(a.target.value)
    // this.df.nativeElement.focus();

    let body = {
      KDJENISOBAT: this.jenisobat,
      KDOBAT: this.nmobat,
      obat: this.namaobat,
      SATUAN: this.ttsatuan,
      HNA: this.hna,
      QTY: this.qty,
      DISCPERSEN: this.disc,
      DISCRP: this.discrp,
      TOTAL: this.total,
      NOFAKTUR: this.nofakturbeli,
      NOLPB: this.nolpb,
      KDSUPLIER: this.kdsuplier,
      TGLEX: this.tglpxinput,
      NOBATCH: this.nobatch,
      kdcabang: this.kdcabang,
      stssimpan: "2",
      kdklinik: this.kdklinik,
      kduser: this.username,
      kdgudang: this.kdgudang,
    };

    this.authService.simpanlpb(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.select.handleClearClick();
        this.ttsatuan = "";
        this.hna = "";
        this.qty = "";
        this.disc = "";
        this.discrp = "";
        this.total = 0;
        this.nobatch = "";
        this.trxpbeli();

        setTimeout(() => {
          this.select.focus();
        }, 500);
      } else {
        this.toastr.error("Simpan  Gagal", "error");
      }
    });
  }
  onKeyUp(a) {
    // console.log(a.target.value)
    // this.df.nativeElement.focus();
    this.select.focus();
  }

  tsatuan: any;
  ttsatuan: any;
  hna: any;
  qty: any;
  disc: any;
  discrp: any;
  total: number;
  nobatch: any;
  namaobat: string = "";
  hargabeli: any;
  kdobatbpjs: any;
  onobat(a) {
    console.log(this.nmobat);

    this.authService.obatbykode(this.kdcabang, this.nmobat).subscribe(
      (data) => {
        if (data.length) {
          this.tsatuan = data;

          for (let harga of data) {
            this.hna = harga.hargajual;
            this.ttsatuan = harga.standart;
            this.jenisobat = harga.jenisobat;
            this.namaobat = harga.obat;
            this.hargabeli = harga.hargabeli;
            this.kdobatbpjs = harga.kdobatbpjs;
          }

          this.df.nativeElement.focus();
        } else {
          return data;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  jenisobat: any;
  onobatx(a) {
    console.log(this.nmobat);

    this.authService.obatbykode(this.kdcabang, this.nmobat).subscribe(
      (data) => {
        if (data.length) {
          this.tsatuan = data;

          for (let harga of data) {
            this.hna = harga.hargajual;
            this.ttsatuan = harga.standart;
            this.jenisobat = harga.jenisobat;
            this.namaobat = harga.obat;
            this.hargabeli = harga.hargabeli;
          }

          this.df.nativeElement.focus();
        } else {
          return data;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  onqty(a) {
    this.total = this.hna * this.qty;

    this.myinputqty.nativeElement.focus();
  }

  ondisc(a) {
    console.log(this.disc);

    if (this.disc === null) {
    } else if (this.disc === undefined) {
    } else {
      let jumlah: number;
      jumlah = (this.disc * this.total) / 100;

      this.total = this.total - jumlah;
    }

    this.myinputdisc.nativeElement.focus();
  }
  ontot(a) {
    if (this.discrp === null) {
    } else if (this.discrp === undefined) {
    } else {
      this.total = this.total - this.discrp;
    }

    this.myinputtot.nativeElement.focus();

    // this.select.focus()
  }

  showed: boolean;
  totaled: any;
  resepbaru: any = "";

  requestPermission() {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  }
  triggerNotification() {
    this.showNotification("Resep Baru", {
      body: "Anda Memiliki Resep Baru.",
      icon: "./assets/images/nyeri/0.png", // Tambahkan path ke icon notifikasi Anda
    });
  }

  showNotification(title: string, options?: NotificationOptions) {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(title, options);
      }
    }
  }

  ngOnInit() {
    this.requestPermission();
    this.hostName = this.hots.getHostname();
    this.socketx.on("message", (data) => {
      const pesan = JSON.parse(data);

      var kddokter;
      var noantrian;
      var namdokter;
      var kdantrian;
      var kdcabang;
      var kdcabangasli = this.kdcabang;
      for (let x of pesan) {
        // console.log(x.namadokter)
        kddokter = x.kddokter;
        noantrian = x.antrian;
        namdokter = x.namadokter;
        kdantrian = x.kdantrian;
        kdcabang = x.kdcabang;
      }
      if (kdcabangasli === kdcabang) {
        if (kddokter === "Farmasi") {
          this.triggerNotification();
          this.toastr.success("Ada Resep Baru");
          this.resepbaru = "Ada Resep Baru";
          let audiox = new Audio();
          audiox.src = "https://knm.clenicapp.com/clenic/sound/RESEP.wav";
          audiox.play();

          var indexl = 1;
          audiox.onended = function () {
            if (indexl < 2) {
              audiox.src = "https://knm.clenicapp.com/clenic/sound/RESEP.wav";
              audiox.play();
              indexl++;
            }
          };
        }
      }
    });

    this.URLINVOICE = "https://" + this.hostName + "/";

    this.authService.obated(this.kdcabang).subscribe(
      (data) => {
        if (data.length) {
          this.showed = true;
          // this.totaled = data.length
        } else {
          this.showed = false;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.verifshowdd(this.kdcabang).subscribe(
      (data) => {
        if (data.length) {
          this.showed = false;
        } else {
          this.showed = true;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.tmpgudang();
    this.tomboledit = false;

    // this.initForm();
    // this.getNames();

    // this.tmptarif()

    // this.FormGroup = this.fb.group({
    //   itemRows:this.fb.array([this.initItemRow()]),});
  }

  initForm() {
    this.formGroup = this.fb.group({
      employee: [""],
    });
    this.formGroup.get("employee").valueChanges.subscribe((response) => {
      console.log("data is ", response);
      this.filterData(response);
    });
  }

  filterData(enteredData) {
    this.filteredOptions = this.options.filter((item) => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
    });
  }

  getNames() {
    this.authService.getData().subscribe((response) => {
      this.filteredOptions = response;
    });
  }

  // initItemRow(){
  //   return this.fb.group({
  //      Name:[''],
  //      RolNo:[''],
  //      class:[''],
  //      MobileNo:['']
  //   });
  // }
  // addNewRow(){
  //   const control = <FormArray>this.FormGroup.controls['itemRows'];
  //    control.push(this.initItemRow());

  // }

  // deleteRow(index:number){
  //   const control  = <FormArray>this.FormGroup.controls['itemRows'];
  //  if(control != null){
  //     this.TotalRow = control.value.length;
  //  }
  //   if(this.TotalRow >1){
  //     control.removeAt(index);
  //  }else{
  //     alert('One record is mandatory.');
  //     return false;
  //  }

  // }

  nofakturbeli: any;
  suplier: any;
  kdsuplier: any;
  kdbayar: any;

  nofakturpajak: any;
  nolpb: any;
  keterangan: any;

  tambah() {
    let body = {
      nofakturbeli: this.nofakturbeli,
      kdsuplier: this.kdsuplier,
      kdbayar: this.kdbayar,
      kdgudang: this.kdgudang,
      nofakturpajak: this.nofakturpajak,
      tglfaktur: this.tglpx,
      tgljatuhtempo: this.tglpxx,
      keterangan: this.keterangan,
      kduser: this.username,
      kdcabang: this.kdcabang,
      stssimpan: "1",
      kdklinik: this.kdklinik,
    };

    this.authService.simpanlpb(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        this.nolpb = response;

        this.tomboltambah = false;
        this.tombolsimpan = false;
        // this.showtransaksi = false;
        this.tombolmobat = false;
      } else {
        this.toastr.error("Simpan  Gagal", "error");
      }
    });
  }
  tgudang: any;

  ppnobat: any;

  tmpgudang() {
    this.authService.gudangcab(this.kdklinik, this.kdcabang).subscribe(
      (data) => {
        this.tgudang = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.cabangbyid(this.kdklinik, this.kdcabang).subscribe(
      (data) => {
        for (let x of data) {
          this.ppnobat = x.ppnobat;
          this.slug = x.slug;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tobatnonracik: any;
  tobatracik: any;

  tsupplier: any;
  tsupshow: boolean;
  carisup(a) {
    if (a.target.value.length) {
      this.tsupshow = true;
      this.authService
        .carisuplier("1", a.target.value, this.kdcabang)
        .subscribe(
          (data) => {
            this.tsupplier = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else {
      this.tsupshow = false;
    }
  }

  pilihsup(kdsup, nama) {
    this.kdsuplier = kdsup;
    this.suplier = nama;
    this.tsupshow = false;
  }

  kgantiex(a, b, c) {
    console.log(a.target.value, b, c);

    let body = {
      nofakturbeli: this.nofakturbeli,
      NOLPB: this.nolpb,
      nomor: c,
      kdobat: b,
      field: "TGLEX",
      angka: a.target.value,
      kdcabang: this.kdcabang,
      kdklinik: this.kdklinik,
      kduser: this.username,
      stssimpan: "4",
    };
    this.authService.simpanlpb(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });
      } else {
        this.toastr.error("Simpan  Gagal", "error");
      }
    });
  }

  tmpdrijl() {
    this.authService
      .trxfgudang(this.kdcabang, this.nofaktur, this.notransaksi)
      .subscribe(
        (data) => {
          for (let x of data) {
            this.ttlterbayarblm = x.sudahbayar;
          }
          // this.ttlsisaterbayar = this.nettoblm - this.ttlterbayarblm;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  ubahqty(a, kdobat, notransaksi, nomor, qty, disc, discrp, harga) {
    if (this.statuslunas === "2") {
      // this.showobt= false;
      this.toastr.error("Tidak Bisa Di Edit", "error");
    } else {
      if (this.notransaksi === "") {
        this.toastr.error(
          "",
          "Notransaksi Tidak Ada silahkan simpan terlebih dahulu",
          {
            timeOut: 2000,
          }
        );
      } else {
        let body = {
          qtyedit: a.target.value,
          kdobat: kdobat,
          notransaksi: notransaksi,
          nomor: nomor,
          qty: qty,
          disc: disc,
          discrp: discrp,
          harga: harga,
          kdgudang: this.kdgudang,
          stssimpan: "2",
          kdcabang: this.kdcabang,
          nofaktur: this.nofaktur,
          kdpoli: this.kdpoli,
          kddokter: this.kddokter,
        };

        this.authService.simpanbeliverif(body).subscribe((response) => {
          if (response) {
            if (response === "1") {
              setTimeout(() => {
                this.trjual();
              }, 100);

              setTimeout(() => {
                this.ttlsisaterbayar = this.netto - this.ttlterbayar;
              }, 150);

              this.toastr.success("" + "Berhasil Update Stok", "Sukses", {
                timeOut: 2000,
              });
            } else {
              this.toastr.error(response, "error");

              this.modalService.open(mutasifarmasiComponent, {
                size: "lg",
              });
            }
          } else {
            this.toastr.error("Simpan  Gagal", "error");
          }
        });
      }
    }
  }
  ubahdiscpersen(a, kdobat, notransaksi, nomor, disc, qty, discrp, harga) {
    if (this.statuslunas === "2") {
      this.toastr.error("Tidak Bisa Di Edit", "error");
    } else {
      if (this.notransaksi === "") {
        this.toastr.error(
          "",
          "Notransaksi Tidak Ada silahkan simpan terlebih dahulu",
          {
            timeOut: 2000,
          }
        );
      } else {
        let body = {
          qtyedit: qty,
          kdobat: kdobat,
          notransaksi: notransaksi,
          nomor: nomor,
          qty: qty,
          disc: a.target.value,
          discrp: discrp,
          harga: harga,
          kdgudang: this.kdgudang,
          stssimpan: "3",
          kdcabang: this.kdcabang,
          nofaktur: this.nofaktur,
          kdpoli: this.kdpoli,
          kddokter: this.kddokter,
        };

        this.authService.simpanbeliverif(body).subscribe((response) => {
          if (response) {
            this.toastr.success("" + response, "Sukses", {
              timeOut: 2000,
            });

            setTimeout(() => {
              this.trjual();
            }, 100);

            setTimeout(() => {
              this.ttlsisaterbayar = this.netto - this.ttlterbayar;
            }, 150);
          } else {
            this.toastr.error("Simpan  Gagal", "error");
          }
        });
      }
    }
  }

  ubahdiscrp(a, kdobat, notransaksi, nomor, qty, disc, harga) {
    if (this.statuslunas === "2") {
      this.toastr.error("Tidak Bisa Di Edit", "error");
    } else {
      if (this.notransaksi === "") {
        this.toastr.error(
          "",
          "Notransaksi Tidak Ada silahkan simpan terlebih dahulu",
          {
            timeOut: 2000,
          }
        );
      } else {
        let body = {
          qtyedit: qty,
          kdobat: kdobat,
          notransaksi: notransaksi,
          nomor: nomor,
          qty: qty,
          disc: disc,
          discrp: a.target.value,
          harga: harga,
          kdgudang: this.kdgudang,
          stssimpan: "4",
          kdcabang: this.kdcabang,
          nofaktur: this.nofaktur,
          kdpoli: this.kdpoli,
          kddokter: this.kddokter,
        };

        this.authService.simpanbeliverif(body).subscribe((response) => {
          console.log(response);

          if (response) {
            this.toastr.success("" + response, "Sukses", {
              timeOut: 2000,
            });

            setTimeout(() => {
              this.trjual();
            }, 100);

            setTimeout(() => {
              this.ttlsisaterbayar = this.netto - this.ttlterbayar;
            }, 150);
          } else {
            this.toastr.error("Simpan  Gagal", "error");
          }
        });
      }
    }
  }
  ubahbatch(a, kdobat, nomor) {
    console.log(a.target.value);

    let body = {
      nofakturbeli: this.nofakturbeli,
      NOLPB: this.nolpb,
      nomor: nomor,
      kdobat: kdobat,
      field: "NOBATCH",
      angka: a.target.value,
      kdcabang: this.kdcabang,
      kdklinik: this.kdklinik,
      kduser: this.username,
      stssimpan: "4",
    };
    this.authService.simpanlpb(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });
      } else {
        this.toastr.error("Simpan  Gagal", "error");
      }
    });
  }
  hapusall() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus",
        text: "Hapus Transaksi",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            notransaksi: this.notransaksi,
            kdcabang: this.kdcabang,
            stssimpan: "8",
          };

          this.authService.simpanbeliverif(body).subscribe((response) => {
            console.log(response);

            if (response) {
              if (response === "1") {
                this.toastr.error(
                  "Hapus Gagal Karena Transaksi Belum di hapus atau trasaksi sudah di bayar",
                  "error"
                );
              } else {
                this.toastr.success("Berhasil", "Sukses", {
                  timeOut: 2000,
                });

                this.ttsatuan = "";
                this.hna = "";
                this.qty = "";
                this.disc = "";
                this.discrp = "";
                this.total = 0;
                this.notransaksi = "";
                this.pasien = "";
                this.nofaktur = "";
                this.norm = "";
                this.dokter = "";
                this.kddokter = "";
                this.kdkostumer = "";
                this.kostumer = "";
                this.kdpoli = "";
                this.poli = "";
                this.noresep = "";
                this.keterangan = "";
                this.stssimpan = "2";
                this.showobt = false;

                setTimeout(() => {
                  this.trjual();
                }, 100);

                setTimeout(() => {
                  this.select.focus();

                  this.ttlsisaterbayar = this.netto - this.ttlterbayar;
                }, 300);

                this.admresep = 0;
                this.tuslahresep = 0;
              }
            } else {
              this.toastr.error("Simpan  Gagal", "error");
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

  musnahkan() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Konsiyasi",
        text: " Apakah Yakin Akan Memusnahkan Stok karena sudah ED?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            kdcabang: this.kdcabang,
            stssimpan: "1",
          };

          this.authService.musnahqty(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });
              this.authService.obated(this.kdcabang).subscribe(
                (data) => {
                  if (data.length) {
                    this.showed = true;
                    // this.totaled = data.length
                  } else {
                    this.showed = false;
                  }
                },
                (Error) => {
                  console.log(Error);
                }
              );

              this.authService.verifshowdd(this.kdcabang).subscribe(
                (data) => {
                  if (data.length) {
                    this.showed = false;
                  } else {
                    this.showed = true;
                  }
                },
                (Error) => {
                  console.log(Error);
                }
              );

              this.modalService.dismissAll();
            } else {
              this.toastr.error("Simpan  Gagal", "error");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }

  hapusobat(kdobat, notransaksi, nomor, obat, qty) {
    if (this.statuslunas === "2") {
      // this.showobt= false;
      this.toastr.error("Tidak Bisa Di hapus karena sudah lunas", "error");
    } else {
      // this.showobt= true;
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Hapus",
          text: "Hapus Obat " + obat,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Hapus",
          cancelButtonText: "Batal",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.value) {
            let body = {
              notransaksi: notransaksi,
              kdobat: kdobat,
              nomor: nomor,
              nofaktur: this.nofaktur,
              kddokter: this.kddokter,
              kdpoli: this.kdpoli,
              qty: qty,
              kdgudang: this.kdgudang,
              stssimpan: "7",
              kdcabang: this.kdcabang,
            };

            this.authService.simpanbeliverif(body).subscribe((response) => {
              if (response) {
                this.toastr.success("" + response, "Sukses", {
                  timeOut: 2000,
                });

                setTimeout(() => {
                  this.trjual();
                }, 100);

                setTimeout(() => {
                  this.ttlsisaterbayar = this.netto - this.ttlterbayar;
                }, 150);
              } else {
                this.toastr.error("Simpan  Gagal", "error");
              }
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    }
  }

  totalpasenlist: number;
  ktglrad() {
    if (this.statusku === "0") {
      // rj

      this.authService
        .listfarmasijual(this.kdcabang, this.caripas, "", this.tglp)
        .subscribe(
          (data) => {
            this.totalpasenlist = data.length;
            this.tbeli = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else {
      // ri
      this.authService
        .t_listfarmasijual(this.kdcabang, "", this.tglp)
        .subscribe(
          (data) => {
            this.totalpasenlist = data.length;
            this.tbeli = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    }

    //   this.authService.listfarmasijual(this.kdcabang,this.caripas,'',this.tglp)
    //   .subscribe(
    //     data => {
    //       this.totalpasenlist = data.length
    // this.tbeli = data;

    //   },
    //     Error => {

    //      console.log(Error)
    //     }
    //   )
  }

  caripass(a) {
    if (this.statusku === "0") {
      // rj

      this.authService
        .listfarmasijual(this.kdcabang, this.caripas, a.target.value, this.tglp)
        .subscribe(
          (data) => {
            this.totalpasenlist = data.length;
            this.tbeli = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else {
      // ri
      this.authService
        .t_listfarmasijual(this.kdcabang, "", this.tglp)
        .subscribe(
          (data) => {
            this.totalpasenlist = data.length;
            this.tbeli = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    }
    //   this.authService.listfarmasijual(this.kdcabang,this.caripas,a.target.value,this.tglp)
    //   .subscribe(
    //     data => {
    //       this.totalpasenlist = data.length
    // this.tbeli = data;

    //   },
    //     Error => {

    //      console.log(Error)
    //     }
    //   )
  }

  caripassr(a) {
    this.authService
      .cariretur(this.kdcabang, this.tglp, this.caripas, a.target.value)
      .subscribe(
        (data) => {
          this.tbelir = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  statusku: any;

  openLargemap(content) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Lihat Pasien",
        text: "",

        showCancelButton: true,
        confirmButtonText: "Rawat Jalan",
        cancelButtonText: "Rawat Inap",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.tmpbeli();
          this.statusku = "0";

          this.modalService.open(content, {
            size: "lg",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.tmpbeliri();
          this.statusku = "1";

          this.modalService.open(content, {
            size: "lg",
          });
        }
      });
  }

  openLargemapr(content) {
    this.tmpbelir();

    this.modalService.open(content, {
      size: "lg",
    });
  }

  tbeli: any;
  caripas = "2";
  tmpbeli() {
    this.authService
      .listfarmasijual(this.kdcabang, this.caripas, "", this.tglp)
      .subscribe(
        (data) => {
          this.totalpasenlist = data.length;
          this.tbeli = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  tmpbeliri() {
    this.authService.t_listfarmasijual(this.kdcabang, "", this.tglp).subscribe(
      (data) => {
        this.totalpasenlist = data.length;
        this.tbeli = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tbelir: any;

  tmpbelir() {
    this.authService
      .cariretur(this.kdcabang, this.tglp, this.caripas, "")
      .subscribe(
        (data) => {
          this.tbelir = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  stss: any;
  koxx: any;
  frekuensi: any = "";
  jmlpakai: any = "";
  signa: any = "Setelah Makan";
  Keterangan: any = "";

  simpanbeli(content) {
    if (this.kdgudang === "") {
      this.toastr.error("Gudang Belum Di Pilih", "error");

      return;
    }

    if (this.stssimpan == "0") {
      this.authService
        .tescoba(this.kdcabang, this.notransaksi, this.nofaktur)
        .subscribe(
          (data) => {
            console.log(data);

            if (data == "1") {
              this.toastr.error(
                "Stok Di Gudang Utama Tidak Cukup Silahkan Cek Kembali atau Mutasi dari Stok Lain",
                "error"
              );
            } else {
              let body = {
                nofaktur: this.nofaktur,
                norm: this.norm,
                pembulatan: this.pembulatan,
                admresep: this.admresep,
                tuslahresep: this.tuslahresep,
                totaldisc: this.ttldisc,
                totalbayar: this.netto,
                sudahbayar: this.ttlterbayar,
                statuslunas: "1",
                kdgudang: this.kdgudang,
                kdcabang: this.kdcabang,
                keterangan: this.keterangan,
                noresep: this.noresep,
                tgl: this.tglpx,
                kdklinik: this.kdklinik,
                stssimpan: "1",
                kdcus: this.kdkostumer,
                kdpoli: this.kdpoli,
                kddokter: this.kddokter,
              };

              this.authService.simpanbeliverif(body).subscribe((response) => {
                if (response) {
                  this.toastr.success("" + response, "Sukses", {
                    timeOut: 2000,
                  });

                  setTimeout(() => {
                    this.trjual();
                    this.refreshtagiha();
                  }, 100);

                  this.notransaksi = response;
                  this.stssimpan = "1";
                  this.showobt = true;

                  // $kdkostumerd= $conn->real_escape_string($item['kdkostumerd']);
                  // $norm= $conn->real_escape_string($item['norm']);
                  // $kddokter= $conn->real_escape_string($item['kddokter']);
                  // $kdpoli= $conn->real_escape_string($item['kdpoli']);
                  // $nama= $conn->real_escape_string($item['nama']);
                  // $aturan= $conn->real_escape_string($item['aturan']);
                  // $qty= $conn->real_escape_string($item['qty']);
                  // $harga= $conn->real_escape_string($item['harga']);
                  // $keterangan= $conn->real_escape_string($item['keterangan']);
                  //  $no= $conn->real_escape_string($item['no']);

                  const dataDisimpan = this.tjual.map((x) => ({
                    kdobat: x.kdobat,
                    notransaksi: x.nofaktur,
                    nomor: x.nomor,
                    frekuensiket: x.frekuensi,
                    jmlpakai: x.jmlpakai,
                    signa: x.signa,
                    keterangan: x.keterangan,
                    // kdkostumerd:this.kdkostumer,
                    // norm:this.norm,
                    // kddokter :this.kddokter,
                    // kdpoli : this.kdpoli,
                    // nama :this.nmobat,
                    // aturan :this.frekuensi+'x'+this.jmlpakai+this.signa,
                    // qty:this.qty,
                    // harga :this.hna,
                    // keterangan :this.keterangan
                  }));

                  this.FarmasijualService.simpanbeliakhir(
                    dataDisimpan
                  ).subscribe((response) => {
                    if (response) {
                      this.toastr.success("" + response.status, "Sukses", {
                        timeOut: 2000,
                      });
                    } else {
                      this.toastr.error("Simpan  Gagal", "error");
                    }
                  });

                  console.log("Data yang disimpan:", dataDisimpan);
                } else {
                  this.toastr.error("Simpan  Gagal", "error");
                }
              });
            }
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else if (this.stssimpan == "2") {
      console.log("simpanbaru");

      let body = {
        kdklinik: this.kdklinik,
        kdgudang: this.kdgudang,
        keterangan: this.keterangan,
        noresep: this.noresep,
        nofaktur: this.nofaktur,
        norm: this.norm,
        stssimpan: "9",
        kdcabang: this.kdcabang,
        kdpoli: this.kdkamar,
        kddokter: this.kddokter,
        kdkostumer: this.kdkostumer,
      };

      this.authService.simpanbeliverif(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });

          setTimeout(() => {
            this.notransaksi = response;
            this.stssimpan = "1";
            this.showobt = true;
          }, 200);

          const dataDisimpan = this.tjual.map((x) => ({
            kdobat: x.kdobat,
            notransaksi: x.nofaktur,
            nomor: x.nomor,
            frekuensiket: x.frekuensi,
            jmlpakai: x.jmlpakai,
            signa: x.signa,
            keterangan: x.keterangan,
          }));

          this.FarmasijualService.simpanbeliakhir(dataDisimpan).subscribe(
            (response) => {
              if (response) {
                this.toastr.success("" + response.status, "Sukses", {
                  timeOut: 2000,
                });
              } else {
                this.toastr.error("Simpan  Gagal", "error");
              }
            }
          );

          console.log("Data yang disimpan:", dataDisimpan);
        } else {
          this.toastr.error("Simpan  Gagal", "error");
        }
      });
    } else {
      let body = {
        pembulatan: this.pembulatan,
        adminresep: this.admresep,
        tuslah: this.tuslahresep,
        totaldisc: this.ttldisc,
        totalbayar: this.netto,
        keterangan: this.keterangan,
        noresep: this.noresep,
        kdgudang: this.kdgudang,
        norm: this.norm,
        kdcabang: this.kdcabang,
        stssimpan: "6",
        notransaksi: this.notransaksi,
      };

      this.authService.simpanbeliverif(body).subscribe((response) => {
        if (response) {
          this.toastr.success("" + response, "Sukses", {
            timeOut: 2000,
          });

          const dataDisimpan = this.tjual.map((x) => ({
            kdobat: x.kdobat,
            notransaksi: x.nofaktur,
            nomor: x.nomor,
            frekuensiket: x.frekuensi,
            jmlpakai: x.jmlpakai,
            signa: x.signa,
            keterangan: x.keterangan,
          }));

          this.FarmasijualService.simpanbeliakhir(dataDisimpan).subscribe(
            (response) => {
              if (response) {
                this.toastr.success("" + response.status, "Sukses", {
                  timeOut: 2000,
                });
              } else {
                this.toastr.error("Simpan  Gagal", "error");
              }
            }
          );

          console.log("Data yang disimpan:", dataDisimpan);

          this.authService.t_ceknorm(this.kdcabang, this.norm).subscribe(
            (data) => {
              if (data.length) {
                for (let x of data) {
                  this.notransaksiri = x.notransaksi;
                  this.kamarri = x.nama;
                  this.kdkamar = x.kdkamar;
                }

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

          setTimeout(() => {
            this.trjual();

            this.refreshtagiha();
          }, 500);
        } else {
          this.toastr.error("Simpan  Gagal", "error");
        }
      });
    }
  }
  kamarri: any;
  notransaksiri: any;

  goToLink() {
    this.modalService.open(MobatComponent, {
      size: "lg",
    });

    // window.open('master/mobat', '_blank');

    // this.router.navigate(['master/mobat']);
  }

  ttrxbeli: any;
  totalsebelumpajak: number;
  totalsebelumpajakr: number;
  totaladappn: number;
  totalsetelahppn: number;
  totalsetelahppnr: number;
  jmlppn: number;
  jmlppnr: number;
  adm: number = 0;
  totalakhir: number;

  trxpbeli() {
    this.authService
      .transbeliobat(this.kdcabang, this.nofakturbeli, this.nolpb)
      .subscribe(
        (data) => {
          var xyzx = 0;
          var xyzxu = 0;
          for (let productx of data) {
            var yx = parseInt(productx.TOTALR);
            xyzx += yx;

            var yxu = parseInt(productx.TOTAL);
            xyzxu += yxu;
          }
          var ppn: number;
          this.totalsebelumpajakr = xyzx;
          ppn = (this.ppnobat * this.totalsebelumpajakr) / 100;
          this.jmlppnr = ppn;
          this.totalsetelahppnr = this.jmlppnr + this.totalsebelumpajakr;

          var ppnu: number;
          this.totalsebelumpajak = xyzxu;
          ppnu = (this.ppnobat * this.totalsebelumpajak) / 100;
          this.jmlppn = ppnu;
          this.totalsetelahppn = ppnu + this.totalsebelumpajak;

          this.totalakhir = this.adm + this.totalsetelahppn;

          // this.totalakhir = this.adm + this.totalsetelahppn;

          this.ttrxbeli = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  noretur: any;

  // penjualan
  notransaksi: any;
  pasien: any;
  // duplikat, sudah ada norm: string di atas
  kdgudang: any;
  dokter: any;
  kddokter: any;
  kdkostumer: any;
  kostumer: any;
  kdpoli: any;
  poli: any;
  noresep: any;
  KETERANGAN: any;
  nofaktur: any;
  keteranganv: any;
  profileFormfar = this.fb.group({
    kdgudang: ["", Validators.required],
    pasien: ["", Validators.required],
    dokter: ["", Validators.required],
    kostumer: ["", Validators.required],
    poli: ["", Validators.required],
  });
  showobt: boolean;
  sts: any;
  stssimpan: any;
  statuslunas: any;
  stsbayar: any;
  ri: string;
  alamat: any = "";
  // duplikat, sudah ada umur: number | string di atas

  pilihpasien(data: any) {
    this.nettoblm = 0;
    this.admresepblm = 0;
    this.tuslahresepblm = 0;
    this.pembulatanblm = 0;
    this.ttlterbayarblm = 0;
    this.netto = 0;
    this.totalsebelumadm = 0;
    this.admresep = 0;
    this.tuslahresep = 0;
    this.pembulatan = 0;
    this.ttlterbayar = 0;
    this.ttlsisaterbayar = 0;
    this.ttsatuan = "";
    this.hna = "";
    this.qty = "";
    this.disc = "";
    this.discrp = "";
    this.total = 0;
    this.umur = data.age;
    this.alamat = data.alamat;
    this.notransaksi = data.notransaksi;
    this.pasien = data.pasien;
    this.nofaktur = data.nofaktur;
    this.norm = data.norm;
    this.dokter = data.namdokter;
    this.kddokter = data.kddokter;
    this.kdkostumer = data.kdkostumerd;
    this.kostumer = data.nama;
    this.kdpoli = data.kdpoli;
    this.poli = data.nampoli;
    this.tglpx = data.tgl;
    this.sts = data.sts;
    this.statuslunas = data.statuslunas;
    this.stsbayar = data.bayar;
    this.ri = data.ri;

    this.setKajianResep(data);

    if (data.sts === "0") {
      this.stssimpan = "0";
      this.showobt = false;

      this.authService.gudangdefault(this.kdcabang).subscribe(
        (data) => {
          for (let x of data) {
            this.kdgudang = x.kdgudang;
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else {
      this.stssimpan = "1";

      if (this.statuslunas === "2") {
        this.showobt = false;
        this.showlunas = true;
        this.lunas = "1";
      } else {
        this.showobt = true;
        this.showlunas = false;
        this.lunas = "0";
      }
    }

    // var yx = parseInt(ADM)

    // this.adm = yx

    //     this.nolpb = NOLPB
    //     this.tomboledit =  false;
    this.tombolsimpan = false;
    this.tombolhapus = false;
    this.tombolcetak = false;
    //     this.tombolbatal = true;

    //     this.tombolcetak = false;
    //     this.showtransaksi = false;
    //     this.trxpbeli()

    this.trjual();

    setTimeout(() => {
      this.trgudang();
      this.authService.t_ceknorm(this.kdcabang, this.norm).subscribe(
        (data) => {
          if (data.length) {
            for (let x of data) {
              this.notransaksiri = x.notransaksi;
              this.kamarri = x.nama;
              this.kdkamar = x.kdkamar;
            }
          } else {
          }
        },
        (Error) => {
          console.log(Error);
        }
      );
    }, 150);

    //   if(this.sts === '0'){
    //     // this.ttldisc = 0;
    //         }else{

    // // this.admresep = this.admresepblm;

    // // this.tuslahresep = this.tuslahresepblm;
    // // this.pembulatan = this.pembulatanblm
    // // this.ttlterbayar = this.ttlterbayarblm

    // // this.nettobmx = (Number(this.totalsebelumadm) + Number(this.admresep)) + Number(this.tuslahresep) ;

    // // console.log("nettobmx",this.nettobmx)

    // // let num = this.nettobmx;
    // //   let text = num.toString()

    // //   var angka = text.substr(-2);
    // // var angka1 = parseInt(angka);

    // // var akhir:number;
    // // if(angka1 < 50){
    // // akhir = this.nettobmx - angka1;
    // // }else{
    // // akhir = this.nettobmx + (100 - angka1);

    // // }

    // // this.netto = akhir;
    // // this.pembulatan = this.netto-this.nettobmx;
    // // this.ttlsisaterbayar = this.netto - this.ttlterbayar

    // // console.log(this.ttlterbayar)
    // // console.log("nett",this.netto)

    //         }

    this.modalService.dismissAll();
  }

  setKajianResep(data: any) {
    this.nama_pasien_ket = data.pasien;
    const norm = data.norm;
    const notransaksi = data.nofaktur;

    this.FarmasijualService.getPersyaratanObat(
      this.slug,
      norm,
      notransaksi
    ).subscribe((res: any) => {
      if (res) {
        this.tomboledit = true;
        this.kajianId = res.id;
        this.norm = res.norm;
        this.notransaksi = res.notransaksi;
        this.nama_pasien = res.nama_pasien ? "Ada" : "Tidak";
        this.nama_pasien_ket = res.nama_pasien_ket;
        this.alamat_pasien = res.alamat_pasien ? "Ada" : "Tidak";
        this.alamat_pasien_ket = res.alamat_pasien_ket;
        this.umur_pasien = res.umur_pasien ? "Ada" : "Tidak";
        this.umur_pasien_ket = res.umur_pasien_ket;
        this.berat_badan = res.berat_badan ? "Ada" : "Tidak";
        this.berat_badan_ket = res.berat_badan_ket;
        this.jenis_kelamin = res.jenis_kelamin ? "Ada" : "Tidak";
        this.jenis_kelamin_ket = res.jenis_kelamin_ket;
        this.nama_dokter = res.nama_dokter ? "Ada" : "Tidak";
        this.nama_dokter_ket = res.nama_dokter_ket;
        this.nomor_ijin = res.nomor_ijin ? "Ada" : "Tidak";
        this.nomor_ijin_ket = res.nomor_ijin_ket;
        this.alamat_dokter = res.alamat_dokter ? "Ada" : "Tidak";
        this.alamat_dokter_ket = res.alamat_dokter_ket;
        this.tanda_tangan_dokter = res.tanda_tangan_dokter ? "Ada" : "Tidak";
        this.tanda_tangan_dokter_ket = res.tanda_tangan_dokter_ket;
        this.tempat_tanggal_resep = res.tempat_tanggal_resep ? "Ada" : "Tidak";
        this.tempat_tanggal_resep_ket = res.tempat_tanggal_resep_ket;
        this.nama_obat = res.nama_obat ? "Ada" : "Tidak";
        this.nama_obat_ket = res.nama_obat_ket;
        this.bentuk_sediaan = res.bentuk_sediaan ? "Ada" : "Tidak";
        this.bentuk_sediaan_ket = res.bentuk_sediaan_ket;
        this.kekuatan_sediaan_obat = res.kekuatan_sediaan_obat
          ? "Ada"
          : "Tidak";
        this.kekuatan_sediaan_obat_ket = res.kekuatan_sediaan_obat_ket;
        this.jumlah_obat = res.jumlah_obat ? "Ada" : "Tidak";
        this.jumlah_obat_ket = res.jumlah_obat_ket;
        this.stabilitas_dan_inkompabilitas = res.stabilitas_dan_inkompabilitas
          ? "Ada"
          : "Tidak";
        this.stabilitas_dan_inkompabilitas_ket =
          res.stabilitas_dan_inkompabilitas_ket;
        this.aturan_dan_cara_penggunaan_obat =
          res.aturan_dan_cara_penggunaan_obat ? "Ada" : "Tidak";
        this.aturan_dan_cara_penggunaan_obat_ket =
          res.aturan_dan_cara_penggunaan_obat_ket;
        this.ketidaktepatan_seleksi_obat = res.ketidaktepatan_seleksi_obat
          ? "Ada"
          : "Tidak";
        this.ketidaktepatan_seleksi_obat_ket =
          res.ketidaktepatan_seleksi_obat_ket;
        this.dosis_kurang = res.dosis_kurang ? "Ada" : "Tidak";
        this.dosis_kurang_ket = res.dosis_kurang_ket;
        this.dosis_lebih = res.dosis_lebih ? "Ada" : "Tidak";
        this.dosis_lebih_ket = res.dosis_lebih_ket;
        this.duplikasi = res.duplikasi ? "Ada" : "Tidak";
        this.duplikasi_ket = res.duplikasi_ket;
        this.obat_tanpa_indikasi = res.obat_tanpa_indikasi ? "Ada" : "Tidak";
        this.obat_tanpa_indikasi_ket = res.obat_tanpa_indikasi_ket;
        this.indikasi_tidak_diobati = res.indikasi_tidak_diobati
          ? "Ada"
          : "Tidak";
        this.indikasi_tidak_diobati_ket = res.indikasi_tidak_diobati_ket;
        this.interaksi_obat = res.interaksi_obat ? "Ada" : "Tidak";
        this.interaksi_obat_ket = res.interaksi_obat_ket;
        this.reaksi_obat_merugikan = res.reaksi_obat_merugikan
          ? "Ada"
          : "Tidak";
        this.reaksi_obat_merugikan_ket = res.reaksi_obat_merugikan_ket;
        this.gagal_menerima_obat = res.gagal_menerima_obat ? "Ada" : "Tidak";
        this.gagal_menerima_obat_ket = res.gagal_menerima_obat_ket;
        this.analisa = res.analisa;
        this.konseling = res.konseling;
      } else {
        this.nama_pasien = "Ada";
        this.nama_pasien_ket = "";
        this.alamat_pasien = "Ada";
        this.alamat_pasien_ket = "";
        this.umur_pasien = "Ada";
        this.umur_pasien_ket = "";
        this.berat_badan = "Tidak";
        this.berat_badan_ket = "Konfirmasi Dokter";
        this.jenis_kelamin = "Ada";
        this.jenis_kelamin_ket = "";
        this.nama_dokter = "Ada";
        this.nama_dokter_ket = "";
        this.nomor_ijin = "Tidak";
        this.nomor_ijin_ket = "Konfirmasi Dokter";
        this.alamat_dokter = "Tidak";
        this.alamat_dokter_ket = "Konfirmasi Dokter";
        this.tanda_tangan_dokter = "Ada";
        this.tanda_tangan_dokter_ket = "";
        this.tempat_tanggal_resep = "Tidak";
        this.tempat_tanggal_resep_ket = "Konfirmasi Dokter";
        this.nama_obat = "Ada";
        this.nama_obat_ket = "";
        this.bentuk_sediaan = "Ada";
        this.bentuk_sediaan_ket = "";
        this.kekuatan_sediaan_obat = "Ada";
        this.kekuatan_sediaan_obat_ket = "";
        this.jumlah_obat = "Ada";
        this.jumlah_obat_ket = "";
        this.stabilitas_dan_inkompabilitas = "Tidak";
        this.stabilitas_dan_inkompabilitas_ket = "";
        this.aturan_dan_cara_penggunaan_obat = "Ada";
        this.aturan_dan_cara_penggunaan_obat_ket = "";
        this.ketidaktepatan_seleksi_obat = "Tidak";
        this.ketidaktepatan_seleksi_obat_ket = "";
        this.dosis_kurang = "Tidak";
        this.dosis_kurang_ket = "";
        this.dosis_lebih = "Tidak";
        this.dosis_lebih_ket = "";
        this.duplikasi = "Tidak";
        this.duplikasi_ket = "";
        this.obat_tanpa_indikasi = "Tidak";
        this.obat_tanpa_indikasi_ket = "";
        this.indikasi_tidak_diobati = "Tidak";
        this.indikasi_tidak_diobati_ket = "";
        this.interaksi_obat = "Tidak";
        this.interaksi_obat_ket = "";
        this.reaksi_obat_merugikan = "Tidak";
        this.reaksi_obat_merugikan_ket = "";
        this.gagal_menerima_obat = "Tidak";
        this.gagal_menerima_obat_ket = "";
        this.analisa = "";
        this.konseling = "";
      }
    });
  }

  lunas: string;

  tjual: any;
  totalsebelumadmT: number;
  bruto: any;

  trjual() {
    this.authService
      .trxjual(this.kdcabang, this.nofaktur, this.notransaksi)
      .subscribe(
        (data) => {
          this.tjual = data;

          var xyzx = 0;
          var xyzxu = 0;
          var disc = 0;
          var bruto = 0;

          for (let productx of data) {
            var yx = parseInt(productx.totalharga);
            xyzx += yx;

            var discx = parseInt(productx.jmldisc);
            disc += discx;
            // var yxu = parseInt(productx.TOTAL)
            // xyzxu += yxu;

            var brutox = parseInt(productx.bruto);
            bruto += brutox;
          }

          this.totalsebelumadm = xyzx;
          this.totalsebelumadmT = xyzx;
          this.ttldisc = disc;

          this.nettobmx =
            Number(this.totalsebelumadm) +
            Number(this.admresep) +
            Number(this.tuslahresep);

          let num = this.nettobmx;
          let text = num.toString();

          var angka = text.substr(-2);
          var angka1 = parseInt(angka);

          var akhir: number;
          if (angka1 < 100) {
            akhir = this.nettobmx - angka1;
          } else {
            akhir = this.nettobmx + (1000 - angka1);
          }

          // alert(akhir)

          this.netto = akhir;
          this.pembulatan = this.netto - this.nettobmx;
          this.bruto = bruto;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  tgudangx: any;
  jumlahblm: number;
  nettoblm: number;
  admresepblm: number;
  tuslahresepblm: number;
  pembulatanblm: number;
  ttlterbayarblm: number;
  ttldisc: number;
  ttldiscblm: number;
  talergi: any;

  trgudang() {
    this.authService
      .trxfgudang(this.kdcabang, this.nofaktur, this.notransaksi)
      .subscribe(
        (data) => {
          this.tgudangx = data;
          for (let x of data) {
            this.kdgudang = x.kdgudang;
            this.noresep = x.noresep;
            this.keterangan = x.keterangan;
            this.jumlahblm = x.jumlah;
            this.nettoblm = x.totalbayar;
            this.admresepblm = x.adminresep;
            this.tuslahresepblm = x.tuslah;
            // this.ttldiscblm = x.totaldisc;

            this.pembulatanblm = x.pembulatan;
            this.ttlterbayarblm = x.sudahbayar;

            if (this.sts === "0") {
            } else {
              this.admresep = x.adminresep;
              this.tuslahresep = x.tuslah;
              this.pembulatan = x.pembulatan;
              this.ttlterbayar = x.sudahbayar;
              this.ttlsisaterbayar = x.totalbayar - x.sudahbayar;
            }
          }
          // this.ttlsisaterbayar = this.nettoblm - this.ttlterbayarblm;
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService.listpobaterm(this.kdcabang, this.nofaktur).subscribe(
      (data) => {
        this.tobatnonracik = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
    this.authService.listobatermracik(this.kdcabang, this.nofaktur).subscribe(
      (data) => {
        this.tobatracik = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.alergi(this.norm, this.kdcabang).subscribe(
      (data) => {
        this.talergi = data;
        this.bb = data[0].bb;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  bb: any = "";

  nettobmx: number;
  tambahadm(a) {
    // console.log(this.admresep)
    let tuslah = Number(this.tuslahresep);

    this.nettobmx = this.totalsebelumadm + this.admresep + tuslah;

    let num = this.nettobmx;
    let text = num.toString();

    var angka = text.substr(-2);
    var angka1 = parseInt(angka);

    var akhir: number;
    if (angka1 < 50) {
      akhir = this.nettobmx - angka1;
    } else {
      akhir = this.nettobmx + (100 - angka1);
    }

    this.netto = akhir;
    this.pembulatan = this.netto - this.nettobmx;
    this.ttlsisaterbayar = this.netto - this.ttlterbayar;
  }
  nettobm: number;

  tambahadmx(a) {
    let admresep = Number(this.admresep);

    this.nettobm = this.totalsebelumadm + this.tuslahresep + admresep;

    let num = this.nettobm;
    let text = num.toString();

    // this.netto = (this.totalsebelumadm + this.tuslahresep) + this.admresep  ;

    var angka = text.substr(-2);
    var angka1 = parseInt(angka);

    var akhir: number;
    if (angka1 < 50) {
      akhir = this.nettobm - angka1;
    } else {
      akhir = this.nettobm + (100 - angka1);
    }

    this.netto = akhir;
    this.pembulatan = this.netto - this.nettobm;
    this.ttlsisaterbayar = this.netto - this.ttlterbayar;
  }

  onKeyUpaxx(a) {
    let body = {
      nofaktur: this.nofaktur,
      notransaksi: this.notransaksi,
      kdobat: this.nmobat,
      qty: this.qty,
      hna: this.hna,
      disc: this.disc,
      discrp: this.discrp,
      total: this.total,
      kdcabang: this.kdcabang,
      kddokter: this.kddokter,
      norm: this.norm,
      kdkus: this.kdkostumer,
      kdgudang: this.kdgudang,
      hargabeli: this.hargabeli,
      stssimpan: "5",

      frekuensi: this.frekuensi,
      jmlpakai: this.jmlpakai,
      signa: this.signa,
      keterangan: this.keterangan,
    };

    this.authService.simpanbeliverif(body).subscribe((response) => {
      if (response) {
        if (response === "1") {
          this.toastr.error("Simpan  Gagal Stok Tidak Cukup", "error");
        } else {
          this.toastr.success("Berhasil", "Sukses", {
            timeOut: 2000,
          });

          this.select.handleClearClick();
          this.ttsatuan = "";
          this.hna = "";
          this.qty = "";
          this.disc = "";
          this.discrp = "";
          this.jmlpakai = "";
          this.keterangan = "";
          this.frekuensi = "";

          this.total = 0;

          setTimeout(() => {
            this.trjual();

            // this.refreshtagiha()
          }, 100);

          setTimeout(() => {
            this.select.focus();
          }, 300);

          this.ttlsisaterbayar = this.netto - this.ttlterbayar;
        }
      } else {
        this.toastr.error("Simpan  Gagal", "error");
      }
    });

    //  let body={
    //   "KDJENISOBAT":this.jenisobat,"KDOBAT":this.nmobat,"obat":this.namaobat,"SATUAN":this.ttsatuan,"HNA":this.hna,
    //   "QTY":this.qty,"DISCPERSEN":this.disc,"DISCRP":this.discrp,"TOTAL":this.total,"NOFAKTUR":this.nofakturbeli,
    //   "NOLPB":this.nolpb,"KDSUPLIER":this.kdsuplier,"TGLEX":this.tglpxinput,"NOBATCH":this.nobatch,
    //   "kdcabang":this.kdcabang,"stssimpan":'2',"kdklinik":this.kdklinik,"kduser":this.username,"kdgudang":this.kdgudang

    //    }

    //    this.authService.simpanlpb(body)
    //    .subscribe(response => {

    //      if(response ){
    //        this.toastr.success(''+response, 'Sukses', {
    //          timeOut: 2000,
    //        });

    //     this.select.handleClearClick()
    //     this.ttsatuan='';
    //     this.hna ='';
    //     this.qty ='';
    //     this.disc ='';
    //     this.discrp = '';
    //     this.total = 0;
    //     this.nobatch =''
    //     this.trxpbeli()

    //     setTimeout(() => {
    //      this.select.focus()
    //     }, 500);

    //       }else{
    //        this.toastr.error('Simpan  Gagal', 'error');

    //       }

    //    })

    let bodyx = {
      data: {
        kdObatSK: 0,
        noKunjungan: this.nokunjungan,
        racikan: false,
        kdRacikan: null,
        obatDPHO: true,
        kdObat: this.kdobatbpjs,
        signa1: 3,
        signa2: 1,
        jmlObat: this.qty,
        jmlPermintaan: this.qty,
        nmObatNonDPHO: "Obat klinik",
      },
    };

    this.authService.simpanobatbpjs(bodyx).subscribe((response) => {
      console.log(response);
    });
  }

  // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy';

  cetakfaktur() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/fakturpenjualan.php?notransaksi=" +
        this.notransaksi +
        "&kdcabang=" +
        this.kdcabang +
        "&username=" +
        this.username,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  cetakfakturp() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/penjualanfarmasip.php?tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kdcabang=" +
        this.kdcabang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  cetakkridit() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/penjualanfarkasir.php?tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kdcabang=" +
        this.kdcabang +
        "&user=" +
        this.usercetak,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  cetakcash() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/penjualanfarkasir.php?tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kdcabang=" +
        this.kdcabang +
        "&user=" +
        this.usercetak +
        "&status=1",
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  cetaklaped() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/expriedobatverif.php?kdcabang=" +
        this.kdcabang +
        "&status=1",
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  cetakfakturbp() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/barangpriodik.php?tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kdcabang=" +
        this.kdcabang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  cetakd() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/barangpriodikdetail.php?tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kdcabang=" +
        this.kdcabang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  cetakfaktursp() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/belumbayarfarmasi.php?tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kdcabang=" +
        this.kdcabang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  num1: boolean;
  num2: boolean;
  num3: boolean;
  detaillap: any;
  tmpusers: any;
  usercetak = "";

  openlaporan(content, a) {
    if (a == "1") {
      this.num1 = true;
      this.num2 = false;
      this.num3 = false;
    } else if (a == "2") {
      this.num1 = false;
      this.num2 = true;
      this.num3 = false;
      this.authService.tampiluser(this.kdcabang).subscribe(
        (data) => {
          this.tmpusers = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
    } else if (a == "3") {
      this.num1 = false;
      this.num2 = false;
      this.num3 = true;
    } else {
    }

    this.modalService.open(content, {});
  }

  tmped: any;

  lihated(content) {
    this.authService.listobated(this.kdcabang).subscribe(
      (data) => {
        this.totaled = data.length;
        this.tmped = data;
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.modalService.open(content, {});
  }

  totalsebelumadm: number;
  admresep: number = 0;
  tuslahresep: number = 0;
  pembulatan: number = 0;
  netto: number;
  ttlterbayar: number;
  ttlsisaterbayar: number;

  statuscaripas = "1";
  caritipe = "5";
  tpasien: any;
  tmppasienri() {
    this.authService
      .pasienantrian(this.kdcabang, "11", "", "", this.tglp)
      .subscribe(
        (data) => {
          this.tpasien = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  tmplpasien() {
    this.authService
      .pasienantrian(this.kdcabang, this.caritipe, "", "", this.tglp)
      .subscribe(
        (data) => {
          this.tpasien = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  tmplpasiensemua() {
    this.authService.pasiensemua(this.kdcabang, this.caritipe, "").subscribe(
      (data) => {
        this.tpasien = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  enterpasien(content) {
    if (this.stssimpan === "2") {
      this.tmplpasien();
      this.modalService.open(content, {
        size: "lg",
      });
    } else {
      this.toastr.error("Silahkan klik Tambah Dulu", "error");
    }
  }

  onChangec(a) {
    console.log(a);

    if (a === "2") {
      this.tmplpasiensemua();
    } else if (a === "1") {
      this.tmplpasien();
    } else {
      this.tmppasienri();
    }
  }
  ktglradr() {
    this.authService
      .pasienantrian(this.kdcabang, this.caritipe, "", "", this.tglp)
      .subscribe(
        (data) => {
          this.tpasien = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  caripasienlist(a) {
    if (this.statuscaripas === "1") {
      this.authService
        .pasienantrian(
          this.kdcabang,
          this.caritipe,
          "",
          a.target.value,
          this.tglp
        )
        .subscribe(
          (data) => {
            this.tpasien = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    } else {
      this.authService
        .pasiensemua(this.kdcabang, this.caritipe, a.target.value)
        .subscribe(
          (data) => {
            this.tpasien = data;
          },
          (Error) => {
            console.log(Error);
          }
        );
    }
  }
  kdkamar: string = "";
  nokunjungan: string = "";
  pilihpasienx(
    norm,
    kddokter,
    kdkostumerd,
    notransaksi,
    pasien,
    nampoli,
    namdokter,
    nama,
    kdpoli,
    sts,
    kdkamar
  ) {
    console.log(
      norm,
      kddokter,
      kdkostumerd,
      notransaksi,
      pasien,
      nampoli,
      namdokter,
      nama,
      kdpoli,
      sts,
      kdkamar
    );

    if (sts === "semua") {
      this.notransaksi = "";
      this.pasien = pasien;
      this.nofaktur = "";
      this.norm = norm;
      this.dokter = "X";
      this.kddokter = "X";
      this.kdkostumer = kdkostumerd;
      this.kostumer = "UMUM";
      this.kdpoli = "X";
      this.poli = "X";
    } else if (sts === "riasli") {
      this.notransaksi = "";
      this.pasien = pasien;
      this.nofaktur = notransaksi;
      this.norm = norm;
      this.dokter = namdokter;
      this.kddokter = kddokter;
      this.kdkostumer = kdkostumerd;
      this.kostumer = nama;
      this.kdpoli = kdkamar;
      this.poli = nampoli;
      this.kdkamar = kdkamar;
    } else {
      this.notransaksi = "";
      this.pasien = pasien;
      this.nofaktur = notransaksi;
      this.norm = norm;
      this.dokter = namdokter;
      this.kddokter = kddokter;
      this.kdkostumer = kdkostumerd;
      this.kostumer = nama;
      this.kdpoli = kdpoli;
      this.poli = nampoli;
      this.kdkamar = kdpoli;
    }

    this.authService.ceknokunjungan(notransaksi).subscribe(
      (data) => {
        for (let x of data) {
          this.nokunjungan = x.nokunjungan;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
    this.modalService.dismissAll();
  }
  tdokter: any;

  tmpdokter() {
    this.authService.caridokter(this.kdcabang, "").subscribe(
      (data) => {
        this.tdokter = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  enterdokter(content) {
    this.tmpdokter();
    this.modalService.open(content, {});
  }

  caridokter(a) {
    this.authService.caridokter(this.kdcabang, a.target.value).subscribe(
      (data) => {
        this.tdokter = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tkostumer: any;

  tmpkostumerlist() {
    this.authService.kostumerlist(this.kdcabang, "").subscribe(
      (data) => {
        this.tkostumer = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  carikostumer(a) {
    this.authService.kostumerlist(this.kdcabang, a.target.value).subscribe(
      (data) => {
        this.tkostumer = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  enterkostumer(content) {
    this.tmpkostumerlist();
    this.modalService.open(content, {});
  }

  pilihdokter(kddokter, namdokter) {
    this.kddokter = kddokter;
    this.dokter = namdokter;
    this.modalService.dismissAll();
  }

  pilihkostumer(kdkostumerd, nama) {
    this.kdkostumer = kdkostumerd;
    this.kostumer = nama;
    this.modalService.dismissAll();
  }

  enterpoli(content) {
    this.tmppoli();
    this.modalService.open(content, {});
  }

  tpoli: any;

  tmppoli() {
    this.authService.caripoli(this.kdcabang, "").subscribe(
      (data) => {
        this.tpoli = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  caripoli(a) {
    this.authService.caripoli(this.kdcabang, a.target.value).subscribe(
      (data) => {
        this.tpoli = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  pilihpoli(kdpoli, nampoli) {
    this.kdpoli = kdpoli;
    this.poli = nampoli;

    this.modalService.dismissAll();
  }

  showloading: boolean = true;
  tetiket: any;

  muncultiket() {
    this.cetaketiket();
    // let body = {
    //   kdklinik: this.kdklinik,
    //   kdcabang: this.kdcabang,
    //   notransaksi: this.notransaksi,
    //   norm: this.norm,
    //   kduser: this.username,
    //   stssimpan: "1",
    // };

    // this.authService.simpanetiket(body).subscribe((response) => {
    //   if (response) {
    //     this.toastr.success("" + response, "Sukses", {
    //       timeOut: 2000,
    //     });

    //     setTimeout(() => {
    //       this.showtransaksi = false;
    //     }, 250);

    //     setTimeout(() => {
    //       this.authService.etiket(this.kdcabang, this.notransaksi).subscribe(
    //         (data) => {
    //           if (data.length) {
    //             this.showloading = false;
    //             this.tetiket = data;
    //           } else {
    //             setTimeout(() => {
    //               this.showloading = false;
    //               this.toastr.error(
    //                 "Simpan  Gagal Silahkan Ulangi Lagi",
    //                 "error"
    //               );
    //             }, 500);
    //           }
    //         },
    //         (Error) => {
    //           console.log(Error);
    //         }
    //       );
    //     }, 300);
    //   } else {
    //     this.toastr.error("Simpan  Gagal", "error");
    //   }
    // });
  }

  close() {
    this.showtransaksi = true;
  }

  metodeminum(aturanminum, kdobat) {
    Swal.fire({
      title: "Masukan Aturan",
      input: "select",
      inputValue: aturanminum,
      inputOptions: {
        SebelumMakan: "Sebelum Makan",
        SesudahMakan: "Sesudah Makan",
        BersamaMakan: "Bersama Makan",
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
        }
      },
    });
  }
  namaetiket: string = "";
  signae: string = "";
  aturane: any;
  qtye: any;
  kete: string = "";

  showtombol: boolean;
  kdobate: any;

  tambahetiket(content, a, obat, signa, aturanminum, qty, keterangan, kdobat) {
    console.log(a, obat, signa, aturanminum, qty, keterangan);

    if (a === "1") {
      this.showtombol = true;
      this.namaetiket = obat;
      this.signae = signa;
      this.qtye = qty;
      this.kete = keterangan;
      this.aturane = aturanminum;
      this.kdobate = kdobat;
    } else {
      this.showtombol = false;
      this.namaetiket = "";
      this.signae = "";
      this.qtye = "";
      this.kete = "";
    }

    this.modalService.open(content, {});
  }

  tmpetiket() {
    this.authService.etiket(this.kdcabang, this.notransaksi).subscribe(
      (data) => {
        if (data.length) {
          this.tetiket = data;
        } else {
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  simpanetiket() {
    let body = {
      kdklinik: this.kdklinik,
      kdcabang: this.kdcabang,
      notransaksi: this.notransaksi,
      norm: this.norm,
      kduser: this.username,
      stssimpan: "2",
      obat: this.namaetiket,
      signa: this.signae,
      aturan: this.aturane,
      qty: this.qtye,
      keterangan: this.kete,
    };

    this.authService.simpanetiket(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        setTimeout(() => {
          this.tmpetiket();
        }, 200);

        this.modalService.dismissAll();
      } else {
        this.toastr.error("Simpan  Gagal", "error");
      }
    });
  }

  editetiket() {
    let body = {
      kdklinik: this.kdklinik,
      kdcabang: this.kdcabang,
      notransaksi: this.notransaksi,
      kdobat: this.kdobate,
      norm: this.norm,
      kduser: this.username,
      stssimpan: "3",
      obat: this.namaetiket,
      signa: this.signae,
      aturan: this.aturane,
      qty: this.qtye,
      keterangan: this.kete,
    };

    this.authService.simpanetiket(body).subscribe((response) => {
      if (response) {
        this.toastr.success("" + response, "Sukses", {
          timeOut: 2000,
        });

        setTimeout(() => {
          this.tmpetiket();
        }, 200);

        this.modalService.dismissAll();
      } else {
        this.toastr.error("Simpan  Gagal", "error");
      }
    });
  }
  tjenisbayar: any;
  jbayari = "";
  produkbayar: any;
  kdprodukbayar: any;
  showlstbank: boolean;

  yangmasuk: number = 0;
  yangmasuki: number = 0;
  banklis = "";
  keterangb = "";
  jumlahpasien: number = 0;
  jumlahpasieni: number = 0;
  jumlahpasienx: number = 0;
  jumlahpasienx1: number = 0;
  kembalian: number = 0;
  kembaliani: number = 0;
  totalrjsaja: number;
  lstbank: any;
  bayarmodal(content, contex) {
    // this.triggerNotification()
    this.jbayari = "";

    this.authService.t_ceknorm(this.kdcabang, this.norm).subscribe(
      (data) => {
        if (data.length) {
          for (let x of data) {
            this.notransaksiri = x.notransaksi;
            this.kamarri = x.nama;
            this.kdkamar = x.kdkamar;
          }

          this.modalService.open(contex).result.then(
            (result) => {},
            (reason) => {}
          );
        } else {
          if (this.nofaktur === "") {
            if (this.ttlsisaterbayar <= 0) {
              this.toastr.error("Transaksi Sudah Terbayar", "error");
            } else {
              this.listbank();
              this.yangmasuk = this.ttlsisaterbayar;
              this.jumlahpasien = this.ttlsisaterbayar;

              this.modalService.open(content, {});
            }
          } else {
            this.toastr.error("Silahkan Bayar melalui Kasir RJ", "error");
          }
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  listbank() {
    this.authService.jenisbayar("1", "").subscribe(
      (data) => {
        this.tjenisbayar = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  jbayar(a) {
    console.log(a);

    this.authService.jenisbayar("2", a).subscribe(
      (data) => {
        for (let productx of data) {
          this.produkbayar = productx.bayar;
          this.kdprodukbayar = productx.kdakhir;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    if (a === "2") {
      this.showlstbank = false;

      //             this.jumlahpasien = this.totalrjsaja;
      // this.kembalian = 0
    } else {
      this.showlstbank = true;
      // this.jumlahpasien = 0
      // this.kembalian = 0
      this.authService.listbank(this.kdcabang).subscribe(
        (data) => {
          this.lstbank = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
    }
  }

  jmlu(a) {
    console.log(a);
    this.kembalian = a.target.value - this.ttlsisaterbayar;
  }

  refreshtagiha() {
    this.authService
      .trxfgudang(this.kdcabang, this.nofaktur, this.notransaksi)
      .subscribe(
        (data) => {
          this.tgudangx = data;
          for (let x of data) {
            this.netto = x.totalbayar;
            this.admresep = x.adminresep;
            this.tuslahresep = x.tuslah;

            this.pembulatan = x.pembulatan;
            this.ttlterbayar = x.sudahbayar;
          }

          setTimeout(() => {
            this.ttlsisaterbayar = this.netto - this.ttlterbayar;
            // alert(this.ttlsisaterbayar)
          }, 200);
        },
        (Error) => {
          console.log(Error);
        }
      );
  }
  bayartagihanakhir() {
    if (this.kembalian < 0) {
      this.toastr.error(
        "Tidak Bisa Simpan Karena Uang Dari Pasien Kurang",
        "error"
      );
    } else {
      if (this.ttlsisaterbayar <= 0) {
        this.toastr.error("Sudah Terbayar", "error");
      } else {
        let body = {
          kdbayar: this.kdprodukbayar,
          bayar: this.produkbayar,
          jbayari: this.jbayari,
          sudahbayar: this.jumlahpasien,
          norm: this.norm,
          bank: this.banklis,
          kdklinik: this.kdklinik,
          kdcabang: this.kdcabang,
          notransaksi: this.notransaksi,
          kduser: this.username,
          stssimpan: "1",
        };

        this.authService.simpanbayarfarmasi(body).subscribe((response) => {
          if (response) {
            this.toastr.success("" + response, "Sukses", {
              timeOut: 2000,
            });

            setTimeout(() => {
              this.refreshtagiha();
              this.showobt = false;
              this.showlunas = true;
            }, 200);

            this.modalService.dismissAll();
          } else {
            this.toastr.error("Simpan  Gagal", "error");
          }
        });
      }
    }
  }

  hapusetiket(a, obat, signa, aturanminum, qty, keterangan, kdobat) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus",
        text: "Hapus Obat " + obat,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            kdklinik: this.kdklinik,
            kdcabang: this.kdcabang,
            notransaksi: this.notransaksi,
            kdobat: kdobat,
            norm: this.norm,
            kduser: this.username,
            stssimpan: "4",
            obat: obat,
            signa: signa,
            aturan: aturanminum,
            qty: qty,
            keterangan: keterangan,
          };

          this.authService.simpanetiket(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.tmpetiket();
              }, 200);

              this.modalService.dismissAll();
            } else {
              this.toastr.error("Simpan  Gagal", "error");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }

  batalbayar() {
    if (this.notransaksi === "undefined") {
      this.toastr.error("Tidak ada transaksi yang di pilih", "error");
    } else {
      if (this.nofaktur === "") {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Batal Bayar",
            text: "Batal Bayar Transaksi" + this.notransaksi,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Batal Bayar",
            cancelButtonText: "Batal",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.value) {
              let body = {
                kdbayar: "",
                bayar: "",
                jbayari: "",
                sudahbayar: this.jumlahpasien,
                norm: this.norm,
                bank: "",
                kdklinik: this.kdklinik,
                kdcabang: this.kdcabang,
                notransaksi: this.notransaksi,
                kduser: this.username,
                stssimpan: "2",
              };

              this.authService
                .simpanbayarfarmasi(body)
                .subscribe((response) => {
                  if (response) {
                    this.toastr.success("" + response, "Sukses", {
                      timeOut: 2000,
                    });

                    setTimeout(() => {
                      this.refreshtagiha();
                      this.trjual();
                      this.showobt = true;
                      this.showlunas = false;
                      this.lunas = "0";
                    }, 200);

                    this.modalService.dismissAll();
                  } else {
                    this.toastr.error("Simpan  Gagal", "error");
                  }
                });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
            }
          });
      } else {
        if (this.ri === "Ya") {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
          });

          swalWithBootstrapButtons
            .fire({
              title: "Batal Bayar",
              text: "Batal Bayar Transaksi" + this.notransaksi,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Batal Bayar",
              cancelButtonText: "Batal",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.value) {
                let body = {
                  kdbayar: "",
                  bayar: "",
                  jbayari: "",
                  sudahbayar: this.jumlahpasien,
                  norm: this.norm,
                  bank: "",
                  kdklinik: this.kdklinik,
                  kdcabang: this.kdcabang,
                  notransaksi: this.notransaksi,
                  kduser: this.username,
                  stssimpan: "3",
                  notransri: this.notransaksiri,
                };

                this.authService
                  .simpanbayarfarmasi(body)
                  .subscribe((response) => {
                    if (response) {
                      this.toastr.success("" + response, "Sukses", {
                        timeOut: 2000,
                      });

                      setTimeout(() => {
                        this.refreshtagiha();
                        this.trjual();
                        this.showobt = true;
                        this.showlunas = false;
                      }, 200);

                      this.modalService.dismissAll();
                    } else {
                      this.toastr.error("Simpan  Gagal", "error");
                    }
                  });
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
              }
            });
        } else {
          this.toastr.error("Silahkan Batal melalui Kasir RJ", "error");
        }
      }
    }
  }

  cetakresepdokter() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/resepdaridokter.php?nofaktur=" +
        this.nofaktur +
        "&kdcabang=" +
        this.kdcabang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  cetaketiket() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/etiket.php?notransaksi=" +
        this.nofaktur +
        "&kdcabang=" +
        this.kdcabang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  kliktransfer() {
    if (this.lunas === "1") {
      this.toastr.error("Sudah Di Transfer", "Eror");
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Transfer Tagihan",
        text: "Transfer Tagihan Ke Rawat Inap ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Transfer",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let body = {
            kdcabang: this.kdcabang,
            notransaksi: this.notransaksi,
            notransri: this.notransaksiri,
            kdbayar: "2",
            bayar: "Kredit TF RI",
            kduser: this.username,
            stssimpan: "1",
            norm: this.norm,
            sudahbayar: this.ttlsisaterbayar,
            kdkamar: this.kdkamar,
          };

          this.authService.s_transferfarmasi(body).subscribe((response) => {
            if (response) {
              this.toastr.success("" + response, "Sukses", {
                timeOut: 2000,
              });

              setTimeout(() => {
                this.refreshtagiha();
                this.trjual();
                this.showobt = false;
                this.showlunas = true;
              }, 200);

              this.modalService.dismissAll();
            } else {
              this.toastr.error("Simpan  Gagal", "error");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }

  cetakkajian() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/cetakkajian.php?noresep=" +
        this.notransaksi +
        "&kdcabang=" +
        this.kdcabang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  z1a: string = "Ada";
  z2a: string = "Ada";
  z3a: string = "Ada";
  z4a: string = "Tidak";
  z5a: string = "Ada";
  z6a: string = "Ada";
  z7a: string = "Tidak";
  z8a: string = "Tidak";
  z9a: string = "Ada";
  z10a: string = "Tidak";

  ket1a: string = "-";
  ket2a: string = "-";
  ket3a: string = "-";
  ket4a: string = "Konfirmasi Dokter";
  ket5a: string = "-";
  ket6a: string = "-";
  ket7a: string = "Konfirmasi Dokter";
  ket8a: string = "Konfirmasi Dokter";
  ket9a: string = "-";
  ket10a: string = "Konfirmasi Dokter";

  z1b: string = "Ada";
  z2b: string = "Ada";
  z3b: string = "Ada";
  z4b: string = "Ada";
  z5b: string = "Tidak";
  z6b: string = "Ada";

  ket1b: string = "-";
  ket2b: string = "-";
  ket3b: string = "-";
  ket4b: string = "-";
  ket5b: string = "-";
  ket6b: string = "-";

  z1c: string = "Tidak";
  z2c: string = "Tidak";
  z3c: string = "Tidak";
  z4c: string = "Tidak";
  z5c: string = "Tidak";
  z6c: string = "Tidak";
  z7c: string = "Tidak";
  z8c: string = "Tidak";
  z9c: string = "Tidak";

  ket1c: string = "-";
  ket2c: string = "-";
  ket3c: string = "-";
  ket4c: string = "-";
  ket5c: string = "-";
  ket6c: string = "-";
  ket7c: string = "-";
  ket8c: string = "-";
  ket9c: string = "-";
  analis: string = "-";

  simpankajian() {
    let payload = {
      norm: this.norm || "",
      notransaksi: this.nofaktur || "",
      nama_pasien: this.nama_pasien === "Ada",
      nama_pasien_ket: this.nama_pasien_ket || "",
      alamat_pasien: this.alamat_pasien === "Ada",
      alamat_pasien_ket: this.alamat_pasien_ket || "",
      umur_pasien: this.umur_pasien === "Ada",
      umur_pasien_ket: this.umur_pasien_ket || "",
      berat_badan: this.berat_badan === "Ada",
      berat_badan_ket: this.berat_badan_ket || "",
      jenis_kelamin: this.jenis_kelamin === "Ada",
      jenis_kelamin_ket: this.jenis_kelamin_ket || "",
      nama_dokter: this.nama_dokter === "Ada",
      nama_dokter_ket: this.nama_dokter_ket || "",
      nomor_ijin: this.nomor_ijin === "Ada",
      nomor_ijin_ket: this.nomor_ijin_ket || "",
      alamat_dokter: this.alamat_dokter === "Ada",
      alamat_dokter_ket: this.alamat_dokter_ket || "",
      tanda_tangan_dokter: this.tanda_tangan_dokter === "Ada",
      tanda_tangan_dokter_ket: this.tanda_tangan_dokter_ket || "",
      tempat_tanggal_resep: this.tempat_tanggal_resep === "Ada",
      tempat_tanggal_resep_ket: this.tempat_tanggal_resep_ket || "",
      nama_obat: this.nama_obat === "Ada",
      nama_obat_ket: this.nama_obat_ket || "",
      bentuk_sediaan: this.bentuk_sediaan === "Ada",
      bentuk_sediaan_ket: this.bentuk_sediaan_ket || "",
      kekuatan_sediaan_obat: this.kekuatan_sediaan_obat === "Ada",
      kekuatan_sediaan_obat_ket: this.kekuatan_sediaan_obat_ket || "",
      jumlah_obat: this.jumlah_obat === "Ada",
      jumlah_obat_ket: this.jumlah_obat_ket || "",
      stabilitas_dan_inkompabilitas:
        this.stabilitas_dan_inkompabilitas === "Ada",
      stabilitas_dan_inkompabilitas_ket:
        this.stabilitas_dan_inkompabilitas_ket || "",
      aturan_dan_cara_penggunaan_obat:
        this.aturan_dan_cara_penggunaan_obat === "Ada",
      aturan_dan_cara_penggunaan_obat_ket:
        this.aturan_dan_cara_penggunaan_obat_ket || "",
      ketidaktepatan_seleksi_obat: this.ketidaktepatan_seleksi_obat === "Ada",
      ketidaktepatan_seleksi_obat_ket:
        this.ketidaktepatan_seleksi_obat_ket || "",
      dosis_kurang: this.dosis_kurang === "Ada",
      dosis_kurang_ket: this.dosis_kurang_ket || "",
      dosis_lebih: this.dosis_lebih === "Ada",
      dosis_lebih_ket: this.dosis_lebih_ket || "",
      duplikasi: this.duplikasi === "Ada",
      duplikasi_ket: this.duplikasi_ket || "",
      obat_tanpa_indikasi: this.obat_tanpa_indikasi === "Ada",
      obat_tanpa_indikasi_ket: this.obat_tanpa_indikasi_ket || "",
      indikasi_tidak_diobati: this.indikasi_tidak_diobati === "Ada",
      indikasi_tidak_diobati_ket: this.indikasi_tidak_diobati_ket || "",
      interaksi_obat: this.interaksi_obat === "Ada",
      interaksi_obat_ket: this.interaksi_obat_ket || "",
      reaksi_obat_merugikan: this.reaksi_obat_merugikan === "Ada",
      reaksi_obat_merugikan_ket: this.reaksi_obat_merugikan_ket || "",
      gagal_menerima_obat: this.gagal_menerima_obat === "Ada",
      gagal_menerima_obat_ket: this.gagal_menerima_obat_ket || "",
      analisa: this.analisa || "",
      konseling: this.konseling || "",
    };

    this.FarmasijualService.simpanPersyaratanObat(this.slug, payload).subscribe(
      (res) => {
        if (res && res.error) {
          this.toastr.error(res.error, "Gagal");
          return;
        }
        this.toastr.success("Data kajian resep berhasil disimpan", "Sukses");
        if (res && res.id) {
          this.kajianId = res.id;
        }
        this.tomboledit = true;
      },
      (error) => {
        if (error && error.error && error.error.errors) {
          const errors = error.error.errors;
          Object.keys(errors).forEach((key) => {
            const messages = errors[key];
            if (Array.isArray(messages)) {
              messages.forEach((msg) =>
                this.toastr.error(msg, "Validasi Gagal")
              );
            } else {
              this.toastr.error(messages, "Validasi Gagal");
            }
          });
        } else {
          this.toastr.error("Terjadi kesalahan saat menyimpan data", "Error");
          console.log(error);
        }
      }
    );
  }

  updatekajian() {
    let payload = {
      id: this.kajianId || "",
      norm: this.norm || "",
      notransaksi: this.nofaktur || "",
      nama_pasien: this.nama_pasien === "Ada",
      nama_pasien_ket: this.nama_pasien_ket || "",
      alamat_pasien: this.alamat_pasien === "Ada",
      alamat_pasien_ket: this.alamat_pasien_ket || "",
      umur_pasien: this.umur_pasien === "Ada",
      umur_pasien_ket: this.umur_pasien_ket || "",
      berat_badan: this.berat_badan === "Ada",
      berat_badan_ket: this.berat_badan_ket || "",
      jenis_kelamin: this.jenis_kelamin === "Ada",
      jenis_kelamin_ket: this.jenis_kelamin_ket || "",
      nama_dokter: this.nama_dokter === "Ada",
      nama_dokter_ket: this.nama_dokter_ket || "",
      nomor_ijin: this.nomor_ijin === "Ada",
      nomor_ijin_ket: this.nomor_ijin_ket || "",
      alamat_dokter: this.alamat_dokter === "Ada",
      alamat_dokter_ket: this.alamat_dokter_ket || "",
      tanda_tangan_dokter: this.tanda_tangan_dokter === "Ada",
      tanda_tangan_dokter_ket: this.tanda_tangan_dokter_ket || "",
      tempat_tanggal_resep: this.tempat_tanggal_resep === "Ada",
      tempat_tanggal_resep_ket: this.tempat_tanggal_resep_ket || "",
      nama_obat: this.nama_obat === "Ada",
      nama_obat_ket: this.nama_obat_ket || "",
      bentuk_sediaan: this.bentuk_sediaan === "Ada",
      bentuk_sediaan_ket: this.bentuk_sediaan_ket || "",
      kekuatan_sediaan_obat: this.kekuatan_sediaan_obat === "Ada",
      kekuatan_sediaan_obat_ket: this.kekuatan_sediaan_obat_ket || "",
      jumlah_obat: this.jumlah_obat === "Ada",
      jumlah_obat_ket: this.jumlah_obat_ket || "",
      stabilitas_dan_inkompabilitas:
        this.stabilitas_dan_inkompabilitas === "Ada",
      stabilitas_dan_inkompabilitas_ket:
        this.stabilitas_dan_inkompabilitas_ket || "",
      aturan_dan_cara_penggunaan_obat:
        this.aturan_dan_cara_penggunaan_obat === "Ada",
      aturan_dan_cara_penggunaan_obat_ket:
        this.aturan_dan_cara_penggunaan_obat_ket || "",
      ketidaktepatan_seleksi_obat: this.ketidaktepatan_seleksi_obat === "Ada",
      ketidaktepatan_seleksi_obat_ket:
        this.ketidaktepatan_seleksi_obat_ket || "",
      dosis_kurang: this.dosis_kurang === "Ada",
      dosis_kurang_ket: this.dosis_kurang_ket || "",
      dosis_lebih: this.dosis_lebih === "Ada",
      dosis_lebih_ket: this.dosis_lebih_ket || "",
      duplikasi: this.duplikasi === "Ada",
      duplikasi_ket: this.duplikasi_ket || "",
      obat_tanpa_indikasi: this.obat_tanpa_indikasi === "Ada",
      obat_tanpa_indikasi_ket: this.obat_tanpa_indikasi_ket || "",
      indikasi_tidak_diobati: this.indikasi_tidak_diobati === "Ada",
      indikasi_tidak_diobati_ket: this.indikasi_tidak_diobati_ket || "",
      interaksi_obat: this.interaksi_obat === "Ada",
      interaksi_obat_ket: this.interaksi_obat_ket || "",
      reaksi_obat_merugikan: this.reaksi_obat_merugikan === "Ada",
      reaksi_obat_merugikan_ket: this.reaksi_obat_merugikan_ket || "",
      gagal_menerima_obat: this.gagal_menerima_obat === "Ada",
      gagal_menerima_obat_ket: this.gagal_menerima_obat_ket || "",
      analisa: this.analisa || "",
      konseling: this.konseling || "",
    };

    this.FarmasijualService.updatePersyaratanObat(this.slug, payload).subscribe(
      (res) => {
        this.toastr.success("Data kajian resep berhasil diedit", "Sukses");
      },
      (error) => {
        if (error && error.error && error.error.errors) {
          const errors = error.error.errors;
          Object.keys(errors).forEach((key) => {
            const messages = errors[key];
            if (Array.isArray(messages)) {
              messages.forEach((msg) =>
                this.toastr.error(msg, "Validasi Gagal")
              );
            } else {
              this.toastr.error(messages, "Validasi Gagal");
            }
          });
        } else {
          this.toastr.error("Terjadi kesalahan saat mengedit data", "Error");
          console.log(error);
        }
      }
    );
  }
}
