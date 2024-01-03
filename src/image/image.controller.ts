import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/template/:templateId.png')
  async getDemoCertificate(
    @Param('templateId') templateId: string,
    @Res() res: Response,
  ): Promise<any> {
    const certificateImage =
      await this.imageService.getDemoCertificate(templateId);
    res.setHeader('Content-Type', 'image/png');
    res.send(certificateImage);
  }
}
