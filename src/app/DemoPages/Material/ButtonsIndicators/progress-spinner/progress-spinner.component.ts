import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent implements OnInit {

  heading = 'Material Spinners';
  subheading = 'These are a circular indicators of progress and activity.';
  icon = 'pe-7s-moon icon-gradient bg-amy-crisp';

  color = 'primary';
  mode = 'determinate';
  value = 50;

  constructor() {
  }

  ngOnInit() {
  }

}
