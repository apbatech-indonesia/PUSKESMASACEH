import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHpvDnaComponent } from './form-hpv-dna.component';

describe('FormHpvDnaComponent', () => {
  let component: FormHpvDnaComponent;
  let fixture: ComponentFixture<FormHpvDnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHpvDnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHpvDnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
