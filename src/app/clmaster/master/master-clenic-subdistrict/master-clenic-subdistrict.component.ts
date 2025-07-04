import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { ApiserviceService } from "src/app/apiservice.service";

@Component({
  selector: "app-master-clenic-subdistrict",
  templateUrl: "./master-clenic-subdistrict.component.html",
  styleUrls: ["./master-clenic-subdistrict.component.sass"],
})
export class MasterClenicSubDistrictComponent implements OnChanges {
  @Input() id: string = "";
  @Input() keyword: string = "";
  @Input() parentId: string = "";
  @Output() selectedItem = new EventEmitter();

  placeholder = "Kelurahan";
  list: any = [];

  constructor(private api: ApiserviceService) {}

  ngOnChanges(): void {
    console.log("id", this.id);
    console.log("parentId", this.parentId);
    console.log("list", this.list);
    this.cari(this.keyword);
  }

  async cari(dataSearch: string = "") {
    let data: any = await this.api
      .keluarahan(this.parentId, dataSearch)
      .toPromise();

    this.list = [
      ...data.map((item: any) => ({
        code: item.subdis_id,
        name: item.subdis_name,
      })),
    ];
  }

  pilih(data: any) {
    this.selectedItem.emit(data);
  }
}
