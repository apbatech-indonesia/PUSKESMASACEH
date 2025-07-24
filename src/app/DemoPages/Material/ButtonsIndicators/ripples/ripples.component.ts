import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ripples',
  templateUrl: './ripples.component.html',
  styleUrls: ['./ripples.component.css']
})
export class RipplesComponent implements OnInit {

  heading = 'Material Ripples';
  subheading = 'Connect user input to screen reactions by using ripples to both indicate the point of touch, and to confirm that touch input was received.';
  icon = 'pe-7s-paint icon-gradient bg-sunny-morning';

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  constructor() {
  }

  ngOnInit() {
  }

}
