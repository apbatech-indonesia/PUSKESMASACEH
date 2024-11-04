import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MtbmService } from '../../satusehat-mtbm/services/mtbm.service';

@Component({
  selector: 'app-master-province',
  templateUrl: './master-province.component.html',
  styleUrls: ['./master-province.component.sass']
})
export class MasterProvinceComponent implements OnInit {
  @Input() provinceId: any
  @Output() provinceOutput = new EventEmitter()

  provinceList: any = []

  constructor(
    private mtbmService: MtbmService
  ) { }

  async ngOnInit() {
    let provinceData: any = await this.mtbmService.getProvince('')
    this.provinceList = [
      { code: '', name: '-- Pilih Provinsi --' },
      ...provinceData.data
    ]
  }

  pilihProvinsi() {
    this.provinceOutput.emit(this.provinceId)
  }
}
