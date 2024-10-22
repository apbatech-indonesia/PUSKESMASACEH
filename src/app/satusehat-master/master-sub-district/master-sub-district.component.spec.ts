import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSubDistrictComponent } from './master-sub-district.component';

describe('MasterSubDistrictComponent', () => {
  let component: MasterSubDistrictComponent;
  let fixture: ComponentFixture<MasterSubDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterSubDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSubDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
