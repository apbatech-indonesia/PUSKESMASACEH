import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkriningMandiriTuberkulosisBayiComponent } from './skrining-mandiri-tumbuh-kembang-tuberkulosis.component';

describe('SkriningMandiriTuberkulosisBayiComponent', () => {
  let component: SkriningMandiriTuberkulosisBayiComponent;
  let fixture: ComponentFixture<SkriningMandiriTuberkulosisBayiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkriningMandiriTuberkulosisBayiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkriningMandiriTuberkulosisBayiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
