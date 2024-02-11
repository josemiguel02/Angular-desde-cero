import { IUser } from './user.interface';

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
}
