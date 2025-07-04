import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFungsiGinjalComponent } from './form-fungsi-ginjal.component';

describe('FormFungsiGinjalComponent', () => {
  let component: FormFungsiGinjalComponent;
  let fixture: ComponentFixture<FormFungsiGinjalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFungsiGinjalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFungsiGinjalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
