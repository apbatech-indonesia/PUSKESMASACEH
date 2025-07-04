import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterClenicCityComponent } from './master-clenic-city.component';

describe('MasterClenicCityComponent', () => {
  let component: MasterClenicCityComponent;
  let fixture: ComponentFixture<MasterClenicCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterClenicCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterClenicCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
