import { Codeable } from "./observation-create.model";

export class Procedure {
  name: string;
  status: string;
  category: Codeable;
  data: Codeable[];
  reasonCode: Codeable;
  note: string;
  performedDateTime: string;

  constructor(params: {
    name: string;
    category: Codeable;
    data: Codeable[];
    reasonCode: Codeable;
    note: string;
  }) {
    this.name = params.name;
    this.status = "completed";
    this.category = params.category;
    this.performedDateTime = new Date().toISOString();
    this.data = params.data;
    this.reasonCode = params.reasonCode;
    this.note = params.note;
  }
}

export class ProcedureData {
  encounterId: string;
  useCaseId: number;
  satusehatId: string;
  procedures: Procedure[];

  constructor(params: {
    encounterId: string;
    useCaseId: number;
    satusehatId: string;
    procedures: Procedure[];
  }) {
    this.encounterId = params.encounterId;
    this.useCaseId = params.useCaseId;
    this.satusehatId = params.satusehatId;
    this.procedures = params.procedures;
  }
}

export class ProcedureRequestData {
  data: ProcedureData;

  constructor(params: {
    encounterId: string;
    useCaseId: number;
    satusehatId: string;
    procedures: Procedure[];
  }) {
    this.data = new ProcedureData({
      encounterId: params.encounterId,
      useCaseId: params.useCaseId,
      satusehatId: params.satusehatId,
      procedures: params.procedures,
    });
  }
}
