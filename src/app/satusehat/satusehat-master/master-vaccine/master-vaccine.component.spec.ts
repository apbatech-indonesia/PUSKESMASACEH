import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterVaccineComponent } from './master-vaccine.component';


describe('MasterVaccineComponent', () => {
  let component: MasterVaccineComponent;
  let fixture: ComponentFixture<MasterVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterVaccineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
