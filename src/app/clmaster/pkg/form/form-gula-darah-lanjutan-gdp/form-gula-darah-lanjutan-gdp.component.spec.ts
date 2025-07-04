import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGulaDarahLanjutanGdpComponent } from './form-gula-darah-lanjutan-gdp.component';

describe('FormGulaDarahLanjutanGdpComponent', () => {
  let component: FormGulaDarahLanjutanGdpComponent;
  let fixture: ComponentFixture<FormGulaDarahLanjutanGdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGulaDarahLanjutanGdpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGulaDarahLanjutanGdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
