import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SITE_URL } from 'src/app.environment';
import { CertificateMember } from 'src/certificate/entities/certificate-member.entity';
import { Certificate } from 'src/certificate/entities/certificate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    @InjectRepository(CertificateMember)
    private readonly certificateMemberRepository: Repository<CertificateMember>,
  ) { }

  async getColectionMetadata(id: string) {
    const cert = await this.certificateRepository.findOne({ where: { id } });
    return cert.metadata;
  }
  async getCertificateNFTMetadata(id: string) {
    const cert = await this.certificateMemberRepository.findOne({ where: { id } });

      const metadata =  cert.metadata.properties.creators.filter(creator => creator.address !== null && creator.address !== "");

    return metadata;
    
    // const { wallet_address, ...metadata } = cert.metadata;
    // const creators = collection.metadata.creators.map((creator) => ({ address: creator, share: 100 }));
    //   return {
    //     ...metadata, symbol: 'SOCERT', image: image,
    //     seller_fee_basis_points: 0,
    //     properties: {
    //       creators: creators,
    //       files: [{
    //         uri: image,
    //         type: 'image/png'
    //       }]
    //     }
    //   };
  }
}
