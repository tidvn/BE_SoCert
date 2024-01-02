import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Get(':id')
  async createCertificate(
    @Param('id') id: string,
    @Res() res: Response): Promise<any> {
    const certificateImage = await this.imageService.createCertificate(id);
    res.setHeader('Content-Type', 'image/png');
    // res.setHeader('Content-Disposition', 'attachment; filename=certificate.png');
    res.send(certificateImage);
    // return certificateImage;
  }
}
