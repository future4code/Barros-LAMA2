import * as jwt from "jsonwebtoken"; 
import { ITokenGenerator } from "../business/ports";
import { Unauthorized } from "../error/UserErros";
import { AuthenticationData } from "../models/AuthenticationData";

export class TokenGenerator implements ITokenGenerator {
  private jwtKey = process.env.JWT_KEY as string;

  public generateToken = ({id,role}:AuthenticationData):string => {
    const token = jwt.sign(
      { id:id, 
        role:role
      },
        this.jwtKey,
      { expiresIn:"1h" }
    )
   return token
  };

  getTokenData = (token:string):AuthenticationData => {
    try{
      const payload = jwt.verify(
        token, 
        this.jwtKey
      ) as jwt.JwtPayload;
      return {id:payload.id, role:payload.role}
    }catch(error:any){
      throw new Unauthorized()  
    };
  }; 
};

