import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSpecimenComponent } from './master-specimen.component';

describe('MasterSpecimenComponent', () => {
  let component: MasterSpecimenComponent;
  let fixture: ComponentFixture<MasterSpecimenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterSpecimenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSpecimenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
