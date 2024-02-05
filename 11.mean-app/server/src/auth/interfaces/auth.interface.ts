import { Types } from 'mongoose';
import { User } from '../entities/user.entity';

export interface JwtPayload {
  id: Types.ObjectId;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  user: Omit<User, 'password'>;
  accessToken: string;
}
