import { Request,Response } from "express";
import { BandBusiness } from "../business/bandBusiness/BandBusiness";
import { BandInputDTO, GetBandIdOrName } from "../models/BandDataModel";

export class BandController {
  constructor(private bandBusiness: BandBusiness){};
  public bandInscription = async (req:Request, res:Response):Promise<void> => {
    try{
      const input: BandInputDTO = {
        name: req.body.name,
        musicGender: req.body.musicGender,
        responsible: req.body.responsible,
        token: req.headers.authorization as string
      };
      
      const inscription = await this.bandBusiness.bandInscription(input);
      res.status(200).send({message: "Inscrição de banda feita com sucesso"});
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };

  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public getBandDetail = async (req:Request, res:Response):Promise<void> => {
    try{
      const input:GetBandIdOrName = {
        id:req.params.band,
        name: req.params.band
      }; 
      const bandDetail = await this.bandBusiness.getBandDetail(input);
      res.status(200).send(bandDetail);
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };

  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public getAllBands = async (req:Request, res:Response):Promise<void> => {
    try{
       const allBands = await this.bandBusiness.getAllBands(); 

      res.status(200).send(allBands);
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
};