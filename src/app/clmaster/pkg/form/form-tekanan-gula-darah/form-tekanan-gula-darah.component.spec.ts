import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTekananGulaDarahComponent } from './form-tekanan-gula-darah.component';

describe('FormTekananGulaDarahComponent', () => {
  let component: FormTekananGulaDarahComponent;
  let fixture: ComponentFixture<FormTekananGulaDarahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTekananGulaDarahComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTekananGulaDarahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
