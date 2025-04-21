import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAktivitasFisikComponent } from './form-aktivitas-fisik.component';

describe('FormAktivitasFisikComponent', () => {
  let component: FormAktivitasFisikComponent;
  let fixture: ComponentFixture<FormAktivitasFisikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAktivitasFisikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAktivitasFisikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
