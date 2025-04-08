import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TulisSatuSehatKmpComponent } from './tulis-satusehat-kmp.component';


describe('TulisSatuSehatKmpComponent', () => {
  let component: TulisSatuSehatKmpComponent;
  let fixture: ComponentFixture<TulisSatuSehatKmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TulisSatuSehatKmpComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TulisSatuSehatKmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
