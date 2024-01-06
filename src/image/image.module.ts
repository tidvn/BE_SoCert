import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from 'src/certificate/entities/certificate.entity';
import { CertificateTemplate } from 'src/certificate/entities/certificate-template.entity';
import { CertificateMember } from 'src/certificate/entities/certificate-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Certificate,
      CertificateTemplate,
      CertificateMember,
    ]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
