import { TUserData } from "../../models/UserModel";

export interface UserRepository {
  getUsers():Promise<TUserData[]>;
  createUser(input:TUserData):Promise<void>;
  login(email:string):Promise<TUserData>;
};