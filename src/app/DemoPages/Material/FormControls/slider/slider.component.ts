import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class SliderComponent implements OnInit {

  heading = 'Material Sliders';
  subheading = 'This allows for the selection of a value from a range via mouse, touch, or keyboard, similar to form range input.';
  icon = 'pe-7s-album icon-gradient bg-sunny-morning';

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }

  set tickInterval(v) {
    this._tickInterval = Number(v);
  }

  constructor() {
  }

  myValue = 50;

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;

  private _tickInterval = 1;

  changeSlider() {
    console.log('myValue:', this.myValue);
  }

  ngOnInit() {
  }

}
