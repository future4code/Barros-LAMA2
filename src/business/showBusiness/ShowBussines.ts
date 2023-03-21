import { BandDatabase } from "../../data/BandDatabase";
import { ShowDatabase } from "../../data/ShowDatabase";
import { CustomError } from "../../error/CustomError";
import * as Err from "../../error/ShowErros";
import * as model from "../../models/ShowDataModel";
import { FuncsAlternats } from "../../services/funcsAlternats";
import { BandBusiness } from "../bandBusiness/BandBusiness";
import { IIdGenerator, ITokenGenerator } from "../ports";
import { ShowRepository } from "./ShowRepository";

export class ShowBusiness {
  constructor(
    private showDatabase: ShowRepository,
    private idGenerator: IIdGenerator
  ){};

  public createShow = async (input:model.ShowInputDTO):Promise<void> => {
    try{
      if(!input.bandId || !input.endTime || !input.startTime || !input.weekDay){
        throw new Err.InvalidCrateShowInput()
      };

      const bandDatabase = new BandDatabase();
      const findBand = await bandDatabase.getBandDetail({id:input.bandId,name:""});
      if(!findBand){
        throw new Err.InvalidBandIdInput(input.bandId)
      };

      const day = input.weekDay.toUpperCase();
      const showTimeIsValid = new FuncsAlternats().verifyShowhours(input.startTime, input.endTime);
      if(!showTimeIsValid){
        throw new Err.InvalidTimeShow()
      }else if(input.endTime === input.startTime){
        throw new Err.InvalidTimeEqual()
      }else if(input.endTime < input.startTime){
        throw new Err.InvalidEndTime()
      };

      if(day !== model.DAY_SHOWS.SEXTA 
        && day !== model.DAY_SHOWS.SABADO 
         && day !== model.DAY_SHOWS.DOMINGO){
        throw new Err.InvalidDayShowInput()
      };

      const shows = await this.showDatabase.getAllInfoShows();
      const showExist = shows.find((show:model.TAllInfoShow):boolean | undefined => {
        if(show.start_time === input.startTime && show.week_day === day){
          return true
        }else if(input.endTime > show.start_time && input.endTime < show.end_time
         && show.week_day === day){
          return true
        }else if(input.startTime > show.start_time && input.startTime < show.end_time
           && show.week_day === day){
          return true
        }else {
          return undefined
        }
      });
      if(showExist){
        throw new Err.InvalidShowExist(day,input.startTime)
      };

      const show:model.TShow = {
        id: this.idGenerator.generate(),
        week_day: day,
        start_time: input.startTime,
        end_time: input.endTime,
        band_id: input.bandId
      };
      await this.showDatabase.createShow(show);

    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    };
  };
  //  ------ ------- ----- ---- ---- -- ---- -//
  public getShowsOnDay = async (showDay:string):Promise<model.ShowOutputDTO[] | string> => {
    try{
      const day = showDay.toUpperCase()
      if(!day || day === ":day"){
        throw new Err.InvalidDayShowInput()
      }
      if(day !== model.DAY_SHOWS.SEXTA 
        && day !== model.DAY_SHOWS.SABADO 
         && day !== model.DAY_SHOWS.DOMINGO){
        throw new Err.InvalidDayShowInput()
      };
      const getShows = await this.showDatabase.getShowsOnDay(day);
      const shows = new FuncsAlternats().alterModelDataShowOnDay(getShows);
      console.log(getShows)
      if(!getShows || getShows.length < 1){
        return `Nenhum show Marcado para o ${day} ate o momento`
      }else {
        return shows;
      }

    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    };
  };
  //  ------ ------- ----- ---- ---- -- ---- -//
  public getAllInfoShows = async ():Promise<model.AllInfoShowOutputDTO[]> => {
    try{
      const showsInfo = await this.showDatabase.getAllInfoShows();
      const alter = new FuncsAlternats().alterAllShowDateModel(showsInfo);
      return alter;
    
    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    };
  };

}