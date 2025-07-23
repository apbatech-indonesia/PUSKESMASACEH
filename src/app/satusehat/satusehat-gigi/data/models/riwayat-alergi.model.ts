// src/app/models/allergy-intolerance.model.ts

import { Coding } from "./service-request.model";

// Class untuk Clinical Status
export class ClinicalStatus {
  system: string;
  code: string;
  display: string;

  constructor(system: string, code: string, display: string) {
    this.system = system;
    this.code = code;
    this.display = display;
  }
}

// Class untuk data alergi
export class AllergyData {
  system: string;
  code: string;
  display: string;

  constructor(system: string, code: string, display: string) {
    this.system = system;
    this.code = code;
    this.display = display;
  }
}

// Class utama untuk Allergy Intolerance
export class AllergyIntolerance {
  name: string;
  category: string[];
  clinicalStatus: ClinicalStatus;
  verificationStatus: Coding;
  recordedDate: string;
  data: AllergyData[];

  constructor(name: string, allergy: string) {
    this.name = name;
    this.category = ["medication"];
    this.clinicalStatus = new ClinicalStatus(
      "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
      "active",
      "Active"
    );
    this.verificationStatus = new Coding(
      "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
      "confirmed",
      "Confirmed"
    );
    this.recordedDate = new Date().toISOString();
    this.data = [
      new AllergyData("http://sys-ids.kemkes.go.id/kfa", "91000299", allergy),
    ];
  }
}

// Class utama untuk Request Data
export class AllergyIntoleranceRequest {
  encounterId: string;
  useCaseId: number;
  satusehatId: string;
  allergyIntolerances: AllergyIntolerance[];

  constructor(
    encounterId: string,
    useCaseId: number,
    satusehatId: string,
    allergyIntolerances: AllergyIntolerance[]
  ) {
    this.encounterId = encounterId;
    this.useCaseId = useCaseId;
    this.satusehatId = satusehatId;
    this.allergyIntolerances = allergyIntolerances;
  }
}

// Payload JSON utama
export class AllergyIntoleranceRequestData {
  data: AllergyIntoleranceRequest;

  constructor(
    encounterId: string,
    useCaseId: number,
    satusehatId: string,
    allergyIntolerances: AllergyIntolerance[]
  ) {
    this.data = new AllergyIntoleranceRequest(
      encounterId,
      useCaseId,
      satusehatId,
      allergyIntolerances
    );
  }
}
