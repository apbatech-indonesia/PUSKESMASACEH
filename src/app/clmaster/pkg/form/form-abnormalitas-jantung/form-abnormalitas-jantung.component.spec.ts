import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAbnormalitasJantungComponent } from './form-abnormalitas-jantung.component';

describe('FormAbnormalitasJantungComponent', () => {
  let component: FormAbnormalitasJantungComponent;
  let fixture: ComponentFixture<FormAbnormalitasJantungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAbnormalitasJantungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAbnormalitasJantungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
