import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationMember } from './entities/organization-member.entity';
import { UserInfo } from 'src/user/entities/user_info.entity';
import { Certificate } from 'src/certificate/entities/certificate.entity';
import { CertificateTemplate } from 'src/certificate/entities/certificate-template.entity';
import { StudentCertificate } from 'src/certificate/entities/student-certificate';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, OrganizationMember, UserInfo, Certificate,
      CertificateTemplate,
      StudentCertificate,]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule { }
