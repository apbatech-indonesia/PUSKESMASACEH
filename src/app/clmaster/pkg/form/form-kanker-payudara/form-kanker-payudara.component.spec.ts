import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKankerPayudaraComponent } from './form-kanker-payudara.component';

describe('FormKankerPayudaraComponent', () => {
  let component: FormKankerPayudaraComponent;
  let fixture: ComponentFixture<FormKankerPayudaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormKankerPayudaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKankerPayudaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
