import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MasterClenicSubDistrictComponent } from "./master-clenic-subdistrict.component";

describe("MasterClenicSubDistrictComponent", () => {
  let component: MasterClenicSubDistrictComponent;
  let fixture: ComponentFixture<MasterClenicSubDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterClenicSubDistrictComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterClenicSubDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
