import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerilakuMerokokComponent } from './form-perilaku-merokok.component';

describe('FormPerilakuMerokokComponent', () => {
  let component: FormPerilakuMerokokComponent;
  let fixture: ComponentFixture<FormPerilakuMerokokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPerilakuMerokokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPerilakuMerokokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
