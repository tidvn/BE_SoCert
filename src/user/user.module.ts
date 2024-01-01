import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
