import { TShowOutput, TAllInfoShow, TShow } from "../../models/ShowDataModel";

export interface ShowRepository {
  createShow(input:TShow):Promise<void>;
  getShowsOnDay(day:string):Promise<TShowOutput[]>
  getAllInfoShows():Promise<TAllInfoShow[]>
}