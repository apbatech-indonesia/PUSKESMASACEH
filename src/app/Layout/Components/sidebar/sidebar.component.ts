import { Component, HostListener, OnInit } from "@angular/core";
import { ThemeOptions } from "../../../theme-options";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
} from "ngx-perfect-scrollbar";
import { ApiserviceService } from "src/app/apiservice.service";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  public userDetails: any;
  nama: any;
  akses: any;

  kdklinik: any;
  cabangarr: any;

  cariuser: any;
  kdcabang: any;
  poliklinik: any;
  namadokter = "";
  online = "";
  kddokter = "";
  constructor(
    public globals: ThemeOptions,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private authService: ApiserviceService
  ) {
    const data = JSON.parse(localStorage.getItem("userDatacl"));
    this.userDetails = data.userData;
    this.nama = this.userDetails.nama;
    this.akses = this.userDetails.hakakses;
    this.kdklinik = this.userDetails.kdklinik;
    this.kdcabang = this.userDetails.kdcabang;
  }

  @select("config") public config$: Observable<any>;

  public config: PerfectScrollbarConfigInterface = {};
  private newInnerWidth: number;
  private innerWidth: number;
  activeId = "dashboards";

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
    this.globals.sidebarHover = !this.globals.toggleSidebar;

    // this.globals.toggleSidebar = false;
    // this.globals.sidebarHover = false;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  sidebarHoverMouseOut() {
    this.globals.sidebarHover = false;
  }

  sidebarHoverMouseIn() {
    this.globals.sidebarHover = true;
  }

  rj: number;
  far: number;
  lab: number;
  rad: number;
  emr: number;
  ri: number;

  hak() {
    this.authService.hakakses(this.kdcabang).subscribe(
      (data) => {
        for (let x of data)
        {
          this.rj = x.rj;
          this.far = x.farmasi;
          this.lab = x.lab;
          this.rad = x.rad;
          this.emr = x.emr;
          this.ri = x.ri;
        }
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  ngOnInit() {
    this.hak();
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200)
      {
        this.globals.toggleSidebar = true;
      }
    });

    this.extraParameter =
      this.activatedRoute.snapshot.firstChild.routeConfig.path;

    // alert(this.akses)
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200)
    {
      this.globals.toggleSidebar = true;
    } else
    {
      this.globals.toggleSidebar = false;
    }
  }

  cetakinvoice() {
    var redirectWindow = window.open(
      "https://fronttemprs.clenic.id/#/masuk/002000001/002000001/Wirahman/Wirahman Usman/Super Admin/002/12345",
      "_blank",
      "location=no,menubar=yes,toolbar=yes,height=" +
      screen.height +
      ",width=" +
      screen.width +
      ",scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  cetakantrian() {
    var redirectWindow = window.open(
      "http://localhost:8011/anjungan/AJG-v3/awal.php",
      "_blank",
      "location=no,menubar=yes,toolbar=yes,height=" +
      screen.height +
      ",width=" +
      screen.width +
      ",scrollbars=yes,status=yes"
    );
    redirectWindow.location;
  }
  kanjungan() {
    // this.router.navigate(['/anjungan']);
    alert("Sementara pendaftaran memakai pendaftraan rawat jalan");
  }
  update() {
    alert("dalam proses update");
  }
  kanjungans() {
    this.router.navigate(["/anjungans"]);
  }
  displayc() {
    this.router.navigate(["/ermdisplay"]);
  }
}
