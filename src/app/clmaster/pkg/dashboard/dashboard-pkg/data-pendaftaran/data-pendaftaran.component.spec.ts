import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPendaftaranComponent } from './data-pendaftaran.component';

describe('DataPendaftaranComponent', () => {
  let component: DataPendaftaranComponent;
  let fixture: ComponentFixture<DataPendaftaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPendaftaranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPendaftaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
