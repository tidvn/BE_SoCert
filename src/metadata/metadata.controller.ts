import { Controller, Get, Param, Res } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { Response } from 'express';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('/collection/:id.json')
  async getColectionMetadata(@Param('id') id: string, @Res() res: Response) {
    const metadata = await this.metadataService.getColectionMetadata(id);
    res.send(metadata);
  }
}
