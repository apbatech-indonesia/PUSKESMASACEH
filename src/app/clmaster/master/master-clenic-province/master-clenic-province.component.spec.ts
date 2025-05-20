import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterClenicProvinceComponent } from './master-clenic-province.component';

describe('MasterClenicProvinceComponent', () => {
  let component: MasterClenicProvinceComponent;
  let fixture: ComponentFixture<MasterClenicProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterClenicProvinceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterClenicProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
