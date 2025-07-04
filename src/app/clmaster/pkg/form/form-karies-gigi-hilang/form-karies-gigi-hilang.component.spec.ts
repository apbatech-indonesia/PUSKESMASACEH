import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKariesGigiHilangComponent } from './form-karies-gigi-hilang.component';

describe('FormKariesGigiHilangComponent', () => {
  let component: FormKariesGigiHilangComponent;
  let fixture: ComponentFixture<FormKariesGigiHilangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormKariesGigiHilangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKariesGigiHilangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
