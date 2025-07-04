import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImunisasiService } from '../../satusehat-imunisasi/services/imunisasi.service';

@Component({
  selector: 'app-master-vaccine',
  templateUrl: './master-vaccine.component.html',
  styleUrls: ['./master-vaccine.component.sass']
})
export class MasterVaccineComponent implements OnInit {
  @Output() selectedItem = new EventEmitter()
  @Output() deletedItem = new EventEmitter()
  @Input() searchVaccineText: string

  searchVaccineBy: any = 'terminology_name'
  vaccineList: any = []

  constructor(
    private api: ImunisasiService
  ) { }

  ngOnInit(): void {
  }

  async cariVaccine() {
    let payload = {
      terminology_id: "",
      key_name: `${this.searchVaccineBy}|is_active`,
      key_operator: "like|=",
      key_value: `${this.searchVaccineText}|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 5,
      order_by: "terminology_name",
      order_type: "Asc"
    }

    let vaccineData: any = await this.api.getMasterImunisasi(payload)
    this.vaccineList = [
      ...vaccineData.data
    ]
  }

  async pilihVaccine(data: any) {
    this.searchVaccineText = data.terminology_name
    this.vaccineList = []
    this.selectedItem.emit(data)
  }
}
