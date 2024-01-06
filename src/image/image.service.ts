import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createCanvas, loadImage } from 'canvas';
import { CertificateMember } from 'src/certificate/entities/certificate-member.entity';
import { CertificateTemplate } from 'src/certificate/entities/certificate-template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(CertificateTemplate)
    private readonly certificateTemplateRepository: Repository<CertificateTemplate>,
    @InjectRepository(CertificateMember)
    private readonly certificateMemberRepository: Repository<CertificateMember>,
  ) {}

  async getDemoCertificate(id: string) {
    const template = await this.certificateTemplateRepository.findOne({
      where: {
        id: id,
      },
    });
    return await this.drawCanvas(template, template.demo);
  }

  async getUserCertificateImage(id: string) {
    const certificateMember = await this.certificateMemberRepository.findOne({
      where: {
        id: id,
      },
    });
    return await this.drawCanvas(certificateMember.canvas, certificateMember.metadata);
  }

  async getDemo() {
    const templateData = {
      background: 'https://i.imgur.com/TeUtlJt.png',
      height: 1414,
      width: 2000,
      atributtes: [
        {
          name: 'name',
          display: 'Name:',
          font: '100px Arial',
          x: 300,
          y: 1050,
        },
        {
          name: 'date',
          display: 'date:',
          font: '40px Arial',
          x: 230,
          y: 1580,
        },
      ],
      demo: {
        name: '[Full Name Here]',
        date: '[01/01/2024]',
      },
    };

    const template = {
      ...templateData,
      id: '',
      name: '',
      organizationId: '',
      public: true,
      createdAt: undefined,
      updatedAt: undefined,
    };
    return await this.drawCanvas(template, template.demo);
  }

  private async drawCanvas(template: any, data: any) {
    const canvas = createCanvas(template.height, template.width);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      await loadImage(template.background),
      0,
      0,
      canvas.width,
      canvas.height,
    );
    template.atributtes.forEach((item) => {
      ctx.font = item.font;
      ctx.fillText(data[item.name], item.x, item.y);
    });

    return canvas.toBuffer();
  }
}
