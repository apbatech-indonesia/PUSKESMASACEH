import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimelineComponent } from './timeline.component';
import { TimelineRoutingModule } from './timeline-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
@NgModule({
  imports: [
    CommonModule, NgbModule,
    TimelineRoutingModule, PageTitleModule],
  declarations: [TimelineComponent]})
export class TimelineModule { }



