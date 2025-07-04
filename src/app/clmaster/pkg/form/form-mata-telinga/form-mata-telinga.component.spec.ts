import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMataTelingaComponent } from './form-mata-telinga.component';

describe('FormMataTelingaComponent', () => {
  let component: FormMataTelingaComponent;
  let fixture: ComponentFixture<FormMataTelingaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMataTelingaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMataTelingaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
