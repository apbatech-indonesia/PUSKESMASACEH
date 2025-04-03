import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TulisSatuSehatIncComponent } from './tulis-satusehat-inc.component';


describe('TulisSatuSehatIncComponent', () => {
  let component: TulisSatuSehatIncComponent;
  let fixture: ComponentFixture<TulisSatuSehatIncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TulisSatuSehatIncComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TulisSatuSehatIncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
