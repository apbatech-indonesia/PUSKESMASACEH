import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFotoThoraxComponent } from './form-foto-thorax.component';

describe('FormFotoThoraxComponent', () => {
  let component: FormFotoThoraxComponent;
  let fixture: ComponentFixture<FormFotoThoraxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFotoThoraxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFotoThoraxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
