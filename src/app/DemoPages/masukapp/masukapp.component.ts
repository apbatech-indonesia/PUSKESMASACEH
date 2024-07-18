import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masukapp',
  templateUrl: './masukapp.component.html',
  
  styles: []
})
export class MasukappComponent implements OnInit {

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
