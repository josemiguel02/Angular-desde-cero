import { IUser } from './user.interface';

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  user: IUser;
  accessToken: string;
}
