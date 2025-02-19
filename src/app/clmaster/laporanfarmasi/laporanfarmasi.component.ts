import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
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
  NgSelectModule,
  NgOption,
  NgSelectComponent,
} from "@ng-select/ng-select";
import { SampleService } from "src/app/services";

@Component({
  selector: "app-laporanfarmasi",
  templateUrl: "./laporanfarmasi.component.html",
  styles: [
    `
      .example-container {
        display: flex;
        flex-direction: column;
      }

      .example-container > * {
        width: 100%;
      }

      .example-container form {
        margin-bottom: 20px;
      }

      .example-container form > * {
        margin: 5px 0;
      }

      .example-container .mat-radio-button {
        margin: 0 5px;
      }
    `,
  ],

  providers: [DatePipe],
})
export class laporanfarmasiComponent implements OnInit {
  heading = "Master Gudang";
  subheading: any;
  icon = "pe-7s-diamond icon-gradient bg-warm-flame";

  options: FormGroup;
  public userDetails: any;
  nama: any;
  akses: any;

  kdklinik: any;
  cabangarr: any;

  cariuser: any;
  kdcabang: any;

  gudang = "";
  kdgudang = "";

  hakakses: any;
  tgldari = "2013-12-12";
  tglsampai = "2013-12-12";
  myDate = new Date();
  hostName: string;
  URLINVOICE: string;
  constructor(
    public hots: SampleService,
    private datepipe: DatePipe,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private fb: FormBuilder
  ) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });

    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
    this.tgldari = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
    this.tglsampai = this.datepipe.transform(this.myDate, "yyyy-MM-dd");
  }

  ngOnInit() {
    this.hostName = this.hots.getHostname();

    this.URLINVOICE = "https://" + this.hostName + "/";

    this.klinik();
  }

  klinik() {
    this.authService.klinikper(this.kdklinik).subscribe(
      (data) => {
        this.subheading = Array.prototype.map
          .call(data, (s) => s.nama)
          .toString();
      },
      (Error) => {
        console.log(Error);
      }
    );

    this.authService.cabangper(this.kdklinik).subscribe(
      (data) => {
        this.cabangarr = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  judul: any;
  tklinik: any;
  kdcus: any;

  tmp() {
    this.authService.poli(this.kdcabang).subscribe(
      (data) => {
        this.tklinik = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tkostumer: any;

  tmpkonsumen() {
    this.authService.kostumerdt(this.kdcabang).subscribe(
      (data) => {
        this.tkostumer = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  tdokter: any;

  dafatrdokter() {
    this.authService.dokter(this.kdcabang).subscribe(
      (data) => {
        this.tdokter = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tkom: any;
  tmpkom() {
    this.authService.komponen().subscribe(
      (data) => {
        this.tkom = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  tgudang: any;

  tmpgudang() {
    this.authService.gudangcab(this.kdklinik, this.kdcabang).subscribe(
      (data) => {
        this.tgudang = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  nmobat: any;
  tobat: any;

  cariobat(a) {
    this.authService.cobatbeli(this.kdcabang, "2", a.target.value).subscribe(
      (data) => {
        this.tobat = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  radio1: any;
  radio2: any;
  myVar1 = false;
  myVar2 = false;
  tsup: any;
  kdsup: any;
  carisup(a) {
    console.log(a.target.value);
    this.authService.carisuplier("1", a.target.value, this.kdcabang).subscribe(
      (data) => {
        this.tsup = data;
      },
      (Error) => {
        console.log(Error);
      }
    );
  }
  pilih(a) {
    this.judul = a;

    if (a === "Laporan Posisi Stok") {
      this.tmpgudang();
    } else if (a === "Laporan Kartu Stok") {
      this.tmpgudang();
    } else if (a === "Laporan Stok Expried") {
      this.tmpgudang();
    } else if (a === "Laporan Stok Opname") {
      this.tmpgudang();
    } else if (a === "Pembelian By Suplier") {
      this.tmpgudang();
    } else if (a === "Pembelian By Suplier Detail") {
    } else if (a === "Pembelian Hutang/Jatuh Tempo") {
      this.tmpgudang();
    } else {
    }
  }
  kddokter: any;
  kdkom: any;

  // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy';

  lihatrekapo() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/obatterbanyak.php?tgldari=" +
        this.tgldari +
        "&kdcabang=" +
        this.kdcabang +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kdklinik,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  lihatstok() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/posisistok.php?kdcabang=" +
        this.kdcabang +
        "&kdgudang=" +
        this.kdgudang +
        "&status=" +
        this.kdgudang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  lihatstokex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/posisistokex.php?kdcabang=" +
        this.kdcabang +
        "&kdgudang=" +
        this.kdgudang +
        "&status=" +
        this.kdgudang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  lihatkartustok() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/kartustok.php?kdcabang=" +
        this.kdcabang +
        "&kdobat=" +
        this.nmobat +
        "&status=" +
        this.kdgudang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  lihatkartustokex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/kartustokex.php?kdcabang=" +
        this.kdcabang +
        "&kdobat=" +
        this.nmobat +
        "&status=" +
        this.kdgudang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  lihatstokexpried() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/expriedobat.php?kdcabang=" +
        this.kdcabang +
        "&status=" +
        this.kdgudang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  lihatstokexpriedex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/expriedobatex.php?kdcabang=" +
        this.kdcabang +
        "&status=" +
        this.kdgudang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  lihatstokopname() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/stokopname.php?kdcabang=" +
        this.kdcabang +
        "&status=" +
        this.kdgudang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  lihatstokopnameex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/stokopnameex.php?kdcabang=" +
        this.kdcabang +
        "&status=" +
        this.kdgudang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  belibysup() {
    // console.log(this.myVar1)
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/belipriodikreport.php?kdcabang=" +
        this.kdcabang +
        "&status=" +
        this.kdgudang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kds=" +
        this.myVar1 +
        "&kdsup=" +
        this.kdsup,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  belibysupex() {
    // console.log(this.myVar1)
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/belipriodikreportex.php?kdcabang=" +
        this.kdcabang +
        "&status=" +
        this.kdgudang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kds=" +
        this.myVar1 +
        "&kdsup=" +
        this.kdsup,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  belibysupd() {
    // console.log(this.myVar1)
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/suplierdetailr.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kds=" +
        this.myVar1 +
        "&kdsup=" +
        this.kdsup,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  belibysupdex() {
    // console.log(this.myVar1)
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/suplierdetailrex.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kds=" +
        this.myVar1 +
        "&kdsup=" +
        this.kdsup,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  belibybarang() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/barangpriodik.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  belibybarangd() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/barangpriodikdetail.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  belibybarangdt() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/hutangjatuhtempo.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kds=" +
        this.myVar1 +
        "&kdsup=" +
        this.kdsup +
        "&status=" +
        this.kdgudang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  belibybarangdtex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/hutangjatuhtempoex.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&kds=" +
        this.myVar1 +
        "&kdsup=" +
        this.kdsup +
        "&status=" +
        this.kdgudang,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  belibybarangdex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/barangpriodikdetailex.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  belibybarangex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/barangpriodikex.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  returpembelian() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/returpriodik.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  returpembelianex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/returpriodikex.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  returpenjualan() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/returpenjualan.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  returpenjualanex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/returpenjualanex.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  penjualan() {
    if (this.myVar2 === true) {
      var redirectWindow = window.open(
        this.URLINVOICE +
          "clenic/report/penjualanfarmasipd.php?kdcabang=" +
          this.kdcabang +
          "&tgldari=" +
          this.tgldari +
          "&tglsampai=" +
          this.tglsampai,
        "_blank",
        "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
      );
      redirectWindow.location;
    } else {
      var redirectWindow = window.open(
        this.URLINVOICE +
          "clenic/report/penjualanfarmasip.php?kdcabang=" +
          this.kdcabang +
          "&tgldari=" +
          this.tgldari +
          "&tglsampai=" +
          this.tglsampai,
        "_blank",
        "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
      );
      redirectWindow.location;
    }
  }

  penjualanex() {
    if (this.myVar2 === true) {
      var redirectWindow = window.open(
        this.URLINVOICE +
          "clenic/report/penjualanfarmasipdex.php?kdcabang=" +
          this.kdcabang +
          "&tgldari=" +
          this.tgldari +
          "&tglsampai=" +
          this.tglsampai,
        "_blank",
        "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
      );
      redirectWindow.location;
    } else {
      var redirectWindow = window.open(
        this.URLINVOICE +
          "clenic/report/penjualanfarmasipex.php?kdcabang=" +
          this.kdcabang +
          "&tgldari=" +
          this.tgldari +
          "&tglsampai=" +
          this.tglsampai,
        "_blank",
        "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
      );
      redirectWindow.location;
    }
  }

  penjualanobat() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/penjualanobat.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  penjualanobatex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/penjualanobatex.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  penjualandokter() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/penjualandokter.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  penjualandokterex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/penjualandokterex.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  labarugiobat() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/labarugiobat.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  labarugiobatex() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/labarugiobatex.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=1000,width=1000,scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }

  // barangpriodikdetail
}
