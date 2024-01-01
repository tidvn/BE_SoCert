import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';
import { UserState } from './entities/user_state.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { OrganizationMember } from 'src/organization/entities/organization-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInfo,
      UserState,
      Organization,
      OrganizationMember,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
