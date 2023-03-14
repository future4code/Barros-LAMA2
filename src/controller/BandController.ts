import { Request,Response } from "express";
import { BandBusiness } from "../business/bandBusiness/BandBusiness";

export class BandController {
  constructor(private bandBusiness: BandBusiness){};

  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //


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