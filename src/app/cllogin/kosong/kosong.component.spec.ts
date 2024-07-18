import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KosongComponent } from './kosong.component';

describe('KosongComponent', () => {
  let component: KosongComponent;
  let fixture: ComponentFixture<KosongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KosongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KosongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
