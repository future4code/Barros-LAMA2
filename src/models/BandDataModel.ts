
export enum BAND_RESPONSIBLE {
  ADMIN = "ADMIN"
};

export interface BandInputDTO {
  name: string;
  musicGender: string;
  responsible: string;
  token: string;
};

export interface BandDataOutput {
  id: string;
  name: string;
  musicGender: string;
  responsible: string;
};

export interface GetBandIdOrName {
  id: string;
  name: string;
};


export interface TBandData {
  id: string;
  name: string;
  music_gender: string;
  responsible: string;
};