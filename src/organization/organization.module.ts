import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationMember } from './entities/organization-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrganizationMember])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
