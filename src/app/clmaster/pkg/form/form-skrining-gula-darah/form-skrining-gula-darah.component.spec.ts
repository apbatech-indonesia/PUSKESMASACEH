import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSkriningGulaDarahComponent } from './form-skrining-gula-darah.component';

describe('FormSkriningGulaDarahComponent', () => {
  let component: FormSkriningGulaDarahComponent;
  let fixture: ComponentFixture<FormSkriningGulaDarahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSkriningGulaDarahComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSkriningGulaDarahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
