import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGiziPriaComponent } from './form-gizi-pria.component';

describe('FormGiziPriaComponent', () => {
  let component: FormGiziPriaComponent;
  let fixture: ComponentFixture<FormGiziPriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGiziPriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGiziPriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
