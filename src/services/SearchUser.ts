import { TUserData } from "../models/UserModel";
import * as model from "../models/SearchUsersModel"
import { EmailAlreadyCadasted, UserAlreadyCadasted } from "../error/UserErros";

export class SearchUser{
  constructor(
    private data:TUserData[]
  ){}

  public findForEmail =  ({email,name}:model.InputFindForEmail): model.SearchUserOutput => {
    let userExist:boolean = false;
    let error;
    const findUser = this.data.find( (user:TUserData):boolean=> {
      return user.email === email;
    });

    if(findUser && findUser !== undefined){
      if(findUser.name === name && findUser.email === email){
        userExist = true;
        error = new UserAlreadyCadasted()
      }else if(findUser.email === email){
        userExist = true;
        error = new EmailAlreadyCadasted()
      }
    };
    return { user:findUser, userExist, error }
  };
  
}