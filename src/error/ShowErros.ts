import { CustomError } from "./CustomError";

export class InvalidGetShowsOnDayInput extends CustomError {
  constructor(){
    super(422,"informe qual dia o do show")
  }
};

export class InvalidCrateShowInput extends CustomError {
  constructor(){
    super(422,"Preencha todos os dados, 'weekDay', 'startTime', 'endTime', 'bandId'")
  }
};
export class InvalidDayShowInput extends CustomError {
  constructor(){
    super(409,"Verifique o dia do show, somente entre os dias 'SEXTA', 'SABADO', 'DOMINGO' ")
  }
};
export class InvalidBandIdInput extends CustomError {
  constructor(public id:string){
    super(404,`Banda com { id: ${id} } não encontrada`)
  }
};
// ---- // ------ // ----------- /// ----------- // ---- //
export class InvalidTimeShow extends CustomError {
  constructor(){
    super(422,"Passe o tempo de show valido entre 8h e 23h")
  }
};
export class InvalidTimeEqual extends CustomError {
  constructor(){
    super(409,"O horario que comeca um show não pode ser o mesmo que termina!")
  }
};
export class InvalidEndTime extends CustomError {
  constructor(){
    super(409,"A hora que um show acaba não pode ser menor que a hora que ele começa!")
  }
};

export class InvalidShowExist extends CustomError {
  constructor(public day:string, public start:number){
    super(409,`Já existe um show que ira tocar ${day} as ${start} horas, tente outro horario!`)
  }
}
// ---- // ------ // ----------- /// ----------- // ---- //