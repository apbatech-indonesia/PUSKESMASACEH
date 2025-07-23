import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRisikoJantungStrokeComponent } from './form-risiko-jantung-stroke.component';

describe('FormRisikoJantungStrokeComponent', () => {
  let component: FormRisikoJantungStrokeComponent;
  let fixture: ComponentFixture<FormRisikoJantungStrokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRisikoJantungStrokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRisikoJantungStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
