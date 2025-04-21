import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRapidTestCapinComponent } from './form-rapid-test-capin.component';

describe('FormRapidTestCapinComponent', () => {
  let component: FormRapidTestCapinComponent;
  let fixture: ComponentFixture<FormRapidTestCapinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRapidTestCapinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRapidTestCapinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
