import { CustomError } from "../error/CustomError";
import { TUserData } from "./UserModel";

export interface SearchUserOutput {
  user: TUserData | undefined;
  userExist: boolean;
  error: CustomError | undefined
};
export interface InputFindForEmail {
  email:string;
  name?:string
};