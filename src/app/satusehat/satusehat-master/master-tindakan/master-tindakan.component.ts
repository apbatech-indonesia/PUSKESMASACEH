import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-master-tindakan',
  templateUrl: './master-tindakan.component.html',
  styleUrls: ['./master-tindakan.component.sass']
})
export class MasterTindakanComponent implements OnInit {
  @Output() selectedItem = new EventEmitter()
  @Input() searchTindakanText: string
  @Input() isShowCode: boolean = true

  searchTindakanBy: any = 1
  tindakanList: any = []

  constructor(
    private api: ApiserviceService
  ) { }

  ngOnInit(): void {
  }

  cariTindakan() {
    this.api.caritindakan(this.searchTindakanText, this.searchTindakanBy).subscribe((data) => {
      this.tindakanList = data
    })
  }

  pilihTindakan(data) {
    this.tindakanList = []
    this.selectedItem.emit(data)
    this.searchTindakanText = data.tindakan
  }
}
