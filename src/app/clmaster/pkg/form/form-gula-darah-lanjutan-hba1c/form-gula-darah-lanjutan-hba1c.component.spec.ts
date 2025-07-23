import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGulaDarahLanjutanHba1cComponent } from './form-gula-darah-lanjutan-hba1c.component';

describe('FormGulaDarahLanjutanHba1cComponent', () => {
  let component: FormGulaDarahLanjutanHba1cComponent;
  let fixture: ComponentFixture<FormGulaDarahLanjutanHba1cComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGulaDarahLanjutanHba1cComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGulaDarahLanjutanHba1cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
