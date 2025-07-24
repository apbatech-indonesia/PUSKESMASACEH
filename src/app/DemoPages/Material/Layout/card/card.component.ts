import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardMatComponent implements OnInit {

  heading = 'Material Cards';
  subheading = 'This is a content container for text, photos, and actions in the context of a single subject.';
  icon = 'pe-7s-signal icon-gradient bg-malibu-beach';

  constructor() {
  }

  ngOnInit() {
  }

}
