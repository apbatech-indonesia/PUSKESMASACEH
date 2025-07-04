import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TulisSkriningPtmComponent } from './tulis-skrining-ptm.component';


describe('TulisSkriningPtmComponent', () => {
  let component: TulisSkriningPtmComponent;
  let fixture: ComponentFixture<TulisSkriningPtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TulisSkriningPtmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TulisSkriningPtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
