import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollableComponent } from './scrollable.component';
import { ScrollableRoutingModule } from './scrollable-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';

@NgModule({
  imports: [
    CommonModule, NgbModule,
    ScrollableRoutingModule, PageTitleModule
  ],
  declarations: [ScrollableComponent]
})
export class ScrollableModule { }
