import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterKfaComponent } from './master-kfa.component';

describe('MasterKfaComponent', () => {
  let component: MasterKfaComponent;
  let fixture: ComponentFixture<MasterKfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterKfaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterKfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
