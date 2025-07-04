import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkriningGigiKariesComponent } from './skrining-gigi-karies.component';

describe('SkriningGigiKariesComponent', () => {
  let component: SkriningGigiKariesComponent;
  let fixture: ComponentFixture<SkriningGigiKariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkriningGigiKariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkriningGigiKariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
