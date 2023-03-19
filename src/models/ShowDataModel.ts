export interface ShowInputDTO{
  weekDay: string;
  startTime: number;
  endTime: number;
  bandId: string;
};
export enum DAY_SHOWS {
  SEXTA = "SEXTA",
  SABADO = "SABADO",
  DOMINGO = "DOMINGO"
};
export interface TShow {
  id: string;
  week_day: string;
  start_time: number;
  end_time: number;
  band_id: string;
};
// --------- ------ ------- ----- ----- //
export interface TShowOutput {
  name: string;
  music_gender: string;
}
export interface ShowOutputDTO {
  name: string;
  musicGender: string;
};

// --------- ------ ------- ----- ----- //
export interface TAllInfoShow {
  id: string;
  week_day: string;
  start_time: number;
  end_time: number;
  name: string;
};

export interface AllInfoShowOutputDTO {
  id: string;
  weekDay: string;
  startTime: number;
  endTime: number;
  bandName: string;
}
// --------- ------ ------- ----- ----- //

