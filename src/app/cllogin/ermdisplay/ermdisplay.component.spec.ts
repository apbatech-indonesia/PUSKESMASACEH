import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ermdisplayComponent } from './ermdisplay.component';

describe('ermdisplayComponent', () => {
  let component: ermdisplayComponent;
  let fixture: ComponentFixture<ermdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ermdisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ermdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
