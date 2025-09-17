import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ApiserviceService } from "src/app/apiservice.service";

@Component({
  selector: "app-master-clenic-dokter",
  templateUrl: "./master-clenic-dokter.component.html",
  styleUrls: ["./master-clenic-dokter.component.sass"],
})
export class MasterClenicDokterComponent implements OnInit {
  @Input() id: string = ""; // kddokter default
  @Input() keyword: string = ""; // keyword search
  @Output() selectedItem = new EventEmitter<any>();

  placeholder = "Kelurahan";
  list: any[] = [];

  constructor(private api: ApiserviceService) {}

  ngOnInit(): void {
    this.cari(this.keyword);
  }

  // ambil data dokter
  async cari(dataSearch: string = "") {
    const kdcabang = JSON.parse(localStorage.getItem("userDatacl")).userData
      .kdcabang;
    const data: any = await this.api.dokter(kdcabang).toPromise();

    // pastikan code selalu string supaya binding ngModel konsisten
    this.list = data.map((item: any) => ({
      code: item.kddokter.toString(),
      name: item.namdokter,
    }));

    // convert id ke string juga supaya match
    if (this.id) {
      this.id = this.id.toString();
    }
  }

  // emit saat item dipilih
  pilih(data: any) {
    this.selectedItem.emit(data);
  }

  // compare function untuk ng-select
  compareItems = (item: any, selected: any) => {
    return item && selected ? item.code === selected : false;
  };
}
