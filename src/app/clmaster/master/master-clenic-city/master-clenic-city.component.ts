import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ApiserviceService } from "src/app/apiservice.service";

@Component({
  selector: "app-master-clenic-city",
  templateUrl: "./master-clenic-city.component.html",
  styleUrls: ["./master-clenic-city.component.sass"],
})
export class MasterClenicCityComponent implements OnInit {
  @Output() selectedItem = new EventEmitter();
  @Input() id: string;
  @Input() parentId: string;
  @Input() searchText: string = "";
  @Input() title: string = "";
  @Input() isShowCode: boolean = true;
  @Input() isDisabled: boolean = false;

  placeholder = "Kota/Kabupaten";
  list: any = [];

  constructor(private api: ApiserviceService) {}

  ngOnInit(): void {}

  async cari() {
    let data: any = await this.api
      .kabupaten(this.parentId, this.searchText)
      .toPromise();

    this.list = data.map((item: any) => {
      return {
        code: item.city_id,
        name: item.city_name,
      };
    });
  }

  pilih(data: any) {
    this.list = [];
    this.selectedItem.emit(data);
    this.searchText = data.name;
  }
}
