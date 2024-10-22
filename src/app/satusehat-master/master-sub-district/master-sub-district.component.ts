import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MtbmService } from 'src/app/services/SatusehatServices/mtbm/mtbm.service';

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
    private mtbmService: MtbmService
  ) { }

  async ngOnChanges(changes: SimpleChanges) {
    let data = {
      district_codes: this.districtId
    }
    let subDistrictData: any = await this.mtbmService.getSubDistrict(data)
    this.subDistrictList = [
      { code: '', name: '-- Pilih Kelurahan --' },
      ...subDistrictData.data
    ]
  }

  pilihsubDistrict() {
    this.subDistrictOutput.emit(this.subdistrictId)
  }
}
