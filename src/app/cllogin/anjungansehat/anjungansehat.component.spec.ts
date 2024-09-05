import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  anjungansehatComponent } from './anjungansehat.component';

describe('anjunganComponent', () => {
  let component: anjungansehatComponent;
  let fixture: ComponentFixture<anjungansehatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ anjungansehatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(anjungansehatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
