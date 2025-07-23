import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkriningGiziPertumbuhanComponent } from './skrining-gizi-pertumbuhan.component';

describe('SkriningGiziPertumbuhanComponent', () => {
  let component: SkriningGiziPertumbuhanComponent;
  let fixture: ComponentFixture<SkriningGiziPertumbuhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkriningGiziPertumbuhanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkriningGiziPertumbuhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
