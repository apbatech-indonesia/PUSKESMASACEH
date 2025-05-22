import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { ApiserviceService } from "src/app/apiservice.service";

@Component({
  selector: "app-master-clenic-district",
  templateUrl: "./master-clenic-district.component.html",
  styleUrls: ["./master-clenic-district.component.sass"],
})
export class MasterClenicDistrictComponent implements OnChanges {
  @Input() id: string = "";
  @Input() keyword: string = "";
  @Input() parentId: string = "";
  @Output() selectedItem = new EventEmitter();

  placeholder = "Kecamatan";
  list: any = [];

  constructor(private api: ApiserviceService) {}

  ngOnChanges(): void {
    this.cari(this.keyword);
  }

  async cari(dataSearch: string = "") {
    let data: any = await this.api
      .kecamatan(this.parentId, dataSearch)
      .toPromise();

    this.list = [
      ...data.map((item: any) => ({
        code: item.dis_id,
        name: item.dis_name,
      })),
    ];
  }

  pilih(data: any) {
    this.selectedItem.emit(data);
  }
}
