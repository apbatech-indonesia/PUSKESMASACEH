import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ApiserviceService } from "src/app/apiservice.service";

@Component({
  selector: "app-master-clenic-district",
  templateUrl: "./master-clenic-district.component.html",
  styleUrls: ["./master-clenic-district.component.sass"],
})
export class MasterClenicDistrictComponent implements OnInit {
  @Output() selectedItem = new EventEmitter();
  @Input() id: string;
  @Input() parentId: string;
  @Input() searchText: string = "";
  @Input() title: string = "";
  @Input() isShowCode: boolean = true;
  @Input() isDisabled: boolean = false;

  placeholder = "Kecamatan";
  searchDistrictBy: any = 1;
  list: any = [];

  constructor(private api: ApiserviceService) {}

  ngOnInit(): void {}

  async cari() {
    let data: any = await this.api
      .kecamatan(this.parentId, this.searchText)
      .toPromise();

    this.list = data.map((item: any) => {
      return {
        code: item.dis_id,
        name: item.dis_name,
      };
    });
  }

  pilih(data: any) {
    this.list = [];
    this.selectedItem.emit(data);
    this.searchText = data.name;
  }
}
