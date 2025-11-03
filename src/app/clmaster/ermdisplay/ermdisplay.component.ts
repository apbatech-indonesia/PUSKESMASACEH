import { Component, ViewChild, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
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
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-ermdisplay",
  templateUrl: "./ermdisplay.component.html",

  providers: [],
})
export class ermdisplayComponent implements OnInit {
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

  kduser: any;
  content = "";
  received = [];
  sent = [];
  urlposter: any;
  urlvidio: any;
  Nomor: string = "0";
  namadoker: string = "-";

  constructor(
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
    this.kduser = this.userDetails.kduser;

    this.authService.klinikper(this.kdklinik).subscribe(
      (data) => {
        this.subheading = Array.prototype.map
          .call(data, (s) => s.nama)
          .toString();
        this.urlposter = Array.prototype.map
          .call(data, (s) => s.urlposter)
          .toString();
        this.urlvidio = Array.prototype.map
          .call(data, (s) => s.urlvideo)
          .toString();
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.dokterperpoli("003", this.kduser).subscribe(
      (data) => {
        for (let x of data) {
          this.namadoker = x.namdokter;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );

    // WebSocket functionality removed
  }

  pasienNotificationl(msg) {
    this.tmptotal();
  }

  sendNotificationAntrian(kodeDokter) {
    // WebSocket functionality removed
  }

  ngOnInit() {
    this.tmptotal();
  }
  totalpass: number = 0;
  totalpassbelum: number = 0;
  totalpasssudah: number = 0;
  tampilpas: any;

  tmptotal() {
    this.authService
      .pasienperdokter(this.kdcabang, this.kduser, "BELUM", "", "2")
      .subscribe(
        (data) => {
          this.totalpass = data.length;
          this.tampilpas = data;
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService
      .pasienperdokter(this.kdcabang, this.kduser, "BELUM", "", "1")
      .subscribe(
        (data) => {
          this.totalpassbelum = data.length;
        },
        (Error) => {
          console.log(Error);
        }
      );

    this.authService
      .pasienperdokter(this.kdcabang, this.kduser, "SUDAH", "", "1")
      .subscribe(
        (data) => {
          this.totalpasssudah = data.length;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  cpasien(a) {
    this.authService
      .pasienperdokter(this.kdcabang, this.kduser, "BELUM", a.target.value, "2")
      .subscribe(
        (data) => {
          this.tampilpas = data;
        },
        (Error) => {
          console.log(Error);
        }
      );
  }

  norm: "";
  kdpoli: "";
  tglpriksa: "";
  kddokter: "";
  kdkostumerd: "";
  notransaksi: "";
  pasien: "";
  tgllahir: "";
  noantrian: "";
  nampoli: "";
  namdokter: "";
  namacus: "";
  costumer: "";
  alamat: "";
  kdtarif: "";
  showdata: boolean;
  kelas: string;

  pilihpasien(
    norm,
    kdpoli,
    tglpriksa,
    kddokter,
    kdkostumerd,
    notransaksi,
    pasien,
    tgllahir,
    noantrian,
    nampoli,
    namdokter,
    nama,
    costumer,
    alamat,
    kdtarif,
    kelas
  ) {
    this.showdata = true;
    this.norm = norm;
    this.kdpoli = kdpoli;
    this.tglpriksa = tglpriksa;
    this.kddokter = kddokter;
    this.kdkostumerd = kdkostumerd;
    this.notransaksi = notransaksi;
    this.pasien = pasien;
    this.tgllahir = tgllahir;
    this.noantrian = noantrian;
    this.nampoli = nampoli;
    this.namdokter = namdokter;
    this.namacus = nama;
    this.costumer = costumer;
    this.alamat = alamat;
    this.kdtarif = kdtarif;
    this.kelas = kelas;
  }

  terbilangx(bilangan) {
    bilangan = String(bilangan);
    var angka = new Array(
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0"
    );
    var kata = new Array(
      "",
      "satu",
      "dua",
      "tiga",
      "empat",
      "lima",
      "enam",
      "tujuh",
      "delapan",
      "sembilan"
    );
    var tingkat = new Array("", "Ribu", "Juta", "Milyar", "Triliun");

    var panjang_bilangan = bilangan.length;

    /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
    for (i = 1; i <= panjang_bilangan; i++) {
      angka[i] = bilangan.substr(-i, 1);
    }

    var i = 1;
    var j = 0;
    var kaLimat = "";

    /* mulai proses iterasi terhadap array angka */
    while (i <= panjang_bilangan) {
      var subkaLimat = "";
      var kata1 = "";
      var kata2 = "";
      var kata3 = "";

      /* untuk Ratusan */
      if (angka[i + 2] != "0") {
        if (angka[i + 2] == "1") {
          kata1 = "seratus";
        } else {
          kata1 = kata[angka[i + 2]] + " ratus";
        }
      }

      /* untuk Puluhan atau Belasan */
      if (angka[i + 1] != "0") {
        if (angka[i + 1] == "1") {
          if (angka[i] == "0") {
            kata2 = "sepuluh";
          } else if (angka[i] == "1") {
            kata2 = "sebelas";
          } else {
            kata2 = kata[angka[i]] + " belas";
          }
        } else {
          kata2 = kata[angka[i + 1]] + " puluh";
        }
      }

      /* untuk Satuan */
      if (angka[i] != "0") {
        if (angka[i + 1] != "1") {
          kata3 = kata[angka[i]];
        }
      }

      /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
      if (angka[i] != "0" || angka[i + 1] != "0" || angka[i + 2] != "0") {
        subkaLimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
      }

      /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
      kaLimat = subkaLimat + kaLimat;
      i = i + 3;
      j = j + 1;
    }

    /* mengganti Satu Ribu jadi Seribu jika diperlukan */
    if (angka[5] == "0" && angka[6] == "0") {
      kaLimat = kaLimat.replace("Satu Ribu", "Seribu");
    }

    const sentence = kaLimat.replace(/\s+/g, " ").trim();
    this.ucap = sentence;

    console.log(kaLimat);
    this.lsdl();

    // return kaLimat + "Rupiah";
  }

  ucap: any;
  lsdl() {
    let audiox = new Audio();
    audiox.src = "https://drnanik.digimedik.com/clenic/sound/NOMORANTRIAN.wav";
    audiox.play();
    var indexl = 1;
    audiox.onended = function () {
      if (indexl < 2) {
        audiox.src = "https://drnanik.digimedik.com/clenic/sound/A.wav";
        audiox.play();
        indexl++;
      }
    };

    setTimeout(() => {
      let audio = new Audio();

      var strings = this.ucap.split(" ");
      var index = 1;

      audio.src =
        "https://drnanik.digimedik.com/clenic/sound/" + strings[0] + ".wav";
      audio.play();

      audio.onended = function () {
        if (index < strings.length) {
          audio.src =
            "https://drnanik.digimedik.com/clenic/sound/" +
            strings[index] +
            ".wav";
          audio.play();
          index++;
        }
      };
    }, 1800);
  }
}
