import { IIdGenerator, ITokenGenerator } from "../ports";
import { BandRepository } from "./BandRepository";
import * as model from "../../models/BandDataModel";
import { CustomError } from "../../error/CustomError";
import { FuncsAlternats } from "../../services/funcsAlternats";
import * as Err from "../../error/BandErros";
import { UserTypeUnauthorizedADM} from "../../error/UserErros";

export class BandBusiness {
  constructor(
    private bandDatabase: BandRepository,
    private tokenGenerator: ITokenGenerator,
    private idGenerator: IIdGenerator
  ){};

  public bandInscription = async (input:model.BandInputDTO):Promise<void> => {
    try{
      const userToken = this.tokenGenerator.getTokenData(input.token);
      
      if(!userToken || userToken.role.toUpperCase() !== model.BAND_RESPONSIBLE.ADMIN){
        throw new UserTypeUnauthorizedADM()
      }else if(!input.name || !input.responsible || !input.musicGender){
        throw new Err.InvalidBandIncriptionInput()
      }else if(
        typeof(input.name) !== "string" ||
        typeof(input.musicGender) !== "string" || typeof(input.responsible) !== "string"){
        throw new Err.InvalidBandIncriptionInput()
      };

      const bandExists = await this.bandDatabase.getBandDetail({id:"",name:input.name});
      if(bandExists){
        throw new Err.InvalidNameBand(input.name)
      }

      const inscription:model.TBandData = {
        id: this.idGenerator.generate(),
        name: input.name,
        music_gender: input.musicGender,
        responsible: input.responsible
      };
      await this.bandDatabase.bandInscription(inscription)
      
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //

  public getBandDetail = async (input:model.GetBandIdOrName):Promise<model.BandDataOutput> => {
    try{
      const {id, name} = input;

      if(!id && !name){
        throw new Err.InvalidBandDetailInput()
      };

      const dataBand = await this.bandDatabase.getBandDetail(input)
      if(!dataBand){
        throw new Err.BandNotFound()
      };

      const alterModelBand:model.BandDataOutput[] = new FuncsAlternats(undefined,[dataBand]).alterBandDateModel();
      return  alterModelBand[0]

    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
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