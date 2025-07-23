import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ApiserviceService } from "src/app/apiservice.service";

@Component({
  selector: "app-master-clenic-subdistrict",
  templateUrl: "./master-clenic-subdistrict.component.html",
  styleUrls: ["./master-clenic-subdistrict.component.sass"],
})
export class MasterClenicSubDistrictComponent implements OnInit {
  @Output() selectedItem = new EventEmitter();
  @Input() id: string;
  @Input() parentId: string;
  @Input() searchText: string = "";
  @Input() title: string = "";
  @Input() isShowCode: boolean = true;
  @Input() isDisabled: boolean = false;

  placeholder = "Kelurahan";
  list: any = [];

  constructor(private api: ApiserviceService) {}

  ngOnInit(): void {}

  async cari() {
    let data: any = await this.api
      .keluarahan(this.parentId, this.searchText)
      .toPromise();

    this.list = data.map((item: any) => {
      return {
        code: item.subdis_id,
        name: item.subdis_name,
      };
    });
  }

  pilih(data: any) {
    this.list = [];
    this.selectedItem.emit(data);
    this.searchText = data.name;
  }
}
