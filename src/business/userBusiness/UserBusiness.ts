import { CustomError } from "../../error/CustomError";
import * as Err from "../../error/UserErros";
import * as Model from "../../models/UserModel";
import { FuncsAlternats } from "../../services/funcsAlternats";
import { IIdGenerator, ITokenGenerator } from "../ports";
import { UserRepository } from "./UserRepository";

export class UserBusiness {
  constructor(
    private userDatabase: UserRepository,
    private tokenGenerator: ITokenGenerator,
    private idGenerator: IIdGenerator
  ){}
 
  public createUser = async (input:Model.UserInputDTO):Promise<string> => {
    try{
      const {name, email, password, role} = input;

      if(!name || !email || !password || !role){
        throw new Err.InvalidCreateUserInput()
      }else if(role.toUpperCase() !== Model.USER_TYPE.ADMIN && role.toUpperCase() !== Model.USER_TYPE.NORMAL){
        throw new Err.InvalidUserType()
      }else if(
        typeof(name) !== "string" ||
        typeof(email) !== "string" || typeof(password) !== "string"){
        throw new Err.InvalidCreateUserInput()
      };

      if(!email.includes("@") || !email.includes(".com")){
        throw new Err.InvalidInputEmail()
      }else if(password.length < 8){
        throw new Err.InvalidInputPassword()
      };

      if(name.length < 5){
        throw new CustomError(409,"O nome deve conter ao menos 5 caracteres")
      };

      const users:Model.TUserData[] = await this.userDatabase.getUsers();
      const findUser = new FuncsAlternats().findForEmail(users,{email,name});
      if(findUser.userExist && findUser.error){
        throw findUser.error
      };

      const id = this.idGenerator.generate();
      const newUser = {
        id, ...input
      };
      await this.userDatabase.createUser(newUser);
      
      const token = this.tokenGenerator.generateToken({id:newUser.id, role});
      return token
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //

  public login = async (loginData:Model.InputLoginDTO):Promise<string> => {
    try{
      const {email, password} = loginData;
      if(!email || !password){
        throw new Err.InvalidInputLogin()
      }else if(!email.includes("@") || !email.includes(".com")){
        throw new Err.InvalidInputEmail()
      };

      const user:Model.TUserData = await this.userDatabase.login(email);
      
      if(!user){
        throw new Err.UserNotFound()
      }else if(user.password !== password){
        throw new Err.InvalidPasswordLogin()
      };

      const token = this.tokenGenerator.generateToken({id:user.id , role:user.role});
      return token;
      
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //

  public getAllUsers = async ():Promise<Model.TUserData[] | string> => {
    try{
      let result:Model.TUserData[] | string;
      const users =  await this.userDatabase.getUsers(); 
      [ users.length > 0 ? result = users : result = "Nenhum usuário cadastrado até o momento!"]
      return result;
    }catch (error:any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}