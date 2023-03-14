import { IIdGenerator, ITokenGenerator } from "../ports";
import { BandRepository } from "./BandRepository";
import * as model from "../../models/BandDataModel";
import { CustomError } from "../../error/CustomError";
import { FuncsAlternats } from "../../services/funcsAlternats";

export class BandBusiness {
  constructor(
    private bandDatabase: BandRepository,
    private tokenGenerator: ITokenGenerator,
    private idGenerator: IIdGenerator
  ){};

  public bandInscription = async (input:model.BandInputDTO):Promise<void> => {
    try{
      
      
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //

  // public bandDetail = async (input:model.GetBandDetailInput):Promise<model.BandDataOutput> => {

  // };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //

  public getAllBands = async ():Promise<model.BandDataOutput[]> => {
    try{
      const bands:model.TBandData[] = await this.bandDatabase.getAllBandsData();
      
      const alter:model.BandDataOutput[] = new FuncsAlternats(undefined,bands).alterBandDateModel();
      return alter;
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
};