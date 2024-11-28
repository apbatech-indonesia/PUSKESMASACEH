import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-master-kfa',
  templateUrl: './master-kfa.component.html',
  styleUrls: ['./master-kfa.component.sass']
})
export class MasterKfaComponent implements OnInit {
  @Output() selectedItem = new EventEmitter()
  @Input() searchKfaText: string = ''
  @Input() title: string = ''

  searchKfaBy: any = 1
  kfaList: any = []

  constructor(
    private api: MasterService
  ) { }

  ngOnInit(): void {
  }

  async cariKfa() {
    let payload = {
      page: 1,
      size: 5,
      product_type: "farmasi",
      keyword: this.searchKfaText
    }
    let data: any = await this.api.getKfa(payload)
    this.kfaList = data.data ?? []
  }

  pilihKfa(data) {
    this.kfaList = []
    this.selectedItem.emit(data)
    this.searchKfaText = data.name
  }
}
