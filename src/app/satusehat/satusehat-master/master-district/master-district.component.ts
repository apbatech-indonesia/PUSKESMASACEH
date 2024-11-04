import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-master-district',
  templateUrl: './master-district.component.html',
  styleUrls: ['./master-district.component.sass']
})
export class MasterDistrictComponent implements OnChanges {

  @Input() cityId: any
  @Input() districtId: any
  @Output() districtOutput = new EventEmitter()

  districtList: any = []

  constructor(
    private masterService: MasterService
  ) { }

  async ngOnChanges(changes: SimpleChanges) {
    if(Object.keys(changes).length == 2 || changes.hasOwnProperty('cityId')) {
      let data = {
        city_codes: this.cityId
      }
      let districtData: any = await this.masterService.getDistrict(data)
      this.districtList = [
        { code: '', name: '-- Pilih Kecamatan --' },
        ...districtData.data
      ]
    }
  }

  pilihDistrict() {
    this.districtOutput.emit(this.districtId)
  }
}
