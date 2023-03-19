import express from "express";
import { UserBusiness } from "../business/userBusiness/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";


export const userRouter = express.Router();

const userDatabase = new UserDatabase();
const userBusines = new UserBusiness(
  userDatabase, 
  new TokenGenerator(),
  new IdGenerator()
);
const userController = new UserController(userBusines);

userRouter.get("/all", (req,res) => userController.getUsers(req,res));

userRouter.post("/create", (req,res) => userController.createUser(req,res));
userRouter.post("/login", (req,res) => userController.login(req,res));