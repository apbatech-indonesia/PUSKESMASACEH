import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  anjunganComponent } from './anjungan.component';

describe('anjunganComponent', () => {
  let component: anjunganComponent;
  let fixture: ComponentFixture<anjunganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ anjunganComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(anjunganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
