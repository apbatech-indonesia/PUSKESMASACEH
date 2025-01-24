import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-laporanskriningilp',
  templateUrl: './laporanskriningilp.component.html',
  styleUrls: ['./laporanskriningilp.component.css']
})
export class laporanskriningilpComponent implements OnInit {
  faSearch = faSearch;

  response: any
  list: any = [
    { klaster: 2, subclaster: "test 1" },
    { klaster: 3, subclaster: "test 2" },
    { klaster: 4, subclaster: "test 3" },
  ]
  totalklaster2: number = 0;
  totalklaster3: number = 0;
  totalklaster4: number = 0;
  percentagesuccess: number = 0;
  percentagefailed: number = 0;

  jumlahPasienTerdaftar: number = 0;
  jumlahPasienTerskrining: number = 0;
  jumlahPasienBelumSkrining: number = 0;

  grapikTahunanTotalSkrining = [1, 22, 3, 4, 52, 6, 7, 82, 9, 101, 112, 122]
  grapikTahunanTotalSkriningListYears = [2025, 2024]
  grapikTahunanTotalSkriningYear = "2024"


  barValue = [
    "68",
    "47",
    "44",
    "90",
    "72",
    "68",
    "84"
  ];

  barSkrining = [
    "Gedangsari",
    "Patuk 2",
    "Rongkop",
    "Panjang",
    "Tepur 1",
    "Tepur 2",
    "SaptoSari"
  ]

  constructor(
    private api: ApiserviceService
  ) { }

  ngOnInit() {
  }
}
