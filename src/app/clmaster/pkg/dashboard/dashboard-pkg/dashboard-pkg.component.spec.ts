import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPkgComponent } from './dashboard-pkg.component';

describe('DashboardPkgComponent', () => {
  let component: DashboardPkgComponent;
  let fixture: ComponentFixture<DashboardPkgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPkgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPkgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
