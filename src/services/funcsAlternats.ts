import { TUserData } from "../models/UserModel";
import * as model from "../models/servicesModel/SearchUsersModel"
import { EmailAlreadyCadasted, UserAlreadyCadasted } from "../error/UserErros";
import { BandDataOutput, TBandData } from "../models/BandDataModel";

export class FuncsAlternats{
  constructor(
    private userData?:TUserData[],
    private bandData?:TBandData[]
  ){};

  // utilizo essa função no endpoint de criar usuário, para a verificar se o usuário existe
  // essa função meio que nao faz muito sentido porque eu conseguiria fazer isso no codigo e com menos linhas
  // mas ela me serviu para tirar algumas duvidas por isso vou continuar usando ela no codigo
  public findForEmail = ({email,name}:model.InputFindForEmail): model.SearchUserOutput => {
    let userExist:boolean = false;
    let error;
    const findUser = this.userData && this.userData.find( (user:TUserData):boolean=> {
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

  public alterBandDateModel = ():BandDataOutput[] => {
    const alterDateModel = this.bandData && this.bandData.map((band:TBandData):BandDataOutput => {
      const alter = {
        id: band.id,
        name: band.name,
        musicGender: band.music_gender,
        responsible: band.responsible
      }
      return alter
    });
    return alterDateModel as BandDataOutput[];
  };

}


