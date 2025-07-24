import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-toggle',
  templateUrl: './slider-toggle.component.html',
  styleUrls: ['./slider-toggle.component.css']
})
export class SliderToggleComponent implements OnInit {

  heading = 'Slide Toggle';
  subheading = 'This widget is an on/off control that can be toggled via clicking or dragging.';
  icon = 'pe-7s-notebook icon-gradient bg-mixed-hopes';

  labelPosition = 'before';
  color = 'accent';
  checked = false;
  disabled = false;

  changeLablesPositions() {
    this.labelPosition = this.labelPosition === 'before' ? 'after' : 'before';
  }

  constructor() {
  }

  ngOnInit() {
  }

  ks(){
    
  }

}
