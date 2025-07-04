import { Codeable } from "./observation-create.model";

export class Specimen {
  name: string;
  status: string;
  type: Codeable;
  collection: {
    method: Codeable;
    collectedDateTime: string;
  };
  receivedTime: string;
  request: { reference: string }[];

  constructor(params: {
    name: string;
    status: string;
    type: Codeable;
    collection: {
      method: Codeable;
      collectedDateTime: string;
    };
    receivedTime: string;
    request: { reference: string }[];
  }) {
    this.name = params.name;
    this.status = params.status;
    this.type = params.type;
    this.collection = params.collection;
    this.receivedTime = params.receivedTime;
    this.request = params.request;
  }
}

export class SpecimenData {
  encounterId: string;
  useCaseId: number;
  satusehatId: string;
  specimens: Specimen[];

  constructor(params: {
    encounterId: string;
    useCaseId: number;
    satusehatId: string;
    specimens: Specimen[];
  }) {
    this.encounterId = params.encounterId;
    this.useCaseId = params.useCaseId;
    this.satusehatId = params.satusehatId;
    this.specimens = params.specimens;
  }
}

export class SpecimenRequestData {
  data: SpecimenData;

  constructor(params: {
    encounterId: string;
    useCaseId: number;
    satusehatId: string;
    specimens: Specimen[];
  }) {
    this.data = new SpecimenData({
      encounterId: params.encounterId,
      useCaseId: params.useCaseId,
      satusehatId: params.satusehatId,
      specimens: params.specimens,
    });
  }
}
