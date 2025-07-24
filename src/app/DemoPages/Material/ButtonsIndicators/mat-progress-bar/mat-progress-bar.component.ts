import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-progress-bar',
  templateUrl: './mat-progress-bar.component.html',
  styleUrls: ['./mat-progress-bar.component.css']
})
export class MatProgressBarComponent implements OnInit {

  heading = 'Material Progress Bar';
  subheading = 'This component is a horizontal progress-bar for indicating progress and activity.';
  icon = 'pe-7s-stopwatch icon-gradient bg-amy-crisp';

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  constructor() {
  }

  ngOnInit() {
  }

}
