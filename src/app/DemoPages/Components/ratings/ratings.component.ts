import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styles: [`
    .star {
      font-size: 1.5rem;
      color: #3f6ad8;
    }

    .filled {
      color: #3ac47d;
    }

    .bad {
      color: #f7b924;
    }

    .filled.bad {
      color: #d92550;
    }

    .star2 {
      position: relative;
      display: inline-block;
      font-size: 3rem;
      color: var(--gray);
    }

    .full {
      color: #16aaff;
    }

    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: #d92550;
    }
  `]
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
