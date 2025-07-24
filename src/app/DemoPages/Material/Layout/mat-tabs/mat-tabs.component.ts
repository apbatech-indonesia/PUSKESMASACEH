import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-tabs',
  templateUrl: './mat-tabs.component.html',
  styleUrls: ['./mat-tabs.component.css']
})
export class MatTabsComponent implements OnInit {

  heading = 'Material Tabs';
  subheading = 'Angular Material tabs organize content into separate views where only one view can be visible at a time.';
  icon = 'pe-7s-star icon-gradient bg-ripe-malin';

  constructor() {
  }

  ngOnInit() {
  }

}
