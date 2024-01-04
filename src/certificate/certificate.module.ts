import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { StudentCertificate } from './entities/student-certificate';
import { CertificateTemplate } from './entities/certificate-template.entity';
import { UserInfo } from 'src/user/entities/user_info.entity';
import { OrganizationMember } from 'src/organization/entities/organization-member.entity';
import { UserState } from 'src/user/entities/user_state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInfo,
      UserState,
      OrganizationMember,
      Certificate,
      CertificateTemplate,
      StudentCertificate,
    ]),
  ],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule {}
