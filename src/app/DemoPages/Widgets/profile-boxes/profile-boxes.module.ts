import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileBoxesComponent } from './profile-boxes.component';
import { ProfileBoxesRoutingModule } from './profile-boxes-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';

@NgModule({
  imports: [
    CommonModule, RoundProgressModule, FontAwesomeModule,
    ProfileBoxesRoutingModule, PageTitleModule
  ],
  declarations: [ProfileBoxesComponent],
  providers: [
  ],
})
export class ProfileBoxesModule { }

