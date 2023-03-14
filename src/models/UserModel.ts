
// --- -- -- -- -- -- -- -- --- //
export interface InputLoginDTO {
  email: string;
  password: string;
};

// --- -- -- -- -- -- -- -- --- //
export enum USER_TYPE  {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
};

export interface UserInputDTO {
  name: string;
  email: string;
  password: string;
  role: string;
};
export interface TUserData {
  id: string
  name: string;
  email: string;
  password: string;
  role: string;
};
// --- -- -- -- -- -- -- -- --- //