import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificateTemplate } from './entities/certificate-template.entity';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(CertificateTemplate)
    private readonly certificateTemplateRepository: Repository<CertificateTemplate>,
  ) { }

  async createCertificateTemplate() {
    const certificateTemplate = [
      {
        backgroundUrl: 'https://i.imgur.com/rJrxCWK.png',
        height: 2000,
        width: 1414,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '80px Arial',
            x: 680,
            y: 700,
          },
          {
            name: 'date',
            display: 'Date:',
            font: '30px Arial',
            x: 400,
            y: 1080,
          },
          {
            name: 'signature',
            display: 'Signature:',
            font: '30px Arial',
            x: 1400,
            y: 1080,
          },
        ],
        demo: {
          name: '[Full Name Here]',
          date: '[01/01/2024]',
          signature: '[Signature Here]',
        }
      },
    ];

    certificateTemplate.map(async (item) => {
      const template = new CertificateTemplate();
      template.background = item.backgroundUrl;
      template.height = item.height;
      template.width = item.width;
      template.atributtes = item.atributtes;
      template.demo = item.demo;
      await this.certificateTemplateRepository.save(template);
    });
  }

  async getTemplate() {
    const listCertificate = await this.certificateTemplateRepository.find();
    return listCertificate;
  }
}
