import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormAssessmentResikoJatuhComponent } from "./form-assessment-resiko-jatuh.component";

describe("FormAssessmentResikoJatuhComponent", () => {
  let component: FormAssessmentResikoJatuhComponent;
  let fixture: ComponentFixture<FormAssessmentResikoJatuhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAssessmentResikoJatuhComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssessmentResikoJatuhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
