import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKankerUsusComponent } from './form-kanker-usus.component';

describe('FormKankerUsusComponent', () => {
  let component: FormKankerUsusComponent;
  let fixture: ComponentFixture<FormKankerUsusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormKankerUsusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKankerUsusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
