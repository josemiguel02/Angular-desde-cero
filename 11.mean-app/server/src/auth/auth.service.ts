/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginDto } from './dto';
import { JwtPayload, LoginResponse } from './interfaces/auth.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await newUser.save();

      const { password: _, ...userCreated } = newUser.toJSON();

      return userCreated;
    } catch (error) {
      if (error?.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }

      throw new InternalServerErrorException('Something terrible happened!');
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const existsUser = await this.userModel.findOne({
      email,
    });

    const isMatchPass = bcrypt.compareSync(password, existsUser?.password);

    if (!existsUser || !isMatchPass) {
      throw new UnauthorizedException('Not valid credentials');
    }

    const { password: _, ...user } = existsUser.toJSON();

    const data: LoginResponse = {
      user,
      accessToken: this.getJwtToken({ id: user._id }),
    };

    return data;
  }

  async register(createUserDto: CreateUserDto): Promise<LoginResponse> {
    const user = await this.create(createUserDto);

    const data: LoginResponse = {
      user,
      accessToken: this.getJwtToken({ id: user._id }),
    };

    return data;
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(id: Types.ObjectId) {
    const user = await this.userModel.findById(id);
    const { password, ...userData } = user.toJSON();

    return userData;
  }

  getJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
