export class Category {
  system: string;
  code: string;
  display: string;

  constructor(system: string, code: string, display: string) {
    this.system = system;
    this.code = code;
    this.display = display;
  }
}

export class ConditionData {
  system: string;
  code: string;
  display: string;

  constructor(system: string, code: string, display: string) {
    this.system = system;
    this.code = code;
    this.display = display;
  }
}

export class Condition {
  name: string;
  category: Category;
  clinicalStatus: Category;
  recordedDate: string;
  data: ConditionData[];
  note: any[];

  constructor(
    name: string,
    conditionCode: string,
    conditionDisplay: string,
    categoryCode: string,
    categoryDisplay: string
  ) {
    this.name = name;
    this.category = new Category(
      "http://terminology.hl7.org/CodeSystem/condition-category",
      categoryCode,
      categoryDisplay
    );
    this.clinicalStatus = new Category(
      "http://terminology.hl7.org/CodeSystem/condition-clinical",
      "active",
      "Active"
    );
    this.recordedDate = new Date().toISOString();
    this.data = [
      new ConditionData(
        "http://snomed.info/sct",
        conditionCode,
        conditionDisplay
      ),
    ];
    this.note = [];
  }
}

export class Request {
  encounterId: string;
  useCaseId: number;
  satusehatId: string;
  conditions: Condition[];

  constructor(
    encounterId: string,
    useCaseId: number,
    satusehatId: string,
    conditions: Condition[]
  ) {
    this.encounterId = encounterId;
    this.useCaseId = useCaseId;
    this.satusehatId = satusehatId;
    this.conditions = conditions;
  }
}

export class ConditionRequestData {
  data: Request;

  constructor(
    encounterId: string,
    useCaseId: number,
    satusehatId: string,
    conditions: Condition[]
  ) {
    this.data = new Request(encounterId, useCaseId, satusehatId, conditions);
  }
}