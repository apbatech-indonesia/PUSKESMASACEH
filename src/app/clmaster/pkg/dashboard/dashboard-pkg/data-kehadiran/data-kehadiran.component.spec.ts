import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataKehadiranComponent } from './data-kehadiran.component';

describe('DataKehadiranComponent', () => {
  let component: DataKehadiranComponent;
  let fixture: ComponentFixture<DataKehadiranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataKehadiranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataKehadiranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
