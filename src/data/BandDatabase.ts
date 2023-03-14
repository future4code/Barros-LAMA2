import { BandRepository } from "../business/bandBusiness/BandRepository";
import { CustomError } from "../error/CustomError";
import { GetBandIdOrName, TBandData } from "../models/BandDataModel";
import { TablesNames } from "../models/TableNames";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase implements BandRepository{
  public bandInscription = async (input: TBandData): Promise<void> => {
    try { 
      await BandDatabase.connection(TablesNames.Table_Band).insert(input)
    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public getBandDetail = async ({id,name}:GetBandIdOrName): Promise<TBandData> => {
    try { 
      const band:TBandData[] = await BandDatabase.connection(TablesNames.Table_Band).where("id",id).orWhere("name",name);  
      return band[0];
    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public getAllBandsData = async (): Promise<TBandData[]> => {
    try { 
      const allBands:TBandData[] = await BandDatabase.connection(TablesNames.Table_Band).select();
      return allBands; 
    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    }
  }

}