import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  heading = 'Ratings';
  subheading = 'Display beautiful ratings with custom icons, stars and colors.';
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  currentRate = 6;
  currentRate3 = 7;
  currentRate2 = 3.14;
  selected = 0;
  hovered = 0;
  readonly = false;

  constructor() {
  }

  ngOnInit() {
  }

}
