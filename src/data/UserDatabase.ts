import { UserRepository } from "../business/userBusiness/UserRepository";
import { BaseDatabase } from "./BaseDatabase";
import { TablesNames } from "../models/TableNames";
import { GetAllUserOutput, TUserData } from "../models/UserModel";
import { CustomError } from "../error/CustomError";


export class UserDatabase extends BaseDatabase implements UserRepository{
  public createUser = async (input: TUserData):Promise<void> => {
    try { 
      await UserDatabase.connection(TablesNames.Table_User).insert(input);
    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public login = async (email: string):Promise<TUserData> => {
    try {
      const user = await UserDatabase.connection(TablesNames.Table_User).where("email",email);
      return user[0];
    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
  public getUsers = async ():Promise<GetAllUserOutput[]> => {
    try {
      const users =  await UserDatabase.connection(TablesNames.Table_User).select();
      return users;
    }catch(error:any){
      throw new CustomError(error.statusCode, error.message);
    }
  };
  // --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
}