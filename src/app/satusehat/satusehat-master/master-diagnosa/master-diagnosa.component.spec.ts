import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDiagnosaComponent } from './master-diagnosa.component';

describe('MasterDiagnosaComponent', () => {
  let component: MasterDiagnosaComponent;
  let fixture: ComponentFixture<MasterDiagnosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDiagnosaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDiagnosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
