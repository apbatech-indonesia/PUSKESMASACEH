import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHasilEkgComponent } from './form-hasil-ekg.component';

describe('FormHasilEkgComponent', () => {
  let component: FormHasilEkgComponent;
  let fixture: ComponentFixture<FormHasilEkgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHasilEkgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHasilEkgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
