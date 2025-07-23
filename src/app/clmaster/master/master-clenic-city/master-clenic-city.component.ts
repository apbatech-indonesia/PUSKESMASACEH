import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { ApiserviceService } from "src/app/apiservice.service";

@Component({
  selector: "app-master-clenic-city",
  templateUrl: "./master-clenic-city.component.html",
  styleUrls: ["./master-clenic-city.component.sass"],
})
export class MasterClenicCityComponent implements OnChanges {
  @Input() id: string = "";
  @Input() parentId: string = "";
  @Input() keyword: string = "";
  @Output() selectedItem = new EventEmitter();
  placeholder = "Kota/Kabupaten";
  list: any = [];

  constructor(private api: ApiserviceService) {}

  ngOnChanges(): void {
    this.cari(this.keyword);
  }

  async cari(dataSearch: string = "") {
    let data: any = await this.api
      .kabupaten(this.parentId, dataSearch)
      .toPromise();

    this.list = [
      ...data.map((item: any) => ({
        code: item.city_id,
        name: item.city_name,
      })),
    ];
  }

  pilih(data: any) {
    this.selectedItem.emit(data);
  }
}
