import { CustomError } from "./CustomError";


export class Unauthorized extends CustomError{ 
  constructor(){
    super(401, "Usuário não autorizado: Verifique o token")
  }
};
// --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
export class InvalidCreateUserInput extends CustomError{
  constructor(){
    super(422, "Verifique se todos os campos ('name', 'email', 'password', 'role') foram preenchidos corretamente")
  }
};
export class InvalidUserType extends CustomError{
  constructor(){
    super(422, "Verifique se o tipo (role) de usuário esta correto!")
  }
};
// --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
export class InvalidInputEmail extends CustomError{
  constructor(){
    super(422, "Preencha o 'email' de forma correta com ( @ ) e ( .com ) ")
  }
};
export class InvalidInputPassword extends CustomError{
  constructor(){
    super(422, "Senha deve conter pelo menos 8 caracteres!")
  }
};
// --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
export class UserAlreadyCadasted extends CustomError{
  constructor(){
    super(422,"Usuario já casdastrado")
  }
};
export class EmailAlreadyCadasted extends CustomError{
  constructor(){
    super(422,"Email já cadastrado")
  }
};
// --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //
export class InvalidInputLogin extends CustomError{
  constructor(){
    super(422,"Verifique se os dados 'email' e 'password' estao corretos ")
  }
};
export class InvalidPasswordLogin extends CustomError{
  constructor(){
    super(401,"Senha Incorreta")
  }
};
export class UserNotFound extends CustomError{ 
  constructor(){
    super(404, "Usuário não encontrado")
  }
};
// --- -- -- -- -- -- -- // -- -- -- -- -- -- --  // -- -- -- -- -- -- --- //