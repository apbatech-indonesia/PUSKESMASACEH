export class BodySite {
  coding: Codeable[];

  constructor(coding: Codeable[]) {
    this.coding = coding;
  }
}

export class Codeable {
  system: string;
  code: string;
  display: string;

  constructor(system: string, code: string, display: string) {
    this.system = system;
    this.code = code;
    this.display = display;
  }
}

export class ValueQuantity {
  value: string;
  unit: string;
  system: string;
  code: string;

  constructor(value: string, unit: string, system: string, code: string) {
    this.value = value;
    this.unit = unit;
    this.system = system;
    this.code = code;
  }
}

export class Interpretation {
  coding: Codeable[];
  text: string;

  constructor(coding: Codeable[], text: string) {
    this.coding = coding;
    this.text = text;
  }
}

export class Result {
  value: number;
  unit: string;
  system: string;
  code: string;

  constructor(value: number, unit: string, system: string, code: string) {
    this.value = value;
    this.unit = unit;
    this.system = system;
    this.code = code;
  }
}

export class ObservationData {
  code: Codeable;
  result?: Result;
  resultBoolean?: boolean;
  valueInteger?: number;
  valueQuantity?: ValueQuantity;
  valueCodeableConcept?: Codeable;

  constructor({
    code,
    result,
    resultBoolean,
    valueInteger,
    valueQuantity,
    valueCodeableConcept,
  }: {
    code: Codeable;
    result?: Result;
    resultBoolean?: boolean;
    valueInteger?: number;
    valueQuantity?: ValueQuantity;
    valueCodeableConcept?: Codeable;
  }) {
    this.code = code;
    this.valueInteger = valueInteger;
    this.result = result;
    this.resultBoolean = resultBoolean;
    this.valueQuantity = valueQuantity;
    this.valueCodeableConcept = valueCodeableConcept;
  }
}

export class Observation {
  name: string;
  category: Codeable;
  data: ObservationData[];
  effectiveDateTime: string;
  issued: string;
  valueInteger: number;
  interpretation?: Interpretation;
  bodySite?: BodySite;

  constructor(params: {
    observationName: string;
    category?: Codeable;
    code?: Codeable;
    valueCodeableConcept?: Codeable;
    valueQuantity?: ValueQuantity;
    result?: Result;
    resultBoolean?: boolean;
    valueInteger?: number;
    interpretation?: Interpretation;
    bodySite?: BodySite;
  }) {
    this.name = params.observationName;
    this.category = params.category;
    this.effectiveDateTime = new Date().toISOString();
    this.issued = this.effectiveDateTime;
    this.interpretation = params.interpretation;
    this.bodySite = params.bodySite;
    this.data = [
      new ObservationData({
        code: params.code,
        valueCodeableConcept: params.valueCodeableConcept,
        valueQuantity: params.valueQuantity,
        result: params.result,
        resultBoolean: params.resultBoolean,
        valueInteger: params.valueInteger,
      }),
    ];
  }
}

export class ObservationRequest {
  encounterId: string;
  useCaseId: number;
  satusehatId: string;
  observations: Observation[];

  constructor(
    encounterId: string,
    useCaseId: number,
    satusehatId: string,
    observations: Observation[]
  ) {
    this.encounterId = encounterId;
    this.useCaseId = useCaseId;
    this.satusehatId = satusehatId;
    this.observations = observations;
  }
}

export class ObservationRequestData {
  data: ObservationRequest;

  constructor(
    encounterId: string,
    useCaseId: number,
    satusehatId: string,
    observations: Observation[]
  ) {
    this.data = new ObservationRequest(
      encounterId,
      useCaseId,
      satusehatId,
      observations
    );
  }
}
