import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGiziComponent } from './form-gizi.component';

describe('FormGiziComponent', () => {
  let component: FormGiziComponent;
  let fixture: ComponentFixture<FormGiziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGiziComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGiziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
