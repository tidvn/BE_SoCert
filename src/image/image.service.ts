import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createCanvas, loadImage } from 'canvas';
import { CertificateTemplate } from 'src/certificate/entities/certificate-template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(CertificateTemplate)
    private readonly certificateTemplateRepository: Repository<CertificateTemplate>,
  ) { }

  async getDemoCertificate(id: string) {

    const template = await this.certificateTemplateRepository.findOne({
      where: {
        id: id,
      },
    });
    return await this.drawCanvas(template, template.demo);

  }

  private async drawCanvas(template: CertificateTemplate, data: any) {
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
