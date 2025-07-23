import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGiziWanitaComponent } from './form-gizi-wanita.component';

describe('FormGiziWanitaComponent', () => {
  let component: FormGiziWanitaComponent;
  let fixture: ComponentFixture<FormGiziWanitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGiziWanitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGiziWanitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
