import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkriningTuberkulosisComponent } from './skrining-tuberkulosis.component';

describe('SkriningTuberkulosisComponent', () => {
  let component: SkriningTuberkulosisComponent;
  let fixture: ComponentFixture<SkriningTuberkulosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkriningTuberkulosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkriningTuberkulosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
