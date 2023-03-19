import express from "express";
import { ShowBusiness } from "../business/showBusiness/ShowBussines";
import { ShowController } from "../controller/ShowController";
import { ShowDatabase } from "../data/ShowDatabase";
import { IdGenerator } from "../services/IdGenerator";


export const showRouter = express.Router();

const showDatabase = new ShowDatabase();
const showBusiness = new ShowBusiness(
  showDatabase,
  new IdGenerator()
);
const showController = new ShowController(showBusiness);

showRouter.post("/create",(req,res) => showController.createShow(req,res));
showRouter.get("/day/:day",(req,res) => showController.getShowsOnDay(req,res));
showRouter.get("/all",(req,res) => showController.getAllInfoShow(req,res));