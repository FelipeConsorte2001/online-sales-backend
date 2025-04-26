import { returnCodeExternal } from './returnCodeExternal.dto';

export class returnCode {
  cep: string;
  publicPlace: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
  ddd: string;
  cityId?: number;
  stateId?: number;

  constructor(
    returnCode: returnCodeExternal,
    cityId?: number,
    stateId?: number,
  ) {
    this.cep = returnCode.cep;
    this.publicPlace = returnCode.logradouro;
    this.complement = returnCode.complemento;
    this.neighborhood = returnCode.bairro;
    this.city = returnCode.localidade;
    this.uf = returnCode.uf;
    this.ddd = returnCode.ddd;
    this.cityId = cityId;
    this.stateId = stateId;
  }
}
