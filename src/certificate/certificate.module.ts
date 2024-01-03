import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { StudentCertificate } from './entities/student-certificate';
import { CertificateTemplate } from './entities/certificate-template.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Certificate,
      CertificateTemplate,
      StudentCertificate,
    ]),
  ],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule {}
