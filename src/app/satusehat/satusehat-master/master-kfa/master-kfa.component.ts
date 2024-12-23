import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-master-kfa',
  templateUrl: './master-kfa.component.html',
  styleUrls: ['./master-kfa.component.sass']
})
export class MasterKfaComponent implements OnChanges {
  @Output() selectedItem = new EventEmitter()
  @Input() id: string
  @Input() searchKfaText: string = ''
  @Input() title: string = ''
  @Input() isShowCode: boolean = true
  @Input() isDisabled: boolean = false

  searchKfaBy: any = 1
  kfaList: any = []

  constructor(
    private api: MasterService
  ) { }

  ngOnChanges(): void {
    this.getKfaByCode(this.id)
  }

  async cariKfa() {
    let payload = {
      page: 1,
      size: 10000,
      product_type: "farmasi",
      keyword: this.searchKfaText
    }
    let data: any = await this.api.getKfa(payload)
    this.kfaList = data.data ?? []
  }

  async getKfaByCode(id: any) {
    if (this.id) {
      let data: any = await this.api.getKfaByCode(id)
      this.pilihKfa(data.data)
    } else {
      this.pilihKfa({code: null, name: null})
    }
  }

  pilihKfa(data: any) {
    this.kfaList = []
    this.selectedItem.emit(data)
    this.searchKfaText = data.name
  }
}
