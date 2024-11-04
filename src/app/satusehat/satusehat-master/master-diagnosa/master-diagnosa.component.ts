import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-master-diagnosa',
  templateUrl: './master-diagnosa.component.html',
  styleUrls: ['./master-diagnosa.component.sass']
})
export class MasterDiagnosaComponent implements OnInit {
  @Output() selectedItem = new EventEmitter()
  @Input() searchDiagnosaText: string

  searchDiagnosaBy: any = 1
  diagnosaList: any = []

  constructor(
    private api: ApiserviceService
  ) { }

  ngOnInit(): void {
  }

  cariDiagnosa() {
    this.api.caridiagnosa(this.searchDiagnosaText, this.searchDiagnosaBy).subscribe((data) => {
      this.diagnosaList = data
    })
  }

  pilihDiagnosa(data) {
    this.diagnosaList = []
    this.selectedItem.emit(data)
    this.searchDiagnosaText = data.diagnosa
  }
}
