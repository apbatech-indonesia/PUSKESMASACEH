import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MasterClenicDokterComponent } from "./master-clenic-dokter.component";

describe("MasterClenicDokterComponent", () => {
  let component: MasterClenicDokterComponent;
  let fixture: ComponentFixture<MasterClenicDokterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterClenicDokterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterClenicDokterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
