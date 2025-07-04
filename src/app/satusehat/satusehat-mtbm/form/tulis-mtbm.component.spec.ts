import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TulisMtbmComponent } from './tulis-mtbm.component';


describe('TulisMtbmComponent', () => {
  let component: TulisMtbmComponent;
  let fixture: ComponentFixture<TulisMtbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TulisMtbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TulisMtbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
