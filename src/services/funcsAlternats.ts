import { TUserData } from "../models/UserModel";
import * as funcsModel from "../models/servicesModel/SearchUsersModel"
import { EmailAlreadyCadasted, UserAlreadyCadasted } from "../error/UserErros";
import { BandDataOutput, TBandData } from "../models/BandDataModel";
import * as showModel from "../models/ShowDataModel";

export class FuncsAlternats{
  // utilizo essa função no endpoint de criar usuário, para a verificar se o usuário existe
  // essa função meio que nao faz muito sentido porque eu conseguiria fazer isso no codigo e com menos linhas
  // mas ela me serviu para tirar algumas duvidas por isso vou continuar usando ela no codigo
  public findForEmail = (userData:TUserData[],{email,name}:funcsModel.InputFindForEmail): funcsModel.SearchUserOutput => {
    let userExist:boolean = false;
    let error;
    const findUser = userData.find( (user:TUserData):boolean=> {
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
  // --- ------------- ----- // ---- ------ --- ---- - - - //
  public alterBandDateModel = (bandData:TBandData[]):BandDataOutput[] => {
    const alterDateModel = bandData.map((band:TBandData):BandDataOutput => {
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
  // --- ------------- ----- // ---- ------ --- ---- - - - //
  public alterAllShowDateModel = (showData:showModel.TAllInfoShow[]):showModel.AllInfoShowOutputDTO[] => {
    const alterDateModel = showData.map((show:showModel.TAllInfoShow):showModel.AllInfoShowOutputDTO => {
      const alter = {
        id: show.id,
        weekDay: show.week_day,
        startTime: show.start_time,
        endTime: show.end_time,
        bandName:show.name
      }
      return alter
    });
    return alterDateModel as showModel.AllInfoShowOutputDTO[];
  };
  // --- ------------- ----- // ---- ------ --- ---- - - - //
  public alterModelDataShowOnDay = (shows:showModel.TShowOutput[]) => {
    const alterModel = shows.map((show:showModel.TShowOutput):showModel.ShowOutputDTO => {
      const alter = {
        name: show.name,
        musicGender: show.music_gender
      }
      return alter
    });
    return alterModel as showModel.ShowOutputDTO[]
  };
  // --- ------------- ----- // ---- ------ --- ---- - - - //
  // a função abaixo verifica se o tempo de inicio e de acabar um show é um valor valido
  public verifyShowhours = (start:number,end:number): boolean => {
    const hoursValids = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    let result = false;
    const verify = (value:number):number | undefined => {
      const showTimeIsValid = hoursValids.find((time:number):boolean => {
        return time === value
      })
      return showTimeIsValid;
    }
    if(verify(start) && verify(end)){
      result = true
    }

    return result;
  };

}
