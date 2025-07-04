import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDemografiPriaComponent } from './form-demografi-pria.component';

describe('FormDemografiPriaComponent', () => {
  let component: FormDemografiPriaComponent;
  let fixture: ComponentFixture<FormDemografiPriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDemografiPriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDemografiPriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
