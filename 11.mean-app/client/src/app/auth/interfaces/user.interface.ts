export interface IUser {
  _id: string;
  email: string;
  name: string;
  isActive: boolean;
  roles: string[];
}
