import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginclComponent } from './logincl.component';

describe('LoginclComponent', () => {
  let component: LoginclComponent;
  let fixture: ComponentFixture<LoginclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
