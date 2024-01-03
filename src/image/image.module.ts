import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from 'src/certificate/entities/certificate.entity';
import { CertificateTemplate } from 'src/certificate/entities/certificate-template.entity';
import { StudentCertificate } from 'src/certificate/entities/student-certificate';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Certificate,
      CertificateTemplate,
      StudentCertificate,
    ]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
