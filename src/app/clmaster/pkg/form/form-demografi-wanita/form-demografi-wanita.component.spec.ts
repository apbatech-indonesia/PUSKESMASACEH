import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDemografiWanitaComponent } from './form-demografi-wanita.component';

describe('FormDemografiWanitaComponent', () => {
  let component: FormDemografiWanitaComponent;
  let fixture: ComponentFixture<FormDemografiWanitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDemografiWanitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDemografiWanitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
