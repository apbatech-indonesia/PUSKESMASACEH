import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-master-sub-district',
  templateUrl: './master-sub-district.component.html',
  styleUrls: ['./master-sub-district.component.sass']
})
export class MasterSubDistrictComponent implements OnChanges {

  @Input() districtId: any
  @Input() subdistrictId: any
  @Output() subDistrictOutput = new EventEmitter()

  subDistrictList: any = []

  constructor(
    private masterService: MasterService
  ) { }

  async ngOnChanges(changes: SimpleChanges) {
    if(Object.keys(changes).length == 2 || changes.hasOwnProperty('districtId')) {
      let data = {
        district_codes: this.districtId
      }
      let subDistrictData: any = await this.masterService.getSubDistrict(data)
      this.subDistrictList = [
        { code: '', name: '-- Pilih Kelurahan --' },
        ...subDistrictData.data
      ]
    }
  }

  pilihsubDistrict() {
    this.subDistrictOutput.emit(this.subdistrictId)
  }
}
