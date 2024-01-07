import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createCanvas, loadImage } from 'canvas';
import { isNil } from 'lodash';
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
      background: 'https://i.imgur.com/QCXe7x4.png',
      height: 1792,
      width: 1296,
      fillStyle:"white",
      atributtes: [
        {
          name: 'name',
          display: 'Name:',
          font: '50px Arial',
          x: 900,
          y: 750,
        },
        {
          name: 'month',
          display: 'month:',
          font: '40px Arial',
          x: 390,
          y: 1070,
        },
        
        {
          name: 'year',
          display: 'year:',
          font: '40px Arial',
          x: 490,
          y: 1070,
        },        
        {
          name: 'rank',
          display: 'rank:',
          font: '40px Arial',
          x: 910,
          y: 870,
        },
        {
          name: 'course',
          display: 'course:',
          font: '40px Arial',
          x: 1080,
          y: 815,
        },
      ],

      demo: {
        name: '[Full_Name]',
        month: '[Month]',
        year: '[Year]',
        rank:"[Rank]",
        course:"[Course]"
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
    if(!isNil(template.fillStyle)){
      ctx.fillStyle = template.fillStyle;
    }
    template.atributtes.forEach((item) => {
      ctx.font = item.font;
      ctx.fillText(data[item.name], item.x, item.y);
    });

    return canvas.toBuffer();
  }
}
