import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-laporanskriningilp',
  templateUrl: './laporanskriningilp.component.html',
  styles: []
})
export class laporanskriningilpComponent implements OnInit {
  faSearch = faSearch;

  response: any
  list: any = [
    {klaster: 2, subclaster: "test 1"},
    {klaster: 3, subclaster: "test 2"},
    {klaster: 4, subclaster: "test 3"},
  ]
  totalklaster2:number=0;
  totalklaster3:number=0;
  totalklaster4:number=0;
  percentagesuccess:number=0;
  percentagefailed:number=0;

  constructor(
    private api: ApiserviceService
  ) { }

  ngOnInit() {
  }
}
