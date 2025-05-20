import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ApiserviceService } from "src/app/apiservice.service";

@Component({
  selector: "app-master-clenic-province",
  templateUrl: "./master-clenic-province.component.html",
  styleUrls: ["./master-clenic-province.component.sass"],
})
export class MasterClenicProvinceComponent implements OnInit {
  @Output() selectedItem = new EventEmitter();
  @Input() id: string;
  @Input() searchText: string = "";
  @Input() title: string = "";
  @Input() isShowCode: boolean = true;
  @Input() isDisabled: boolean = false;

  placeholder = "Provinsi";
  list: any = [];

  constructor(private api: ApiserviceService) {}

  ngOnInit(): void {}

  async cari() {
    let data: any = await this.api.propinsi(this.searchText).toPromise();

    this.list = data.map((item: any) => {
      return {
        code: item.prov_id,
        name: item.prov_name,
      };
    });
  }

  pilih(data: any) {
    this.list = [];
    this.selectedItem.emit(data);
    this.searchText = data.name;
  }
}
