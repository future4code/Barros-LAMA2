import { GetBandIdOrName, TBandData } from "../../models/BandDataModel";

export interface BandRepository {
  getAllBandsData():Promise<TBandData[]>;
  bandInscription(input:TBandData):Promise<void>;
  getBandDetail(input:GetBandIdOrName):Promise<TBandData>;
};