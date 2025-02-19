import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TulisSatuSehatGiziComponent } from './tulis-satusehat-gizi.component';


describe('TulisSatuSehatGiziComponent', () => {
  let component: TulisSatuSehatGiziComponent;
  let fixture: ComponentFixture<TulisSatuSehatGiziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TulisSatuSehatGiziComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TulisSatuSehatGiziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
