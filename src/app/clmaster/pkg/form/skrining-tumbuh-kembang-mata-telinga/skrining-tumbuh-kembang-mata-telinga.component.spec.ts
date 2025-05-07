import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkriningTumbuhKembangMataTelinga } from './skrining-tumbuh-kembang-mata-telinga.component';

describe('SkriningTumbuhKembangMataTelinga', () => {
  let component: SkriningTumbuhKembangMataTelinga;
  let fixture: ComponentFixture<SkriningTumbuhKembangMataTelinga>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkriningTumbuhKembangMataTelinga ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkriningTumbuhKembangMataTelinga);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
