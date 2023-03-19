import { CustomError } from "./CustomError";



export class InvalidBandIncriptionInput extends CustomError{
  constructor(){
    super(422, "Verifique se todos os campos ('name', 'musicGender', 'responsible') foram preenchidos corretamente")
  }
};

export class InvalidNameBand extends CustomError{
  constructor(public name:string){
    super(422,`Banda com o nome ${name} já cadastrada!`)
  }
};

// ------ /// ------------ /// --------- ///- ----- //
export class InvalidBandDetailInput extends CustomError{
  constructor(){
    super(422, "Passe o 'id' ou o 'nome' de uma banda!")
  }
};

export class InvalidBandId extends CustomError{
  constructor(){
    super(404, "ID invalido!")
  }
};

export class BandNotFound extends CustomError{
  constructor(){
    super(404, "Verifique se o 'id' ou 'nome' da banda esta correto")
  }
};