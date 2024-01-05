import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from 'src/certificate/entities/certificate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
  ) {}

  async getColectionMetadata(id: string) {
    const cert = await this.certificateRepository.findOne({ where: { id } });
    return cert.metadata;
  }
}
