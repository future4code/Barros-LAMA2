import { ShowRepository } from "../business/showBusiness/ShowRepository";
import { CustomError } from "../error/CustomError";
import { TShowOutput, TAllInfoShow, TShow } from "../models/ShowDataModel";
import { TablesNames } from "../models/TableNames";
import { BaseDatabase } from "./mySql/BaseDatabase";

export class ShowDatabase extends BaseDatabase implements ShowRepository {
  
  public createShow = async (input: TShow): Promise<void> => {
    try{
      await ShowDatabase.connection.insert(input).into(TablesNames.Table_Show)
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public getShowsOnDay = async (day: string): Promise<TShowOutput[]> => {
    try{
      const shows = await ShowDatabase.connection(TablesNames.Table_Band)
      .select("name","music_gender")
      .innerJoin(TablesNames.Table_Show,"band_id","Project_Lama_Bands.id")
      .where("week_day",day).orderBy("start_time","asc");
      return shows;

    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public getAllInfoShows = async ():Promise<TAllInfoShow[]> => {
    try{
      const shows = await ShowDatabase.connection(TablesNames.Table_Show)
      .select("Project_Lama_Shows.id", "week_day", "start_time", "end_time", "band_id", "Project_Lama_Bands.name")
        .innerJoin(`${TablesNames.Table_Band}`,"Project_Lama_Bands.id","band_id");
      return shows;

    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
}
