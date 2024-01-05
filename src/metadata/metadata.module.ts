import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/user/entities/user_info.entity';
import { UserState } from 'src/user/entities/user_state.entity';
import { OrganizationMember } from 'src/organization/entities/organization-member.entity';
import { Certificate } from 'src/certificate/entities/certificate.entity';
import { CertificateTemplate } from 'src/certificate/entities/certificate-template.entity';
import { StudentCertificate } from 'src/certificate/entities/student-certificate';

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
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule {}
