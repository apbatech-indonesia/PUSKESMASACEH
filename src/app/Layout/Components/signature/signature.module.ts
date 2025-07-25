import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignatureComponent } from "../signature/signature.component";

@NgModule({
  declarations: [SignatureComponent],
  imports: [CommonModule],
  exports: [SignatureComponent],
})
export class SignatureModule {}
