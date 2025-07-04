import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterClenicDistrictComponent } from './master-clenic-district.component';

describe('MasterClenicDistrictComponent', () => {
  let component: MasterClenicDistrictComponent;
  let fixture: ComponentFixture<MasterClenicDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterClenicDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterClenicDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
