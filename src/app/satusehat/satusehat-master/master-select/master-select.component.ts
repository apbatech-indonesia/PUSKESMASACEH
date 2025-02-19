import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { MasterService } from "../services/master.service";

@Component({
  selector: "app-master-select",
  templateUrl: "./master-select.component.html",
  styleUrls: ["./master-select.component.sass"],
})
export class MasterSelectComponent implements OnInit {
  @Output() selectedItem = new EventEmitter();
  @Input() id: string;
  @Input() searchSelectText: string = "Semua Lokasi";
  @Input() title: string = "";
  @Input() isShowCode: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() selectList: any = [];

  searchSelectBy: any = 1;

  constructor(private api: MasterService) {}

  ngOnInit(): void {}

  cariSelect() {
    const listOfSubDis: any = JSON.parse(
      localStorage.getItem("listOfSubdistrict")
    );
    
    this.selectList = this.searchVillageByName(listOfSubDis, this.searchSelectText);
  }

  searchVillageByName(villages, name) {
    return villages.filter((village: any) =>
      village.village_name.toLowerCase().includes(name.toLowerCase())
    );
  }

  pilihSelect(data: any) {
    this.selectList = [];
    this.selectedItem.emit(data);
    this.searchSelectText = data.village_name;
  }
}
