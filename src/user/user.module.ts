import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';
import { UserState } from './entities/user_state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo, UserState]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
