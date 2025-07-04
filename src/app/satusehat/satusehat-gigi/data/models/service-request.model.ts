import { Codeable } from "./observation-create.model";
export class Encounter {
  reference: string;
  display: string;

  constructor(reference: string, display: string) {
    this.reference = reference;
    this.display = display;
  }
}

export class ServiceRequestDataItem {
  system?: string;
  code?: string;
  display?: string;
  text?: string;

  constructor(params: {
    system?: string;
    code?: string;
    display?: string;
    text?: string;
  }) {
    this.system = params.system;
    this.code = params.code;
    this.display = params.display;
    this.text = params.text;
  }
}

export class Coding {
  coding: Codeable[];

  constructor(system: string, code: string, display: string) {
    this.coding = [new Codeable(system, code, display)];
  }
}

export class ServiceRequest {
  name: string;
  status: string;
  category: Coding[];
  patientInstruction: string;
  intent: string;
  priority: string;
  occurrenceDateTime: string;
  authoredOn: string;
  encounter: Encounter;
  data: ServiceRequestDataItem[];
  reasonCode: { text: string }[];
  note: string;

  constructor(params: {
    name: string;
    category: Coding[];
    patientInstruction: string;
    status: string;
    intent: string;
    priority: string;
    occurrenceDateTime: string;
    authoredOn: string;
    encounter: { reference: string; display: string };
    data: ServiceRequestDataItem[];
    reasonCode: { text: string }[];
    note: string;
  }) {
    this.name = params.name;
    this.status = params.status;
    this.category = params.category;
    this.patientInstruction = params.patientInstruction;
    this.intent = params.intent;
    this.priority = params.priority;
    this.occurrenceDateTime = params.occurrenceDateTime;
    this.authoredOn = params.authoredOn;
    this.encounter = params.encounter;
    this.data = params.data;
    this.reasonCode = params.reasonCode;
    this.note = params.note;
  }
}

export class ServiceRequestData {
  encounterId: string;
  useCaseId: number;
  satusehatId: string;
  serviceRequests: ServiceRequest[];

  constructor(params: {
    encounterId: string;
    useCaseId: number;
    satusehatId: string;
    serviceRequests: ServiceRequest[];
  }) {
    this.encounterId = params.encounterId;
    this.useCaseId = params.useCaseId;
    this.satusehatId = params.satusehatId;
    this.serviceRequests = params.serviceRequests;
  }
}

export class ServiceRequestDataPayload {
  data: ServiceRequestData;

  constructor(params: {
    encounterId: string;
    useCaseId: number;
    satusehatId: string;
    serviceRequests: ServiceRequest[];
  }) {
    this.data = new ServiceRequestData({
      encounterId: params.encounterId,
      useCaseId: params.useCaseId,
      satusehatId: params.satusehatId,
      serviceRequests: params.serviceRequests,
    });
  }
}
