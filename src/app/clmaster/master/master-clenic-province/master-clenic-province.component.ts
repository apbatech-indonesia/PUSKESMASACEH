import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { ApiserviceService } from "src/app/apiservice.service";

@Component({
  selector: "app-master-clenic-province",
  templateUrl: "./master-clenic-province.component.html",
  styleUrls: ["./master-clenic-province.component.sass"],
})
export class MasterClenicProvinceComponent implements OnInit, OnChanges {
  @Input() id: string = "";
  @Input() keyword: string = "";
  @Output() selectedItem = new EventEmitter();
  placeholder = "Provinsi";
  list: any = [];

  constructor(private api: ApiserviceService) {}

  ngOnInit(): void {
    this.cari(this.keyword);
  }

  ngOnChanges(): void {
    this.cari(this.keyword);
  }

  async cari(dataSearch: string = "") {
    let data: any = await this.api.propinsi(dataSearch).toPromise();

    this.list = [
      ...data.map((item: any) => ({
        code: item.prov_id,
        name: item.prov_name,
      })),
    ];
  }

  pilih(data: any) {
    this.selectedItem.emit(data);
  }
}
