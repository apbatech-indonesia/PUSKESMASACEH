import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTindakanComponent } from './master-tindakan.component';

describe('MasterTindakanComponent', () => {
  let component: MasterTindakanComponent;
  let fixture: ComponentFixture<MasterTindakanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterTindakanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTindakanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
