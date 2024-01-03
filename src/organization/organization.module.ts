import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationMember } from './entities/organization-member.entity';
import { UserInfo } from 'src/user/entities/user_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrganizationMember, UserInfo])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule { }
