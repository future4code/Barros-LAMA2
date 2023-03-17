import express from "express";
import { BandBusiness } from "../business/bandBusiness/BandBusiness";
import { BandController } from "../controller/BandController";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";


export const bandRouter = express.Router();

const bandDatabase = new BandDatabase();
const bandBusiness = new BandBusiness(
  bandDatabase,
  new TokenGenerator,
  new IdGenerator
);
const bandController = new BandController(bandBusiness);

bandRouter.get("/all", (req,res) => bandController.getAllBands(req,res));

bandRouter.post("/detail", (req,res) => bandController.getBandDetail(req,res));
bandRouter.post("/inscription", (req,res) => bandController.bandInscription(req,res));