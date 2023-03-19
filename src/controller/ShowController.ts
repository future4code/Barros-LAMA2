import { Request,Response } from "express";
import { ShowBusiness } from "../business/showBusiness/ShowBussines";
import * as model from "../models/ShowDataModel"

export class ShowController {
  constructor(private showBusiness: ShowBusiness){};
  
  public createShow = async (req:Request, res:Response):Promise<void> => {
    try{
      const input:model.ShowInputDTO = {
        weekDay: req.body.weekDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        bandId: req.body.bandId
      };
      await this.showBusiness.createShow(input);

      res.status(201).send({ message: "Show Criado com Sucesso!",});
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public getShowsOnDay = async (req:Request, res:Response):Promise<void> => {
    try{
      const day = req.params.day as string;

      const shows = await this.showBusiness.getShowsOnDay(day);

      res.status(200).send(shows);
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public getAllInfoShow = async (req:Request, res:Response):Promise<void> => {
    try{

      const shows = await this.showBusiness.getAllInfoShows();

      res.status(200).send(shows);
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
}