import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterKfaComponent } from './master-kfa.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MasterKfaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MasterKfaComponent
  ]
})
export class MasterKfaModule { }
