import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProfilLipidComponent } from './form-profil-lipid.component';

describe('FormProfilLipidComponent', () => {
  let component: FormProfilLipidComponent;
  let fixture: ComponentFixture<FormProfilLipidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProfilLipidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProfilLipidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
