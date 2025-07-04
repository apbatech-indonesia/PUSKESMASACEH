import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TulisMtbsComponent } from '../../satusehat-mtbs/form/tulis-mtbs.component';


describe('TulisMtbsComponent', () => {
  let component: TulisMtbsComponent;
  let fixture: ComponentFixture<TulisMtbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TulisMtbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TulisMtbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
