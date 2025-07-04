import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DataSpecimen } from './data-spesimen';

@Component({
  selector: 'app-master-specimen',
  templateUrl: './master-specimen.component.html',
  styleUrls: ['./master-specimen.component.sass']
})
export class MasterSpecimenComponent implements OnChanges {
  @Output() selectedItem = new EventEmitter()
  @Input() id: string
  @Input() searchSpecimenText: string = ''
  @Input() title: string = ''
  @Input() isShowCode: boolean = true
  @Input() isDisabled: boolean = false

  searchSpecimenBy: any = 1
  specimenList: any = []

  constructor(
    private dataSpecimen: DataSpecimen
  ) { }

  ngOnChanges(): void {
    this.getSpecimenByCode()
  }

  cariSpecimen() {
    let data: any = this.findByDisplayLike(this.searchSpecimenText)
    this.specimenList = data ?? []
  }

  getSpecimenByCode() {
    if (this.id) {
      let data: any = this.findBycode(this.id)
      this.pilihSpecimen(data)
    } else {
      this.pilihSpecimen({code: null, display: null})
    }
  }

  findByDisplayLike(displayValue) {
    return this.dataSpecimen.data.filter(item => item.display.toLowerCase().includes(displayValue.toLowerCase()));
  }

  findBycode(code) {
    return this.dataSpecimen.data.find(item => item.code === code);
  }

  pilihSpecimen(data: any) {
    this.specimenList = []
    this.selectedItem.emit(data)
    this.searchSpecimenText = data.display
  }
}
