import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationMember } from './entities/organization-member.entity';
import { UserInfo } from 'src/user/entities/user_info.entity';
import { Certificate } from 'src/certificate/entities/certificate.entity';
import { CertificateTemplate } from 'src/certificate/entities/certificate-template.entity';
import { CertificateMember } from 'src/certificate/entities/certificate-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organization,
      OrganizationMember,
      UserInfo,
      Certificate,
      CertificateTemplate,
      CertificateMember,
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
