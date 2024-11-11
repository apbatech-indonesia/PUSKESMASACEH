import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MasterService } from '../services/master.service';

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
    private masterService: MasterService
  ) { }

  async ngOnInit() {
    let provinceData: any = await this.masterService.getProvince('')
    this.provinceList = [
      { code: '', name: '-- Pilih Provinsi --' },
      ...provinceData.data
    ]
  }

  pilihProvinsi() {
    this.provinceOutput.emit(this.provinceId)
  }
}
