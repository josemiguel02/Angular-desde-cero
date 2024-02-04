import { Module } from '@nestjs/common';
import { MongooseModule, ModelDefinition } from '@nestjs/mongoose';

import { User, UserSchema } from './entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

const models: ModelDefinition[] = [
  {
    name: User.name,
    schema: UserSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(models),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
