import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SkriningTumbuhKembangPerkembanganComponent } from "./skrining-tumbuh-kembang-perkembangan.component";

describe("SkriningTumbuhKembangPerkembanganComponent", () => {
  let component: SkriningTumbuhKembangPerkembanganComponent;
  let fixture: ComponentFixture<SkriningTumbuhKembangPerkembanganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkriningTumbuhKembangPerkembanganComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      SkriningTumbuhKembangPerkembanganComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
