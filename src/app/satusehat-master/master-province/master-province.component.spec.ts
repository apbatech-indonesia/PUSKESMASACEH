import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterProvinceComponent } from './master-province.component';

describe('MasterProvinceComponent', () => {
  let component: MasterProvinceComponent;
  let fixture: ComponentFixture<MasterProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterProvinceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
