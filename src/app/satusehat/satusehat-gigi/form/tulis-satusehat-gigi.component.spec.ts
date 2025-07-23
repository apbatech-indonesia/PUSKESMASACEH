import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TulisSatuSehatGigiComponent } from './tulis-satusehat-gigi.component';


describe('TulisSatuSehatGigiComponent', () => {
  let component: TulisSatuSehatGigiComponent;
  let fixture: ComponentFixture<TulisSatuSehatGigiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TulisSatuSehatGigiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TulisSatuSehatGigiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
