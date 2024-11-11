import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-master-city',
  templateUrl: './master-city.component.html',
  styleUrls: ['./master-city.component.sass']
})
export class MasterCityComponent implements OnChanges {

  @Input() provinceId: any
  @Input() cityId: any
  @Output() cityOutput = new EventEmitter()

  cityList: any = []

  constructor(
    private masterService: MasterService
  ) { }

  async ngOnChanges(changes: SimpleChanges) {
    if(Object.keys(changes).length == 2 || changes.hasOwnProperty('provinceId')) {
      let data = {
        province_codes: this.provinceId
      }
      let cityData: any = await this.masterService.getCity(data)
      this.cityList = [
        { code: '', name: '-- Pilih Kota --' },
        ...cityData.data
      ]
    }
  }

  pilihCity() {
    this.cityOutput.emit(this.cityId)
  }
}
