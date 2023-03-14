import { Request,Response } from "express";
import { UserBusiness } from "../business/userBusiness/UserBusiness";
import { InputLoginDTO, TUserData, UserInputDTO } from "../models/UserModel";

export class UserController {
  constructor(private userBusines: UserBusiness){};
  
  public createUser = async (req:Request, res:Response):Promise<void> => {
    try{
      const input:UserInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role:req.body.role
      };
      const token:string = await this.userBusines.createUser(input);

      res.status(201).send({ message: "Usuário cadastrado com sucesso!", token});
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public login = async (req:Request, res:Response):Promise<void> => {
    try{
      const inputLogin:InputLoginDTO = {
        email: req.body.email,
        password:req.body.password
      };

      const token:string = await this.userBusines.login(inputLogin);

      res.status(200).send({message: "Online", token});
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public getUsers = async (req:Request, res:Response):Promise<void> => {
    try{
      const allUsers:TUserData[] | string = await this.userBusines.getAllUsers();

      res.status(200).send(allUsers);
    }catch(error:any){
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  };
}