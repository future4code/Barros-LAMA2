import { GetAllUserOutput, TUserData } from "../../models/UserModel";

export interface UserRepository {
  getUsers():Promise<GetAllUserOutput[]>;
  createUser(input:TUserData):Promise<void>;
  login(email:string):Promise<TUserData>;
};