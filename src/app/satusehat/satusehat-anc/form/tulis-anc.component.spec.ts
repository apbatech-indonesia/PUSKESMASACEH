import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TulisAncComponent } from './tulis-anc.component';

describe('TulisAncComponent', () => {
  let component: TulisAncComponent;
  let fixture: ComponentFixture<TulisAncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TulisAncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TulisAncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
