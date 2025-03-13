import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TulisSatuSehatPncComponent } from './tulis-satusehat-pnc.component';


describe('TulisSatuSehatPncComponent', () => {
  let component: TulisSatuSehatPncComponent;
  let fixture: ComponentFixture<TulisSatuSehatPncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TulisSatuSehatPncComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TulisSatuSehatPncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
