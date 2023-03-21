import { AuthenticationData } from "../models/servicesModel/AuthenticationData";

export interface ITokenGenerator {
  generateToken({id,role}:AuthenticationData):string; 
  getTokenData(token:string):AuthenticationData;
};
export interface IIdGenerator{
  generate():string
};