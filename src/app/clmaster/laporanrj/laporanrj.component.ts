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
import { SampleService } from "src/app/services";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-laporanrj",
  templateUrl: "./laporanrj.component.html",
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
export class laporanrjComponent implements OnInit {
  heading = "Master Gudang";
  subheading: any;
  icon = "pe-7s-diamond icon-gradient bg-warm-flame";

  options: FormGroup;
  public userDetails: any;
  dateForm: FormGroup;
  dateRangeInvalid = false;

  nama: any;
  akses: any;

  kdklinik: any = 1;
  cabangarr: any;

  // Kelurahan (desa) filter/select - declarations
  kelurahanList: any[] = [];
  kelurahanFiltered: any[] = [];
  // default to 'semua' to represent no filter
  selectedKelurahanId: any = "semua";
  selectedKelurahanName: any = null;

  cariuser: any;
  kdcabang: any;

  gudang = "";
  kdgudang = "";
  jk: any = "";
  jeniskelamin: any = "semua";

  hakakses: any;
  tgldari = "2013-12-12";
  tglsampai = "2013-12-12";
  myDate = new Date();
  hostName: string;
  URLINVOICE: string;
  slug: any;
  constructor(
    public hots: SampleService,
    private datepipe: DatePipe,
    public toastr: ToastrService,
    private authService: ApiserviceService,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });

    this.dateForm = fb.group({
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
    });

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

    // Set initial dates
    const today = new Date();
    this.dateForm.patchValue({
      startDate: this.datepipe.transform(today, "yyyy-MM-dd"),
      endDate: this.datepipe.transform(today, "yyyy-MM-dd"),
    });

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
      },
    );

    this.authService.cabangper(this.kdklinik).subscribe(
      (data) => {
        this.cabangarr = data;
        // store single slug value (API expects a single slug)
        if (Array.isArray(data) && data.length > 0) {
          this.slug = data[0].slug;
        } else if (data && data.slug) {
          this.slug = data.slug;
        } else {
          this.slug = null;
        }
        // load kelurahan list once slug is known
        if (this.slug) this.loadKelurahan();
      },
      (Error) => {
        console.log(Error);
      },
    );
  }

  // --- Kelurahan (desa) helpers ---
  loadKelurahan() {
    const url = `https://emr.clenicapp.com/api/${this.slug}/satusehat/desa-from-pasien`;
    this.http.get<any>(url).subscribe(
      (res) => {
        if (res && res.data) {
          this.kelurahanList = res.data;
          // include a special 'SEMUA' option at the top
          this.kelurahanFiltered = [
            { id: "semua", name: "SEMUA" },
            ...this.kelurahanList,
          ];
        } else {
          this.kelurahanList = [];
          this.kelurahanFiltered = [{ id: "semua", name: "SEMUA" }];
        }
      },
      (err) => {
        console.error("Error loading kelurahan:", err);
        this.toastr.error("Gagal memuat daftar kelurahan", "Error");
      },
    );
  }

  searchKelurahan(term: string) {
    if (!term || term.trim() === "") {
      this.kelurahanFiltered = [
        { id: "semua", name: "SEMUA" },
        ...this.kelurahanList,
      ];
      return;
    }
    const q = term.toLowerCase();
    const filtered = this.kelurahanList.filter(
      (k) => k.name && k.name.toLowerCase().includes(q),
    );
    this.kelurahanFiltered = [{ id: "semua", name: "SEMUA" }, ...filtered];
  }

  selectKelurahan(item: any) {
    if (!item) {
      this.selectedKelurahanId = null;
      this.selectedKelurahanName = null;
      return;
    }
    this.selectedKelurahanId = item.id;
    this.selectedKelurahanName = item.name;
  }

  selectKelurahanById(id: any) {
    // treat special 'semua' value as the "all" selection (no subDistrict filter)
    if (id === "semua") {
      this.selectedKelurahanId = "semua";
      this.selectedKelurahanName = "SEMUA";
      return;
    }

    if (!id) {
      this.selectedKelurahanId = null;
      this.selectedKelurahanName = null;
      return;
    }

    const found = this.kelurahanList.find((k) => k.id == id);
    if (found) {
      this.selectKelurahan(found);
    } else {
      this.selectedKelurahanId = id;
      this.selectedKelurahanName = null;
    }
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
      },
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
      },
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
      },
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
      },
    );
  }

  laprj(a) {
    this.judul = a;

    if (a === "Kunjungan Rawat Jalan") {
      this.tmp();
    } else if (a === "Pendapatan Rawat Jalan") {
      this.tmp();
    } else if (a === "Pendapatan RJ/Konsumen") {
      this.tmp();
      this.tmpkonsumen();
    } else if (a === "Jasa Dokter") {
      this.dafatrdokter();
    } else if (a === "Per Komponen") {
      this.tmpkom();
    } else if (a === "Laporan Prolanis") {
      // No additional setup needed for prolanis report
    } else {
    }
  }
  kddokter: any;
  kdkom: any;

  // clenic/report/invoiceall.php?notransaksi='+this.notransaksi+'&kdcabang='+this.kdcabang+'&username=fredy';

  lihatkunjungan() {
    const subDistrictParam =
      this.selectedKelurahanId && this.selectedKelurahanId !== "semua"
        ? "&subDistrict=" + this.selectedKelurahanId
        : "";
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/kunjungan.php?tgldari=" +
        this.tgldari +
        "&kdcabang=" +
        this.kdcabang +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kdklinik +
        "&jk=" +
        this.jk +
        subDistrictParam,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }
  lihatbp() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/batalpriksa.php?tgldari=" +
        this.tgldari +
        "&kdcabang=" +
        this.kdcabang +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kdklinik,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }
  lihatkunjunganexcel() {
    const subDistrictParam =
      this.selectedKelurahanId && this.selectedKelurahanId !== "semua"
        ? "&subDistrict=" + this.selectedKelurahanId
        : "";
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/kunjunganexcel.php?tgldari=" +
        this.tgldari +
        "&kdcabang=" +
        this.kdcabang +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kdklinik +
        subDistrictParam,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatrj() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/pendapatanrj.php?kdcabang=" +
        this.kdcabang +
        "&username=" +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kdklinik +
        "&kdpoli=" +
        this.kdklinik,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatrjkon() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/pendapatanrjkonsumen.php?kdcabang=" +
        this.kdcabang +
        "&username=" +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kdklinik +
        "&kdpoli=" +
        this.kdklinik +
        "&kdcus=" +
        this.kdcus,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatrjexcel() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/pendapatanrjexcel.php?kdcabang=" +
        this.kdcabang +
        "&username=" +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kdklinik +
        "&kdpoli=" +
        this.kdklinik,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatrjkonexcel() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/pendapatanrjkonsumenexcel.php?kdcabang=" +
        this.kdcabang +
        "&username=" +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kdklinik +
        "&kdpoli=" +
        this.kdklinik +
        "&kdcus=" +
        this.kdcus,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatrjkondok() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/jasadokterrj.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kddokter,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatrjkondokexcel() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/jasadokterrjexcel.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kddokter,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatrjkom() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/jasakomponen.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kdkom,
      "_blank",
      "location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatrjkomexcel() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/jasakomponenexcel.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&status=" +
        this.kdkom,
      "_blank",
      "location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }
  lihatrjkomx() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/pendapatantf.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatrjkomexcelx() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/pendapatantfex.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai,
      "_blank",
      "location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatss() {
    var redirectWindow = window.open(
      this.URLINVOICE +
        "clenic/report/kunjungansehat.php?kdcabang=" +
        this.kdcabang +
        "&tgldari=" +
        this.tgldari +
        "&tglsampai=" +
        this.tglsampai +
        "&jk=" +
        this.jk,
      "_blank",
      "location=no,toolbar=no,height=570,width=1000,scrollbars=yes,status=yes",
    );
    redirectWindow.location;
  }

  lihatprolanis() {
    // Validasi parameter terlebih dahulu
    if (!this.tgldari || !this.tglsampai) {
      this.toastr.error("Tanggal dari dan sampai harus diisi", "Error");
      return;
    }

    if (!this.kdcabang) {
      this.toastr.error("Kode cabang tidak ditemukan", "Error");
      return;
    }

    // Method 1: Coba download via HTTP client (untuk mendapatkan proper filename, dll)
    const params = {
      start_date: this.tgldari,
      end_date: this.tglsampai,
    };

    console.log("Downloading prolanis report with params:", {
      kdcabang: this.kdcabang,
      params: params,
    });

    this.toastr.info("Memproses unduhan laporan...", "Info");
    console.log(this.slug);
    this.authService.downloadProlanisPrbReport(this.slug, params).subscribe(
      (response: any) => {
        try {
          const blob = response.body;

          // Cek apakah response adalah blob yang valid
          if (!blob || blob.size === 0) {
            this.toastr.error("File kosong atau tidak valid", "Error");
            return;
          }

          // Cek content type dari response header
          const contentType = response.headers.get("content-type");
          console.log("Content-Type:", contentType);

          // Ambil filename dari Content-Disposition header jika ada
          const contentDisposition = response.headers.get(
            "content-disposition",
          );
          let filename = `laporan-prolanis-${this.tgldari}-${this.tglsampai}.pdf`;

          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(
              /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
            );
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1].replace(/['"]/g, "");
            }
          }

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          this.toastr.success("Laporan Prolanis berhasil didownload", "Sukses");
        } catch (downloadError) {
          console.error("Error creating download link:", downloadError);
          this.toastr.error("Gagal membuat link download", "Error");
        }
      },
      (error) => {
        console.error("Error downloading prolanis report:", error);

        // Method 2: Fallback - buka di tab baru jika ada CORS issue
        if (error.status === 0) {
          console.log("CORS issue detected, falling back to direct URL method");
          this.lihatprolanisDirectURL();
          return;
        }

        let errorMessage = "Gagal mengunduh laporan prolanis";

        if (error.status === 404) {
          errorMessage = "Endpoint laporan tidak ditemukan";
        } else if (error.status === 500) {
          errorMessage = "Terjadi kesalahan di server";
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.toastr.error(errorMessage, "Error");
      },
    );
  }

  // Method fallback untuk buka URL langsung di tab baru
  lihatprolanisDirectURL() {
    const baseUrl = "https://emr.devapbatech.com/backend/public/"; // atau dari environment
    const url = `${baseUrl}api/${this.kdcabang}/prolanis-prb/laporan?start_date=${this.tgldari}&end_date=${this.tglsampai}`;

    console.log("Opening prolanis report directly:", url);

    const redirectWindow = window.open(
      url,
      "_blank",
      "location=no,toolbar=no,height=" +
        screen.height +
        ",width=" +
        screen.width +
        ",scrollbars=yes,status=yes",
    );

    if (redirectWindow) {
      this.toastr.success("Laporan dibuka di tab baru", "Sukses");
    } else {
      this.toastr.error(
        "Gagal membuka tab baru. Periksa popup blocker.",
        "Error",
      );
    }
  }

  validateDateRange() {
    const startDate = this.dateForm.get("startDate").value;
    const endDate = this.dateForm.get("endDate").value;

    if (!startDate || !endDate) {
      this.dateRangeInvalid = false;
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if end date is before start date
    if (end < start) {
      this.toastr.error("Tanggal akhir harus setelah tanggal awal", "Error");
      this.dateRangeInvalid = true;
      return;
    }

    // Check if range is more than 31 days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 31) {
      this.toastr.error(
        "Range tanggal tidak boleh lebih dari 31 hari",
        "Error",
      );
      this.dateRangeInvalid = true;
      return;
    }

    this.dateRangeInvalid = false;
  }
}
